<template>
	<div class="main-container">
		<el-card class="box-card !border-none" shadow="never">

			<div class="flex justify-between items-center">
				<span class="text-lg">{{pageName}}</span>
				<!-- <el-button type="primary" @click="addEvent">
					{{ t('addFxbill') }}
				</el-button> -->
			</div>

			<el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
				<el-form :inline="true" :model="fxbillTable.searchParam" ref="searchFormRef">

					<!-- <el-form-item :label="t('memberId')" prop="member_id">
						<el-select class="w-[280px]" v-model="fxbillTable.searchParam.member_id" clearable
							:placeholder="t('memberIdPlaceholder')">
							<el-option v-for="(item, index) in memberIdList" :key="index" :label="item['nickname']"
								:value="item['member_id']" />
						</el-select>
					</el-form-item>

					<el-form-item :label="t('accountType')" prop="account_type">
						<el-input v-model="fxbillTable.searchParam.account_type"
							:placeholder="t('accountTypePlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('accountData')" prop="account_data">
						<el-input v-model="fxbillTable.searchParam.account_data"
							:placeholder="t('accountDataPlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('accountSum')" prop="account_sum">
						<el-input v-model="fxbillTable.searchParam.account_sum"
							:placeholder="t('accountSumPlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('fromType')" prop="from_type">
						<el-input v-model="fxbillTable.searchParam.from_type" :placeholder="t('fromTypePlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('relatedId')" prop="related_id">
						<el-input v-model="fxbillTable.searchParam.related_id"
							:placeholder="t('relatedIdPlaceholder')" />
					</el-form-item> -->
					<el-form-item :label="t('createTime')" prop="create_time">
						<el-date-picker v-model="fxbillTable.searchParam.create_time" type="datetimerange"
							format="YYYY-MM-DD hh:mm:ss" :start-placeholder="t('startDate')"
							:end-placeholder="t('endDate')" />
					</el-form-item>

					<!-- <el-form-item :label="t('memo')" prop="memo">
						<el-input v-model="fxbillTable.searchParam.memo" :placeholder="t('memoPlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('fromMemberId')" prop="from_member_id">
						<el-input v-model="fxbillTable.searchParam.from_member_id"
							:placeholder="t('fromMemberIdPlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('fxlevel')" prop="fxlevel">
						<el-input v-model="fxbillTable.searchParam.fxlevel" :placeholder="t('fxlevelPlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('status')" prop="status">
						<el-input v-model="fxbillTable.searchParam.status" :placeholder="t('statusPlaceholder')" />
					</el-form-item> -->
					<el-form-item>
						<el-button type="primary" @click="loadFxbillList()">{{ t('search') }}</el-button>
						<el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
					</el-form-item>
				</el-form>
			</el-card>

			<div class="mt-[10px]">
				<el-table :data="fxbillTable.data" size="large" v-loading="fxbillTable.loading">
					<template #empty>
						<span>{{ !fxbillTable.loading ? t('emptyData') : '' }}</span>
					</template>
					<el-table-column prop="id" :label="t('id')" min-width="120" :show-overflow-tooltip="true" />

					<el-table-column prop="member_id_name" :label="t('memberId')" min-width="120"
						:show-overflow-tooltip="true" />

					<!-- <el-table-column prop="account_type" :label="t('accountType')" min-width="120"
						:show-overflow-tooltip="true" /> -->
					<el-table-column prop="account_data" :label="t('accountData')" min-width="120"
						:show-overflow-tooltip="true" />

