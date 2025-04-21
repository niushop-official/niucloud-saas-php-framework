<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="ordertypeTable.searchParam" ref="searchFormRef">
                     
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model="ordertypeTable.searchParam.name" :placeholder="t('namePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="ordertypeTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                   
          
                    <el-form-item :label="t('type')" prop="type">
                        <el-select class="w-[280px]" v-model="ordertypeTable.searchParam.type" clearable :placeholder="t('typePlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in typeList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadOrdertypeList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="ordertypeTable.data" size="large" v-loading="ordertypeTable.loading">
                    <template #empty>
                        <span>{{ !ordertypeTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="name" :label="t('name')" fixed width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('status')" width="100" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    
                    <!-- <el-table-column prop="diy_name" :label="t('diyName')" min-width="120" :show-overflow-tooltip="true"/> -->
                    
                    <el-table-column :label="t('type')" width="100" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in typeList">
                                <div v-if="item.value == row.type">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="real_id" :label="t('realId')" align="center" width="80" :show-overflow-tooltip="true"/>

                    <el-table-column prop="duration" :label="t('duration')" align="center" min-width="120" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-if="row.type=='authentication'">-</div>
                            <div v-else>{{ row.duration == -1 ? t('不限') : row.duration }}</div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="create_website_num" align="center" :label="t('createWebsiteNum')" min-width="120" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-if="row.type=='authentication'">-</div>
                            <div v-else>{{ row.create_website_num == -1 ? t('不限') : row.create_website_num }}</div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="create_card_num" align="center" :label="t('createCardNum')" min-width="120" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-if="row.type=='authentication'">-</div>
                            <div v-else>{{ row.create_card_num == -1 ? t('不限') : row.create_card_num }}</div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="originalprice" :label="t('originalprice')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="price" :label="t('price')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('operation')" align="center" fixed="right" width="90">
                       <template #default="{ row }">
                           <el-button  type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="ordertypeTable.page" v-model:page-size="ordertypeTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="ordertypeTable.total"
                        @size-change="loadOrdertypeList()" @current-change="loadOrdertypeList" />
                </div>
            </div>

            <edit ref="editOrdertypeDialog" @complete="loadOrdertypeList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getOrdertypeList, deleteOrdertype } from '@/addon/ttcard/api/ordertype'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/ordertype/components/ordertype-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let ordertypeTable = reactive({
    page: 1,
    limit: 20,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "status":"",
      "name":"",
      "diy_name":"",
      "type":""
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
    const typeList = ref([] as any[])
    const typeDictList = async () => {
    typeList.value = await (await useDictionary('会员等级类型')).data.dictionary
    }
    typeDictList();

/**
 * 获取会员等级列表
 */
const loadOrdertypeList = (page: number = 1) => {
    ordertypeTable.loading = true
    ordertypeTable.page = page

    getOrdertypeList({
        page: ordertypeTable.page,
        limit: ordertypeTable.limit,
         ...ordertypeTable.searchParam
    }).then(res => {
        ordertypeTable.loading = false
        ordertypeTable.data = res.data.data
        ordertypeTable.total = res.data.total
    }).catch(() => {
        ordertypeTable.loading = false
    })
}
loadOrdertypeList()

const editOrdertypeDialog: Record<string, any> | null = ref(null)

/**
 * 添加会员等级
 */
const addEvent = () => {
    editOrdertypeDialog.value.setFormData()
    editOrdertypeDialog.value.showDialog = true
}

/**
 * 编辑会员等级
 * @param data
 */
const editEvent = (data: any) => {
    editOrdertypeDialog.value.setFormData(data)
    editOrdertypeDialog.value.showDialog = true
}

/**
 * 删除会员等级
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('ordertypeDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteOrdertype(id).then(() => {
            loadOrdertypeList()
        }).catch(() => {
        })
    })
}

    

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadOrdertypeList()
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