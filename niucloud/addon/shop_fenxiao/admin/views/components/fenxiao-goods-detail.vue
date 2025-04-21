<template>
     <el-drawer v-model="showDialog" title="分销商品详情" direction="rtl" :before-close="handleClose" class="member-detail-drawer">
        <div class="main-container" v-loading="loading">
            <el-tabs v-model="activeName" class="pb-[10px]" @tab-change="handleClick">
                <el-tab-pane label="商品信息" name="basicInfo" />
                <el-tab-pane v-if="formData.is_fenxiao" label="佣金设置" name="commissionSet" />
            </el-tabs>
            <el-form class="page-form" label-width="100px" ref="formRef" v-if="Object.keys(detail).length">
                <div v-if="activeName == 'basicInfo'">
                    <el-card class="card !border-none" shadow="never">
                        <el-form-item :label="t('goodsImage')">
                            <el-image class="w-[98px] h-[98px]" fit="contain" :src="img(detail.goods_info.goods_cover_thumb_small)"/>
                        </el-form-item>
                        <el-form-item :label="t('goodsName')">{{ detail.goods_info.goods_name }}</el-form-item>
                    </el-card>
                </div>
                <div v-if="activeName == 'commissionSet' && formData.is_fenxiao">
                    <el-card class="card !border-none" shadow="never">
                        <el-form-item :label="t('countPrice')">
                            <div class="w-full">
                                <el-table :data="formData.skuList" size="large">
                                    <el-table-column prop="sku_name" :label="t('skuName')" min-width="120" >
                                        <template #default="{row}">
                                            <span>{{ row.sku_name||detail.goods_info.goods_name }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="price" :label="t('salesPrice')" min-width="120" />
                                    <el-table-column prop="cost_price" :label="t('costPrice')" min-width="120" />
                                    <el-table-column :label="t('calculatePrice')" min-width="120">
                                        <template #default="{ row, $index }">
                                            <div class="h-[62px] border-box py-[15px]">
                                                ￥{{row.calculate_price}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <p class="text-[var(--el-text-color-secondary)] text-[12px] leading-[25px]">{{ t('calculatePriceTip') }}</p>
                            </div>
                        </el-form-item>
                        <el-form-item :label="t('type')">{{ detail.goods_info.fenxiao_type==1?t('typeLabelOne'):t('typeLabelTwo')}}</el-form-item>
                        <el-form-item v-if="detail.goods_info.fenxiao_type==1">
                            <el-table :data="detail.rule" size="large">
                                <el-table-column prop="level_name" :label="t('levelname')" min-width="120" />
                                <el-table-column prop="one_rate" :label="t('oneRate')" min-width="120">
                                    <template #default="{ row }">
                                        <span>{{row.one_rate }}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="two_rate" :label="t('twoRate')" min-width="120">
                                    <template #default="{ row }">
                                        <span>{{row.two_rate }}%</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                        <el-form-item v-else>
                            <el-table :data="detail.rule" size="large" class="rule">
                                <el-table-column :label="t('skuName')" min-width="120">
                                    <template #default="{ row }">
                                        <p class="leading-[62px] px-[16px] border-box" :class="{'border-b-[1px] border-solid border-[var(--el-table-border-color)]':index<(formData.skuList.length-1)}"  v-for="(item, index) in formData.skuList" :key="index">{{ item.sku_name }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="t('price')" min-width="120">
                                    <template #default="{ row }">
                                        <p class="leading-[62px] px-[16px] border-box" :class="{'border-b-[1px] border-solid border-[var(--el-table-border-color)]':index<(formData.skuList.length-1)}"  v-for="(item, index) in formData.skuList" :key="index">￥{{ item.price }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="level_name" :label="t('rateName')" min-width="120" >
                                    <template #default="{ row }">
                                        <p class="px-[16px] border-box">{{row.level_name }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="t('oneRate')" min-width="120">
                                    <template #default="{ row }">
                                        <template v-for="(item, index) in formData.skuList" :key="index">
                                            <div v-if="formData.fenxiao_rule[item.sku_id][row.level_id].one_rate" class="h-[62px] border-box py-[15px] px-[16px]" :class="{'border-b-[1px] border-solid border-[var(--el-table-border-color)]':index<(formData.skuList.length-1)}">
                                                {{formData.fenxiao_rule[item.sku_id][row.level_id].one_rate}}%
                                            </div>
                                            <div v-else class="h-[62px] border-box py-[15px] px-[16px]" :class="{'border-b-[1px] border-solid border-[var(--el-table-border-color)]':index<(formData.skuList.length-1)}">
                                                {{formData.fenxiao_rule[item.sku_id][row.level_id].one_money}}元
                                            </div>
                                        </template>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="two_rate" :label="t('twoRate')" min-width="120">
                                    <template #default="{ row }">
                                        <template v-for="(item, index) in formData.skuList" :key="index">
                                            <div v-if="formData.fenxiao_rule[item.sku_id][row.level_id].two_rate" class="h-[62px] border-box py-[15px] px-[16px]"  :class="{'border-b-[1px] border-solid border-[var(--el-table-border-color)]':index<(formData.skuList.length-1)}">
                                                {{formData.fenxiao_rule[item.sku_id][row.level_id].two_rate}}%
                                            </div>
                                            <div v-else class="h-[62px] border-box py-[15px] px-[16px]"  :class="{'border-b-[1px] border-solid border-[var(--el-table-border-color)]':index<(formData.skuList.length-1)}">
                                                {{formData.fenxiao_rule[item.sku_id][row.level_id].two_money}}元
                                            </div>
                                        </template>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-card>
                </div>
            </el-form>
        </div>
    </el-drawer>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref } from 'vue'
import { img } from '@/utils/common'
import { getFenxiaoGoodsInfo } from '@/addon/shop_fenxiao/api/goods'

const showDialog = ref(false)
const loading = ref(true)
const emit = defineEmits(['load'])

const activeName = ref('basicInfo')
const detail = ref<any>({})
let id = ''
const formData:Record<string, any> = ref({
    id:0,
    is_fenxiao: 1,
    fenxiao_type: 1,
    skuList: [],
    fenxiao_rule: {}
})

const handleClick = (data:string) => {
    activeName.value = data
}

const handleClose = (done: () => void) => {
    activeName.value = 'basicInfo';
    showDialog.value = false;
}

const getDetail = (id: any) => {
    loading.value = true
    getFenxiaoGoodsInfo(id).then((res: any) => {
        detail.value = res.data
        formData.value.id = id
        formData.value.fenxiao_type = res.data.goods_info.fenxiao_type
        formData.value.is_fenxiao = res.data.goods_info.is_set_fenxiao
        formData.value.skuList = res.data.goods_info.skuList
        formData.value.fenxiao_rule = JSON.parse(res.data.goods_info.fenxiaoGoods.fenxiao_rule)
        loading.value = false
    }).catch(()=>{
        loading.value = false
    })
}

const setFormData = async (row: any = null) => {
    id = row.id;
    getDetail(id);
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss">
.member-detail-drawer{
    width: 1000px !important;
}
</style>
