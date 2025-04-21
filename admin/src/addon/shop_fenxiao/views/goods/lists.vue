<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-card class="card my-[10px] !border-none table-search-wrap" shadow="never">
                <el-form :inline="true" :model="goodsTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('goodsName')" prop="goods_name">
                        <el-input v-model.trim="goodsTable.searchParam.goods_name" :placeholder="t('goodsNamePlaceholder')" maxlength="60" />
                    </el-form-item>
                    <el-form-item :label="t('goodsCategory')" prop="goods_category">
                        <el-cascader :props="goodsCategoryProps" v-model="goodsTable.searchParam.goods_category"
                            :options="goodsCategoryOptions" :placeholder="t('goodsCategoryPlaceholder')" clearable
                            filterable />
                    </el-form-item>
                    <el-form-item :label="t('goodsType')" prop="goods_type">
                        <el-select v-model="goodsTable.searchParam.goods_type" :placeholder="t('goodsTypePlaceholder')" clearable>
                            <el-option v-for="item in goodsType" :key="item.type" :label="item.name" :value="item.type" />
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item :label="t('saleNum')" prop="sale_num">
                        <div class="region-input">
                            <input type="text" :placeholder="t('startSaleNumPlaceholder')" maxlength="10"
                                v-model="goodsTable.searchParam.start_sale_num">
                            <span class="separator">-</span>
                            <input type="text" :placeholder="t('endSaleNumPlaceholder')" maxlength="10"
                                v-model="goodsTable.searchParam.end_sale_num">
                        </div>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="loadGoodsList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <div class="mb-[10px] flex items-center">
                    <el-checkbox v-model="toggleCheckbox" size="large" class="px-[14px]" @change="toggleChange" :indeterminate="isIndeterminate" />
                    <el-button @click="batchGoodsFenxiao(1)" size="small">{{ t('participate') }}</el-button>
                    <el-button @click="batchGoodsFenxiao(0)" size="small">{{ t('offParticipate') }}</el-button>
                </div>

                <el-table :data="goodsTable.data" size="large" v-loading="goodsTable.loading" ref="goodsListTableRef" @selection-change="handleSelectionChange">
                    <template #empty>
                        <span>{{ !goodsTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="goods_id" :label="t('goodsInfo')" min-width="300">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <div class="min-w-[70px] h-[70px] flex items-center justify-center">
                                    <el-image v-if="row.goods_cover_thumb_small" class="w-[70px] h-[70px]" :src="img(row.goods_cover_thumb_small)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[70px] h-[70px]" src="@/addon/shop_fenxiao/assets/goods_default.png"  fit="contain"/>
                                            </div>
                                        </template>
                                    </el-image>
                                    <img v-else class="w-[70px] h-[70px]" src="@/addon/shop_fenxiao/assets/goods_default.png" fit="contain" />
                                </div>
                                <div class="ml-2">
                                    <span :title="row.goods_name" class="multi-hidden">{{ row.goods_name }}</span>
                                    <span class="text-primary text-[12px]">{{ row.goods_type_name }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goods_type_name" :label="t('goodsTypeName')" min-width="120" align="right" />
                    <el-table-column prop="price" :label="t('skuPrice')" min-width="120" align="right">
                        <template #default="{ row }">
                            <span>￥{{ moneyFormat(row.goodsSku.price) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="stock" :label="t('stock')" min-width="120" />
                    <el-table-column prop="sale_num" :label="t('saleNum')" min-width="100" />
                    <el-table-column :label="t('status')" min-width="100">
                        <template #default="{ row }">
                            <div v-if="row.status == 1">{{ t('statusOn') }}</div>
                            <div v-if="row.status == 0">{{ t('statusOff') }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('isParticipate')" min-width="150">
                        <template #default="{ row }">
                            <el-tag class="cursor-pointer" :type="row.is_set_fenxiao ? 'success' : 'info'" @click="isFenxiaoChange(row, row.is_set_fenxiao ? 0 : 1)">{{ row.is_set_fenxiao ? t('yes') : t('no') }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" min-width="150">
                        <template #header>
                            <span>{{ t('ParticipateType') }}</span>
                            <el-tooltip class="box-item" effect="light" placement="bottom-end">
                                <template #content>
                                    <div class="max-w-[300px]">
                                        <p class="leading-[25px]">1. 分销规则可以是默认规则和单独设置</p>
                                        <p class="leading-[25px]">2. 商品可以设置分销计算价，设置之后按照计算价作为商品业绩计算比率，默认按照商品卖价作为商品业绩然后通过比率计算佣金</p>
                                        <p class="leading-[25px]">3. 商品佣金比率也可以单独设置，设置之后按照商品佣金比率计算</p>
                                    </div>
                                </template>
                                <span class="iconfont iconwenhao ml-[5px]"></span>
                            </el-tooltip>
                        </template>
                        <template #default="{ row }">
                            <span>{{ row.fenxiao_type == 1 ? t('typeLabelOne') : t('typeLabelTwo') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                        <template #default="{ row }">
                            <el-button v-if="row.is_set_fenxiao == 0" type="primary" link @click="setConfig(row.goods_id)">{{ t('commissionSettings') }}</el-button>
                            <el-button v-if="row.is_set_fenxiao" type="primary" link @click="detail(row.goods_id)">{{ t('detail') }}</el-button>
                            <el-button v-if="row.is_set_fenxiao" type="primary" link @click="setConfig(row.goods_id)">{{ t('commissionSettings') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex">
                    <!-- <div class="flex items-center flex-1">
                        <el-checkbox v-model="toggleCheckbox" size="large" class="px-[14px]" @change="toggleChange" :indeterminate="isIndeterminate" />
                        <el-button @click="batchGoodsFenxiao(1)" size="small">{{ t('participate') }}</el-button>
                        <el-button @click="batchGoodsFenxiao(0)" size="small">{{ t('offParticipate') }}</el-button>
                    </div> -->

                    <el-pagination v-model:current-page="goodsTable.page" v-model:page-size="goodsTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="goodsTable.total"
                        @size-change="loadGoodsList()" @current-change="loadGoodsList" />
                </div>
            </div>
        </el-card>
        <fenxiao-goods-detail ref="fenxiaoGoodsDetailDialog" />
    </div>
</template>

<script lang="ts" setup>
import fenxiaoGoodsDetail from '@/addon/shop_fenxiao/views/components/fenxiao-goods-detail.vue'
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { img, moneyFormat ,setTablePageStorage,getTablePageStorage} from '@/utils/common'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import { getCategoryTree, getGoodsType } from '@/addon/shop/api/goods'
import { getFenxiaoGoodsPageList, editGoodsIsFenxiao } from '@/addon/shop_fenxiao/api/goods'

const route = useRoute()
const pageName = route.meta.title
const repeat = ref(false)
const router = useRouter()

const goodsTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        goods_name: '',
        goods_category: [],
        goods_type: '',
    }
})

const fenxiaoGoodsDetailDialog: Record<string, any> | null = ref(null)
const searchFormRef = ref()

// 正则表达式
const regExp = {
    number: /^\d{0,10}$/,
    digit: /^\d{0,10}(.?\d{0,2})$/
}

// 条件筛选查询

// 商品分类
const goodsCategoryOptions: any = reactive([])
const goodsCategoryProps = {
    checkStrictly: true
}

// 商品类型
const goodsType: any = reactive([])

// 初始化数据
const initData = () => {
    // 查询商品分类树结构
    getCategoryTree().then((res) => {
        const data = res.data
        if (data) {
            const goodsCategoryTree: any = []
            data.forEach((item: any) => {
                const children: any = []
                if (item.child_list) {
                    item.child_list.forEach((childItem: any) => {
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
            goodsCategoryOptions.splice(0, goodsCategoryOptions.length, ...goodsCategoryTree)
        }
    })

    // 商品类型
    getGoodsType().then((res) => {
        const data = res.data
        if (data) {
            for (const k in data) {
                goodsType.push(data[k])
            }
        }
    })
}

initData()

// 批量复选框
const toggleCheckbox = ref()

// 复选框中间状态
const isIndeterminate = ref(false)

// 监听批量复选框事件
const toggleChange = (value: any) => {
    isIndeterminate.value = false
    goodsListTableRef.value.toggleAllSelection()
}

const goodsListTableRef = ref()

// 选中数据
const multipleSelection: any = ref([])

// 监听表格单行选中
const handleSelectionChange = (val: []) => {
    multipleSelection.value = val

    toggleCheckbox.value = false
    if (multipleSelection.value.length > 0 && multipleSelection.value.length < goodsTable.data.length) {
        isIndeterminate.value = true
    } else {
        isIndeterminate.value = false
    }

    if (multipleSelection.value.length == goodsTable.data.length) {
        toggleCheckbox.value = true
    }
}

// 修改商品参与不参与
const isFenxiaoChange = (row: any, value: any) => {
    ElMessageBox.confirm(value?t('participateTip'):t('offParticipateTip'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        if (repeat.value) return
        repeat.value = true
        editGoodsIsFenxiao({
            goods_ids: [row.goods_id],
            is_fenxiao: value
        }).then((res) => {
            repeat.value = false
            loadGoodsList()
        }).catch(() => {
            repeat.value = false
        })
    }).catch(()=>{})

}

// 批量设置参与不参与
const batchGoodsFenxiao = (is_fenxiao: any) => {
    if (multipleSelection.value.length == 0) {
        ElMessage({
            type: 'warning',
            message: `${t('batchEmptySelectedGoodsTips')}`
        })
        return
    }

    const goodsIds: any = []
    multipleSelection.value.forEach((item: any) => {
        goodsIds.push(item.goods_id)
    })
    ElMessageBox.confirm(is_fenxiao?t('participateTip'):t('offParticipateTip'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        editGoodsIsFenxiao({
            goods_ids: goodsIds,
            is_fenxiao
        }).then((res) => {
            loadGoodsList()
        })
    }).catch(()=>{

    })

}

/**
 * 获取商品列表
 */
const loadGoodsList = (page: number = 1) => {
    // if (goodsTable.searchParam.start_sale_num && !regExp.number.test(goodsTable.searchParam.start_sale_num)) {
    //     ElMessage({
    //         type: 'warning',
    //         message: `${t('startSaleNumTips')}`
    //     })
    //     return
    // }
    // if (goodsTable.searchParam.end_sale_num && !regExp.number.test(goodsTable.searchParam.end_sale_num)) {
    //     ElMessage({
    //         type: 'warning',
    //         message: `${t('endSaleNumTips')}`
    //     })
    //     return
    // }

    goodsTable.loading = true
    goodsTable.page = page

    const searchData = cloneDeep(goodsTable.searchParam)

    getFenxiaoGoodsPageList({
        page: goodsTable.page,
        limit: goodsTable.limit,
        ...searchData
    }).then(res => {
        goodsTable.loading = false
        goodsTable.data = res.data.data
        goodsTable.total = res.data.total
        setTablePageStorage(goodsTable.page, goodsTable.limit, searchData)
    }).catch(() => {
        goodsTable.loading = false
    })
}

loadGoodsList(getTablePageStorage(goodsTable.searchParam).page)

/**
 * 佣金设置
 */
const setConfig = (goods_id: Number) => {
    router.push('/shop_fenxiao/management/goods_config?goods_id=' + goods_id)
    // let url = router.resolve({
    //     path: '/shop/goods/real_edit',
    // });
    // window.open(url.href);
}
const detail = (goods_id: Number) => {
    let obj = {id: goods_id}
    fenxiaoGoodsDetailDialog.value.setFormData(obj)
    fenxiaoGoodsDetailDialog.value.showDialog = true
    // router.push('/shop_fenxiao/management/goods_detail?goods_id=' + goods_id)
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()

    loadGoodsList()
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

    .input-width-sort {
        width: 70px;
    }
</style>
