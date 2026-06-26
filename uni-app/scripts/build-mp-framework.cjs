/**
 * 微信小程序框架包单独编译 → dist/build/mp-core/
 */
const fs = require('fs')
const path = require('path')
const {
    ROOT,
    PAGES_JSON,
    BUILD_DIR,
    MP_OUT_BUILD,
    MP_CORE_DIR,
    MP_FRAMEWORK_DIR,
    MP_LOCK_PATH,
    makeBuildId,
    runUniMpBuild,
    snapshotMpBuild,
    collectCommonManifest,
    readJson,
    writeJson,
    stripOrphanAddonSubpackages,
    installMergeScriptToFramework,
    applyFrameworkAppJsonSubPackages,
    loadFrameworkNonAddonSubPackages
} = require('./mp-utils.cjs')
const { patchDiyGroupInlineComponents } = require('./mp-diy-group-inline.cjs')
const {
    installNativeDiyBridgeRouter,
    buildAppDiyRegistryMap
} = require('./mp-diy-bridge-merge.cjs')
const { scanAllDiyComponents } = require('./diy-component-scan.cjs')

const PAGES_BACKUP = path.join(BUILD_DIR, 'pages.full.backup.json')
const PAGES_FRAMEWORK = path.join(BUILD_DIR, 'pages.framework.json')

function swapPagesJson(useFramework, rawBackup) {
    if (useFramework) {
        // 保存原始内容到内存（保留注释），不依赖磁盘备份文件
        rawBackup = fs.readFileSync(PAGES_JSON, 'utf-8')
        fs.copyFileSync(PAGES_FRAMEWORK, PAGES_JSON)
        console.log('[build-mp-framework] swapped pages.json -> pages.framework.json')
        return rawBackup
    } else if (rawBackup) {
        fs.writeFileSync(PAGES_JSON, rawBackup, 'utf-8')
        console.log('[build-mp-framework] restored pages.json (with comments)')
    }
}

function main() {
    const buildId = makeBuildId('mp-framework')

    require('./generate-mp-framework-pages.cjs')
    require('./generate-diy-registry.cjs').generateDiyRegistry()
    const { generateDiyDynamicBridgeMp } = require('./generate-diy-dynamic-bridge-mp.cjs')
    generateDiyDynamicBridgeMp({ target: 'app' })
    generateDiyDynamicBridgeMp({ target: 'router' })

    const pagesBackup = swapPagesJson(true)
    let code = 0
    let buildOk = false
    try {
        console.log('[build-mp-framework] uni build -p mp-weixin ...')
        code = runUniMpBuild()
        if (code !== 0) {
            console.error('[build-mp-framework] FAILED')
            process.exit(code)
        }
        if (!fs.existsSync(MP_OUT_BUILD)) {
            console.error('[build-mp-framework] missing output:', MP_OUT_BUILD)
            process.exit(1)
        }
        const stripped = stripOrphanAddonSubpackages(MP_OUT_BUILD)
        if (stripped) {
            console.log(`[build-mp-framework] removed ${stripped} orphan addon plugin dir(s)`)
        }
        snapshotMpBuild(MP_OUT_BUILD, MP_CORE_DIR, {
            kind: 'framework',
            buildId,
            commonManifest: collectCommonManifest(MP_OUT_BUILD)
        })
        applyFrameworkAppJsonSubPackages(MP_CORE_DIR)
        writeJson(
            path.join(MP_CORE_DIR, 'mp-framework-subpackages.json'),
            loadFrameworkNonAddonSubPackages()
        )
        installNativeDiyBridgeRouter(MP_CORE_DIR, buildAppDiyRegistryMap(scanAllDiyComponents))
        console.log('[build-mp-framework] installed native diy-dynamic-bridge router (merge-patchable)')
        const appRegistry = buildAppDiyRegistryMap(scanAllDiyComponents)
        const inlineResult = patchDiyGroupInlineComponents(MP_CORE_DIR, appRegistry)
        console.log(
            `[build-mp-framework] diy-group inlined ${inlineResult.count} app diy component(s) (no bridge hop)`
        )
        const { applyMpWeixinPost } = require('./mp-weixin-post.cjs')
        applyMpWeixinPost(MP_CORE_DIR)
        const meta = readJson(path.join(MP_CORE_DIR, 'mp-build-meta.json'))
        const lock = fs.existsSync(MP_LOCK_PATH) ? readJson(MP_LOCK_PATH) : {}
        lock.framework = {
            buildId,
            gitCommit: meta.gitCommit,
            time: new Date().toISOString(),
            dir: 'dist/build/mp-core'
        }
        writeJson(MP_LOCK_PATH, lock)
        installMergeScriptToFramework(MP_CORE_DIR)
        console.log(`[build-mp-framework] OK -> ${path.relative(ROOT, MP_CORE_DIR)}/ (${buildId})`)
        console.log('[build-mp-framework] 框架包可直接导入开发者工具（仅主包，无插件分包）')
        console.log('[build-mp-framework] 添加插件后合并：')
        console.log('  1. 将插件包放入 dist/build/mp-core/mp-addons/{key}/')
        console.log('     或 npm run build:mp-weixin:addon shop  （自动输出到 mp-addons/shop/）')
        console.log('  2. cd dist/build/mp-core && node merge-mp-addon.cjs')
        buildOk = true
    } finally {
        swapPagesJson(false, pagesBackup)
        if (buildOk) {
            require('./cleanup-diy-dynamic-bridge-src.cjs').cleanupAddonDiyBridgeSrc()
        }
    }
}

main()
