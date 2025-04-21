<template>
	<div class="main-container">
		<el-card class="box-card !border-none" shadow="never">

			<div class="flex justify-between items-center">
				<span class="text-lg">{{pageName}}</span>
				<!-- <el-button type="primary" @click="addEvent">
					{{ t('addRelation') }}
				</el-button> -->
			</div>

			<el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
				<el-form :inline="true" :model="relationTable.searchParam" ref="searchFormRef">

					<el-form-item :label="t('memberId')" prop="member_id">
						<el-select class="w-[280px]" v-model="relationTable.searchParam.member_id" clearable
							:placeholder="t('memberIdPlaceholder')">
							<el-option v-for="(item, index) in memberIdList" :key="index" :label="item['nickname']"
								:value="item['member_id']" />
						</el-select>
					</el-form-item>

					<!-- <el-form-item :label="t('fxuserId')" prop="fxuser_id">
						<el-input v-model="relationTable.searchParam.fxuser_id"
							:placeholder="t('fxuserIdPlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('fxuserId2')" prop="fxuser_id2">
						<el-input v-model="relationTable.searchParam.fxuser_id2"
							:placeholder="t('fxuserId2Placeholder')" />
					</el-form-item> -->
					<el-form-item :label="t('adddate')" prop="adddate">
						<el-date-picker v-model="relationTable.searchParam.adddate" type="datetimerange"
							format="YYYY-MM-DD hh:mm:ss" :start-placeholder="t('startDate')"
							:end-placeholder="t('endDate')" />
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="loadRelationList()">{{ t('search') }}</el-button>
						<el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
					</el-form-item>
				</el-form>
			</el-card>

			<div class="mt-[10px]">
				<el-table :data="relationTable.data" size="large" v-loading="relationTable.loading">
					<template #empty>
						<span>{{ !relationTable.loading ? t('emptyData') : '' }}</span>
					</template>
					<!-- <el-table-column prop="id" :label="t('id')" min-width="120" :show-overflow-tooltip="true" /> -->
					<el-table-column prop="member_id" :label="t('用户ID')" min-width="120"
						:show-overflow-tooltip="true" />
					<el-table-column prop="member_id_name" :label="t('memberId')" min-width="120"
						:show-overflow-tooltip="true" />

					<el-table-column prop="pid_name" :label="t('fxuserId')" min-width="120"
						:show-overflow-tooltip="true" />

					<el-table-column prop="pid2_name" :label="t('fxuserId2')" min-width="120"
						:show-overflow-tooltip="true" />

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
					<el-pagination v-model:current-page="relationTable.page" v-model:page-size="relationTable.limit"
						layout="total, sizes, prev, pager, next, jumper" :total="relationTable.total"
						@size-change="loadRelationList()" @current-change="loadRelationList" />
				</div>
			</div>

			<edit ref="editRelationDialog" @complete="loadRelationList" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref, watch } from 'vue'
	import { t } from '@/lang'
	import { useDictionary } from '@/app/api/dict'
	import { getRelationList, deleteRelation, getWithMemberList } from '@/addon/huodong/api/relation'
	import { img } from '@/utils/common'
	import { ElMessageBox, FormInstance } from 'element-plus'
	import Edit from '@/addon/huodong/views/relation/components/relation-edit.vue'
	import { useRoute } from 'vue-router'
	const route = useRoute()
	const pageName = route.meta.title;

	let relationTable = reactive({
		page: 1,
		limit: 10,
		total: 0,
		loading: true,
		data: [],
		searchParam: {
			"member_id": "",
			"fxuser_id": "",
			"fxuser_id2": "",
			"adddate": ""
		}
	})

	const searchFormRef = ref<FormInstance>()

	// 选中数据
	const selectData = ref<any[]>([])

	// 字典数据


	/**
	 * 获取推广关系列表
	 */
	const loadRelationList = (page : number = 1) => {
		relationTable.loading = true
		relationTable.page = page

		getRelationList({
			page: relationTable.page,
			limit: relationTable.limit,
			...relationTable.searchParam
		}).then(res => {
			relationTable.loading = false
			relationTable.data = res.data.data
			relationTable.total = res.data.total
		}).catch(() => {
			relationTable.loading = false
		})
	}
	loadRelationList()

	const editRelationDialog : Record<string, any> | null = ref(null)

	/**
	 * 添加推广关系
	 */
	const addEvent = () => {
		editRelationDialog.value.setFormData()
		editRelationDialog.value.showDialog = true
	}

	/**
	 * 编辑推广关系
	 * @param data
	 */
	const editEvent = (data : any) => {
		editRelationDialog.value.setFormData(data)
		editRelationDialog.value.showDialog = true
	}

	/**
	 * 删除推广关系
	 */
	const deleteEvent = (id : number) => {
		ElMessageBox.confirm(t('relationDeleteTips'), t('warning'),
			{
				confirmButtonText: t('confirm'),
				cancelButtonText: t('cancel'),
				type: 'warning',
			}
		).then(() => {
			deleteRelation(id).then(() => {
				loadRelationList()
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
		loadRelationList()
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