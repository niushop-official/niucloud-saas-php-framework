<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <!-- <el-button type="primary" @click="addEvent">
                    {{ t('addCardmsg') }}
                </el-button> -->
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="cardmsgTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('typeStatus')" prop="type_status">
                        <el-select class="w-[280px]" v-model="cardmsgTable.searchParam.type_status" clearable :placeholder="t('typeStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in type_statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="cardmsgTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('formUserId')" prop="form_user_id">
                        <el-select class="w-[280px]" v-model="cardmsgTable.searchParam.form_user_id" clearable :placeholder="t('formUserIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in formUserIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('toUserId')" prop="to_user_id">
                        <el-select class="w-[280px]" v-model="cardmsgTable.searchParam.to_user_id" clearable :placeholder="t('toUserIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in toUserIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('cardId')" prop="card_id">
                        <el-select class="w-[280px]" v-model="cardmsgTable.searchParam.card_id" clearable :placeholder="t('cardIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in cardIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('title')" prop="title">
                        <el-input v-model="cardmsgTable.searchParam.title" :placeholder="t('titlePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('content')" prop="content">
                        <el-input v-model="cardmsgTable.searchParam.content" :placeholder="t('contentPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="cardmsgTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadCardmsgList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="cardmsgTable.data" size="large" v-loading="cardmsgTable.loading">
                    <template #empty>
                        <span>{{ !cardmsgTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column fixed prop="id" :label="t('id')" width="50" :show-overflow-tooltip="true"/>
                    <el-table-column :label="t('typeStatus')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in type_statusList">
                                <div v-if="item.value == row.type_status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('status')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="form_user_id_name" :label="t('formUserId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="to_user_id_name" :label="t('toUserId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="card_id_name" :label="t('cardId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="title" :label="t('title')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="content" :label="t('content')" min-width="220" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('createTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button v-if="row.type_status=='leavemessage'" type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="cardmsgTable.page" v-model:page-size="cardmsgTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="cardmsgTable.total"
                        @size-change="loadCardmsgList()" @current-change="loadCardmsgList" />
                </div>
            </div>

            <edit ref="editCardmsgDialog" @complete="loadCardmsgList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getCardmsgList, deleteCardmsg, getWithUserList, getWithUserList2, getWithCardList } from '@/addon/ttcard/api/cardmsg'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/cardmsg/components/cardmsg-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let cardmsgTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "type_status":"",
      "status":"",
      "form_user_id":"",
      "to_user_id":"",
      "card_id":"",
      "title":"",
      "content":"",
      "create_time":""
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    const type_statusList = ref([] as any[])
    const type_statusDictList = async () => {
    type_statusList.value = await (await useDictionary('消息类型')).data.dictionary
    }
    type_statusDictList();
    const statusList = ref([] as any[])
    const statusDictList = async () => {
    statusList.value = await (await useDictionary('消息审核状态')).data.dictionary
    }
    statusDictList();

/**
 * 获取消息管理列表
 */
const loadCardmsgList = (page: number = 1) => {
    cardmsgTable.loading = true
    cardmsgTable.page = page

    getCardmsgList({
        page: cardmsgTable.page,
        limit: cardmsgTable.limit,
         ...cardmsgTable.searchParam
    }).then(res => {
        cardmsgTable.loading = false
        cardmsgTable.data = res.data.data
        cardmsgTable.total = res.data.total
    }).catch(() => {
        cardmsgTable.loading = false
    })
}
loadCardmsgList()

const editCardmsgDialog: Record<string, any> | null = ref(null)

/**
 * 添加消息管理
 */
const addEvent = () => {
    editCardmsgDialog.value.setFormData()
    editCardmsgDialog.value.showDialog = true
}

/**
 * 编辑消息管理
 * @param data
 */
const editEvent = (data: any) => {
    editCardmsgDialog.value.setFormData(data)
    editCardmsgDialog.value.showDialog = true
}

/**
 * 删除消息管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('cardmsgDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteCardmsg(id).then(() => {
            loadCardmsgList()
        }).catch(() => {
        })
    })
}

    
    const formUserIdList = ref([])
    const setFormUserIdList = async () => {
    formUserIdList.value = await (await getWithUserList({})).data
    }
    setFormUserIdList()
    const toUserIdList = ref([])
    const setToUserIdList = async () => {
    toUserIdList.value = await (await getWithUserList2({})).data
    }
    setToUserIdList()
    const cardIdList = ref([])
    const setCardIdList = async () => {
    cardIdList.value = await (await getWithCardList({})).data
    }
    setCardIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadCardmsgList()
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
