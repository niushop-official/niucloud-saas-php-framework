/**
 * 在框架小程序目录内执行，自动扫描 mp-addons/ 并合并插件分包
 * 纯拷贝 + router 补丁，无需 uni 源码与编译（支持 mp-core 独立分发）
 *
 * 用法（在 dist/build/mp-core/ 目录下）：
 *   node merge-mp-addon.cjs
 *   node merge-mp-addon.cjs shop pintuan
 */
const fs = require('fs')
const path = require('path')

function resolveFrameworkDir() {
    const cwd = process.cwd()
    if (fs.existsSync(path.join(cwd, 'app.json'))) {
        return cwd
    }
    const arg = process.argv[2]
    if (arg && !arg.startsWith('-') && fs.existsSync(path.join(path.resolve(arg), 'app.json'))) {
        return path.resolve(arg)
    }
    return null
}

function loadMergeDeps(scriptDir) {
    const libDir = path.join(scriptDir, 'lib')
    if (fs.existsSync(path.join(libDir, 'mp-utils.cjs'))) {
        return {
            libDir,
            utils: require(path.join(libDir, 'mp-utils.cjs')),
            bridge: require(path.join(libDir, 'mp-diy-bridge-merge.cjs')),
            validateRequires: require(path.join(libDir, 'scan-mp-requires.cjs')).validateRequires,
            applyMpWeixinPost: require(path.join(libDir, 'mp-weixin-post.cjs')).applyMpWeixinPost,
            scanAllDiyComponents: null
        }
    }

    let dir = path.resolve(scriptDir)
    while (true) {
        if (
            fs.existsSync(path.join(dir, 'package.json')) &&
            fs.existsSync(path.join(dir, 'scripts', 'mp-utils.cjs'))
        ) {
            return {
                libDir: path.join(dir, 'scripts'),
                utils: require(path.join(dir, 'scripts/mp-utils.cjs')),
                bridge: require(path.join(dir, 'scripts/mp-diy-bridge-merge.cjs')),
                validateRequires: require(path.join(dir, 'scripts/scan-mp-requires.cjs')).validateRequires,
                applyMpWeixinPost: require(path.join(dir, 'scripts/mp-weixin-post.cjs')).applyMpWeixinPost,
                scanAllDiyComponents: require(path.join(dir, 'scripts/diy-component-scan.cjs'))
                    .scanAllDiyComponents
            }
        }
        const parent = path.dirname(dir)
        if (parent === dir) break
        dir = parent
    }
    return null
}

