<template>
    <u-popup :show="show" @close="show = false" mode="bottom" :round="10" :safe-area-inset-bottom="true">
        <view class="area-picker-container">
            <view class="header">
                <text class="title">请选择地区</text>
                <text class="close-icon" @click="handleClose">
                    <u-icon name="close" size="18" color="#999"></u-icon>
                </text>
            </view>
            <view class="selected-path">
                <text>{{ selectedText }}</text>
            </view>
            <view class="columns">
                <!-- 省份列 -->
                <scroll-view :scroll-into-view="'province-' + (selected.province?.id || '')" scroll-y="true" class="column">
                    <view v-for="item in areaList.province" :key="item.id" :id="'province-' + item.id" class="item"
                        :class="{ 'active': selected.province && selected.province.id === item.id }"
                        @click="selected.province = item">
                        <text class="item-text">{{ item.name }}</text>
                        <u-icon v-if="selected.province && selected.province.id === item.id" name="checkbox-mark" color="var(--primary-color)" size="18"></u-icon>
                    </view>
                </scroll-view>

                <!-- 城市列 -->
                <scroll-view v-if="areaList.city.length" :scroll-into-view="'city-' + (selected.city?.id || '')" scroll-y="true" class="column">
                    <view v-for="item in areaList.city" :key="item.id" :id="'city-' + item.id" class="item"
                        :class="{ 'active': selected.city && selected.city.id === item.id }"
                        @click="selected.city = item">
                        <text class="item-text">{{ item.name }}</text>
                        <u-icon v-if="selected.city && selected.city.id === item.id" name="checkbox-mark"
                                color="var(--primary-color)" size="18"></u-icon>
                    </view>
                </scroll-view>

                <!-- 区县列 -->
                <scroll-view v-if="areaList.district.length" :scroll-into-view="'district-' + (selected.district?.id || '')" scroll-y="true" class="column">
                    <view v-for="item in areaList.district" :key="item.id" :id="'district-' + item.id" class="item"
                        :class="{ 'active': selected.district && selected.district.id === item.id }"
                        @click="selected.district = item">
                        <text class="item-text">{{ item.name }}</text>
                        <u-icon v-if="selected.district && selected.district.id === item.id" name="checkbox-mark" color="var(--primary-color)" size="18"></u-icon>
                    </view>
                </scroll-view>
            </view>
        </view>
    </u-popup>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { getAreaListByPid, getAreaByCode } from '@/app/api/system'

const prop = defineProps({
    areaId: {
        type: Number,
        default: 0
    }
})

const show = ref(false)
const areaList = reactive({
    province: [] as any[],
    city: [] as any[],
    district: [] as any[]
})

const selected = reactive({
    province: null as any,
    city: null as any,
    district: null as any
})

// 原始数据加载逻辑
getAreaListByPid(0).then((res: any) => {
    areaList.province = res.data
}).catch()

// 根据ID初始化
watch(() => prop.areaId, (nval, oval) => {
    if (nval && !oval) {
        getAreaByCode(nval).then((res: any) => {
            const { data } = res;
            data.province && (selected.province = data.province);
            data.city && (selected.city = data.city);
            data.district && (selected.district = data.district);
            if (data.city == undefined && data.province && data.district) {
                selected.city = data.district;
                selected.district = null;
            }
        })
    }
}, {
    immediate: true
})

// 监听省份选择 (适配UI，选择新省份时清空下级)
watch(() => selected.province, (newVal) => {
    selected.city = null
    selected.district = null
    areaList.district = []

    if (newVal) {
        getAreaListByPid(newVal.id).then((res: any) => {
            areaList.city = res.data
        }).catch()
    } else {
        areaList.city = []
    }
}, { deep: true })

// 监听城市选择 (适配UI，选择新城市时清空下级)
watch(() => selected.city, (newVal) => {
    selected.district = null

    if (newVal) {
        getAreaListByPid(newVal.id).then((res: any) => {
            const { data } = res;
            areaList.district = data
            if (!data.length) { // 如果没有区县，则选择完成
                emits('complete', selected)
                show.value = false
            }
        }).catch()
    } else {
        areaList.district = []
    }
}, { deep: true })

const emits = defineEmits(['complete'])

// 监听区县选择
watch(() => selected.district, (newVal) => {
    if (newVal) {
        emits('complete', selected)
        show.value = false
    }
}, { deep: true })

const handleClose = () => {
    show.value = false
}

const open = () => {
    show.value = true
}

// 顶部显示文本
const selectedText = computed(() => {
    const parts = []
    if (selected.province) parts.push(selected.province.name)
    if (selected.city) parts.push(selected.city.name)
    if (selected.district) parts.push(selected.district.name)
    if (parts.length === 0) return "请选择您所在的地区"
    return parts.join(' / ')
})

defineExpose({
    open
})
</script>

<style lang="scss" scoped>
.area-picker-container {
    display: flex;
    flex-direction: column;
    height: 75vh;
    background-color: #f8f8f8;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 30rpx;
    border-bottom: 1px solid #eee;

    .title {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
    }

    .close-icon {
        padding: 10rpx;
    }
}

.selected-path {
    padding: 20rpx 30rpx;
    font-size: 28rpx;
    color: var(--primary-color);
    background-color: #fff;
    border-bottom: 1px solid #eee;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.columns {
    display: flex;
    flex: 1;
    overflow: hidden;
    background-color: #fff;
}

.column {
    flex: 1;
    height: 100%;
    width: 33.33%;

    &:not(:last-child) {
        border-right: 1px solid #eee;
    }
}

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 30rpx;
    font-size: 28rpx;
    color: #333;
    transition: background-color 0.2s;

    &:active {
        background-color: #f5f5f5;
    }

    &.active {
        color: var(--primary-color);
        font-weight: 600;
        background-color: var(--primary-color-light);
    }

    .item-text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
