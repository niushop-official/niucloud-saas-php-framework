/**
 * 修复构建产物中错误的 wap-locale import 路径
 */
const fs = require('fs')
const path = require('path')
const { WAP_LOCALE_URL } = require('./shared-external.cjs')

const REPLACEMENTS = [
    ['../wap/assets/shared/wap-locale.js', WAP_LOCALE_URL],
    ['../shared/wap-locale.js', WAP_LOCALE_URL],
    ['./shared/wap-locale.js', WAP_LOCALE_URL]
]

function walkJs(dir, out = []) {
    if (!fs.existsSync(dir)) return out
    if (!fs.statSync(dir).isDirectory()) return out
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

function fixDir(dir) {
    if (!fs.existsSync(dir)) return 0
    let fixed = 0
    for (const file of walkJs(dir)) {
        const code = fs.readFileSync(file, 'utf-8')
        if (!hasBadImport(code)) continue
        fs.writeFileSync(file, fixCode(code), 'utf-8')
        fixed++
    }
    return fixed
}

module.exports = { fixCode, hasBadImport, REPLACEMENTS, WAP_LOCALE_URL, fixDir }
