/**
 * 微页面 DIY 组件在分包内，主包通过 componentPlaceholder 占位；
 * 需主动触发分包下载，否则占位 view 不会替换为真实组件。
 */
export function preloadMpDiySubPackages(extraRoots: string[] = []) {
    // #ifdef MP-WEIXIN
    const wxApi = typeof wx !== 'undefined' ? (wx as any) : null
    if (!wxApi) return
    const load = wxApi.loadSubpackage || wxApi.loadSubPackage
    if (typeof load !== 'function') return
    const roots = ['app/components', ...extraRoots]
    for (const root of roots) {
        if (!root) continue
        load.call(wxApi, {
            root,
            name: root,
            fail() {
                /* 分包可能已加载或当前基础库不支持 */
            }
        })
    }
    // #endif
}
