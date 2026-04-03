<template>
    <div :id="containerId" :class="containerClass" :style="containerStyle" v-loading="loading"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import { t } from '@/lang'
import { getMap } from '@/app/api/sys'

import {
    createMarker,
    createCircle,
    createPolygon,
    deleteGeometry,
    selectGeometry,
    latLngToAddress
} from '@/utils/qqmap'

// 天地图工具
import {
    createCircle as tdCreateCircle,
    createPolygon as tdCreatePolygon,
    deleteGeometry as tdDeleteGeometry,
    selectGeometry as tdSelectGeometry,
    clearAllGeometry,
    latLngToAddress as tiandituLatLngToAddress
} from '@/utils/tianditu'

const MAP_INIT_DELAY = 500
const MAP_SEARCH_TIMEOUT = 5000
const MAP_SEARCH_INTERVAL = 100
const MAP_SEARCH_MAX_ATTEMPTS = 50

interface MapInstance {
    destroy?: () => void
    clearOverLays?: () => void
    on?: (event: string, callback: Function) => void
    addControl?: (control: any) => void
    addOverLay?: (overlay: any) => void
    removeOverLay?: (overlay: any) => void
    centerAndZoom?: (center: any, zoom: number) => void
    setZoom?: (zoom: number) => void
    setCenter?: (center: any) => void
    addEventListener?: (event: string, callback: Function) => void
}

interface Props {
    containerId?: string
    containerClass?: string
    containerStyle?: string
    longitude?: string | number
    latitude?: string | number
    zoom?: number
    selectedKey?: string
    disabledClickMarker?: any // 是否禁止点击事件添加标注
}

interface Emits {
    (e: 'update:longitude', value: string): void
    (e: 'update:latitude', value: string): void
    (e: 'locationChange', data: { lat: number, lng: number, address: any }): void
    (e: 'areaChange', data: { key: string, type: 'circle' | 'polygon', path: any }): void
    (e: 'selectChange', key: string): void
}

const props = withDefaults(defineProps<Props>(), {
    containerId: 'map-container',
    containerClass: 'w-[800px] h-[500px] relative border border-gray-300',
    containerStyle: '',
    longitude: 116.397463,
    latitude: 39.909187,
    zoom: 14,
    selectedKey: '',
    disabledClickMarker: false
})

const emit = defineEmits<Emits>()

const loading = ref(true)
const mapKey = ref('')
const mapType = ref<'tencent' | 'tianditu'>('tianditu')
let map: MapInstance | null = null
let marker: any = null
const overlays = ref<any[]>([])

// 获取地图配置
const getMapConfigData = () => {
    return getMap({
        need_encrypt: false
    }).then((res: any) => {
        mapType.value = res.data.map_type || 'tianditu'
        mapKey.value = mapType.value === 'tianditu' ? res.data.tianditu_map_web_key : res.data.key
    }).catch((error) => {
        loading.value = false
        ElMessage.error(t('获取地图配置失败'))
    })
}

// 初始化腾讯地图
const initTencentMap = () => {
    const mapScript = document.createElement('script')
    mapScript.src = 'https://map.qq.com/api/gljs?libraries=tools,service&v=1.exp&key=' + mapKey.value
    document.body.appendChild(mapScript)

    mapScript.onload = () => {
        setTimeout(() => {
            const TMap = (window as any).TMap
            if (TMap) {
                const lng = props.longitude ? Number(props.longitude) : 116.397463
                const lat = props.latitude ? Number(props.latitude) : 39.909187
                const center = new TMap.LatLng(lat, lng)
                map = new TMap.Map(props.containerId, { center, zoom: props.zoom })
                map.on('tilesloaded', () => loading.value = false)

                marker = createMarker(map)
                if(!props.disabledClickMarker) {
                    map.on('click', (evt: any) => {
                        const ll = evt?.latLng
                        if (!ll) return
                        const lat = typeof ll.getLat === 'function' ? ll.getLat() : ll.lat
                        const lng = typeof ll.getLng === 'function' ? ll.getLng() : ll.lng
                        if (lat == null || lng == null || Number.isNaN(lat) || Number.isNaN(lng)) return

                        const newCenter = new TMap.LatLng(lat, lng)
                        map.setZoom(16)
                        map.setCenter(newCenter)
                        marker.updateGeometries({ id: 'center', position: newCenter })
                        nextTick(() => {
                            handleLocationChange(lat, lng)
                        })
                    })
                }

                if (props.latitude && props.longitude) {
                    handleLocationChange(lat, lng)
                }
            } else {
                loading.value = false
                ElMessage.error(t('腾讯地图加载失败'))
            }
        }, MAP_INIT_DELAY)
    }

    mapScript.onerror = () => {
        loading.value = false
        ElMessage.error(t('腾讯地图脚本加载失败'))
    }
}

