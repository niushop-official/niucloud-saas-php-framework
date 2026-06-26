/**
 * 强制 vue / pinia / vue-i18n / @/locale 走 import map，避免 core 与 addon 各打一份运行时
 */
const {
    isSharedExternal,
    isWapLocaleExternal,
    isDiyCoreExternal,
    wapLocaleExternalPath,
    diyCoreExternalPath,
    IMPORT_MAP
} = require('./shared-external.cjs')

function sharedModuleUrl(id) {
    if (isDiyCoreExternal(id)) return diyCoreExternalPath()
    if (isWapLocaleExternal(id)) return wapLocaleExternalPath()
    if (IMPORT_MAP[id]) return IMPORT_MAP[id]
    for (const pkg of Object.keys(IMPORT_MAP)) {
        if (pkg.startsWith('@')) continue
        if (id === pkg || id.startsWith(`${pkg}/`)) return IMPORT_MAP[pkg]
    }
    return null
}

function createForceSharedExternalPlugin() {
    return {
        name: 'force-shared-external',
        enforce: 'pre',
        resolveId(id) {
            if (isDiyCoreExternal(id)) {
                return { id: diyCoreExternalPath(), external: true }
            }
            if (!isSharedExternal(id) && !isWapLocaleExternal(id)) return null
            const url = sharedModuleUrl(id)
            return { id: url || id, external: true }
        }
    }
}

/** alias 解析后再次 externalize locale / diy-core */
function createForceLocaleExternalPostPlugin() {
    return {
        name: 'force-locale-external-post',
        enforce: 'post',
        resolveId(id) {
            if (isDiyCoreExternal(id)) {
                return { id: diyCoreExternalPath(), external: true }
            }
            if (!isWapLocaleExternal(id)) return null
            return { id: wapLocaleExternalPath(), external: true }
        }
    }
}

function sharedOutputPaths(id) {
    const url = sharedModuleUrl(id)
    return url || undefined
}

module.exports = { createForceSharedExternalPlugin, createForceLocaleExternalPostPlugin, sharedOutputPaths, sharedModuleUrl }
