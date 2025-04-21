<template>
	<div class="main-container">
		<el-card class="box-card !border-none" shadow="never">

			<!-- <div class="flex justify-between items-center">
				<span class="text-lg">{{pageName}}</span>
				<el-button type="primary" @click="addEvent">
					{{ t('addFxuser') }}
				</el-button>
			</div> -->

			<el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
				<el-form :inline="true" :model="fxuserTable.searchParam" ref="searchFormRef">

					<!-- <el-form-item :label="t('memberId')" prop="member_id">
						<el-select class="w-[280px]" v-model="fxuserTable.searchParam.member_id" clearable
							:placeholder="t('memberIdPlaceholder')">
							<el-option v-for="(item, index) in memberIdList" :key="index" :label="item['nickname']"
								:value="item['member_id']" />
						</el-select>
					</el-form-item>

					<el-form-item :label="t('type')" prop="type">
						<el-input v-model="fxuserTable.searchParam.type" :placeholder="t('typePlaceholder')" />
					</el-form-item> -->
					<el-form-item :label="t('name')" prop="name">
						<el-input v-model="fxuserTable.searchParam.name" :placeholder="t('namePlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('mobile')" prop="mobile">
						<el-input v-model="fxuserTable.searchParam.mobile" :placeholder="t('mobilePlaceholder')" />
					</el-form-item>
					<!-- <el-form-item :label="t('status')" prop="status">
						<el-input v-model="fxuserTable.searchParam.status" :placeholder="t('statusPlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('adddate')" prop="adddate">
						<el-date-picker v-model="fxuserTable.searchParam.adddate" type="datetimerange"
							format="YYYY-MM-DD hh:mm:ss" :start-placeholder="t('startDate')"
							:end-placeholder="t('endDate')" />
					</el-form-item> -->

					<el-form-item>
						<el-button type="primary" @click="loadFxuserList()">{{ t('search') }}</el-button>
						<el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
					</el-form-item>
				</el-form>
			</el-card>

			<div class="mt-[10px]">
				<el-table :data="fxuserTable.data" size="large" v-loading="fxuserTable.loading">
					<template #empty>
						<span>{{ !fxuserTable.loading ? t('emptyData') : '' }}</span>
					</template>
					<el-table-column prop="member_id" :label="t('id')" min-width="120" :show-overflow-tooltip="true" />

					<el-table-column prop="member_id_name" :label="t('memberId')" min-width="120"
						:show-overflow-tooltip="true" />

					<el-table-column :label="t('type')" width="120" align="left">
						<template #default="{ row }">
							<span v-if="row.type==1">企业</span>
							<span v-if="row.type==2">个人</span>
						</template>
					</el-table-column>

					<el-table-column prop="name" :label="t('name')" min-width="120" :show-overflow-tooltip="true" />

					<el-table-column prop="mobile" :label="t('mobile')" min-width="120" :show-overflow-tooltip="true" />
					<el-table-column prop="sales" :label="t('报名数')" min-width="120" :show-overflow-tooltip="true" />

					<!-- <el-table-column prop="idcard" :label="t('idcard')" min-width="120" :show-overflow-tooltip="true" />

					<el-table-column :label="t('sfz1')" width="100" align="left">
						<template #default="{ row }">
							<el-avatar v-if="row.sfz1" :src="img(row.sfz1)" />
							<el-avatar v-else icon="UserFilled" />
						</template>
					</el-table-column>
					<el-table-column :label="t('sfz2')" width="100" align="left">
						<template #default="{ row }">
							<el-avatar v-if="row.sfz2" :src="img(row.sfz2)" />
							<el-avatar v-else icon="UserFilled" />
						</template>
					</el-table-column>-->
					<el-table-column :label="t('yingImage')" width="100" align="left">
					    <template #default="{ row }">
					        <el-image v-if="row.ying_image" :src="img(row.ying_image)" />
					        <span v-else></span>
					    </template>
					</el-table-column>
					<el-table-column :label="t('status')" min-width="120" align="center">
						<template #default="{ row }">
							<span v-if="row.status == 2" >  <el-tag type="success">{{ t('审核通过') }}</el-tag></span>
							<span v-if="row.status == 1"><el-tag type="info">{{ t('待审核') }}</el-tag></span>
							<span v-if="row.status == -1"><el-tag type="danger">{{ t('拒绝驳回') }}</el-tag></span>
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
					<el-pagination v-model:current-page="fxuserTable.page" v-model:page-size="fxuserTable.limit"
						layout="total, sizes, prev, pager, next, jumper" :total="fxuserTable.total"
						@size-change="loadFxuserList()" @current-change="loadFxuserList" />
				</div>
			</div>

			<edit ref="editFxuserDialog" @complete="loadFxuserList" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref, watch } from 'vue'
	import { t } from '@/lang'
	import { useDictionary } from '@/app/api/dict'
	import { getFxuserList, deleteFxuser, getWithMemberList } from '@/addon/huodong/api/fxuser'
	import { img } from '@/utils/common'
	import { ElMessageBox, FormInstance } from 'element-plus'
	import Edit from '@/addon/huodong/views/fxuser/components/fxuser-edit.vue'
	import { useRoute } from 'vue-router'
	const route = useRoute()
	const pageName = route.meta.title;

	let fxuserTable = reactive({
		page: 1,
		limit: 10,
		total: 0,
		loading: true,
		data: [],
		searchParam: {
			"member_id": "",
			"type": "",
			"name": "",
			"mobile": "",
			"status": "",
			"adddate": ""
		}
	})

	const searchFormRef = ref<FormInstance>()

	// 选中数据
	const selectData = ref<any[]>([])

	// 字典数据


	/**
	 * 获取推广员列表
	 */
	const loadFxuserList = (page : number = 1) => {
		fxuserTable.loading = true
		fxuserTable.page = page

		getFxuserList({
			page: fxuserTable.page,
			limit: fxuserTable.limit,
			...fxuserTable.searchParam
		}).then(res => {
			fxuserTable.loading = false
			fxuserTable.data = res.data.data
			fxuserTable.total = res.data.total
		}).catch(() => {
			fxuserTable.loading = false
		})
	}
	loadFxuserList()

	const editFxuserDialog : Record<string, any> | null = ref(null)

	/**
	 * 添加推广员
	 */
	const addEvent = () => {
		editFxuserDialog.value.setFormData()
		editFxuserDialog.value.showDialog = true
	}

	/**
	 * 编辑推广员
	 * @param data
	 */
	const editEvent = (data : any) => {
		editFxuserDialog.value.setFormData(data)
		editFxuserDialog.value.showDialog = true
	}

	/**
	 * 删除推广员
	 */
	const deleteEvent = (id : number) => {
		ElMessageBox.confirm(t('fxuserDeleteTips'), t('warning'),
			{
				confirmButtonText: t('confirm'),
				cancelButtonText: t('cancel'),
				type: 'warning',
			}
		).then(() => {
			deleteFxuser(id).then(() => {
				loadFxuserList()
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
		loadFxuserList()
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