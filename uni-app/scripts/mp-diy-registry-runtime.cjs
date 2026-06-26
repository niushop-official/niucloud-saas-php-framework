/**
 * 小程序产物：resolveDiyMeta 读 diy-registry.merged.js，不依赖 common/vendor 内 DIY_COMPONENT_MAP
 * 合并 / 内联 diy-group 后写入 utils/diy-component-registry.split.js
 */
const fs = require('fs')
const path = require('path')

const MERGED_REGISTRY_REL = 'components/diy-dynamic-bridge/diy-registry.merged.js'
const SPLIT_RESOLVER_REL = 'utils/diy-component-registry.split.js'

function buildSplitResolverSource(registryRequirePath) {
    return `"use strict";
const MERGED_REGISTRY = require("${registryRequirePath}");

function toMeta(name, raw) {
  if (!raw) return null;
  return {
    vueComponentName: name,
    scope: raw.scope || (raw.addonKey ? "addon" : "app"),
    folder: raw.folder,
    addonKey: raw.addonKey,
    scrollBool: !!raw.scrollBool,
    formRef: !!raw.formRef
  };
}

exports.resolveDiyMeta = function (componentName) {
  if (!componentName) return null;
  return toMeta(componentName, MERGED_REGISTRY[componentName]) || null;
};

exports.listDiyComponentNames = function () {
  return Object.keys(MERGED_REGISTRY || {});
};
`
}

/**
 * @param {string} frameworkDir dist/build/mp-core
 */
function installMergedRegistryResolver(frameworkDir) {
    const rootDir = path.resolve(frameworkDir)
    const mergedPath = path.join(rootDir, MERGED_REGISTRY_REL)
    if (!fs.existsSync(mergedPath)) {
        console.warn('[mp-diy-registry-runtime] skip: merged registry not found')
        return false
    }

    const splitPath = path.join(rootDir, SPLIT_RESOLVER_REL)
    const registryRequirePath = '../components/diy-dynamic-bridge/diy-registry.merged.js'
    fs.mkdirSync(path.dirname(splitPath), { recursive: true })
    fs.writeFileSync(splitPath, buildSplitResolverSource(registryRequirePath), 'utf-8')

    const absMerged = path.resolve(mergedPath)
    delete require.cache[absMerged]
    const count = Object.keys(require(absMerged)).length
    console.log(
        `[mp-diy-registry-runtime] resolveDiyMeta -> ${MERGED_REGISTRY_REL} (${count} components, no vendor DIY_COMPONENT_MAP)`
    )
    return true
}

module.exports = {
    MERGED_REGISTRY_REL,
    SPLIT_RESOLVER_REL,
    installMergedRegistryResolver
}
