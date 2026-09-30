/**
 * highlight.js 语言模块的类型声明
 *
 * highlight.js 只为逐个语言模块提供实现，未随包提供类型声明
 * （types/index.d.ts 只导出 LanguageFn / HLJSApi 这类公共类型）。
 * 文件比对弹框需要自己注册语言，这里补一个通配声明，免得每个 import 都写 @ts-ignore。
 *
 * ★ 路径必须写成 `highlight.js/lib/languages/*`：
 *   hljs 的 package.json exports 只暴露了 `./lib/languages/*` 这个前缀，
 *   其 import 条件会解析到 es/languages/*.js（ESM 版本）。
 *   若写成 `highlight.js/es/languages/*`，会被 Vite 判定为「未导出的子路径」而解析失败。
 */
declare module 'highlight.js/lib/languages/*' {
    import type { LanguageFn } from 'highlight.js'

    const language: LanguageFn
    export default language
}
