<template>
	<div class="main-container">
		<el-card class="box-card !border-none" shadow="never">

			<div class="flex justify-between items-center">
				<span class="text-lg">{{pageName}}</span>
				<!-- <el-button type="primary" @click="addEvent">
					{{ t('addLog') }}
				</el-button> -->
			</div>

			<el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
				<el-form :inline="true" :model="logTable.searchParam" ref="searchFormRef">
					<!-- <el-form-item :label="t('accountType')" prop="account_type">
						<el-select class="" v-model="logTable.searchParam.account_type" clearable
							:placeholder="t('accountTypePlaceholder')">
							<el-option label="全部" value=""></el-option>

						</el-select>
					</el-form-item> -->

					<el-form-item :label="t('orderNo')" prop="order_no">
						<el-input v-model="logTable.searchParam.order_no" :placeholder="t('orderNoPlaceholder')" />
					</el-form-item>

					<el-form-item :label="t('memberId')" prop="member_id">
						<el-select class="w-[280px]" v-model="logTable.searchParam.member_id" clearable
							:placeholder="t('memberIdPlaceholder')">
							<el-option v-for="(item, index) in memberIdList" :key="index" :label="item['nickname']"
								:value="item['member_id']" />
						</el-select>
					</el-form-item>


					<el-form-item :label="t('toMemberId')" prop="to_member_id">
						<el-select class="w-[280px]" v-model="logTable.searchParam.to_member_id" clearable
							:placeholder="t('toMemberIdPlaceholder')">
							<el-option v-for="(item, index) in toMemberIdList" :key="index" :label="item['nickname']"
								:value="item['member_id']" />
						</el-select>
					</el-form-item>

					<el-form-item :label="t('meno')" prop="meno">
						<el-input v-model="logTable.searchParam.meno" :placeholder="t('menoPlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('createTime')" prop="create_time">
						<el-date-picker v-model="logTable.searchParam.create_time" type="datetimerange"
							format="YYYY-MM-DD hh:mm:ss" :start-placeholder="t('startDate')"
							:end-placeholder="t('endDate')" />
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="loadLogList()">{{ t('search') }}</el-button>
						<el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
					</el-form-item>
				</el-form>
			</el-card>

			<div class="mt-[10px]">
				<el-table :data="logTable.data" size="large" v-loading="logTable.loading">
					<template #empty>
						<span>{{ !logTable.loading ? t('emptyData') : '' }}</span>
					</template>
					<el-table-column prop="id" :label="t('id')" min-width="60" :show-overflow-tooltip="true" />

					<el-table-column prop="order_no" :label="t('orderNo')" min-width="180"
						:show-overflow-tooltip="true" />
						
						<el-table-column prop="account_name" :label="t('accountType')" min-width="120"
							:show-overflow-tooltip="true" />
					<el-table-column prop="meno" :label="t('meno')" min-width="220" :show-overflow-tooltip="true" />
					
				<!-- 	<el-table-column prop="order_from" :label="t('orderFrom')" min-width="120"
						:show-overflow-tooltip="true" /> -->

					<el-table-column prop="member_id_name" :label="t('memberId')" min-width="120"
						:show-overflow-tooltip="true" />

					<el-table-column prop="to_member_id_name" :label="t('toMemberId')" min-width="120"
						:show-overflow-tooltip="true" />

					<el-table-column prop="zhuan_money" :label="t('zhuanMoney')" min-width="120"
						:show-overflow-tooltip="true" />

					<el-table-column prop="give_money" :label="t('giveMoney')" min-width="120"
						:show-overflow-tooltip="true" />
					<el-table-column prop="shouxufei" :label="t('扣除手续费')" min-width="120"
						:show-overflow-tooltip="true" />
						<el-table-column :label="t('状态')" min-width="120" align="center">
							<template #default="{ row }">
								<span v-if="row.status == 2" >  <el-tag type="success">{{ t('已成功') }}</el-tag></span>
								<span v-if="row.status == 1"><el-tag type="info">{{ t('待支付') }}</el-tag></span>
							</template>
						</el-table-column>
					<el-table-column prop="create_time" :label="t('生成时间')" min-width="200" />
						
					<el-table-column :label="t('operation')" fixed="right" min-width="120">
						<template #default="{ row }">
							<!-- <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button> -->
							<el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
						</template>
					</el-table-column>

				</el-table>
				<div class="mt-[16px] flex justify-end">
					<el-pagination v-model:current-page="logTable.page" v-model:page-size="logTable.limit"
						layout="total, sizes, prev, pager, next, jumper" :total="logTable.total"
						@size-change="loadLogList()" @current-change="loadLogList" />
				</div>
			</div>

			<edit ref="editLogDialog" @complete="loadLogList" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref, watch } from 'vue'
	import { t } from '@/lang'
	import { useDictionary } from '@/app/api/dict'
	import { getLogList, deleteLog, getWithMemberList } from '@/addon/transfer/api/log'
	import { img } from '@/utils/common'
	import { ElMessageBox, FormInstance } from 'element-plus'
	import Edit from '@/addon/transfer/views/log/components/log-edit.vue'
	import { useRoute } from 'vue-router'
	const route = useRoute()
	const pageName = route.meta.title;

	let logTable = reactive({
		page: 1,
		limit: 10,
		total: 0,
		loading: true,
		data: [],
		searchParam: {
			"account_type": "",
			"order_no": "",
			"member_id": "",
			"to_member_id": "",
			"meno": "",
			"create_time": []
		}
	})

	const searchFormRef = ref<FormInstance>()

	// 选中数据
	const selectData = ref<any[]>([])

	// 字典数据


	/**
	 * 获取资产转赠记录列表
	 */
	const loadLogList = (page : number = 1) => {
		logTable.loading = true
		logTable.page = page

		getLogList({
			page: logTable.page,
			limit: logTable.limit,
			...logTable.searchParam
		}).then(res => {
			logTable.loading = false
			logTable.data = res.data.data
			logTable.total = res.data.total
		}).catch(() => {
			logTable.loading = false
		})
	}
	loadLogList()

	const editLogDialog : Record<string, any> | null = ref(null)

	/**
	 * 添加资产转赠记录
	 */
	const addEvent = () => {
		editLogDialog.value.setFormData()
		editLogDialog.value.showDialog = true
	}

	/**
	 * 编辑资产转赠记录
	 * @param data
	 */
	const editEvent = (data : any) => {
		editLogDialog.value.setFormData(data)
		editLogDialog.value.showDialog = true
	}

	/**
	 * 删除资产转赠记录
	 */
	const deleteEvent = (id : number) => {
		ElMessageBox.confirm(t('logDeleteTips'), t('warning'),
			{
				confirmButtonText: t('confirm'),
				cancelButtonText: t('cancel'),
				type: 'warning',
			}
		).then(() => {
			deleteLog(id).then(() => {
				loadLogList()
			}).catch(() => {
			})
		})
	}


	const memberIdList = ref([])
	const setMemberIdList = async () => {
		memberIdList.value = await (await getWithMemberList({})).data
	}
	setMemberIdList()
	const toMemberIdList = ref([])
	const setToMemberIdList = async () => {
		toMemberIdList.value = await (await getWithMemberList({})).data
	}
	setToMemberIdList()

	const resetForm = (formEl : FormInstance | undefined) => {
		if (!formEl) return
		formEl.resetFields()
		loadLogList()
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