/** 页签切换写入 history.state，用来和菜单切换区分 */
export const KEEP_CONTENT_SCROLL = 'keepScroll'

const scrollTops = new Map<string, number>()

function scrollNodes(): HTMLElement[] {
    const nodes = Array.from(document.querySelectorAll(
        'main.el-main > .el-scrollbar > .el-scrollbar__wrap'
    )).filter((node) => !node.closest('aside, .layout-aside, .lightside-aside, .menu-wrap, .aside-drawer'))
    const blank = document.querySelector('[data-content-scroll]')
    if (blank) nodes.push(blank)
    return nodes as HTMLElement[]
}

/** 离开页面前记下当前位置。此时路由已变，但内容区 DOM 还是上一页 */
export function rememberContentScroll(path: string) {
    const node = scrollNodes()[0]
    if (node) scrollTops.set(path, node.scrollTop)
}

/**
 * 菜单切换回到顶部。
 * 页签切换恢复该页离开时的位置，没有记录则停在顶部。
 */
export function scrollContentTo(path: string, keep: boolean) {
    const top = keep ? (scrollTops.get(path) ?? 0) : 0
    if (!keep) scrollTops.set(path, 0)
    scrollNodes().forEach((node) => {
        node.scrollTop = top
    })
}
