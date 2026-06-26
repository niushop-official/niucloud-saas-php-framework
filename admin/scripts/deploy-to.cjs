/**
 * 发布 dist 到目标 admin 目录（保留已 drop-in 的插件）
 *
 * 用法：
 *   node scripts/deploy-to.cjs [deploy-dir]
 *   node scripts/deploy-to.cjs "D:/path/to/public/admin"
 */
const fs = require('fs')
const path = require('path')
const { ROOT } = require('./addon-utils.cjs')
const { fixDir } = require('./admin-lang-import-utils.cjs')

const src = path.join(ROOT, 'dist')
const dest = path.resolve(process.argv[2] || process.env.PUBLISH_DEST || path.join(ROOT, '../niucloud/public/admin'))
const backup = path.join(ROOT, '.deploy_addons_backup')

function rmDir(dir) {
    if (!fs.existsSync(dir)) return
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 8, retryDelay: 200 })
}

function copyTree(from, to) {
    fs.mkdirSync(path.dirname(to), { recursive: true })
    fs.cpSync(from, to, { recursive: true, force: true })
}

function readKeys(addonsDir) {
    const p = path.join(addonsDir, 'index.json')
    if (!fs.existsSync(p)) return []
    try {
        const data = JSON.parse(fs.readFileSync(p, 'utf-8'))
        return Array.isArray(data.keys) ? data.keys : []
    } catch {
        return []
    }
}

function writeKeys(addonsDir, keys) {
    fs.mkdirSync(addonsDir, { recursive: true })
    fs.writeFileSync(
        path.join(addonsDir, 'index.json'),
        JSON.stringify({ keys: [...new Set(keys)].sort(), sharedVersion: 'admin-core-1.0.0' }, null, 2) + '\n'
    )
}

function listDropInKeys(addonsDir) {
    if (!fs.existsSync(addonsDir)) return []
    return fs.readdirSync(addonsDir).filter((name) => {
        if (name === 'index.json' || name.startsWith('.')) return false
        return fs.existsSync(path.join(addonsDir, name, 'index.js'))
    })
}

function main() {
    if (!fs.existsSync(path.join(src, 'index.html'))) {
        console.error('[deploy] missing dist/index.html — run: npm run build:core')
        process.exit(1)
    }
    if (!fs.existsSync(dest)) {
        console.error(`[deploy] target not found: ${dest}`)
        process.exit(1)
    }

    const destAddons = path.join(dest, 'assets', 'addons')
    rmDir(backup)
    if (fs.existsSync(destAddons)) {
        copyTree(destAddons, backup)
        console.log(`[deploy] backed up existing addons -> ${path.relative(ROOT, backup)}`)
    }

    const preserveKeys = [...new Set([...readKeys(backup), ...listDropInKeys(backup)])]

    // 根目录静态文件
    for (const name of ['index.html', 'manifest.json', 'niucloud.ico']) {
        const f = path.join(src, name)
        if (fs.existsSync(f)) fs.copyFileSync(f, path.join(dest, name))
    }
    const ueditor = path.join(src, 'ueditor')
    if (fs.existsSync(ueditor)) {
        rmDir(path.join(dest, 'ueditor'))
        copyTree(ueditor, path.join(dest, 'ueditor'))
    }

    // core assets（跳过 addons，单独合并）
    const srcAssets = path.join(src, 'assets')
    const destAssets = path.join(dest, 'assets')
    fs.mkdirSync(destAssets, { recursive: true })
    for (const name of fs.readdirSync(srcAssets)) {
        if (name === 'addons') continue
        const from = path.join(srcAssets, name)
        const to = path.join(destAssets, name)
        rmDir(to)
        copyTree(from, to)
    }

    // 合并 addons：dist 构建产物 + 目标站 drop-in
    const mergedAddons = path.join(destAssets, 'addons')
    fs.mkdirSync(mergedAddons, { recursive: true })
    const srcAddons = path.join(srcAssets, 'addons')
    if (fs.existsSync(srcAddons)) {
        copyTree(srcAddons, mergedAddons)
    }
    for (const key of preserveKeys) {
        const from = path.join(backup, key)
        const to = path.join(mergedAddons, key)
        if (!fs.existsSync(path.join(from, 'index.js'))) continue
        if (fs.existsSync(path.join(to, 'index.js'))) continue
        copyTree(from, to)
        console.log(`[deploy] preserved drop-in addon "${key}"`)
    }

    const keys = [...new Set([
        ...readKeys(mergedAddons),
        ...readKeys(backup),
        ...preserveKeys
    ])]
    if (keys.length) writeKeys(mergedAddons, keys)

    fixDir(destAssets)
    rmDir(backup)

    console.log(`[deploy] ${src} -> ${dest}`)
    console.log(`[deploy] addons: ${keys.join(', ') || '(none)'}`)
    const hasDropIn = fs.readFileSync(path.join(destAssets, 'shared', 'admin-lang.js'), 'utf-8').includes('drop-in entry')
    console.log(`[deploy] drop-in runtime: ${hasDropIn ? 'OK' : 'MISSING — rebuild shared'}`)
}

main()
