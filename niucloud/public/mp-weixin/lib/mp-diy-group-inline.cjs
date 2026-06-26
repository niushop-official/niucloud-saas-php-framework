/**
 * 合并 / 框架构建后：将微页面 DIY 组件内联进 diy-group（替换 diy-dynamic-bridge）
 * 开发期源码仍用 diy-dynamic-bridge；仅 dist/build/mp-core 产物生效。
 */
const fs = require('fs')
const path = require('path')

const DIY_GROUP_REL = 'addon/components/diy/group'
/** dev / prod：<diy-dynamic-bridge ... /> 或成对标签 */
const DIY_GROUP_BRIDGE_TAG =
    /<diy-dynamic-bridge[^>]*(?:\/>|>\s*<\/diy-dynamic-bridge>)/

/** 旧版：外层 component.d + 内联行（升级时替换） */
const DIY_GROUP_INLINE_BLOCK_RE =
    /<block wx:if="\{\{component\.d\}\}">[\s\S]*?<\/block>/

/** 新版：仅 component.q 内联行（无 resolveDiyMeta 门闩） */
const DIY_GROUP_INLINE_LINES_RE =
    /(  <[a-z0-9-]+ wx:if="\{\{component\.q==='[^']+'\}\}"[\s\S]*?\/>\n?)+/

const DIY_GROUP_BASE_USING = {
    'copy-right': '../../../../components/copy-right/copy-right',
    tabbar: '../../../../components/tabbar/tabbar',
    'top-tabbar': '../../../../components/top-tabbar/top-tabbar',
    'pop-ads': '../../../../components/pop-ads/pop-ads'
}

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function writeJson(filePath, data) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

function getDiyComponentUsingPath(meta) {
    if (!meta?.folder) return null
    if (meta.scope === 'app' || !meta.addonKey) {
        return `../../../../app/components/diy/${meta.folder}/index`
    }
    return `../../../${meta.addonKey}/components/diy/${meta.folder}/index`
}

function resolveMpComponentDir(jsonDir, relPath) {
    return path.normalize(path.join(jsonDir, relPath))
}

/** wx:for-item 上用于路由的内联字段（见 patchDiyGroupJs 注入的 q:o.componentName） */
const DIY_GROUP_INLINE_NAME_KEY = 'q'

function buildInlineWxmlBlock(registryMap, scopeId = 'data-v-ddfdffaf') {
    const entries = Object.entries(registryMap || {}).sort(([a], [b]) => a.localeCompare(b))
    const nameKey = DIY_GROUP_INLINE_NAME_KEY
    const lines = entries.map(([vueName, meta]) => {
        const tag = meta.folder
        // component.i 是 uni-app u-p 序列化包，WXML 无法读取 component.i.componentName
        return `  <${tag} wx:if="{{component.${nameKey}==='${vueName}'}}" class="r-i-f ${scopeId}" u-r="{{component.f}}" bindupdateComponentIsShow="{{component.g}}" u-i="{{component.h}}" bind:__l="__l" u-p="{{component.i}}" />`
    })
    if (!lines.length) return ''
    return `${lines.join('\n')}\n`
}

function replaceInlineWxmlBlock(wxml, inlineBlock) {
    if (DIY_GROUP_BRIDGE_TAG.test(wxml)) {
        return { wxml: wxml.replace(DIY_GROUP_BRIDGE_TAG, inlineBlock), patched: true }
    }
    if (DIY_GROUP_INLINE_BLOCK_RE.test(wxml)) {
        return { wxml: wxml.replace(DIY_GROUP_INLINE_BLOCK_RE, inlineBlock), patched: true }
    }
    if (DIY_GROUP_INLINE_LINES_RE.test(wxml)) {
        return { wxml: wxml.replace(DIY_GROUP_INLINE_LINES_RE, inlineBlock), patched: true }
    }
    if (
        wxml.includes('component.i.componentName===') ||
        wxml.includes(`component.${DIY_GROUP_INLINE_NAME_KEY}===`)
    ) {
        return { wxml, patched: false, error: 'inline block pattern not found' }
    }
    return { wxml, patched: false, error: 'diy-dynamic-bridge tag not found' }
}

