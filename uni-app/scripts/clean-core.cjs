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
