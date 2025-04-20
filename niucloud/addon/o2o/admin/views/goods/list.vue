<template>
    <div class="main-container">

        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="addEvent">
                    {{ t('addGoods') }}
                </el-button>
            </div>
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="o2oGoodsTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('goodsName')" prop="goods_name">
                        <el-input v-model.trim="o2oGoodsTable.searchParam.goods_name" :placeholder="t('goodsNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('categoryId')" prop="goods_category">
                        <el-cascader class="input-width" v-model="o2oGoodsTable.searchParam.goods_category" :options="categoryList" clearable  :props="{ value: 'value', label: 'label', emitPath:false }" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="o2oGoodsTable.searchParam.create_time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item :label="t('saleNum')" prop="start_sale_num">
                        <div class="region-input">
                            <input type="text" :placeholder="t('startSaleNumPlaceholder')" maxlength="10" v-model="o2oGoodsTable.searchParam.start_sale_num" @keyup="filterDigit($event)">
                            <span class="separator">-</span>
                            <input type="text" :placeholder="t('endSaleNumPlaceholder')" maxlength="10" v-model="o2oGoodsTable.searchParam.end_sale_num" @keyup="filterDigit($event)">
                        </div>
                    </el-form-item>
                    <el-form-item :label="t('skuPrice')" prop="start_price">
                        <div class="region-input">
                            <input type="text" :placeholder="t('startPricePlaceholder')" maxlength="10" v-model="o2oGoodsTable.searchParam.start_price" @keyup="filterDigit($event)">
                            <span class="separator">-</span>
                            <input type="text" :placeholder="t('endPricePlaceholder')" maxlength="10" v-model="o2oGoodsTable.searchParam.end_price" @keyup="filterDigit($event)">
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadO2oGoodsList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-tabs v-model="o2oGoodsTable.searchParam.status" class="goods-tabs" @tab-change="tabHandleClick">
                <el-tab-pane :label="t('all')" name=""></el-tab-pane>
                <el-tab-pane :label="t('statusOn')" name="1"></el-tab-pane>
                <el-tab-pane :label="t('statusOff')" name="0"></el-tab-pane>
            </el-tabs>
            <div class="mt-[10px]">
                <el-table :data="o2oGoodsTable.data" size="large" v-loading="o2oGoodsTable.loading" ref="goodsListTableRef" @sort-change="sortChange">
                    <template #empty>
                        <span>{{ !o2oGoodsTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column :label="t('goodsInfo')" :show-overflow-tooltip="true" min-width="240" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <div class="w-[60px] max-h-[60px]">
                                    <div class="min-w-[60px] h-[60px] flex items-center justify-center">
                                        <el-image v-if="row.goods_cover" class="w-[60px] h-[60px]" :src="img(row.goods_cover)" fit="contain">
                                            <template #error>
                                                <div class="image-slot">
                                                    <img class="w-[60px] h-[60px]" src="@/addon/o2o/assets/goods_default.png" />
                                                </div>
                                            </template>
                                        </el-image>
                                        <img v-else class="w-[60px] h-[60px]" src="@/addon/o2o/assets/goods_default.png" fit="contain" />
                                    </div>
                                </div>
                                <div class="ml-2">
                                    <div>
                                        <a href="javascript:;" class="flex-1 multi-hidden" :title="row.goods_name">{{ row.goods_name }}</a>
                                    </div>
                                    <div>
                                        <el-tag>{{ row.buy_type_name }}</el-tag>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="price" :label="t('price')" min-width="120"  sortable="custom">
                        <template #default="{ row }">
                            <span>￥{{ row.price }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sale_num" :label="t('saleNum')" min-width="120"  sortable="custom"/>
                    <el-table-column prop="status" :label="t('status')" min-width="120">
                        <template #default="{ row }">
                            <span v-if="row.status == 1">{{ t('tooUp') }}</span>
                            <span v-if="row.status == 0">{{ t('tooDown') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort" :label="t('sort')" min-width="120"  sortable="custom">
                        <template #default="{ row }">
                            <el-input v-model="row.sort" class="!w-[70px]" maxlength="10" @input="sortInputListener($event,row)"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="150" />
                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="copyEvent(row)">{{ t('copyGoods') }}</el-button>
                            <el-button type="primary" link @click="spreadEvent(row)">{{ t('spreadGoods') }}</el-button>
                            <el-button type="primary" link @click="statusEvent(row, 1)" v-if="row.status == 0">{{ t('up')}}</el-button>
                            <el-button type="primary" link @click="statusEvent(row, 0)" v-if="row.status == 1">{{ t('down')}}</el-button>
                            <el-button type="primary" link @click="memberPriceEvent(row)" v-if="row.buy_type == 'buy'">{{ t('memberPrice') }}</el-button>
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <el-button type="primary" link @click="deleteEvent(row.goods_id)">{{ t('delete') }}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="o2oGoodsTable.page" v-model:page-size="o2oGoodsTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="o2oGoodsTable.total"
                        @size-change="loadO2oGoodsList()" @current-change="loadO2oGoodsList" />
                </div>
            </div>
        </el-card>
        <!-- 商品推广弹出框 -->
        <spread-popup ref="spreadPopupRef" />

        <!-- 会员价弹出框 -->
        <goods-member-price-popup ref="memberPricePopupRef" @load="loadO2oGoodsList" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getCategoryTree } from '@/addon/o2o/api/category'
import { getGoodsList, deleteGoods, editGoodsStatus, editGoodsSort, copyGoods } from '@/addon/o2o/api/goods'
import { debounce, img, filterDigit,setTablePageStorage,getTablePageStorage } from '@/utils/common'
import { ElMessageBox, FormInstance, ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import { getMemberLevelAll } from '@/app/api/member'
import goodsMemberPricePopup from '@/addon/o2o/views/goods/components/goods-member-price-popup.vue'
import spreadPopup from '@/components/spread-popup/index.vue'

const route = useRoute()
const pageName = route.meta.title
const repeat = ref(false)

const o2oGoodsTable = reactive<any>({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        goods_name: '',
        goods_category: '',
        status: '',
        create_time: '',
        start_sale_num: '',
        end_sale_num: '',
        start_price: '',
        end_price: '',
        order: '',
        sort: ''
    }
})

const searchFormRef = ref<FormInstance>()

const categoryList = reactive([])
// 商品分类

const checkCategory = async (row: any = null) => {
    // 查询商品分类树结构
    getCategoryTree().then((res) => {
        const data = res.data
        if (data) {
            const goodsCategoryTree: any = []
            data.forEach((item: any) => {
                const children: any = []
                if (item.children) {
                    item.children.forEach((childItem: any) => {
                        children.push({
                            value: childItem.category_id,
                            label: childItem.category_name
                        })
                    })
                }
                goodsCategoryTree.push({
                    value: item.category_id,
                    label: item.category_name,
                    children
                })
            })
            categoryList.splice(0, categoryList.length, ...goodsCategoryTree)
        }
    })
}
checkCategory()
// 正则表达式
const regExp = {
    required: /[\S]+/,
    number: /^\d{0,10}$/,
    digit: /^\d{0,10}(.?\d{0,2})$/,
    special: /^\d{0,10}(.?\d{0,3})$/
}
/**
 * 获取商品表列表
 */
const loadO2oGoodsList = (page: number = 1) => {
    if (o2oGoodsTable.searchParam.start_sale_num && !regExp.digit.test(o2oGoodsTable.searchParam.start_sale_num)) {
        ElMessage({
            type: 'warning',
            message: `${t('startSaleNumTips')}`
        })
        return
    }
    if (o2oGoodsTable.searchParam.end_sale_num && !regExp.digit.test(o2oGoodsTable.searchParam.end_sale_num)) {
        ElMessage({
            type: 'warning',
            message: `${t('endSaleNumTips')}`
        })
        return
    }
    if (Number(o2oGoodsTable.searchParam.start_sale_num) > Number(o2oGoodsTable.searchParam.end_sale_num)) {
        ElMessage({
            type: 'warning',
            message: `${t('o2oSaleNumTips')}`
        })
        return
    }
    if (o2oGoodsTable.searchParam.start_price && !regExp.digit.test(o2oGoodsTable.searchParam.start_price)) {
        ElMessage({
            type: 'warning',
            message: `${t('startPriceTips')}`
        })
        return
    }
    if (o2oGoodsTable.searchParam.end_price && !regExp.digit.test(o2oGoodsTable.searchParam.end_price)) {
        ElMessage({
            type: 'warning',
            message: `${t('endPriceTips')}`
        })
        return
    }
    if (Number(o2oGoodsTable.searchParam.start_price) > Number(o2oGoodsTable.searchParam.end_price)) {
        ElMessage({
            type: 'warning',
            message: `${t('o2oPriceTips')}`
        })
        return
    }
    o2oGoodsTable.loading = true
    o2oGoodsTable.page = page
    const searchData = cloneDeep(o2oGoodsTable.searchParam)
    getGoodsList({
        page: o2oGoodsTable.page,
        limit: o2oGoodsTable.limit,
        ...searchData
    }).then(res => {
        o2oGoodsTable.loading = false
        o2oGoodsTable.data = res.data.data
        o2oGoodsTable.total = res.data.total
        setTablePageStorage(o2oGoodsTable.page, o2oGoodsTable.limit, searchData)
    }).catch(() => {
        o2oGoodsTable.loading = false
    })
}
loadO2oGoodsList(getTablePageStorage(o2oGoodsTable.searchParam).page)

const router = useRouter()

// 监听排序
const sortChange = (event: any) => {
    let sort = ''
    if (event.order == 'ascending') {
        sort = 'asc'
    } else if (event.order == 'descending') {
        sort = 'desc'
    }
    if (sort) {
        o2oGoodsTable.searchParam.order = event.prop
        o2oGoodsTable.searchParam.sort = sort
    }
    loadO2oGoodsList()
}

/**
 * 添加商品表
 */
const addEvent = () => {
    router.push('/o2o/goods/edit')
}

/**
 * 编辑商品表
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/o2o/goods/edit?id=' + data.goods_id)
}

// 推广
const spreadPopupRef = ref(null)

const spreadEvent = (data: any) => {
    const pagePath = "/addon/o2o/pages/goods/detail"
    const columnName = "goods_id"
    const columnValue = data.goods_id
    const title = "项目推广"
    const folder = "goods"

    spreadPopupRef.value?.show(pagePath, columnName, columnValue, title,folder)
}


// 复制商品
const copyEvent = (data: any) => {
    ElMessageBox.confirm(t('goodsCopyTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        if (repeat.value) return
        repeat.value = true

        copyGoods({
            goods_id: data.goods_id
        }).then((res: any) => {
            if (res.code == 1) {
                loadO2oGoodsList()
            }
            repeat.value = false
        }).catch(() => {
            repeat.value = false
        })
    })
}

/**
 * 删除商品表
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('o2oGoodsDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteGoods(id).then(() => {
            loadO2oGoodsList()
        }).catch(() => {
        })
    })
}
// 更改上下架状态
const statusEvent = (data: any, num: number) => {
    editGoodsStatus({ goods_id: data.goods_id, status: num }).then(() => {
        loadO2oGoodsList()
    })
}
// 修改排序号
const sortInputListener = debounce((sort: any, row: any) => {
    if (isNaN(sort) || !regExp.number.test(sort)) {
        ElMessage({
            type: 'warning',
            message: `${t('sortTips')}`
        })
        return
    }
    editGoodsSort({
        goods_id: row.goods_id,
        sort
    }).then((res) => {
    })
})

// 当前选中tab页面
const tabHandleClick = (event: any) => {
    o2oGoodsTable.searchParam.status = event
    loadO2oGoodsList()
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    o2oGoodsTable.searchParam.end_sale_num = ''
    o2oGoodsTable.searchParam.end_price = ''
    loadO2oGoodsList()
}

/** ***************** 会员价-start *************************/
// 会员等级
const memberLevel = ref([])
const getMemberLevelAllFn = () => {
    getMemberLevelAll().then(res => {
        memberLevel.value = res.data ? res.data : []
    })
}
getMemberLevelAllFn()

const memberPricePopupRef: any = ref(null)
const memberPriceEvent = (data: any) => {
    memberPricePopupRef.value.show(data, memberLevel.value)
}
/** ***************** 会员价-end *************************/
</script>

<style lang="scss" scoped></style>
