<template>
    <el-table :data="categoryTable.data" ref="categoryTableRef" size="large" v-loading="categoryTable.loading"
              height="450px" @selection-change="handleSelectionChange" row-key="category_id"
              :expand-row-keys="expand_category_ids" :tree-props="{ hasChildren: 'hasChildren', children: 'child_list' }"
    >
        <template #empty>
            <span>{{ !categoryTable.loading ? t('emptyData') : '' }}</span>
        </template>
        <el-table-column type="selection" width="55" />
        <el-table-column :label="t('o2oGoodsCategorySelectContentName')" min-width="120">
            <template #default="{ row }">
                <span class="order-2">{{ row.category_name }}</span>
            </template>
        </el-table-column>
        <el-table-column :label="t('o2oGoodsCategorySelectContentImage')" width="170" align="left">
            <template #default="{ row }">
                <div class="h-[30px]">
                    <el-image class="w-[30px] h-[30px] " :src="img(row.image)" fit="contain">
                        <template #error>
                            <div class="image-slot">
                                <img class="w-[30px] h-[30px]" src="@/addon/o2o/assets/category_default.png" />
                            </div>
                        </template>
                    </el-image>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, reactive, computed, nextTick } from 'vue'
import { img } from '@/utils/common'
import { ElMessage, ElTable } from 'element-plus'
import { getCategoryTree } from '@/addon/o2o/api/category'
import { cloneDeep } from 'lodash-es'

const prop = defineProps({
    categoryId: {
        type: Number || String,
        default: ''
    }
})

const categoryId: any = computed(() => {
    return prop.categoryId
})

// 已选项目分类
let currCategoryData: any = null

const categoryTableRef = ref<InstanceType<typeof ElTable>>()

const categoryTable = reactive({
    loading: true,
    data: []
})

const loadCategoryList = () => {
    categoryTable.loading = true

    getCategoryTree().then(res => {
        categoryTable.loading = false
        categoryTable.data = res.data
        categoryTable.data.forEach((item: any) => {
            if (item.children && item.children.length) {
                item.child_list = item.children
                delete item.children
            }
        })
        if (categoryId.value) {
            let obj = {}
            categoryTable.data.forEach((item: any) => {
                if (item.category_id == categoryId.value) {
                    obj = cloneDeep(item)
                } else if (item.child_list && item.child_list.length) {
                    item.child_list.forEach((c: any) => {
                        if (c.category_id == categoryId.value) {
                            obj = cloneDeep(c)
                        }
                    })
                }
            })
            currCategoryData = cloneDeep(obj)
            nextTick(() => {
                setRowSelection()
            })
        }
    }).catch(() => {
        categoryTable.loading = false
    })
}
// 选择项目分类
const handleSelectionChange = (val: string | any[]) => {
    let data = ''
    if (val) data = val[val.length - 1]
    if (val.length > 1) categoryTableRef.value!.clearSelection()
    if (data) categoryTableRef.value!.toggleRowSelection(data, true)
    currCategoryData = cloneDeep(data)
}

// 分类数据选中回填,设置展开行

const expand_category_ids: any = ref<Array<any>>([])
const setRowSelection = () => {
    expand_category_ids.value = []
    categoryTable.data.forEach((el: any) => {
        if (currCategoryData.category_id == el.category_id) {
            categoryTableRef.value!.toggleRowSelection(el, true)
        } else if (el.child_list && el.child_list.length) {
            el.child_list.forEach((v: any) => {
                if (currCategoryData.category_id == v.category_id) {
                    expand_category_ids.value.push(el.category_id.toString())
                    categoryTableRef.value!.toggleRowSelection(v, true)
                }
            })
        }
    })
}

loadCategoryList()

const getData = () => {
    if (!currCategoryData) {
        ElMessage({
            type: 'warning',
            message: `${ t('o2oGoodsSelectContentPlaceholder') }`
        })
        return
    }

    return {
        name: 'O2O_GOODS_CATEGORY',
        title: currCategoryData.category_name,
        url: `/addon/o2o/pages/goods/category?curr_goods_category=${ currCategoryData.category_id }&pid=${ currCategoryData.pid }`,
        action: '',
        categoryId: currCategoryData.category_id
    }
}

defineExpose({
    getData
})
</script>

<style lang="scss" scoped>
</style>
