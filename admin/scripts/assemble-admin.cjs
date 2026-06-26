/**
 * 组装最终可部署 dist/
 *
 * 将 staging 目录合并为站点可访问结构：
 *   dist/.addons/*  → dist/assets/addons/{key}/
 *   dist/.core/*    → dist/（index.html、assets 等，跳过 addons 子目录）
 *   dist/.shared/*  → dist/assets/shared/
 *
 * 并注入 Import Map、修正 /admin 路径、修复 admin-lang import、剥离多余 style import。
 *
 * 用法：npm run build:assemble（需先 build-shared + build:core + build-addon）
 */
const fs = require('fs')
const path = require('path')
const { ROOT, listAddonKeys } = require('./addon-utils.cjs')
const { IMPORT_MAP } = require('./shared-external.cjs')
const { stripBuiltAssets } = require('./strip-style-imports.cjs')

const CORE_DIR = path.join(ROOT, 'dist', '.core')
const ADDONS_STAGING = path.join(ROOT, 'dist', '.addons')
const OUT_DIR = path.join(ROOT, 'dist')
const SHARED_DIR = path.join(ROOT, 'dist', '.shared')
const REPORT_PATH = path.join(ROOT, 'build-report.json')

function toWinLongPath(dir) {
    if (process.platform !== 'win32') return dir
    if (dir.startsWith('\\\\?\\')) return dir
    return `\\\\?\\${path.resolve(dir)}`
}

function rmDir(dir) {
    if (!fs.existsSync(dir)) return
    try {
        fs.rmSync(toWinLongPath(dir), { recursive: true, force: true, maxRetries: 8, retryDelay: 300 })
    } catch {
        fs.rmSync(dir, { recursive: true, force: true, maxRetries: 8, retryDelay: 300 })
    }
}

/** Windows 下 rename 容易因文件锁失败，加重试 + 降级为 copy+delete */
function safeRename(src, dest, maxRetries = 5) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            fs.renameSync(src, dest)
            return
        } catch (e) {
            if (e.code === 'EPERM' || e.code === 'EBUSY') {
                if (i < maxRetries - 1) {
                    console.log(`[assemble] rename busy, retry ${i + 1}/${maxRetries}...`)
                    const s = Date.now(); while (Date.now() - s < 500) {}
                } else {
                    // 最终降级：copy + delete
                    copyDir(src, dest)
                    rmDir(src)
                    console.log(`[assemble] rename failed, fallback to copy+delete`)
                }
            } else {
                throw e
            }
        }
    }
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

function copyTree(src, dest) {
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.cpSync(src, dest, { recursive: true, force: true })
}

/**
 * 清理 dist/assets 下旧的 core 产物，保留 addons（shared 随后从 .shared 重拷）
 * Vite 每次构建 chunk hash 会变，不清理会留下上一版同名不同 hash 的孤儿文件
 */
function cleanCoreAssetsOutput() {
    const outAssets = path.join(OUT_DIR, 'assets')
    if (!fs.existsSync(outAssets)) {
        fs.mkdirSync(outAssets, { recursive: true })
        return
    }
    const addonsSrc = path.join(outAssets, 'addons')
    const addonsTmp = path.join(OUT_DIR, '.addons_staging')
    if (fs.existsSync(addonsTmp)) rmDir(addonsTmp)
    if (fs.existsSync(addonsSrc)) {
        safeRename(addonsSrc, addonsTmp)
    }
    if (fs.existsSync(outAssets)) {
        const staleAssets = path.join(ROOT, '.build', '.assets_stale_' + Date.now())
        try { safeRename(outAssets, staleAssets) } catch { rmDir(outAssets) }
    }
    fs.mkdirSync(outAssets, { recursive: true })
    if (fs.existsSync(addonsTmp)) {
        safeRename(addonsTmp, path.join(outAssets, 'addons'))
    }
}

/**
 * 合并 core 产物到 dist 根目录
 * 注意：跳过 core/assets/addons，避免覆盖已同步的插件目录
 */
