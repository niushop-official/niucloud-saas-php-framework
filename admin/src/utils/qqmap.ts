import { jsonp } from 'vue-jsonp'

const geometry: any = {}

/**
 * 在地图上创建一个圆形
 * @param map 地图实例
 * @param geometriesData 圆形数据
 * @param onSelect 图形被选中时的回调函数
 */
export const createCircle = (map: any, geometriesData: any, onSelect?: (key: string) => void, onChange?: (data: any) => void) => {
    const TMap = (window as any).TMap
    const LatLng = TMap.LatLng
    if (!TMap.tools) {
        setTimeout(() => createCircle(map, geometriesData, onSelect), 300)
        return
    }

    geometriesData.radius = geometriesData.radius ?? 1000
    geometriesData.center = geometriesData.center ?? { lat: map.getCenter().lat, lng: map.getCenter().lng }

    const color = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
    ]

    // 清理旧图形
    if (geometry[geometriesData.key]) {
        try {
            geometry[geometriesData.key].graphical.remove(geometriesData.key)
            geometry[geometriesData.key].editor?.delete()
        } catch (e) {}
    }

    // 第一步：先创建圆形图层
    const multiCircle = new TMap.MultiCircle({
        map,
        styles: {
            circle: new TMap.CircleStyle({
                color: `rgba(${color.toString()}, .4)`,
                showBorder: true,
                borderColor: `rgb(${color.toString()})`,
                borderWidth: 2
            }),
            highlight: new TMap.CircleStyle({
                color: 'rgba(255, 255, 0, 0.6)',
                showBorder: true,
                borderColor: 'rgb(255,200,0)',
                borderWidth: 3
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

    // 第二步：初始化编辑器，overlayList 在构造函数传入（官方标准）
    let editor = new TMap.tools.GeometryEditor({
        map: map,
        overlayList: [
            {
                overlay: multiCircle,
                id: geometriesData.key,
                selectedStyleId: 'highlight'
            }
        ],
        actionMode: TMap.tools.constants?.EDITOR_ACTION?.INTERACT || 0,
        activeOverlayId: null,
        selectable: true,
        snappable: true
    })
    editor.setKeyboardDeleteEnable(false);

    // 编辑器事件监听
    editor.on('adjust_start', () => currentMap?.setDraggable(false))
    editor.on('adjust_complete', (data: any) => {
        if (data?.center && data.radius !== undefined) {
            // 完整覆盖，保留原有key，只更新坐标半径
            geometriesData.center = { ...data.center }
            geometriesData.radius = Math.round(Number(data.radius))
        }
        // 关键：主动抛出完整区域数据给父组件，同步页面绑定数据
        if(onChange){
            onChange({...geometriesData})
        }
        setTimeout(() => currentMap?.setDraggable(true), 100)
    })
    editor.on('adjust', (data: any) => {
        if (data?.center && data.radius !== undefined) {
            geometriesData.center = { ...data.center }
            geometriesData.radius = Math.round(Number(data.radius))
        }
        if(onChange){
            onChange({...geometriesData})
        }
    })
    editor.on('select', () => {
        if (onSelect) onSelect(geometriesData.key)
    })

    // 圆形点击事件
    multiCircle.on('click', () => {
        editor.select([geometriesData.key])
        if (onSelect) onSelect(geometriesData.key)
    })

    geometry[geometriesData.key] = { graphical: multiCircle, editor }
}


/**
 * 在地图上创建一个多边形
 * @param map 地图实例
 * @param geometriesData 多边形数据
 * @param onSelect 图形被选中时的回调函数
 */
export const createPolygon = (
    map: any,
    geometriesData: any,
    onSelect?: (key: string) => void,
    onChange?: (data: any) => void // 新增 onChange 参数
) => {
    const TMap = (window as any).TMap
    const LatLng = TMap.LatLng
    if (!TMap.tools) {
        setTimeout(() => createPolygon(map, geometriesData, onSelect, onChange), 300)
        return
    }

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

    if (geometry[geometriesData.key]) {
        try {
            geometry[geometriesData.key].graphical.remove(geometriesData.key)
            geometry[geometriesData.key].editor?.delete()
        } catch (e) {}
    }

    // 1. 创建多边形图层
    const multiPolygon = new TMap.MultiPolygon({
        map: map,
        styles: {
            polygon: new TMap.PolygonStyle({
                color: `rgba(${color.toString()}, .4)`,
                showBorder: true,
                borderColor: `rgb(${color.toString()})`,
                borderWidth: 2
            }),
            highlight: new TMap.PolygonStyle({ color: 'rgba(255, 255, 0, 0.6)' })
        },
        geometries: [
            {
                id: geometriesData.key,
                styleId: 'polygon',
                paths: geometriesData.paths.map((item: any) => new LatLng(item.lat, item.lng))
            }
        ]
    });

    // 2. 编辑器构造直接传入overlayList
    let editor = new TMap.tools.GeometryEditor({
        map: map,
        overlayList: [
            {
                overlay: multiPolygon,
                id: geometriesData.key,
                selectedStyleId: 'highlight'
            }
        ],
        actionMode: TMap.tools.constants?.EDITOR_ACTION?.INTERACT || 0,
        activeOverlayId: null,
        selectable: true,
        snappable: true
    })
    editor.setKeyboardDeleteEnable(false);

    // 调整完成回调：同步paths并抛出完整数据
    editor.on('adjust_start', () => currentMap?.setDraggable(false))
    editor.on('adjust_complete', (data: any) => {
        if (data?.paths) {
            // 完整覆盖路径数组
            geometriesData.paths = data.paths.map((item: any) => ({ lat: item.lat, lng: item.lng }))
        }
        // 抛出完整多边形数据给上层
        if (onChange) onChange({ ...geometriesData })
        setTimeout(() => currentMap?.setDraggable(true), 100)
    })
    editor.on('adjust', (data: any) => {
        if (data?.paths) {
            geometriesData.paths = data.paths.map((item: any) => ({ lat: item.lat, lng: item.lng }))
        }
        if (onChange) onChange({ ...geometriesData })
    })
    editor.on('select', () => {
        if (onSelect) onSelect(geometriesData.key)
    })

    multiPolygon.on('click', () => {
        editor.select([geometriesData.key])
        if (onSelect) onSelect(geometriesData.key)
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