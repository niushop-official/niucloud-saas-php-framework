/**
 * Core 构建后校验（build:core 中 vite build 之后、assemble 之前执行）
 *
 * 检查项：
 * 1. dist/.core/manifest.json 存在
 * 2. 入口 bundle 不含旧版 loadAddonCommonLocales（防 stale 缓存）
 * 3. 含新版 preloadAllAddonLangs 逻辑
 * 4. 修复并校验 admin-lang import 路径
 */
const fs = require('fs')
const path = require('path')

const core = path.join(__dirname, '..', 'dist', '.core')
const manifestPath = path.join(core, 'manifest.json')

if (!fs.existsSync(manifestPath)) {
    console.error('[verify-core-lang] missing dist/.core/manifest.json — run build:core first')
    process.exit(1)
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
const entry = manifest['index.html']?.file
const code = fs.readFileSync(path.join(core, entry), 'utf-8')

// 旧构建特征：仅加载 common.json 或旧函数名
const stale = code.includes('loadAddonCommonLocales') || code.includes('async function os(e,t=["zh-cn","en"])')
const hasPreload = code.includes('preloadAllAddonLangs') || code.includes('.langs')

if (stale) {
    console.error('[verify-core-lang] STALE bundle:', entry)
    console.error('  still contains old loadAddonCommonLocales — delete dist/.core and rebuild')
    process.exit(1)
}

if (!hasPreload) {
    console.warn('[verify-core-lang] warn: preloadAllAddonLangs string not found (may be minified)')
}

const assetsDir = path.join(core, 'assets')
const { fixDir, hasBadImport } = require('./admin-lang-import-utils.cjs')
fixDir(assetsDir)
if (fs.existsSync(assetsDir)) {
    for (const name of fs.readdirSync(assetsDir)) {
        if (!name.endsWith('.js')) continue
        const code = fs.readFileSync(path.join(assetsDir, name), 'utf-8')
        if (hasBadImport(code)) {
            console.error('[verify-core-lang] bad admin-lang import still in', name)
            process.exit(1)
        }
    }
}

console.log('[verify-core-lang] ok:', entry)
