/**
 * 统一用 node 直接启动 vite（避免 Windows 上 npx + shell 触发 spawn EPERM）
 *
 * 用法：node scripts/run-vite.cjs build --config vite.config.shared.ts
 */
const path = require('path')
const { spawnSync } = require('child_process')

const ROOT = path.resolve(__dirname, '..')
const VITE_BIN = path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js')

require('./ensure-esbuild.cjs')

const args = process.argv.slice(2)
if (!args.length) {
    console.error('Usage: node scripts/run-vite.cjs <vite-args...>')
    process.exit(1)
}

const r = spawnSync(process.execPath, [VITE_BIN, ...args], {
    cwd: ROOT,
    env: {
        ...process.env,
        NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=4096'
    },
    stdio: 'inherit',
    shell: false
})

process.exit(r.status ?? 1)