function patchDiyGroupJs(jsContent) {
    let out = jsContent
    // prod（压缩）
    out = out.replace(
        /\+\(\(\)=>"\.\.\/\.\.\/\.\.\/\.\.\/components\/diy-dynamic-bridge\/diy-dynamic-bridge\.js"\)\+/g,
        '+'
    )
    out = out.replace(/e\.resolveComponent\("diy-dynamic-bridge"\)\+/g, '')
    out = out.replace(
        /\(null==\(r=o\.getInnerRef\)\?void 0:r\.call\(o\)\)\?\?null/g,
        '(null==(r=o.getInnerRef)?void 0:r.call(o))??o??null'
    )
    if (!out.includes('q:o.componentName')) {
        out = out.replace(/,p:o\.id\}\)\),h:/g, ',p:o.id,q:o.componentName})),h:')
    }
    out = out.replace(
        /\{d:e\.unref\(n\.resolveDiyMeta\)\(o\.componentName\)\},e\.unref\(n\.resolveDiyMeta\)\(o\.componentName\)\?/g,
        '{d:!!o.componentName},o.componentName?'
    )
    // dev（未压缩）
    out = out.replace(
        /const _easycom_diy_dynamic_bridge2 = common_vendor\.resolveComponent\("diy-dynamic-bridge"\);\n/g,
        ''
    )
    out = out.replace(/\(_easycom_diy_dynamic_bridge2 \+ /g, '(')
    out = out.replace(/const _easycom_diy_dynamic_bridge = \(\) => "[^"]+";\n/g, '')
    out = out.replace(/\(topTabbar \+ popAds \+ _easycom_diy_dynamic_bridge \+ /g, '(topTabbar + popAds + ')
    out = out.replace(
        /\(\(_a = bridgeEl\.getInnerRef\) == null \? void 0 : _a\.call\(bridgeEl\)\) \?\? null/g,
        '((_a = bridgeEl.getInnerRef) == null ? void 0 : _a.call(bridgeEl)) ?? bridgeEl ?? null'
    )
    if (!out.includes('q: component.componentName') && !out.includes('q:o.componentName')) {
        out = out.replace(/p: component\.id\n(\s+)\}\)/g, 'q: component.componentName,\n$1p: component.id\n$1})')
    }
    out = out.replace(
        /d: common_vendor\.unref\(utils_diyComponentRegistry\.resolveDiyMeta\)\(component\.componentName\)\n(\s+)\}, common_vendor\.unref\(utils_diyComponentRegistry\.resolveDiyMeta\)\(component\.componentName\) \? \{/g,
        'd: !!component.componentName\n$1}, component.componentName ? {'
    )
    return out
}

function validateInlineRegistry(frameworkDir, registryMap) {
    const jsonDir = path.join(frameworkDir, DIY_GROUP_REL)
    const missing = []
    for (const [name, meta] of Object.entries(registryMap || {})) {
        const rel = getDiyComponentUsingPath(meta)
        if (!rel) continue
        const compDir = resolveMpComponentDir(jsonDir, rel)
        if (!fs.existsSync(`${compDir}.json`) && !fs.existsSync(`${compDir}.js`)) {
            missing.push({ name, rel: rel.replace(/\\/g, '/') })
        }
    }
    return missing
}

function filterRegistryToExisting(frameworkDir, registryMap) {
    const missing = validateInlineRegistry(frameworkDir, registryMap)
    if (!missing.length) return registryMap
    const missingNames = new Set(missing.map((m) => m.name))
    const filtered = {}
    for (const [name, meta] of Object.entries(registryMap || {})) {
        if (!missingNames.has(name)) filtered[name] = meta
    }
    console.warn(
        `[mp-diy-group-inline] skip ${missing.length} component(s) not in mp output: ${missing
            .slice(0, 6)
            .map((m) => m.name)
            .join(', ')}`
    )
    return filtered
}

function buildFullDiyRegistryMap() {
    const { scanAllDiyComponents } = require('./diy-component-scan.cjs')
    const { all } = scanAllDiyComponents()
    const map = {}
    for (const entry of all) {
        map[entry.vueComponentName] = {
            scope: entry.scope,
            folder: entry.folder,
            addonKey: entry.addonKey,
            scrollBool: entry.scrollBool,
            formRef: entry.formRef
        }
    }
    return map
}

