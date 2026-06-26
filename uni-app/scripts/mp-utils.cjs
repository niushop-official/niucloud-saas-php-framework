/**
 * 微信小程序双产物构建：路径、分包映射、文件工具
 */
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { spawnSync } = require('child_process')
const { ROOT, BUILD_DIR, PAGES_JSON, parsePagesJson, listAddonKeys, walkFiles } = require('./addon-utils.cjs')

const MP_OUT_BUILD = path.join(ROOT, 'dist', 'build', 'mp-weixin')
/** 框架小程序源码（可直接导入开发者工具，无插件分包） */
const MP_CORE_DIR = path.join(ROOT, 'dist', 'build', 'mp-core')
const MP_FRAMEWORK_DIR = MP_CORE_DIR
const MP_FULL_DIR = path.join(ROOT, 'dist', '.mp-full')
/** 单插件打包产物 dist/mp-weixin-addons/{key}/ */
const MP_ADDONS_DIR = path.join(ROOT, 'dist', 'mp-weixin-addons')
const MP_LOCK_PATH = path.join(BUILD_DIR, 'mp-build-lock.json')
/** 含全部 addon 分包的 pages 快照（generate-split-pages 产出；框架编译会 strip src/pages.json） */
const PAGES_CORE = path.join(BUILD_DIR, 'pages.core.json')

