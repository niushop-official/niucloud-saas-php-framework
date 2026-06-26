/**
 * 编译单个 addon
 *
 * 流程：generate-addon-entry → vite lib build → sync-addon
 * 输出 staging：dist/.addons/{key}/
 * 同步部署目录：dist/assets/addons/{key}/
 *
 * 用法：
 *   node scripts/build-addon.cjs shop
 *   ADDON_KEY=shop node scripts/build-addon.cjs
 */
const { spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { ROOT } = require('./addon-utils.cjs')

const key = process.argv[2] || process.env.ADDON_KEY
if (!key) {
    console.error('Usage: node build-addon.cjs <addon-key>')
    process.exit(1)
}

// 生成 .build/addons/{key}/entry.ts
require('./generate-addon-entry.cjs')

const env = {
    ...process.env,
    ADDON_KEY: key,
    NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=4096'
}

console.log(`[build-addon] building "${key}"...`)
const r = spawnSync('npx', ['vite', 'build', '--config', 'vite.config.addon.ts'], {
    cwd: ROOT,
    env,
    stdio: 'inherit',
    shell: process.platform === 'win32'
})

if (r.status !== 0) {
    console.error(`[build-addon] FAILED: ${key}`)
    process.exit(r.status ?? 1)
}

// 复制到 dist/assets/addons 并更新 build-report.json
const sync = spawnSync('node', ['scripts/sync-addon.cjs', key], {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32'
})
if (sync.status !== 0) {
    process.exit(sync.status ?? 1)
}

console.log(`[build-addon] OK: ${key}`)
process.exit(0)