function loadRegistryJsonMetaByName() {
    const { ROOT, BUILD_DIR } = require('./addon-utils.cjs')
    const jsonPath = path.join(BUILD_DIR, 'diy-component-registry.json')
    const byName = {}
    if (!fs.existsSync(jsonPath)) return byName
    for (const entry of JSON.parse(fs.readFileSync(jsonPath, 'utf-8')).components || []) {
        byName[entry.vueComponentName] = entry
    }
    return byName
}

/** 扫描 mp-weixin 产物中已编译的 app/addon DIY 目录（含 bridge 拉进来的 addon 组件） */
function scanMpOutputDiyEntries(mpDir) {
    const { kebabToPascal } = require('./diy-component-scan.cjs')
    const rootDir = path.resolve(mpDir)
    const entries = []

    function scanDir(diyDir, scope, addonKey) {
        if (!fs.existsSync(diyDir)) return
        for (const folder of fs.readdirSync(diyDir)) {
            if (folder === 'group') continue
            const compDir = path.join(diyDir, folder)
            if (!fs.statSync(compDir).isDirectory()) continue
            if (!fs.existsSync(path.join(compDir, 'index.json')) && !fs.existsSync(path.join(compDir, 'index.js'))) {
                continue
            }
            entries.push({
                vueComponentName: kebabToPascal(folder),
                scope,
                folder,
                addonKey
            })
        }
    }

    scanDir(path.join(rootDir, 'app/components/diy'), 'app', undefined)

    const addonRoot = path.join(rootDir, 'addon')
    if (fs.existsSync(addonRoot)) {
        for (const name of fs.readdirSync(addonRoot)) {
            const addonPath = path.join(addonRoot, name)
            if (!fs.statSync(addonPath).isDirectory()) continue
            scanDir(path.join(addonPath, 'components/diy'), 'addon', name)
        }
    }
    return entries
}

function buildMpWeixinDiyRegistryMap(mpDir) {
    const metaByName = loadRegistryJsonMetaByName()
    const map = {}
    for (const entry of scanMpOutputDiyEntries(mpDir)) {
        const meta = metaByName[entry.vueComponentName] || {}
        map[entry.vueComponentName] = {
            scope: entry.scope,
            folder: entry.folder,
            addonKey: entry.addonKey || meta.addonKey,
            scrollBool:
                meta.scrollBool ??
                (entry.scope === 'addon' || entry.vueComponentName === 'CarouselSearch'),
            formRef:
                meta.formRef ??
                (entry.vueComponentName.startsWith('Form') && entry.vueComponentName !== 'FormSubmit')
        }
    }
    return map
}

function patchMpWeixinDistRouterBridges(mpDir) {
    const componentsDir = path.join(path.resolve(mpDir), 'components')
    if (!fs.existsSync(componentsDir)) return []
    const { appendRouterAddonBlock, listRouterAddonKeys } = require('./mp-diy-bridge-merge.cjs')
    const patched = []
    for (const name of fs.readdirSync(componentsDir)) {
        if (!name.startsWith('diy-dynamic-bridge-') || name === 'diy-dynamic-bridge-app') continue
        const key = name.slice('diy-dynamic-bridge-'.length)
        if (listRouterAddonKeys(mpDir).includes(key)) continue
        if (appendRouterAddonBlock(mpDir, key)) patched.push(key)
    }
    if (patched.length) {
        console.log(`[mp-diy-group-inline] patched dist router bridges: ${patched.join(', ')}`)
    }
    return patched
}

function writeMergedRegistryFile(mpDir, registryMap) {
    const mergedPath = path.join(
        path.resolve(mpDir),
        'components/diy-dynamic-bridge/diy-registry.merged.js'
    )
    fs.mkdirSync(path.dirname(mergedPath), { recursive: true })
    fs.writeFileSync(mergedPath, `module.exports = ${JSON.stringify(registryMap || {}, null, 2)}\n`, 'utf-8')
}

/**
 * uni dev/build 产物（dist/dev|build/mp-weixin）：按产物扫描 app+addon DIY 并内联 diy-group
 * @param {string} mpDir dist/dev/mp-weixin 或 dist/build/mp-weixin
 * @param {{ patchDistRouter?: boolean }} options
 */
