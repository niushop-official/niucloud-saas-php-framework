<template>
    <div>
        <el-dialog v-model="showDialog" :title="t('editStockPopupTitle')" width="600px" :destroy-on-close="true" :close-on-click-modal="false">

            <div class="flex items-center mb-[10px]">
                <div class="min-w-[70px] h-[70px] flex items-center justify-center">
                    <el-image v-if="goods.goods_cover_thumb_small" class="w-[70px] h-[70px]" :src="img(goods.goods_cover_thumb_small)" fit="contain">
                        <template #error>
                            <div class="image-slot">
                                <img class="w-[70px] h-[70px]" src="@/addon/shop/assets/goods_default.png" />
                            </div>
                        </template>
                    </el-image>
                    <img v-else class="w-[70px] h-[70px]" src="@/addon/shop/assets/goods_default.png" fit="contain" />
                </div>
                <div class="ml-2">
                    <span :title="goods.goods_name" class="multi-hidden">{{ goods.goods_name }}</span>
                    <span class="text-primary text-[12px]">{{ goods.goods_type_name }}</span>
                </div>
            </div>

            <!-- 批量设置 -->
            <div class="batch-operation-sku" v-if="activeGoodsCount == 0 && goodsTable.data.length > 1">
                <label>{{ t('batchOperationSku') }}</label>
                <el-input v-model.trim="batchOperation.value" clearable :placeholder="t('stock')" class="set-input" maxlength="8" :autofocus="true" />
                <el-button type="primary" @click="saveBatch">{{ t('confirm') }}</el-button>
            </div>

            <el-table :data="goodsTable.data" size="large" v-loading="goodsTable.loading" max-height="400">
                <template #empty>
                    <span>{{ !goodsTable.loading ? t('emptyData') : '' }}</span>
                </template>

                <el-table-column prop="sku_name" :label="t('skuName')" min-width="120" v-if="goodsTable.data.length > 1" />
                <el-table-column prop="price" :label="t('price')" min-width="120" />
                <el-table-column prop="stock" :label="t('stock')" min-width="120">
                    <template #default="{ row }">
                        <el-input v-model.trim="row.stock" clearable placeholder="0" maxlength="8" :disabled="activeGoodsCount > 0" />
                    </template>
                </el-table-column>

            </el-table>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="save">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, reactive } from 'vue'
import { img } from '@/utils/common'
import { ElMessage } from 'element-plus'
import {
    getActiveGoodsCount,
    getGoodsSkuList,
    editGoodsListStock
} from '@/addon/shop/api/goods'

const goods: any = reactive({})
const activeGoodsCount: any = ref(0)

const showDialog = ref(false)

const emit = defineEmits(['load'])

interface goodsTableType {
    loading: boolean
    data: any[]
}
const goodsTable = reactive<goodsTableType>({
    loading: true,
    data: []
})

const batchOperation: any = reactive({
    value: '' // 输入值
})

const saveBatch = () => {
    if (batchOperation.value.length == 0) {
        ElMessage({
            type: 'warning',
            message: `${t('stockPlaceholder')}`
        })
        return
    }

    if (!regExp.number.test(batchOperation.value)) {
        ElMessage({
            type: 'warning',
            message: `${t('stockTips')}`
        })
        return
    }

    if (batchOperation.value < 0) {
        ElMessage({
            type: 'warning',
            message: `${t('stockNotZeroTips')}`
        })
        return
    }

    goodsTable.data.forEach((item: any) => {
        item.stock = batchOperation.value
    })
}

/**
 * 获取商品列表
 */
const loadGoodsList = () => {
    goodsTable.loading = true

    getGoodsSkuList({
        goods_id: goods.goods_id
    }).then(res => {
        goodsTable.loading = false
        goodsTable.data = res.data
    }).catch(() => {
        goodsTable.loading = false
    })
}

const show = (data: any) => {
    Object.assign(goods, data)
    // getActiveGoodsCountFn(); // 暂时不控制
    loadGoodsList()
    showDialog.value = true
}

const getActiveGoodsCountFn = ()=>{
    getActiveGoodsCount({
        goods_id: goods.goods_id
    }).then((res)=>{
        activeGoodsCount.value = res.data;
    })
}

// 正则表达式
const regExp: any = {
    number: /^\d{0,10}$/
}

const verify = () => {
    let result = true
    for (let i = 0; i < goodsTable.data.length; i++) {
        let item = goodsTable.data[i]

        if (item.stock.length == 0) {
            result = false
            ElMessage({
                type: 'warning',
                message: `${t('stockPlaceholder')}`
            })
            break
        } else if (isNaN(item.stock) || !regExp.number.test(item.stock)) {
            result = false
            ElMessage({
                type: 'warning',
                message: `${t('stockTips')}`
            })
            break
        } else if (item.stock < 0) {
            result = false
            ElMessage({
                type: 'warning',
                message: `${t('stockNotZeroTips')}`,
            })
            break
        }
    }

    return result
}

const save = () => {
    if (verify()) {
        const sku_list = <any>[]
        goodsTable.data.forEach((item: any) => {
            sku_list.push({
                sku_id: item.sku_id,
                stock: item.stock
            })
        })
        editGoodsListStock({
            goods_id: goods.goods_id,
            sku_list
        }).then(res => {
            emit('load')
            showDialog.value = false
        })
    }
}

defineExpose({
    showDialog,
    show
})
</script>

<style lang="scss" scoped>
.form-item-wrap {
    margin-right: 10px !important;

    &.last-child {
        margin-right: 0 !important;
    }
}

.batch-operation-sku {
    display: flex;
    margin-bottom: 16px;
    background-color: #ffffff;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    label {
        font-size: 14px;
        margin-right: 10px;
    }

    .set-input {
        max-width: 150px;
        min-width: 60px;
        margin-right: 10px;
    }
}
</style>
