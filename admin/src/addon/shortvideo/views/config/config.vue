<template>
	<!--PC端-->
	<div class="main-container">
		<el-card class="box-card !border-none" shadow="never">

			<div class="flex justify-between items-center">
				<span class="text-page-title">{{ pageName }}</span>
			</div>

			<el-form class="page-form mt-[20px]" :model="formData" label-width="150px" ref="formRef">
				<!-- <el-form-item label="首页布局">
					<el-radio-group v-model="formData.index_type">
					  <el-radio :label="1">视频布局</el-radio>
					  <el-radio :label="2">瀑布流布局</el-radio>
					</el-radio-group>
				</el-form-item> -->
				<el-form-item label="发视频状态">
					<el-switch v-model="formData.open_fabu" />
				</el-form-item>
				<el-form-item label="评论开关状态">
					<el-switch v-model="formData.open_ping" />
				</el-form-item>
				<el-form-item label="评论是否审核">
					<el-switch v-model="formData.open_pingshen" />
				</el-form-item>
				<el-divider border-style="dashed" />
				<el-form-item label="免责协议">
					<editor v-model="formData.mianze"  :min-height="122"/>
				</el-form-item>


			</el-form>
		</el-card>

		<div class="fixed-footer-wrap">
			<div class="fixed-footer">
				<el-button type="primary" @click="save(formRef)">{{ t('save') }}</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref, watch } from 'vue'
	import { t } from '@/lang'
	import { getUrl } from '@/app/api/sys'
	import { ElMessage, FormInstance } from 'element-plus'
	import { useRoute } from 'vue-router'
	import { getset, saveset } from '@/addon/shortvideo/api/config'

	const route = useRoute()
	const pageName = route.meta.title
	const loading = ref(true)
	const top_json = ref([])

	const formData = reactive<Record<string, string | boolean | any>>({
		open_fabu:true,
		open_ping:true,
		open_pingshen:true,
		mianze:'',
	})

	const formRef = ref<FormInstance>()


	getset({

	}).then(res => {
		// Object.assign(formData, res.data) 
		// formData.index_type = res.data.index_type == 1 ? 1 : 2
		formData.open_fabu = res.data.open_fabu == 1 ? true : false
		formData.open_ping = res.data.open_ping == 1 ? true : false 
		formData.open_pingshen = res.data.open_pingshen == 1 ? true : false 
		formData.mianze = res.data.mianze 
	})

	const save = async (formEl : FormInstance | undefined) => {
		const data = {};
		data.mianze = formData.mianze; 
		// data.index_type = formData.index_type;
		data.open_fabu = formData.open_fabu ? 1 : 0;
		data.open_ping = formData.open_ping ? 1 : 0;  
		data.open_pingshen = formData.open_pingshen ? 1 : 0;  
		saveset(data).then(() => {
			ElMessage({
				message: '提交成功',
				type: 'success',
			})
			loading.value = false
			
		}).catch(() => {
			loading.value = false
		})
	}
</script>

<style lang="scss" scoped>
	.visit-btn {
		color: var(--el-color-primary);
	}
</style>