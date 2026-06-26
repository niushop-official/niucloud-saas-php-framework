/**
 * 全量生产构建（npm run build）
 *
 * 1. build-shared   共享 ESM（vue、admin-lang 等）
 * 2. vite core      主应用 → dist/.core
 * 3. addon 并行编译  每个 src/addon/* → dist/.addons/*
 * 4. assemble       合并为可部署 dist/
 * 5. publish        复制到 PUBLISH_DEST（默认 ../niucloud/public/admin）
 */
const { spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { ROOT, listAddonKeys } = require('./addon-utils.cjs')

const REPORT_PATH = path.join(ROOT, 'build-report.json')

function run(cmd, args, env = {}) {
    const r = spawnSync(cmd, args, {
        cwd: ROOT,
        env: { ...process.env, ...env },
        stdio: 'inherit',
        shell: process.platform === 'win32'
    })
    return r.status ?? 1
}

/** 多 worker 从队列取 key 构建 addon，限制并发降低内存峰值 */
async function buildAddonsParallel(keys, concurrency = 2) {
    const success = []
    const failed = []
    const queue = [...keys]

    async function worker() {
        while (queue.length) {
            const key = queue.shift()
            if (!key) break
            const code = run('node', [path.join(__dirname, 'build-addon.cjs'), key])
            if (code === 0) success.push(key)
            else failed.push({ key, error: 'build failed' })
        }
    }

    const workers = Array.from({ length: Math.min(concurrency, keys.length) }, () => worker())
    await Promise.all(workers)
    return { success, failed }
}

async function main() {
    console.log('[build-all] step 1/5: shared deps')
    const sharedCode = run('node', [path.join(__dirname, 'build-shared.cjs')])
    if (sharedCode !== 0) {
        console.error('[build-all] shared build failed')
        process.exit(sharedCode)
    }

    console.log('[build-all] step 2/5: core build')
    const coreCode = run('npx', ['vite', 'build', '--config', 'vite.config.core.ts'], {
        NODE_OPTIONS: '--max-old-space-size=4096'
    })
    if (coreCode !== 0) {
        console.error('[build-all] core build failed')
        process.exit(coreCode)
    }

    const keys = listAddonKeys()
    console.log(`[build-all] step 3/5: addon builds (${keys.length} addons, concurrency 2)`)
    const { success, failed } = await buildAddonsParallel(keys, 2)

    fs.writeFileSync(REPORT_PATH, JSON.stringify({ success, failed, time: new Date().toISOString() }, null, 2) + '\n', 'utf-8')
    console.log(`[build-all] addons: ${success.length} ok, ${failed.length} failed`)

    console.log('[build-all] step 4/5: assemble')
    const asmCode = run('node', [path.join(__dirname, 'assemble-admin.cjs')])
    if (asmCode !== 0) process.exit(asmCode)

    console.log('[build-all] step 5/5: publish')
    const pubCode = run('node', [path.join(ROOT, 'publish.cjs')])
    if (pubCode !== 0) process.exit(pubCode)

    console.log('[build-all] complete')
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
