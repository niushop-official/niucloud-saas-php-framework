/**
 * 微信小程序全量分离构建：框架包 + 所有插件包 + 合并
 * 用法：node scripts/build-mp-weixin-all.cjs [addon-key...]
 *    不带参数 = 编译 src/addon/ 下所有插件
 *    带参数 = 只编译指定的插件
 */
const { spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { ROOT, MP_CORE_DIR } = require('./mp-utils.cjs')

const ADDON_DIR = path.join(ROOT, 'src', 'addon')

function listAddonKeys() {
    if (!fs.existsSync(ADDON_DIR)) return []
    return fs.readdirSync(ADDON_DIR).filter((name) => {
        const dir = path.join(ADDON_DIR, name)
        if (!fs.statSync(dir).isDirectory()) return false
        // 排除：components（共享组件目录）、无 locale 的非插件目录
        if (name === 'components') return false
        return fs.existsSync(path.join(dir, 'locale'))
    })
}

function run(cmd, args, opts = {}) {
    const r = spawnSync(cmd, args, {
        cwd: ROOT,
        stdio: 'inherit',
        shell: process.platform === 'win32',
        ...opts
    })
    if (r.status !== 0) process.exit(r.status ?? 1)
}

function main() {
    const argvKeys = process.argv.slice(2)
    const allKeys = listAddonKeys()
    const keys = argvKeys.length ? argvKeys.filter((k) => allKeys.includes(k)) : allKeys

    if (!keys.length) {
        console.error('[build-mp-all] no addon keys found')
        process.exit(1)
    }

    console.log(`[build-mp-all] addons: ${keys.join(', ')} (${keys.length} total)`)
    console.log('')

    // 1. 框架包
    console.log('=== [1/3] 框架包 ===')
    run('node', [path.join(__dirname, 'build-mp-framework.cjs')])

    // 2. 插件包（逐个编译）
    console.log('')
    console.log(`=== [2/3] 插件包 (${keys.length}) ===`)
    for (const key of keys) {
        console.log(`--- [${key}] ---`)
        run('node', [path.join(__dirname, 'build-mp-addon.cjs'), key])
    }

    // 3. 合并
    console.log('')
    console.log('=== [3/3] 合并 ===')
    run('node', ['merge-mp-addon.cjs'], {
        cwd: MP_CORE_DIR
    })

    console.log('')
    console.log(`[build-mp-all] OK (${keys.length} addons)`)
}

main()
