/**
 * 为 core 构建生成插件组件占位文件
 */
const fs = require('fs')
const path = require('path')
const { ROOT, listAddonKeys, walkFiles, BRIDGE_STUB_ROOT } = require('./addon-utils.cjs')

const STUB_ROOT = BRIDGE_STUB_ROOT
const STUB_VUE = `<template><view></view></template>
<script setup lang="ts"></script>
`

function stubPaths(key, relPath) {
    const vueOut = path.join(STUB_ROOT, key, 'components', relPath)
    return { vueOut, isDiy: /^diy\//.test(relPath) }
}

function generateAddonComponentStubs() {
    if (fs.existsSync(STUB_ROOT)) {
        fs.rmSync(STUB_ROOT, { recursive: true, force: true })
    }
    let count = 0
    for (const key of listAddonKeys()) {
        const compDir = path.join(ROOT, 'src', 'addon', key, 'components')
        if (!fs.existsSync(compDir)) continue
        const files = walkFiles(compDir, (f) => f.endsWith('.vue'), compDir)
        for (const file of files) {
            const { vueOut, isDiy } = stubPaths(key, file)
            if (isDiy) continue
            fs.mkdirSync(path.dirname(vueOut), { recursive: true })
            fs.writeFileSync(vueOut, STUB_VUE, 'utf-8')
            count++
        }
    }
    console.log(`[generate-addon-stubs] ${count} non-diy component stubs`)
}

generateAddonComponentStubs()
