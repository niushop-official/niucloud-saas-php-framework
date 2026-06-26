/**
 * 装修预览修复：alias useDiyGroup + 修正 diy-group index.vue 的 data 绑定
 * 不修改 src/addon 源码；core / addon / dev 构建均需启用
 *
 * 注意：不可在 config() 中返回 resolve.alias，会覆盖 uni-app 默认 alias 导致 windi 等虚拟模块解析失败
 */
const path = require('path')
const { ROOT } = require('./addon-utils.cjs')

const CORE_USE_DIY_GROUP = path.join(ROOT, 'src', 'hooks', 'useDiyGroup.ts')

function isDiyGroupImporter(importer) {
    if (!importer) return false
    const norm = importer.replace(/\\/g, '/')
    return norm.includes('/addon/components/diy/group/')
}

function patchDiyGroupScript(code) {
    if (!code.includes('const data = ref(diyGroup.data)')) return null
    return code.replace(/const data = ref\(diyGroup\.data\)/g, 'const data = diyGroup.data')
}

function createDiyGroupFixPlugin() {
    return {
        name: 'diy-group-fix',
        enforce: 'pre',
        resolveId(source, importer) {
            if (
                (source === './useDiyGroup' || source === './useDiyGroup.ts') &&
                isDiyGroupImporter(importer)
            ) {
                return CORE_USE_DIY_GROUP
            }
            if (
                source === '@/addon/components/diy/group/useDiyGroup' ||
                source === '@/addon/components/diy/group/useDiyGroup.ts'
            ) {
                return CORE_USE_DIY_GROUP
            }
            return null
        },
        transform(code, id) {
            const norm = id.replace(/\\/g, '/').split('?')[0]
            if (!norm.includes('/diy/group/index.vue') && !norm.includes('/bridges/diy-group/index.vue')) {
                return null
            }
            return patchDiyGroupScript(code)
        }
    }
}

module.exports = { createDiyGroupFixPlugin }
