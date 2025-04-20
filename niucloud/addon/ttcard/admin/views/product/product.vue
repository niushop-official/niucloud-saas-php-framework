<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addProduct') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="productTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('userId')" prop="user_id">
                        <el-select class="w-[280px]" v-model="productTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in userIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('cardId')" prop="card_id">
                        <el-select class="w-[280px]" v-model="productTable.searchParam.card_id" clearable :placeholder="t('cardIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in cardIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('websiteId')" prop="website_id">
                        <el-select class="w-[280px]" v-model="productTable.searchParam.website_id" clearable :placeholder="t('websiteIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in websiteIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('title')" prop="title">
                        <el-input v-model="productTable.searchParam.title" :placeholder="t('titlePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="productTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="productTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
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
                        <el-button type="primary" @click="loadProductList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="productTable.data" size="large" v-loading="productTable.loading">
                    <template #empty>
                        <span>{{ !productTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="user_id_name" :label="t('userId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="card_id_name" :label="t('cardId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="website_id_name" :label="t('websiteId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="title" :label="t('title')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="price" :label="t('price')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="originalprice" :label="t('originalprice')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="sales_num" :label="t('salesNum')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="inventory_num" :label="t('inventoryNum')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="quota_num" :label="t('quotaNum')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('images')" width="100" align="left">
                        <template #default="{ row }">
                            <el-avatar v-if="row.images" :src="img(row.images)" />
                            <el-avatar v-else icon="UserFilled" />
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
                    <el-pagination v-model:current-page="productTable.page" v-model:page-size="productTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="productTable.total"
                        @size-change="loadProductList()" @current-change="loadProductList" />
                </div>
            </div>

            <edit ref="editProductDialog" @complete="loadProductList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getProductList, deleteProduct, getWithUserList, getWithCardList, getWithWebsiteList } from '@/addon/ttcard/api/product'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/product/components/product-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let productTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "user_id":"",
      "card_id":"",
      "website_id":"",
      "title":"",
      "create_time":"",
      "status":""
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
 * 获取产品管理列表
 */
const loadProductList = (page: number = 1) => {
    productTable.loading = true
    productTable.page = page

    getProductList({
        page: productTable.page,
        limit: productTable.limit,
         ...productTable.searchParam
    }).then(res => {
        productTable.loading = false
        productTable.data = res.data.data
        productTable.total = res.data.total
    }).catch(() => {
        productTable.loading = false
    })
}
loadProductList()

const editProductDialog: Record<string, any> | null = ref(null)

/**
 * 添加产品管理
 */
const addEvent = () => {
    editProductDialog.value.setFormData()
    editProductDialog.value.showDialog = true
}

/**
 * 编辑产品管理
 * @param data
 */
const editEvent = (data: any) => {
    editProductDialog.value.setFormData(data)
    editProductDialog.value.showDialog = true
}

/**
 * 删除产品管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('productDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteProduct(id).then(() => {
            loadProductList()
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
    const websiteIdList = ref([])
    const setWebsiteIdList = async () => {
    websiteIdList.value = await (await getWithWebsiteList({})).data
    }
    setWebsiteIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadProductList()
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