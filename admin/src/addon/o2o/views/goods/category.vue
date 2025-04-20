<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{pageName}}</span>
                <el-button type="primary" class="w-[100px]" @click="addEvent">
                    {{ t('addCategory') }}
                </el-button>
            </div>

            <div class="mt-[20px]">
                <el-table :data="o2oGoodsCategoryTable.data" row-key="category_id" size="large" v-loading="o2oGoodsCategoryTable.loading">
                    <template #empty>
                        <span>{{ !o2oGoodsCategoryTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="category_name" :label="t('categoryName')" min-width="120" />
                    <el-table-column :label="t('image')" min-width="100" align="left">
                        <template #default="{ row }">
                            <el-avatar v-if="row.image" :src="img(row.image)" />
                            <img v-else class="w-[50px] h-[50px]" src="@/app/assets/images/category_default.png" />
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="100">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.category_id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
            </div>

            <CategoryEdit ref="editO2oGoodsCategoryDialog" @complete="loadO2oGoodsCategoryList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getCategoryTree, deleteCategory } from '@/addon/o2o/api/category'
import { img } from '@/utils/common'
import { ElMessageBox } from 'element-plus'
import CategoryEdit from '@/addon/o2o/views/goods/components/category-edit.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title;

const o2oGoodsCategoryTable = reactive({
    loading: true,
    data: []
})

/**
 * 获取 商品分类列表
 */
const loadO2oGoodsCategoryList = (page: number = 1) => {
    o2oGoodsCategoryTable.loading = true
    getCategoryTree().then(res => {
        o2oGoodsCategoryTable.loading = false
        o2oGoodsCategoryTable.data = res.data
    }).catch(() => {
        o2oGoodsCategoryTable.loading = false
    })
}
loadO2oGoodsCategoryList()

const editO2oGoodsCategoryDialog: Record<string, any> | null = ref(null)

/**
 * 添加 商品分类
 */
const addEvent = () => {
    editO2oGoodsCategoryDialog.value.setFormData()
    editO2oGoodsCategoryDialog.value.showDialog = true
}

/**
 * 编辑 商品分类
 * @param data
 */
const editEvent = (data: any) => {
    editO2oGoodsCategoryDialog.value.setFormData(data)
    editO2oGoodsCategoryDialog.value.showDialog = true
}

/**
 * 删除 商品分类
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('o2oGoodsCategoryDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteCategory(id).then(() => {
            loadO2oGoodsCategoryList()
        }).catch(() => {
        })
    })
}

</script>

<style lang="scss" scoped></style>
