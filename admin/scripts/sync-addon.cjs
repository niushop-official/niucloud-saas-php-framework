/**
 * 将 dist/.addons/{key} 同步到 dist/assets/addons/{key}
 *
 * build-addon 成功后调用；也可单独执行以刷新已构建插件到 assets 目录。
 * 同时写入 manifest.json、lang/ 备份、assets/addons/index.json，并更新 build-report.json。
 *
 * 用法：node scripts/sync-addon.cjs <addon-key>
 */
const fs = require('fs')
const path = require('path')
const { ROOT, resolveAddonEntry } = require('./addon-utils.cjs')

/** Vite addon 构建 staging */
const ADDONS_STAGING = path.join(ROOT, 'dist', '.addons')
const OUT_DIR = path.join(ROOT, 'dist')
/** 记录各 addon 构建成功/失败，assemble 据此决定复制哪些 key */
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

/** 复制源码 lang 目录，供运行时 fetch json 降级或运维查阅 */
function copyLang(key, destAddonDir) {
    const langSrc = path.join(ROOT, 'src', 'addon', key, 'lang')
    if (!fs.existsSync(langSrc)) return
    copyDir(langSrc, path.join(destAddonDir, 'lang'))
}

/** 运行时 initAddonManifests 会 fetch 此文件 */
function writeAddonManifest(key, destAddonDir) {
    const manifest = {
        key,
        version: '1.0.0',
        sharedVersion: 'admin-core-1.0.0',
        // entry 保持相对路径（./index-[hash].js），与旧插件 ./index.js 兼容；
        // 真正拼带 key 的 URL 由运行时 loader 用 addon key 重建，避免 adminUrl 丢 key
        entry: resolveAddonEntry(destAddonDir),
        langBase: './lang/'
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

/** 将 key 记入 success 列表，并从 failed 中移除 */
function markSuccess(key) {
    const report = readReport()
    const success = new Set(report.success || [])
    success.add(key)
    report.success = [...success].sort()
    report.failed = (report.failed || []).filter((f) => f.key !== key)
    writeReport(report)
}

/** 浏览器启动时 fetch：/admin/assets/addons/index.json */
function writeAddonsIndex(keys) {
    const addonsDir = path.join(OUT_DIR, 'assets', 'addons')
    fs.mkdirSync(addonsDir, { recursive: true })
    // 合并各插件 manifest.json 到 index.json.manifests，减少前端 N 次 HTTP 请求
    // （与后端 rebuildPublicAdminAddonIndexJson 行为一致）
    const manifests = {}
    for (const key of keys) {
        const manifestFile = path.join(addonsDir, key, 'manifest.json')
        if (fs.existsSync(manifestFile)) {
            try {
                const data = JSON.parse(fs.readFileSync(manifestFile, 'utf-8'))
                if (data && Object.keys(data).length) manifests[key] = data
            } catch { /* 忽略损坏的 manifest，保持构建不中断 */ }
        }
    }
    fs.writeFileSync(
        path.join(addonsDir, 'index.json'),
        JSON.stringify({ keys, sharedVersion: 'admin-core-1.0.0', buildTime: Date.now(), manifests }, null, 2) + '\n',
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
        console.error(`[sync-addon] missing ${key}/${entryRel} — rebuild addon first`)
        process.exit(1)
    }

    const dest = path.join(OUT_DIR, 'assets', 'addons', key)
    rmDir(dest)
    fs.cpSync(src, dest, { recursive: true, force: true })
    copyLang(key, dest)
    writeAddonManifest(key, dest)

    markSuccess(key)
    const report = readReport()
    writeAddonsIndex(report.success || [key])

    console.log(`[sync-addon] ${key} -> dist/assets/addons/${key}/`)
}

const key = process.argv[2] || process.env.ADDON_KEY
if (!key) {
    console.error('Usage: node scripts/sync-addon.cjs <addon-key>')
    process.exit(1)
}

syncAddon(key)
