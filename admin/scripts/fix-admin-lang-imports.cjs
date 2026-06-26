/**
 * CLI：修复构建产物中的 admin-lang import 路径
 *
 * 默认扫描 dist/.core/assets 与 dist/assets；
 * 部署后可对 public/admin/assets 单独执行。
 *
 * 用法：
 *   node scripts/fix-admin-lang-imports.cjs
 *   node scripts/fix-admin-lang-imports.cjs "D:/path/to/public/admin/assets"
 */
const path = require('path')
const { fixDir, ADMIN_LANG_URL } = require('./admin-lang-import-utils.cjs')

const targets = process.argv.slice(2)
const dirs = targets.length
    ? targets.map((d) => path.resolve(d))
    : [
          path.join(__dirname, '..', 'dist', '.core', 'assets'),
          path.join(__dirname, '..', 'dist', 'assets')
      ]

let total = 0
for (const dir of dirs) {
    try {
        const n = fixDir(dir)
        if (n) console.log(`[fix-admin-lang-imports] ${path.relative(process.cwd(), dir)}: ${n} file(s)`)
        total += n
    } catch (err) {
        console.error(err.message)
        console.error('Usage: node scripts/fix-admin-lang-imports.cjs <assets-directory>')
        process.exit(1)
    }
}

if (total === 0) {
    console.log('[fix-admin-lang-imports] no bad imports found')
} else {
    console.log(`[fix-admin-lang-imports] fixed ${total} file(s) -> ${ADMIN_LANG_URL}`)
}
