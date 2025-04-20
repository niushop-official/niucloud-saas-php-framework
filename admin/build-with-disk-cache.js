// build-with-disk-cache.js
import { existsSync, rmSync } from 'fs'
import { execSync } from 'child_process'

// 清理旧缓存（可选）
if (existsSync('./.vite_cache')) rmSync('./.vite_cache', { recursive: true })

// 分阶段构建
const stages = [
  { name: 'Core',   cmd: 'vite build --mode=core' },
  { name: 'Vendor', cmd: 'vite build --mode=vendor' },
  { name: 'App',    cmd: 'vite build --mode=app' }
]

stages.forEach(({ name, cmd }) => {
  console.log(`[${name}] Building...`)
  execSync(`NODE_OPTIONS='--max-old-space-size=2048' ${cmd}`, { 
    stdio: 'inherit',
    env: { ...process.env, VITE_CACHE_DIR: `./.vite_${name.toLowerCase()}_cache` }
  })
})