<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" @click="addEvent">{{ t('addArticleCategory') }}</el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="categoryTableData.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model.trim="categoryTableData.searchParam.name" :placeholder="t('namePlaceholder')" class="w-[190px]" prefix-icon="Search" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadCategoryList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="categoryTableData.data" size="large" v-loading="categoryTableData.loading">
                    <template #empty>
                        <span>{{ !categoryTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="name" :label="t('name')" min-width="150" />
                    <el-table-column prop="article_num" :label="t('articleNumber')" min-width="140" />
                    <el-table-column prop="is_show" :label="t('isShow')" min-width="150">
                        <template #default="{ row }">
                            {{ row.is_show == 1 ? t('show') : t('hide') }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="sort" :label="t('sort')" min-width="120" />

                    <el-table-column :label="t('operation')" fixed="right" width="130"  align="right">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="primary" link @click="deleteEvent(row.category_id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="categoryTableData.page" v-model:page-size="categoryTableData.limit" layout="total, sizes, prev, pager, next, jumper" :total="categoryTableData.total" @size-change="loadCategoryList()" @current-change="loadCategoryList" />
                </div>
            </div>

            <edit-category ref="editCategoryDialog" @complete="loadCategoryList()" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getArticleCategoryList, deleteArticleCategory } from '@/addon/cms/api/article'
import { ElMessageBox, FormInstance } from 'element-plus'
import EditCategory from '@/addon/cms/views/article/components/edit-category.vue'
import { debounce, setTablePageStorage,getTablePageStorage} from '@/utils/common'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

const categoryTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        name: ''
    }
})

const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadCategoryList()
}

/**
 * 获取文章分类列表
 */
const loadCategoryList = debounce((page: number = 1) => {
    categoryTableData.loading = true
    categoryTableData.page = page

    getArticleCategoryList({
        page: categoryTableData.page,
        limit: categoryTableData.limit,
        ...categoryTableData.searchParam
    }).then(res => {
        categoryTableData.loading = false
        categoryTableData.data = res.data.data
        categoryTableData.total = res.data.total
        setTablePageStorage(categoryTableData.page, categoryTableData.limit, categoryTableData.searchParam)
    }).catch(() => {
        categoryTableData.loading = false
    })
})
loadCategoryList(getTablePageStorage(categoryTableData.searchParam).page)
const editCategoryDialog: Record<string, any> | null = ref(null)

/**
 * 添加文章分类
 */
const addEvent = () => {
    editCategoryDialog.value.setFormData()
    editCategoryDialog.value.showDialog = true
}

/**
 * 编辑文章分类
 * @param data
 */
const editEvent = (data: any) => {
    editCategoryDialog.value.setFormData(data)
    editCategoryDialog.value.showDialog = true
}

/**
 * 删除文章分类
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('articleCategoryDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteArticleCategory(id).then(() => {
            loadCategoryList()
        }).catch(() => {
        })
    })
}
</script>

<style lang="scss" scoped></style>
