const geometry: any = {}

// 保存地图引用，用于控制地图拖拽
let currentMap: any = null

/**
 * 设置地图引用
 * @param map 地图实例
 */
export const setMapInstance = (map: any) => {
    currentMap = map
}

/**
 * 在天地图上创建一个圆形
 * @param map 天地图实例
 * @param geometriesData 圆形数据
 * @param onChange 图形变化时的回调函数
 * @param onSelect 图形被选中时的回调函数
 */
export const createCircle = (map: any, geometriesData: any, onChange?: (data: any) => void, onSelect?: (key: string) => void) => {
    const T = (window as any).T
    if (!T) return null

    geometriesData.radius = geometriesData.radius ?? 1000
    geometriesData.center = geometriesData.center ?? { lat: map.getCenter().lat, lng: map.getCenter().lng }

    const color = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
    ]
    // 保存原始样式
    const originalStyle = {
        color: geometriesData.color || `rgba(${color.toString()}, .4)`,
        weight: geometriesData.weight || 3,
        opacity: geometriesData.opacity || 0.8,
        fillColor: geometriesData.fillColor || `rgba(${color.toString()}, .4)`,
        fillOpacity: geometriesData.fillOpacity || 0.3
    }
    const circle = new T.Circle(new T.LngLat(geometriesData.center.lng, geometriesData.center.lat), geometriesData.radius, originalStyle)

    // 如果已存在该图形，先删除
    if (geometry[geometriesData.key]) {
        try {
            if (geometry[geometriesData.key].editTimer) {
                clearTimeout(geometry[geometriesData.key].editTimer)
            }
            map.removeOverLay(geometry[geometriesData.key].graphical)
        } catch (e) {
            // 删除旧图形失败
        }
    }

    map.addOverLay(circle)

    // 保存几何数据的引用，确保在事件监听器中可用
    const circleData = { ...geometriesData }

    // 保存上一次的中心点和半径
    let preCenter = { ...circleData.center }
    let preRadius = circleData.radius

    // 监听地图触摸结束事件，检测圆形变化
    const handleTouchEnd = () => {
        if (!circle.isEditable()) return

        if (geometry[circleData.key]?.editTimer) {
            clearTimeout(geometry[circleData.key].editTimer)
        }

        geometry[circleData.key].editTimer = setTimeout(() => {
            const curCenter = circle.getCenter()
            const curRadius = circle.getRadius()

            // 中心点改变了
            if (curCenter.lng !== preCenter.lng || curCenter.lat !== preCenter.lat) {
                circleData.center = { lat: curCenter.lat, lng: curCenter.lng }
                preCenter = { ...circleData.center }
                // console.log('圆形中心点改变了', circleData.center)
                // 调用回调函数
                if (onChange) {
                    onChange(circleData)
                }
            }

            // 半径改变了
            if (curRadius !== preRadius) {
                circleData.radius = curRadius
                preRadius = curRadius
                // console.log('圆形半径改变了', curRadius)
                // 调用回调函数
                if (onChange) {
                    onChange(circleData)
                }
            }
        }, 200)
    }

    // 监听圆形点击事件
    const handleClick = () => {
        // 调用选择回调函数
        if (onSelect) {
            onSelect(circleData.key)
        }
    }

    // 初始时不启用编辑功能，只有在选中时才启用
    // circle.enableEdit()

    // 添加事件监听
    map.addEventListener('touchend', handleTouchEnd)
    map.addEventListener('mouseup', handleTouchEnd)
    circle.addEventListener('click', handleClick)

    geometry[circleData.key] = { graphical: circle, handleTouchEnd, handleClick, originalStyle }
    return circle
}

/**
 * 在天地图上创建一个矩形
 * @param map 天地图实例
 * @param geometriesData 矩形数据
 */
