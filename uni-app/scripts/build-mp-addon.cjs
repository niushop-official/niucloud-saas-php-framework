/**
 * 打包单个插件小程序源码 → dist/mp-addons/{key}/
 * 含 addon/{key}/...、common/、manifest.json（subPackages 等合并信息）
 */
const fs = require('fs')
const path = require('path')
const {
    ROOT,
    PAGES_JSON,
    BUILD_DIR,
    MP_OUT_BUILD,
    MP_CORE_DIR,
    MP_ADDONS_DIR,
    MP_LOCK_PATH,
    makeBuildId,
    runUniMpBuild,
    readJson,
    writeJson,
    readAppJson,
    rmDir,
    copyDir,
    getSubPackageRootsForKey,
    parsePagesJson,
    collectCommonManifest,
    stripAddonSubpackagesExcept,
    getAppSubPackages,
    getAddonPackageDir,
    installMergeScriptToFramework,
    copyMpRelativeFiles,
    readMpSharedBridgeMeta,
    installMpSharedBridgePage,
    removeMpSharedBridgePage,
    packageSharedAddonComponents,
    collectMainComponentDirs,
    packageMainComponents,
    packageAddonDiyBridge
} = require('./mp-utils.cjs')
const { buildAddonDiyRegistryMap } = require('./mp-diy-bridge-merge.cjs')
const { scanAllDiyComponents } = require('./diy-component-scan.cjs')
const { scanSubPackageRequires } = require('./scan-mp-requires.cjs')

const PAGES_BACKUP = path.join(BUILD_DIR, 'pages.full.backup.json')

function swapPagesJson(key, enable, rawBackup) {
    const pagesAddon = path.join(BUILD_DIR, `pages.addon.${key}.json`)
    if (enable) {
        if (!fs.existsSync(pagesAddon)) {
            console.error(`[build-mp-addon] missing ${path.relative(ROOT, pagesAddon)}`)
            process.exit(1)
        }
        // 保存原始内容（保留注释）
        rawBackup = fs.readFileSync(PAGES_JSON, 'utf-8')
        fs.copyFileSync(pagesAddon, PAGES_JSON)
        console.log(`[build-mp-addon] swapped pages.json -> pages.addon.${key}.json`)
        return rawBackup
    } else if (rawBackup) {
        fs.writeFileSync(PAGES_JSON, rawBackup, 'utf-8')
        console.log('[build-mp-addon] restored pages.json (with comments)')
    }
}

function packageAddonBuild(key, buildDir, buildId) {
    const pagesJson = parsePagesJson()
    const roots = getSubPackageRootsForKey(key, pagesJson)
    const appJson = readAppJson(buildDir)
    const subPackages = getAppSubPackages(appJson).filter((s) => roots.includes(s.root))

    const dest = getAddonPackageDir(key)
    rmDir(dest)
    fs.mkdirSync(dest, { recursive: true })

    for (const root of roots) {
        const src = path.join(buildDir, root)
        if (!fs.existsSync(src)) {
            console.error(`[build-mp-addon] missing ${root}`)
            process.exit(1)
        }
        copyDir(src, path.join(dest, root))
    }

    const commonSrc = path.join(buildDir, 'common')
    if (fs.existsSync(commonSrc)) {
        copyDir(commonSrc, path.join(dest, 'common'))
    }

    const nodeModulesSrc = path.join(buildDir, 'node-modules')
    if (fs.existsSync(nodeModulesSrc)) {
        copyDir(nodeModulesSrc, path.join(dest, 'node-modules'))
    }

    const scan = scanSubPackageRequires(buildDir, roots, key)
    const depFiles = copyMpRelativeFiles(buildDir, dest, scan.requirePaths, roots)
    if (depFiles) {
        console.log(`[build-mp-addon] packaged ${depFiles} main-package dep file(s)`)
    }

    const bridgeMeta = readMpSharedBridgeMeta(key)
    const sharedCount = packageSharedAddonComponents(buildDir, dest, bridgeMeta.sharedComponents)
    if (sharedCount) {
        console.log(`[build-mp-addon] packaged ${sharedCount} shared addon/components`)
    }

    const mainComponentDirs = collectMainComponentDirs(buildDir, roots, bridgeMeta)
    const mainComponentCount = packageMainComponents(buildDir, dest, mainComponentDirs)
    if (mainComponentCount) {
        console.log(`[build-mp-addon] packaged ${mainComponentCount} main component dir(s)`)
    }

    const diyBridgeCount = packageAddonDiyBridge(key, buildDir, dest)
    if (diyBridgeCount) {
        console.log(
            `[build-mp-addon] packaged diy-dynamic-bridge-${key} (${diyBridgeCount} components)`
        )
    }

    const diyRegistry = buildAddonDiyRegistryMap(scanAllDiyComponents, key)

    const manifest = {
        key,
        kind: 'mp-addon-package',
        roots,
        buildId,
        gitCommit: null,
        time: new Date().toISOString(),
        subPackages,
        sharedComponents: bridgeMeta.sharedComponents,
        mainComponents: bridgeMeta.mainComponents,
        mainComponentDirs,
        deps: scan,
        commonManifest: collectCommonManifest(buildDir),
        diyBridge: {
            key,
            componentDir: `components/diy-dynamic-bridge-${key}`,
            componentCount: diyBridgeCount || 0,
            registry: diyRegistry
        }
    }
    writeJson(path.join(dest, 'manifest.json'), manifest)
    console.log(`[build-mp-addon] packaged -> ${path.relative(ROOT, dest)}/`)
    return manifest
}

