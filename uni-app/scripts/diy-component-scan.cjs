/**
 * 扫描 app / addon 下 DIY 微页面组件，生成 componentName 映射
 */
const fs = require('fs')
const path = require('path')
const { ROOT, ADDON_DIR, listAddonKeys } = require('./addon-utils.cjs')

function kebabToPascal(folder) {
    return folder
        .split('-')
        .map((s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : ''))
        .join('')
}

function scanDiyFolder(diyDir, filter) {
    const out = []
    if (!fs.existsSync(diyDir)) return out
    for (const name of fs.readdirSync(diyDir)) {
        if (filter && !filter(name)) continue
        const compDir = path.join(diyDir, name)
        if (!fs.statSync(compDir).isDirectory()) continue
        if (fs.existsSync(path.join(compDir, 'index.vue'))) {
            out.push(name)
        }
    }
    return out.sort()
}

function scanAppDiyComponents() {
    const diyDir = path.join(ROOT, 'src', 'app', 'components', 'diy')
    return scanDiyFolder(diyDir, (name) => name !== 'group').map((folder) => {
        const vueComponentName = kebabToPascal(folder)
        return {
            vueComponentName,
            scope: 'app',
            folder,
            scrollBool: vueComponentName === 'CarouselSearch',
            formRef: vueComponentName.startsWith('Form') && vueComponentName !== 'FormSubmit'
        }
    })
}

function scanAddonDiyEntries(addonKeys) {
    const entries = []
    for (const addonKey of addonKeys) {
        const diyDir = path.join(ADDON_DIR, addonKey, 'components', 'diy')
        for (const folder of scanDiyFolder(diyDir)) {
            const vueComponentName = kebabToPascal(folder)
            entries.push({
                vueComponentName,
                scope: 'addon',
                addonKey,
                folder,
                scrollBool: true,
                formRef: true
            })
        }
    }
    return entries
}

function scanAllDiyComponents(options = {}) {
    const addonKeys = options.addonKeys || listAddonKeys()
    const app = scanAppDiyComponents()
    const addon = scanAddonDiyEntries(addonKeys)

    const byName = new Map()
    for (const entry of app) {
        byName.set(entry.vueComponentName, entry)
    }
    for (const entry of addon) {
        if (byName.has(entry.vueComponentName)) {
            console.warn(
                `[diy-component-scan] duplicate componentName "${entry.vueComponentName}" (addon/${entry.addonKey} overrides app)`
            )
        }
        byName.set(entry.vueComponentName, entry)
    }

    return {
        app,
        addon,
        all: [...byName.values()].sort((a, b) => a.vueComponentName.localeCompare(b.vueComponentName))
    }
}

module.exports = {
    kebabToPascal,
    scanAppDiyComponents,
    scanAddonDiyEntries,
    scanAllDiyComponents
}
