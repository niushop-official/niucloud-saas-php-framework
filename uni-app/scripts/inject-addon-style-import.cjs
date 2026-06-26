/**
 * 历史构建曾在 index.js 顶部注入 style.css 自动加载，会导致启动时加载全部插件样式并互相覆盖。
 * 现改为运行时按需加载：ensureAddonStyles(addonKey)（见 addon-lang.ts / addon-loader.split.ts）。
 * 本脚本仅用于从产物 index.js 中移除旧注入片段。
 */
const fs = require('fs')
const path = require('path')

const MARKER = '__addonStyleInjected'
const SNIPPET_RE = new RegExp(
    `/\\* ${MARKER} \\*/try\\{const __addonStyle=document\\.createElement\\("link"\\);[\\s\\S]*?\\}catch\\(e\\)\\{\\}\\n?`,
    'g'
)

/** @deprecated 不再注入；保留函数名供旧脚本引用，始终返回 false */
function injectAddonStyleImport() {
    return false
}

function stripAddonStyleImport(addonDir) {
    const indexPath = path.join(addonDir, 'index.js')
    if (!fs.existsSync(indexPath)) return false

    const code = fs.readFileSync(indexPath, 'utf-8')
    if (!code.includes(MARKER)) return false

    fs.writeFileSync(indexPath, code.replace(SNIPPET_RE, ''), 'utf-8')
    return true
}

module.exports = { injectAddonStyleImport, stripAddonStyleImport, MARKER }

if (require.main === module) {
    const dir = process.argv[2]
    if (!dir) {
        console.error('Usage: node inject-addon-style-import.cjs <addon-dir>')
        process.exit(1)
    }
    const ok = stripAddonStyleImport(path.resolve(dir))
    console.log(ok ? '[inject-addon-style] stripped legacy inject' : '[inject-addon-style] skipped')
}
