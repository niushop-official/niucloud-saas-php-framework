/**
 * 插件动态加载入口
 * - 开发环境：走源码分包，不调用本模块
 * - H5 分构建生产：由 addon-loader.split.ts 实现
 */
export {
    isSplitBuildEnabled,
    initSplitBuildRuntime,
    resolveAddonBridgeUrl,
    registerUniversalAddonRoutes,
    loadAddonPage,
    loadAddonDiyComponent,
    createAddonPageBridge,
    initAddonManifests,
    preloadAllAddonLocales,
    ensureAddonProdReady,
    wapUrl,
    isAddonInstalled,
    loadAddonModule
} from './addon-loader.split'
