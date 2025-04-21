<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addCategory') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="categoryTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('categoryName')" prop="category_name">
                        <el-input v-model.trim="categoryTable.searchParam.category_name" :placeholder="t('categoryNamePlaceholder')" maxlength="20" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="loadCategoryList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="categoryTable.data" size="large" v-loading="categoryTable.loading" @sort-change="sortChange">
                    <template #empty>
                        <span>{{ !categoryTable.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="category_name" :label="t('categoryName')" min-width="300" :show-overflow-tooltip="true"/>

                    <el-table-column prop="status" :label="t('status')" width="200" :show-overflow-tooltip="true" >
                        <template #default="{ row }">
                            <el-tag type="success" v-if="row.status == 1" @click="modifyCategoryStatusEvent(row.category_id, 0)" class="cursor-pointer">{{ t('statusOn') }}</el-tag>
                            <el-tag type="info" v-else @click="modifyCategoryStatusEvent(row.category_id, 1)" class="cursor-pointer">{{ t('statusOff') }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="sort" :label="t('sort')" min-width="200" sortable="custom">
                        <template #default="{ row }">
                            <el-input v-model.trim="row.sort" class="!w-[120px]" maxlength="8" @blur="sortInputListener(row.sort, row)" />
                        </template>
                    </el-table-column>

                    <el-table-column prop="create_time" :label="t('createTime')" min-width="200" sortable="custom">
                        <template #default="{ row }">
                            <div>{{ row.create_time }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" fixed="right" align="right" width="150">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.category_id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="categoryTable.page" v-model:page-size="categoryTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="categoryTable.total"
                        @size-change="loadCategoryList()" @current-change="loadCategoryList" />
                </div>
            </div>

            <edit ref="editCategoryDialog" @complete="loadCategoryList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getCategoryPageList, deleteCategory,modifyCategorySort,modifyCategoryStatus } from '@/addon/shop_giftcard/api/category'
import { ElMessage,ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/shop_giftcard/views/giftcard/components/category-edit.vue'
import { useRoute } from 'vue-router'
import { debounce ,setTablePageStorage,getTablePageStorage } from '@/utils/common'

const route = useRoute()
const pageName = route.meta.title;

let categoryTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      category_name:"",
        order: '',
        sort: ''
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取礼品卡分类列表
 */
const loadCategoryList = (page: number = 1) => {
    categoryTable.loading = true
    categoryTable.page = page

    getCategoryPageList({
        page: categoryTable.page,
        limit: categoryTable.limit,
         ...categoryTable.searchParam
    }).then(res => {
        categoryTable.loading = false
        categoryTable.data = res.data.data
        categoryTable.total = res.data.total
        setTablePageStorage(categoryTable.page, categoryTable.limit, categoryTable.searchParam);

    }).catch(() => {
        categoryTable.loading = false
    })
}
loadCategoryList(getTablePageStorage(categoryTable.searchParam).page)

const editCategoryDialog: Record<string, any> | null = ref(null)

/**
 * 添加礼品卡分类
 */
const addEvent = () => {
    editCategoryDialog.value.setFormData()
    editCategoryDialog.value.showDialog = true
}

/**
 * 编辑礼品卡分类
 * @param data
 */
const editEvent = (data: any) => {
    editCategoryDialog.value.setFormData(data)
    editCategoryDialog.value.showDialog = true
}

/**
 * 删除礼品卡分类
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('categoryDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteCategory(id).then(() => {
            loadCategoryList()
        }).catch(() => {
        })
    })
}

// 修改排序号
const sortInputListener = debounce((sort, row) => {
    if (isNaN(sort) || !/^\d{0,10}$/.test(sort)) {
        ElMessage({
            type: 'warning',
            message: `${ t('sortTips') }`
        })
        return
    }
    if (sort > 99999999) {
        row.sort = 99999999
    }
    modifyCategorySort({
        category_id: row.category_id,
        sort
    }).then((res) => {
    })
})

const isRepeat = ref(false)

// 修改礼品卡分类状态
const modifyCategoryStatusEvent = (category_id: any, status: any) => {
    if (isRepeat.value) return
    isRepeat.value = true

    modifyCategoryStatus({
        category_id,
        status
    }).then((res) => {
        loadCategoryList()
        isRepeat.value = false
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadCategoryList()
}

// 监听排序
const sortChange = (event: any) => {
    let sort = ''
    if (event.order == 'ascending') {
        sort = 'asc'
    } else if (event.order == 'descending') {
        sort = 'desc'
    }
    if (sort) {
        categoryTable.searchParam.order = event.prop
        categoryTable.searchParam.sort = sort
    }
    loadCategoryList()
}
</script>

<style lang="scss" scoped>
</style>
