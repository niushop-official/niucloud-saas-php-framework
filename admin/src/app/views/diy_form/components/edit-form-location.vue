<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">

		<!-- 表单组件 字段内容设置 -->
		<slot name="field"></slot>
		<el-form label-width="100px" class="px-[10px]">
			<el-form-item :label="t('获取方式')">
				<el-radio-group v-model="diyStore.editComponent.mode">
					<el-radio class="!mr-[20px]" label="authorized_wechat_location">{{ t('授权微信定位') }}</el-radio>
					<el-radio label="open_choose_location">{{ t('手动选择定位') }}</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>

		<!-- 表单组件 其他设置 -->
		<slot name="other"></slot>
		<el-form label-width="100px" class="px-[10px]">
			<el-form-item class="display-block">
				<template #label>
					<div class="flex items-center">
						<span class="mr-[3px]">{{ t('隐私保护') }}</span>
						<el-tooltip effect="light" placement="top">
							<template #content>
								<p>会自动将提交的个人信息做加密展示。</p>
								<p>适用于公开展示收集的数据且不暴露用户隐私。</p>
							</template>
							<el-icon>
								<QuestionFilled color="#999999" />
							</el-icon>
						</el-tooltip>
					</div>
				</template>
				<el-switch v-model="diyStore.editComponent.field.privacyProtection" />
				<div class="text-sm text-gray-400">{{ t('提交后自动隐藏文本，仅管理员可查看') }}</div>
			</el-form-item>
		</el-form>

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
import useDiyStore from '@/stores/modules/diy'
import { ref } from 'vue'

const diyStore = useDiyStore()
diyStore.editComponent.ignore = ['componentBgUrl'] // 忽略公共属性

// 组件验证
diyStore.editComponent.verify = (index: number) => {
    const res = { code: true, message: '' }
	// todo 只需要考虑该组件自身的验证
    return res
}
defineExpose({})

</script>

<style lang="scss" scoped></style>
