/**
 * 为单个 addon 生成 Vite lib 构建入口：.build/addons/{key}/entry.ts
 *
 * 入口导出：
 * - addonKey / sharedVersion
 * - views：视图路径 → 动态 import 函数（运行时 loadAddonView 调用）
 * - langs：各 locale 语言 json 静态 import（打进 index.js，启动时 preload）
 *
 * 由 build-addon.cjs 在 vite build 前调用。
 * 用法：node scripts/generate-addon-entry.cjs <addon-key>
 */
const fs = require('fs')
const path = require('path')
const { ROOT, ADDON_DIR, scanAddonViews, scanAddonLang } = require('./addon-utils.cjs')
const { scanRecursive, resolveConflicts } = require('./scan-exports.cjs')

const key = process.argv[2] || process.env.ADDON_KEY
if (!key) {
    console.error('Usage: node generate-addon-entry.cjs <addon-key>')
    process.exit(1)
}

const views = scanAddonViews(key)
const langMap = scanAddonLang(key)
const outDir = path.join(ROOT, '.build', 'addons', key)
fs.mkdirSync(outDir, { recursive: true })

// views 映射：'order/list' => () => import('.../order/list.vue')
const viewLines = views.map((v) =>
    `    '${v.replace(/'/g, "\\'")}': () => import('@/addon/${key}/views/${v}.vue'),`
).join('\n')

// components 映射：diy/poster/printer/delivery 等子目录下的可复用组件
// 供 loadAddonComponent / diy 编辑页在生产环境使用
const componentSubdirs = ['diy/components', 'diy_form/components', 'poster/components', 'printer/components', 'delivery/components']
const componentLines = []
for (const sub of componentSubdirs) {
    const dir = path.join(ADDON_DIR, key, 'views', sub)
    if (!fs.existsSync(dir)) continue
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.vue'))
    for (const f of files) {
        const name = f.replace('.vue', '')
        componentLines.push(`    '${sub}/${name}': () => import('@/addon/${key}/views/${sub}/${f}'),`)
    }
}
const componentBlock = componentLines.length ? componentLines.join('\n') : ''

// 插件 router/index.ts 中的 ROUTE/NO_LOGIN_ROUTES 不做 re-export
// 原因：
//   1. 生产环境下插件路由由 core 通过后端菜单 API 下发（src/router/index.ts:13 DEV only）
//   2. router/index.ts 通常引用 @/layout/index.vue，该文件又导入 @/utils/addon-loader
//      其中的 import.meta.glob 会匹配数百个核心 .vue 文件，全部打进插件包导致 404
let routerExport = ''
// 如需开发调试，设置 ADDON_ENTRY_DEV=1 环境变量
const isDev = process.env.ADDON_ENTRY_DEV === '1'
const routerPath = path.join(ADDON_DIR, key, 'router', 'index.ts')
if (fs.existsSync(routerPath)) {
    const routerText = fs.readFileSync(routerPath, 'utf-8')
    const routerExports = []
    if (/export\s+(?:const|let|var)\s+ROUTE\b/.test(routerText) || /export\s*\{[^}]*\bROUTE\b/.test(routerText)) {
        routerExports.push('ROUTE')
    }
    if (/export\s+(?:const|let|var)\s+NO_LOGIN_ROUTES\b/.test(routerText) || /export\s*\{[^}]*\bNO_LOGIN_ROUTES\b/.test(routerText)) {
        routerExports.push('NO_LOGIN_ROUTES')
    }
    if (routerExports.length && isDev) {
        routerExport = `export { ${routerExports.join(', ')} } from '@/addon/${key}/router/index.ts'\n`
    }
    if (routerExports.length && !isDev) {
        console.log(`[addon-entry] ${key}: skipping ROUTE/NO_LOGIN_ROUTES re-export (prod: routes from backend API)`)
    }
}

/** 语言 json 文件名含点号，变量名需消毒为合法标识符 */
function safeImportVar(locale, file) {
    return 'lang_' + `${locale}_${file}`.replace(/[^a-zA-Z0-9_]/g, '_')
}

const langImports = []
const langByLocale = {}
for (const [locale, files] of Object.entries(langMap)) {
    langByLocale[locale] = []
    for (const file of files) {
        const varName = safeImportVar(locale, file)
        langImports.push(`import ${varName} from '@/addon/${key}/lang/${locale}/${file}.json'`)
        langByLocale[locale].push(`    '${file.replace(/'/g, "\\'")}': ${varName}`)
    }
}

const langsBlock = Object.keys(langByLocale).length
    ? `export const langs: Record<string, Record<string, Record<string, string>>> = {\n${Object.entries(langByLocale).map(([locale, entries]) =>
        `  '${locale.replace(/'/g, "\\'")}': {\n${entries.join(',\n')}\n  }`
    ).join(',\n')
    }\n}\n`
    : 'export const langs: Record<string, Record<string, Record<string, string>>> = {}\n'

const langCount = Object.values(langMap).reduce((n, files) => n + files.length, 0)

// 插件内部导出冲突检测：扫描 ts/js，告警同名导出及入口保留名冲突
const addonSrcDir = path.join(ADDON_DIR, key)
const addonFiles = scanRecursive(addonSrcDir, { exclude: ['lang', 'views', 'components'], extensions: ['.ts', '.js'] })
const { conflicts: addonConflicts, resolved: addonResolved } = resolveConflicts(addonFiles)
const entryReserved = new Set(['addonKey', 'sharedVersion', 'views', 'components', 'langs', 'ROUTE', 'NO_LOGIN_ROUTES'])
const routerFileKey = 'router_index'
const reservedConflicts = addonResolved.filter(r =>
    r.normal.some(n => entryReserved.has(n) && r.module !== routerFileKey)
)
if (reservedConflicts.length) {
    console.warn(`[addon-entry] ${key}: exports conflicting with entry reserved names:`)
    reservedConflicts.forEach(r => r.normal.filter(n => entryReserved.has(n)).forEach(n =>
        console.warn(`  ${r.module} exports "${n}" which is reserved`)))
}
if (Object.keys(addonConflicts).length) {
    console.warn(`[addon-entry] ${key}: ${Object.keys(addonConflicts).length} internal export conflict(s)`)
}

const content = `/* AUTO-GENERATED entry for addon "${key}" */
${langImports.join('\n')}

export const addonKey = '${key}'
export const sharedVersion = 'admin-core-1.0.0'

export const views: Record<string, () => Promise<any>> = {
${viewLines}
}

export const components: Record<string, () => Promise<any>> = {
${componentBlock}
}

${langsBlock}${routerExport}`

fs.writeFileSync(path.join(outDir, 'entry.ts'), content, 'utf-8')
console.log(`[addon-entry] ${key}: ${views.length} views, ${langCount} lang files -> ${path.relative(ROOT, outDir)}/entry.ts`)
