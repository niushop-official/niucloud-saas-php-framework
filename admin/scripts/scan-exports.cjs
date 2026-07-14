/**
 * 通用导出冲突扫描器
 * 扫描目录下 .ts/.js 文件的 export，检测同名冲突，返回冲突映射。
 */
const fs = require('fs')
const path = require('path')

const DEFAULT_EXTENSIONS = ['.ts', '.js', '.tsx', '.jsx']

/** 从源码中提取所有命名导出名称 */
function scanExports(src) {
    const names = []
    // export const|let|var|function|class|type|interface|enum NAME
    const declRe = /export\s+(?:const|let|var|function|class|type|interface|enum)\s+(\w+)/g
    for (const m of src.matchAll(declRe)) names.push(m[1])
    // export { a, b, c as d }
    const braceRe = /export\s*(?:type\s*)?\{([^}]+)\}/g
    for (const m of src.matchAll(braceRe)) {
        for (const item of m[1].split(',').map(s => s.trim()).filter(Boolean)) {
            const parts = item.split(/\s+(?:as|:)\s+/)
            names.push(parts.length > 1 ? parts[parts.length - 1].trim() : parts[0].trim())
        }
    }
    return [...new Set(names)]
}

/** 扫描目录，返回文件列表 */
function scanDirExports(dir, opts = {}) {
    const exclude = new Set(opts.exclude || [])
    const exts = new Set(opts.extensions || DEFAULT_EXTENSIONS)
    if (!fs.existsSync(dir)) return []
    const out = []
    for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f)
        if (!fs.statSync(full).isFile()) continue
        if (![...exts].some(e => f.endsWith(e))) continue
        if (exclude.has(f) || exclude.has(full)) continue
        out.push({ moduleKey: f.replace(/\.[^.]+$/, ''), path: full })
    }
    return out
}

/** 递归扫描目录 */
function scanRecursive(dir, opts = {}) {
    const exclude = new Set(opts.exclude || [])
    const exts = new Set(opts.extensions || DEFAULT_EXTENSIONS)
    const out = []
    if (!fs.existsSync(dir)) return out
    function walk(base, rel) {
        for (const name of fs.readdirSync(base)) {
            const relPath = rel ? `${rel}/${name}` : name
            if (exclude.has(relPath) || exclude.has(name)) continue
            const full = path.join(base, name)
            const stat = fs.statSync(full)
            if (stat.isDirectory()) walk(full, relPath)
            else if (stat.isFile() && [...exts].some(e => name.endsWith(e)))
                out.push({ moduleKey: relPath.replace(/\.[^.]+$/, '').replace(/[\\/]/g, '_'), path: full })
        }
    }
    walk(dir, '')
    return out
}

/**
 * 检测并解决导出冲突。按 moduleKey 字母序处理，
 * 先导出的保留原名，后出现的加 moduleKey 前缀。
 */
function resolveConflicts(files, opts = {}) {
    const sorted = [...files].sort((a, b) => a.moduleKey.localeCompare(b.moduleKey))
    const exportedNames = new Set()
    const conflicts = {}
    const resolved = []
    for (const file of sorted) {
        const src = fs.readFileSync(file.path, 'utf-8')
        const names = scanExports(src)
        const normal = []; const renamed = []
        for (const name of names) {
            if (!exportedNames.has(name)) { exportedNames.add(name); normal.push(name) }
            else {
                const newName = opts.prefixer ? opts.prefixer(file, name) : file.moduleKey + '_' + name
                exportedNames.add(newName); renamed.push(name)
                conflicts[file.moduleKey + ':' + name] = newName
            }
        }
        resolved.push({ module: file.moduleKey, normal, renamed, src: file.path })
    }
    return { resolved, conflicts }
}

/** 生成 re-export 语句 */
function buildReExportStatements(resolved, modulePathPrefix) {
    const lines = []
    for (const r of resolved) {
        if (r.normal.length) lines.push(`export { ${r.normal.join(', ')} } from '${modulePathPrefix}/${r.module}'`)
        if (r.renamed.length) {
            const renamedStr = r.renamed.map(n => `${n} as ${r.module}_${n}`).join(', ')
            lines.push(`export { ${renamedStr} } from '${modulePathPrefix}/${r.module}'`)
        }
    }
    return lines
}

module.exports = { scanExports, scanDirExports, scanRecursive, resolveConflicts, buildReExportStatements }