// 初始化天地图
const initTiandituMap = () => {
    const mapScript = document.createElement('script')
    mapScript.src = 'https://api.tianditu.gov.cn/api?v=4.0&tk=' + mapKey.value
    document.body.appendChild(mapScript)

    mapScript.onload = () => {
        setTimeout(() => {
            const T = (window as any).T
            if (T) {
                const lng = props.longitude ? Number(props.longitude) : 116.397463
                const lat = props.latitude ? Number(props.latitude) : 39.909187
                map = new T.Map(props.containerId)
                map.centerAndZoom(new T.LngLat(lng, lat), props.zoom)

                const ctrl = new T.Control.Zoom()
                map.addControl(ctrl)

                marker = new T.Marker(new T.LngLat(lng, lat))
                map.addOverLay(marker)

                loading.value = false

                if(!props.disabledClickMarker) {
                    map.addEventListener('click', (evt: any) => {
                        const lngLat = evt.lnglat
                        if (!lngLat) return
                        const lat = lngLat.lat
                        const lng = lngLat.lng
                        if (lat == null || lng == null || Number.isNaN(lat) || Number.isNaN(lng)) return

                        map.removeOverLay(marker)

                        marker = new T.Marker(new T.LngLat(lng, lat))
                        map.addOverLay(marker)

                        map.centerAndZoom(new T.LngLat(lng, lat), 16)

                        nextTick(() => {
                            handleLocationChange(lat, lng)
                        })
                    })
                }

                if (props.latitude && props.longitude) {
                    handleLocationChange(lat, lng)
                }
            } else {
                loading.value = false
                ElMessage.error(t('天地图加载失败'))
            }
        }, MAP_INIT_DELAY)
    }

    mapScript.onerror = () => {
        loading.value = false
        ElMessage.error(t('天地图加载失败，请检查密钥配置'))
    }
}

// 初始化地图
const initMap = () => {
    if (!mapKey.value) {
        loading.value = false
        return
    }

    // 防止重复初始化
    if (map) {
        return
    }

    if (mapType.value === 'tencent') {
        initTencentMap()
    } else if (mapType.value === 'tianditu') {
        initTiandituMap()
    }
}

// 处理位置变化
const handleLocationChange = (lat: number, lng: number) => {
    emit('update:longitude', String(lng))
    emit('update:latitude', String(lat))

    if (mapType.value === 'tencent') {
        latLngToAddress({ mapKey: mapKey.value, lat, lng }).then(({ message, result }) => {
            if (message == 'query ok' || message == 'Success') {
                emit('locationChange', { lat, lng, address: result })
            }
        })
    } else if (mapType.value === 'tianditu') {
        tiandituLatLngToAddress({ mapKey: mapKey.value, lat, lng }).then((addressData: any) => {
            emit('locationChange', { lat, lng, address: addressData })
        }).catch((error: any) => {
            ElMessage.error(error.message || t('地址解析失败'))
        })
    }
}

// 更新地图位置（供外部调用）
const updateLocation = (lat: number, lng: number) => {
    if (!map || !marker) return

    if (mapType.value === 'tencent') {
        const TMap = (window as any).TMap
        if (!TMap) return
        const newCenter = new TMap.LatLng(lat, lng)
        map.setZoom(16)
        map.setCenter(newCenter)
        marker.updateGeometries({ id: 'center', position: newCenter })
    } else if (mapType.value === 'tianditu') {
        const T = (window as any).T
        if (!T) return
        const newCenter = new T.LngLat(lng, lat)

        // 移除旧标记
        map.removeOverLay(marker)

        // 创建新标记
        marker = new T.Marker(newCenter)
        map.addOverLay(marker)

        map.centerAndZoom(newCenter, 16)
    }
}

