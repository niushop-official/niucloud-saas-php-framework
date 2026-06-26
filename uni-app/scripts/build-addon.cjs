/**

 * 编译单个 addon（H5 lib 模式）

 */

const { spawnSync } = require('child_process')

const path = require('path')

const { ROOT } = require('./addon-utils.cjs')

const { stripAddonStyleImport } = require('./inject-addon-style-import.cjs')

const { injectChunkScopedCss } = require('./inject-addon-chunk-scoped-css.cjs')
const { injectChunkWindiCss } = require('./inject-addon-chunk-windi.cjs')
const { patchAddonDir: patchAddonLocaleLeak } = require('./patch-addon-locale-leak.cjs')
const { patchAddonDir: patchAddonDiyLeak } = require('./patch-addon-diy-leak.cjs')
const { validateAddonDir: validateAddonChunkExports } = require('./validate-addon-chunk-exports.cjs')



const key = process.argv[2] || process.env.ADDON_KEY

if (!key) {

    console.error('Usage: node build-addon.cjs <addon-key>')

    process.exit(1)

}



spawnSync('node', [path.join(__dirname, 'generate-addon-entry.cjs'), key], {

    cwd: ROOT,

    stdio: 'inherit',

    shell: process.platform === 'win32'

})

spawnSync('node', [path.join(__dirname, 'generate-diy-registry.cjs')], {

    cwd: ROOT,

    stdio: 'inherit',

    shell: process.platform === 'win32'

})



const env = {

    ...process.env,

    ADDON_KEY: key,

    UNI_PLATFORM: 'h5',

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



const stagingDir = path.join(ROOT, 'dist', '.addons', key)

patchAddonLocaleLeak(stagingDir)
patchAddonDiyLeak(stagingDir)

const exportCheck = validateAddonChunkExports(stagingDir)
if (!exportCheck.ok) {
    console.error(`[build-addon] shared chunk export validation failed for "${key}"`)
    for (const err of exportCheck.errors) {
        console.error(`  ${err.file}: missing ${err.total} binding(s), e.g. ${err.missing.join(', ')}`)
    }
    process.exit(1)
}

stripAddonStyleImport(stagingDir)



const chunkCss = injectChunkScopedCss(stagingDir)

if (chunkCss.injected) {

    console.log(`[build-addon] injected descoped CSS into ${chunkCss.injected} page chunks`)

}



const windi = spawnSync('node', [

    path.join(__dirname, 'generate-addon-windi-css.cjs'),

    stagingDir,

    key

], {

    cwd: ROOT,

    stdio: 'inherit',

    shell: process.platform === 'win32'

})

if (windi.status !== 0) {

    console.error(`[build-addon] Windi CSS generation failed for ${key}`)

    process.exit(windi.status ?? 1)

}

const chunkWindi = injectChunkWindiCss(stagingDir)

if (chunkWindi.injected) {

    console.log(`[build-addon] injected Windi CSS into ${chunkWindi.injected} page chunks`)

}



spawnSync('node', [path.join(__dirname, 'patch-addon-uni-h5.cjs'), key], {

    cwd: ROOT,

    stdio: 'inherit',

    shell: process.platform === 'win32'

})

// 清理其他插件的 locale chunk（uni-app i18n 自动收集导致其他插件 locale 也被 Vite 打包）
const _fs = require('fs')
const _assetsDir = path.join(stagingDir, 'assets')
if (_fs.existsSync(_assetsDir)) {
    const _re = new RegExp(`^addon-(?!${key}-)[^-]+-`)
    const _appRe = /^app-locale-/
    let _removed = 0
    for (const _name of _fs.readdirSync(_assetsDir)) {
        if (_re.test(_name) || _appRe.test(_name)) {
            _fs.unlinkSync(path.join(_assetsDir, _name))
            _removed++
        }
    }
    if (_removed) console.log(`[build-addon] cleaned ${_removed} other-addon locale chunks`)
}

const sync = spawnSync('node', [path.join(__dirname, 'sync-addon.cjs'), key], {

    cwd: ROOT,

    stdio: 'inherit',

    shell: process.platform === 'win32'

})

if (sync.status !== 0) process.exit(sync.status ?? 1)



console.log(`[build-addon] OK: ${key}`)


