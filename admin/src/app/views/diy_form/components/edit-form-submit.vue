<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">
		<div class="edit-attr-item-wrap">
            <el-form label-width="80px" class="px-[10px]">
	            <el-form-item :label="t('按钮位置')" class="display-block">
		            <el-radio-group v-model="diyStore.editComponent.btnPosition" @change="btnPositionChangeFn">
			            <el-radio label="follow_content">{{ t('跟随内容') }}</el-radio>
			            <el-radio label="hover_screen_bottom">{{ t('悬浮屏幕底部') }}</el-radio>
		            </el-radio-group>
		            <div class="text-sm text-gray-400 mb-[5px] leading-[1.4]" v-show="diyStore.editComponent.btnPosition == 'follow_content'">{{ t('当表单内容多时，只有滚动页面至最底部才会显示提交按钮') }}</div>
		            <div class="text-sm text-gray-400 mb-[5px]" v-show="diyStore.editComponent.btnPosition == 'hover_screen_bottom'">{{ t('按钮悬浮在屏幕底部，方便填表人快速提交') }}</div>
                    <div class="text-sm text-gray-400 mb-[10px] leading-[1.4]">{{ t('若前端以嵌入形式调用表单，提交按钮组件将不显示，相关业务由该页面负责处理') }}</div>
	            </el-form-item>
			</el-form>

		</div>

		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('提交按钮') }}</h3>
			<el-form label-width="80px" class="px-[10px]" @submit.prevent>
				<el-form-item :label="t('按钮名称')">
					<el-input v-model.trim="diyStore.editComponent.submitBtn.text" :placeholder="t('请输入按钮名称')" clearable maxlength="10" show-word-limit />
				</el-form-item>
				<el-form-item :label="t('textColor')">
					<el-color-picker v-model="diyStore.editComponent.submitBtn.color" />
				</el-form-item>
				<el-form-item :label="t('背景色')">
					<el-color-picker v-model="diyStore.editComponent.submitBtn.bgColor" />
				</el-form-item>
			</el-form>
		</div>

		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('重置按钮') }}</h3>
			<el-form label-width="80px" class="px-[10px]" @submit.prevent>
				<el-form-item :label="t('carouselSearchTabControl')">
					<el-switch v-model="diyStore.editComponent.resetBtn.control" />
				</el-form-item>
				<el-form-item :label="t('按钮名称')">
					<el-input v-model.trim="diyStore.editComponent.resetBtn.text" :placeholder="t('请输入按钮名称')" clearable maxlength="10" show-word-limit />
				</el-form-item>
				<el-form-item :label="t('textColor')">
					<el-color-picker v-model="diyStore.editComponent.resetBtn.color" />
				</el-form-item>
				<el-form-item :label="t('背景色')">
					<el-color-picker v-model="diyStore.editComponent.resetBtn.bgColor" />
				</el-form-item>
			</el-form>
		</div>

	</div>

	<!-- 样式 -->
	<div class="style-wrap" v-show="diyStore.editTab == 'style'">

		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('按钮样式') }}</h3>
				<el-form label-width="100px" class="px-[10px]">
				<el-form-item :label="t('topRounded')">
					<el-slider v-model="diyStore.editComponent.topElementRounded" show-input size="small" class="ml-[10px] diy-nav-slider" :max="50" />
				</el-form-item>
				<el-form-item :label="t('bottomRounded')">
					<el-slider v-model="diyStore.editComponent.bottomElementRounded" show-input size="small" class="ml-[10px] diy-nav-slider" :max="50" />
				</el-form-item>
			</el-form>
		</div>

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

// 单选
const btnPositionChangeFn = (e)=>{
    if(e == 'hover_screen_bottom'){
        diyStore.editComponent.margin.bottom = 0;
        diyStore.editComponent.margin.both = 0;
        diyStore.editComponent.margin.top = 0;
    }
}

// 组件验证
diyStore.editComponent.verify = (index: number) => {
	const res = { code: true, message: '' }
	if (diyStore.value[index].submitBtn.text == '') {
		res.code = false;
		res.message = t('请输入提交按钮名称');
		return res;
	}
	if (diyStore.value[index].resetBtn.text == '') {
		res.code = false;
		res.message = t('请输入重置按钮名称');
		return res;
	}

	return res
}

defineExpose({})

</script>

<style lang="scss" scoped></style>
