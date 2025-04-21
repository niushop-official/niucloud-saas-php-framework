<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addCardbackground') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="cardbackgroundTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('title')" prop="title">
                        <el-input v-model="cardbackgroundTable.searchParam.title" :placeholder="t('titlePlaceholder')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('type')" prop="type">
                        <el-select class="w-[280px]" v-model="cardbackgroundTable.searchParam.type" clearable :placeholder="t('typePlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in typeList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="cardbackgroundTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="cardbackgroundTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadCardbackgroundList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="cardbackgroundTable.data" size="large" v-loading="cardbackgroundTable.loading">
                    <template #empty>
                        <span>{{ !cardbackgroundTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="title" :label="t('title')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('type')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in typeList">
                                <div v-if="item.value == row.type">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                     <el-table-column :label="t('image')" width="100" align="left">
                        <template #default="{ row }">
                            <el-avatar v-if="row.image" :src="img(row.image)" />
                            <el-avatar v-else icon="UserFilled" />
                        </template>
                    </el-table-column>
                     <el-table-column :label="t('createTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('status')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="cardbackgroundTable.page" v-model:page-size="cardbackgroundTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="cardbackgroundTable.total"
                        @size-change="loadCardbackgroundList()" @current-change="loadCardbackgroundList" />
                </div>
            </div>

            <edit ref="editCardbackgroundDialog" @complete="loadCardbackgroundList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getCardbackgroundList, deleteCardbackground } from '@/addon/ttcard/api/cardbackground'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/cardbackground/components/cardbackground-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let cardbackgroundTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "title":"",
      "type":"",
      "create_time":"",
      "status":""
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    const typeList = ref([] as any[])
    const typeDictList = async () => {
    typeList.value = await (await useDictionary('背景图类型')).data.dictionary
    }
    typeDictList();
    const statusList = ref([] as any[])
    const statusDictList = async () => {
    statusList.value = await (await useDictionary('展示状态')).data.dictionary
    }
    statusDictList();

/**
 * 获取背景图管理列表
 */
const loadCardbackgroundList = (page: number = 1) => {
    cardbackgroundTable.loading = true
    cardbackgroundTable.page = page

    getCardbackgroundList({
        page: cardbackgroundTable.page,
        limit: cardbackgroundTable.limit,
         ...cardbackgroundTable.searchParam
    }).then(res => {
        cardbackgroundTable.loading = false
        cardbackgroundTable.data = res.data.data
        cardbackgroundTable.total = res.data.total
    }).catch(() => {
        cardbackgroundTable.loading = false
    })
}
loadCardbackgroundList()

const editCardbackgroundDialog: Record<string, any> | null = ref(null)

/**
 * 添加背景图管理
 */
const addEvent = () => {
    editCardbackgroundDialog.value.setFormData()
    editCardbackgroundDialog.value.showDialog = true
}

/**
 * 编辑背景图管理
 * @param data
 */
const editEvent = (data: any) => {
    editCardbackgroundDialog.value.setFormData(data)
    editCardbackgroundDialog.value.showDialog = true
}

/**
 * 删除背景图管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('cardbackgroundDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteCardbackground(id).then(() => {
            loadCardbackgroundList()
        }).catch(() => {
        })
    })
}

    

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadCardbackgroundList()
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