<el-table-column prop="account_text" :label="t('奖励类型')" min-width="120"
						:show-overflow-tooltip="true" />
					<!-- <el-table-column prop="account_sum" :label="t('accountSum')" min-width="120"
						:show-overflow-tooltip="true" />

					<el-table-column prop="from_type" :label="t('fromType')" min-width="120"
						:show-overflow-tooltip="true" /> -->

					<el-table-column prop="related_id" :label="t('报名id')" min-width="120"
						:show-overflow-tooltip="true" />

					<el-table-column prop="memo" :label="t('memo')" min-width="250" :show-overflow-tooltip="true" />

					<!-- <el-table-column prop="from_member_id" :label="t('fromMemberId')" min-width="120"
						:show-overflow-tooltip="true" />

					<el-table-column prop="fxlevel" :label="t('fxlevel')" min-width="120"
						:show-overflow-tooltip="true" />

					<el-table-column prop="status" :label="t('status')" min-width="120" :show-overflow-tooltip="true" /> -->
					<el-table-column prop="adddate" :label="t('发放时间')" min-width="160" :show-overflow-tooltip="true" />
					<el-table-column :label="t('operation')" fixed="right" min-width="120">
						<template #default="{ row }">
							<!-- <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button> -->
							<el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
						</template>
					</el-table-column>

				</el-table>
				<div class="mt-[16px] flex justify-end">
					<el-pagination v-model:current-page="fxbillTable.page" v-model:page-size="fxbillTable.limit"
						layout="total, sizes, prev, pager, next, jumper" :total="fxbillTable.total"
						@size-change="loadFxbillList()" @current-change="loadFxbillList" />
				</div>
			</div>

			<edit ref="editFxbillDialog" @complete="loadFxbillList" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref, watch } from 'vue'
	import { t } from '@/lang'
	import { useDictionary } from '@/app/api/dict'
	import { getFxbillList, deleteFxbill, getWithMemberList } from '@/addon/huodong/api/fxbill'
	import { img } from '@/utils/common'
	import { ElMessageBox, FormInstance } from 'element-plus'
	import Edit from '@/addon/huodong/views/fxbill/components/fxbill-edit.vue'
	import { useRoute } from 'vue-router'
	const route = useRoute()
	const pageName = route.meta.title;

	let fxbillTable = reactive({
		page: 1,
		limit: 10,
		total: 0,
		loading: true,
		data: [],
		searchParam: {
			"member_id": "",
			"account_type": "",
			"account_data": "",
			"account_sum": "",
			"from_type": "",
			"related_id": "",
			"create_time": [],
			"memo": "",
			"from_member_id": "",
			"fxlevel": "",
			"status": ""
		}
	})

	const searchFormRef = ref<FormInstance>()

	// 选中数据
	const selectData = ref<any[]>([])

	// 字典数据


	/**
	 * 获取活动佣金明细列表
	 */
	const loadFxbillList = (page : number = 1) => {
		fxbillTable.loading = true
		fxbillTable.page = page

		getFxbillList({
			page: fxbillTable.page,
			limit: fxbillTable.limit,
			...fxbillTable.searchParam
		}).then(res => {
			fxbillTable.loading = false
			fxbillTable.data = res.data.data
			fxbillTable.total = res.data.total
		}).catch(() => {
			fxbillTable.loading = false
		})
	}
	loadFxbillList()

	const editFxbillDialog : Record<string, any> | null = ref(null)

	/**
	 * 添加活动佣金明细
	 */
	const addEvent = () => {
		editFxbillDialog.value.setFormData()
		editFxbillDialog.value.showDialog = true
	}

	/**
	 * 编辑活动佣金明细
	 * @param data
	 */
	const editEvent = (data : any) => {
		editFxbillDialog.value.setFormData(data)
		editFxbillDialog.value.showDialog = true
	}

	/**
	 * 删除活动佣金明细
	 */
	const deleteEvent = (id : number) => {
		ElMessageBox.confirm(t('fxbillDeleteTips'), t('warning'),
			{
				confirmButtonText: t('confirm'),
				cancelButtonText: t('cancel'),
				type: 'warning',
			}
		).then(() => {
			deleteFxbill(id).then(() => {
				loadFxbillList()
			}).catch(() => {
			})
		})
	}


	const memberIdList = ref([])
	const setMemberIdList = async () => {
		memberIdList.value = await (await getWithMemberList({})).data
	}
	setMemberIdList()

	const resetForm = (formEl : FormInstance | undefined) => {
		if (!formEl) return
		formEl.resetFields()
		loadFxbillList()
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