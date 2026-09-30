/**
 * 通用导出冲突扫描器
 * 扫描目录下 .ts/.js 文件的 export，检测同名冲突，返回冲突映射。
 */
const fs = require('fs')
const path = require('path')

const DEFAULT_EXTENSIONS = ['.ts', '.js', '.tsx', '.jsx']

/**
 * 去掉注释
 *
 * 本扫描器是按正则匹配源码文本、不做语法解析的。若注释里出现形如
 * 「export { xxx }」的示例写法，会被误判成一个真实导出并写进生成的 barrel，
 * 而那个名字在运行时并不存在，最终 Rollup 报 "xxx is not exported by ..."。
 * 因此匹配前先剥离注释。
 * @param {string} src
 * @return {string}
 */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, ' ')
        // 排除 :// （如 http://）避免误伤 URL
        .replace(/(^|[^:])\/\/[^\n]*/g, '$1')
}

/** 从源码中提取所有命名导出名称（仅运行时存在的值导出） */
function scanExports(src) {
    const code = stripComments(src)
    const names = []
    // export const|let|var|function|class|enum NAME
    // ★ 不含 type / interface：类型导出编译后并不存在于运行时，
    //   而生成的 barrel 是按值重导出，收进去会报 "not exported by"
    const declRe = /export\s+(?:const|let|var|function|class|enum)\s+(\w+)/g
    for (const m of code.matchAll(declRe)) names.push(m[1])
    // export { a, b, c as d }（export type { ... } 为纯类型导出，跳过）
    const braceRe = /export\s*(type\s*)?\{([^}]+)\}/g
    for (const m of code.matchAll(braceRe)) {
        if (m[1]) continue
        for (const item of m[2].split(',').map(s => s.trim()).filter(Boolean)) {
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
