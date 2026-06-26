/**
 * 从标品 diy-group 快照解析 addon 微页面 componentName 映射（不依赖 src 内注释 registry）
 */
const fs = require('fs')
const path = require('path')

const ADDON_DIY_IMPORT_RE =
    /(?:\/\/\s*)?import\s+(\w+)(?:[\s\S]*?)from\s+['"]@\/addon\/([\w_]+)\/components\/diy\/([\w-]+)\/index\.vue['"];?\s*/g

function unwrapHtmlComments(text) {
    return text.replace(/<!--\s*/g, '').replace(/\s*-->/g, '')
}

function folderToTag(folder) {
    return `diy-${folder.replace(/\//g, '-')}`
}

function varNameToKebabTag(varName) {
    return varName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function resolveTag(entry, template) {
    const haystack = unwrapHtmlComments(template)
    const candidates = [
        varNameToKebabTag(entry.varName),
        folderToTag(entry.diyFolder),
        folderToTag(entry.diyFolder).toLowerCase()
    ]
    for (const tag of candidates) {
        if (haystack.includes(`<${tag}`)) return tag
    }
    return null
}

function findTemplateBlockForTag(template, tag) {
    const haystack = unwrapHtmlComments(template)
    const blockRe =
        /<template\s+v-if="component\.componentName\s*={1,3}\s*(?:'[^']+'|"[^"]+)"\s*>[\s\S]*?<\/template>/g
    let m
    while ((m = blockRe.exec(haystack))) {
        if (m[0].includes(`<${tag}`)) return m[0]
    }
    return null
}

function extractVueComponentName(block) {
    const m = block.match(/component\.componentName\s*={1,3}\s*['"]([^'"]+)['"]/)
    return m ? m[1] : null
}

function parseDiyGroupRegistryFile(filePath) {
    const src = fs.readFileSync(filePath, 'utf-8')
    const templateMatch = src.match(/<template>([\s\S]*)<\/template>/)
    const scriptMatch = src.match(/<script([^>]*)>([\s\S]*)<\/script>/)
    if (!templateMatch || !scriptMatch) {
        throw new Error(`failed to parse diy-group registry: ${filePath}`)
    }

    const entries = []
    let m
    const re = new RegExp(ADDON_DIY_IMPORT_RE.source, 'g')
    while ((m = re.exec(scriptMatch[2]))) {
        const entry = {
            varName: m[1],
            addonKey: m[2],
            diyFolder: m[3],
            tag: null,
            vueComponentName: null
        }
        entry.tag = resolveTag(entry, templateMatch[1])
        if (!entry.tag) continue
        const block = findTemplateBlockForTag(templateMatch[1], entry.tag)
        entry.vueComponentName = block ? extractVueComponentName(block) : null
        if (!entry.vueComponentName) continue
        entries.push({
            addonKey: entry.addonKey,
            diyFolder: entry.diyFolder,
            vueComponentName: entry.vueComponentName
        })
    }
    return entries
}

module.exports = {
    parseDiyGroupRegistryFile,
    ADDON_DIY_IMPORT_RE
}
