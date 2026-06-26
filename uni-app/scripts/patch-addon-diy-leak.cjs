/**
 * addon lib 构建会把 diy store / bridge 打进 common 共享 chunk，与 Core 各一份 defineStore('diy')。
 * 剥离内联实现，改为 import shared/diy-core.js 单例。
 */
const fs = require('fs')
const path = require('path')
const { DIY_CORE_URL } = require('./shared-external.cjs')

const DIY_CORE_IMPORT =
    `import useDiyStore, { resolveDecorateMode } from "${DIY_CORE_URL}";\n`

const DIY_INLINE_BLOCK_RE =
    /\nlet listenerBound = false;\nfunction isDecoratePreviewUrl\(\)[\s\S]*?const useDiyStore\$1 = useDiyStore;\n/

const USE_DIY_CHUNK_RE = /^import[\s\S]*?function useDiy\(/

function collectUseDiyExportNames(assetsDir, useDiyFileName) {
    const names = new Set()
    const escaped = useDiyFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(
        `import\\s*\\{([^}]+)\\}\\s*from\\s*["']\\./${escaped}["']`,
        'g'
    )
    for (const name of fs.readdirSync(assetsDir)) {
        if (!name.endsWith('.js') || name === useDiyFileName) continue
        const code = fs.readFileSync(path.join(assetsDir, name), 'utf-8')
        let m
        while ((m = re.exec(code))) {
            const spec = m[1]
            const asMatch = spec.match(/(\w+)\s+as\s+useDiy/)
            if (asMatch) {
                names.add(asMatch[1])
            } else if (/\buseDiy\b/.test(spec)) {
                names.add('useDiy')
            }
        }
    }
    if (names.size === 0) names.add('useDiy')
    return [...names]
}

function buildUseDiyReExport(exportNames) {
    const parts = exportNames.map((n) => (n === 'useDiy' ? 'useDiy' : `useDiy as ${n}`))
    return `export { ${parts.join(', ')} } from "${DIY_CORE_URL}";\n`
}

function isUseDiyChunk(fileName, code) {
    if (!fileName.startsWith('useDiy.')) return false
    if (USE_DIY_CHUNK_RE.test(code)) return true
    return /^export\s*\{[\s\S]*\}\s*from\s*["']/.test(code.trim())
}

function patchUseDiyChunk(code, fileName, assetsDir) {
    if (!isUseDiyChunk(fileName, code)) return null
    const names = collectUseDiyExportNames(assetsDir, fileName)
    return buildUseDiyReExport(names)
}

function patchCommonDiyLeak(code) {
    if (!code.includes('defineStore("diy"')) {
        if (code.includes('useDiyStore$1 as') && !code.includes(DIY_CORE_URL)) {
            const hasBinding = /\b(?:const|let|var)\s+useDiyStore\$1\b/.test(code)
                || /import\s+useDiyStore\b/.test(code)
            if (!hasBinding) {
                return insertDiyCoreImport(code) + '\nconst useDiyStore$1 = useDiyStore;\n'
            }
        }
        return null
    }
    if (code.includes(DIY_CORE_URL)) return null

    let next = code.replace(
        DIY_INLINE_BLOCK_RE,
        '\nconst useDiyStore$1 = useDiyStore;\n'
    )
    if (next === code) return null

    next = insertDiyCoreImport(next)
    return next
}

function insertDiyCoreImport(code) {
    const lastImport = code.lastIndexOf('\nimport ')
    if (lastImport === -1) return DIY_CORE_IMPORT + code
    const lineEnd = code.indexOf('\n', lastImport + 1)
    return code.slice(0, lineEnd + 1) + DIY_CORE_IMPORT + code.slice(lineEnd + 1)
}

function patchAddonDir(addonDir) {
    const assetsDir = path.join(addonDir, 'assets')
    if (!fs.existsSync(assetsDir)) return { patched: 0 }

    let patched = 0
    for (const name of fs.readdirSync(assetsDir)) {
        if (!name.endsWith('.js') || name.startsWith('useDiy.')) continue
        const filePath = path.join(assetsDir, name)
        const code = fs.readFileSync(filePath, 'utf-8')
        const next = patchCommonDiyLeak(code)
        if (!next) continue
        fs.writeFileSync(filePath, next, 'utf-8')
        patched++
        console.log(`[patch-addon-diy-leak] ${path.relative(addonDir, filePath)}`)
    }

    for (const name of fs.readdirSync(assetsDir)) {
        if (!name.startsWith('useDiy.') || !name.endsWith('.js')) continue
        const filePath = path.join(assetsDir, name)
        const code = fs.readFileSync(filePath, 'utf-8')
        const next = patchUseDiyChunk(code, name, assetsDir)
        if (!next || next === code) continue
        fs.writeFileSync(filePath, next, 'utf-8')
        patched++
        console.log(`[patch-addon-diy-leak] ${path.relative(addonDir, filePath)}`)
    }

    return { patched }
}

module.exports = {
    patchCommonDiyLeak,
    patchUseDiyChunk,
    patchAddonDir,
    buildUseDiyReExport,
    collectUseDiyExportNames
}

if (require.main === module) {
    const dir = process.argv[2]
    if (!dir) {
        console.error('Usage: node patch-addon-diy-leak.cjs <addon-dir>')
        process.exit(1)
    }
    const r = patchAddonDir(path.resolve(dir))
    console.log('[patch-addon-diy-leak]', r)
}