function mergeCoreOutput() {
    for (const name of ['index.html', 'manifest.json', 'niucloud.ico']) {
        const src = path.join(CORE_DIR, name)
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, path.join(OUT_DIR, name))
            console.log(`[assemble] core ${name}`)
        }
    }
    const ueditor = path.join(CORE_DIR, 'ueditor')
    if (fs.existsSync(ueditor)) {
        copyTree(ueditor, path.join(OUT_DIR, 'ueditor'))
        console.log('[assemble] core ueditor/')
    }
    const coreAssets = path.join(CORE_DIR, 'assets')
    const outAssets = path.join(OUT_DIR, 'assets')
    if (!fs.existsSync(coreAssets)) return
    fs.mkdirSync(outAssets, { recursive: true })
    for (const name of fs.readdirSync(coreAssets)) {
        if (name === 'addons') continue
        const src = path.join(coreAssets, name)
        const dest = path.join(outAssets, name)
        if (fs.statSync(src).isDirectory()) {
            copyDir(src, dest)
        } else {
            fs.copyFileSync(src, dest)
        }
        console.log(`[assemble] core assets/${name}`)
    }
}

function copyLang(key, destAddonDir) {
    const langSrc = path.join(ROOT, 'src', 'addon', key, 'lang')
    if (!fs.existsSync(langSrc)) return
    const langDest = path.join(destAddonDir, 'lang')
    copyDir(langSrc, langDest)
}

function writeAddonManifest(key, destAddonDir) {
    const manifest = {
        key,
        version: '1.0.0',
        sharedVersion: 'admin-core-1.0.0',
        entry: './index.js',
        langBase: './lang/'
    }
    fs.writeFileSync(path.join(destAddonDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf-8')
}

/** Vite 默认相对路径 ./assets/ → 部署绝对路径 /admin/assets/ */
function fixIndexHtml() {
    const fn = path.join(OUT_DIR, 'index.html')
    if (!fs.existsSync(fn)) return
    let text = fs.readFileSync(fn, 'utf-8')
    text = text.replaceAll('./assets/', '/admin/assets/')
    text = text.replace('./niucloud.ico', '/admin/niucloud.ico')
    fs.writeFileSync(fn, text, 'utf-8')
}

/** 注入 Import Map，使 vue / @/lang 等解析到 shared 单例 */
function injectImportMap() {
    const fn = path.join(OUT_DIR, 'index.html')
    if (!fs.existsSync(fn)) return
    let text = fs.readFileSync(fn, 'utf-8')
    const script = `<script type="importmap">\n${JSON.stringify({ imports: IMPORT_MAP }, null, 2)}\n</script>`
    if (text.includes('type="importmap"')) {
        text = text.replace(/<script type="importmap">[\s\S]*?<\/script>/, script)
    } else {
        text = text.replace('<head>', `<head>\n    ${script}`)
    }
    fs.writeFileSync(fn, text, 'utf-8')
}

/**
 * 清理 dist 根下旧文件，保留 staging（.core/.addons/.shared）与 assets
 * addon 子目录在 runAssemble 里按 key 单独 rm，避免 Windows ENOTEMPTY
 */
function cleanAssembledOutput() {
    if (!fs.existsSync(OUT_DIR)) {
        fs.mkdirSync(OUT_DIR, { recursive: true })
        return
    }
    const keep = new Set(['.core', '.addons', '.shared', '.addons_staging', 'assets'])
    for (const name of fs.readdirSync(OUT_DIR)) {
        if (keep.has(name)) continue
        // 历史 trash 目录不阻塞构建，可手动删除 dist/assets.__trash_*
        if (name.includes('.__trash_') || name.startsWith('assets.__')) continue
        rmDir(path.join(OUT_DIR, name))
    }
}

/** Element Plus 语言包，importmap 中 locale 路径指向此处 */
function copySharedLocales() {
    const srcBase = path.join(ROOT, 'node_modules', 'element-plus', 'dist', 'locale')
    const destBase = path.join(OUT_DIR, 'assets', 'shared', 'locale')
    fs.mkdirSync(destBase, { recursive: true })
    for (const file of ['zh-cn.mjs', 'en.mjs']) {
        const src = path.join(srcBase, file)
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, path.join(destBase, file))
        }
    }
}


