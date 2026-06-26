/**
 * addon lib 构建会把 @/locale 打进 common 共享 chunk（与 core 各一份 i18n）。
 * 剥离内联 locale，改为 import shared/wap-locale.js 单例。
 */
const fs = require('fs')
const path = require('path')
const { WAP_LOCALE_URL } = require('./shared-external.cjs')

const WAP_LOCALE_IMPORT = `import { t, language, i18n } from "${WAP_LOCALE_URL}";\n`
const CREATE_I18N_IMPORT_RE = /\nimport \{ createI18n \} from "[^"]+";\n/

function findBalancedEnd(code, openIndex, openChar, closeChar) {
    let depth = 0
    for (let i = openIndex; i < code.length; i++) {
        const ch = code[i]
        if (ch === openChar) depth++
        else if (ch === closeChar) {
            depth--
            if (depth === 0) return i
        }
    }
    return -1
}

function removeRange(code, start, endExclusive) {
    if (start < 0 || endExclusive <= start) return code
    return code.slice(0, start) + '\n' + code.slice(endExclusive)
}

function removeLanguageClass(code) {
    const marker = '\nclass Language {'
    const start = code.indexOf(marker)
    if (start === -1) return code
    const braceStart = start + marker.length - 1
    const braceEnd = findBalancedEnd(code, braceStart, '{', '}')
    if (braceEnd === -1) return code
    let end = braceEnd + 1
    const tail = code.slice(end)
    const exportDefault = tail.match(/^\s*export default Language\s*;\s*/)
    if (exportDefault) end += exportDefault[0].length
    return removeRange(code, start, end)
}

function removeFunctionDeclaration(code, name) {
    const re = new RegExp(`\\nfunction ${name}\\(`)
    const match = re.exec(code)
    if (!match) return code
    const start = match.index
    const braceStart = code.indexOf('{', start)
    if (braceStart === -1) return code
    const braceEnd = findBalancedEnd(code, braceStart, '{', '}')
    if (braceEnd === -1) return code
    return removeRange(code, start, braceEnd + 1)
}

function removeCreateI18nBlock(code) {
    const marker = '\nlet i18n = createI18n('
    const start = code.indexOf(marker)
    if (start === -1) return code
    const parenStart = start + marker.length - 1
    const parenEnd = findBalancedEnd(code, parenStart, '(', ')')
    if (parenEnd === -1) return code
    let end = parenEnd + 1
    while (end < code.length && /[;\s]/.test(code[end])) end++
    const languageInit = code.slice(end).match(/^\s*const language = new Language\(i18n\)\s*;\s*/)
    if (languageInit) end += languageInit[0].length
    return removeRange(code, start, end)
}

function removeLocalTFunction(code) {
    const marker = '\nconst t = (message'
    const start = code.indexOf(marker)
    if (start === -1) return code
    const braceStart = code.indexOf('{', start)
    if (braceStart === -1) return code
    const braceEnd = findBalancedEnd(code, braceStart, '{', '}')
    if (braceEnd === -1) return code
    let end = braceEnd + 1
    while (end < code.length && /[;\s]/.test(code[end])) end++
    return removeRange(code, start, end)
}

function insertWapLocaleImport(code) {
    if (code.includes(WAP_LOCALE_URL)) return code
    const lastImport = code.lastIndexOf('\nimport ')
    if (lastImport === -1) return WAP_LOCALE_IMPORT + code
    const lineEnd = code.indexOf('\n', lastImport + 1)
    return code.slice(0, lineEnd + 1) + WAP_LOCALE_IMPORT + code.slice(lineEnd + 1)
}

function patchLocaleLeak(code) {
    if (!code.includes('createI18n') && !code.includes('class Language')) return null
    if (code.includes(WAP_LOCALE_URL) && !code.includes('class Language')) return null

    let next = code.replace(CREATE_I18N_IMPORT_RE, `\n${WAP_LOCALE_IMPORT}`)
    next = insertWapLocaleImport(next)
    next = removeLanguageClass(next)
    next = removeFunctionDeclaration(next, 'resolveInitialLocale')
    next = removeCreateI18nBlock(next)
    next = removeLocalTFunction(next)

    if (next === code) return null
    return next
}

function patchAddonDir(addonDir) {
    const assetsDir = path.join(addonDir, 'assets')
    if (!fs.existsSync(assetsDir)) return { patched: 0 }

    let patched = 0
    for (const name of fs.readdirSync(assetsDir)) {
        if (!name.endsWith('.js')) continue
        const filePath = path.join(assetsDir, name)
        const code = fs.readFileSync(filePath, 'utf-8')
        const next = patchLocaleLeak(code)
        if (!next) continue
        fs.writeFileSync(filePath, next, 'utf-8')
        patched++
        console.log(`[patch-addon-locale-leak] ${path.relative(addonDir, filePath)}`)
    }
    return { patched }
}

module.exports = { patchLocaleLeak, patchAddonDir, WAP_LOCALE_IMPORT }

if (require.main === module) {
    const dir = process.argv[2]
    if (!dir) {
        console.error('Usage: node patch-addon-locale-leak.cjs <addon-dir>')
        process.exit(1)
    }
    const r = patchAddonDir(path.resolve(dir))
    console.log('[patch-addon-locale-leak]', r)
}
