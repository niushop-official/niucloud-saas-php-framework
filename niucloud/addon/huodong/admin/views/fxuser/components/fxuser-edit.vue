<template>
	<el-dialog v-model="showDialog" :title="formData.id ? t('updateFxuser') : t('addFxuser')" width="50%"
		class="diy-dialog-wrap" :destroy-on-close="true">
		<el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form"
			v-loading="loading">
			<!-- <el-form-item :label="t('memberId')">
				<el-select class="input-width" v-model="formData.member_id" clearable
					:placeholder="t('memberIdPlaceholder')">
					<el-option label="请选择" value=""></el-option>
					<el-option v-for="(item, index) in memberIdList" :key="index" :label="item['nickname']"
						:value="item['member_id']" />
				</el-select>
			</el-form-item>

			<el-form-item :label="t('type')">
				<el-input v-model="formData.type" clearable :placeholder="t('typePlaceholder')" class="input-width" />
			</el-form-item>

			<el-form-item :label="t('name')">
				<el-input v-model="formData.name" clearable :placeholder="t('namePlaceholder')" class="input-width" />
			</el-form-item>

			<el-form-item :label="t('mobile')">
				<el-input v-model="formData.mobile" clearable :placeholder="t('mobilePlaceholder')"
					class="input-width" />
			</el-form-item>

			<el-form-item :label="t('idcard')">
				<el-input v-model="formData.idcard" clearable :placeholder="t('idcardPlaceholder')"
					class="input-width" />
			</el-form-item>

			<el-form-item :label="t('sfz1')">
				<upload-image v-model="formData.sfz1" />
			</el-form-item>

			<el-form-item :label="t('sfz2')">
				<upload-image v-model="formData.sfz2" />
			</el-form-item>

			<el-form-item :label="t('yingImage')">
				<upload-image v-model="formData.ying_image" />
			</el-form-item> -->

			<el-form-item :label="t('status')" >
			    <el-select class="input-width"  v-model="formData.status" clearable :placeholder="t('statusPlaceholder')"> 
			      <el-option :label=" t('审核通过') "  value="2"/>
			      <el-option :label=" t('拒绝驳回') "  value="-1"/>
			      <el-option :label=" t('待审核') "  value="1"/>
			    </el-select>
			</el-form-item>
			<el-form-item :label="t('fail_msg')" v-if="formData.status==-1">
				<el-input v-model="formData.fail_msg" clearable :placeholder="t('拒绝原因')" class="input-width" />
			</el-form-item>

		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
				<el-button type="primary" :loading="loading" @click="confirm(formRef)">{{
                    t('confirm')
                }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
	import { ref, reactive, computed, watch } from 'vue'
	import { useDictionary } from '@/app/api/dict'
	import { t } from '@/lang'
	import type { FormInstance } from 'element-plus'
	import { addFxuser, editFxuser, getFxuserInfo, getWithMemberList } from '@/addon/huodong/api/fxuser'

	let showDialog = ref(false)
	const loading = ref(false)

	/**
	 * 表单数据
	 */
	const initialFormData = {
		id: '',
		member_id: '',
		type: '',
		name: '',
		mobile: '',
		idcard: '',
		sfz1: '',
		sfz2: '',
		ying_image: '',
		status: 1,
		fail_msg:''

	}
	const formData : Record<string, any> = reactive({ ...initialFormData })

	const formRef = ref<FormInstance>()

	// 表单验证规则
	const formRules = computed(() => {
		return {
			member_id: [
				{ required: true, message: t('memberIdPlaceholder'), trigger: 'blur' },

			]
			,
			type: [
				{ required: true, message: t('typePlaceholder'), trigger: 'blur' },

			]
			,
			name: [
				{ required: true, message: t('namePlaceholder'), trigger: 'blur' },

			]
			,
			mobile: [
				{ required: true, message: t('mobilePlaceholder'), trigger: 'blur' },

			]
			,
			idcard: [
				{ required: true, message: t('idcardPlaceholder'), trigger: 'blur' },

			]
			,
			sfz1: [
				{ required: true, message: t('sfz1Placeholder'), trigger: 'blur' },

			]
			,
			sfz2: [
				{ required: true, message: t('sfz2Placeholder'), trigger: 'blur' },

			]
			,
			ying_image: [
				{ required: true, message: t('yingImagePlaceholder'), trigger: 'blur' },

			]
			,
			status: [
				{ required: true, message: t('statusPlaceholder'), trigger: 'blur' },

			]
			,
		}
	})

	const emit = defineEmits(['complete'])

	/**
	 * 确认
	 * @param formEl
	 */
	const confirm = async (formEl : FormInstance | undefined) => {
		if (loading.value || !formEl) return
		let save = formData.id ? editFxuser : addFxuser

		await formEl.validate(async (valid) => {
			if (valid) {
				loading.value = true

				let data = formData

				save(data).then(res => {
					loading.value = false
					showDialog.value = false
					emit('complete')
				}).catch(err => {
					loading.value = false
				})
			}
		})
	}

	// 获取字典数据



	const memberIdList = ref([] as any[])
	const setMemberIdList = async () => {
		memberIdList.value = await (await getWithMemberList({})).data
	}
	setMemberIdList()
	const setFormData = async (row : any = null) => {
		Object.assign(formData, initialFormData)
		loading.value = true
		if (row) {
			const data = await (await getFxuserInfo(row.id)).data
			if (data) Object.keys(formData).forEach((key : string) => {
				if (data[key] != undefined) formData[key] = data[key]
			})
		}
		loading.value = false
	}

	// 验证手机号格式
	const mobileVerify = (rule : any, value : any, callback : any) => {
		if (value && !/^1[3-9]\d{9}$/.test(value)) {
			callback(new Error(t('generateMobile')))
		} else {
			callback()
		}
	}

	// 验证身份证号
	const idCardVerify = (rule : any, value : any, callback : any) => {
		if (value && !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
			callback(new Error(t('generateIdCard')))
		} else {
			callback()
		}
	}

	// 验证邮箱号
	const emailVerify = (rule : any, value : any, callback : any) => {
		if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
			callback(new Error(t('generateEmail')))
		} else {
			callback()
		}
	}

	// 验证请输入整数
	const numberVerify = (rule : any, value : any, callback : any) => {
		if (!Number.isInteger(value)) {
			callback(new Error(t('generateNumber')))
		} else {
			callback()
		}
	}

	defineExpose({
		showDialog,
		setFormData
	})
</script>

<style lang="scss" scoped></style>
<style lang="scss">
	.diy-dialog-wrap .el-form-item__label {
		height: auto !important;
	}
</style>