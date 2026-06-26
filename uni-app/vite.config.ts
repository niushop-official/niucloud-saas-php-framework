import {defineConfig} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import WindiCSS from 'vite-plugin-windicss'
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { createDiyGroupFixPlugin } = require('./scripts/vite-plugin-diy-group-fix.cjs')
const { createDiyDynamicBridgeMpPlugin } = require('./scripts/vite-plugin-diy-dynamic-bridge-mp.cjs')
const { createWindiPluginOptions } = require('./scripts/windi-vite-options.cjs')

const plugins = [
    UniLayouts(),
    uni(),
    createDiyGroupFixPlugin(),
    createDiyDynamicBridgeMpPlugin(),
    WindiCSS(createWindiPluginOptions(['src']))
]

process.env.UNI_PLATFORM == 'mp-weixin' && plugins.push(MiniProgramTailwind())

export default defineConfig({
    server: {
        host: '0.0.0.0',
        // port: 6666,
        // open:true // vite项目启动时自动打开浏览器
    },
    plugins,
    optimizeDeps: {
        include: ['dayjs']
    }
})
