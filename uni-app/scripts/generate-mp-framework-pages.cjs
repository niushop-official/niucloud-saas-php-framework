/**
 * 生成框架包编译用的 pages.framework.json（主包，不含 addon 分包）
 */
const path = require('path')
const {
    ROOT,
    BUILD_DIR,
    resolveFullPagesJson,
    writeJson,
    ensureComponentSubpackagePlaceholderPagesSubPackages
} = require('./mp-utils.cjs')

function main() {
    const pages = resolveFullPagesJson()
    const subPackages = (pages.subPackages || []).filter(
        (s) => !s.root || !s.root.startsWith('addon/')
    )
    ensureComponentSubpackagePlaceholderPagesSubPackages(subPackages)
    const frameworkPages = {
        ...pages,
        subPackages
    }

    const out = path.join(BUILD_DIR, 'pages.framework.json')
    writeJson(out, frameworkPages)
    const removed = (pages.subPackages || []).length - subPackages.length
    console.log(
        `[generate-mp-framework-pages] ${path.relative(ROOT, out)} (removed ${removed} addon subPackage(s), kept ${subPackages.length} non-addon subPackage(s))`
    )
}

main()
