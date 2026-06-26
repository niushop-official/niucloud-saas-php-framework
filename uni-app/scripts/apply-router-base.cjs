/**
 * H5 产物注入站点 ID 动态 router base（与 publish.cjs solve 一致）
 */
const fs = require('fs')
const path = require('path')

const ROUTER_MATCH = 'const match = location.href.match(/\\/wap\\/(\\d*)\\//);'
const ROUTER_REPLACE =
    'router:{mode:"history",base: match ? `/wap/${match[1]}/` : "/wap/",assets:"assets",routerBase: match ? `/wap/${match[1]}/` : "/wap/"},darkmode'

function patchIndexJs(content) {
    if (content.includes(ROUTER_MATCH)) return content
    let next = ROUTER_MATCH + content
    next = next.replace(/router:{(.*?)},darkmode/s, ROUTER_REPLACE)
    return next
}

function applyRouterBase(assetsDir) {
    if (!fs.existsSync(assetsDir)) return 0
    let patched = 0
    for (const file of fs.readdirSync(assetsDir)) {
        if (!/^(index-)(\w{8})(\.js)$/.test(file)) continue
        const fn = path.join(assetsDir, file)
        const content = fs.readFileSync(fn, 'utf-8')
        const next = patchIndexJs(content)
        if (next !== content) {
            fs.writeFileSync(fn, next, 'utf-8')
            patched++
            console.log(`[apply-router-base] patched assets/${file}`)
        }
    }
    return patched
}

module.exports = { applyRouterBase, patchIndexJs, ROUTER_MATCH }
