/**
 * 修复构建产物中错误的 admin-lang import 路径
 *
 * Rollup external @/lang 时可能生成相对路径，从 /admin/assets/*.js 解析会变成：
 *   ../admin/assets/shared/admin-lang.js → /admin/admin/assets/...（HTML 404）
 *   ../shared/admin-lang.js              → /admin/shared/...（HTML 404）
 *
 * 被 verify-core-lang、assemble-admin、check-deploy 引用。
 */
const fs = require('fs')
const path = require('path')
const { ADMIN_LANG_URL } = require('./shared-external.cjs')

/** [错误路径, 正确绝对路径] */
const REPLACEMENTS = [
    ['../admin/assets/shared/admin-lang.js', ADMIN_LANG_URL],
    ['../shared/admin-lang.js', ADMIN_LANG_URL],
    ['./shared/admin-lang.js', ADMIN_LANG_URL]
]

/** 递归收集目录下所有 .js 文件 */
function walkJs(dir, out = []) {
    if (!fs.existsSync(dir)) return out
    const stat = fs.statSync(dir)
    if (!stat.isDirectory()) return out
    for (const name of fs.readdirSync(dir)) {
        const p = path.join(dir, name)
        if (fs.statSync(p).isDirectory()) walkJs(p, out)
        else if (name.endsWith('.js')) out.push(p)
    }
    return out
}

function fixCode(code) {
    let next = code
    for (const [bad, good] of REPLACEMENTS) {
        if (next.includes(bad)) next = next.split(bad).join(good)
    }
    return next
}

function hasBadImport(code) {
    return REPLACEMENTS.some(([bad]) => code.includes(bad))
}

/**
 * 扫描目录内 JS 并就地替换错误路径
 * @returns 修改过的文件数量
 */
function fixDir(dir) {
    if (!fs.existsSync(dir)) {
        throw new Error(`[admin-lang-import] directory not found: ${dir}`)
    }
    if (!fs.statSync(dir).isDirectory()) {
        throw new Error(`[admin-lang-import] not a directory: ${dir}`)
    }
    let fixed = 0
    for (const file of walkJs(dir)) {
        const code = fs.readFileSync(file, 'utf-8')
        if (!hasBadImport(code)) continue
        fs.writeFileSync(file, fixCode(code), 'utf-8')
        fixed++
    }
    return fixed
}

module.exports = { fixCode, hasBadImport, REPLACEMENTS, ADMIN_LANG_URL, fixDir }