function main() {
    try {
        runAssemble()
    } catch (err) {
        console.error('[assemble] ERROR:', err)
        process.exit(1)
    }
}

function runAssemble() {
    const report = fs.existsSync(REPORT_PATH)
        ? JSON.parse(fs.readFileSync(REPORT_PATH, 'utf-8'))
        : { success: listAddonKeys(), failed: [] }

    cleanAssembledOutput()

    if (!fs.existsSync(CORE_DIR)) {
        console.error('[assemble] missing dist/.core — run core build first')
        process.exit(1)
    }

    const successKeys = report.success || []
    const installedKeys = []

    // 先同步 addon，避免后续 core 合并耗时过长时 assets/addons 仍为空
    for (const key of successKeys) {
        const src = path.join(ADDONS_STAGING, key)
        if (!fs.existsSync(src)) continue
        const dest = path.join(OUT_DIR, 'assets', 'addons', key)
        rmDir(dest)
        copyTree(src, dest)
        copyLang(key, dest)
        writeAddonManifest(key, dest)
        const entryFile = path.join(dest, 'index.js')
        if (!fs.existsSync(entryFile)) {
            console.error(`[assemble] missing ${key}/index.js — run: node scripts/build-addon.cjs ${key}`)
            process.exit(1)
        }
        installedKeys.push(key)
        console.log(`[assemble] addon "${key}" -> assets/addons/${key}/`)
    }

    const indexJson = { keys: installedKeys, sharedVersion: 'admin-core-1.0.0' }
    fs.mkdirSync(path.join(OUT_DIR, 'assets', 'addons'), { recursive: true })
    fs.writeFileSync(
        path.join(OUT_DIR, 'assets', 'addons', 'index.json'),
        JSON.stringify(indexJson, null, 2) + '\n',
        'utf-8'
    )

    cleanCoreAssetsOutput()
    mergeCoreOutput()

    // 修复 Rollup 生成的错误 admin-lang 相对路径（否则会请求到 HTML 404）
    const { fixDir } = require('./admin-lang-import-utils.cjs')
    fixDir(path.join(OUT_DIR, 'assets'))

    if (fs.existsSync(SHARED_DIR)) {
        const sharedDest = path.join(OUT_DIR, 'assets', 'shared')
        fs.mkdirSync(sharedDest, { recursive: true })
        for (const name of fs.readdirSync(SHARED_DIR)) {
            copyTree(path.join(SHARED_DIR, name), path.join(sharedDest, name))
        }
        console.log('[assemble] shared -> assets/shared/')
    } else {
        console.warn('[assemble] missing dist/.shared — run build-shared first')
    }
    copySharedLocales()

    // core 合并可能覆盖 addons/index.json，需再次写入
    fs.writeFileSync(
        path.join(OUT_DIR, 'assets', 'addons', 'index.json'),
        JSON.stringify(indexJson, null, 2) + '\n',
        'utf-8'
    )
    for (const key of installedKeys) {
        writeAddonManifest(key, path.join(OUT_DIR, 'assets', 'addons', key))
    }

    fixIndexHtml()
    injectImportMap()
    const cleaned = stripBuiltAssets(OUT_DIR)
    if (cleaned.length) {
        console.log(`[assemble] stripped element-plus style imports from ${cleaned.length} js files`)
    }
    console.log(`[assemble] done: core + ${installedKeys.length} addons`)
    if (report.failed?.length) {
        console.warn('[assemble] skipped failed addons:', report.failed.map((f) => f.key).join(', '))
    }
}

main()
