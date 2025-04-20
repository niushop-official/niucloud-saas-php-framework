<template>
    <div class="main-container">
        <el-card class="card !border-none mb-[15px]" shadow="never">
            <el-page-header :content="id ? t('editScenic') : t('addScenic') " :icon="ArrowLeft" @click="router.push({ path: '/tourism/product/scenic/scenic' })" />
        </el-card>

        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('scenicName')" prop="scenic_name">
                    <el-input v-model.trim="formData.scenic_name" clearable :placeholder="t('scenicNamePlaceholder')" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('scenicLevel')" prop="scenic_level">
                    <el-select v-model="formData.scenic_level" clearable class="input-width">
                        <el-option :label="t('oneStar')" :value="1" />
                        <el-option :label="t('twoStar')" :value="2" />
                        <el-option :label="t('threeStar')" :value="3" />
                        <el-option :label="t('fourStar')" :value="4" />
                        <el-option :label="t('fiveStar')" :value="5" />
                    </el-select>
                    <!-- <el-input v-model="formData.scenic_level" clearable :placeholder="t('scenicLevelPlaceholder')" class="input-width" /> -->
                </el-form-item>
                <el-form-item :label="t('openTime')" class="input-width">
                    <el-input v-model.trim="formData.open_time" clearable :placeholder="t('openTimePlaceholder')" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('telephone')">
                    <el-input v-model.trim="formData.telephone" clearable :placeholder="t('telephonePlaceholder')" class="input-width" />
                </el-form-item>

                <el-form-item :label="t('scenicCover')" prop="scenic_cover">
                    <upload-image v-model="formData.scenic_cover" />
                </el-form-item>
                <el-form-item :label="t('scenicImgs')" prop="scenic_images">
                    <upload-image v-model="formData.scenic_images" limit="10" />
                </el-form-item>
                <el-form-item :label="t('poster')">
                    <el-select v-model="formData.poster_id" :placeholder="t('posterPlaceholder')" clearable>
                        <el-option v-for="item in posterOptions" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                    <div class="ml-[10px]">
                        <span class="cursor-pointer text-primary mr-[10px]" @click="refreshGoodsPoster(true)">{{ t('refresh') }}</span>
                        <span class="cursor-pointer text-primary" @click="toPosterEvent">{{ t('addGoodsPoster') }}</span>
                    </div>
                </el-form-item>
                <el-form-item :label="t('address')" prop="addressId">
                    <el-select v-model="formData.province_name" value-key="name" clearable class="input-width" @change="checkCity">
                        <el-option :label="t('provincePlaceholder')" value="" />
                        <el-option v-for="(provinceId, provinceIndex) in areaList.province " :key="provinceIndex" :label="provinceId.name" :value="provinceId" />
                    </el-select>
                    <el-select v-model="formData.city_name" value-key="id" clearable class="input-width ml-3" @change="checkDistrict">
                        <el-option :label="t('cityPlaceholder')" value="" />
                        <el-option v-for="(cityId, cityIndex) in areaList.city " :key="cityIndex" :label="cityId.name" :value="cityId" />
                    </el-select>
                    <el-select v-model="formData.district_name" value-key="id" clearable class="input-width ml-3" @change="check">
                        <el-option :label="t('districtPlaceholder')" value="" />
                        <el-option v-for="(districtId, districtIndex) in areaList.district " :key="districtIndex" :label="districtId.name" :value="districtId" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="t('detailAddress')" prop="address">
                    <el-input v-model.trim="formData.address" clearable :placeholder="t('detailAddressPlaceholder')" class="input-width" />
                    <el-button class="ml-3" @click="searchOn">{{ t('search') }}</el-button>
                </el-form-item>
                <el-form-item>
                    <div id="TxMap" class="w-[800px] h-[500px]"></div>
                </el-form-item>
                <el-form-item :label="t('scenicDesc')">
                    <editor v-model="formData.scenic_desc" />
                </el-form-item>
                <el-form-item :label="t('surround')">
                    <editor v-model="formData.surround" />
                </el-form-item>

            </el-form>
        </el-card>
        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(formRef)">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('cancel') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { getAreaListByPid, getAreatree, getAddressInfo, getContraryAddress, getMap } from '@/app/api/sys'
import { getScenicInfo, addScenic, editScenic } from '@/addon/tourism/api/tourism'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getPosterList } from "@/app/api/poster";

const route = useRoute()
const router = useRouter()
const id: number = parseInt(route.query.id as string)
const loading = ref(false)

interface areaType {
    province: any[],
    city: any[],
    district: any[]
}

const areaList = reactive<areaType>({
    province: [],
    city: [],
    district: []
})

const checkAreatress = () => {
    getAreatree(1).then(res => {
        areaList.province = res.data
    })
}
checkAreatress()
const checkCity = (arr: any) => {
    if (Object.keys(arr).length == 0) {
        arr.id = formData.province_id
    } else {
        formData.province_id = arr.id
        formData.province_name = arr.name
    }
    getAreaListByPid(arr.id).then(res => {
        areaList.city = res.data
    })
}
const checkDistrict = (arr: any) => {
    if (Object.keys(arr).length == 0) {
        arr.id = formData.city_id
    } else {
        formData.city_id = arr.id
        formData.city_name = arr.name
    }
    getAreaListByPid(arr.id).then(res => {
        areaList.district = res.data
    })
}
const check = (arr: any) => {
    formData.district_id = arr.id
    formData.district_name = arr.name
}

