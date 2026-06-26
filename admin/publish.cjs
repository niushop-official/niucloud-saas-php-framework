const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname)
const src = path.join(ROOT, 'dist')
const dest = path.resolve(ROOT, process.env.PUBLISH_DEST || '../niucloud/public/admin')

function fixIndexHtml() {
    const fn = path.join(src, 'index.html')
    if (!fs.existsSync(fn)) {
        const core = path.join(src, '.core', 'index.html')
        if (fs.existsSync(core)) {
            fs.copyFileSync(core, fn)
        } else {
            throw new Error('missing dist/index.html — run assemble or build:core first')
        }
    }
    let text = fs.readFileSync(fn, 'utf-8')
    text = text.replaceAll('./assets/', '/admin/assets/')
    text = text.replace('./niucloud.ico', '/admin/niucloud.ico')
    fs.writeFileSync(fn, text, 'utf-8')
}

function publish() {
    fixIndexHtml()

    if (!fs.existsSync(dest)) {
        console.error(`[publish] target not found: ${dest}`)
        console.error('[publish] set PUBLISH_DEST to your web admin directory')
        process.exit(1)
    }

    fs.rmSync(dest, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
    fs.cpSync(src, dest, {
        recursive: true,
        force: true,
        filter: (srcPath) => {
            const relative = path.relative(src, srcPath)
            const parts = relative.split(path.sep)
            return !parts.includes('.core') && !parts.includes('.shared')
        }
    })

    const shopEntry = path.join(dest, 'assets', 'addons', 'shop', 'index.js')
    console.log(`[publish] ${src} -> ${dest}`)
    console.log(`[publish] shop addon: ${fs.existsSync(shopEntry) ? 'OK' : 'MISSING — run node scripts/sync-addon.cjs shop'}`)
}

publish()
