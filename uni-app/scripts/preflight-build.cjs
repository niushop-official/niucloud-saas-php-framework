/**
 * 分构建前置：修补 Vite 扫描、清理/迁移 swap 备份、恢复误留桥接页
 */
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const os = require('os')
const { ROOT } = require('./addon-utils.cjs')
const { patchFile: patchViteScan } = require('./patch-vite-tsconfig-scan.cjs')
const { restoreSwap, getBackupRoot, LEGACY_BACKUP_ROOT } = require('./swap-addon-pages.cjs')

const REFERENCE_ROOT = path.join(ROOT, '..', 'niucloud-admin-saas', 'uni-app')
const BRIDGE_MARK = 'addon-page-bridge'

function patchViteChunks() {
    const chunksDir = path.join(ROOT, 'node_modules', 'vite', 'dist', 'node', 'chunks')
    if (!fs.existsSync(chunksDir)) return
    for (const name of fs.readdirSync(chunksDir)) {
        if (!name.startsWith('dep-') || !name.endsWith('.js')) continue
        patchViteScan(path.join(chunksDir, name))
    }
    console.log('[preflight-build] vite tsconfig scan patched')
}

function isBridgePage(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf-8').includes(BRIDGE_MARK)
    } catch {
        return false
    }
}

function restoreBridgePagesFromReference() {
    const addonRoot = path.join(ROOT, 'src', 'addon')
    if (!fs.existsSync(addonRoot)) return

    let restored = 0
    for (const addonKey of fs.readdirSync(addonRoot)) {
        const pagesDir = path.join(addonRoot, addonKey, 'pages')
        if (!fs.existsSync(pagesDir)) continue

        const refPagesDir = path.join(REFERENCE_ROOT, 'src', 'addon', addonKey, 'pages')
        if (!fs.existsSync(refPagesDir)) continue

        const walk = (dir, rel = '') => {
            for (const name of fs.readdirSync(dir)) {
                const abs = path.join(dir, name)
                const relPath = rel ? `${rel}/${name}` : name
                if (fs.statSync(abs).isDirectory()) {
                    walk(abs, relPath)
                    continue
                }
                if (!name.endsWith('.vue')) continue
                if (!isBridgePage(abs)) continue

                const refFile = path.join(refPagesDir, relPath)
                if (!fs.existsSync(refFile)) {
                    console.warn(`[preflight-build] missing reference page: ${addonKey}/pages/${relPath}`)
                    continue
                }
                fs.mkdirSync(path.dirname(abs), { recursive: true })
                fs.copyFileSync(refFile, abs)
                restored++
                console.log(`[preflight-build] restored ${addonKey}/pages/${relPath}`)
            }
        }
        walk(pagesDir)
    }

    if (restored) {
        console.log(`[preflight-build] restored ${restored} bridge page(s) from reference project`)
    }
}

function cleanupLegacyBackup() {
    if (!fs.existsSync(LEGACY_BACKUP_ROOT)) return
    try {
        fs.rmSync(LEGACY_BACKUP_ROOT, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 })
        console.log('[preflight-build] removed legacy .build/addon-pages-backup')
        return
    } catch (e) {
        // robocopy /MIR 空目录：Windows 上有时能清掉被锁目录的内容
        const emptyDir = path.join(os.tmpdir(), 'uni-app-empty-dir')
        fs.mkdirSync(emptyDir, { recursive: true })
        spawnSync('robocopy', [emptyDir, LEGACY_BACKUP_ROOT, '/MIR', '/NFL', '/NDL', '/NJH', '/NJS', '/NC', '/NS', '/NP'], {
            shell: true,
            stdio: 'ignore'
        })
        try {
            fs.rmSync(LEGACY_BACKUP_ROOT, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 })
            console.log('[preflight-build] removed legacy backup via robocopy mirror')
            return
        } catch (e2) {
            console.warn(
                `[preflight-build] legacy backup still locked (${e2.code || e2.message}); build excludes .build from scans`
            )
        }
    }
}

function main() {
    patchViteChunks()
    cleanupLegacyBackup()
    restoreSwap()
    restoreBridgePagesFromReference()
}

module.exports = { main, restoreBridgePagesFromReference, cleanupLegacyBackup, patchViteChunks }

if (require.main === module) {
    main()
}
