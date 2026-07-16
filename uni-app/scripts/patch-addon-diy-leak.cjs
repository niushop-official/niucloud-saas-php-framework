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

/**
 * 收集 useDiy chunk 中所有被消费者引用的导出名。
 * 返回 Map<localName, sourceName>：
 *   - localName:  消费者 import 时使用的名字（Rollup 短名，如 u、g）
 *   - sourceName: 原始导出名（如 useDiy、getShareInfo）
 */
function collectUseDiyExportMap(assetsDir, useDiyFileName) {
    const exportMap = new Map() // localName -> sourceName
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
            for (const part of spec.split(',')) {
                const trimmed = part.trim()
                if (!trimmed) continue
                const asMatch = trimmed.match(/^(\w+)\s+as\s+(\w+)$/)
                if (asMatch) {
                    // "{ localName as sourceName }" → export { sourceName as localName }
                    exportMap.set(asMatch[1], asMatch[2])
                } else {
                    // "{ name }" → export { name as name }
                    exportMap.set(trimmed, trimmed)
                }
            }
        }
    }
    if (exportMap.size === 0) exportMap.set('useDiy', 'useDiy')
    return exportMap
}

function buildUseDiyReExport(exportMap) {
    const parts = []
    for (const [localName, sourceName] of exportMap) {
        if (localName === sourceName) {
            parts.push(sourceName)
        } else {
            parts.push(`${sourceName} as ${localName}`)
        }
    }
    return `export { ${parts.join(', ')} } from "${DIY_CORE_URL}";\n`
}

function isUseDiyChunk(fileName, code) {
    if (!fileName.startsWith('useDiy.')) return false
    if (USE_DIY_CHUNK_RE.test(code)) return true
    return /^export\s*\{[\s\S]*\}\s*from\s*["']/.test(code.trim())
}

function patchUseDiyChunk(code, fileName, assetsDir) {
    if (!isUseDiyChunk(fileName, code)) return null
    const exportMap = collectUseDiyExportMap(assetsDir, fileName)
    return buildUseDiyReExport(exportMap)
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
    collectUseDiyExportMap,
    collectUseDiyExportNames: collectUseDiyExportMap
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
