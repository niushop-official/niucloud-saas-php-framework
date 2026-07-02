/**
 * 生成分构建 Core 用的 pages.core.json 与页面桥接文件
 */
const fs = require('fs')
const path = require('path')
const {
    ROOT,
    parsePagesJson,
    scanSubPackagePages,
    BUILD_DIR,
    BRIDGE_ADDON_ROOT
} = require('./addon-utils.cjs')

function ensureBridgePage(row) {
    const rel = row.root.replace(/^addon\//, '')
    const bridgeAbs = path.join(BRIDGE_ADDON_ROOT, rel, `${row.path}.vue`)
    fs.mkdirSync(path.dirname(bridgeAbs), { recursive: true })
    const rootSuffix = row.root.startsWith(`addon/${row.addonKey}/`)
        ? row.root.slice(`addon/${row.addonKey}/`.length)
        : ''
    const pagePath = rootSuffix ? `${rootSuffix}/${row.path}` : row.path
    const content = `<template>
    <addon-page-bridge :addon-key="addonKey" :page-path="pagePath" :full-route="fullRoute" />
</template>
<script setup>
const addonKey = '${row.addonKey}'
const pagePath = '${pagePath.replace(/'/g, "\\'")}'
const fullRoute = '${row.fullRoute}'
</script>
`
    fs.writeFileSync(bridgeAbs, content, 'utf-8')
}

function writeCorePagesJson() {
    const pagesJson = parsePagesJson()
    const rows = scanSubPackagePages()

    for (const row of rows) {
        ensureBridgePage(row)
    }

    const corePages = {
        ...pagesJson
    }

    const out = path.join(BUILD_DIR, 'pages.core.json')
    fs.writeFileSync(out, JSON.stringify(corePages, null, 4) + '\n', 'utf-8')
    const addonPkgCount = (pagesJson.subPackages || []).filter((s) => s.root?.startsWith('addon/')).length
    console.log(`[generate-split-pages] core pages -> ${path.relative(ROOT, out)} (${addonPkgCount} addon subPackages, ${rows.length} bridge pages)`)
    return out
}

function main() {
    fs.mkdirSync(BRIDGE_ADDON_ROOT, { recursive: true })
    writeCorePagesJson()
}

main()
