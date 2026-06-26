/**
 * Core 构建会把 @/locale 打进 index.js（uni-app 忽略 rollup external）。
 * 剥离内联 createI18n + Language，改为 import shared/wap-locale.js 单例。
 */
const fs = require('fs')
const path = require('path')
const { WAP_LOCALE_URL } = require('./shared-external.cjs')

const WAP_LOCALE_IMPORT =
    `import{t as __wapT,language as __wapLanguage,i18n as __wapI18n,default as __wapLocaleDefault}from"${WAP_LOCALE_URL}";`

const CREATE_I18N_IMPORT_RE =
    /import\{createI18n as [\w$]+\}from"\/wap\/assets\/shared\/vue-i18n\.js";/

const MINIFIED_IDENT = '[\\w$]+'

function escapeRe(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function findLocaleBlock(code) {
    const startMatch = code.match(new RegExp(`let (${MINIFIED_IDENT})=[\\w$]+\\(\\{locale:`))
    if (!startMatch) return null

    const i18nVar = startMatch[1]
    const start = startMatch.index
    const head = code.slice(start, start + 1200)
    if (!head.includes('globalInjection:!0')) return null

    const classMatch = code.slice(start).match(new RegExp(`const (${MINIFIED_IDENT})=new class\\{`))
    if (!classMatch) return null

    const langVar = classMatch[1]
    const classStart = start + classMatch.index

    const endToken = `}(${i18nVar});`
    let endPos = -1
    let pos = classStart
    while (true) {
        const next = code.indexOf(endToken, pos)
        if (next < 0) break
        endPos = next
        pos = next + endToken.length
    }
    if (endPos < 0) return null

    const block = code.slice(start, endPos + endToken.length)
    if (!block.includes('loadLocaleMessages') || !block.includes('mergeLocaleMessage')) {
        return null
    }

    return {
        start,
        end: endPos + endToken.length,
        i18nVar,
        langVar
    }
}

function findInlineLocaleSymbols(code, i18nVar, langVar) {
    const i18n = escapeRe(i18nVar)
    const lang = escapeRe(langVar)
    const tRe = new RegExp(
        '(' +
            MINIFIED_IDENT +
            ')=' +
            MINIFIED_IDENT +
            '=>\\{let ' +
            MINIFIED_IDENT +
            '=' +
            MINIFIED_IDENT +
            '\\(\\);const ' +
            MINIFIED_IDENT +
            '=`\\$\\{' +
            lang +
            '\\.getFileKey\\(' +
            MINIFIED_IDENT +
            '\\)\\.fileKey\\}\\.\\$\\{' +
            MINIFIED_IDENT +
            '\\}`;return ' +
            i18n +
            '\\.global\\.t\\(' +
            MINIFIED_IDENT +
            '\\)!=' +
            MINIFIED_IDENT +
            '\\?' +
            i18n +
            '\\.global\\.t\\(' +
            MINIFIED_IDENT +
            '\\):' +
            i18n +
            '\\.global\\.t\\(' +
            MINIFIED_IDENT +
            '\\)!=' +
            MINIFIED_IDENT +
            '\\?' +
            i18n +
            '\\.global\\.t\\(' +
            MINIFIED_IDENT +
            '\\):""\\}'
    )
    const tMatch = code.match(tRe)

    const pluginRe = new RegExp(
        `(${MINIFIED_IDENT})=\\{install\\(${MINIFIED_IDENT}\\)\\{${MINIFIED_IDENT}\\.use\\(${i18n}\\)\\}\\}`
    )
    const pluginMatch = code.match(pluginRe)

    return { tMatch, pluginMatch }
}

function patchReferences(next, i18nVar, langVar) {
    const lang = escapeRe(langVar)
    const i18n = escapeRe(i18nVar)
    next = next.replace(new RegExp(`${lang}\\.loadLocaleMessages`, 'g'), '__wapLanguage.loadLocaleMessages')
    next = next.replace(new RegExp(`${lang}\\.getFileKey`, 'g'), '__wapLanguage.getFileKey')
    next = next.replace(new RegExp(`${lang}\\.loadAllLocaleMessages`, 'g'), '__wapLanguage.loadAllLocaleMessages')
    next = next.replace(new RegExp(`${i18n}\\.global`, 'g'), '__wapI18n.global')
    return next
}

function fixExportAliases(next, i18nVar, langVar, tVar, pluginVar) {
    const pairs = [
        [langVar, '__wapLanguage'],
        [i18nVar, '__wapI18n'],
        [tVar, '__wapT'],
        [pluginVar, '__wapLocaleDefault']
    ]
    for (const [from, to] of pairs) {
        if (!from || from === to) continue
        next = next.replace(new RegExp(`${escapeRe(from)} as `, 'g'), `${to} as `)
    }
    return next
}

function fixLocaleExportLeaks(code) {
    if (!code.includes(WAP_LOCALE_URL)) return null
    const exportIdx = code.lastIndexOf('export{')
    if (exportIdx < 0) return null

    const head = code.slice(0, exportIdx)
    let next = code
    let changed = false

    for (const [bad, good] of [
        ['QL', '__wapLanguage'],
        ['UL', '__wapI18n'],
        ['m$', '__wapLanguage'],
        ['g$', '__wapI18n']
    ]) {
        const exportRe = new RegExp(`\\b${escapeRe(bad)} as `, 'g')
        if (!exportRe.test(code.slice(exportIdx))) continue
        const defRe = new RegExp(`\\b(?:const|let|var|function) ${escapeRe(bad)}\\b|(?:^|[=,;(])${escapeRe(bad)}=`)
        if (defRe.test(head)) continue
        next = next.replace(exportRe, `${good} as `)
        changed = true
    }

    return changed ? next : null
}

function validatePatchedSyntax(code, langVar, i18nVar) {
    if (!code.includes(WAP_LOCALE_URL) || !code.includes('__wapI18n')) return false
    if (
        new RegExp(`let ${MINIFIED_IDENT}=[\\w$]+\\(\\{locale:[\\s\\S]{0,1200}?globalInjection:!0`).test(
            code
        )
    ) {
        return false
    }
    if (/[\w$]+=__wapT[.`]/.test(code)) return false
    if (/async loadSplitAddonLocale/.test(code)) return false
    if (/async loadSplitAppLocale/.test(code)) return false
    if (
        new RegExp(`\\}\\(${MINIFIED_IDENT}\\);function ${MINIFIED_IDENT}\\(e\\)\\{return uni\\.getStorageSync\\("pid"\\)`).test(
            code
        )
    ) {
        return false
    }
    if (/new class\{constructor\(e\)\{[^}]*loadLocale/.test(code)) return false

    const exportPart = code.slice(code.lastIndexOf('export{'))
    if (langVar && new RegExp(`${escapeRe(langVar)} as `).test(exportPart)) return false
    if (i18nVar && new RegExp(`${escapeRe(i18nVar)} as `).test(exportPart)) return false
    return true
}

function patchCoreIndex(code) {
    if (code.includes(WAP_LOCALE_URL)) return null
    if (!CREATE_I18N_IMPORT_RE.test(code)) return null

    const block = findLocaleBlock(code)
    if (!block) return null

    const { start, end, i18nVar, langVar } = block
    const { tMatch, pluginMatch } = findInlineLocaleSymbols(code, i18nVar, langVar)

    let next = code.slice(0, start) + code.slice(end)
    next = next.replace(CREATE_I18N_IMPORT_RE, WAP_LOCALE_IMPORT)

    if (tMatch) {
        next = next.replace(tMatch[0], `${tMatch[1]}=__wapT`)
    }

    if (pluginMatch) {
        next = next.replace(pluginMatch[0], `${pluginMatch[1]}=__wapLocaleDefault`)
    }

    next = patchReferences(next, i18nVar, langVar)
    next = fixExportAliases(
        next,
        i18nVar,
        langVar,
        tMatch ? tMatch[1] : null,
        pluginMatch ? pluginMatch[1] : null
    )

    if (!validatePatchedSyntax(next, langVar, i18nVar)) return null
    return next
}

function patchCoreH5Dir(h5Dir) {
    const assetsDir = path.join(h5Dir, 'assets')
    if (!fs.existsSync(assetsDir)) return { patched: 0, failed: 0 }

    let patched = 0
    let failed = 0
    for (const name of fs.readdirSync(assetsDir)) {
        if (!name.startsWith('index-') || !name.endsWith('.js')) continue
        const filePath = path.join(assetsDir, name)
        const code = fs.readFileSync(filePath, 'utf-8')
        let next = patchCoreIndex(code)
        if (!next) {
            next = fixLocaleExportLeaks(code)
            if (next) {
                fs.writeFileSync(filePath, next, 'utf-8')
                patched++
                console.log(`[patch-core-locale-external] export-leak ${name}`)
                continue
            }
            if (findLocaleBlock(code) && !code.includes(WAP_LOCALE_URL)) {
                failed++
                console.error(`[patch-core-locale-external] inline locale not patched: ${name}`)
            } else if (code.includes(WAP_LOCALE_URL) && !validatePatchedSyntax(code)) {
                failed++
                console.error(`[patch-core-locale-external] invalid patched file (rebuild core): ${name}`)
            }
            continue
        }
        fs.writeFileSync(filePath, next, 'utf-8')
        patched++
        console.log(`[patch-core-locale-external] ${name}`)
    }
    return { patched, failed }
}

module.exports = {
    patchCoreIndex,
    patchCoreH5Dir,
    findLocaleBlock,
    validatePatchedSyntax,
    fixLocaleExportLeaks
}

if (require.main === module) {
    const dir = process.argv[2]
    if (!dir) {
        console.error('Usage: node patch-core-locale-external.cjs <h5-dir>')
        process.exit(1)
    }
    const r = patchCoreH5Dir(path.resolve(dir))
    console.log('[patch-core-locale-external]', r)
    process.exit(r.failed > 0 ? 1 : 0)
}
