<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addVideo') }}
                </el-button>
            </div>
<div>
				 <!-- <el-tag type="success">前端入口路径: /addon/shortvideo/pages/index/index</el-tag> -->
			</div>
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="videoTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model="videoTable.searchParam.name" :placeholder="t('namePlaceholder')" />
                    </el-form-item>
                    
                  <!--  <el-form-item :label="t('cateId')" prop="cate_id">
                        <el-select class="w-[280px]" v-model="videoTable.searchParam.cate_id" clearable :placeholder="t('cateIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in cateIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item> -->
					
					
					<el-form-item :label="t('memberId')" prop="member_id">
						<!-- <el-select class="w-[280px]" v-model="videoTable.searchParam.member_id" clearable filterable 
							:placeholder="t('memberIdPlaceholder')">
							<el-option v-for="(item, index) in memberIdList" :key="index" :label="item['nickname']"
								:value="item['member_id']" />
						</el-select> -->
						 <el-input v-model="videoTable.searchParam.member_id" :placeholder="t('用户ID')" />
					</el-form-item>
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="videoTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option :label=" t('show') "  value="1"/>
                            <el-option :label=" t('hidden') "  value="0"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('adddate')" prop="adddate">
                        <el-date-picker v-model="videoTable.searchParam.adddate" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadVideoList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="videoTable.data" size="large" v-loading="videoTable.loading">
                    <template #empty>
                        <span>{{ !videoTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('ID')" min-width="60" :show-overflow-tooltip="true"/>
                    <el-table-column prop="name" :label="t('name')" min-width="120" :show-overflow-tooltip="true"/>
                    
					<el-table-column prop="member_id_name" :label="t('memberId')" min-width="120" :show-overflow-tooltip="true"/>
                    <!-- <el-table-column prop="cate_id_name" :label="t('cateId')" min-width="120" :show-overflow-tooltip="true"/> -->
                    
                     <el-table-column :label="t('cover')" width="100" align="left">
                        <template #default="{ row }">
                            <el-image v-if="row.cover" :src="img(row.cover)" />
							<span v-else></span>
                            <!-- <el-image v-else icon="UserFilled" /> -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="like_num" :label="t('like_num')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="view_num" :label="t('view_num')" min-width="120" :show-overflow-tooltip="true"/>
                      
                   <el-table-column :label="t('is_show')" min-width="120" align="center">
                       <template #default="{ row }">
                           <span v-if="row.is_show == 1">{{ t('上架') }}</span>
                           <span v-if="row.is_show == 0">{{t('下架')}}</span>
                       </template>
                   </el-table-column>
                   <el-table-column :label="t('status')" min-width="120" align="center">
                       <template #default="{ row }">
                           <span v-if="row.status == 1">{{ t('show') }}</span>
                           <span v-if="row.status == 0">{{t('hidden')}}</span>
                       </template>
                   </el-table-column>
                     
                    <el-table-column prop="adddate" :label="t('adddate')" min-width="150" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="videoTable.page" v-model:page-size="videoTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="videoTable.total"
                        @size-change="loadVideoList()" @current-change="loadVideoList" />
                </div>
            </div>

            <edit ref="editVideoDialog" @complete="loadVideoList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getVideoList, deleteVideo, getWithCateList, getWithMemberList } from '@/addon/shortvideo/api/video'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/shortvideo/views/video/components/video-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let videoTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "name":"",
      "member_id":"", 
      "status":"",
      "adddate":[]
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])


/**
 * 获取列列表
 */
const loadVideoList = (page: number = 1) => {
    videoTable.loading = true
    videoTable.page = page

    getVideoList({
        page: videoTable.page,
        limit: videoTable.limit,
         ...videoTable.searchParam
    }).then(res => {
        videoTable.loading = false
        videoTable.data = res.data.data
        videoTable.total = res.data.total
    }).catch(() => {
        videoTable.loading = false
    })
}
loadVideoList()

const editVideoDialog: Record<string, any> | null = ref(null)

/**
 * 添加列
 */
const addEvent = () => {
    editVideoDialog.value.setFormData()
    editVideoDialog.value.showDialog = true
}

/**
 * 编辑列
 * @param data
 */
const editEvent = (data: any) => {
    editVideoDialog.value.setFormData(data)
    editVideoDialog.value.showDialog = true
}

/**
 * 删除列
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('videoDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteVideo(id).then(() => {
            loadVideoList()
        }).catch(() => {
        })
    })
}

  //  const memberIdList = ref([] as any[])
  //  	const setMemberIdList = async () => {
  //  		memberIdList.value = await (await getWithMemberList({})).data
  //  	}
  //  	setMemberIdList()
	 
 /*   const cateIdList = ref([])
    const setCateIdList = async () => {
    cateIdList.value = await (await getWithCateList({})).data
    }
    setCateIdList() */

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadVideoList()
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
