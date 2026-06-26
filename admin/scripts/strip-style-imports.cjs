/**
 * 从已构建 JS 中移除 element-plus style/css side-effect import
 *
 * assemble 最后一步兜底：vite 插件可能未覆盖到的 import 语句在此二次清理。
 * 也可单独运行：node scripts/strip-style-imports.cjs [dist-root]
 */
const fs = require('fs')
const path = require('path')

const STYLE_IMPORT_RE = /import\s*["']element-plus[^"']*\/style\/css["'];?/g

function stripFile(filePath) {
    const text = fs.readFileSync(filePath, 'utf-8')
    if (!STYLE_IMPORT_RE.test(text)) return false
    STYLE_IMPORT_RE.lastIndex = 0
    const next = text.replace(STYLE_IMPORT_RE, '')
    if (next === text) return false
    fs.writeFileSync(filePath, next, 'utf-8')
    return true
}

function walkJs(dir, changed) {
    if (!fs.existsSync(dir)) return
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name)
        if (fs.statSync(full).isDirectory()) {
            walkJs(full, changed)
        } else if (name.endsWith('.js')) {
            if (stripFile(full)) changed.push(full)
        }
    }
}

/** @param rootDir dist 根目录，递归处理 assets 下所有 .js */
function stripBuiltAssets(rootDir) {
    const assetsDir = path.join(rootDir, 'assets')
    const changed = []
    walkJs(assetsDir, changed)
    return changed
}

if (require.main === module) {
    const root = process.argv[2] || path.join(__dirname, '..', 'dist')
    const changed = stripBuiltAssets(root)
    console.log(`[strip-style-imports] cleaned ${changed.length} files under ${root}/assets`)
}

module.exports = { stripBuiltAssets, stripFile }
