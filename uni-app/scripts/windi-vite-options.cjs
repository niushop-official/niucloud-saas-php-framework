/**
 * Windi 扫描范围：仅 src，并排除 .build/dist，避免 Windows 上残留备份目录 EPERM
 */
const SCAN_EXCLUDE = [
    'node_modules',
    '.git',
    'dist',
    '.build',
    '.build/**',
    '**/.build/**',
    '**/addon-pages-backup/**'
]

/** Core 分构建：插件 DIY 组件运行时加载，不参与 Windi / 编译扫描 */
const CORE_SCAN_EXCLUDE = [
    ...SCAN_EXCLUDE,
    'src/addon/*/components/**',
    '**/src/addon/*/components/**'
]

function createWindiPluginOptions(dirs = ['src'], { coreBuild = false } = {}) {
    return {
        scan: {
            dirs,
            fileExtensions: ['vue', 'js', 'ts'],
            exclude: coreBuild ? CORE_SCAN_EXCLUDE : SCAN_EXCLUDE
        }
    }
}

module.exports = { createWindiPluginOptions, SCAN_EXCLUDE, CORE_SCAN_EXCLUDE }
