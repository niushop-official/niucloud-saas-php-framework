/**

 * H5 Core 构建

 */

const fs = require('fs')

const { spawnSync } = require('child_process')

const path = require('path')

const { ROOT, PAGES_JSON } = require('./addon-utils.cjs')



const PAGES_BACKUP = path.join(ROOT, '.build', 'pages.full.backup.json')

const PAGES_CORE = path.join(ROOT, '.build', 'pages.core.json')



function run(cmd, args, env = {}) {

    const r = spawnSync(cmd, args, {

        cwd: ROOT,

        env: { ...process.env, UNI_PLATFORM: 'h5', BUILD_MODE: 'core', ...env },

        stdio: 'inherit',

        shell: process.platform === 'win32'

    })

    return r.status ?? 1

}



function swapPagesJson(useCore, rawBackup) {

    if (useCore) {
        // 保存原始内容（保留注释），避免被后续构建覆盖
        rawBackup = fs.readFileSync(PAGES_JSON, 'utf-8')

        fs.copyFileSync(PAGES_CORE, PAGES_JSON)

        console.log('[build-core] swapped pages.json -> pages.core.json')
        return rawBackup
    } else if (rawBackup) {
        fs.writeFileSync(PAGES_JSON, rawBackup, 'utf-8')
        console.log('[build-core] restored pages.json (with comments)')
    }

}



run('node', [path.join(__dirname, 'preflight-build.cjs')])

console.log('[build-core] generate diy component registry')
let code = run('node', [path.join(__dirname, 'generate-diy-registry.cjs')])
if (code !== 0) process.exit(code)

console.log('[build-core] diy-group uses diy-dynamic-bridge (no split vue generation)')

console.log('[build-core] generate addon component stubs (non-diy only)')

code = run('node', [path.join(__dirname, 'generate-addon-stubs.cjs')])

if (code !== 0) process.exit(code)



console.log('[build-core] generate split pages + bridge files')

code = run('node', [path.join(__dirname, 'generate-split-pages.cjs')])

if (code !== 0) process.exit(code)



code = run('node', [path.join(__dirname, 'clean-core.cjs')])

if (code !== 0) process.exit(code)



const pagesBackup = swapPagesJson(true)

code = run('node', [path.join(__dirname, 'swap-addon-pages.cjs'), 'apply'])

if (code !== 0) {

    swapPagesJson(false, pagesBackup)

    process.exit(code)

}



try {

    console.log('[build-core] vite core build (framework only, addon pages -> bridge)')

    code = run('npx', ['vite', 'build', '--config', 'vite.config.core.ts'], {

        NODE_OPTIONS: '--max-old-space-size=4096'

    })

} finally {

    run('node', [path.join(__dirname, 'swap-addon-pages.cjs'), 'restore'])

    swapPagesJson(false, pagesBackup)

}



if (code !== 0) {

    console.error('[build-core] FAILED')

    process.exit(code)

}



code = run('node', [path.join(__dirname, 'purge-core-addon-leaks.cjs')])

if (code !== 0) process.exit(code)

code = run('node', [path.join(__dirname, 'patch-core-locale-external.cjs'), path.join(ROOT, 'dist', '.core', 'h5')])

if (code !== 0) process.exit(code)

console.log('[build-core] OK -> dist/.core/h5/')

