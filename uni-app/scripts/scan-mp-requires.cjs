/**
 * 扫描小程序分包 JS 中的 require / require.async 依赖
 */
const fs = require('fs')
const path = require('path')

const REQUIRE_RE = /\brequire(?:\.async)?\(\s*['"]([^'"]+)['"]\s*\)/g

/**
 * @param {string} mpRoot dist/build/mp-weixin 根目录
 * @param {string[]} subPackageRoots 如 ['addon/shop']
 */
function scanSubPackageRequires(mpRoot, subPackageRoots) {
    const requirePaths = new Set()
    const forbiddenPaths = new Set()
    const scannedFiles = []

    for (const root of subPackageRoots) {
        const absRoot = path.join(mpRoot, root)
        if (!fs.existsSync(absRoot)) continue

        for (const rel of walkJs(absRoot)) {
            const absFile = path.join(absRoot, rel)
            const relFromMp = path.posix.join(root, rel.replace(/\\/g, '/'))
            scannedFiles.push(relFromMp)
            const content = fs.readFileSync(absFile, 'utf-8')
            let m
            REQUIRE_RE.lastIndex = 0
            while ((m = REQUIRE_RE.exec(content)) !== null) {
                const spec = m[1]
                const resolved = resolveRequire(mpRoot, absFile, spec)
                if (!resolved) continue

                if (isOtherAddonPath(resolved, subPackageRoots)) {
                    forbiddenPaths.add(resolved)
                    continue
                }
                requirePaths.add(resolved)
            }
        }
    }

    return {
        requirePaths: [...requirePaths].sort(),
        forbiddenPaths: [...forbiddenPaths].sort(),
        scannedFiles: scannedFiles.sort()
    }
}

function walkJs(dir, base = dir) {
    const out = []
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name)
        if (fs.statSync(full).isDirectory()) {
            out.push(...walkJs(full, base))
        } else if (name.endsWith('.js')) {
            out.push(path.relative(base, full))
        }
    }
    return out
}

function resolveRequire(mpRoot, fromFile, spec) {
    if (spec.startsWith('http://') || spec.startsWith('https://')) return null
    if (!spec.startsWith('.')) {
        return spec.replace(/\\/g, '/')
    }
    const dir = path.dirname(fromFile)
    let resolved = path.normalize(path.join(dir, spec))
    if (!resolved.endsWith('.js') && !resolved.endsWith('.json')) {
        if (fs.existsSync(resolved + '.js')) resolved += '.js'
        else if (fs.existsSync(resolved + '.json')) resolved += '.json'
    }
    if (!resolved.startsWith(mpRoot)) return null
    return path.relative(mpRoot, resolved).replace(/\\/g, '/')
}

function isOtherAddonPath(resolvedPath, allowedRoots) {
    if (!resolvedPath.startsWith('addon/')) return false
    for (const root of allowedRoots) {
        if (resolvedPath === root || resolvedPath.startsWith(`${root}/`)) {
            return false
        }
    }
    return true
}

function validateRequires(mpRoot, requirePaths, forbiddenPaths) {
    const missing = []
    for (const p of requirePaths) {
        const abs = path.join(mpRoot, p)
        if (!fs.existsSync(abs)) {
            missing.push(p)
        }
    }
    return {
        ok: missing.length === 0 && forbiddenPaths.length === 0,
        missing,
        forbiddenPaths
    }
}

module.exports = {
    scanSubPackageRequires,
    validateRequires
}
