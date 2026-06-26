/**
 * 编译完成后删除 src/components 下自动生成的插件 DIY bridge（diy-dynamic-bridge-{key}）
 * 保留 diy-dynamic-bridge（router）与 diy-dynamic-bridge-app
 */
const fs = require('fs')
const path = require('path')
const { ROOT } = require('./addon-utils.cjs')

const COMPONENTS_DIR = path.join(ROOT, 'src', 'components')

/** 不参与清理的 bridge 目录（diy-dynamic-bridge-app 编译完成后也需删除） */
const PRESERVE_DIRS = new Set(['diy-dynamic-bridge'])

/** 编译后待清理的 app bridge（框架构建生成） */
const POST_BUILD_CLEAN_DIRS = new Set(['diy-dynamic-bridge-app'])

function isAddonBridgeDir(name) {
    return name.startsWith('diy-dynamic-bridge-') && !PRESERVE_DIRS.has(name)
}

function getAddonBridgeKey(dirName) {
    return dirName.slice('diy-dynamic-bridge-'.length)
}

/**
 * @param {{ keys?: string[], silent?: boolean }} options
 * @returns {string[]} removed directory names
 */
function cleanupAddonDiyBridgeSrc(options = {}) {
    const { keys, silent = false } = options
    const keyFilter = keys?.length ? new Set(keys) : null
    const removed = []

    if (!fs.existsSync(COMPONENTS_DIR)) return removed

    for (const name of fs.readdirSync(COMPONENTS_DIR)) {
        // POST_BUILD_CLEAN_DIRS 不受 key 过滤（如 diy-dynamic-bridge-app）
        if (POST_BUILD_CLEAN_DIRS.has(name)) {
            const dir = path.join(COMPONENTS_DIR, name)
            if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
                fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
                removed.push(name)
            }
            continue
        }
        if (!isAddonBridgeDir(name)) continue
        const key = getAddonBridgeKey(name)
        if (keyFilter && !keyFilter.has(key)) continue

        const dir = path.join(COMPONENTS_DIR, name)
        if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) continue

        fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
        removed.push(name)
    }

    if (removed.length && !silent) {
        console.log(
            `[cleanup-diy-bridge-src] removed ${removed.length} dir(s) under src/components: ${removed.join(', ')}`
        )
    }
    return removed
}

module.exports = {
    cleanupAddonDiyBridgeSrc,
    COMPONENTS_DIR,
    PRESERVE_DIRS
}

if (require.main === module) {
    cleanupAddonDiyBridgeSrc()
}
