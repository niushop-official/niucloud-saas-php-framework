/**
 * 组装 H5 分构建最终产物 → dist/build/h5/
 */
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const { ROOT, listAddonKeys, resolveAddonEntry } = require('./addon-utils.cjs')
const { IMPORT_MAP, SHARED_BUILD_ORDER } = require('./shared-external.cjs')
const { fixDir } = require('./wap-locale-import-utils.cjs')
const { applyRouterBase } = require('./apply-router-base.cjs')
const { patchAddonDir } = require('./patch-addon-uni-h5.cjs')
const { patchVueJsFile } = require('./uni-feature-defines.cjs')
const { stripAddonStyleImport } = require('./inject-addon-style-import.cjs')
const { injectChunkScopedCss } = require('./inject-addon-chunk-scoped-css.cjs')
const { injectChunkWindiCss } = require('./inject-addon-chunk-windi.cjs')
const { patchAddonDir: patchAddonLocaleLeak } = require('./patch-addon-locale-leak.cjs')
const { patchAddonDir: patchAddonDiyLeak } = require('./patch-addon-diy-leak.cjs')
const { patchCoreH5Dir: patchCoreLocaleExternal } = require('./patch-core-locale-external.cjs')
const { mergeIntoWapLocale } = require('./merge-addon-locales-into-wap-locale.cjs')

const CORE_DIR = path.join(ROOT, 'dist', '.core', 'h5')
const ADDONS_STAGING = path.join(ROOT, 'dist', '.addons')
const SHARED_DIR = path.join(ROOT, 'dist', '.shared')
const OUT_DIR = path.join(ROOT, 'dist', 'build', 'h5')
const REPORT_PATH = path.join(ROOT, 'build-report.json')

function rmDir(dir) {
    if (!fs.existsSync(dir)) return
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 8, retryDelay: 300 })
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

function cleanCoreAssetsOutput() {
    const outAssets = path.join(OUT_DIR, 'assets')
    if (!fs.existsSync(outAssets)) {
        fs.mkdirSync(outAssets, { recursive: true })
        return null
    }
    const addonsSrc = path.join(outAssets, 'addons')
    const addonsTmp = path.join(OUT_DIR, '.addons_staging')
    if (fs.existsSync(addonsTmp)) rmDir(addonsTmp)
    if (fs.existsSync(addonsSrc)) {
        fs.renameSync(addonsSrc, addonsTmp)
    }
    const staleAssets = path.join(OUT_DIR, `.assets_stale_${Date.now()}`)
    try {
        fs.renameSync(outAssets, staleAssets)
    } catch {
        rmDir(outAssets)
        return null
    }
    fs.mkdirSync(outAssets, { recursive: true })
    if (fs.existsSync(addonsTmp)) {
        fs.renameSync(addonsTmp, path.join(outAssets, 'addons'))
    }
    return staleAssets
}

function cleanupAssembleArtifacts(staleAssets) {
    if (staleAssets) rmDir(staleAssets)
    if (!fs.existsSync(OUT_DIR)) return
    for (const name of fs.readdirSync(OUT_DIR)) {
        if (name.startsWith('.assets_stale_')) {
            rmDir(path.join(OUT_DIR, name))
        }
    }
    const addonsStaging = path.join(OUT_DIR, '.addons_staging')
    if (fs.existsSync(addonsStaging)) rmDir(addonsStaging)
}

function mergeCoreOutput() {
    fs.mkdirSync(OUT_DIR, { recursive: true })
    for (const name of fs.readdirSync(CORE_DIR)) {
        if (name === 'assets') continue
        const src = path.join(CORE_DIR, name)
        const dest = path.join(OUT_DIR, name)
        if (fs.statSync(src).isDirectory()) copyTree(src, dest)
        else fs.copyFileSync(src, dest)
        console.log(`[assemble-wap] core ${name}`)
    }
    const coreAssets = path.join(CORE_DIR, 'assets')
    const outAssets = path.join(OUT_DIR, 'assets')
    if (!fs.existsSync(coreAssets)) return
    fs.mkdirSync(outAssets, { recursive: true })
    for (const name of fs.readdirSync(coreAssets)) {
        if (name === 'addons') continue
        const src = path.join(coreAssets, name)
        const dest = path.join(outAssets, name)
        if (fs.statSync(src).isDirectory()) copyDir(src, dest)
        else fs.copyFileSync(src, dest)
    }
}

function copyLocale(key, destAddonDir) {
    const localeSrc = path.join(ROOT, 'src', 'addon', key, 'locale')
    if (!fs.existsSync(localeSrc)) return
    copyDir(localeSrc, path.join(destAddonDir, 'locale'))
}

