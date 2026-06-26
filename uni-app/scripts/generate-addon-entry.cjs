/**
 * 为单个 addon 生成 Vite lib 构建入口
 */
const fs = require('fs')
const path = require('path')
const { ROOT, scanAddonPages, scanAddonLocale, scanAddonDiyComponents } = require('./addon-utils.cjs')

const key = process.argv[2] || process.env.ADDON_KEY
if (!key) {
    console.error('Usage: node generate-addon-entry.cjs <addon-key>')
    process.exit(1)
}

const pages = scanAddonPages(key)
const langMap = scanAddonLocale(key)
const diyComponents = scanAddonDiyComponents(key)
const outDir = path.join(ROOT, '.build', 'addons', key)
fs.mkdirSync(outDir, { recursive: true })

const pageLines = pages.map((p) =>
    `    '${p.replace(/'/g, "\\'")}': () => import('@/addon/${key}/${p}.vue'),`
).join('\n')

const diyLines = diyComponents.map((name) =>
    `    '${name}': () => import('@/addon/${key}/components/diy/${name}/index.vue'),`
).join('\n')

function safeImportVar(locale, file) {
    return 'lang_' + `${locale}_${file}`.replace(/[^a-zA-Z0-9_]/g, '_')
}

const langImports = []
const langByLocale = {}
for (const [locale, files] of Object.entries(langMap)) {
    langByLocale[locale] = []
    for (const file of files) {
        const varName = safeImportVar(locale, file)
        langImports.push(`import ${varName} from '@/addon/${key}/locale/${locale}/${file}.json'`)
        langByLocale[locale].push(`    '${file.replace(/'/g, "\\'")}': ${varName}`)
    }
}

const langsBlock = Object.keys(langByLocale).length
    ? `export const langs: Record<string, Record<string, Record<string, string>>> = {\n${
        Object.entries(langByLocale).map(([locale, entries]) =>
            `  '${locale.replace(/'/g, "\\'")}': {\n${entries.join(',\n')}\n  }`
        ).join(',\n')
    }\n}\n`
    : 'export const langs: Record<string, Record<string, Record<string, string>>> = {}\n'

const langCount = Object.values(langMap).reduce((n, files) => n + files.length, 0)

const content = `/* AUTO-GENERATED entry for addon "${key}" */
${langImports.length ? langImports.join('\n') + '\n' : ''}import 'virtual:windi.css'

export const addonKey = '${key}'
export const sharedVersion = 'wap-core-1.0.0'

export const pages: Record<string, () => Promise<any>> = {
${pageLines}
}

export const diyComponents: Record<string, () => Promise<any>> = {
${diyLines}
}

${langsBlock}
import { registerAddonModule } from '@/utils/addon-module-registry'

registerAddonModule(addonKey, { pages, diyComponents, langs })
`

fs.writeFileSync(path.join(outDir, 'entry.ts'), content, 'utf-8')
console.log(`[addon-entry] ${key}: ${pages.length} pages, ${diyComponents.length} diy, ${langCount} locale -> ${path.relative(ROOT, outDir)}/entry.ts`)
