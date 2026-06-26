/**
 * addon 页面经 bridge 以子组件挂载，不会走 uni setupPage，DOM 上缺少 data-v-*。
 * 将 style.css 中对应 scope 的规则去属性化，并在页面 chunk 加载时注入。
 */
const fs = require('fs')
const path = require('path')

const MARKER_PREFIX = '__addonChunkCssInjected'
const SCOPE_ID_RE = /__scopeId",\s*"(data-v-[a-f0-9]+)"/

function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function extractRulesForScope(css, scopeId) {
    const rules = []
    const re = /[^{@/][^{}]*\{[^{}]*\}/g
    let m
    while ((m = re.exec(css))) {
        if (m[0].includes(scopeId)) rules.push(m[0])
    }
    return rules
}

function descopeSelector(selector, wrapClass, scopeId) {
    const attrRe = new RegExp(`\\[${escapeRegExp(scopeId)}\\]`, 'g')
    let s = selector.trim().replace(attrRe, '').replace(/\s+/g, ' ').trim()
    if (!s) return `.${wrapClass}`
    return `.${wrapClass} ${s}`
}

function descopeRule(rule, wrapClass, scopeId) {
    const idx = rule.indexOf('{')
    if (idx < 0) return rule
    const selectorPart = rule.slice(0, idx)
    const bodyPart = rule.slice(idx)
    const selectors = selectorPart.split(',').map((sel) => descopeSelector(sel, wrapClass, scopeId))
    return `${selectors.join(',')}${bodyPart}`
}

function buildDescopedCss(css, scopeId) {
    const hash = scopeId.replace('data-v-', '')
    const wrapClass = `addon-wrap-${hash}`
    return extractRulesForScope(css, scopeId)
        .map((rule) => descopeRule(rule, wrapClass, scopeId))
        .join('')
}

function buildInjectSnippet(scopeId, descopedCss) {
    const hash = scopeId.replace('data-v-', '')
    if (!descopedCss) return ''
    const cssLiteral = JSON.stringify(descopedCss)
    return `/* ${MARKER_PREFIX}:${hash} */(function(h,c){if(typeof document==="undefined")return;const k="adc-"+h;if(document.getElementById(k))return;const s=document.createElement("style");s.id=k;s.textContent=c;document.head.appendChild(s)})("${hash}",${cssLiteral});\n`
}

function injectChunkScopedCss(addonDir) {
    const cssPath = path.join(addonDir, 'style.css')
    const assetsDir = path.join(addonDir, 'assets')
    if (!fs.existsSync(cssPath) || !fs.existsSync(assetsDir)) return { injected: 0, skipped: 0 }

    const css = fs.readFileSync(cssPath, 'utf-8')
    let injected = 0
    let skipped = 0

    for (const name of fs.readdirSync(assetsDir)) {
        if (!name.endsWith('.js')) continue
        const filePath = path.join(assetsDir, name)
        let code = fs.readFileSync(filePath, 'utf-8')
        if (code.includes(MARKER_PREFIX)) {
            skipped++
            continue
        }

        const scopeMatch = code.match(SCOPE_ID_RE)
        if (!scopeMatch) continue

        const scopeId = scopeMatch[1]
        const descopedCss = buildDescopedCss(css, scopeId)
        const snippet = buildInjectSnippet(scopeId, descopedCss)
        if (!snippet) continue

        fs.writeFileSync(filePath, snippet + code, 'utf-8')
        injected++
    }

    return { injected, skipped }
}

module.exports = { injectChunkScopedCss, buildDescopedCss, MARKER_PREFIX }

if (require.main === module) {
    const dir = process.argv[2]
    if (!dir) {
        console.error('Usage: node inject-addon-chunk-scoped-css.cjs <addon-dir>')
        process.exit(1)
    }
    const result = injectChunkScopedCss(path.resolve(dir))
    console.log(`[inject-chunk-css] injected=${result.injected} skipped=${result.skipped}`)
}