// 地址搜索（供外部调用）
const searchAddress = (address: string): Promise<{ lat: number, lng: number }> => {
    return new Promise((resolve, reject) => {
        if (!mapKey.value) {
            reject(new Error(t('地图配置未加载')))
            return
        }

        const waitForMap = () => {
            return new Promise<void>((resolveWait, rejectWait) => {
                if (map) {
                    resolveWait()
                    return
                }

                let attempts = 0
                const checkInterval = setInterval(() => {
                    attempts++
                    if (map) {
                        clearInterval(checkInterval)
                        resolveWait()
                    } else if (attempts > MAP_SEARCH_MAX_ATTEMPTS) {
                        clearInterval(checkInterval)
                        rejectWait(new Error(t('地图初始化超时')))
                    }
                }, MAP_SEARCH_INTERVAL)
            })
        }

        waitForMap().then(() => {
            if (mapType.value === 'tencent') {
                const TMap = (window as any).TMap
                if (!TMap?.service) {
                    reject(new Error(t('腾讯地图服务未加载')))
                    return
                }
                const geocoder = new TMap.service.Geocoder({ key: mapKey.value })
                geocoder.getLocation({ address }).then((result: any) => {
                    if (result.status === 0 && result.result?.location) {
                        const location = result.result.location
                        const lat = Number(location.lat)
                        const lng = Number(location.lng)
                        updateLocation(lat, lng)
                        resolve({ lat, lng })
                    } else {
                        reject(new Error(result.message || t('未找到该地址')))
                    }
                }).catch((error) => {
                    reject(error)
                })
            } else if (mapType.value === 'tianditu') {
                const T = (window as any).T
                if (!T) {
                    reject(new Error(t('天地图服务未加载')))
                    return
                }
                const geocoder = new T.Geocoder()
                geocoder.getPoint(address, (result: any) => {
                    if (result && result.status === '0' && result.location) {
                        const lat = result.location.lat
                        const lng = result.location.lon || result.location.lng
                        if (lat && lng) {
                            updateLocation(lat, lng)
                            resolve({ lat, lng })
                        } else {
                            reject(new Error(t('坐标解析失败')))
                        }
                    } else {
                        reject(new Error(result?.msg || t('未找到该地址')))
                    }
                })
            }
        }).catch(reject)
    })
}
// 添加圆
const addCircle = (center?: { lat: number; lng: number }, radius = 1000, options?: any) => {
    if (!map) return null
    const key = options?.key || `circle_${Date.now()}`
    let circle = null

    // 创建geometriesData对象
    const geometriesData = { key, center, radius, ...options }

    if (mapType.value === 'tencent') {
        createCircle(map, geometriesData, (selectedKey) => {
            // 触发selectChange事件
            emit('selectChange', selectedKey)
        })
        // 腾讯地图的createCircle不返回值，创建一个包含key的对象添加到overlays
        circle = { key, geometriesData }
    } else {
        circle = tdCreateCircle(map, geometriesData, (data) => {
            // 触发areaChange事件，确保path数据干净，不包含循环引用
            emit('areaChange', {
                key: data.key,
                type: 'circle',
                path: {
                    key: data.key,
                    center: data.center,
                    radius: data.radius
                }
            })
        }, (selectedKey) => {
            // 触发selectChange事件
            emit('selectChange', selectedKey)
        })
        // 为天地图添加geometriesData引用
        if (circle) {
            circle.geometriesData = geometriesData
        }
    }

    if (circle) overlays.value.push(circle)
    return circle
}

// 添加多边形
const addPolygon = (paths: any[], options?: any) => {
    if (!map) return null
    const key = options?.key || `poly_${Date.now()}`
    let poly = null

    // 创建geometriesData对象
    const geometriesData = { key, paths, ...options }

    if (mapType.value === 'tencent') {
        createPolygon(map, geometriesData, (selectedKey) => {
            // 触发selectChange事件
            emit('selectChange', selectedKey)
        })
        // 腾讯地图的createPolygon不返回值，创建一个包含key的对象添加到overlays
        poly = { key, geometriesData }
    } else {
        poly = tdCreatePolygon(map, geometriesData, (data) => {
            // 触发areaChange事件，确保path数据干净，不包含循环引用
            emit('areaChange', {
                key: data.key,
                type: 'polygon',
                path: {
                    key: data.key,
                    paths: data.paths.map((point: any) => ({
                        lat: point.lat,
                        lng: point.lng
                    }))
                }
            })
        }, (selectedKey) => {
            // 触发selectChange事件
            emit('selectChange', selectedKey)
        })
        // 为天地图添加geometriesData引用
        if (poly) {
            poly.geometriesData = geometriesData
        }
    }

    if (poly) overlays.value.push(poly)
    return poly
}

// 删除覆盖物
const removeOverlay = (overlay: any) => {
    if (!map || !overlay) return
    const key = overlay.key || ''
    mapType.value === 'tencent' ? deleteGeometry(key) : tdDeleteGeometry(map, key)

    // 通过key查找并删除覆盖物
    const idx = overlays.value.findIndex(item => item.key === key)
    if (idx > -1) overlays.value.splice(idx, 1)
}

// 清空所有覆盖物
const clearOverlays = () => {
    if (!map) return
    mapType.value === 'tencent'
        ? overlays.value.forEach(o => deleteGeometry(o.key))
        : clearAllGeometry(map)
    overlays.value = []
}

const selectGeo = (key: string) => {
    mapType.value === 'tencent' ? selectGeometry(key) : tdSelectGeometry(key)
}

// 监听选中key变化
watch(() => props.selectedKey, (newKey) => {
    if (newKey) {
        selectGeo(newKey)
    }
})

// 监听地图key和类型变化
watch([mapKey, mapType], ([newKey, newType]) => {
    if (newKey && newType) {
        initMap()
    }
})

onMounted(() => {
    getMapConfigData()
})

onBeforeUnmount(() => {
    if (map) {
        try {
            if (mapType.value === 'tencent') {
                map.destroy && map.destroy()
            } else if (mapType.value === 'tianditu') {
                clearOverlays()
                map.clearOverLays && map.clearOverLays()
            }
        } catch (e) {
        }
        map = null
        marker = null
        overlays.value = []
    }
})

defineExpose({
    updateLocation,
    searchAddress,
    addCircle,
    addPolygon,
    removeOverlay,
    clearOverlays,
    selectGeometry: selectGeo,
    getMap: () => map,
    getMarker: () => marker,
    handleLocationChange
})
</script>

<style scoped>
</style>