/**
 * 将 dist/.addons/{key} 同步到 dist/build/h5/assets/addons/{key}
 */
const fs = require('fs')
const path = require('path')
const { ROOT, resolveAddonEntry } = require('./addon-utils.cjs')
const { stripAddonStyleImport } = require('./inject-addon-style-import.cjs')

const ADDONS_STAGING = path.join(ROOT, 'dist', '.addons')
const OUT_ASSETS = path.join(ROOT, 'dist', 'build', 'h5', 'assets', 'addons')
const REPORT_PATH = path.join(ROOT, 'build-report.json')

function rmDir(dir) {
    if (!fs.existsSync(dir)) return
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
}

function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true })
    for (const name of fs.readdirSync(src)) {
        const s = path.join(src, name)
        const d = path.join(dest, name)
        if (fs.statSync(s).isDirectory()) copyDir(s, d)
        else fs.copyFileSync(s, d)
    }
}

function copyLocale(key, destAddonDir) {
    const localeSrc = path.join(ROOT, 'src', 'addon', key, 'locale')
    if (!fs.existsSync(localeSrc)) return
    copyDir(localeSrc, path.join(destAddonDir, 'locale'))
}

function writeAddonManifest(key, destAddonDir) {
    const manifest = {
        key,
        version: '1.0.0',
        sharedVersion: 'wap-core-1.0.0',
        // entry 保持相对路径（./index-[hash].js），与旧插件 ./index.js 兼容；
        // 真正拼带 key 的 URL 由运行时 loader 用 addon key 重建，避免 wapUrl 丢 key
        entry: resolveAddonEntry(destAddonDir),
        localeBase: './locale/'
    }
    fs.writeFileSync(
        path.join(destAddonDir, 'manifest.json'),
        JSON.stringify(manifest, null, 2) + '\n',
        'utf-8'
    )
}

function readReport() {
    if (!fs.existsSync(REPORT_PATH)) return { success: [], failed: [] }
    return JSON.parse(fs.readFileSync(REPORT_PATH, 'utf-8'))
}

function writeReport(report) {
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + '\n', 'utf-8')
}

function markSuccess(key) {
    const report = readReport()
    const success = new Set(report.success || [])
    success.add(key)
    report.success = [...success].sort()
    report.failed = (report.failed || []).filter((f) => f.key !== key)
    writeReport(report)
}

function writeAddonsIndex(keys) {
    fs.mkdirSync(OUT_ASSETS, { recursive: true })
    // 合并各插件 manifest.json 到 index.json.manifests，减少前端 N 次 HTTP 请求
    // （与后端 rebuildPublicWapAddonIndexJson 行为一致）
    const manifests = {}
    for (const key of keys) {
        const manifestFile = path.join(OUT_ASSETS, key, 'manifest.json')
        if (fs.existsSync(manifestFile)) {
            try {
                const data = JSON.parse(fs.readFileSync(manifestFile, 'utf-8'))
                if (data && Object.keys(data).length) manifests[key] = data
            } catch { /* 忽略损坏的 manifest，保持构建不中断 */ }
        }
    }
    fs.writeFileSync(
        path.join(OUT_ASSETS, 'index.json'),
        JSON.stringify({ keys, sharedVersion: 'wap-core-1.0.0', manifests }, null, 2) + '\n',
        'utf-8'
    )
}

function syncAddon(key) {
    const src = path.join(ADDONS_STAGING, key)
    if (!fs.existsSync(src)) {
        console.error(`[sync-addon] missing staging: ${src}`)
        process.exit(1)
    }
    const entryRel = resolveAddonEntry(src)
    const entry = path.join(src, entryRel.replace(/^\.\//, ''))
    if (!fs.existsSync(entry)) {
        console.error(`[sync-addon] missing ${key}/${entryRel}`)
        process.exit(1)
    }

    const dest = path.join(OUT_ASSETS, key)
    rmDir(dest)
    fs.cpSync(src, dest, { recursive: true, force: true })
    stripAddonStyleImport(dest)
    copyLocale(key, dest)
    writeAddonManifest(key, dest)
    markSuccess(key)
    writeAddonsIndex(readReport().success || [key])
    console.log(`[sync-addon] ${key} -> dist/build/h5/assets/addons/${key}/`)
}

const key = process.argv[2] || process.env.ADDON_KEY
if (!key) {
    console.error('Usage: node sync-addon.cjs <addon-key>')
    process.exit(1)
}

syncAddon(key)