function main() {
    const key = process.argv[2]
    if (!key) {
        console.error('Usage: node build-mp-addon.cjs <addon-key>')
        process.exit(1)
    }

    const buildId = makeBuildId(`mp-addon-${key}`)

    // 自动生成 pages.core.json（确保所有插件的分包信息最新）
    const genSplitResult = require('child_process').spawnSync(
        'node',
        [path.join(__dirname, 'generate-split-pages.cjs')],
        { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' }
    )
    if (genSplitResult.status !== 0) {
        console.error('[build-mp-addon] generate-split-pages failed')
        process.exit(genSplitResult.status || 1)
    }

    spawnSyncGenerate(key)
    require('./generate-diy-registry.cjs').generateDiyRegistry({ addonKeys: [key] })
    require('./generate-diy-dynamic-bridge-mp.cjs').generateDiyDynamicBridgeMp({
        target: 'addon',
        addonKey: key
    })

    const bridgeInstalled = installMpSharedBridgePage(key)
    const pagesBackup = swapPagesJson(key, true)

    // 额外安全措施：把备份也写入磁盘，即使 finally 未执行也能手动恢复
    fs.writeFileSync(path.join(BUILD_DIR, 'pages.last.backup.json'), pagesBackup, 'utf-8')

    process.env.MP_ADDON_BRIDGE_KEY = key
    let buildOk = false
    let exitCode = 1
    try {
        console.log(`[build-mp-addon] building "${key}" ...`)
        const code = runUniMpBuild()
        if (code !== 0) {
            console.error('[build-mp-addon] FAILED')
            exitCode = code
            return
        }
        if (!fs.existsSync(MP_OUT_BUILD)) {
            console.error('[build-mp-addon] missing output:', MP_OUT_BUILD)
            exitCode = 1
            return
        }
        stripAddonSubpackagesExcept(MP_OUT_BUILD, [key])
        const manifest = packageAddonBuild(key, MP_OUT_BUILD, buildId)
        manifest.gitCommit = require('./mp-utils.cjs').getGitCommit()
        writeJson(path.join(getAddonPackageDir(key), 'manifest.json'), manifest)

        const lock = fs.existsSync(MP_LOCK_PATH) ? readJson(MP_LOCK_PATH) : {}
        lock.addons = lock.addons || {}
        lock.addons[key] = { buildId, dir: path.relative(ROOT, getAddonPackageDir(key)) }
        writeJson(MP_LOCK_PATH, lock)

        if (fs.existsSync(MP_CORE_DIR)) {
            installMergeScriptToFramework(MP_CORE_DIR)
            const frameworkAddonDir = path.join(MP_CORE_DIR, 'mp-addons', key)
            rmDir(frameworkAddonDir)
            copyDir(getAddonPackageDir(key), frameworkAddonDir)
            console.log(`[build-mp-addon] synced -> ${path.relative(ROOT, frameworkAddonDir)}/`)
        }

        console.log(`[build-mp-addon] OK (${buildId})`)
        console.log(`[build-mp-addon] 插件包 -> ${path.relative(ROOT, getAddonPackageDir(key))}/`)
        console.log('[build-mp-addon] 合并：cd dist/build/mp-core && node merge-mp-addon.cjs')
        buildOk = true
        exitCode = 0
    } catch (e) {
        console.error('[build-mp-addon] unexpected error:', e.message || e)
        exitCode = 1
    } finally {
        delete process.env.MP_ADDON_BRIDGE_KEY
        swapPagesJson(key, false, pagesBackup)
        // 恢复成功后删除磁盘备份
        try { fs.unlinkSync(path.join(BUILD_DIR, 'pages.last.backup.json')) } catch {}
        if (bridgeInstalled) {
            removeMpSharedBridgePage()
        }
        if (buildOk) {
            require('./cleanup-diy-dynamic-bridge-src.cjs').cleanupAddonDiyBridgeSrc({ keys: [key] })
        }
    }

    if (exitCode !== 0) {
        process.exit(exitCode)
    }
}

function spawnSyncGenerate(key) {
    const result = require('child_process').spawnSync(
        'node',
        [path.join(__dirname, 'generate-mp-addon-pages.cjs'), key],
        { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' }
    )
    if (result.status !== 0) {
        process.exit(result.status || 1)
    }
}

main()
