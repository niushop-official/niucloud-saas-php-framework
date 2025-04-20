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
                <el-table :data="vipcardGoodsCategoryTable.data" row-key="category_id" size="large" v-loading="vipcardGoodsCategoryTable.loading">
                    <template #empty>
                        <span>{{ !vipcardGoodsCategoryTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="category_name" :label="t('categoryName')" min-width="120" />
                    <el-table-column :label="t('image')" min-width="100" align="left">
                        <template #default="{ row }">
                            <el-image v-if="row.image_thumb_small" :src="img(row.image_thumb_small)" class="h-[50px]"/>
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

            <CategoryEdit ref="editVipcardGoodsCategoryDialog" @complete="loadVipcardGoodsCategoryList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getCategoryTree, deleteCategory } from '@/addon/vipcard/api/vipcard'
import { img } from '@/utils/common'
import { ElMessageBox } from 'element-plus'
import CategoryEdit from '@/addon/vipcard/views/components/category-edit.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

const vipcardGoodsCategoryTable = reactive({
    loading: true,
    data: []
})

/**
 * 获取 商品分类列表
 */
const loadVipcardGoodsCategoryList = (page: number = 1) => {
    vipcardGoodsCategoryTable.loading = true
    getCategoryTree().then(res => {
        vipcardGoodsCategoryTable.loading = false
        vipcardGoodsCategoryTable.data = res.data
    }).catch(() => {
        vipcardGoodsCategoryTable.loading = false
    })
}
loadVipcardGoodsCategoryList()

const editVipcardGoodsCategoryDialog: Record<string, any> | null = ref(null)

/**
 * 添加 商品分类
 */
const addEvent = () => {
    editVipcardGoodsCategoryDialog.value.setFormData()
    editVipcardGoodsCategoryDialog.value.showDialog = true
}

/**
 * 编辑 商品分类
 * @param data
 */
const editEvent = (data: any) => {
    editVipcardGoodsCategoryDialog.value.setFormData(data)
    editVipcardGoodsCategoryDialog.value.showDialog = true
}

/**
 * 删除 商品分类
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('vipcardGoodsCategoryDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteCategory(id).then(() => {
            loadVipcardGoodsCategoryList()
        }).catch(() => {
        })
    })
}

</script>

<style lang="scss" scoped></style>
