/**
 * 构建前确保 esbuild 原生二进制可用。
 *
 * Windows 上 @esbuild/win32-x64/esbuild.exe 常被杀毒删除，或 npm postinstall
 * 在二进制缺失时调用 install.js 形成死循环。本脚本直接从 npm 拉取 tgz 解压，
 * 不依赖 esbuild/install.js。
 *
 * 若 npm install 因 esbuild postinstall 失败，请先：
 *   npm install --ignore-scripts
 *   node scripts/ensure-esbuild.cjs
 */
const fs = require('fs')
const path = require('path')
const https = require('https')
const zlib = require('zlib')
const { spawnSync, execFileSync } = require('child_process')

const ROOT = path.resolve(__dirname, '..')
const DEFAULT_ESBUILD_VERSION = '0.16.17'

function platformPackage() {
    const key = `${process.platform} ${process.arch} ${require('os').endianness()}`
    const map = {
        'win32 x64 LE': { pkg: '@esbuild/win32-x64', subpath: 'esbuild.exe' },
        'win32 ia32 LE': { pkg: '@esbuild/win32-ia32', subpath: 'esbuild.exe' },
        'win32 arm64 LE': { pkg: '@esbuild/win32-arm64', subpath: 'esbuild.exe' },
        'darwin x64 LE': { pkg: '@esbuild/darwin-x64', subpath: 'bin/esbuild' },
        'darwin arm64 LE': { pkg: '@esbuild/darwin-arm64', subpath: 'bin/esbuild' },
        'linux x64 LE': { pkg: '@esbuild/linux-x64', subpath: 'bin/esbuild' }
    }
    const hit = map[key]
    if (!hit) throw new Error(`Unsupported platform for esbuild: ${key}`)
    return hit
}

function resolveEsbuildVersion() {
    const candidates = [
        path.join(ROOT, 'node_modules', 'esbuild', 'package.json'),
        path.join(ROOT, 'node_modules', 'vite', 'node_modules', 'esbuild', 'package.json')
    ]
    for (const file of candidates) {
        try {
            return require(file).version
        } catch {
            // continue
        }
    }
    return DEFAULT_ESBUILD_VERSION
}

function platformBinaryPath() {
    const { pkg, subpath } = platformPackage()
    return path.join(ROOT, 'node_modules', ...pkg.split('/'), subpath)
}

function downloadedBinaryPath(version) {
    const { pkg, subpath } = platformPackage()
    const libDir = path.join(ROOT, 'node_modules', 'esbuild', 'lib')
    const base = path.basename(subpath)
    return path.join(libDir, `downloaded-${pkg.replace('/', '-')}-${base}`)
}

function binaryCandidates(version) {
    return [platformBinaryPath(), downloadedBinaryPath(version)]
}

function fetchBuffer(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location) {
                return fetchBuffer(res.headers.location).then(resolve, reject)
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP ${res.statusCode} for ${url}`))
            }
            const chunks = []
            res.on('data', (c) => chunks.push(c))
            res.on('end', () => resolve(Buffer.concat(chunks)))
        }).on('error', reject)
    })
}

function extractFileFromTarGzip(buffer, subpath) {
    try {
        buffer = zlib.unzipSync(buffer)
    } catch (err) {
        throw new Error(`Invalid gzip: ${err.message}`)
    }
    const str = (i, n) => String.fromCharCode(...buffer.subarray(i, i + n)).replace(/\0.*$/, '')
    let offset = 0
    const target = `package/${subpath}`
    while (offset < buffer.length) {
        const name = str(offset, 100)
        const size = parseInt(str(offset + 124, 12), 8)
        offset += 512
        if (!Number.isNaN(size)) {
            if (name === target) return buffer.subarray(offset, offset + size)
            offset += (size + 511) & ~511
        }
    }
    throw new Error(`Not found in archive: ${target}`)
}

async function downloadPlatformBinary(version) {
    const { pkg, subpath } = platformPackage()
    const shortName = pkg.replace('@esbuild/', '')
    const url = `https://registry.npmjs.org/${pkg}/-/${shortName}-${version}.tgz`
    console.log(`[ensure-esbuild] downloading ${pkg}@${version} ...`)
    const tgz = await fetchBuffer(url)
    const data = extractFileFromTarGzip(tgz, subpath)
    const dest = platformBinaryPath()
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, data)
    if (process.platform !== 'win32') fs.chmodSync(dest, 0o755)
    console.log(`[ensure-esbuild] wrote ${path.relative(ROOT, dest)} (${data.length} bytes)`)
    return dest
}

function copyToDownloadedCache(version, src) {
    const cache = downloadedBinaryPath(version)
    const libDir = path.dirname(cache)
    if (!fs.existsSync(path.join(ROOT, 'node_modules', 'esbuild'))) return
    fs.mkdirSync(libDir, { recursive: true })
    fs.copyFileSync(src, cache)
}

function verifyBinary(binPath, version) {
    const out = execFileSync(binPath, ['--version'], { stdio: 'pipe' }).toString().trim()
    if (out !== version) {
        throw new Error(`Expected esbuild ${version}, got ${out}`)
    }
}

function hasWorkingBinary(version) {
    for (const p of binaryCandidates(version)) {
        try {
            if (fs.existsSync(p) && fs.statSync(p).size > 1024) {
                verifyBinary(p, version)
                return p
            }
        } catch {
            // try next
        }
    }
    return null
}

async function repair(version) {
    const dest = await downloadPlatformBinary(version)
    copyToDownloadedCache(version, dest)
    verifyBinary(dest, version)
}

async function main() {
    const version = resolveEsbuildVersion()
    const existing = hasWorkingBinary(version)
    if (existing) {
        console.log(`[ensure-esbuild] ok (${path.relative(ROOT, existing)}, v${version})`)
        return
    }

    console.log(`[ensure-esbuild] binary missing or invalid, repairing (esbuild@${version})...`)
    try {
        await repair(version)
    } catch (err) {
        console.error('[ensure-esbuild] repair failed:', err.message || err)
        console.error('')
        console.error('Try:')
        console.error('  npm install --ignore-scripts')
        console.error('  node scripts/ensure-esbuild.cjs')
        process.exit(1)
    }

    const ok = hasWorkingBinary(version)
    if (!ok) {
        console.error('[ensure-esbuild] binary still not usable after repair.')
        process.exit(1)
    }
    console.log('[ensure-esbuild] ok')
}

main().catch((err) => {
    console.error('[ensure-esbuild]', err)
    process.exit(1)
})
