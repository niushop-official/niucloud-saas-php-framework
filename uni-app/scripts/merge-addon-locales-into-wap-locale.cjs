/**
 * 将已构建 addon 的语言包合并进 wap-locale.js（shop.pages.order.list.topay 等扁平 key）
 */
const fs = require('fs')
const path = require('path')
const { ROOT, scanAddonLocale } = require('./addon-utils.cjs')

const MARKER = '/* __addonLocalesMerged */'

function flattenAddonLocale(addonKey, locale, file, pack) {
    const data = {}
    for (const [key, value] of Object.entries(pack || {})) {
        if (typeof value !== 'string') continue
        data[`${addonKey}.${file}.${key}`] = value
        if (file === 'common') data[key] = value
    }
    return data
}

function collectAddonLocaleMessages(addonKeys) {
    const merged = {}
    for (const key of addonKeys) {
        const langMap = scanAddonLocale(key)
        const localeRoot = path.join(ROOT, 'src', 'addon', key, 'locale')
        if (!fs.existsSync(localeRoot)) continue
        for (const [locale, files] of Object.entries(langMap)) {
            if (!merged[locale]) merged[locale] = {}
            for (const file of files) {
                const jsonPath = path.join(localeRoot, locale, `${file}.json`)
                if (!fs.existsSync(jsonPath)) continue
                let pack
                try {
                    pack = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
                } catch {
                    continue
                }
                Object.assign(merged[locale], flattenAddonLocale(key, locale, file, pack))
            }
        }
    }
    return merged
}

function detectI18nVar(wapLocaleJs) {
    const m = wapLocaleJs.match(/\nexport\s*\{[\s\S]*?\b(\w+)\s+as\s+i18n\b/)
    return m ? m[1] : 'm'
}

function mergeIntoWapLocale(wapLocalePath, addonKeys) {
    if (!fs.existsSync(wapLocalePath)) {
        return { ok: false, reason: 'missing wap-locale.js' }
    }
    const messages = collectAddonLocaleMessages(addonKeys)
    const localeCount = Object.keys(messages).length
    if (!localeCount) return { ok: false, reason: 'no addon locale messages' }

    let code = fs.readFileSync(wapLocalePath, 'utf-8')
    if (code.includes(MARKER)) {
        code = code.replace(new RegExp(`\\n${MARKER}[\\s\\S]*$`), '')
    }

    const i18nVar = detectI18nVar(code)
    const payload = JSON.stringify(messages)
    const snippet = `
${MARKER}
;(function(){
  var __p=${payload};
  var __i=${i18nVar};
  if(!__i||!__i.global)return;
  for(var __loc in __p){if(Object.prototype.hasOwnProperty.call(__p,__loc))__i.global.mergeLocaleMessage(__loc,__p[__loc]);}
})();`

    fs.writeFileSync(wapLocalePath, code.trimEnd() + snippet + '\n', 'utf-8')
    const keyCount = Object.values(messages).reduce((n, m) => n + Object.keys(m).length, 0)
    return { ok: true, locales: localeCount, keys: keyCount, i18nVar }
}

module.exports = { mergeIntoWapLocale, collectAddonLocaleMessages, MARKER }

if (require.main === module) {
    const wapPath = process.argv[2]
    const keys = process.argv.slice(3)
    if (!wapPath || !keys.length) {
        console.error('Usage: node merge-addon-locales-into-wap-locale.cjs <wap-locale.js> <addon-key>...')
        process.exit(1)
    }
    const r = mergeIntoWapLocale(path.resolve(wapPath), keys)
    console.log('[merge-addon-locales]', r)
    process.exit(r.ok ? 0 : 1)
}
