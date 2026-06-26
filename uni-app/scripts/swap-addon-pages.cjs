/**
 * Core 构建前将插件真实页面替换为桥接页，构建后还原。
 * uni-app 按 pages.json 的 subPackage root + path 扫描磁盘上的 .vue 文件。
 *
 * 备份目录放在系统 temp（不在项目内），避免 Vite 扫描 .build 时 EPERM。
 */
const fs = require('fs')
const path = require('path')
const os = require('os')
const crypto = require('crypto')
const { ROOT, parsePagesJson, BRIDGE_ADDON_ROOT } = require('./addon-utils.cjs')

const LEGACY_BACKUP_ROOT = path.join(ROOT, '.build', 'addon-pages-backup')
const SWAP_STATE_FILE = path.join(ROOT, '.build', 'addon-pages-swap.json')
const BRIDGE_ROOT = BRIDGE_ADDON_ROOT

function getBackupRoot() {
    const hash = crypto.createHash('md5').update(ROOT).digest('hex').slice(0, 12)
    return path.join(os.tmpdir(), 'uni-app-addon-pages-backup', hash)
}

function rmDir(dir) {
    if (!fs.existsSync(dir)) return
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
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

function moveDir(src, dest) {
    rmDir(dest)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    try {
        fs.renameSync(src, dest)
    } catch (e) {
        if (e.code !== 'EPERM' && e.code !== 'EXDEV') throw e
        copyDir(src, dest)
        rmDir(src)
    }
}

function readSwapState() {
    if (!fs.existsSync(SWAP_STATE_FILE)) return null
    try {
        return JSON.parse(fs.readFileSync(SWAP_STATE_FILE, 'utf-8'))
    } catch {
        return null
    }
}

function writeSwapState(state) {
    fs.mkdirSync(path.dirname(SWAP_STATE_FILE), { recursive: true })
    fs.writeFileSync(SWAP_STATE_FILE, JSON.stringify(state, null, 2) + '\n', 'utf-8')
}

function clearSwapState() {
    if (fs.existsSync(SWAP_STATE_FILE)) fs.unlinkSync(SWAP_STATE_FILE)
}

function listAddonSubPackageRoots() {
    const pagesJson = parsePagesJson()
    const roots = new Set()
    for (const sub of pagesJson.subPackages || []) {
        if (sub.root?.startsWith('addon/')) roots.add(sub.root)
    }
    return [...roots].sort()
}

function toBackupPagesDir(backupRoot, root) {
    return path.join(backupRoot, root.replace(/^addon\//, ''), 'pages')
}

function toBridgePagesDir(root) {
    return path.join(BRIDGE_ROOT, root.replace(/^addon\//, ''), 'pages')
}

function toSrcPagesDir(root) {
    return path.join(ROOT, 'src', root, 'pages')
}

function applySwap() {
    const backupRoot = getBackupRoot()
    rmDir(backupRoot)

    let count = 0
    for (const root of listAddonSubPackageRoots()) {
        const pagesDir = toSrcPagesDir(root)
        const bridgePages = toBridgePagesDir(root)
        if (!fs.existsSync(pagesDir) || !fs.existsSync(bridgePages)) continue

        const backupDir = toBackupPagesDir(backupRoot, root)
        moveDir(pagesDir, backupDir)
        copyDir(bridgePages, pagesDir)
        count++
    }

    writeSwapState({ backupRoot, appliedAt: new Date().toISOString(), roots: listAddonSubPackageRoots() })
    console.log(`[swap-addon-pages] applied ${count} addon subPackage page dirs -> bridge (${backupRoot})`)
}

function restoreSwap() {
    const state = readSwapState()
    const backupRoot = state?.backupRoot || getBackupRoot()
    if (!fs.existsSync(backupRoot)) {
        clearSwapState()
        return 0
    }

    let count = 0
    const roots = state?.roots?.length ? state.roots : listAddonSubPackageRoots()
    for (const root of roots) {
        const backupDir = toBackupPagesDir(backupRoot, root)
        const pagesDir = toSrcPagesDir(root)
        if (!fs.existsSync(backupDir)) continue
        rmDir(pagesDir)
        fs.mkdirSync(path.dirname(pagesDir), { recursive: true })
        moveDir(backupDir, pagesDir)
        count++
    }

    rmDir(backupRoot)
    clearSwapState()
    if (count) {
        console.log(`[swap-addon-pages] restored ${count} addon subPackage page dirs`)
    }
    return count
}

const cmd = process.argv[2] || 'apply'
if (require.main === module) {
    if (cmd === 'apply') applySwap()
    else if (cmd === 'restore') restoreSwap()
    else if (cmd === 'status') {
        const state = readSwapState()
        console.log('[swap-addon-pages] state:', state || 'idle')
        console.log('[swap-addon-pages] legacy backup exists:', fs.existsSync(LEGACY_BACKUP_ROOT))
    } else {
        console.error('Usage: node swap-addon-pages.cjs apply|restore|status')
        process.exit(1)
    }
}

module.exports = {
    applySwap,
    restoreSwap,
    listAddonSubPackageRoots,
    getBackupRoot,
    LEGACY_BACKUP_ROOT
}
