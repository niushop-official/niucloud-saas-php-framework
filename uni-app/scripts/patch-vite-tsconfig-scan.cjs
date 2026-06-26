/**
 * Windows 上 Vite initTSConfck 会递归扫描项目目录找 tsconfig.json，
 * 若 .build/addon-pages-backup 残留且被锁会 EPERM 导致构建失败。
 * 为 skip 列表加入 .build/dist，并在 readdir 失败时忽略 EPERM。
 */
const fs = require('fs')
const path = require('path')
const { ROOT } = require('./addon-utils.cjs')

const VITE_CHUNKS_DIR = path.join(ROOT, 'node_modules', 'vite', 'dist', 'node', 'chunks')

const SKIP_RE =
    /skip: \(dir\) => dir === 'node_modules' \|\| dir === '\.git'/
const SKIP_REPLACEMENT =
    "skip: (dir) => dir === 'node_modules' || dir === '.git' || dir === '.build' || dir === 'dist'"

const EPERM_RE =
    /if \(e\.code === "EACCES" \|\| e\.code === "ENOENT"\) \{\s*return;\s*\}/
const EPERM_REPLACEMENT =
    'if (e.code === "EACCES" || e.code === "ENOENT" || e.code === "EPERM") {\n        return;\n      }'

function patchFile(filePath) {
    let code = fs.readFileSync(filePath, 'utf-8')
    let changed = false

    if (SKIP_RE.test(code)) {
        code = code.replace(SKIP_RE, SKIP_REPLACEMENT)
        changed = true
    } else if (!code.includes("dir === '.build'")) {
        return false
    }

    if (EPERM_RE.test(code)) {
        code = code.replace(EPERM_RE, EPERM_REPLACEMENT)
        changed = true
    } else if (!code.includes('e.code === "EPERM"')) {
        return false
    }

    if (changed) {
        fs.writeFileSync(filePath, code, 'utf-8')
    }
    return changed
}

function main() {
    if (!fs.existsSync(VITE_CHUNKS_DIR)) {
        console.warn('[patch-vite-tsconfig-scan] vite chunks dir missing, skip')
        return
    }

    let patched = 0
    for (const name of fs.readdirSync(VITE_CHUNKS_DIR)) {
        if (!name.startsWith('dep-') || !name.endsWith('.js')) continue
        const filePath = path.join(VITE_CHUNKS_DIR, name)
        if (patchFile(filePath)) {
            patched++
            console.log(`[patch-vite-tsconfig-scan] patched ${name}`)
        }
    }

    if (!patched) {
        console.log('[patch-vite-tsconfig-scan] already patched or pattern not found')
    }
}

module.exports = { patchFile, main }

if (require.main === module) {
    main()
}
