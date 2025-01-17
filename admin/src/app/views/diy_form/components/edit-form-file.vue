<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">

		<!-- 表单组件 字段内容设置 -->
		<slot name="field"></slot>
		<el-form label-width="100px" class="px-[10px]" @submit.prevent>
			<el-form-item :label="t('限制上传大小')">
				<el-input v-model.trim="diyStore.editComponent.limitUploadSize" clearable maxlength="15" />
				/单位MB，目前是Bit，要转换，*1024
			</el-form-item>
		</el-form>

		<!-- 表单组件 其他设置 -->
		<slot name="other"></slot>

	</div>

	<!-- 样式 -->
	<div class="style-wrap" v-show="diyStore.editTab == 'style'">

		<!-- 表单组件 字段样式 -->
		<slot name="style-field"></slot>

		<!-- 组件样式 -->
		<slot name="style"></slot>

	</div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref } from 'vue'
import useDiyStore from '@/stores/modules/diy'

const diyStore = useDiyStore()
diyStore.editComponent.ignore = ['componentBgUrl'] // 忽略公共属性

defineExpose({})

</script>

<style lang="scss" scoped></style>
