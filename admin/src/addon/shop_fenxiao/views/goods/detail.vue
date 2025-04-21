<template>
    <div class="main-container" v-loading="loading">

        <!--返回-->
        <el-card class="card !border-none" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="back()" />
        </el-card>

        <el-card class="card mt-[15px] !border-none" shadow="never">
            <el-form class="page-form" label-width="200px" ref="formRef" v-if="Object.keys(detail).length">
                <div class="text text-[14px] leading-[25px]">{{ t('titleOne') }}</div>
                <el-card class="card !border-none" shadow="never">
                    <el-form-item :label="t('goodsImage')">
                        <el-image class="w-[98px] h-[98px]" fit="contain" :src="img(detail.goods_info.goods_cover_thumb_small)"/>
                    </el-form-item>
                    <el-form-item :label="t('goodsName')">{{ detail.goods_info.goods_name }}</el-form-item>
                </el-card>
                <template v-if="formData.is_fenxiao">
                    <div class="text text-[14px] leading-[25px]">{{ t('titleTwo') }}</div>
                    <el-card class="card !border-none" shadow="never">
                        <el-form-item :label="t('countPrice')">
                            <div class="w-full">
                                <el-table :data="formData.skuList" size="large">
                                    <el-table-column prop="sku_name" :label="t('skuName')" min-width="120" >
                                        <template #default="{row}">
                                            <span>{{ row.sku_name||detail.goods_info.goods_name }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="price" :label="t('skuPrice')" min-width="120" />
                                    <el-table-column prop="cost_price" :label="t('costPrice')" min-width="120" />
                                    <el-table-column :label="t('calculatePrice')" min-width="120">
                                        <template #default="{ row, $index }">
                                            <div class="h-[62px] border-box py-[15px]">￥{{row.calculate_price}}</div>
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
                </template>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref} from "vue";
import { t } from "@/lang";
import { img } from '@/utils/common'
import { getFenxiaoGoodsInfo } from '@/addon/shop_fenxiao/api/goods'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const pageName = route.meta.title;
const loading = ref<Boolean>(false)
const detail = ref<any>({})
    const formData = ref<any>({
    id:0,
    is_fenxiao: 1,
    fenxiao_type: 1,
    skuList: [],
    fenxiao_rule: {}
})
const formRef = ref()
const getDetail = (id: number) => {
    loading.value = true
    getFenxiaoGoodsInfo(id).then((res: any) => {
        detail.value = res.data
        formData.value.id = route.query.goods_id
        formData.value.fenxiao_type = res.data.goods_info.fenxiao_type
        formData.value.is_fenxiao = res.data.goods_info.is_set_fenxiao
        formData.value.skuList = res.data.goods_info.skuList
        formData.value.fenxiao_rule = JSON.parse(res.data.goods_info.fenxiaoGoods.fenxiao_rule)
        loading.value = false
    }).catch(()=>{
        loading.value = false
    })
}
let id = Number(route.query.goods_id)
getDetail(id)
const back = () => {
    router.push('/shop_fenxiao/management/goods')
};
</script>

<style lang="scss" scoped>
.rule :deep(.el-table__body .cell){
    padding:0;
}
</style>
