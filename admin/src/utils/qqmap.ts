import { jsonp } from 'vue-jsonp'

const geometry: any = {}

/**
 * 在地图上创建一个圆形
 * @param map 地图实例
 * @param geometriesData 圆形数据
 * @param onSelect 图形被选中时的回调函数
 */
export const createCircle = (map: any, geometriesData: any, onSelect?: (key: string) => void) => {
    const TMap = (window as any).TMap
    const LatLng = TMap.LatLng

    geometriesData.radius = geometriesData.radius ?? 1000
    geometriesData.center = geometriesData.center ?? { lat: map.getCenter().lat, lng: map.getCenter().lng }

    const color = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
    ]

    // 创建图形
    const multiCircle = new TMap.MultiCircle({
        map,
        styles: { // 设置圆形样式
            circle: new TMap.CircleStyle({
                color: `rgba(${color.toString()}, .4)`,
                showBorder: true,
                borderColor: `rgb(${color.toString()})`,
                borderWidth: 2
            }),
             highlight: new TMap.PolygonStyle({
                                    color: 'rgba(255, 255, 0, 0.6)'
                                })
            
        },
        geometries: [
            {
                styleId: 'circle',
                center: new LatLng(geometriesData.center.lat, geometriesData.center.lng),
                radius: parseInt(geometriesData.radius),
                id: geometriesData.key
            }
        ]
    })
    
    // 如果已存在该图形，先删除
    if (geometry[geometriesData.key]) {
        try {
            geometry[geometriesData.key].graphical.remove(geometriesData.key)
            geometry[geometriesData.key].editor?.delete()
        } catch (e) {
            // 删除旧图形失败
            // console.warn('删除旧图形失败:', e)
        }
    }

    let editor = null
    // 检查 TMap.tools 是否存在
    if (TMap.tools) {
        // 创建图形编辑器 - 支持拖动中心点和调整半径
        try {
            editor = new TMap.tools.GeometryEditor({
                map: map,
                overlayList: [
                    {
                        overlay: multiCircle,
                        id: geometriesData.key,
                        selectedStyleId: 'highlight'
                    }
                ],
                actionMode: TMap.tools.constants?.EDITOR_ACTION?.INTERACT || 0, // 交互模式，支持拖动中心点和调整半径
                activeOverlayId: null, // 初始不激活，等待用户选择
                selectable: true ,// 开启点选功能
                snappable: true // 开启吸附
            })
            editor.setKeyboardDeleteEnable(false);

            // 监听调整开始事件 - 禁用地图拖拽
            editor.on('adjust_start', () => {
                currentMap?.setDraggable(false)
            })

            // 监听调整完成事件
            editor.on('adjust_complete', (data: any) => {
                if (data?.center && data.radius !== undefined) {
                    geometriesData.center = { lat: data.center.lat, lng: data.center.lng }
                    geometriesData.radius = parseInt(data.radius)
                }
                setTimeout(() => currentMap?.setDraggable(true), 100)
            })

            // 监听调整中事件（实时更新）
            editor.on('adjust', (data: any) => {
                if (data?.center && data.radius !== undefined) {
                    geometriesData.center = { lat: data.center.lat, lng: data.center.lng }
                    geometriesData.radius = parseInt(data.radius)
                }
            })

            // 监听选中事件
            editor.on('select', () => {
                // 只有在用户点击地图上的图形时才触发，而不是在切换页面时
                if (onSelect) {
                    onSelect(geometriesData.key)
                }
            })
        } catch (e) {
            console.warn('创建编辑器失败:', e)
        }
    }

    // 为圆形添加点击事件监听器
    multiCircle.on('click', () => {
        // 先选中当前图形，使其高亮显示
        if (editor) {
            editor.select([geometriesData.key])
            editor.setActiveOverlay?.(geometriesData.key)
        }
        // 然后触发选中回调
        if (onSelect) {
            onSelect(geometriesData.key)
        }
    })

    geometry[geometriesData.key] = { graphical: multiCircle, editor }
}

/**
 * 在地图上创建一个多边形
 * @param map 地图实例
 * @param geometriesData 多边形数据
 * @param onSelect 图形被选中时的回调函数
 */
