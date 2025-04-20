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
                <el-form :inline="true" :model="vipcardGoodsTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('goodsName')" prop="goods_name">
                        <el-input v-model="vipcardGoodsTable.searchParam.goods_name"
                            :placeholder="t('goodsNamePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="vipcardGoodsTable.searchParam.create_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item label="卡项状态" prop="status">
                        <el-select v-model="vipcardGoodsTable.searchParam.status" clearable class="input-width">
                            <el-option label="全部" value="" />
                            <el-option :label="t('tooUp')" value="1" />
                            <el-option :label="t('tooDown')" value="0" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadVipcardGoodsList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="vipcardGoodsTable.data" size="large" v-loading="vipcardGoodsTable.loading">
                    <template #empty>
                        <span>{{ !vipcardGoodsTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column :show-overflow-tooltip="true" :label="t('goodsInfo')" min-width="240" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <img class="max-w-[60px] w-[60px] max-h-[60px]" :src="img(row.cover_thumb_small)" />
                                <a href="javascript:;" class="flex-1 multi-hidden ml-2"
                                    :title="row.goods_name">{{ row.goods_name }}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="card_type_name" :label="t('cardType')" min-width="120">
                        <template #default="{ row }">
                            {{ row.card_type_name.name }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" :label="t('price')" min-width="120" />
                    <el-table-column prop="sale_num" :label="t('saleNum')" min-width="120" />
                    <el-table-column prop="sort" :label="t('sort')" min-width="120">
                        <template #default="{ row }">
                            <el-input-number v-model="row.sort" class="!w-[90%]" :min="0" controls-position="right"
                                @change="sortHandleChange(row)" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" :label="t('status')" min-width="120">
                        <template #default="{ row }">
                            <span v-if="row.status == 1">{{ t('tooUp') }}</span>
                            <span v-if="row.status == 0">{{ t('tooDown') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="150" />
                    <el-table-column :label="t('operation')" fixed="right" min-width="235" align="right">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="spreadEvent(row)">{{ t('spread') }}</el-button>
                            <el-button type="primary" link @click="recordEvent(row)">{{ t('collectionRecord') }}</el-button>
                            <el-button type="primary" link @click="statusEvent(row, 0)" v-if="row.status == 1">{{ t('down') }}</el-button>
                            <el-button type="primary" link @click="statusEvent(row, 1)" v-if="row.status == 0">{{ t('up') }}</el-button>
                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                            <!-- <el-button type="primary" link @click="deleteEvent(row.goods_id)">{{ t('delete') }}</el-button> -->
                        </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="vipcardGoodsTable.page" v-model:page-size="vipcardGoodsTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="vipcardGoodsTable.total"
                        @size-change="loadVipcardGoodsList()" @current-change="loadVipcardGoodsList" />
                </div>
            </div>
        </el-card>
      <!-- 推广弹出框 -->
      <spread-popup ref="spreadPopupRef" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getCardList, deleteCard, editStatus, setCardSort } from '@/addon/vipcard/api/vipcard'
import { img ,setTablePageStorage,getTablePageStorage} from '@/utils/common'
import { ElMessageBox, FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import spreadPopup from '@/components/spread-popup/index.vue'

const route = useRoute()
const pageName = route.meta.title

const vipcardGoodsTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        goods_name: '',
        create_time: '',
        status: ''
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取商品表列表
 */
const loadVipcardGoodsList = (page: number = 1) => {
    vipcardGoodsTable.loading = true
    vipcardGoodsTable.page = page

    getCardList({
        page: vipcardGoodsTable.page,
        limit: vipcardGoodsTable.limit,
        ...vipcardGoodsTable.searchParam
    }).then(res => {
        vipcardGoodsTable.loading = false
        vipcardGoodsTable.data = res.data.data
        vipcardGoodsTable.total = res.data.total
        setTablePageStorage(vipcardGoodsTable.page, vipcardGoodsTable.limit, vipcardGoodsTable.searchParam);
    }).catch(() => {
        vipcardGoodsTable.loading = false
    })
}
loadVipcardGoodsList(getTablePageStorage(vipcardGoodsTable.searchParam).page)

const router = useRouter()

/**
 * 添加商品表
 */
const addEvent = () => {
    router.push('/vipcard/goods/card/edit')
}

/**
 * 编辑商品表
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/vipcard/goods/card/edit?id=' + data.goods_id)
}

const recordEvent = (data: any) => {
    router.push('/vipcard/goods/card/record_list?id=' + data.goods_id)
}

// 推广
const spreadPopupRef = ref(null)

const spreadEvent = (data: any) => {
    const pagePath = "/addon/vipcard/pages/card/detail"
    const columnName = "id"
    const columnValue = data.goods_id
    const title = "卡项推广"
    const folder = "vipcard"

    spreadPopupRef.value?.show(pagePath, columnName, columnValue, title,folder)

}


/**
 * 删除商品表
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('vipcardGoodsDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteCard(id).then(() => {
            loadVipcardGoodsList()
        }).catch(() => {
        })
    })
}

// 更改排序
const sortHandleChange = (data) => {
    const obj = {}

    obj.goods_id = data.goods_id
    obj.sort = data.sort

    setCardSort({
        ...obj
    }).then(res => {
    })
}

const statusEvent = (data: any, num: number) => {
    editStatus({ goods_id: data.goods_id, status: num }).then(() => {
        loadVipcardGoodsList()
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadVipcardGoodsList()
}
</script>

<style lang="scss" scoped></style>
