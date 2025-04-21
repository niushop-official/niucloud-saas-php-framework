<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addComment') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="commentTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('视频信息')" prop="video_id">
                          <el-select class="w-[280px]" v-model="commentTable.searchParam.video_id" clearable :placeholder="t('请选择视频')">
                             <el-option
                                         v-for="(item, index) in videoList"
                                         :key="index"
                                         :label="item['name']"
                                         :value="item['id']"
                                     />
                          </el-select>
                      </el-form-item>
                    
                    <el-form-item :label="t('memberId')" prop="member_id">
                    	<el-select class="w-[280px]" v-model="commentTable.searchParam.member_id" clearable
                    		:placeholder="t('memberIdPlaceholder')">
                    		<el-option v-for="(item, index) in memberIdList" :key="index" :label="item['nickname']"
                    			:value="item['member_id']" />
                    	</el-select>
                    </el-form-item>
					<el-form-item :label="t('adddate')" prop="adddate">
                        <el-date-picker v-model="commentTable.searchParam.adddate" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadCommentList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="commentTable.data" size="large" v-loading="commentTable.loading">
                    <template #empty>
                        <span>{{ !commentTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" min-width="80" :show-overflow-tooltip="true"/>
                   
				   <el-table-column prop="video_name" :label="t('视频信息')" min-width="150" :show-overflow-tooltip="true"/>
				   <el-table-column prop="member_name" :label="t('发布人')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="content" :label="t('评论内容')" min-width="320" :show-overflow-tooltip="true"/>
                    <el-table-column prop="like_num" :label="t('点赞数')" min-width="80" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('status')" min-width="120" align="center">
                        <template #default="{ row }">
                            <span v-if="row.status == 1">{{ t('show') }}</span>
                            <span v-if="row.status == 0">{{t('hidden')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="adddate" :label="t('评论时间')" min-width="140" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="180">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="hflistEvent(row)">{{ t('查看回复') }}</el-button>
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="commentTable.page" v-model:page-size="commentTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="commentTable.total"
                        @size-change="loadCommentList()" @current-change="loadCommentList" />
                </div>
            </div>

            <edit ref="editCommentDialog" @complete="loadCommentList" />
        </el-card>
		
		<hflist ref="hflistRef" :fromType="1"></hflist>
		
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { getCommentList, deleteComment } from '@/addon/shortvideo/api/comment'
	import { getWithMemberList,getWithvideolist } from '@/addon/shortvideo/api/video'
	
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/shortvideo/views/comment/components/comment-edit.vue'
    import hflist from '@/addon/shortvideo/views/comment/components/hflist.vue';
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let commentTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "video_id":"",
      "adddate":[]
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])



/**
 * 获取分类列表
 */
const loadCommentList = (page: number = 1) => {
    commentTable.loading = true
    commentTable.page = page

    getCommentList({
        page: commentTable.page,
        limit: commentTable.limit,
         ...commentTable.searchParam
    }).then(res => {
        commentTable.loading = false
        commentTable.data = res.data.data
        commentTable.total = res.data.total
    }).catch(() => {
        commentTable.loading = false
    })
}
loadCommentList()

const editCommentDialog: Record<string, any> | null = ref(null)

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
/**
 * 添加分类
 */
const addEvent = () => {
    editCommentDialog.value.setFormData()
    editCommentDialog.value.showDialog = true
}


const hflistRef: Record<string, any> | null = ref(null)

const hflistEvent = (row) => {
  hflistRef.value.showDialog = true;
  console.log(row.id)
  hflistRef.value.reload(row.id);
};


/**
 * 编辑分类
 * @param data
 */
const editEvent = (data: any) => {
    editCommentDialog.value.setFormData(data)
    editCommentDialog.value.showDialog = true
}

/**
 * 删除分类
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('commentDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteComment(id).then(() => {
            loadCommentList()
        }).catch(() => {
        })
    })
}

    

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadCommentList()
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
