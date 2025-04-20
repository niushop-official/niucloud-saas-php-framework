<template>
	<div class="main-container">
		<el-card class="box-card !border-none" shadow="never">

			<div class="flex justify-between items-center">
				<span class="text-lg">{{pageName}}</span>
				<el-button type="primary" @click="addEvent">
					{{ t('addLabel') }}
				</el-button>
			</div>

			<el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
				<el-form :inline="true" :model="labelTable.searchParam" ref="searchFormRef">
					<el-form-item :label="t('name')" prop="name">
						<el-input v-model="labelTable.searchParam.name" :placeholder="t('namePlaceholder')" />
					</el-form-item>

					<el-form-item :label="t('status')" prop="status">
						<el-select class="w-[280px]" v-model="labelTable.searchParam.status" clearable
							:placeholder="t('statusPlaceholder')">
							<el-option label="全部" value=""></el-option>
							<el-option :label=" t('show') " value="1" />
							<el-option :label=" t('hidden') " value="0" />
						</el-select>
					</el-form-item>

					<el-form-item :label="t('adddate')" prop="adddate">
						<el-date-picker v-model="labelTable.searchParam.adddate" type="datetimerange"
							format="YYYY-MM-DD hh:mm:ss" :start-placeholder="t('startDate')"
							:end-placeholder="t('endDate')" />
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="loadLabelList()">{{ t('search') }}</el-button>
						<el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
					</el-form-item>
				</el-form>
			</el-card>

			<div class="mt-[10px]">
				<el-table :data="labelTable.data" size="large" v-loading="labelTable.loading">
					<template #empty>
						<span>{{ !labelTable.loading ? t('emptyData') : '' }}</span>
					</template>
					<el-table-column prop="id" :label="t('id')" min-width="120" :show-overflow-tooltip="true" />

					<el-table-column prop="name" :label="t('name')" min-width="120" :show-overflow-tooltip="true" />
					<el-table-column prop="sort" :label="t('权重')" min-width="120" :show-overflow-tooltip="true" />


					<el-table-column :label="t('status')" min-width="120" align="center">
						<template #default="{ row }">
							<span v-if="row.status == 1">{{ t('show') }}</span>
							<span v-if="row.status == 0">{{t('hidden')}}</span>
						</template>
					</el-table-column>

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
					<el-pagination v-model:current-page="labelTable.page" v-model:page-size="labelTable.limit"
						layout="total, sizes, prev, pager, next, jumper" :total="labelTable.total"
						@size-change="loadLabelList()" @current-change="loadLabelList" />
				</div>
			</div>

			<edit ref="editLabelDialog" @complete="loadLabelList" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref, watch } from 'vue'
	import { t } from '@/lang'
	import { getLabelList, deleteLabel } from '@/addon/shortvideo/api/label'
	import { img } from '@/utils/common'
	import { ElMessageBox, FormInstance } from 'element-plus'
	import Edit from '@/addon/shortvideo/views/label/components/label-edit.vue'
	import { useRoute } from 'vue-router'
	const route = useRoute()
	const pageName = route.meta.title;

	let labelTable = reactive({
		page: 1,
		limit: 10,
		total: 0,
		loading: true,
		data: [],
		searchParam: {
			"name": "",
			"status": "",
			"adddate": []
		}
	})

	const searchFormRef = ref<FormInstance>()

	// 选中数据
	const selectData = ref<any[]>([])



	/**
	 * 获取活动分类列表
	 */
	const loadLabelList = (page : number = 1) => {
		labelTable.loading = true
		labelTable.page = page

		getLabelList({
			page: labelTable.page,
			limit: labelTable.limit,
			...labelTable.searchParam
		}).then(res => {
			labelTable.loading = false
			labelTable.data = res.data.data
			labelTable.total = res.data.total
		}).catch(() => {
			labelTable.loading = false
		})
	}
	loadLabelList()

	const editLabelDialog : Record<string, any> | null = ref(null)

	/**
	 * 添加活动分类
	 */
	const addEvent = () => {
		editLabelDialog.value.setFormData()
		editLabelDialog.value.showDialog = true
	}

	/**
	 * 编辑活动分类
	 * @param data
	 */
	const editEvent = (data : any) => {
		editLabelDialog.value.setFormData(data)
		editLabelDialog.value.showDialog = true
	}

	/**
	 * 删除活动分类
	 */
	const deleteEvent = (id : number) => {
		ElMessageBox.confirm(t('labelDeleteTips'), t('warning'),
			{
				confirmButtonText: t('confirm'),
				cancelButtonText: t('cancel'),
				type: 'warning',
			}
		).then(() => {
			deleteLabel(id).then(() => {
				loadLabelList()
			}).catch(() => {
			})
		})
	}



	const resetForm = (formEl : FormInstance | undefined) => {
		if (!formEl) return
		formEl.resetFields()
		loadLabelList()
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