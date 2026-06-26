/** 分构建 addon 桥接页登记的真实路由，供 t() 解析 fileKey */
let activeAddonRoute = ''

export function setActiveAddonPageRoute(route: string) {
    activeAddonRoute = route || ''
}

export function getActiveAddonPageRoute(): string {
    return activeAddonRoute
}

export function clearActiveAddonPageRoute() {
    activeAddonRoute = ''
}
