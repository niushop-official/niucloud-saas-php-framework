/**
 * dev / 全量 mp-weixin 编译前：为 pages.json 中的 addon 分包生成 bridge，并补丁 router
 */
const fs = require('fs')
const path = require('path')
const { ROOT, parsePagesJson } = require('./addon-utils.cjs')
const { generateDiyDynamicBridgeMp } = require('./generate-diy-dynamic-bridge-mp.cjs')

const ROUTER_MP = path.join(ROOT, 'src/components/diy-dynamic-bridge/diy-dynamic-bridge.router.mp.vue')
const MERGE_MARKER = '<!-- MP_MERGE_ADDON_BRIDGE_VUE -->'

function listAddonKeysFromPagesJson() {
    const pages = parsePagesJson()
    const keys = new Set()
    for (const sub of pages.subPackages || []) {
        const m = /^addon\/([^/]+)/.exec(sub.root || '')
        if (m) keys.add(m[1])
    }
    return [...keys].sort()
}

function buildAddonRouterVueBlock(key) {
    const tag = `diy-dynamic-bridge-${key}`
    return `        <${tag}
            v-else-if="routeBridge === '${key}'"
            :ref="setInnerRef"
            :componentName="componentName"
            :component="component"
            :global="global"
            :index="index"
            :scrollBool="scrollBool"
            @update:componentIsShow="emit('update:componentIsShow', $event)"
            @loadingFn="emit('loadingFn', $event)"
        />
        ${MERGE_MARKER}`
}

function appendAddonBlocksToRouter(addonKeys) {
    if (!fs.existsSync(ROUTER_MP)) return
    let content = fs.readFileSync(ROUTER_MP, 'utf-8')
    if (!content.includes(MERGE_MARKER)) {
        content = content.replace(/\n(\s*)<\/view>\n<\/template>/, `\n$1  ${MERGE_MARKER}\n$1</view>\n</template>`)
    }
    for (const key of addonKeys) {
        if (content.includes(`routeBridge === '${key}'`)) continue
        content = content.replace(MERGE_MARKER, buildAddonRouterVueBlock(key))
    }
    fs.writeFileSync(ROUTER_MP, content, 'utf-8')
}

function prepareMpWeixinDevRouter(options = {}) {
    const addonKeys = options.addonKeys || listAddonKeysFromPagesJson()

    generateDiyDynamicBridgeMp({ target: 'app' })
    generateDiyDynamicBridgeMp({ target: 'router' })

    for (const key of addonKeys) {
        generateDiyDynamicBridgeMp({ target: 'addon', addonKey: key })
    }

    appendAddonBlocksToRouter(addonKeys)
    console.log(
        `[prepare-mp-weixin-dev-router] app router + ${addonKeys.length} addon bridge(s): ${addonKeys.join(', ') || '(none)'}`
    )
    return addonKeys
}

module.exports = {
    MERGE_MARKER,
    listAddonKeysFromPagesJson,
    prepareMpWeixinDevRouter
}

if (require.main === module) {
    prepareMpWeixinDevRouter()
}
