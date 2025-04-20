<template>
    <div class="main-container">
        <el-card class="card !border-none mb-[15px]" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="toLink" />
        </el-card>

        <el-form :model="formData" label-width="120px" ref="formRef" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none relative" shadow="never" v-if="formData">
                <h3 class="panel-title">{{ t('cardInfo') }}</h3>
                <el-row class="row-bg">
                    <el-col :span="8">
                        <el-form-item :label="t('cardNo')">
                            <div class="input-width">{{ formData.card_no }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('createTime')">
                            <div class="input-width">{{ formData.create_time }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('goodsType')">
                            <div class="input-width">{{ formData.goods_type_name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('cardType')">
                            <div class="input-width">{{ formData.card_type_name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('status')">
                            <div class="input-width">{{ formData.status_name }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3 class="panel-title">{{ t('orderInfo') }}</h3>
                <el-row class="row-bg" justify="space-between">
                    <el-col :span="8">
                        <el-form-item :label="t('orderNo')">
                            <div class="input-width">{{ formData.order.order_no }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('createTime')">
                            <div class="input-width">{{ formData.order.create_time || '' }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('orderFromName')">
                            <div class="input-width">{{ formData.order.order_from_name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('member')">
                            <div class="input-width">{{ formData.member.nickname }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('mobile')">
                            <div class="input-width">{{ formData.member.mobile }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="t('ip')">
                            <div class="input-width">{{ formData.order.ip }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formData.order.pay_time">
                        <el-form-item :label="t('payTime')">
                            <div class="input-width">{{ formData.order.pay_time }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>

                <h3 class="panel-title">{{ t('cardContent') }}</h3>
                <el-table :data="formData.member_card_item" size="large">
                    <template #empty>
                        <span>{{ t('emptyData') }}</span>
                    </template>
                    <el-table-column :label="t('goodsInfo')" min-width="200" align="left">
                        <template #default="{ row }">
                            <div class="flex">
                                <img class="w-[60px] max-h-[60px] mr-[10px]" :src="img(row.cover_thumb_small)" />
                                <div>
                                    <p>{{ row.goods_name }}</p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" :label="t('price')" min-width="100" align="left" />
                    <el-table-column prop="expire_time_name" :label="t('expireTime')" min-width="150" align="left" />
                    <el-table-column :label="t('num')" min-width="120" align="left">
                        <template #default="{ row }">
                            <span v-if="formData.card_type == 'timecard'">{{ t('timecard') }}</span>
                            <span v-else>{{ row.num }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="use_num" :label="t('useNum')" min-width="120" align="left" />
                    <el-table-column prop="verify_code" :label="t('verifyCode')" min-width="150" align="left" />
                    <el-table-column :label="t('operation')" align="right" fixed="right" min-width="100">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="verifyEvent(row)">{{ t('verifyInfo') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-card>
        </el-form>
        <el-dialog v-model="showDialog" :title="t('verifyInfo')" width="750px" :destroy-on-close="true">
            <div class="min-h-[200px]">
                <el-table :data="itemLsit.member_card_verify" size="large">
                    <template #empty>
                        <span>{{ t('emptyData') }}</span>
                    </template>
                    <el-table-column prop="verify_code" :label="t('verifyCode')" min-width="150" align="left" />
                    <el-table-column prop="create_time" :label="t('createTime')" min-width="150" align="left" />
                    <el-table-column prop="num" :label="t('verifyNum')" min-width="150" align="left" />
                    <el-table-column prop="verifyer" :label="t('verifierMember')" min-width="150" align="left" />
                </el-table>
            </div>

            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="showDialog = false">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getCardMemberRecordDerail } from '@/addon/vipcard/api/vipcard'
import { useRoute, useRouter } from 'vue-router'
import { img } from '@/utils/common'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const cardId: number = parseInt(route.query.id)
const loading = ref(true)

const formData: Record<string, any> | null = ref(null)

const setFormData = async (orderId: number = 0) => {
    loading.value = true
    formData.value = null
    await getCardMemberRecordDerail(cardId)
        .then(({ data }) => {
            formData.value = data
        })
        .catch(() => {

        })
    loading.value = false
}
if (cardId) setFormData(cardId)
else loading.value = false

const formRef = ref<FormInstance>()
const toLink = () => {
    router.push('/vipcard/goods/card/record_list?id=' + formData.value.goods_id)
}

const showDialog = ref(false)
const itemList = ref([])
const verifyEvent = (item:any) => {
    if (item.member_card_verify.length <= 0) {
        ElMessage(t('notVerifyInfo'))
        return
    }
    showDialog.value = true
    itemList.value = item
}

</script>

<style lang="scss" scoped></style>
