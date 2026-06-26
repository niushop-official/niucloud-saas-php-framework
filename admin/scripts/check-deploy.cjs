/**
 * 部署目录健康检查
 *
 * 校验 public/admin 是否具备 split 架构所需文件：
 * - index.html 入口、shared、admin-lang.js
 * - addons/index.json、shop 等插件
 * - 无错误 admin-lang 相对路径、无重复 createI18n
 *
 * 用法：node scripts/check-deploy.cjs [deploy-dir]
 */
const fs = require('fs')
const path = require('path')

const DEPLOY = process.argv[2] || 'D:/AppData/phpstudy_pro/WWW/test/niucloud/public/admin'
const issues = []
const ok = []

function check(name, pass, detail) {
    if (pass) ok.push(`[OK] ${name}${detail ? ': ' + detail : ''}`)
    else issues.push(`[FAIL] ${name}${detail ? ': ' + detail : ''}`)
}

if (!fs.existsSync(DEPLOY)) {
    console.error('deploy dir not found:', DEPLOY)
    process.exit(1)
}

const html = fs.readFileSync(path.join(DEPLOY, 'index.html'), 'utf-8')
const entryMatch = html.match(/\/admin\/assets\/(index-[a-f0-9]+\.js)/)
const entry = entryMatch ? entryMatch[1] : null
check('index.html entry', !!entry, entry || 'no index-*.js in script src')

if (entry) {
    const entryPath = path.join(DEPLOY, 'assets', entry)
    check('entry file exists', fs.existsSync(entryPath))
    if (fs.existsSync(entryPath)) {
        const code = fs.readFileSync(entryPath, 'utf-8')
        check('core not stale', !code.includes('loadAddonCommonLocales'), 'must not contain loadAddonCommonLocales')
        check('core has addon loader', code.includes('assets/addons') || code.includes('/admin/assets/addons'))
        const oldPreload = /async function \w+\(\w+,t=\["zh-cn","en"\]\)/.test(code)
        check('core preload not old-only-common', !oldPreload)
    }
}

// CSS hash 随构建变化；若 core 重建后此处失败，需同步更新此文件名
const css = 'index-c72b4d30.css'
check('entry css', fs.existsSync(path.join(DEPLOY, 'assets', css)), css)

for (const f of ['vue.js', 'element-plus.js', 'vue-i18n.js', 'admin-lang.js']) {
    check('shared/' + f, fs.existsSync(path.join(DEPLOY, 'assets', 'shared', f)))
}

// 抽样检查 shop 列表页是否走共享 admin-lang
const shopList = fs.existsSync(path.join(DEPLOY, 'assets', 'addons', 'shop'))
    ? fs.readdirSync(path.join(DEPLOY, 'assets', 'addons', 'shop')).find((n) => n.startsWith('list-') && n.endsWith('.js'))
    : null
if (shopList) {
    const code = fs.readFileSync(path.join(DEPLOY, 'assets', 'addons', 'shop', shopList), 'utf-8')
    check('shop list uses shared t()', code.includes('/admin/assets/shared/admin-lang.js'))
    check('shop list not duplicate i18n', !code.includes('createI18n'))
}

const addonsIndex = path.join(DEPLOY, 'assets', 'addons', 'index.json')
check('addons/index.json', fs.existsSync(addonsIndex))
if (fs.existsSync(addonsIndex)) {
    const data = JSON.parse(fs.readFileSync(addonsIndex, 'utf-8'))
    check('addons keys', Array.isArray(data.keys) && data.keys.length > 0, data.keys?.join(', '))
}

const shopIndex = path.join(DEPLOY, 'assets', 'addons', 'shop', 'index.js')
check('shop/index.js', fs.existsSync(shopIndex))
if (fs.existsSync(shopIndex)) {
    const shop = fs.readFileSync(shopIndex, 'utf-8')
    check('shop exports langs', shop.includes('langs'))
}

const { hasBadImport } = require('./admin-lang-import-utils.cjs')
let badLangImports = 0
const assetsDir = path.join(DEPLOY, 'assets')
if (fs.existsSync(assetsDir)) {
    for (const name of fs.readdirSync(assetsDir)) {
        if (!name.endsWith('.js')) continue
        if (hasBadImport(fs.readFileSync(path.join(assetsDir, name), 'utf-8'))) badLangImports++
    }
}
check('no bad admin-lang import paths', badLangImports === 0, badLangImports ? `${badLangImports} core chunk(s)` : '')

const staleEntry = path.join(DEPLOY, 'assets', 'index-d2fee835.js')
if (fs.existsSync(staleEntry)) {
    issues.push('[WARN] old bundle still present: index-d2fee835.js (harmless if index.html points to new entry)')
}

console.log('\n=== Deploy check:', DEPLOY, '===\n')
ok.forEach((l) => console.log(l))
issues.forEach((l) => console.log(l))
console.log('\nSummary:', ok.length, 'ok,', issues.length, 'issue(s)')
process.exit(issues.some((l) => l.startsWith('[FAIL]')) ? 1 : 0)