export const createPolygon = (map: any, geometriesData: any, onSelect?: (key: string) => void) => {
    const TMap = (window as any).TMap
    const LatLng = TMap.LatLng

    const { lat, lng } = map.getCenter();

    geometriesData.paths = geometriesData.paths ?? [
        { lat: lat + 0.01, lng: lng + 0.01 },
        { lat: lat - 0.01, lng: lng + 0.01 },
        { lat: lat - 0.01, lng: lng - 0.01 },
        { lat: lat + 0.01, lng: lng - 0.01 }
    ]

    const color = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
    ]

    // 如果已存在该图形，先删除
    if (geometry[geometriesData.key]) {
        try {
            geometry[geometriesData.key].graphical.remove(geometriesData.key)
            geometry[geometriesData.key].editor?.delete()
        } catch (e) {
            // 删除旧多边形失败
            // console.warn('删除旧多边形失败:', e)
        }
    }

    const multiPolygon = new TMap.MultiPolygon({
        map: map,
        styles: {
            polygon: new TMap.PolygonStyle({
                color: `rgba(${color.toString()}, .4)`,
                showBorder: true,
                borderColor: `rgb(${color.toString()})`,
                borderWidth: 2
            }),
             highlight: new TMap.PolygonStyle({
                                    color: 'rgba(255, 255, 0, 0.6)'
                                })
        },
        geometries: [
            {
                id: geometriesData.key,
                styleId: 'polygon',
                paths: geometriesData.paths.map((item: any) => {
                    return new LatLng(item.lat, item.lng)
                })
            }
        ]
    });

    let editor = null
    // 检查 TMap.tools 是否存在
    if (TMap.tools) {
        // 创建图形编辑器 - 支持拖动边框和调整形状
        try {
            editor = new TMap.tools.GeometryEditor({
                map: map,
                overlayList: [
                    {
                        overlay: multiPolygon,
                        id: geometriesData.key,
                        selectedStyleId: 'highlight'
                    }
                ],
                actionMode: TMap.tools.constants?.EDITOR_ACTION?.INTERACT || 0, // 交互模式，支持拖动边框和调整形状
                activeOverlayId: null, // 初始不激活，等待用户选择
                selectable: true, // 开启点选功能
                snappable: true // 开启吸附
            })

            editor.setKeyboardDeleteEnable(false);
            // 监听调整开始事件 - 禁用地图拖拽
            editor.on('adjust_start', () => {
                currentMap?.setDraggable(false)
            })

            // 监听调整完成事件
            editor.on('adjust_complete', (data: any) => {
                if (data?.paths) {
                    geometriesData.paths = data.paths.map((item: any) => ({ lat: item.lat, lng: item.lng }))
                }
                setTimeout(() => currentMap?.setDraggable(true), 100)
            })

            // 监听调整中事件（实时更新）
            editor.on('adjust', (data: any) => {
                if (data?.paths) {
                    geometriesData.paths = data.paths.map((item: any) => ({ lat: item.lat, lng: item.lng }))
                }
            })

            // 监听选中事件
            editor.on('select', () => {
                // 只有在用户点击地图上的图形时才触发，而不是在切换页面时
                if (onSelect) {
                    onSelect(geometriesData.key)
                }
            })
        } catch (e) {
            console.warn('创建编辑器失败:', e)
        }
    }

    // 为多边形添加点击事件监听器
    multiPolygon.on('click', () => {
        // 先选中当前图形，使其高亮显示
        if (editor) {
            editor.select([geometriesData.key])
            editor.setActiveOverlay?.(geometriesData.key)
        }
        // 然后触发选中回调
        if (onSelect) {
            onSelect(geometriesData.key)
        }
    })

    geometry[geometriesData.key] = { graphical: multiPolygon, editor }
}

/**
 * 删除图形
 */
export const deleteGeometry = (key: string) => {
    if (!geometry[key]) return
    try {
        geometry[key].graphical?.remove(key)
        geometry[key].editor?.delete()
        delete geometry[key]
    } catch (e) {
        console.warn('删除图形失败:', e)
    }
}

/**
 * 清空所有图形
 */
export const clearAllGeometry = () => {
    Object.keys(geometry).forEach(deleteGeometry)
}

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
 * 选中图形
 */
export const selectGeometry = (key: string) => {
    if (!geometry[key]?.editor) return
    
    try {
        // 取消其他图形的选中状态
        Object.keys(geometry).forEach(k => {
            if (k !== key && geometry[k]?.editor) {
                geometry[k].editor.deselect?.()
                geometry[k].editor.setActiveOverlay?.(null)
            }
        })
        // 选中当前图形
        geometry[key].editor.select?.([key])
        geometry[key].editor.setActiveOverlay?.(key)
    } catch (e) {
        // 删除图形失败
            // console.error('选中图形失败:', e)
    }
}

/**
 * 取消选中所有图形
 */
export const deselectAllGeometry = () => {
    Object.keys(geometry).forEach(k => {
        geometry[k]?.editor?.deselect?.()
        geometry[k]?.editor?.setActiveOverlay?.(null)
    })
    currentMap?.setDraggable(true)
}

/**
 * 创建点标记
 * @param map
 * @returns
 */
export const createMarker = (map: any) => {
    const TMap = (window as any).TMap
    const LatLng = TMap.LatLng

    return new TMap.MultiMarker({
        map,
        geometries: [
            {
                id: 'center',
                position: map.getCenter(),
            }
        ]
    });
}

/**
 * 逆地址解析
 * @param params
 */
export const latLngToAddress = (params: any) => {
    return jsonp(`https://apis.map.qq.com/ws/geocoder/v1/?key=${params.mapKey}&location=${params.lat},${params.lng}&output=jsonp&callback=latLngToAddress`, { callbackName: 'latLngToAddress' })
}

/**
 * 地址解析
 */
export const addressToLatLng = (params: any) => {
    return jsonp(`https://apis.map.qq.com/ws/geocoder/v1/?key=${params.mapKey}&address=${params.address}&output=jsonp&callback=addressToLatLng`, { callbackName: 'addressToLatLng' })
}