export const createRectangle = (map: any, geometriesData: any) => {
    const T = (window as any).T
    if (!T) return null

    const { lat, lng } = map.getCenter()

    geometriesData.bounds = geometriesData.bounds ?? {
        southwest: { lat: lat - 0.005, lng: lng - 0.005 },
        northeast: { lat: lat + 0.005, lng: lng + 0.005 }
    }

    const lngLats = [
        new T.LngLat(geometriesData.bounds.southwest.lng, geometriesData.bounds.southwest.lat),
        new T.LngLat(geometriesData.bounds.northeast.lng, geometriesData.bounds.southwest.lat),
        new T.LngLat(geometriesData.bounds.northeast.lng, geometriesData.bounds.northeast.lat),
        new T.LngLat(geometriesData.bounds.southwest.lng, geometriesData.bounds.northeast.lat)
    ]
     const color = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
    ]

    const rectangle = new T.Polygon(lngLats, {
        color: geometriesData.color || `rgba(${color.toString()}, .4)`,
        weight: geometriesData.weight || 3,
        opacity: geometriesData.opacity || 0.8,
        fillColor: geometriesData.fillColor || `rgba(${color.toString()}, .4)`,
        fillOpacity: geometriesData.fillOpacity || 0.3
    })

    map.addOverLay(rectangle)
    geometry[geometriesData.key] = { graphical: rectangle }
    return rectangle
}

/**
 * 在天地图上创建一个多边形
 * @param map 天地图实例
 * @param geometriesData 多边形数据
 * @param onChange 图形变化时的回调函数
 * @param onSelect 图形被选中时的回调函数
 */
export const createPolygon = (map: any, geometriesData: any, onChange?: (data: any) => void, onSelect?: (key: string) => void) => {
    const T = (window as any).T
    if (!T) return null

    const { lat, lng } = map.getCenter()

    geometriesData.paths = geometriesData.paths ?? [
        { lat: lat + 0.01, lng: lng + 0.01 },
        { lat: lat - 0.01, lng: lng + 0.01 },
        { lat: lat - 0.01, lng: lng - 0.01 },
        { lat: lat + 0.01, lng: lng - 0.01 }
    ]

    const lngLats = geometriesData.paths.map((item: any) => new T.LngLat(item.lng, item.lat))
    const color = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
    ]
    // 保存原始样式
    const originalStyle = {
        color: geometriesData.color || `rgba(${color.toString()}, .4)`,
        weight: geometriesData.weight || 3,
        opacity: geometriesData.opacity || 0.8,
        fillColor: geometriesData.fillColor || `rgba(${color.toString()}, .4)`,
        fillOpacity: geometriesData.fillOpacity || 0.3
    }
    const polygon = new T.Polygon(lngLats, originalStyle)

    // 如果已存在该图形，先删除
    if (geometry[geometriesData.key]) {
        try {
            if (geometry[geometriesData.key].editTimer) {
                clearTimeout(geometry[geometriesData.key].editTimer)
            }
            map.removeOverLay(geometry[geometriesData.key].graphical)
        } catch (e) {
            // 删除旧图形失败
        }
    }

    map.addOverLay(polygon)

    // 保存上一次的路径
    let prePaths = JSON.parse(JSON.stringify(geometriesData.paths))

    // 保存几何数据的引用，确保在事件监听器中可用
    const polygonData = { ...geometriesData }

    // 监听地图触摸结束事件，检测多边形变化
    const handleTouchEnd = () => {
        if (!polygon.isEditable()) return

        if (geometry[polygonData.key]?.editTimer) {
            clearTimeout(geometry[polygonData.key].editTimer)
        }

        geometry[polygonData.key].editTimer = setTimeout(() => {
            try {
                const curLngLats = polygon.getLngLats()
                
                // 确保 curLngLats 是数组
                if (Array.isArray(curLngLats)) {
                    // 检查 curLngLats[0] 是否是数组（多边形可能返回嵌套数组）
                    let pathsArray = curLngLats
                    if (Array.isArray(curLngLats[0])) {
                        pathsArray = curLngLats[0]
                    }
                    
                    const curPaths = pathsArray.map((lngLat: any) => {
                        // 检查 lngLat 是否是数组 [lng, lat]
                        if (Array.isArray(lngLat)) {
                            return {
                                lat: lngLat[1],
                                lng: lngLat[0]
                            }
                        } else {
                            // 否则，假设是对象 { lat, lng }
                            return {
                                lat: lngLat.lat,
                                lng: lngLat.lng
                            }
                        }
                    })

                    // 检查路径是否改变
                    const pathsChanged = JSON.stringify(curPaths) !== JSON.stringify(prePaths)

                    if (pathsChanged) {
                        polygonData.paths = curPaths
                        prePaths = JSON.parse(JSON.stringify(polygonData.paths))
                        // 调用回调函数
                        if (onChange) {
                            onChange(polygonData)
                        }
                    }
                } else {
                    console.error('curLngLats 不是数组:', curLngLats)
                }
            } catch (error) {
                console.error('获取多边形路径失败:', error)
            }
        }, 200)
    }

    // 监听多边形点击事件
    const handleClick = () => {
        // 调用选择回调函数
        if (onSelect) {
            onSelect(polygonData.key)
        }
    }

    // 初始时不启用编辑功能，只有在选中时才启用
    // polygon.enableEdit()

    // 添加事件监听
    map.addEventListener('touchend', handleTouchEnd)
    map.addEventListener('mouseup', handleTouchEnd)
    polygon.addEventListener('click', handleClick)

    geometry[polygonData.key] = { graphical: polygon, handleTouchEnd, handleClick, originalStyle }
    return polygon
}

