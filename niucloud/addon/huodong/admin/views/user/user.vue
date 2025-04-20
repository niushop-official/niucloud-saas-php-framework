<template>
	<div class="main-container">
		<el-card class="box-card !border-none" shadow="never">

			<div class="flex justify-between items-center">
				<span class="text-lg">{{pageName}}</span>
				<!-- <el-button type="primary" @click="addEvent">
					{{ t('addUser') }}
				</el-button> -->
			</div>

			<el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
				<el-form :inline="true" :model="userTable.searchParam" ref="searchFormRef">

					 

					<el-form-item :label="t('realname')" prop="realname">
						<el-input v-model="userTable.searchParam.realname" :placeholder="t('realnamePlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('mobile')" prop="mobile">
						<el-input v-model="userTable.searchParam.mobile" :placeholder="t('mobilePlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('idcard')" prop="idcard">
						<el-input v-model="userTable.searchParam.idcard" :placeholder="t('idcardPlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('adddate')" prop="adddate">
						<el-date-picker v-model="userTable.searchParam.adddate" type="datetimerange"
							format="YYYY-MM-DD hh:mm:ss" :start-placeholder="t('startDate')"
							:end-placeholder="t('endDate')" />
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="loadUserList()">{{ t('search') }}</el-button>
						<el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
					</el-form-item>
				</el-form>
			</el-card>

			<div class="mt-[10px]">
				<el-table :data="userTable.data" size="large" v-loading="userTable.loading">
					<template #empty>
						<span>{{ !userTable.loading ? t('emptyData') : '' }}</span>
					</template>
					<el-table-column prop="id" :label="t('id')" min-width="120" :show-overflow-tooltip="true" />

					<el-table-column prop="member_id_name" :label="t('memberId')" min-width="120"
						:show-overflow-tooltip="true" />

					<el-table-column prop="realname" :label="t('realname')" min-width="120"
						:show-overflow-tooltip="true" />

					<el-table-column prop="mobile" :label="t('mobile')" min-width="120" :show-overflow-tooltip="true" />

					<el-table-column prop="idcard" :label="t('idcard')" min-width="120" :show-overflow-tooltip="true" />
					<el-table-column prop="order_num" :label="t('报名次数')" min-width="120" :show-overflow-tooltip="true" />

					<el-table-column prop="adddate" :label="t('adddate')" min-width="120"
						:show-overflow-tooltip="true" />

					<el-table-column :label="t('operation')" fixed="right" min-width="120">
						<template #default="{ row }">
							<el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
							<el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
						</template>
					</el-table-column>

				</el-table>
				<div class="mt-[16px] flex justify-end">
					<el-pagination v-model:current-page="userTable.page" v-model:page-size="userTable.limit"
						layout="total, sizes, prev, pager, next, jumper" :total="userTable.total"
						@size-change="loadUserList()" @current-change="loadUserList" />
				</div>
			</div>

			<edit ref="editUserDialog" @complete="loadUserList" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref, watch } from 'vue'
	import { t } from '@/lang'
	import { useDictionary } from '@/app/api/dict'
	import { getUserList, deleteUser, getWithMemberList } from '@/addon/huodong/api/user'
	import { img } from '@/utils/common'
	import { ElMessageBox, FormInstance } from 'element-plus'
	import Edit from '@/addon/huodong/views/user/components/user-edit.vue'
	import { useRoute } from 'vue-router'
	const route = useRoute()
	const pageName = route.meta.title;

	let userTable = reactive({
		page: 1,
		limit: 10,
		total: 0,
		loading: true,
		data: [],
		searchParam: {
			"member_id": "",
			"realname": "",
			"mobile": "",
			"idcard": "",
			"adddate": []
		}
	})

	const searchFormRef = ref<FormInstance>()

	// 选中数据
	const selectData = ref<any[]>([])

	// 字典数据


	/**
	 * 获取报名者信息列表
	 */
	const loadUserList = (page : number = 1) => {
		userTable.loading = true
		userTable.page = page

		getUserList({
			page: userTable.page,
			limit: userTable.limit,
			...userTable.searchParam
		}).then(res => {
			userTable.loading = false
			userTable.data = res.data.data
			userTable.total = res.data.total
		}).catch(() => {
			userTable.loading = false
		})
	}
	loadUserList()

	const editUserDialog : Record<string, any> | null = ref(null)

	/**
	 * 添加报名者信息
	 */
	const addEvent = () => {
		editUserDialog.value.setFormData()
		editUserDialog.value.showDialog = true
	}

	/**
	 * 编辑报名者信息
	 * @param data
	 */
	const editEvent = (data : any) => {
		editUserDialog.value.setFormData(data)
		editUserDialog.value.showDialog = true
	}

	/**
	 * 删除报名者信息
	 */
	const deleteEvent = (id : number) => {
		ElMessageBox.confirm(t('userDeleteTips'), t('warning'),
			{
				confirmButtonText: t('confirm'),
				cancelButtonText: t('cancel'),
				type: 'warning',
			}
		).then(() => {
			deleteUser(id).then(() => {
				loadUserList()
			}).catch(() => {
			})
		})
	}


	
	const resetForm = (formEl : FormInstance | undefined) => {
		if (!formEl) return
		formEl.resetFields()
		loadUserList()
	}
</script>

<style lang="scss" scoped>
	/* 多行超出隐藏 */
	.multi-hidden {
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>