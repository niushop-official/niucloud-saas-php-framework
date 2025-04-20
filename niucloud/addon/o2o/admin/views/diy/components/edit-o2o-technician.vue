<template>
    <!-- 内容 -->
    <div class="content-wrap" v-show="diyStore.editTab == 'content'" >
        <div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('imageSet') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('imageHeight')" class="display-block">
					<el-input v-model.trim="diyStore.editComponent.imageHeight" :placeholder="t('imageHeightPlaceholder')" clearable maxlength="10" @blur="blurImageHeight">
						<template #append>px</template>
					</el-input>
					<div class="text-sm text-gray-400 mb-[10px]">{{ t('imageAdsTips') }}</div>
				</el-form-item>
				<div ref="imageBoxRef">
					<div  class="item-wrap !cursor-move p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]">
						<el-form-item :label="t('image')">
							<upload-image v-model="diyStore.editComponent.imageUrl" :limit="1" @change="selectImg" />
						</el-form-item>
					</div>
				</div>
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
import { ref } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'

import useDiyStore from '@/stores/modules/diy'

const diyStore = useDiyStore()
diyStore.editComponent.ignore = [] // 忽略公共属性

// 组件验证
diyStore.editComponent.verify = (index: number) => {
    const res = { code: true, message: '' }
    if (diyStore.value[index].imageHeight == 0) {
        res.code = false
        res.message = t('imageHeightPlaceholder')
        return res
    }
    if (!/^\d+.?\d{0,2}$/.test(diyStore.value[index].imageHeight)) {
        res.code = false
        res.message = t('imageHeightRegNum')
        return res
    }
    return res
}

const selectImg = (url: string) => {
    handleHeight()
}

// 处理高度
const handleHeight = () => {
    const image = new Image()
    image.src = img(diyStore.editComponent.imageUrl)
    image.onload = async () => {
        diyStore.editComponent.imgWidth = image.width
        diyStore.editComponent.imgHeight = image.height
    }
}

const blurImageHeight = () => {
    diyStore.editComponent.imageHeight = parseInt(diyStore.editComponent.imageHeight)
}

const imageBoxRef = ref()

defineExpose({})
</script>

<style lang="scss" scoped>

</style>
