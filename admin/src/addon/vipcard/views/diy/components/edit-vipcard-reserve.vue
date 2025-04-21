<template>
  <!-- 内容 -->
  <div class="content-wrap" v-show="diyStore.editTab == 'content'">
    <div class="edit-attr-item-wrap">
      <h3 class="mb-[10px]">{{ t('serve') }}</h3>
      <el-form label-width="80px" class="px-[10px]">
        <el-form-item :label="t('goodsSelectPopupSelectGoodsButton')">
          <el-radio-group v-model="diyStore.editComponent.source" :title="t('goodsSelectPopupSelectGoodsButton')">
            <el-radio label="all">{{ t('goodsSelectPopupAllGoods') }}</el-radio>
            <el-radio label="custom">{{ t('manualSelectionSources') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="t('serveNum')" v-if="diyStore.editComponent.source == 'all'">
          <el-slider show-input class="diy-nav-slider" v-model="diyStore.editComponent.count" size="small" :min="1" :max="30" />
        </el-form-item>
        <el-form-item :label="t('customGoods')" v-if="diyStore.editComponent.source == 'custom'">
          <goods-select-popup v-model="diyStore.editComponent.goods_ids" />
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
  import goodsSelectPopup from '@/addon/vipcard/views/components/goods-select-popup.vue'

  const diyStore = useDiyStore()
  diyStore.editComponent.ignore = [] // 忽略公共属性

  defineExpose({})
</script>

<style lang="scss" scoped></style>
