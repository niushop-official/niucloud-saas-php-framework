/**
 * 双产物组装：框架包 A + 全量 common B + 插件分包 B → dist/build/mp-weixin/
 */
const fs = require('fs')
const path = require('path')
const {
    ROOT,
    MP_OUT_BUILD,
    MP_CORE_DIR,
    MP_FRAMEWORK_DIR,
    MP_FULL_DIR,
    MP_ADDONS_DIR,
    MP_LOCK_PATH,
    rmDir,
    copyDir,
    readJson,
    writeJson,
    readAppJson,
    getAppSubPackages,
    setAppSubPackages,
    stripOrphanAddonSubpackages
} = require('./mp-utils.cjs')
const { validateRequires } = require('./scan-mp-requires.cjs')
const { applyMpWeixinPost } = require('./mp-weixin-post.cjs')

function loadMeta(dir) {
    const p = path.join(dir, 'mp-build-meta.json')
    return fs.existsSync(p) ? readJson(p) : null
}

function loadAddonManifest(key) {
    const p = path.join(MP_CORE_DIR, 'mp-addons', key, 'manifest.json')
    const legacy = path.join(MP_ADDONS_DIR, key, 'manifest.json')
    const manifestPath = fs.existsSync(p) ? p : legacy
    if (!fs.existsSync(manifestPath)) {
        console.error(`[assemble-mp-dual] missing mp-addons/${key}/manifest.json — run build-mp-addon ${key}`)
        process.exit(1)
    }
    return readJson(manifestPath)
}

function copyAddonPayload(outDir, key) {
    const manifest = loadAddonManifest(key)
    const pkgDir = fs.existsSync(path.join(MP_CORE_DIR, 'mp-addons', key))
        ? path.join(MP_CORE_DIR, 'mp-addons', key)
        : path.join(MP_ADDONS_DIR, key)
    for (const root of manifest.roots) {
        const src = path.join(pkgDir, root)
        const dest = path.join(outDir, root)
        if (!fs.existsSync(src)) {
            console.error(`[assemble-mp-dual] missing extracted ${key}/${root}`)
            process.exit(1)
        }
        rmDir(dest)
        copyDir(src, dest)
    }
    return manifest
}

function mergeAppJson(frameworkApp, fullApp, selectedRoots) {
    const rootSet = new Set(selectedRoots)
    const merged = { ...frameworkApp }
    const fullSubs = getAppSubPackages(fullApp)
    const mergedSubs = fullSubs.filter((s) => rootSet.has(s.root))
    setAppSubPackages(merged, mergedSubs)

    return merged
}

function validateLock(frameworkMeta, addonManifests) {
    if (!fs.existsSync(MP_LOCK_PATH)) return
    const lock = readJson(MP_LOCK_PATH)
    if (lock.framework?.buildId && frameworkMeta?.buildId && lock.framework.buildId !== frameworkMeta.buildId) {
        console.warn('[assemble-mp-dual] warn: framework buildId differs from lock')
    }
    for (const m of addonManifests) {
        if (lock.full?.buildId && m.buildId && lock.full.buildId !== m.buildId) {
            console.warn(`[assemble-mp-dual] warn: addon ${m.key} buildId differs from lock.full`)
        }
    }
}

function main() {
    const keys = process.argv.slice(2)
    if (!keys.length) {
        console.error('Usage: node assemble-mp-dual.cjs <addon-key> [addon-key...]')
        process.exit(1)
    }

    if (!fs.existsSync(MP_CORE_DIR)) {
        console.error('[assemble-mp-dual] missing dist/build/mp-core — run build-mp-framework')
        process.exit(1)
    }
    if (!fs.existsSync(MP_FULL_DIR)) {
        console.error('[assemble-mp-dual] missing dist/.mp-full — run build-mp-full')
        process.exit(1)
    }

    const frameworkMeta = loadMeta(MP_CORE_DIR)
    const fullMeta = loadMeta(MP_FULL_DIR)
    const frameworkApp = readAppJson(MP_CORE_DIR)
    const fullApp = readAppJson(MP_FULL_DIR)

    console.log('[assemble-mp-dual] copy framework -> output')
    rmDir(MP_OUT_BUILD)
    copyDir(MP_CORE_DIR, MP_OUT_BUILD)
    stripOrphanAddonSubpackages(MP_OUT_BUILD)

    const fullCommon = path.join(MP_FULL_DIR, 'common')
    const outCommon = path.join(MP_OUT_BUILD, 'common')
    if (fs.existsSync(fullCommon)) {
        rmDir(outCommon)
        copyDir(fullCommon, outCommon)
        console.log('[assemble-mp-dual] common/ <- full build')
    } else {
        console.warn('[assemble-mp-dual] warn: full build has no common/')
    }

    const manifests = []
    const allRoots = []

    for (const key of keys) {
        const manifest = copyAddonPayload(MP_OUT_BUILD, key)
        manifests.push(manifest)
        allRoots.push(...manifest.roots)
    }

    validateLock(frameworkMeta, manifests)

    const mergedApp = mergeAppJson(frameworkApp, fullApp, allRoots)
    writeJson(path.join(MP_OUT_BUILD, 'app.json'), mergedApp)
    console.log(`[assemble-mp-dual] app.json subPackages: ${getAppSubPackages(mergedApp).length}`)

    const allRequirePaths = new Set()
    const allForbidden = new Set()
    for (const m of manifests) {
        for (const p of m.deps?.requirePaths || []) allRequirePaths.add(p)
        for (const p of m.deps?.forbiddenPaths || []) allForbidden.add(p)
    }

    const validation = validateRequires(
        MP_OUT_BUILD,
        [...allRequirePaths],
        [...allForbidden]
    )
    if (!validation.ok) {
        if (validation.missing.length) {
            console.error('[assemble-mp-dual] missing require targets:', validation.missing.slice(0, 20))
        }
        if (validation.forbiddenPaths.length) {
            console.error('[assemble-mp-dual] cross-addon requires:', validation.forbiddenPaths)
        }
        process.exit(1)
    }
    console.log('[assemble-mp-dual] require validation OK')

    applyMpWeixinPost(MP_OUT_BUILD)

    writeJson(path.join(MP_OUT_BUILD, 'mp-assemble-meta.json'), {
        time: new Date().toISOString(),
        frameworkBuildId: frameworkMeta?.buildId,
        fullBuildId: fullMeta?.buildId,
        addonKeys: keys,
        roots: allRoots
    })

    console.log(`[assemble-mp-dual] OK -> ${path.relative(ROOT, MP_OUT_BUILD)}/`)
}

main()
