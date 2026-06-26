/**
 * @deprecated diy-group 已改为源码内 diy-dynamic-bridge 动态加载，无需再生成 bridge 版 index.vue
 * 保留脚本以兼容旧构建命令，仅输出提示。
 */
const { generateDiyRegistry } = require('./generate-diy-registry.cjs')

function generateDiyGroupSplit(options = {}) {
    generateDiyRegistry()
    const ownAddonKey = options.ownAddonKey ?? process.argv[2] ?? null
    const mode = ownAddonKey ? `addon:${ownAddonKey}` : 'core'
    console.log(
        `[generate-diy-group-split] ${mode}: skipped (diy-group uses diy-dynamic-bridge in src)`
    )
}

if (require.main === module) {
    generateDiyGroupSplit()
}

module.exports = {
    generateDiyGroupSplit,
    loadRegistryEntries: () => [],
    resolveOutVue: () => null
}
