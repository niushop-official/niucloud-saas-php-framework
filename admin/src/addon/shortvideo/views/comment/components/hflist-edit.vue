<template>
	<el-dialog v-model="showDialog" :title="formData.id ? t('updateCommentReply') : t('addCommentReply')" width="50%"
		class="diy-dialog-wrap" :destroy-on-close="true">
		<el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form"
			v-loading="loading">

			<el-form-item :label="t('视频信息')" prop="video_id">
				<el-select class="input-width" v-model="formData.video_id" clearable :placeholder="t('请选择视频')">
					<el-option label="请选择" value=""></el-option>
					<el-option v-for="(item, index) in videoList" :key="index" :label="item['name']"
						:value="item['id']" />
				</el-select>
			</el-form-item>
			<el-form-item :label="t('memberId')" prop="member_id">
				<el-select class="input-width" v-model="formData.member_id" clearable
					:placeholder="t('memberIdPlaceholder')">
					<el-option label="请选择" value=""></el-option>
					<el-option v-for="(item, index) in memberIdList" :key="index" :label="item['nickname']"
						:value="item['member_id']" />
				</el-select>
			</el-form-item>
			<!-- <el-form-item :label="t('点赞数量')" prop="like_num" >
				<el-input v-model="formData.like_num" type="textarea " clearable :placeholder="t('请填写点赞数量')" class="input-width" />
			</el-form-item> -->
			<el-form-item :label="t('评价内容')" prop="content" >
				<el-input v-model="formData.content" type="textarea " clearable :placeholder="t('请填写评价内容')" class="" />
			</el-form-item>
			<el-form-item :label="t('status')">
				<el-select class="input-width" v-model="formData.status" clearable
					:placeholder="t('statusPlaceholder')">
					<el-option label="请选择" value=""></el-option>
					<el-option :label=" t('显示') " value="1" />
					<el-option :label=" t('隐藏') " value="0" />
				</el-select>
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
	import { addCommentReply, editCommentReply, getCommentReplyInfo } from '@/addon/shortvideo/api/comment_reply'

	import { getWithMemberList, getWithvideolist } from '@/addon/shortvideo/api/video'
	let showDialog = ref(false)
	const loading = ref(false)

	/**
	 * 表单数据
	 */
	const initialFormData = {
		id: '',
		video_id: '',
		member_id: '',
		content: '',
		status: '1',
		like_num:0
	}
	const formData : Record<string, any> = reactive({ ...initialFormData })

	const formRef = ref<FormInstance>()

	// 表单验证规则
	const formRules = computed(() => {
		return {
			video_id: [
				{ required: true, message: t('请选择视频'), trigger: 'blur' },
			],
			member_id: [
				{ required: true, message: t('memberIdPlaceholder'), trigger: 'blur' },
			],
			content: [
				{ required: true, message: t('评价内容'), trigger: 'blur' },
			],
			status: [
				{ required: true, message: t('statusPlaceholder'), trigger: 'blur' },

			]

		}
	})

	const emit = defineEmits(['complete'])

	/**
	 * 确认
	 * @param formEl
	 */
	const confirm = async (formEl : FormInstance | undefined) => {
		if (loading.value || !formEl) return
		let save = formData.id ? editCommentReply : addCommentReply

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
	let statusList = ref([])
	// const statusDictList = async () => {
	// statusList.value = await (await useDictionary('状态')).data.dictionary
	// }
	// statusDictList();
	// watch(() => statusList.value, () => { formData.status = statusList.value[0].value })

	const memberIdList = ref([] as any[])
	const setMemberIdList = async () => {
		memberIdList.value = await (await getWithMemberList({})).data
	}
	setMemberIdList()

	const videoList = ref([] as any[])
	const setvideolistList = async () => {
		videoList.value = await (await getWithvideolist({})).data
	}
	setvideolistList()


	const setFormData = async (row : any = null) => {
		Object.assign(formData, initialFormData)
		loading.value = true
		if (row) {
			const data = await (await getCommentReplyInfo(row.id)).data
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