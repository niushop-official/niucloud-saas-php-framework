// 插件构建专用 Tailwind 配置。
// 插件以 lib 模式独立打包成 index.js，运行时注入 <style>；主后台 core 构建的 Tailwind
// 只扫描 ./src/** 且不包含插件特有的工具类（插件源码可能不在 src/addon 下，或被 core 的
// exclude-addon-source 排除），导致插件用到的 Tailwind 类（如 flex / bg-white / text-gray-500 /
// from-blue-50 等）在全局 CSS 中缺失、样式全部丢失。
// 这里让插件构建自己生成用到的 Tailwind 工具类，随 style.css 一起注入，彻底解耦。
/** @type {import('tailwindcss').Config} */
const base = require('./tailwind.config.cjs')

// 仅扫描当前构建的插件源码，避免把其他插件的类也打进本插件 CSS（体积 + 重复）
const addonKey = process.env.ADDON_KEY || ''
const content = addonKey
    ? ['./src/addon/' + addonKey + '/**/*.{vue,js,ts,jsx,tsx}']
    : ['./src/addon/**/*.{vue,js,ts,jsx,tsx}']

module.exports = {
    // 复用主后台主题（颜色/间距/字号与 Element Plus 变量对齐），保证插件样式与后台一致
    presets: [base],
    content,
    // 关闭 preflight：避免插件注入的样式重置影响主后台已有的全局样式（如 a、body 等）
    corePlugins: {
        preflight: false
    }
}