function copyAppLocale() {
    const localeSrc = path.join(ROOT, 'src', 'app', 'locale')
    if (!fs.existsSync(localeSrc)) return
    copyDir(localeSrc, path.join(OUT_DIR, 'assets', 'locale', 'app'))
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
    fs.writeFileSync(path.join(destAddonDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf-8')
}

function fixIndexHtml() {
    const fn = path.join(OUT_DIR, 'index.html')
    if (!fs.existsSync(fn)) return
    let text = fs.readFileSync(fn, 'utf-8')
    text = text.replaceAll('./assets/', '/wap/assets/')
    fs.writeFileSync(fn, text, 'utf-8')
}

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

function runAssemble() {
    const report = fs.existsSync(REPORT_PATH)
        ? JSON.parse(fs.readFileSync(REPORT_PATH, 'utf-8'))
        : { success: listAddonKeys(), failed: [] }

    if (!fs.existsSync(CORE_DIR)) {
        console.error('[assemble-wap] missing dist/.core/h5 — run build:h5:core first')
        process.exit(1)
    }

    const successKeys = report.success || []
    const installedKeys = []
    let indexJson = null
    let staleAssets = null

    // build:h5:core 场景（SKIP_ADDONS=1）：不承担插件打包，dist/build/h5/assets/addons 留空，
    // 不把已编译的插件内容整理进该目录、也不生成 index.json（插件在 SaaS 侧独立构建/部署）。
    // 仅 build:h5（build-all）/ build:h5:assemble 会整理插件并生成 index.json。
    const skipAddons = process.env.SKIP_ADDONS === '1'

    // 全量清空历史产物，避免历次编译残留文件（如已下线的页面/资源）在 dist/build/h5 累积
    rmDir(OUT_DIR)
    mergeCoreOutput()
    patchCoreLocaleExternal(OUT_DIR)
    copyAppLocale()

    if (!skipAddons) for (const key of successKeys) {
        const src = path.join(ADDONS_STAGING, key)
        if (!fs.existsSync(src)) continue
        const dest = path.join(OUT_DIR, 'assets', 'addons', key)
        rmDir(dest)
        copyTree(src, dest)
        patchAddonLocaleLeak(dest)
        copyLocale(key, dest)
        writeAddonManifest(key, dest)
        patchAddonDir(dest)
        patchAddonDiyLeak(dest)
        stripAddonStyleImport(dest)
        injectChunkScopedCss(dest)
        const windi = spawnSync('node', [
            path.join(__dirname, 'generate-addon-windi-css.cjs'),
            dest,
            key
        ], {
            cwd: ROOT,
            stdio: 'inherit',
            shell: process.platform === 'win32'
        })
        if (windi.status !== 0) process.exit(windi.status ?? 1)
        injectChunkWindiCss(dest)
        const entryRel = resolveAddonEntry(dest)
        if (!fs.existsSync(path.join(dest, entryRel.replace(/^\.\//, '')))) {
            console.error(`[assemble-wap] missing ${key}/${entryRel}`)
            process.exit(1)
        }
        installedKeys.push(key)
        console.log(`[assemble-wap] addon "${key}" -> assets/addons/${key}/`)
    }

    // 合并各插件 manifest.json 到 index.json.manifests，减少前端 N 次 HTTP 请求
    // （与后端 rebuildPublicWapAddonIndexJson 行为一致）；仅 build/build:h5:assemble 产出
    if (!skipAddons) {
        const manifests = {}
        for (const key of installedKeys) {
            const manifestFile = path.join(OUT_DIR, 'assets', 'addons', key, 'manifest.json')
            if (fs.existsSync(manifestFile)) {
                try {
                    const data = JSON.parse(fs.readFileSync(manifestFile, 'utf-8'))
                    if (data && Object.keys(data).length) manifests[key] = data
                } catch { /* 忽略损坏的 manifest，保持构建不中断 */ }
            }
        }

        indexJson = { keys: installedKeys, sharedVersion: 'wap-core-1.0.0', manifests }
        fs.mkdirSync(path.join(OUT_DIR, 'assets', 'addons'), { recursive: true })
        fs.writeFileSync(
            path.join(OUT_DIR, 'assets', 'addons', 'index.json'),
            JSON.stringify(indexJson, null, 2) + '\n',
            'utf-8'
        )
    }

    const addonsRoot = path.join(OUT_DIR, 'assets', 'addons')
    if (!skipAddons && fs.existsSync(addonsRoot)) {
        for (const name of fs.readdirSync(addonsRoot)) {
            if (name === 'index.json') continue
            if (!installedKeys.includes(name)) {
                rmDir(path.join(addonsRoot, name))
                console.log(`[assemble-wap] removed stale addon "${name}"`)
            }
        }
    }

    if (fs.existsSync(SHARED_DIR)) {
        const sharedDest = path.join(OUT_DIR, 'assets', 'shared')
        fs.mkdirSync(sharedDest, { recursive: true })
        for (const name of SHARED_BUILD_ORDER.map((k) => `${k}.js`)) {
            const src = path.join(SHARED_DIR, name)
            if (!fs.existsSync(src)) continue
            fs.copyFileSync(src, path.join(sharedDest, name))
        }
        console.log('[assemble-wap] shared -> assets/shared/')
        const vueOut = path.join(sharedDest, 'vue.js')
        if (patchVueJsFile(vueOut)) {
            console.log('[assemble-wap] patched uni feature defines in assets/shared/vue.js')
        }
        const wapLocaleOut = path.join(sharedDest, 'wap-locale.js')
        const mergeResult = mergeIntoWapLocale(wapLocaleOut, installedKeys)
        if (mergeResult.ok) {
            console.log(`[assemble-wap] merged addon locales into wap-locale.js (${mergeResult.keys} keys)`)
        }
    } else {
        console.warn('[assemble-wap] missing dist/.shared — run build:h5:shared first')
    }

    fixDir(path.join(OUT_DIR, 'assets'))
    fixIndexHtml()
    injectImportMap()
    applyRouterBase(path.join(OUT_DIR, 'assets'))

    if (!skipAddons) {
        fs.writeFileSync(
            path.join(OUT_DIR, 'assets', 'addons', 'index.json'),
            JSON.stringify(indexJson, null, 2) + '\n',
            'utf-8'
        )
        for (const key of installedKeys) {
            writeAddonManifest(key, path.join(OUT_DIR, 'assets', 'addons', key))
        }
    }

    cleanupAssembleArtifacts(staleAssets)

    console.log(`[assemble-wap] done: core + ${installedKeys.length} addons`)
    if (report.failed?.length) {
        console.warn('[assemble-wap] skipped failed addons:', report.failed.map((f) => f.key).join(', '))
    }
}

try {
    runAssemble()
} catch (err) {
    console.error('[assemble-wap] ERROR:', err)
    process.exit(1)
}
