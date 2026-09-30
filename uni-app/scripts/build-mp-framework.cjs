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
    loadFrameworkNonAddonSubPackages,
    rmDir
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

const UV_BARREL_PAGE_PATH = 'app/pages/_uv_barrel/index'

/**
 * 构建期专用：在主包插入一个临时页面，模板里用上全部 uview-plus 组件，
 * 强制 uni 把组件文件(node-modules/uview-plus/components/*)与各自 props(NN)
 * 全部打进框架 common/vendor.js；构建完成后该页面会从 app.json 与产物中移除。
 * 这样框架自带完整 uview-plus，插件合并时无需再处理 uview-plus 组件。
 */
// 判断某个 pages 条目是否为本脚本注入的临时 barrel 页面（兼容历史遗留的不同路径/格式）
function isBarrelPageEntry(p) {
    const entryPath = typeof p === 'string' ? p : p && p.path
    return typeof entryPath === 'string' && entryPath.includes('_uv_barrel')
}

function injectUviewBarrelPage() {
    if (process.env.SKIP_UV_BARREL) {
        console.log('[build-mp-framework] SKIP_UV_BARREL set, skip barrel page')
        return false
    }
    const compRoot = path.join(ROOT, 'node_modules', 'uview-plus', 'components')
    if (!fs.existsSync(compRoot)) {
        console.warn('[build-mp-framework] uview-plus not found, skip barrel page')
        return false
    }
    const names = fs
        .readdirSync(compRoot)
        .filter((n) => {
            const d = path.join(compRoot, n)
            if (!fs.statSync(d).isDirectory()) return false
            if (n.includes('--')) return false // u--xxx 为内部别名标签，双连字符在模板中无法解析
            return fs.existsSync(path.join(d, `${n}.vue`))
        })
        .sort()
    if (!names.length) return false

    const tags = names.map((n) => `    <${n} />`).join('\n')
    const pageVue =
        `<template>\n` +
        `  <view class="uv-barrel">\n` +
        `${tags}\n` +
        `  </view>\n` +
        `</template>\n\n` +
        `<script setup>\n` +
        `// 构建期专用：强制打包全部 uview-plus 组件，产物中会被移除\n` +
        `</script>\n`
    const srcDir = path.join(ROOT, 'src', 'app', 'pages', '_uv_barrel')
    fs.mkdirSync(srcDir, { recursive: true })
    fs.writeFileSync(path.join(srcDir, 'index.vue'), pageVue, 'utf-8')

    const fw = readJson(PAGES_FRAMEWORK)
    if (!Array.isArray(fw.pages)) fw.pages = []
    // 先清除任何历史残留的 barrel 条目（可能格式/路径不同），避免重复或非法 page
    fw.pages = fw.pages.filter((p) => !isBarrelPageEntry(p))
    fw.pages.push({ path: UV_BARREL_PAGE_PATH, style: {} })
    writeJson(PAGES_FRAMEWORK, fw)
    console.log(`[build-mp-framework] injected uview barrel page (${names.length} components)`)
    return true
}

/** 从 mp-core/app.json 移除临时页面入口并删除其编译产物文件 */
function stripUviewBarrelFromCore() {
    const appPath = path.join(MP_CORE_DIR, 'app.json')
    if (fs.existsSync(appPath)) {
        const appJson = readJson(appPath)
        if (Array.isArray(appJson.pages)) {
            const len = appJson.pages.length
            appJson.pages = appJson.pages.filter((p) => !isBarrelPageEntry(p))
            if (appJson.pages.length !== len) {
                writeJson(appPath, appJson)
                console.log('[build-mp-framework] removed barrel page entry from app.json')
            }
        }
    }
    const outDirs = [
        path.join(MP_CORE_DIR, 'app', 'pages', '_uv_barrel'),
        path.join(MP_CORE_DIR, 'pages', '_uv_barrel'),
        path.join(MP_OUT_BUILD, 'app', 'pages', '_uv_barrel'),
        path.join(MP_OUT_BUILD, 'pages', '_uv_barrel')
    ]
    outDirs.forEach((outDir) => {
        if (fs.existsSync(outDir)) {
            rmDir(outDir)
            console.log('[build-mp-framework] removed barrel page files from mp-core:', outDir)
        }
    })
}

/** 清理构建期临时文件：src 临时页面 + pages.framework.json 中的注入项 */
function removeUviewBarrelTemp() {
    const srcDirs = [
        path.join(ROOT, 'src', 'app', 'pages', '_uv_barrel'),
        path.join(ROOT, 'src', 'pages', '_uv_barrel')
    ]
    srcDirs.forEach((srcDir) => {
        if (fs.existsSync(srcDir)) rmDir(srcDir)
    })
    if (fs.existsSync(PAGES_FRAMEWORK)) {
        const fw = readJson(PAGES_FRAMEWORK)
        if (Array.isArray(fw.pages)) {
            const len = fw.pages.length
            fw.pages = fw.pages.filter((p) => !isBarrelPageEntry(p))
            if (fw.pages.length !== len) writeJson(PAGES_FRAMEWORK, fw)
        }
    }
}

function main() {
    const buildId = makeBuildId('mp-framework')
    // build:mp-weixin:core 场景（SKIP_ADDONS=1）：框架包不携带已编译插件包与合并元数据
    // （插件在 SaaS 侧经 build:mp-weixin:addon + merge-mp-addon 独立合并/部署）。
    const skipAddons = process.env.SKIP_ADDONS === '1'

    require('./generate-mp-framework-pages.cjs')
    require('./generate-diy-registry.cjs').generateDiyRegistry()
    const { generateDiyDynamicBridgeMp } = require('./generate-diy-dynamic-bridge-mp.cjs')
    generateDiyDynamicBridgeMp({ target: 'app' })
    generateDiyDynamicBridgeMp({ target: 'router' })

    injectUviewBarrelPage()

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
        stripUviewBarrelFromCore()
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
        if (skipAddons) {
            // 框架包不携带已编译插件包与合并元数据（防止历史 build:mp-weixin:addon
            // 写入的 mp-addons/ 或 merge-mp-addon 的 mp-merge-meta.json 残留进 core 产物）
            const addonPkgDir = path.join(MP_CORE_DIR, 'mp-addons')
            if (fs.existsSync(addonPkgDir)) {
                rmDir(addonPkgDir)
                console.log('[build-mp-framework] SKIP_ADDONS: removed mp-addons/ from core output')
            }
            for (const f of ['mp-merge-meta.json', 'index.json']) {
                const fp = path.join(MP_CORE_DIR, f)
                if (fs.existsSync(fp)) {
                    fs.rmSync(fp, { force: true })
                    console.log(`[build-mp-framework] SKIP_ADDONS: removed ${f} from core output`)
                }
            }
        }
        console.log(`[build-mp-framework] OK -> ${path.relative(ROOT, MP_CORE_DIR)}/ (${buildId})`)
        console.log('[build-mp-framework] 框架包可直接导入开发者工具（仅主包，无插件分包）')
        console.log('[build-mp-framework] 添加插件后合并：')
        console.log('  1. 将插件包放入 dist/build/mp-core/mp-addons/{key}/')
        console.log('     或 npm run build:mp-weixin:addon shop  （自动输出到 mp-addons/shop/）')
        console.log('  2. cd dist/build/mp-core && node merge-mp-addon.cjs')
        buildOk = true
    } finally {
        swapPagesJson(false, pagesBackup)
        removeUviewBarrelTemp()
        if (buildOk) {
            require('./cleanup-diy-dynamic-bridge-src.cjs').cleanupAddonDiyBridgeSrc()
        }
    }
}

main()
