<template>
    <el-dialog v-model="showDialog" :title="t('addVipcardGoods')" width="800px" :destroy-on-close="true">
        <div class="flex">
            <div class="w-[150px] border-0 border-solid border-r-[1px] border-[#eee]">
                <el-tree :data="categoryAll" :props="defaultProps" accordion @node-click="handleNodeClick" />
            </div>

            <div class="ml-5 flex-1">
                <el-table ref="multipleTableRef" style="width: 100%" @selection-change="handleSelectionChange"
                    :data="vipcardGoodsTable.data" size="large" v-loading="vipcardGoodsTable.loading" height="450">
                    <!-- <el-table-column type="selection" width="55" />
                    <el-table-column label="Date" width="120">
                    <template #default="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column property="name" label="Name" width="120" />
                    <el-table-column property="address" label="Address" show-overflow-tooltip /> -->
                    <el-table-column type="selection" width="55" />
                    <el-table-column :label="t('goodsInfo')" min-width="240" align="left">
                        <template #default="{ row }">
                            <div class="flex">
                                <div class="w-[100px] h-[100px]">
                                    <img class="max-w-[100%] max-h-[100%]" :src="img(row.cover_thumb_small)" />
                                </div>
                                <div class="flex flex-col ml-2">
                                    <span>{{ row.goods_name }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" :label="t('price')" min-width="120" />
                    <el-table-column prop="status" :label="t('status')" min-width="120">
                        <template #default="{ row }">
                            <span v-if="row.status == 1">{{ t('up') }}</span>
                            <span v-if="row.status == 0">{{ t('down') }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="vipcardGoodsTable.page" v-model:page-size="vipcardGoodsTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="vipcardGoodsTable.total"
                        @size-change="loadVipcardGoodsList()" @current-change="loadVipcardGoodsList" />
                </div>
            </div>

        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm()">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { img } from '@/utils/common'
import { t } from '@/lang'
import { ElTable } from 'element-plus'
import { getCategory, getServiceList } from '@/addon/vipcard/api/vipcard'

const showDialog = ref(false)
const loading = ref(false)

// 分类级别
interface Tree {
    label: string
    id?: string
    children?: Tree[]
}
const categoryAll = ref([])
const getCategoryFn = async () => {
    const data = await (await getCategory({ type: 2 })).data
    if (data.length) {
        data.forEach((item:any, index:any) => {
            const obj: any = {}
            obj.label = item.category_name
            obj.category_id = item.category_id
            if (item.children.length) {
                obj.children = []
                item.children.forEach((subItem, subIndex) => {
                    const subObj: any = {}
                    subObj.label = subItem.category_name
                    subObj.category_id = subItem.category_id
                    obj.children.push(subObj)
                })
            }
            categoryAll.value.push(obj)
        })
    } else {
        categoryAll.value = []
    }
}
getCategoryFn()

const defaultProps = {
    children: 'children',
    label: 'label',
    category_id: 'category_id'
}

const handleNodeClick = (data: Tree) => {
    vipcardGoodsTable.searchParam.category_id = data.category_id
    loadVipcardGoodsList()
}

// 内容
/**
 * 获取商品表列表
 */
const vipcardGoodsTable = reactive({
    page: 1,
    limit: 4,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        category_id: ''
    }
})
const loadVipcardGoodsList = (page: number = 1) => {
    vipcardGoodsTable.loading = true
    vipcardGoodsTable.page = page

    getServiceList({
        page: vipcardGoodsTable.page,
        limit: vipcardGoodsTable.limit,
        ...vipcardGoodsTable.searchParam
    }).then(res => {
        vipcardGoodsTable.loading = false
        vipcardGoodsTable.data = res.data.data
        vipcardGoodsTable.total = res.data.total
    }).catch(() => {
        vipcardGoodsTable.loading = false
    })
}
loadVipcardGoodsList()
const goodsSelect = ref([])
const handleSelectionChange = (val) => {
    goodsSelect.value = val
}

/**
 * 确认
 * @param formEl
 */
const emit = defineEmits(['complete'])
const confirm = () => {
    emit('complete', goodsSelect.value)
}

const setFormData = async (row: any = null) => {
    loading.value = false
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
