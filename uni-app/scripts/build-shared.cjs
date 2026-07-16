/**
 * 构建浏览器 ESM 共享依赖 → dist/.shared/
 */
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const { ROOT } = require('./addon-utils.cjs')
const { SHARED_BUILD_ORDER } = require('./shared-external.cjs')
const { patchVueJsFile, toViteDefine, getUniFeatureDefines } = require('./uni-feature-defines.cjs')

const SHARED_SRC = path.join(ROOT, '.build', 'shared')
const OUT_DIR = path.join(ROOT, 'dist', '.shared')

const ENTRY_CONTENT = {
    // uni-app 依赖 injectHook / isInSSRComponentSetup 等内部 API，须用 dcloudio 补丁版 Vue
    vue: "import * as Vue from '@dcloudio/uni-h5-vue/dist/vue.runtime.esm.js'\nexport * from '@dcloudio/uni-h5-vue/dist/vue.runtime.esm.js'\nexport default Vue\n",
    pinia: "export * from 'pinia'\n",
    'vue-i18n': "export * from 'vue-i18n/dist/vue-i18n.esm-bundler.js'\n",
    'wap-locale': "export { language, t, i18n, default } from '../../src/locale/wap-shared-export.ts'\n",
    'diy-core': [
        "export { default, default as useDiyStore } from '../../src/app/stores/diy.ts'",
        "export * from '../../src/utils/diy-decorate-bridge.ts'",
        "export { useDiy } from '../../src/hooks/useDiy.ts'",
        "export { useDiyGroup } from '../../src/hooks/useDiyGroup.ts'",
        "export { getShareInfo, getDiyInfo, getTabbarList, getMemberFormRecord } from '../../src/app/api/diy.ts'",
        ''
    ].join('\n')
}

function writeEntries() {
    fs.mkdirSync(SHARED_SRC, { recursive: true })
    for (const [key, content] of Object.entries(ENTRY_CONTENT)) {
        fs.writeFileSync(path.join(SHARED_SRC, `${key}.ts`), content, 'utf-8')
    }
}

function runBuild(pkgKey, emptyOutDir) {
    const r = spawnSync('npx', ['vite', 'build', '--config', 'vite.config.shared.ts'], {
        cwd: ROOT,
        env: {
            ...process.env,
            SHARED_PKG: pkgKey,
            SHARED_EMPTY: emptyOutDir ? '1' : '0',
            UNI_PLATFORM: pkgKey === 'wap-locale' || pkgKey === 'diy-core' ? 'h5' : process.env.UNI_PLATFORM,
            NODE_OPTIONS: '--max-old-space-size=4096'
        },
        stdio: 'inherit',
        shell: process.platform === 'win32'
    })
    if ((r.status ?? 1) !== 0) {
        console.error(`[build-shared] failed: ${pkgKey}`)
        process.exit(r.status ?? 1)
    }
    if (pkgKey === 'vue') {
        const vueOut = path.join(OUT_DIR, 'vue.js')
        if (patchVueJsFile(vueOut)) {
            console.log('[build-shared] patched uni feature defines in vue.js')
        }
    }
    if (pkgKey === 'diy-core') {
        for (const name of fs.readdirSync(OUT_DIR)) {
            if (name.endsWith('.mjs')) {
                fs.unlinkSync(path.join(OUT_DIR, name))
            }
        }
    }
    console.log(`[build-shared] ok: ${pkgKey}.js`)
}

function main() {
    require('./preflight-build.cjs').main()
    writeEntries()
    fs.mkdirSync(OUT_DIR, { recursive: true })

    const pagesMin = path.join(ROOT, '.build', 'pages.min.json')
    fs.mkdirSync(path.dirname(pagesMin), { recursive: true })
    fs.writeFileSync(pagesMin, JSON.stringify({ pages: [], subPackages: [], tabBar: { list: [] }, easycom: { custom: {} } }, null, 2))

    SHARED_BUILD_ORDER.forEach((pkgKey, i) => runBuild(pkgKey, i === 0))
    console.log(`[build-shared] done -> ${path.relative(ROOT, OUT_DIR)}/`)
}

main()
