<template>
    <!-- 内容 -->
    <div class="content-wrap" v-show="diyStore.editTab == 'content'">
        <!-- 选择数据源 -->
        <div class="edit-attr-item-wrap">
            <h3 class="mb-[10px]">{{ t("selectSource") }}</h3>
            <el-form label-width="80px" class="px-[10px]">
                <el-form-item :label="t('hotelSelectPopupSelectHotelButton')">
                    <el-radio-group v-model="diyStore.editComponent.source" :title="t('hotelSelectPopupSelectHotelButton')">
                        <el-radio label="all">{{ t('hotelSelectPopupAllHotel') }}</el-radio>
                        <el-radio label="custom">{{ t('manualSelectionSources') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('goodsNum')" v-if="diyStore.editComponent.source == 'all'">
                    <el-slider show-input class="diy-nav-slider" v-model="diyStore.editComponent.num" :min="1" max="20" size="small" />
                </el-form-item>
                <el-form-item :label="t('customGoods')" v-if="diyStore.editComponent.source == 'custom'">
                    <hotel-select-popup ref="goodsSelectPopupRef" v-model="diyStore.editComponent.hotel_id" :min="1" :max="99" />
                </el-form-item>
            </el-form>
        </div>
    </div>

    <!-- 样式 -->
    <div class="style-wrap" v-show="diyStore.editTab == 'style'">
        <!-- 组件样式 -->
        <slot name="style"></slot>
    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import useDiyStore from '@/stores/modules/diy'
import hotelSelectPopup from '@/addon/tourism/views/components/hotel-select-popup.vue'

const diyStore: any = useDiyStore()
diyStore.editComponent.ignore = [] // 忽略公共属性
defineExpose({})

</script>

<style lang="scss" scoped></style>
