/**
 * 清理 Core 产物中误打入的插件业务 chunk（保留 bridge 分包页 addon-*-pages-*）
 */
const fs = require('fs')
const path = require('path')
const { ROOT, listAddonKeys } = require('./addon-utils.cjs')

const CORE_ASSETS = path.join(ROOT, 'dist', '.core', 'h5', 'assets')

function isLeakedAddonChunk(name, addonKeys) {
    if (!name.endsWith('.js') && !name.endsWith('.css')) return false
    for (const key of addonKeys) {
        const dashed = key.replace(/_/g, '-')
        for (const slug of new Set([key, dashed])) {
            if (name.startsWith(`addon-${slug}-`) && !name.includes('-pages-')) return true
            if (name.includes(`addon-${slug}-`) && name.includes('-locale-')) return true
        }
    }
    return false
}

function purge() {
    if (!fs.existsSync(CORE_ASSETS)) {
        console.log('[purge-core-addon-leaks] no core assets dir, skip')
        return
    }
    const addonKeys = listAddonKeys()
    let removed = 0
    for (const name of fs.readdirSync(CORE_ASSETS)) {
        if (!isLeakedAddonChunk(name, addonKeys)) continue
        fs.rmSync(path.join(CORE_ASSETS, name), { force: true })
        removed++
    }
    console.log(`[purge-core-addon-leaks] removed ${removed} leaked addon chunks from core`)
}

purge()
