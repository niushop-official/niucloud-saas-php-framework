/**
 * 分构建：阻止非当前包的 addon DIY 源码被静态 import 打进包内
 * diy-group 已使用 diy-dynamic-bridge 动态加载，不再替换 group/index.vue
 */
const fs = require('fs')
const path = require('path')
const { ROOT, BUILD_DIR } = require('./addon-utils.cjs')

const EMPTY_DIY_STUB = path.join(BUILD_DIR, 'bridges', 'empty-diy-stub.vue')

const ADDON_DIY_IMPORT_RE = /(?:@\/addon\/|\/src\/addon\/)([\w_]+)\/components\/diy\/.+\.vue/

function ensureEmptyDiyStub() {
    if (fs.existsSync(EMPTY_DIY_STUB)) return
    fs.mkdirSync(path.dirname(EMPTY_DIY_STUB), { recursive: true })
    fs.writeFileSync(
        EMPTY_DIY_STUB,
        '<template><view></view></template>\n<script setup lang="ts"></script>\n',
        'utf-8'
    )
}

function normalizePath(id) {
    return id.replace(/\\/g, '/').split('?')[0]
}

function parseAddonKeyFromDiyImport(norm) {
    const m = norm.match(ADDON_DIY_IMPORT_RE)
    return m ? m[1] : null
}

function isSplitBuildViteContext() {
    return process.env.BUILD_MODE === 'core' || !!process.env.ADDON_KEY
}

function shouldStubAddonDiyImport(norm) {
    if (!isSplitBuildViteContext()) return false

    const addonKey = parseAddonKeyFromDiyImport(norm)
    if (!addonKey) return false

    const buildingKey = process.env.ADDON_KEY
    if (buildingKey) {
        return addonKey !== buildingKey
    }
    return process.env.BUILD_MODE === 'core'
}

function createDiyGroupSplitPlugin() {
    return {
        name: 'diy-group-split-load',
        enforce: 'pre',
        resolveId(source) {
            if (!isSplitBuildViteContext()) return null
            const norm = normalizePath(source)
            if (shouldStubAddonDiyImport(norm)) {
                ensureEmptyDiyStub()
                return EMPTY_DIY_STUB
            }
            return null
        }
    }
}

module.exports = {
    createDiyGroupSplitPlugin,
    EMPTY_DIY_STUB
}