function applyMpWeixinDiyGroupInline(mpDir, options = {}) {
    if (options.patchDistRouter !== false) {
        patchMpWeixinDistRouterBridges(mpDir)
    }
    const registryMap = buildMpWeixinDiyRegistryMap(mpDir)
    const appCount = Object.values(registryMap).filter((m) => m.scope === 'app').length
    const addonCount = Object.values(registryMap).filter((m) => m.scope === 'addon').length
    console.log(
        `[mp-diy-group-inline] mp output registry: app=${appCount}, addon=${addonCount}, total=${Object.keys(registryMap).length}`
    )
    if (!Object.keys(registryMap).length) {
        console.warn('[mp-diy-group-inline] no diy components found in mp output')
        return { count: 0, skipped: true }
    }
    writeMergedRegistryFile(mpDir, registryMap)
    return patchDiyGroupInlineComponents(mpDir, registryMap)
}

/**
 * @param {string} frameworkDir dist/build/mp-core
 * @param {Record<string, object>} registryMap vueComponentName -> meta
 */
function patchDiyGroupInlineComponents(frameworkDir, registryMap) {
    const rootDir = path.resolve(frameworkDir)
    const groupDir = path.join(rootDir, DIY_GROUP_REL)
    const jsonPath = path.join(groupDir, 'index.json')
    const wxmlPath = path.join(groupDir, 'index.wxml')
    const jsPath = path.join(groupDir, 'index.js')

    if (!fs.existsSync(jsonPath) || !fs.existsSync(wxmlPath) || !fs.existsSync(jsPath)) {
        console.warn('[mp-diy-group-inline] skip: diy-group not found in', frameworkDir)
        return { count: 0, skipped: true }
    }

    const missing = validateInlineRegistry(rootDir, registryMap)
    if (missing.length) {
        const sample = missing
            .slice(0, 8)
            .map((m) => `${m.name} -> ${m.rel}`)
            .join(', ')
        throw new Error(`[mp-diy-group-inline] missing diy components: ${sample}`)
    }

    const usingComponents = { ...DIY_GROUP_BASE_USING }
    let count = 0
    for (const meta of Object.values(registryMap || {})) {
        const rel = getDiyComponentUsingPath(meta)
        if (!rel || usingComponents[meta.folder]) continue
        usingComponents[meta.folder] = rel
        count++
    }

    const componentPlaceholder = {}
    for (const key of Object.keys(usingComponents)) {
        componentPlaceholder[key] = 'view'
    }

    writeJson(jsonPath, {
        component: true,
        usingComponents,
        componentPlaceholder
    })

    let wxml = fs.readFileSync(wxmlPath, 'utf-8')
    const scopeMatch = wxml.match(/data-v-[a-f0-9]+/)
    const inlineBlock = buildInlineWxmlBlock(registryMap, scopeMatch ? scopeMatch[0] : 'data-v-ddfdffaf')
    if (!inlineBlock) {
        throw new Error('[mp-diy-group-inline] empty registry, nothing to inline')
    }

    const replaceResult = replaceInlineWxmlBlock(wxml, inlineBlock)
    if (replaceResult.error) {
        throw new Error(`[mp-diy-group-inline] ${replaceResult.error}`)
    }
    if (replaceResult.patched) {
        fs.writeFileSync(wxmlPath, replaceResult.wxml, 'utf-8')
        console.log(
            `[mp-diy-group-inline] diy-group wxml inlined ${Object.keys(registryMap || {}).length} component(s) (component.q, no component.d gate)`
        )
    }

    const jsPatched = patchDiyGroupJs(fs.readFileSync(jsPath, 'utf-8'))
    fs.writeFileSync(jsPath, jsPatched, 'utf-8')

    const { installMergedRegistryResolver } = require('./mp-diy-registry-runtime.cjs')
    installMergedRegistryResolver(rootDir)

    return { count, skipped: false }
}

module.exports = {
    DIY_GROUP_REL,
    DIY_GROUP_BASE_USING,
    getDiyComponentUsingPath,
    patchDiyGroupInlineComponents,
    applyMpWeixinDiyGroupInline,
    buildMpWeixinDiyRegistryMap,
    buildFullDiyRegistryMap,
    patchMpWeixinDistRouterBridges,
    buildInlineWxmlBlock,
    validateInlineRegistry
}
