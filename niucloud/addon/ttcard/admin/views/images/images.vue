<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addImages') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="imagesTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="imagesTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('userId')" prop="user_id">
                        <el-select class="w-[280px]" v-model="imagesTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in userIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('cardId')" prop="card_id">
                        <el-select class="w-[280px]" v-model="imagesTable.searchParam.card_id" clearable :placeholder="t('cardIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in cardIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="imagesTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadImagesList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="imagesTable.data" fit size="large" v-loading="imagesTable.loading">
                    <template #empty>
                        <span>{{ !imagesTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column fixed prop="id" :label="t('id')" width="80" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('status')" width="120" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="user_id_name" :label="t('userId')" width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="card_id_name" :label="t('cardId')" width="180" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('images')"  align="center">
                        <template #default="{ row }">
                            <view v-if="row.images" style="display: flex;justify-content: center;">
                                <el-image
                                    v-for="(item,index) in row.images.split(',')"
                                    style="width: 40px; height: 40px;flex-shrink: 0;margin-right: 10px;"
                                    :src="img(item)"
                                   >
                                </el-image>
                            </view>
                            <el-avatar v-else icon="UserFilled" />
                        </template>
                    </el-table-column>
                     <el-table-column :label="t('createTime')" width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    
                    <el-table-column  :label="t('operation')" fixed="right" width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="imagesTable.page" v-model:page-size="imagesTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="imagesTable.total"
                        @size-change="loadImagesList()" @current-change="loadImagesList" />
                </div>
            </div>

            <edit ref="editImagesDialog" @complete="loadImagesList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getImagesList, deleteImages, getWithUserList, getWithCardList } from '@/addon/ttcard/api/images'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/images/components/images-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let imagesTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "status":"",
      "user_id":"",
      "card_id":"",
      "create_time":[]
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    const statusList = ref([] as any[])
    const statusDictList = async () => {
    statusList.value = await (await useDictionary('展示状态')).data.dictionary
    }
    statusDictList();

/**
 * 获取相册管理列表
 */
const loadImagesList = (page: number = 1) => {
    imagesTable.loading = true
    imagesTable.page = page

    getImagesList({
        page: imagesTable.page,
        limit: imagesTable.limit,
         ...imagesTable.searchParam
    }).then(res => {
        imagesTable.loading = false
        imagesTable.data = res.data.data
        imagesTable.total = res.data.total
    }).catch(() => {
        imagesTable.loading = false
    })
}
loadImagesList()

const editImagesDialog: Record<string, any> | null = ref(null)

/**
 * 添加相册管理
 */
const addEvent = () => {
    editImagesDialog.value.setFormData()
    editImagesDialog.value.showDialog = true
}

/**
 * 编辑相册管理
 * @param data
 */
const editEvent = (data: any) => {
    editImagesDialog.value.setFormData(data)
    editImagesDialog.value.showDialog = true
}

/**
 * 删除相册管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('imagesDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteImages(id).then(() => {
            loadImagesList()
        }).catch(() => {
        })
    })
}

    
    const userIdList = ref([])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList({})).data
    }
    setUserIdList()
    const cardIdList = ref([])
    const setCardIdList = async () => {
    cardIdList.value = await (await getWithCardList({})).data
    }
    setCardIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadImagesList()
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
