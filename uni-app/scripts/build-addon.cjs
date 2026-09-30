/**
 * 编译一个或多个 addon(H5 lib 模式)
 *
 * 用法：
 *   node scripts/build-addon.cjs shop
 *   node scripts/build-addon.cjs shop cms pintuan
 *   ADDON_KEY=shop node scripts/build-addon.cjs
 */
const { spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { ROOT, listAddonKeys } = require('./addon-utils.cjs')
const { stripAddonStyleImport } = require('./inject-addon-style-import.cjs')
const { injectChunkScopedCss } = require('./inject-addon-chunk-scoped-css.cjs')
const { injectChunkWindiCss } = require('./inject-addon-chunk-windi.cjs')
const { patchAddonDir: patchAddonLocaleLeak } = require('./patch-addon-locale-leak.cjs')
const { patchAddonDir: patchAddonDiyLeak } = require('./patch-addon-diy-leak.cjs')
const { validateAddonDir: validateAddonChunkExports } = require('./validate-addon-chunk-exports.cjs')

// 支持一次编译多个插件：node scripts/build-addon.cjs shop cms
const argvKeys = process.argv.slice(2).filter(Boolean)
const keys = [...new Set(argvKeys.length ? argvKeys : process.env.ADDON_KEY ? [process.env.ADDON_KEY] : [])]

if (!keys.length) {
    console.error('Usage: node build-addon.cjs <addon-key> [addon-key ...]')
    process.exit(1)
}

function buildOne(key) {
    console.log(`\n========== [build-addon] "${key}" ==========`)

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

    const windi = spawnSync('node', [path.join(__dirname, 'generate-addon-windi-css.cjs'), stagingDir, key], {
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

    // 清理其他插件的 locale chunk(i18n 自动收集导致被误打进当前插件包)
    const assetsDir = path.join(stagingDir, 'assets')
    if (fs.existsSync(assetsDir)) {
        const otherKeys = listAddonKeys().filter((k) => k !== key)
        const appRe = /^app-locale-/
        let removed = 0
        for (const name of fs.readdirSync(assetsDir)) {
            const isOtherAddonChunk = otherKeys.some((k) => name.startsWith(`addon-${k}-`))
            if (isOtherAddonChunk || appRe.test(name)) {
                fs.unlinkSync(path.join(assetsDir, name))
                removed++
            }
        }
        if (removed) console.log(`[build-addon] cleaned ${removed} other-addon locale chunks`)
    }

    const sync = spawnSync('node', [path.join(__dirname, 'sync-addon.cjs'), key], {
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