/**
 * 删除图形
 * @param map 地图实例
 * @param key 图形key
 */
export const deleteGeometry = (map: any, key: string) => {
    if (!geometry[key]) return
    try {
        const T = (window as any).T
        if (T && geometry[key].graphical) {
            // 清除定时器
            if (geometry[key].editTimer) {
                clearTimeout(geometry[key].editTimer)
            }
            // 移除事件监听器
            if (geometry[key].handleTouchEnd) {
                map.removeEventListener('touchend', geometry[key].handleTouchEnd)
                map.removeEventListener('mouseup', geometry[key].handleTouchEnd)
            }
            // 移除点击事件监听器
            if (geometry[key].handleClick) {
                geometry[key].graphical.removeEventListener('click', geometry[key].handleClick)
            }
            // 移除覆盖物
            map.removeOverLay(geometry[key].graphical)
        }
        delete geometry[key]
    } catch (e) {
        console.warn('删除图形失败:', e)
    }
}

/**
 * 清空所有图形
 * @param map 地图实例
 */
export const clearAllGeometry = (map: any) => {
    const T = (window as any).T
    if (T) {
        // 先清除所有图形的事件监听器和定时器
        Object.keys(geometry).forEach(key => {
            if (geometry[key].editTimer) {
                clearTimeout(geometry[key].editTimer)
            }
            if (geometry[key].handleTouchEnd) {
                map.removeEventListener('touchend', geometry[key].handleTouchEnd)
                map.removeEventListener('mouseup', geometry[key].handleTouchEnd)
            }
            if (geometry[key].handleClick) {
                geometry[key].graphical.removeEventListener('click', geometry[key].handleClick)
            }
        })
        // 一次性清空地图上的所有覆盖物
        map.clearOverLays()
    }
    // 清空几何对象存储
    Object.keys(geometry).forEach(key => delete geometry[key])
}

/**
 * 选中图形
 * @param key 图形key
 */
