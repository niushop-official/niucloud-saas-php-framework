/**
 * 校验 addon 共享 chunk 的 export 绑定是否存在于模块内（防止 locale patch 误删 lodash 等代码）
 */
const fs = require('fs')
const path = require('path')

function parseExportNames(code) {
    const match = code.match(/export\s*\{([\s\S]+)\}\s*;?\s*$/)
    if (!match) return []
    const names = []
    for (const part of match[1].split(',')) {
        const trimmed = part.trim()
        if (!trimmed) continue
        const asSplit = trimmed.split(/\s+as\s+/)
        names.push(asSplit[0].trim())
    }
    return names
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function shouldValidateCommonChunk(code, fileName) {
    if (fileName.startsWith('entry.')) return false
    if (!/ensureAddonProdReady as|loadAddonModule as/.test(code)) return false
    return parseExportNames(code).length >= 8
}

function isBindingDefined(code, name) {
    const safe = escapeRegExp(name)
    const patterns = [
        new RegExp(`\\bfunction\\s+${safe}\\b`),
        new RegExp(`\\b(?:const|let|var)\\s+${safe}\\b`),
        new RegExp(`\\bclass\\s+${safe}\\b`),
        new RegExp(`import\\s+[\\s\\S]*?\\b${safe}\\b[\\s\\S]*?from\\s*["']`),
        new RegExp(`\\b${safe}\\s*,\\s*\\{[^}]*\\}\\s*from\\s*["']`)
    ]
    return patterns.some((re) => re.test(code))
}

function validateAddonDir(addonDir) {
    const assetsDir = path.join(addonDir, 'assets')
    if (!fs.existsSync(assetsDir)) return { ok: true, errors: [] }

    const errors = []
    for (const name of fs.readdirSync(assetsDir)) {
        if (!name.endsWith('.js')) continue
        const filePath = path.join(assetsDir, name)
        const code = fs.readFileSync(filePath, 'utf-8')
        if (!shouldValidateCommonChunk(code, name)) continue

        const exportNames = parseExportNames(code)
        const missing = exportNames.filter((n) => !isBindingDefined(code, n))
        if (missing.length) {
            errors.push({
                file: path.relative(addonDir, filePath),
                missing: missing.slice(0, 12),
                total: missing.length
            })
        }
    }
    return { ok: errors.length === 0, errors }
}

module.exports = { validateAddonDir, parseExportNames, isBindingDefined }

if (require.main === module) {
    const dir = process.argv[2]
    if (!dir) {
        console.error('Usage: node validate-addon-chunk-exports.cjs <addon-dir>')
        process.exit(1)
    }
    const result = validateAddonDir(path.resolve(dir))
    if (!result.ok) {
        for (const err of result.errors) {
            console.error(
                `[validate-addon-chunk-exports] ${err.file}: ${err.total} missing export binding(s), e.g. ${err.missing.join(', ')}`
            )
        }
        process.exit(1)
    }
    console.log('[validate-addon-chunk-exports] OK')
}