const searchOn = () => {
    if (formData.province_id && formData.city_id && formData.district_id && formData.address) {
        getAddressInfo({
            address: formData.province_name + formData.city_name + formData.district_name + formData.address
        }).then(res => {
            formData.latitude = res.data.result.location.lat
            formData.longitude = res.data.result.location.lng
        })
    }
}

let mapFn: any = null
const initMap = () => {
    // 定义地图中心点坐标
    let latitude = formData.latitude
    let longitude = formData.longitude
    if (formData.latitude == 0) latitude = '39.90469'
    if (formData.longitude == 0) longitude = '116.40717'

    const center = new window.TMap.LatLng(latitude, longitude)
    // 定义map变量，调用 TMap.Map() 构造函数创建地图
    mapFn = new window.TMap.Map('TxMap', {
        center: center, // 设置地图中心点坐标
        zoom: 17, // 设置地图缩放级别
        viewMode: '2D', // 设置2D模式
        showControl: true // 去掉控件
    })

    mapFn.on('click', (evt: any) => {
        const evtModel = {
            lat: evt.latLng.getLat().toFixed(6),
            lng: evt.latLng.getLng().toFixed(6)
        }
        getAddressInfoTo(evtModel.lat, evtModel.lng, 1)
        markerLayer.updateGeometries({
            id: 'shop',
            position: evt.latLng
        })
    })

    const markerLayer = new window.TMap.MultiMarker({
        id: 'marker-layer',
        map: mapFn, // 显示Marker图层的底图
        minimumClusterSize: 1
    })
    markerLayer.updateGeometries({
        id: 'shop',
        position: center
    })

    mapFn.on('idle', () => {
        watch(() => formData.latitude, (newVal, oldVal) => {
            const latLng = new window.TMap.LatLng(formData.latitude, formData.longitude)
            mapFn.panTo(latLng, 1)
            markerLayer.updateGeometries({
                id: 'shop',
                position: latLng
            })
        })
    })
}
onMounted(() => {
    const mapScript = document.createElement('script')
    getMap().then(res => {
        mapScript.type = 'text/javascript'
        mapScript.src = 'https://map.qq.com/api/gljs?v=1.exp&key=' + res.data.key
        document.body.appendChild(mapScript)
    })
    mapScript.onload = () => {
        // 加载完成后初始化地图
        setTimeout(() => {
            // 需要定时执行的代码
            initMap()
        }, 500)
    }
})

const getAddressInfoTo = (lat: any, lng: any, type: any) => {
    getContraryAddress({
        location: lat + ',' + lng
    }).then(res => {
        if (res.data.result) {
            formData.province_name = res.data.result.address_component.province
            formData.city_name = res.data.result.address_component.city
            formData.district_name = res.data.result.address_component.district
            if (type == 1) {
                formData.address = res.data.result.formatted_addresses.recommend
                formData.full_address = formData.province_name + formData.city_name + formData.district_name + formData.address
                formData.latitude = lat
                formData.longitude = lng
            }
        } else {
            ElMessage({
                type: 'warning',
                message: res.data.message
            })
        }
    })
}

/**
 * 表单数据
 */
const initialFormData = {
    scenic_id: 0,
    scenic_name: '',
    latitude: 0,
    longitude: 0,
    province_id: 0,
    province_name: '',
    city_id: 0,
    city_name: '',
    district_id: 0,
    district_name: '',
    address: '',
    scenic_level: '',
    open_time: '',
    telephone: '',
    scenic_desc: '',
    surround: '',
    scenic_cover: '',
    scenic_images: '',
    full_address: '',
    poster_id: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const setFormData = async(id: number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getScenicInfo(id)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    if (formData.province_id > 0) checkCity({})
    if (formData.city_id > 0) checkDistrict({})
}
if (id) setFormData(id)

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        scenic_name: [
            { required: true, message: t('scenicNamePlaceholder'), trigger: 'blur' }
        ],
        scenic_level: [
            { required: true, message: t('scenicLevelPlaceholder'), trigger: 'blur' }
        ],
        scenic_cover: [
            { required: true, message: t('scenicCoverPlaceholder'), trigger: 'blur' }
        ],
        addressId: [
            { required: true, validator: validatePass, trigger: 'blur' }
        ]
    }
})

const validatePass = (rule: any, value: any, callback: any) => {
    if (formData.province_name == '' || formData.city_name == '' || formData.district_name == '') {
        callback(new Error(t('addressPlaceholder')))
    }
    callback()
}

const onSave = async(formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async(valid) => {
        if (valid) {
            loading.value = true

            const data = formData
            const save = id ? editScenic : addScenic
            save(data).then(res => {
                loading.value = false
                history.back()
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

// 海报列表下拉框
const posterOptions = reactive([])

// 跳转到海报列表，添加海报
const toPosterEvent = () => {
    const url = router.resolve({
        path: '/poster/list'
    })
    window.open(url.href)
}

// 商品海报
const refreshGoodsPoster = (bool = false) => {
    getPosterList({
        type: 'tourism_scenic'
    }).then((res) => {
        const data = res.data
        if (data) {
            posterOptions.splice(0, posterOptions.length, ...data)
            if (bool) {
                ElMessage({
                    message: t('refreshSuccess'),
                    type: 'success'
                })
            }
        }
    })
}

refreshGoodsPoster()

const back = () => {
    history.back()
}
</script>

<style lang="scss" scoped>
.fixed-footer {
    z-index: 4 !important
}
</style>
