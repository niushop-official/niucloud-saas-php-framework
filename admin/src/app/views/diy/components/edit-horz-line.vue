<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('horzLineStyle') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('styleLabel')">
					<el-radio-group v-model="diyStore.editComponent.borderStyle">
						<el-radio label="solid">{{ t('horzLineStyleSolid') }}</el-radio>
						<el-radio label="dashed">{{ t('horzLineStyleDashed') }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item :label="t('horzLineBorderColor')">
					<el-color-picker v-model="diyStore.editComponent.borderColor" show-alpha :predefine="diyStore.predefineColors"/>
				</el-form-item>
				<el-form-item :label="t('horzLineBorderWidth')">
					<el-slider v-model="diyStore.editComponent.borderWidth" show-input size="small" class="ml-[10px] diy-nav-slider" :min="1" :max="10"/>
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

const diyStore = useDiyStore()
diyStore.editComponent.ignore = ['pageBgColor','componentBgColor', 'componentBgUrl', 'topRounded', 'bottomRounded'] // 忽略公共属性

defineExpose({})

</script>

<style lang="scss" scoped></style>
