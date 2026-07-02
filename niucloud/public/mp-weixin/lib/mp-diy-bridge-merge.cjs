/**
 * 小程序 DIY bridge 合并：原生 router 补丁 + 每插件独立 bridge（无需 uni 编译）
 */
const fs = require('fs')
const path = require('path')
const { patchDiyGroupInlineComponents } = require('./mp-diy-group-inline.cjs')

const ROUTER_REL = 'components/diy-dynamic-bridge'
const ROUTER_BASENAME = 'diy-dynamic-bridge'
const MERGE_MARKER = '<!-- MP_MERGE_ADDON_BRIDGES -->'
const ROUTER_TEMPLATE_DIR = fs.existsSync(path.join(__dirname, 'mp-templates', 'diy-dynamic-bridge'))
    ? path.join(__dirname, 'mp-templates', 'diy-dynamic-bridge')
    : path.join(__dirname, '..', 'mp-templates', 'diy-dynamic-bridge')

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function writeJson(filePath, data) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

function rmDir(dir) {
    if (!fs.existsSync(dir)) return
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
}

function copyDir(src, dest) {
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.cpSync(src, dest, { recursive: true, force: true })
}

function getAddonBridgeRel(key) {
    return `components/diy-dynamic-bridge-${key}`
}

function getAddonBridgeTag(key) {
    return `diy-dynamic-bridge-${key}`
}

function getRouterDir(frameworkDir) {
    return path.join(frameworkDir, ROUTER_REL)
}

function getRouterComponentPath(routerDir, ext) {
    return path.join(routerDir, `${ROUTER_BASENAME}.${ext}`)
}

function getRegistryPath(frameworkDir) {
    return path.join(getRouterDir(frameworkDir), 'diy-registry.merged.js')
}

