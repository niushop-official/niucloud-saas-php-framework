/**
 * 编译一个或多个 addon
 *
 * 流程(每个插件)：generate-addon-entry → vite lib build → sync-addon
 * 输出 staging：dist/.addons/{key}/
 * 同步部署目录：dist/assets/addons/{key}/
 *
 * 用法：
 *   node scripts/build-addon.cjs shop
 *   node scripts/build-addon.cjs shop cms pintuan
 *   ADDON_KEY=shop node scripts/build-addon.cjs
 */
const { spawnSync } = require('child_process')
const path = require('path')
const { ROOT } = require('./addon-utils.cjs')

// 支持一次编译多个插件：node scripts/build-addon.cjs shop cms
const argvKeys = process.argv.slice(2).filter(Boolean)
const keys = [...new Set(argvKeys.length ? argvKeys : process.env.ADDON_KEY ? [process.env.ADDON_KEY] : [])]

if (!keys.length) {
    console.error('Usage: node build-addon.cjs <addon-key> [addon-key ...]')
    process.exit(1)
}

function buildOne(key) {
    console.log(`\n========== [build-addon] "${key}" ==========`)

    // 生成 .build/addons/{key}/entry.ts（子进程调用，避免 require 模块缓存）
    const entry = spawnSync('node', [path.join(__dirname, 'generate-addon-entry.cjs'), key], {
        cwd: ROOT,
        stdio: 'inherit',
        shell: process.platform === 'win32'
    })
    if (entry.status !== 0) {
        console.error(`[build-addon] generate entry FAILED: ${key}`)
        process.exit(entry.status ?? 1)
    }

    const env = {
        ...process.env,
        ADDON_KEY: key,
        NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=4096'
    }

    console.log(`[build-addon] building "${key}" ...`)
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
}

keys.forEach(buildOne)
console.log(`\n[build-addon] ALL DONE: ${keys.join(', ')}`)
