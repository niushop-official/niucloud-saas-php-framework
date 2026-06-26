/**

 * 将页面 chunk 用到的 Windi 工具类从 style.css 提取并内联注入，

 * 避免仅依赖 style.css 外链导致 DevTools 中找不到 .h-[74rpx] 等规则。

 */

const fs = require('fs')

const path = require('path')

const { readWindiBlock, parseWindiRuleMap } = require('./generate-addon-windi-css.cjs')



const MARKER_PREFIX = '__addonChunkWindiInjected'



function extractClassTokens(code) {

    const tokens = new Set()

    const patterns = [

        /class:\s*"([^"]+)"/g,

        /class:\s*'([^']+)'/g,

        /class:\s*`([^`$]+)`/g

    ]

    for (const re of patterns) {

        let m

        while ((m = re.exec(code))) {

            for (const t of m[1].split(/\s+/)) {

                if (t) tokens.add(t)

            }

        }

    }

    return tokens

}



function buildChunkWindiCss(code, ruleMap) {

    const tokenSet = extractClassTokens(code)

    const used = []

    const seen = new Set()

    // 按 Windi 全局生成顺序输出，避免按 chunk 扫描顺序打乱 text-* / leading-* 优先级

    for (const [token, rule] of ruleMap) {

        if (!tokenSet.has(token) || seen.has(token)) continue

        seen.add(token)

        used.push(rule)

    }

    return used.join('')

}



function buildInjectSnippet(chunkName, css) {

    if (!css) return ''

    const id = chunkName.replace(/\.js$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')

    const cssLiteral = JSON.stringify(css)

    return `/* ${MARKER_PREFIX}:${id} */(function(i,c){if(typeof document==="undefined"||!c)return;const k="adw-"+i;if(document.getElementById(k))return;const s=document.createElement("style");s.id=k;s.textContent=c;document.head.appendChild(s)})("${id}",${cssLiteral});\n`

}



function injectChunkWindiCss(addonDir) {

    const windiCss = readWindiBlock(addonDir)

    if (!windiCss) return { injected: 0, skipped: 0, reason: 'no windi block' }



    const ruleMap = parseWindiRuleMap(windiCss)

    if (!ruleMap.size) return { injected: 0, skipped: 0, reason: 'empty rule map' }



    const assetsDir = path.join(addonDir, 'assets')

    if (!fs.existsSync(assetsDir)) return { injected: 0, skipped: 0 }



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



        const css = buildChunkWindiCss(code, ruleMap)

        const snippet = buildInjectSnippet(name, css)

        if (!snippet) continue



        fs.writeFileSync(filePath, snippet + code, 'utf-8')

        injected++

    }



    return { injected, skipped, rules: ruleMap.size }

}



module.exports = { injectChunkWindiCss, extractClassTokens, MARKER_PREFIX }



if (require.main === module) {

    const dir = process.argv[2]

    if (!dir) {

        console.error('Usage: node inject-addon-chunk-windi.cjs <addon-dir>')

        process.exit(1)

    }

    const r = injectChunkWindiCss(path.resolve(dir))

    console.log('[inject-chunk-windi]', r)

}


