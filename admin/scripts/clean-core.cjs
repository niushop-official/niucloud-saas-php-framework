/**
 * 删除 dist/.core（core 构建 staging）
 *
 * build:core 在 vite build 前执行，避免 Windows 上旧 chunk 残留导致 hash 不一致。
 * 使用 rename → 再删 的策略，降低文件被占用时 rmSync 失败的概率。
 */
const fs = require('fs')
const path = require('path')

const core = path.join(__dirname, '..', 'dist', '.core')

function rmDir(dir) {
    if (!fs.existsSync(dir)) return
    const trash = `${dir}.__trash_${Date.now()}`
    try {
        fs.renameSync(dir, trash)
    } catch {
        fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
        return
    }
    fs.rmSync(trash, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
}

rmDir(core)
console.log('[clean-core] removed dist/.core')
