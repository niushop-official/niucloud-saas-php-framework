<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('selectStyle') }}</h3>
			<div class="flex items-center mb-[18px] rounded overflow-hidden">
		        <span
				        class="iconfont iconsousuopc1 border-[1px] border-solid border-[#eee] cursor-pointer flex-1 flex items-center justify-center py-[5px]"
				        :class="{ 'border-[var(--el-color-primary)] text-[var(--el-color-primary)]': diyStore.editComponent.style == 'style1' }"
				        @click="diyStore.editComponent.style = 'style1'"></span>
				<span
						class="iconfont iconsousuokuangpc border-[1px] border-solid border-[#eee] cursor-pointer flex-1 flex items-center justify-center py-[5px]"
						:class="{ 'border-[var(--el-color-primary)] text-[var(--el-color-primary)]': diyStore.editComponent.style == 'style2' }"
						@click="diyStore.editComponent.style = 'style2'"></span>
			</div>
		</div>
		<!-- 搜索内容 -->
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('searchContent') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('searchContent')">
					<el-input v-model.trim="diyStore.editComponent.search_text" :placeholder="t('searchPlaceholder')" clearable maxlength="15" show-word-limit />
				</el-form-item>
			</el-form>
		</div>
	</div>

	<!-- 样式 -->
	<div class="style-wrap" v-show="diyStore.editTab == 'style'">
		<!--搜索样式 -->
		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('searchStyle') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				<el-form-item :label="t('borderStyle')">
					<span class="flex-1">{{ diyStore.editComponent.border_radius == 'square' ? '方形': '圆形' }}</span>
					<div class="flex items-center">
			              <span
					              class="o2o o2o-icon-gl-square border-[1px] border-solid border-[#eee] cursor-pointer flex-1 flex items-center px-[10px] justify-center"
					              :class="{ 'border-[var(--el-color-primary)] text-[var(--el-color-primary)]': diyStore.editComponent.border_radius == 'square' }"
					              @click="diyStore.editComponent.border_radius='square'"></span>
						<span
								class="o2o o2o-icon-yuanjiao border-[1px] border-solid border-[#eee] cursor-pointer flex-1 flex items-center justify-center px-[10px] "
								:class="{ 'border-[var(--el-color-primary)] text-[var(--el-color-primary)]': diyStore.editComponent.border_radius == 'circle' }"
								@click="diyStore.editComponent.border_radius = 'circle'"></span>
					</div>
				</el-form-item>
				<el-form-item :label="t('textColor')">
					<el-color-picker v-model="diyStore.editComponent.text_color" />
				</el-form-item>
				<el-form-item :label="t('bgColor')">
					<el-color-picker v-model="diyStore.editComponent.bg_color" />
				</el-form-item>
			</el-form>
		</div>
		<!-- 组件样式 -->
		<slot name="style"></slot>
	</div>

</template>

<script lang="ts" setup>
    import { t } from '@/lang'
    import useDiyStore from '@/stores/modules/diy'

    const diyStore = useDiyStore()
    diyStore.editComponent.ignore = [] // 忽略公共属性

    defineExpose({})
</script>

<style lang="scss" scoped></style>