export const selectGeometry = (key: string) => {
    if (!geometry[key]?.graphical) return
    
    try {
        // 先取消所有图形的选中状态
        deselectAllGeometry()
        
        // 设置选中状态
        geometry[key].graphical.setSelected?.(true)
        
        // 启用当前图形的编辑功能
        geometry[key].graphical.enableEdit()

        const color = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        ]
        
        // 修改样式，使其显示为选中状态
        geometry[key].graphical.setStyle({
            color: '#1890ff', // 选中时的边框颜色
            weight: 2, // 选中时的边框宽度
            opacity: 1, // 选中时的边框透明度
            fillColor: `rgba(${color.toString()}, .6)`, // 选中时的填充颜色
            fillOpacity: 1// 选中时的填充透明度
        })
    } catch (e) {
        console.error('选中图形失败:', e)
    }
}

/**
 * 取消选中所有图形
 */
export const deselectAllGeometry = () => {
    Object.keys(geometry).forEach(key => {
        try {
            // 取消选中状态
            geometry[key]?.graphical?.setSelected?.(false)
            
            // 禁用编辑功能
            geometry[key]?.graphical?.disableEdit?.()
            
            // 恢复原始样式
            if (geometry[key]?.originalStyle) {
                geometry[key].graphical.setStyle(geometry[key].originalStyle)
            }
        } catch (e) {
            console.warn('取消选中图形失败:', e)
        }
    })
}

/**
 * 创建点标记
 * @param map 天地图实例
 * @returns 标记实例
 */
export const createMarker = (map: any) => {
    const T = (window as any).T
    if (!T) return null

    const { lat, lng } = map.getCenter()
    const marker = new T.Marker(new T.LngLat(lng, lat))
    map.addOverLay(marker)
    return marker
}

/**
 * 逆地址解析
 * @param params 参数 { mapKey, lat, lng }
 * @returns Promise
 */
export const latLngToAddress = (params: any) => {
    return new Promise((resolve, reject) => {
        const T = (window as any).T
        if (!T) {
            reject(new Error('天地图服务未加载'))
            return
        }

        const geocoder = new T.Geocoder()
        const lngLat = new T.LngLat(params.lng, params.lat)

        geocoder.getLocation(lngLat, (result: any) => {
            if (result && result.status === '0') {
                const addrComp = result.addressComponent || {}
                let detailAddress = ''

                if (result.formattedAddress) {
                    detailAddress = result.formattedAddress
                } else if (result.address) {
                    detailAddress = result.address
                } else {
                    const parts = []
                    if (addrComp.road) parts.push(addrComp.road)
                    if (addrComp.address) parts.push(addrComp.address)
                    if (addrComp.poi) parts.push(addrComp.poi)
                    detailAddress = parts.join('')
                }

                const addressData = {
                    location: { lat: params.lat, lng: params.lng },
                    address: addrComp ?
                        `${ addrComp.province || '' }${ addrComp.city || '' }${ addrComp.county || '' }` : '',
                    formatted_addresses: {
                        recommend: detailAddress
                    },
                    address_component: {
                        province: addrComp.province || '',
                        city: addrComp.city || '',
                        district: addrComp.county || '',
                        street: addrComp.road || '',
                        street_number: addrComp.address || ''
                    },
                    addressComponent: addrComp,
                    formatted_address: detailAddress
                }
                resolve(addressData)
            } else {
                reject(new Error(result?.msg || '地址解析失败'))
            }
        })
    })
}

/**
 * 地址解析
 * @param params 参数 { mapKey, address }
 * @returns Promise
 */
export const addressToLatLng = (params: any) => {
    return new Promise((resolve, reject) => {
        const T = (window as any).T
        if (!T) {
            reject(new Error('天地图服务未加载'))
            return
        }

        const geocoder = new T.Geocoder()
        geocoder.getPoint(params.address, (result: any) => {
            if (result && result.status === '0' && result.location) {
                const lat = result.location.lat
                const lng = result.location.lon || result.location.lng
                if (lat && lng) {
                    resolve({ lat, lng })
                } else {
                    reject(new Error('坐标解析失败'))
                }
            } else {
                reject(new Error(result?.msg || '未找到该地址'))
            }
        })
    })
}