function listAddonPackages(frameworkDir) {
    const pkgRoot = path.join(frameworkDir, 'mp-addons')
    if (!fs.existsSync(pkgRoot)) return []
    return fs
        .readdirSync(pkgRoot, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .filter((key) => fs.existsSync(path.join(pkgRoot, key, 'manifest.json')))
        .sort()
}

function main() {
    const deps = loadMergeDeps(__dirname)
    if (!deps) {
        console.error('[merge-mp-addon] 缺少 lib/ 合并工具，请重新 build:mp-weixin:framework')
        process.exit(1)
    }

    const {
        utils,
        bridge,
        validateRequires,
        applyMpWeixinPost,
        scanAllDiyComponents
    } = deps
    const {
        MP_OUT_BUILD,
        MP_CORE_DIR,
        readJson,
        writeJson,
        readAppJson,
        rmDir,
        copyDir,
        mergeSubPackagesIntoApp,
        mergeCommonDir,
        mergeNodeModulesDir,
        mergeOverlayDir,
        copyMpRelativeFiles,
        getAppSubPackages,
        loadFrameworkNonAddonSubPackages,
        collectPreservedSubPackages,
        mergeMainComponentsDir,
        listMergedAddonKeysFromFramework
    } = utils

    const frameworkDir = resolveFrameworkDir()
    if (!frameworkDir) {
        console.error('[merge-mp-addon] 请在框架小程序目录执行（含 app.json），例如：')
        console.error('  cd dist/build/mp-core')
        console.error('  node merge-mp-addon.cjs')
        process.exit(1)
    }

    const pkgRoot = path.join(frameworkDir, 'mp-addons')
    const available = listAddonPackages(frameworkDir)
    const argvKeys = process.argv.slice(2).filter((a) => !a.startsWith('-'))
    const keys =
        argvKeys.length > 0 ? argvKeys.filter((k) => available.includes(k)) : available

    if (!available.length) {
        console.log('[merge-mp-addon] mp-addons/ 下未发现插件包（需含 manifest.json）')
        console.log(`[merge-mp-addon] 请将插件包放入: ${pkgRoot}/{key}/`)
        process.exit(0)
    }

    if (!keys.length) {
        console.error('[merge-mp-addon] 指定的插件不存在于 mp-addons/：', argvKeys.join(', '))
        console.error('[merge-mp-addon] 可用插件:', available.join(', '))
        process.exit(1)
    }

    console.log(`[merge-mp-addon] framework: ${frameworkDir}`)
    console.log(`[merge-mp-addon] merge keys: ${keys.join(', ')}`)
    console.log('[merge-mp-addon] mode: copy-only (no uni build)')

    function loadManifest(key) {
        return readJson(path.join(pkgRoot, key, 'manifest.json'))
    }

    function mergeOneAddon(key) {
        const pkgDir = path.join(pkgRoot, key)
        const manifest = loadManifest(key)

        for (const root of manifest.roots) {
            const src = path.join(pkgDir, root)
            const dest = path.join(frameworkDir, root)
            if (!fs.existsSync(src)) {
                console.error(`[merge-mp-addon] missing ${root} in ${key}`)
                process.exit(1)
            }
            rmDir(dest)
            copyDir(src, dest)
            console.log(`[merge-mp-addon] copied ${root}`)
        }

        const commonSrc = path.join(pkgDir, 'common')
        const mergedCommon = mergeCommonDir(frameworkDir, commonSrc)
        if (mergedCommon) {
            console.log(`[merge-mp-addon] merged ${mergedCommon} common file(s) from ${key}`)
        }

        const nodeModulesSrc = path.join(pkgDir, 'node-modules')
        const mergedNodeModules = mergeNodeModulesDir(frameworkDir, nodeModulesSrc)
        if (mergedNodeModules) {
            console.log(`[merge-mp-addon] merged ${mergedNodeModules} node-modules file(s) from ${key}`)
        }

        if (manifest.deps?.requirePaths?.length) {
            const mergedDeps = copyMpRelativeFiles(
                pkgDir,
                frameworkDir,
                manifest.deps.requirePaths,
                manifest.roots
            )
            if (mergedDeps) {
                console.log(`[merge-mp-addon] merged ${mergedDeps} main-package dep file(s) from ${key}`)
            }
        }

        for (const comp of manifest.sharedComponents || []) {
            const rel = `addon/components/${comp}`
            const src = path.join(pkgDir, rel)
            if (!fs.existsSync(src)) {
                console.warn(`[merge-mp-addon] missing shared component ${rel} in ${key}`)
                continue
            }
            const merged = mergeOverlayDir(frameworkDir, src, rel)
            if (merged) {
                console.log(`[merge-mp-addon] merged addon/components/${comp} (${merged} file(s))`)
            }
        }

        for (const dir of manifest.mainComponentDirs || []) {
            const src = path.join(pkgDir, dir)
            if (!fs.existsSync(src)) {
                console.warn(`[merge-mp-addon] missing main component dir ${dir} in ${key}`)
                continue
            }
            const merged = mergeMainComponentsDir(frameworkDir, pkgDir, dir)
            if (merged) {
                console.log(`[merge-mp-addon] merged ${dir} (${merged} file(s)) from ${key}`)
            }
        }

        return manifest
    }

    const appPath = path.join(frameworkDir, 'app.json')
    const appJson = readAppJson(frameworkDir)
    const manifests = keys.map((key) => mergeOneAddon(key))

    const baselineNonAddon = loadFrameworkNonAddonSubPackages(frameworkDir)
    if (baselineNonAddon.length) {
        mergeSubPackagesIntoApp(appJson, baselineNonAddon)
        console.log(`[merge-mp-addon] preserved ${baselineNonAddon.length} framework non-addon subPackage(s)`)
    }

    const preserved = collectPreservedSubPackages(appJson, frameworkDir, keys, pkgRoot)
    if (preserved.length) {
        mergeSubPackagesIntoApp(appJson, preserved)
        console.log(
            `[merge-mp-addon] preserved ${preserved.length} existing subPackage(s): ${preserved.map((s) => s.root).join(', ')}`
        )
    }

    for (const m of manifests) {
        mergeSubPackagesIntoApp(appJson, m.subPackages || [])
    }
    writeJson(appPath, appJson)
    console.log(`[merge-mp-addon] app.json subPackages: ${getAppSubPackages(appJson).length}`)

    const allRequirePaths = new Set()
    const allForbidden = new Set()
    for (const m of manifests) {
        for (const p of m.deps?.requirePaths || []) allRequirePaths.add(p)
        for (const p of m.deps?.forbiddenPaths || []) allForbidden.add(p)
    }

    const validation = validateRequires(frameworkDir, [...allRequirePaths], [...allForbidden])
    if (!validation.ok) {
        if (validation.missing.length) {
            console.error('[merge-mp-addon] missing require targets:', validation.missing.slice(0, 20))
        }
        if (validation.forbiddenPaths.length) {
            console.error('[merge-mp-addon] cross-addon requires:', validation.forbiddenPaths)
        }
        process.exit(1)
    }
    console.log('[merge-mp-addon] require validation OK')

    const mergedAddonKeys = listMergedAddonKeysFromFramework(frameworkDir)
    try {
        const bridgeResult = bridge.syncMergedDiyBridgeRouter(frameworkDir, pkgRoot, mergedAddonKeys, {
            scanAllDiyComponents: scanAllDiyComponents || undefined
        })
        if (bridgeResult.routerAddons.length) {
            console.log(
                `[merge-mp-addon] diy router patched: app + ${bridgeResult.routerAddons.join(', ')} (${bridgeResult.componentCount} addon diy components)`
            )
        }
        if (bridgeResult.diyGroupInlineCount) {
            console.log(
                `[merge-mp-addon] diy-group inlined ${bridgeResult.diyGroupInlineCount} diy component(s) (app + merged addons)`
            )
        }
    } catch (err) {
        console.error(String(err.message || err))
        process.exit(1)
    }

    applyMpWeixinPost(frameworkDir)

    writeJson(path.join(frameworkDir, 'mp-merge-meta.json'), {
        time: new Date().toISOString(),
        mergedKeys: mergedAddonKeys,
        subPackageCount: getAppSubPackages(appJson).length,
        mergeMode: 'copy-only'
    })

    const projectRoot = deps.scanAllDiyComponents
        ? path.dirname(path.dirname(deps.libDir === path.join(__dirname, 'lib') ? __dirname : deps.libDir))
        : null
    const defaultMpCore = projectRoot ? MP_CORE_DIR : null

    if (!defaultMpCore || path.resolve(frameworkDir) !== path.resolve(defaultMpCore) || !MP_OUT_BUILD) {
        console.log('[merge-mp-addon] OK（未同步 dist/build/mp-weixin）')
        console.log('[merge-mp-addon] 导入微信开发者工具:', frameworkDir)
        return
    }

    rmDir(MP_OUT_BUILD)
    copyDir(frameworkDir, MP_OUT_BUILD)
    applyMpWeixinPost(MP_OUT_BUILD)
    console.log(`[merge-mp-addon] synced -> ${path.relative(projectRoot, MP_OUT_BUILD)}/`)
    console.log('[merge-mp-addon] 导入微信开发者工具: dist/build/mp-core/ 或 dist/build/mp-weixin/')
}

main()
