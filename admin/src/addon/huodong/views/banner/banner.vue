<template>
	<div class="main-container">
		<el-card class="box-card !border-none" shadow="never">

			<div class="flex justify-between items-center">
				<span class="text-lg">{{pageName}}</span>
				<el-button type="primary" @click="addEvent">
					{{ t('addBanner') }}
				</el-button>
			</div>

			<!-- <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
				<el-form :inline="true" :model="bannerTable.searchParam" ref="searchFormRef">
					<el-form-item :label="t('title')" prop="title">
						<el-input v-model="bannerTable.searchParam.title" :placeholder="t('titlePlaceholder')" />
					</el-form-item>
					<el-form-item :label="t('status')" prop="status">
						<el-input v-model="bannerTable.searchParam.status" :placeholder="t('statusPlaceholder')" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="loadBannerList()">{{ t('search') }}</el-button>
						<el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
					</el-form-item>
				</el-form>
			</el-card> -->

			<div class="mt-[10px]">
				<el-table :data="bannerTable.data" size="large" v-loading="bannerTable.loading">
					<template #empty>
						<span>{{ !bannerTable.loading ? t('emptyData') : '' }}</span>
					</template>
					<el-table-column prop="id" :label="t('id')" min-width="120" :show-overflow-tooltip="true" />


					<el-table-column :label="t('image')" width="100" align="left">
						<template #default="{ row }">
							<a :href="row.image" target="_bank">
								<el-image v-if="row.image" :src="img(row.image)" style="border-radius:5px;" />
								<!-- <el-image v-else icon="UserFilled" style="border-radius:5px;" /> -->
							</a>
						</template>
					</el-table-column>
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
					<el-pagination v-model:current-page="bannerTable.page" v-model:page-size="bannerTable.limit"
						layout="total, sizes, prev, pager, next, jumper" :total="bannerTable.total"
						@size-change="loadBannerList()" @current-change="loadBannerList" />
				</div>
			</div>

			<edit ref="editBannerDialog" @complete="loadBannerList" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref, watch } from 'vue'
	import { t } from '@/lang'
	import { useDictionary } from '@/app/api/dict'
	import { getBannerList, deleteBanner } from '@/addon/huodong/api/banner'
	import { img } from '@/utils/common'
	import { ElMessageBox, FormInstance } from 'element-plus'
	import Edit from '@/addon/huodong/views/banner/components/banner-edit.vue'
	import { useRoute } from 'vue-router'
	const route = useRoute()
	const pageName = route.meta.title;

	let bannerTable = reactive({
		page: 1,
		limit: 10,
		total: 0,
		loading: true,
		data: [],
		searchParam: {
			"status": ""
		}
	})

	const searchFormRef = ref<FormInstance>()

	// 选中数据
	const selectData = ref<any[]>([])

	// 字典数据


	/**
	 * 获取轮播图管理列表
	 */
	const loadBannerList = (page : number = 1) => {
		bannerTable.loading = true
		bannerTable.page = page

		getBannerList({
			page: bannerTable.page,
			limit: bannerTable.limit,
			...bannerTable.searchParam
		}).then(res => {
			bannerTable.loading = false
			bannerTable.data = res.data.data
			bannerTable.total = res.data.total
		}).catch(() => {
			bannerTable.loading = false
		})
	}
	loadBannerList()

	const editBannerDialog : Record<string, any> | null = ref(null)

	/**
	 * 添加轮播图管理
	 */
	const addEvent = () => {
		editBannerDialog.value.setFormData()
		editBannerDialog.value.showDialog = true
	}

	/**
	 * 编辑轮播图管理
	 * @param data
	 */
	const editEvent = (data : any) => {
		editBannerDialog.value.setFormData(data)
		editBannerDialog.value.showDialog = true
	}

	/**
	 * 删除轮播图管理
	 */
	const deleteEvent = (id : number) => {
		ElMessageBox.confirm(t('bannerDeleteTips'), t('warning'),
			{
				confirmButtonText: t('confirm'),
				cancelButtonText: t('cancel'),
				type: 'warning',
			}
		).then(() => {
			deleteBanner(id).then(() => {
				loadBannerList()
			}).catch(() => {
			})
		})
	}



	const resetForm = (formEl : FormInstance | undefined) => {
		if (!formEl) return
		formEl.resetFields()
		loadBannerList()
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