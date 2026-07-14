/**
 * 构建浏览器 ESM 共享依赖 → dist/.shared/
 *
 * 产物经 assemble 复制到 dist/assets/shared/，由 Import Map 加载。
 * admin-lang 将 src/lang 打成独立包，供 core 与 addon 共用 t()。
 *
 * 用法：npm run build:shared
 */
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const { ROOT } = require('./addon-utils.cjs')
const { SHARED_BUILD_ORDER } = require('./shared-external.cjs')
const { scanDirExports, resolveConflicts, buildReExportStatements } = require('./scan-exports.cjs')

/** 临时入口目录，每次构建前重写 */
const SHARED_SRC = path.join(ROOT, '.build', 'shared')
/** Vite shared 构建 staging 输出 */
const OUT_DIR = path.join(ROOT, 'dist', '.shared')

/** 各 shared 包的极简 re-export 入口（由 vite.config.shared.ts 打包） */
const ENTRY_CONTENT = {
    vue: "import * as Vue from 'vue'\nexport * from 'vue'\nexport default Vue\n",
    'vue-router': "export * from 'vue-router'\n",
    pinia: "export * from 'pinia'\n",
    'element-plus': "import * as ElementPlus from 'element-plus'\nexport * from 'element-plus'\nexport default ElementPlus\n",
    'icons-vue': "export * from '@element-plus/icons-vue'\n",
    axios: "export { default } from 'axios'\nexport * from 'axios'\n",
    'vue-i18n': "export * from 'vue-i18n/dist/vue-i18n.esm-bundler.js'\n",
    'admin-lang': "export { language, t, default } from '../../src/lang/index.ts'\n",
    'core-shared': ''  // 动态生成，从 API 目录扫描
}

function writeEntries() {
    fs.mkdirSync(SHARED_SRC, { recursive: true })

    // 通用冲突映射：{ "module:name" -> "module_name" }
    const allConflicts = {}

    // 1a. 扫描 app/api 目录（排除 addon.ts / module.ts）
    const apiDir = path.join(ROOT, 'src', 'app', 'api')
    const apiFiles = scanDirExports(apiDir, { exclude: ['addon.ts', 'module.ts'] })
    const { resolved: apiResolved, conflicts: apiConflicts } = resolveConflicts(apiFiles)
    Object.assign(allConflicts, apiConflicts)
    const apiExports = buildReExportStatements(apiResolved, '../../src/app/api')

    // 1b. 扫描 utils 目录中被重导出的文件
    const utilsDir = path.join(ROOT, 'src', 'utils')
    const utilsExclude = ['common.ts', 'request.ts', 'storage.ts', 'config.ts', 'test.ts',
        'directives.ts', 'addon-loader.ts', 'addon-lang.ts', 'tianditu.ts', 'qqmap.ts']
    const utilsFiles = scanDirExports(utilsDir, { exclude: utilsExclude })
    const { resolved: utilsResolved, conflicts: utilsConflicts } = resolveConflicts(utilsFiles)
    Object.assign(allConflicts, utilsConflicts)
    const utilsExports = buildReExportStatements(utilsResolved, '../../src/utils')

    // 2. 生成 core-shared 入口
    ENTRY_CONTENT['core-shared'] = [
        "export * from '../../src/utils/common'",
        "import _request from '../../src/utils/request'",
        "import _storage from '../../src/utils/storage'",
        "import _config from '../../src/utils/config'",
        "import _test from '../../src/utils/test'",
        "export { _request as request }",
        "export { _storage as storage }",
        "export { _config as config }",
        "export { _test as test }",
        "export default _request",
        "export * from '../../src/utils/qqmap'",
        ...utilsExports,
        ...apiExports,
        "export { default as UploadImage } from '../../src/components/upload-image/index.vue'",
        "export { default as DiyPage } from '../../src/components/diy-page/index.vue'",
        "export { default as MapSelector } from '../../src/components/map-selector/index.vue'",
        "export { default as Editor } from '../../src/components/editor/index.vue'"
    ].join('\n')

    for (const [key, content] of Object.entries(ENTRY_CONTENT)) {
        fs.writeFileSync(path.join(SHARED_SRC, `${key}.ts`), content, 'utf-8')
    }

    // 3. 保存冲突映射
    if (Object.keys(allConflicts).length) {
        fs.writeFileSync(path.join(ROOT, '.build', 'export-conflicts.json'), JSON.stringify(allConflicts, null, 2), 'utf-8')
        console.log(`[build-shared] conflicts: ${Object.keys(allConflicts).length} entries`)
    }
    if (Object.keys(apiConflicts).length) {
        fs.writeFileSync(path.join(ROOT, '.build', 'api-conflicts.json'), JSON.stringify(apiConflicts, null, 2), 'utf-8')
    }
}

/** 构建单个 shared 包；仅第一个包 emptyOutDir 清空 .shared */
function runBuild(pkgKey, emptyOutDir) {
    const r = spawnSync('npx', ['vite', 'build', '--config', 'vite.config.shared.ts'], {
        cwd: ROOT,
        env: {
            ...process.env,
            SHARED_PKG: pkgKey,
            SHARED_EMPTY: emptyOutDir ? '1' : '0',
            NODE_OPTIONS: '--max-old-space-size=4096'
        },
        stdio: 'inherit',
        shell: process.platform === 'win32'
    })
    if ((r.status ?? 1) !== 0) {
        console.error(`[build-shared] failed: ${pkgKey}`)
        process.exit(r.status ?? 1)
    }
    console.log(`[build-shared] ok: ${pkgKey}.js`)
}

function main() {
    writeEntries()
    fs.mkdirSync(OUT_DIR, { recursive: true })

    SHARED_BUILD_ORDER.forEach((pkgKey, i) => {
        runBuild(pkgKey, i === 0)
    })

    console.log(`[build-shared] done -> ${path.relative(ROOT, OUT_DIR)}/`)

    // 若 dist/assets 已存在（曾 assemble 过），顺便同步一份 shared 便于单独调试
    const distAssets = path.join(ROOT, 'dist', 'assets', 'shared')
    if (fs.existsSync(path.join(ROOT, 'dist', 'assets'))) {
        fs.mkdirSync(distAssets, { recursive: true })
        for (const name of fs.readdirSync(OUT_DIR)) {
            if (!name.endsWith('.js')) continue
            fs.copyFileSync(path.join(OUT_DIR, name), path.join(distAssets, name))
        }
        console.log(`[build-shared] synced -> dist/assets/shared/`)
    }
}

main()