/** 框架包保留的主包级 addon 目录（diy-group 等） */
const MP_FRAMEWORK_ADDON_KEEP = new Set(['components'])
const MP_SHARED_BRIDGE_PAGE = 'app/pages/_mp_shared_bridge/index'
const MP_SHARED_BRIDGE_SRC = path.join(BUILD_DIR, 'mp-shared-bridge')
const ADDON_COMPONENT_IMPORT_RE = /@\/addon\/components\/([^/'"\s]+)(?:\/([^/'"\s]+))?/g
const MAIN_COMPONENT_IMPORT_RE = /@\/components\/([^/'"\s]+(?:\/[^/'"\s]+)*)/g
/** 仅组件、无页面的分包 root（微信 app.json 允许 pages: []） */
const COMPONENT_ONLY_SUBPACKAGE_ROOTS = new Set(['app/components'])
/** 仅组件分包占位页（相对 app/components；微信产物为 app/components/pages/_mp_placeholder.wxml） */
const MP_COMPONENT_SUBPACKAGE_PLACEHOLDER = 'pages/_mp_placeholder'
/** 主包 diy-dynamic-bridge（插件编译含 addon 微页面组件，合并时需覆盖框架 appOnly 版本） */
const DIY_DYNAMIC_BRIDGE_REL = 'components/diy-dynamic-bridge'

function rmDir(dir) {
    if (!fs.existsSync(dir)) return
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
}

function copyDir(src, dest) {
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.cpSync(src, dest, { recursive: true, force: true })
}

function sha256File(filePath) {
    const buf = fs.readFileSync(filePath)
    return crypto.createHash('sha256').update(buf).digest('hex')
}

function hashDirFiles(dir, relativeTo = dir) {
    const out = {}
    if (!fs.existsSync(dir)) return out
    for (const rel of walkJsAndJson(dir)) {
        const abs = path.join(dir, rel)
        out[path.relative(relativeTo, abs).replace(/\\/g, '/')] = sha256File(abs)
    }
    return out
}

function walkJsAndJson(rootDir, base = rootDir) {
    const out = []
    if (!fs.existsSync(rootDir)) return out
    for (const name of fs.readdirSync(rootDir)) {
        const full = path.join(rootDir, name)
        const stat = fs.statSync(full)
        if (stat.isDirectory()) {
            out.push(...walkJsAndJson(full, base))
        } else if (/\.(js|json)$/.test(name)) {
            out.push(path.relative(base, full).replace(/\\/g, '/'))
        }
    }
    return out
}

function getGitCommit() {
    const r = spawnSync('git', ['rev-parse', 'HEAD'], {
        cwd: ROOT,
        encoding: 'utf-8'
    })
    if (r.status === 0) return (r.stdout || '').trim()
    return null
}

function makeBuildId(label) {
    const commit = getGitCommit()
    const ts = new Date().toISOString()
    const raw = `${label}|${commit || 'no-git'}|${ts}`
    return crypto.createHash('sha256').update(raw).digest('hex').slice(0, 12)
}

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function writeJson(filePath, data) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

function readAppJson(mpDir) {
    return readJson(path.join(mpDir, 'app.json'))
}

function hasAddonSubPackages(pagesJson) {
    return (pagesJson.subPackages || []).some((s) => s.root?.startsWith('addon/'))
}

/** 完整 pages（含 addon 分包）；优先 .build/pages.core.json，避免框架编译后 src/pages.json 已 strip addon */
function resolveFullPagesJson() {
    if (fs.existsSync(PAGES_CORE)) {
        const core = readJson(PAGES_CORE)
        if (hasAddonSubPackages(core)) {
            return core
        }
    }
    return parsePagesJson()
}

/** 按插件 key 收集 pages.json 中的分包 root（含 home_service 等多 root） */
function getSubPackageRootsForKey(addonKey, pagesJson = resolveFullPagesJson()) {
    const prefix = `addon/${addonKey}`
    const roots = []
    for (const sub of pagesJson.subPackages || []) {
        const root = sub.root
        if (!root || !root.startsWith('addon/')) continue
        if (root === prefix || root.startsWith(`${prefix}/`)) {
            roots.push(root)
        }
    }
    return [...new Set(roots)].sort()
}

function getAllAddonSubPackageRoots(pagesJson = resolveFullPagesJson()) {
    const map = {}
    for (const sub of pagesJson.subPackages || []) {
        const root = sub.root
        if (!root || !root.startsWith('addon/')) continue
        const parts = root.split('/')
        const key = parts[1]
        if (!key || key === 'components') continue
        if (!map[key]) map[key] = []
        if (!map[key].includes(root)) map[key].push(root)
    }
    for (const key of Object.keys(map)) {
        map[key].sort()
    }
    return map
}

function filterSubPackages(appJson, rootsToKeep) {
    const set = new Set(rootsToKeep)
    const subPackages = (appJson.subPackages || []).filter((s) => set.has(s.root))
    return subPackages
}

function collectCommonManifest(mpDir) {
    const commonDir = path.join(mpDir, 'common')
    const manifest = {}
    if (!fs.existsSync(commonDir)) return manifest
    for (const rel of walkJsAndJson(commonDir)) {
        const abs = path.join(commonDir, rel)
        manifest[`common/${rel}`.replace(/\\/g, '/')] = sha256File(abs)
    }
    return manifest
}

function runUniMpBuild() {
    const r = spawnSync(
        'npx',
        ['uni', 'build', '-p', 'mp-weixin'],
        {
            cwd: ROOT,
            env: {
                ...process.env,
                UNI_PLATFORM: 'mp-weixin',
                NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=4096'
            },
            stdio: 'inherit',
            shell: process.platform === 'win32'
        }
    )
    return r.status ?? 1
}

function snapshotMpBuild(srcDir, destDir, meta) {
    rmDir(destDir)
    copyDir(srcDir, destDir)
    writeJson(path.join(destDir, 'mp-build-meta.json'), {
        ...meta,
        time: new Date().toISOString(),
        gitCommit: getGitCommit()
    })
}

/**
 * 框架编译会残留未注册分包的 addon 目录，删除除 addon/components 外的插件产物
 */
function stripOrphanAddonSubpackages(mpDir) {
    const addonRoot = path.join(mpDir, 'addon')
    if (!fs.existsSync(addonRoot)) return 0
    let removed = 0
    for (const name of fs.readdirSync(addonRoot)) {
        if (MP_FRAMEWORK_ADDON_KEEP.has(name)) continue
        const target = path.join(addonRoot, name)
        if (!fs.statSync(target).isDirectory()) continue
        rmDir(target)
        removed++
        console.log(`[mp-utils] stripped orphan addon/${name}/`)
    }
    return removed
}

function isAddonSubPackageRoot(root) {
    return Boolean(root && root.startsWith('addon/'))
}

function getAppSubPackages(appJson) {
    const upper = appJson.subPackages
    const lower = appJson.subpackages
    if (Array.isArray(upper) && upper.length) return upper
    if (Array.isArray(lower) && lower.length) return lower
    if (Array.isArray(upper)) return upper
    if (Array.isArray(lower)) return lower
    return []
}

function setAppSubPackages(appJson, subPackages) {
    appJson.subPackages = subPackages
    delete appJson.subpackages
    return appJson
}

/** 框架 pages.framework.json 中的非 addon 分包（主包级分包） */
function loadFrameworkNonAddonSubPackages(frameworkDir) {
    if (frameworkDir) {
        const snap = path.join(frameworkDir, 'mp-framework-subpackages.json')
        if (fs.existsSync(snap)) {
            return readJson(snap)
        }
    }
    const frameworkPages = path.join(BUILD_DIR, 'pages.framework.json')
    if (!fs.existsSync(frameworkPages)) return []
    const pages = readJson(frameworkPages)
    return (pages.subPackages || []).filter((s) => s.root && !isAddonSubPackageRoot(s.root))
}

/** pages.json 分包项 → 微信 app.json 格式（pages 为 string[]） */
function normalizeSubPackageEntry(sub) {
    if (!sub?.root) return null
    const pages = (sub.pages || [])
        .map((p) => (typeof p === 'string' ? p : p?.path))
        .filter(Boolean)
    if (!pages.length && !COMPONENT_ONLY_SUBPACKAGE_ROOTS.has(sub.root)) return null
    const out = { root: sub.root, pages }
    if (sub.name != null) out.name = sub.name
    if (sub.independent != null) out.independent = sub.independent
    return out
}

function normalizeAppSubPackages(subPackages) {
    return subPackages.map((s) => normalizeSubPackageEntry(s)).filter(Boolean)
}

/** 框架编译后写入非 addon 分包，并规范化 app.json subPackages */
function applyFrameworkAppJsonSubPackages(mpDir) {
    const appPath = path.join(mpDir, 'app.json')
    if (!fs.existsSync(appPath)) return
    const appJson = readAppJson(mpDir)
    const baseline = loadFrameworkNonAddonSubPackages()
    if (baseline.length) {
        mergeSubPackagesIntoApp(appJson, baseline)
    } else {
        setAppSubPackages(appJson, normalizeAppSubPackages(getAppSubPackages(appJson)))
    }
    writeJson(appPath, appJson)
    const nonAddon = getAppSubPackages(appJson).filter((s) => !isAddonSubPackageRoot(s.root))
    if (nonAddon.length) {
        console.log(
            `[mp-utils] app.json non-addon subPackages: ${nonAddon.map((s) => s.root).join(', ')}`
        )
    }
}

/**
 * 保留 app.json 中不应被本次合并覆盖的分包：
 * - 非 addon 分包
 * - 磁盘上仍存在、且不在本次合并范围内的 addon 分包
 */
function collectPreservedSubPackages(appJson, frameworkDir, mergingKeys, pkgRoot) {
    const existing = getAppSubPackages(appJson)
    const mergingRoots = new Set()
    for (const key of mergingKeys) {
        const manifestPath = path.join(pkgRoot, key, 'manifest.json')
        if (!fs.existsSync(manifestPath)) continue
        for (const root of readJson(manifestPath).roots || []) {
            mergingRoots.add(root)
        }
    }

    const preserved = []
    for (const sub of existing) {
        if (!sub?.root) continue
        if (!isAddonSubPackageRoot(sub.root)) {
            preserved.push(sub)
            continue
        }
        if (mergingRoots.has(sub.root)) continue
        if (fs.existsSync(path.join(frameworkDir, sub.root))) {
            preserved.push(sub)
        }
    }
    return preserved
}

/** 保留指定插件分包目录，删除其余 addon 插件目录 */
function stripAddonSubpackagesExcept(mpDir, keepKeys) {
    const keepRoots = new Set()
    for (const key of keepKeys) {
        for (const root of getSubPackageRootsForKey(key)) {
            keepRoots.add(root)
        }
    }
    const addonRoot = path.join(mpDir, 'addon')
    if (!fs.existsSync(addonRoot)) return 0
    let removed = 0
    for (const name of fs.readdirSync(addonRoot)) {
        if (MP_FRAMEWORK_ADDON_KEEP.has(name)) continue
        const target = path.join(addonRoot, name)
        if (!fs.statSync(target).isDirectory()) continue
        const isKept = [...keepRoots].some((root) => {
            const rel = root.replace(/^addon\//, '')
            return rel === name || rel.startsWith(`${name}/`)
        })
        if (isKept) continue
        rmDir(target)
        removed++
        console.log(`[mp-utils] stripped addon/${name}/`)
    }
    return removed
}

function mergeSubPackagesIntoApp(appJson, newSubs) {
    const existing = normalizeAppSubPackages(getAppSubPackages(appJson))
    const byRoot = new Map(existing.map((s) => [s.root, s]))
    for (const sub of normalizeAppSubPackages(newSubs)) {
        byRoot.set(sub.root, sub)
    }
    setAppSubPackages(appJson, [...byRoot.values()])
    return appJson
}

function getAddonPackageDir(key, _frameworkDir = MP_CORE_DIR) {
    return path.join(MP_ADDONS_DIR, key)
}

function listAddonPackagesInFramework(frameworkDir) {
    const pkgRoot = path.join(frameworkDir, 'mp-addons')
    if (!fs.existsSync(pkgRoot)) return []
    return fs
        .readdirSync(pkgRoot, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .filter((name) => fs.existsSync(path.join(pkgRoot, name, 'manifest.json')))
        .sort()
}

function installMergeScriptToFramework(frameworkDir) {
    const libDir = path.join(frameworkDir, 'lib')
    fs.mkdirSync(libDir, { recursive: true })

    const copyList = [
        ['mp-diy-bridge-merge.cjs', 'mp-diy-bridge-merge.cjs'],
        ['mp-merge-utils.cjs', 'mp-merge-utils.cjs'],
        ['mp-utils.cjs', 'mp-utils.cjs'],
        ['addon-utils.cjs', 'addon-utils.cjs'],
        ['diy-component-scan.cjs', 'diy-component-scan.cjs'],
        ['scan-mp-requires.cjs', 'scan-mp-requires.cjs'],
        ['mp-weixin-post.cjs', 'mp-weixin-post.cjs'],
        ['mp-diy-group-inline.cjs', 'mp-diy-group-inline.cjs'],
        ['mp-diy-registry-runtime.cjs', 'mp-diy-registry-runtime.cjs']
    ]
    for (const [srcName, destName] of copyList) {
        fs.copyFileSync(path.join(ROOT, 'scripts', srcName), path.join(libDir, destName))
    }
    fs.copyFileSync(path.join(ROOT, 'scripts', 'merge-mp-addon.cjs'), path.join(frameworkDir, 'merge-mp-addon.cjs'))

    const tplSrc = path.join(ROOT, 'scripts', 'mp-templates')
    const tplDest = path.join(libDir, 'mp-templates')
    rmDir(tplDest)
    copyDir(tplSrc, tplDest)

    const pkgRoot = path.join(frameworkDir, 'mp-addons')
    fs.mkdirSync(pkgRoot, { recursive: true })

    const readme = path.join(pkgRoot, 'README.txt')
    fs.writeFileSync(
        readme,
        [
            '将插件包放在此目录下，每个插件一个子目录，例如：',
            '',
            '  mp-addons/shop/components/diy-dynamic-bridge-shop/...',
            '  mp-addons/shop/manifest.json (含 diyBridge.registry)',
            '',
            '然后在框架根目录执行（无需 uni 源码，纯拷贝合并）：',
            '  node merge-mp-addon.cjs',
            '  node merge-mp-addon.cjs shop pintuan',
            ''
        ].join('\n'),
        'utf-8'
    )
}

function mergePreloadRules(appJson, rules) {
    if (!rules || !Object.keys(rules).length) return appJson
    appJson.preloadRule = { ...(appJson.preloadRule || {}), ...rules }
    return appJson
}

/** 使用 diy-group 的微页面主包路径 */
const DIY_MICRO_PAGE_PATHS = [
    'app/pages/index/diy',
    'app/pages/index/diy_form',
    'app/pages/index/diy_form_result',
    'app/pages/index/diy_form_detail'
]

/** 插件内带 diy-group 的常见页面（合并插件后写入 preloadRule） */
const DIY_ADDON_PAGE_PATHS = {
    shop: [
        'addon/shop/pages/index',
        'addon/shop/pages/member/index',
        'addon/shop/pages/point/index',
        'addon/shop/pages/goods/detail'
    ],
    pintuan: [
        'addon/pintuan/pages/index',
        'addon/pintuan/pages/member/index',
        'addon/pintuan/pages/goods/detail'
    ]
}

function buildDiyPreloadRules(packageIds, extraPagePaths = []) {
    const packages = [...new Set((packageIds || []).filter(Boolean))]
    if (!packages.length) return {}
    const rule = { network: 'all', packages }
    const rules = {}
    for (const page of [...DIY_MICRO_PAGE_PATHS, ...(extraPagePaths || [])]) {
        rules[page] = { ...rule }
    }
    return rules
}

/** pages.framework.json：为 app/components 注入占位页 */
function ensureComponentSubpackagePlaceholderPagesSubPackages(subPackages) {
    if (!Array.isArray(subPackages)) return
    for (const sub of subPackages) {
        if (sub?.root !== 'app/components') continue
        const pages = sub.pages || []
        const has = pages.some(
            (p) => (typeof p === 'string' ? p : p?.path) === MP_COMPONENT_SUBPACKAGE_PLACEHOLDER
        )
        if (has) continue
        sub.pages = [
            ...pages,
            {
                path: MP_COMPONENT_SUBPACKAGE_PLACEHOLDER,
                style: { navigationStyle: 'custom', navigationBarTitleText: '' }
            }
        ]
    }
}

/** 编译产物：写入占位页四件套（扁平 path.wxml）并 patch app.json subPackages */
function ensureComponentSubpackagePlaceholderMp(mpDir) {
    const legacyDir = path.join(mpDir, 'app/components/_mp_placeholder')
    if (fs.existsSync(legacyDir)) {
        rmDir(legacyDir)
    }

    const pageBase = path.join(mpDir, 'app/components', MP_COMPONENT_SUBPACKAGE_PLACEHOLDER)
    fs.mkdirSync(path.dirname(pageBase), { recursive: true })
    fs.writeFileSync(`${pageBase}.js`, 'Page({})\n', 'utf-8')
    fs.writeFileSync(
        `${pageBase}.json`,
        JSON.stringify({ navigationStyle: 'custom', navigationBarTitleText: '' }) + '\n',
        'utf-8'
    )
    fs.writeFileSync(`${pageBase}.wxml`, '<view></view>\n', 'utf-8')
    fs.writeFileSync(`${pageBase}.wxss`, '\n', 'utf-8')

    const appPath = path.join(mpDir, 'app.json')
    if (!fs.existsSync(appPath)) return false
    const appJson = readAppJson(mpDir)
    const subs = getAppSubPackages(appJson)
    const sub = subs.find((s) => s.root === 'app/components')
    if (!sub) return false
    if (!Array.isArray(sub.pages)) sub.pages = []
    sub.pages = sub.pages.filter((p) => p !== '_mp_placeholder')
    if (!sub.pages.includes(MP_COMPONENT_SUBPACKAGE_PLACEHOLDER)) {
        sub.pages.push(MP_COMPONENT_SUBPACKAGE_PLACEHOLDER)
    }
    writeJson(appPath, appJson)
    return true
}

/** preloadRule.packages 只能引用 subPackages 中已有页面且 root/name 匹配的分包 */
function resolvePreloadPackageIds(appJson, requestedRoots) {
    const subs = getAppSubPackages(appJson)
    const out = []
    for (const req of requestedRoots || []) {
        const normalized = String(req).replace(/\/+$/, '')
        for (const sub of subs) {
            const root = String(sub.root || '').replace(/\/+$/, '')
            const name = sub.name ? String(sub.name).replace(/\/+$/, '') : ''
            const pages = (sub.pages || []).filter(Boolean)
            if (!pages.length) continue
            if (normalized === root || (name && normalized === name)) {
                out.push(name || root)
                break
            }
        }
    }
    return [...new Set(out)]
}

/**
 * 微页面 DIY 组件在 app/components、addon/* 分包内，主包引用需 componentPlaceholder；
 * 必须 preload 对应分包，否则占位 view 不会替换为真实组件（无控制台报错）。
 */
function applyDiyPreloadRules(mpDir, options = {}) {
    const appPath = path.join(mpDir, 'app.json')
    if (!fs.existsSync(appPath)) return null
    ensureComponentSubpackagePlaceholderMp(mpDir)
    const appJson = readAppJson(mpDir)
    const addonRoots = options.addonRoots || []
    const extraPages = (options.addonKeys || []).flatMap((key) => DIY_ADDON_PAGE_PATHS[key] || [])
    const requested = ['app/components', ...addonRoots]
    const packages = resolvePreloadPackageIds(appJson, requested)
    if (!packages.length) {
        console.warn('[mp-utils] diy preloadRule skipped: no preloadable subPackages in app.json')
        return appJson
    }
    mergePreloadRules(appJson, buildDiyPreloadRules(packages, extraPages))
    writeJson(appPath, appJson)
    console.log(`[mp-utils] diy preloadRule packages: ${packages.join(', ')}`)
    return appJson
}

function mergeOverlayDir(targetMpDir, sourceDir, destName) {
    if (!fs.existsSync(sourceDir)) return 0
    const destDir = path.join(targetMpDir, destName)
    fs.mkdirSync(destDir, { recursive: true })
    let count = 0
    function walkCopy(src, dest) {
        for (const name of fs.readdirSync(src)) {
            const s = path.join(src, name)
            const d = path.join(dest, name)
            if (fs.statSync(s).isDirectory()) {
                fs.mkdirSync(d, { recursive: true })
                walkCopy(s, d)
            } else {
                fs.copyFileSync(s, d)
                count++
            }
        }
    }
    walkCopy(sourceDir, destDir)
    return count
}

function mergeCommonDir(targetMpDir, sourceCommonDir) {
    return mergeOverlayDir(targetMpDir, sourceCommonDir, 'common')
}

function mergeNodeModulesDir(targetMpDir, sourceNodeModulesDir) {
    return mergeOverlayDir(targetMpDir, sourceNodeModulesDir, 'node-modules')
}

function readDiyBridgeComponentCount(bridgeDir) {
    const jsonPath = path.join(bridgeDir, 'diy-dynamic-bridge.json')
    if (!fs.existsSync(jsonPath)) return 0
    try {
        return Object.keys(readJson(jsonPath).usingComponents || {}).length
    } catch {
        return 0
    }
}

function packageAddonDiyBridge(key, buildDir, destDir) {
    const rel = `components/diy-dynamic-bridge-${key}`
    const src = path.join(buildDir, rel)
    if (!fs.existsSync(src)) return 0
    copyDir(src, path.join(destDir, rel))
    const jsonPath = fs.existsSync(path.join(src, 'index.json'))
        ? path.join(src, 'index.json')
        : path.join(src, `diy-dynamic-bridge-${key}.json`)
    if (!fs.existsSync(jsonPath)) return 0
    try {
        return Object.keys(readJson(jsonPath).usingComponents || {}).length
    } catch {
        return 0
    }
}

/** @deprecated 单 bridge 模式，已由 packageAddonDiyBridge + router 补丁替代 */
function packageDiyDynamicBridge(buildDir, destDir) {
    const src = path.join(buildDir, DIY_DYNAMIC_BRIDGE_REL)
    if (!fs.existsSync(src)) return 0
    copyDir(src, path.join(destDir, DIY_DYNAMIC_BRIDGE_REL))
    return readDiyBridgeComponentCount(src)
}

/** 合并插件包 diy-dynamic-bridge 到框架主包（覆盖框架 appOnly 版 bridge） */
function mergeDiyDynamicBridge(targetMpDir, sourcePkgDir) {
    const src = path.join(sourcePkgDir, DIY_DYNAMIC_BRIDGE_REL)
    if (!fs.existsSync(src)) return 0
    const dest = path.join(targetMpDir, DIY_DYNAMIC_BRIDGE_REL)
    rmDir(dest)
    copyDir(src, dest)
    return readDiyBridgeComponentCount(dest)
}

/** 从框架包磁盘扫描已合并的插件 key（addon/components 除外） */
function listMergedAddonKeysFromFramework(frameworkDir) {
    const addonRoot = path.join(frameworkDir, 'addon')
    if (!fs.existsSync(addonRoot)) return []
    return fs
        .readdirSync(addonRoot)
        .filter((name) => {
            if (name === 'components') return false
            const p = path.join(addonRoot, name)
            return fs.existsSync(p) && fs.statSync(p).isDirectory()
        })
        .sort()
}

function resolveMpComponentDir(mpDir, bridgeJsonDir, relPath) {
    return path.normalize(path.join(bridgeJsonDir, relPath))
}

/** 校验 bridge usingComponents 指向的编译产物是否存在 */
function validateDiyBridgePaths(frameworkDir) {
    const bridgeJsonDir = path.join(frameworkDir, DIY_DYNAMIC_BRIDGE_REL)
    const jsonPath = path.join(bridgeJsonDir, 'diy-dynamic-bridge.json')
    if (!fs.existsSync(jsonPath)) return []
    const using = readJson(jsonPath).usingComponents || {}
    const missing = []
    for (const [name, rel] of Object.entries(using)) {
        const compDir = resolveMpComponentDir(frameworkDir, bridgeJsonDir, rel)
        const hasJson = fs.existsSync(path.join(compDir + '.json'))
        const hasJs = fs.existsSync(path.join(compDir + '.js'))
        if (!hasJson && !hasJs) {
            missing.push({ name, rel: rel.replace(/\\/g, '/') })
        }
    }
    return missing
}

/**
 * 按已合并插件重新编译 diy-dynamic-bridge（app + 指定 addon，避免引用未合并插件）
 */
function rebuildMpMergedDiyBridge(frameworkDir, mergedAddonKeys) {
    if (!mergedAddonKeys.length) return 0
    const { generateDiyRegistry } = require('./generate-diy-registry.cjs')
    const { generateDiyDynamicBridgeMp } = require('./generate-diy-dynamic-bridge-mp.cjs')
    const { applyMpWeixinPost } = require('./mp-weixin-post.cjs')

    generateDiyRegistry({ addonKeys: mergedAddonKeys })
    generateDiyDynamicBridgeMp({ addonKeys: mergedAddonKeys })

    console.log(
        `[rebuild-mp-diy-bridge] uni build (app + ${mergedAddonKeys.join(', ')}) ...`
    )
    const code = runUniMpBuild()
    if (code !== 0) {
        console.error('[rebuild-mp-diy-bridge] FAILED')
        process.exit(code)
    }
    if (!fs.existsSync(MP_OUT_BUILD)) {
        console.error('[rebuild-mp-diy-bridge] missing output:', MP_OUT_BUILD)
        process.exit(1)
    }

    const count = mergeDiyDynamicBridge(frameworkDir, MP_OUT_BUILD)
    applyMpWeixinPost(frameworkDir)
    console.log(`[rebuild-mp-diy-bridge] OK (${count} components)`)
    return count
}

/** 框架级路径前缀：这些文件框架包一定提供，插件包不需要携带 */
const FRAMEWORK_PATH_PREFIXES = [
    'common/',
    'node-modules/',
    'app/api/',
    'app/stores/',
    'hooks/',
    'locale/',
    'stores/',
    'utils/'
]

function isFrameworkDep(relPath) {
    return FRAMEWORK_PATH_PREFIXES.some((p) => relPath === p || relPath.startsWith(p))
}

function isUnderMpRoots(relPath, roots) {
    return roots.some((root) => relPath === root || relPath.startsWith(`${root}/`))
}

/** 将 mp 根目录下的相对路径文件复制到目标目录（保留相对结构），跳过框架级依赖 */
function copyMpRelativeFiles(srcMpDir, destMpDir, relPaths, skipUnderRoots = []) {
    let count = 0
    let frameworkSkipped = 0
    for (const rel of relPaths) {
        if (skipUnderRoots.length && isUnderMpRoots(rel, skipUnderRoots)) continue
        if (isFrameworkDep(rel)) { frameworkSkipped++; continue }
        const src = path.join(srcMpDir, rel)
        if (!fs.existsSync(src)) continue
        const dest = path.join(destMpDir, rel)
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.copyFileSync(src, dest)
        count++
    }
    if (frameworkSkipped) console.log(`[mp-utils] skipped ${frameworkSkipped} framework deps (already in framework)`)
    return count
}

/** 扫描插件源码引用的共享 addon/components（排除已在框架中的 diy/group） */
function scanAddonSharedComponents(addonKey) {
    const addonDir = path.join(ROOT, 'src', 'addon', addonKey)
    if (!fs.existsSync(addonDir)) return []
    const found = new Set()
    for (const rel of walkFiles(addonDir, (f) => f.endsWith('.vue'), addonDir)) {
        const content = fs.readFileSync(path.join(addonDir, rel), 'utf-8')
        let m
        ADDON_COMPONENT_IMPORT_RE.lastIndex = 0
        while ((m = ADDON_COMPONENT_IMPORT_RE.exec(content)) !== null) {
            let comp = m[1]
            if (m[2] && !/^index(?:\.vue)?$/.test(m[2])) {
                comp = `${m[1]}/${m[2]}`
            }
            if (comp === 'diy/group') continue
            found.add(comp)
        }
    }
    return [...found].sort()
}

function getMpSharedBridgeMetaPath(addonKey) {
    return path.join(MP_SHARED_BRIDGE_SRC, addonKey, 'bridge-meta.json')
}

function readMpSharedBridgeMeta(addonKey) {
    const metaPath = getMpSharedBridgeMetaPath(addonKey)
    const legacyPath = path.join(MP_SHARED_BRIDGE_SRC, addonKey, 'components.json')
    if (fs.existsSync(metaPath)) {
        const meta = readJson(metaPath)
        return {
            sharedComponents: meta.sharedComponents || [],
            mainComponents: meta.mainComponents || []
        }
    }
    if (fs.existsSync(legacyPath)) {
        return { sharedComponents: readJson(legacyPath), mainComponents: [] }
    }
    return { sharedComponents: [], mainComponents: [] }
}

function readMpSharedBridgeComponents(addonKey) {
    return readMpSharedBridgeMeta(addonKey).sharedComponents
}

function mainComponentPathToDir(compPath) {
    const parts = compPath.replace(/\.vue$/, '').split('/')
    return `components/${parts[0]}`
}

/** 扫描插件引用的主包 src/components（含 easycom 标签用法） */
function scanAddonMainComponents(addonKey) {
    const addonDir = path.join(ROOT, 'src', 'addon', addonKey)
    if (!fs.existsSync(addonDir)) return []
    const componentsRoot = path.join(ROOT, 'src', 'components')
    const tagToPath = new Map()
    if (fs.existsSync(componentsRoot)) {
        for (const name of fs.readdirSync(componentsRoot)) {
            const full = path.join(componentsRoot, name)
            if (!fs.statSync(full).isDirectory()) continue
            const vueFile = path.join(full, `${name}.vue`)
            const indexVue = path.join(full, 'index.vue')
            if (fs.existsSync(vueFile)) tagToPath.set(name, `${name}/${name}`)
            else if (fs.existsSync(indexVue)) tagToPath.set(name, `${name}/index`)
        }
    }

    const found = new Set()
    for (const rel of walkFiles(
        addonDir,
        (f) => f.endsWith('.vue') || f.endsWith('.js') || f.endsWith('.ts'),
        addonDir
    )) {
        const content = fs.readFileSync(path.join(addonDir, rel), 'utf-8')
        let m
        MAIN_COMPONENT_IMPORT_RE.lastIndex = 0
        while ((m = MAIN_COMPONENT_IMPORT_RE.exec(content)) !== null) {
            let p = m[1]
            if (/\.(js|ts)$/.test(p)) continue
            p = p.replace(/\.vue$/, '')
            if (p.endsWith('/index')) p = p.slice(0, -6)
            found.add(p)
        }
        for (const [tag, compPath] of tagToPath) {
            if (new RegExp(`<${tag}[\\s/>]`).test(content)) {
                found.add(compPath)
            }
        }
    }
    return [...found].sort()
}

function resolveJsonComponentPath(mpRoot, jsonFile, relPath) {
    if (!relPath.startsWith('.')) return null
    const dir = path.dirname(jsonFile)
    let resolved = path.normalize(path.join(dir, relPath))
    if (!resolved.endsWith('.js') && !resolved.endsWith('.json')) {
        if (fs.existsSync(resolved + '.js')) resolved += '.js'
        else if (fs.existsSync(resolved + '.json')) resolved += '.json'
    }
    if (!resolved.startsWith(mpRoot)) return null
    return path.relative(mpRoot, resolved).replace(/\\/g, '/')
}

function walkJsonFiles(dir, base = dir) {
    const out = []
    if (!fs.existsSync(dir)) return out
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name)
        if (fs.statSync(full).isDirectory()) {
            out.push(...walkJsonFiles(full, base))
        } else if (name.endsWith('.json')) {
            out.push(path.relative(base, full).replace(/\\/g, '/'))
        }
    }
    return out
}

/** 从编译产物 json 的 usingComponents 解析主包 components/ 目录 */
function scanMpMainComponentDirs(mpDir, roots) {
    const dirs = new Set()
    for (const root of roots) {
        const absRoot = path.join(mpDir, root)
        for (const rel of walkJsonFiles(absRoot)) {
            const jsonFile = path.join(absRoot, rel)
            let data
            try {
                data = readJson(jsonFile)
            } catch {
                continue
            }
            for (const spec of Object.values(data.usingComponents || {})) {
                if (typeof spec !== 'string' || !spec.startsWith('.')) continue
                const resolved = resolveJsonComponentPath(mpDir, jsonFile, spec)
                if (!resolved || !resolved.startsWith('components/')) continue
                const parts = resolved.split('/')
                if (parts.length >= 2) dirs.add(`${parts[0]}/${parts[1]}`)
            }
        }
    }
    return [...dirs].sort()
}

function collectMainComponentDirs(buildDir, roots, bridgeMeta) {
    const dirs = new Set(scanMpMainComponentDirs(buildDir, roots))
    for (const comp of bridgeMeta.mainComponents || []) {
        dirs.add(mainComponentPathToDir(comp))
    }
    return [...dirs].sort()
}

function writeMpSharedBridgePage(addonKey, sharedComponents, mainComponents = []) {
    const bridgeDir = path.join(MP_SHARED_BRIDGE_SRC, addonKey)
    fs.mkdirSync(bridgeDir, { recursive: true })
    writeJson(getMpSharedBridgeMetaPath(addonKey), { sharedComponents, mainComponents })

    const importLines = []
    sharedComponents.forEach((comp, index) => {
        importLines.push(`import SharedComp${index} from '@/addon/components/${comp}/index.vue'`)
    })
    mainComponents.forEach((comp, index) => {
        importLines.push(`import MainComp${index} from '@/components/${comp}.vue'`)
    })

    const vue = `<template><view class="mp-shared-bridge"><diy-dynamic-bridge-${addonKey} v-if="false" componentName="" /></view></template>
<script setup lang="ts">
${importLines.join('\n')}
</script>
`
    fs.writeFileSync(path.join(bridgeDir, 'index.vue'), vue, 'utf-8')
}

function packageMainComponents(buildDir, destDir, componentDirs) {
    let count = 0
    for (const dir of componentDirs) {
        const src = path.join(buildDir, dir)
        if (!fs.existsSync(src)) {
            console.warn(`[mp-utils] missing main component dir ${dir}`)
            continue
        }
        copyDir(src, path.join(destDir, dir))
        count++
    }
    return count
}

function mergeMainComponentsDir(targetMpDir, sourceDir, componentDir) {
    return mergeOverlayDir(targetMpDir, path.join(sourceDir, componentDir), componentDir)
}

function injectMpSharedBridgePage(pagesJson) {
    if (!pagesJson.pages.some((p) => p.path === MP_SHARED_BRIDGE_PAGE)) {
        pagesJson.pages.push({
            path: MP_SHARED_BRIDGE_PAGE,
            style: {
                navigationStyle: 'custom',
                navigationBarTitleText: ''
            }
        })
    }
    return pagesJson
}

function installMpSharedBridgePage(addonKey) {
    const bridgeVue = path.join(MP_SHARED_BRIDGE_SRC, addonKey, 'index.vue')
    if (!fs.existsSync(bridgeVue)) return false
    const dest = path.join(ROOT, 'src', MP_SHARED_BRIDGE_PAGE + '.vue')
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(bridgeVue, dest)
    return true
}

function removeMpSharedBridgePage() {
    const destDir = path.join(ROOT, 'src', 'app', 'pages', '_mp_shared_bridge')
    if (fs.existsSync(destDir)) {
        rmDir(destDir)
    }
}

function packageSharedAddonComponents(buildDir, destDir, components) {
    let count = 0
    for (const comp of components) {
        const rel = `addon/components/${comp}`
        const src = path.join(buildDir, rel)
        if (!fs.existsSync(src)) {
            console.warn(`[mp-utils] missing shared component ${rel}`)
            continue
        }
        copyDir(src, path.join(destDir, rel))
        count++
    }
    return count
}

module.exports = {
    ROOT,
    BUILD_DIR,
    PAGES_JSON,
    PAGES_CORE,
    MP_OUT_BUILD,
    MP_CORE_DIR,
    MP_FRAMEWORK_DIR,
    MP_FULL_DIR,
    MP_ADDONS_DIR,
    MP_LOCK_PATH,
    listAddonKeys,
    parsePagesJson,
    resolveFullPagesJson,
    hasAddonSubPackages,
    rmDir,
    copyDir,
    sha256File,
    hashDirFiles,
    walkJsAndJson,
    getGitCommit,
    makeBuildId,
    readJson,
    writeJson,
    readAppJson,
    getSubPackageRootsForKey,
    getAllAddonSubPackageRoots,
    filterSubPackages,
    collectCommonManifest,
    runUniMpBuild,
    snapshotMpBuild,
    stripOrphanAddonSubpackages,
    stripAddonSubpackagesExcept,
    getAppSubPackages,
    setAppSubPackages,
    isAddonSubPackageRoot,
    loadFrameworkNonAddonSubPackages,
    collectPreservedSubPackages,
    normalizeSubPackageEntry,
    normalizeAppSubPackages,
    applyFrameworkAppJsonSubPackages,
    mergeSubPackagesIntoApp,
    mergePreloadRules,
    applyDiyPreloadRules,
    buildDiyPreloadRules,
    ensureComponentSubpackagePlaceholderMp,
    ensureComponentSubpackagePlaceholderPagesSubPackages,
    resolvePreloadPackageIds,
    MP_COMPONENT_SUBPACKAGE_PLACEHOLDER,
    DIY_MICRO_PAGE_PATHS,
    DIY_ADDON_PAGE_PATHS,
    mergeOverlayDir,
    mergeCommonDir,
    mergeNodeModulesDir,
    packageDiyDynamicBridge,
    packageAddonDiyBridge,
    mergeDiyDynamicBridge,
    listMergedAddonKeysFromFramework,
    validateDiyBridgePaths,
    rebuildMpMergedDiyBridge,
    DIY_DYNAMIC_BRIDGE_REL,
    copyMpRelativeFiles,
    scanAddonSharedComponents,
    scanAddonMainComponents,
    writeMpSharedBridgePage,
    readMpSharedBridgeMeta,
    readMpSharedBridgeComponents,
    collectMainComponentDirs,
    packageMainComponents,
    mergeMainComponentsDir,
    scanMpMainComponentDirs,
    injectMpSharedBridgePage,
    installMpSharedBridgePage,
    removeMpSharedBridgePage,
    packageSharedAddonComponents,
    MP_SHARED_BRIDGE_PAGE,
    getAddonPackageDir,
    listAddonPackagesInFramework,
    installMergeScriptToFramework,
    isFrameworkDep,
    FRAMEWORK_PATH_PREFIXES
}
