/**
 * 手动 drop-in 插件后登记到 assets/addons/index.json（可选）
 *
 * 场景：从另一个 admin 项目拷贝 assets/addons/{key}/ 到目标站点。
 * 运行时也会在登录后根据后端已安装插件 + 菜单自动探测 index.js，不强制依赖本脚本。
 *
 * 用法：
 *   node scripts/register-addon.cjs <addon-key> [deploy-dir]
 * 示例：
 *   node scripts/register-addon.cjs sd_minsu
 *   node scripts/register-addon.cjs sd_minsu "D:/path/to/public/admin"
 */
const fs = require('fs')
const path = require('path')
const { ROOT, resolveAddonEntry } = require('./addon-utils.cjs')

const key = process.argv[2]
const deployDir = process.argv[3] ? path.resolve(process.argv[3]) : path.join(ROOT, 'dist')

if (!key) {
    console.error('Usage: node scripts/register-addon.cjs <addon-key> [deploy-dir]')
    process.exit(1)
}

const addonDir = path.join(deployDir, 'assets', 'addons', key)
const indexPath = path.join(deployDir, 'assets', 'addons', 'index.json')
const entryRel = resolveAddonEntry(addonDir)
const entryPath = path.join(addonDir, entryRel.replace(/^\.\//, ''))
const manifestPath = path.join(addonDir, 'manifest.json')

if (!fs.existsSync(entryPath)) {
    console.error(`[register-addon] missing ${entryPath}`)
    console.error('[register-addon] copy the full addon folder (index.js + chunks + lang/) first')
    process.exit(1)
}

if (!fs.existsSync(manifestPath)) {
    const manifest = {
        key,
        version: '1.0.0',
        sharedVersion: 'admin-core-1.0.0',
        entry: entryRel,
        langBase: './lang/'
    }
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8')
    console.log(`[register-addon] wrote manifest.json`)
}

let data = { keys: [], sharedVersion: 'admin-core-1.0.0' }
if (fs.existsSync(indexPath)) {
    try {
        data = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
    } catch {
        console.warn('[register-addon] index.json parse failed, recreating')
    }
}

const keys = new Set(Array.isArray(data.keys) ? data.keys : [])
const before = keys.size
keys.add(key)
data.keys = [...keys].sort()

fs.mkdirSync(path.dirname(indexPath), { recursive: true })
fs.writeFileSync(indexPath, JSON.stringify(data, null, 2) + '\n', 'utf-8')

console.log(`[register-addon] ${key} registered in assets/addons/index.json (${before} -> ${data.keys.length} keys)`)
console.log(`[register-addon] keys: ${data.keys.join(', ')}`)
console.log('[register-addon] reminder: backend must also install this addon (menu API returns addon=sd_minsu)')
