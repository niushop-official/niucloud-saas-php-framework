/**
 * 生成单插件编译用的 pages.addon.{key}.json（主包 + 该插件全部分包 root）
 */
const path = require('path')
const {
    ROOT,
    BUILD_DIR,
    PAGES_CORE,
    resolveFullPagesJson,
    getSubPackageRootsForKey,
    writeJson,
    scanAddonSharedComponents,
    scanAddonMainComponents,
    writeMpSharedBridgePage,
    injectMpSharedBridgePage
} = require('./mp-utils.cjs')

function main() {
    const key = process.argv[2]
    if (!key) {
        console.error('Usage: node generate-mp-addon-pages.cjs <addon-key>')
        process.exit(1)
    }

    const pages = resolveFullPagesJson()
    const roots = getSubPackageRootsForKey(key, pages)
    if (!roots.length) {
        console.error(`[generate-mp-addon-pages] no subPackages for "${key}"`)
        console.error(
            `[generate-mp-addon-pages] ensure ${path.relative(ROOT, PAGES_CORE)} exists (node scripts/generate-split-pages.cjs)`
        )
        process.exit(1)
    }

    const rootSet = new Set(roots)
    const addonPages = {
        ...pages,
        subPackages: (pages.subPackages || []).filter((s) => rootSet.has(s.root))
    }

    const sharedComponents = scanAddonSharedComponents(key)
    const mainComponents = scanAddonMainComponents(key)
    if (sharedComponents.length || mainComponents.length) {
        writeMpSharedBridgePage(key, sharedComponents, mainComponents)
        injectMpSharedBridgePage(addonPages)
        if (sharedComponents.length) {
            console.log(
                `[generate-mp-addon-pages] shared addon/components: ${sharedComponents.join(', ')}`
            )
        }
        if (mainComponents.length) {
            console.log(
                `[generate-mp-addon-pages] main components: ${mainComponents.join(', ')}`
            )
        }
    }

    const out = path.join(BUILD_DIR, `pages.addon.${key}.json`)
    addonPages.easycom = addonPages.easycom || { custom: {} }
    addonPages.easycom.custom = addonPages.easycom.custom || {}
    addonPages.easycom.custom[`diy-dynamic-bridge-${key}`] =
        `@/components/diy-dynamic-bridge-${key}/diy-dynamic-bridge-${key}.vue`
    writeJson(out, addonPages)
    console.log(
        `[generate-mp-addon-pages] ${path.relative(ROOT, out)} (${roots.length} subPackage roots for ${key})`
    )
}

main()
