/**
 * 微信小程序：编译 DIY bridge 时注入生成的静态 v-if 版本
 */
const fs = require('fs')
const path = require('path')
const { ROOT } = require('./addon-utils.cjs')

const MP_ROUTER = path.join(ROOT, 'src', 'components', 'diy-dynamic-bridge', 'diy-dynamic-bridge.router.mp.vue')
const MP_APP = path.join(ROOT, 'src', 'components', 'diy-dynamic-bridge-app', 'diy-dynamic-bridge-app.mp.vue')
const MP_LEGACY = path.join(ROOT, 'src', 'components', 'diy-dynamic-bridge', 'diy-dynamic-bridge.mp.vue')

function isMpWeixin() {
    return process.env.UNI_PLATFORM === 'mp-weixin'
}

function normId(id) {
    return (id || '').replace(/\\/g, '/')
}

function readIfExists(filePath) {
    if (!fs.existsSync(filePath)) return null
    return fs.readFileSync(filePath, 'utf-8')
}

function resolveInjectContent(id) {
    const norm = normId(id)
    if (norm.endsWith('/components/diy-dynamic-bridge/diy-dynamic-bridge.vue')) {
        return readIfExists(MP_ROUTER) || readIfExists(MP_LEGACY)
    }
    if (norm.endsWith('/components/diy-dynamic-bridge-app/diy-dynamic-bridge-app.vue')) {
        return readIfExists(MP_APP)
    }
    const addonMatch = norm.match(/\/components\/diy-dynamic-bridge-([a-zA-Z0-9_]+)\/diy-dynamic-bridge-\1\.vue$/)
    if (addonMatch) {
        const key = addonMatch[1]
        const envKey = process.env.MP_ADDON_BRIDGE_KEY
        if (envKey && envKey !== key) return null
        const mpFile = path.join(ROOT, 'src', 'components', `diy-dynamic-bridge-${key}`, `diy-dynamic-bridge-${key}.mp.vue`)
        if (fs.existsSync(mpFile)) return fs.readFileSync(mpFile, 'utf-8')
        // 插件 bridge 目录不存在（如未构建的 cms 等），返回空壳防止 Rollup 解析失败
        return `<template><view v-if="false" /></template>\n<script setup lang="ts">\nconst e=defineEmits<{componentIsShow:[v:boolean]}>()\n</script>\n`
    }
    return null
}

function isBridgeVueId(id) {
    if (!id || id.includes('?')) return false
    return resolveInjectContent(id) !== null
}

function createDiyDynamicBridgeMpPlugin() {
    return {
        name: 'diy-dynamic-bridge-mp',
        enforce: 'pre',
        transform(code, id) {
            if (!isMpWeixin()) return null
            const content = resolveInjectContent(id)
            if (!content) return null
            return content
        }
    }
}

module.exports = {
    createDiyDynamicBridgeMpPlugin,
    MP_ROUTER,
    MP_APP,
    MP_LEGACY
}
