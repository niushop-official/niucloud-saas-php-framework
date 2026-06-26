/**
 * H5 分构建全量流水线
 * shared → core → addons(并行) → assemble → publish
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
    const onlyKeys = process.argv.slice(2)
    const keys = onlyKeys.length ? onlyKeys : listAddonKeys()

    console.log('[build-all] step 1/5: shared deps')
    if (run('node', [path.join(__dirname, 'build-shared.cjs')]) !== 0) process.exit(1)

    console.log('[build-all] step 2/5: core build')
    if (run('node', [path.join(__dirname, 'build-core.cjs')]) !== 0) process.exit(1)

    console.log(`[build-all] step 3/5: addon builds (${keys.length} addons)`)
    const { success, failed } = await buildAddonsParallel(keys, 2)
    fs.writeFileSync(REPORT_PATH, JSON.stringify({ success, failed, time: new Date().toISOString() }, null, 2) + '\n', 'utf-8')
    console.log(`[build-all] addons: ${success.length} ok, ${failed.length} failed`)

    console.log('[build-all] step 4/5: assemble')
    if (run('node', [path.join(__dirname, 'assemble-wap.cjs')]) !== 0) process.exit(1)

    console.log('[build-all] step 5/5: publish post-process')
    if (run('node', [path.join(ROOT, 'publish.cjs'), 'h5', 'build']) !== 0) process.exit(1)

    console.log('[build-all] complete')
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