function writeMergedRegistry(frameworkDir, data) {
    const filePath = getRegistryPath(frameworkDir)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(data || {}, null, 2)}\n`, 'utf-8')
}

function readMergedRegistry(frameworkDir) {
    const filePath = getRegistryPath(frameworkDir)
    if (!fs.existsSync(filePath)) {
        const legacyJson = path.join(getRouterDir(frameworkDir), 'diy-registry.merged.json')
        if (fs.existsSync(legacyJson)) {
            return readJson(legacyJson)
        }
        return {}
    }
    delete require.cache[path.resolve(filePath)]
    return require(filePath)
}

function buildAppDiyRegistryMap(scanAllDiyComponents) {
    const { app } = scanAllDiyComponents()
    const map = {}
    for (const entry of app) {
        map[entry.vueComponentName] = {
            scope: 'app',
            folder: entry.folder,
            scrollBool: entry.scrollBool,
            formRef: entry.formRef
        }
    }
    return map
}

function buildAddonDiyRegistryMap(scanAllDiyComponents, addonKey) {
    const { addon } = scanAllDiyComponents({ addonKeys: [addonKey] })
    const map = {}
    for (const entry of addon) {
        map[entry.vueComponentName] = {
            scope: 'addon',
            addonKey: entry.addonKey,
            folder: entry.folder,
            scrollBool: entry.scrollBool,
            formRef: entry.formRef
        }
    }
    return map
}

function installNativeDiyBridgeRouter(frameworkDir, appRegistryMap, templateDir = ROUTER_TEMPLATE_DIR) {
    const routerDir = getRouterDir(frameworkDir)
    rmDir(routerDir)
    fs.mkdirSync(routerDir, { recursive: true })

    const templateMap = {
        js: 'index.js',
        wxml: 'index.wxml',
        json: 'index.json'
    }
    for (const [ext, tplName] of Object.entries(templateMap)) {
        fs.copyFileSync(
            path.join(templateDir, tplName),
            getRouterComponentPath(routerDir, ext)
        )
    }
    writeMergedRegistry(frameworkDir, appRegistryMap || {})
    return routerDir
}

function mergeRegistryEntries(frameworkDir, entries) {
    const current = readMergedRegistry(frameworkDir)
    writeMergedRegistry(frameworkDir, { ...current, ...entries })
}

function listRouterAddonKeys(frameworkDir) {
    const wxmlPath = getRouterComponentPath(getRouterDir(frameworkDir), 'wxml')
    if (!fs.existsSync(wxmlPath)) return []
    const content = fs.readFileSync(wxmlPath, 'utf-8')
    const keys = []
    const re = /id="bridge-([a-zA-Z0-9_-]+)"/g
    let m
    while ((m = re.exec(content))) {
        if (m[1] !== 'app') keys.push(m[1])
    }
    return [...new Set(keys)].sort()
}

function buildAddonBridgeWxmlBlock(key) {
    const tag = getAddonBridgeTag(key)
    return `  <${tag}
    wx:elif="{{routeBridge === '${key}'}}"
    id="bridge-${key}"
    componentName="{{componentName}}"
    component="{{component}}"
    global="{{global}}"
    index="{{index}}"
    scrollBool="{{scrollBool}}"
    bindupdateComponentIsShow="forwardShow"
    bindloadingFn="forwardLoading"
  />
  ${MERGE_MARKER}`
}

function appendRouterAddonBlock(frameworkDir, key) {
    const routerDir = getRouterDir(frameworkDir)
    const wxmlPath = getRouterComponentPath(routerDir, 'wxml')
    const jsonPath = getRouterComponentPath(routerDir, 'json')
    const tag = getAddonBridgeTag(key)

    if (listRouterAddonKeys(frameworkDir).includes(key)) {
        return false
    }

    let wxml = fs.readFileSync(wxmlPath, 'utf-8')
    if (!wxml.includes(MERGE_MARKER)) {
        wxml = wxml.trimEnd() + '\n  ' + MERGE_MARKER + '\n'
    }
    wxml = wxml.replace(MERGE_MARKER, buildAddonBridgeWxmlBlock(key))
    fs.writeFileSync(wxmlPath, wxml, 'utf-8')

    const json = readJson(jsonPath)
    json.usingComponents = json.usingComponents || {}
    json.componentPlaceholder = json.componentPlaceholder || {}
    json.usingComponents[tag] = `../diy-dynamic-bridge-${key}/diy-dynamic-bridge-${key}`
    json.componentPlaceholder[tag] = 'view'
    writeJson(jsonPath, json)
    return true
}

function copyAddonBridgeFromPackage(frameworkDir, pkgDir, key) {
    const rel = getAddonBridgeRel(key)
    const src = path.join(pkgDir, rel)
    if (!fs.existsSync(src)) {
        return 0
    }
    const dest = path.join(frameworkDir, rel)
    rmDir(dest)
    copyDir(src, dest)
    const bridgeDir = dest
    const tag = getAddonBridgeTag(key)
    const jsonPath = fs.existsSync(path.join(bridgeDir, 'index.json'))
        ? path.join(bridgeDir, 'index.json')
        : path.join(bridgeDir, `${tag}.json`)
    if (!fs.existsSync(jsonPath)) return 0
    try {
        return Object.keys(readJson(jsonPath).usingComponents || {}).length
    } catch {
        return 0
    }
}

function resolveMpComponentDir(bridgeJsonDir, relPath) {
    return path.normalize(path.join(bridgeJsonDir, relPath))
}

function validateAddonBridgePaths(frameworkDir, key) {
    const rel = getAddonBridgeRel(key)
    const bridgeDir = path.join(frameworkDir, rel)
    const tag = getAddonBridgeTag(key)
    const jsonPath = fs.existsSync(path.join(bridgeDir, 'index.json'))
        ? path.join(bridgeDir, 'index.json')
        : path.join(bridgeDir, `${tag}.json`)
    if (!fs.existsSync(jsonPath)) {
        return [{ name: tag, rel: rel }]
    }
    const using = readJson(jsonPath).usingComponents || {}
    const missing = []
    for (const [name, compRel] of Object.entries(using)) {
        const compDir = resolveMpComponentDir(bridgeDir, compRel)
        const hasJson = fs.existsSync(`${compDir}.json`)
        const hasJs = fs.existsSync(`${compDir}.js`)
        if (!hasJson && !hasJs) {
            missing.push({ name, rel: compRel.replace(/\\/g, '/'), bridge: key })
        }
    }
    return missing
}

function applyRouterBridgePlaceholders(frameworkDir) {
    const jsonPath = getRouterComponentPath(getRouterDir(frameworkDir), 'json')
    if (!fs.existsSync(jsonPath)) return
    const data = readJson(jsonPath)
    data.componentPlaceholder = data.componentPlaceholder || {}
    for (const key of Object.keys(data.usingComponents || {})) {
        if (!data.componentPlaceholder[key]) {
            data.componentPlaceholder[key] = 'view'
        }
    }
    writeJson(jsonPath, data)
}

function applyAddonBridgePlaceholders(frameworkDir, key) {
    const rel = getAddonBridgeRel(key)
    const tag = getAddonBridgeTag(key)
    const bridgeDir = path.join(frameworkDir, rel)
    const jsonPath = fs.existsSync(path.join(bridgeDir, 'index.json'))
        ? path.join(bridgeDir, 'index.json')
        : path.join(bridgeDir, `${tag}.json`)
    if (!fs.existsSync(jsonPath)) return
    const data = readJson(jsonPath)
    data.componentPlaceholder = data.componentPlaceholder || {}
    for (const compKey of Object.keys(data.usingComponents || {})) {
        if (!data.componentPlaceholder[compKey]) {
            data.componentPlaceholder[compKey] = 'view'
        }
    }
    writeJson(jsonPath, data)
}

function syncMergedDiyBridgeRouter(frameworkDir, pkgRoot, mergedAddonKeys, options = {}) {
    if (!mergedAddonKeys.length) {
        return { routerAddons: [], componentCount: 0, diyGroupInlineCount: 0 }
    }

    let appRegistry = {}
    const existing = readMergedRegistry(frameworkDir)
    for (const [name, meta] of Object.entries(existing)) {
        if (!meta.addonKey) appRegistry[name] = meta
    }
    if (!Object.keys(appRegistry).length && options.scanAllDiyComponents) {
        appRegistry = buildAppDiyRegistryMap(options.scanAllDiyComponents)
    }
    installNativeDiyBridgeRouter(frameworkDir, appRegistry)

    let totalComponents = 0
    for (const key of mergedAddonKeys) {
        const pkgDir = path.join(pkgRoot, key)
        let registry = null
        let count = 0

        if (fs.existsSync(path.join(pkgDir, 'manifest.json'))) {
            const manifest = readJson(path.join(pkgDir, 'manifest.json'))
            registry =
                manifest.diyBridge?.registry ||
                manifest.diyRegistry ||
                (options.scanAllDiyComponents
                    ? buildAddonDiyRegistryMap(options.scanAllDiyComponents, key)
                    : null)
            count = copyAddonBridgeFromPackage(frameworkDir, pkgDir, key)
        }

        if (!count) {
            const existingBridge = path.join(frameworkDir, getAddonBridgeRel(key))
            if (fs.existsSync(existingBridge)) {
                count = readAddonBridgeCount(frameworkDir, key)
            }
        }

        if (!count) {
            // 无 DIY 组件的插件不需要 bridge，跳过
            if (registry && !Object.keys(registry).length) {
                console.log(`[mp-diy-bridge-merge] skip "${key}" (no diy components)`)
                continue
            }
            throw new Error(
                `[mp-diy-bridge-merge] missing bridge for "${key}" (package or framework ${getAddonBridgeRel(key)})`
            )
        }

        if (registry && Object.keys(registry).length) {
            mergeRegistryEntries(frameworkDir, registry)
        }

        appendRouterAddonBlock(frameworkDir, key)
        applyAddonBridgePlaceholders(frameworkDir, key)
        totalComponents += count

        const missing = validateAddonBridgePaths(frameworkDir, key)
        if (missing.length) {
            const sample = missing
                .slice(0, 10)
                .map((m) => `${m.name} -> ${m.rel}`)
                .join(', ')
            throw new Error(`[mp-diy-bridge-merge] bridge "${key}" missing components: ${sample}`)
        }
    }

    applyRouterBridgePlaceholders(frameworkDir)

    const mergedRegistry = readMergedRegistry(frameworkDir)
    const inlineResult = patchDiyGroupInlineComponents(frameworkDir, mergedRegistry)

    return {
        routerAddons: listRouterAddonKeys(frameworkDir),
        componentCount: totalComponents,
        diyGroupInlineCount: inlineResult.count
    }
}

function readAddonBridgeCount(frameworkDir, key) {
    const bridgeDir = path.join(frameworkDir, getAddonBridgeRel(key))
    const tag = getAddonBridgeTag(key)
    const jsonPath = fs.existsSync(path.join(bridgeDir, `${tag}.json`))
        ? path.join(bridgeDir, `${tag}.json`)
        : path.join(bridgeDir, 'index.json')
    if (!fs.existsSync(jsonPath)) return 0
    try {
        return Object.keys(readJson(jsonPath).usingComponents || {}).length
    } catch {
        return 0
    }
}

module.exports = {
    ROUTER_REL,
    MERGE_MARKER,
    getAddonBridgeRel,
    getAddonBridgeTag,
    buildAppDiyRegistryMap,
    buildAddonDiyRegistryMap,
    installNativeDiyBridgeRouter,
    mergeRegistryEntries,
    appendRouterAddonBlock,
    copyAddonBridgeFromPackage,
    validateAddonBridgePaths,
    syncMergedDiyBridgeRouter,
    listRouterAddonKeys,
    applyRouterBridgePlaceholders,
    applyAddonBridgePlaceholders,
    patchDiyGroupInlineComponents
}
