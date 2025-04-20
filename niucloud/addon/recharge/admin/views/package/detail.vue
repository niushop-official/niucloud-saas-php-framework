<template>
    <el-drawer v-model="showDialog" :title="t('detailTitle')" direction="rtl" :before-close="handleClose" class="member-detail-drawer">
        <div class="main-container" v-loading="loading">
            <el-tabs v-model="activeName" class="pb-[10px]" @tab-change="handleClick">
                <el-tab-pane :label="t('basicInfo')" name="basicInfo" />
                <el-tab-pane :label="t('giftPackInfo')" name="giftsList" />
            </el-tabs>
            <div v-if="activeName == 'basicInfo'" class="px-[24px]">
                <el-form :model="formData" label-width="120px" ref="formRef" label-position="left">
                    <div class="relative" shadow="never" v-if="formData">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item :label="t('rechargeName')">
                                    <div class="input-width">
                                        <span>{{ formData.recharge_name }}</span>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item :label="t('status')">
                                    <div class="input-width">
                                        <span>{{ formData.status_name }}</span>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item :label="t('faceValue')">
                                    <div class="input-width">
                                        <span>{{ formData.face_value }}</span>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item :label="t('price')">
                                    <div class="input-width">
                                        <span>{{ formData.buy_price }}</span>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item :label="t('createTime')">
                                    <div class="input-width">
                                        <span>{{ formData.create_time }}</span>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
            </div>
            <div v-if="activeName == 'giftsList'" class="px-[24px]">
                <div v-for="item in gifts">
                    <component :is="item.detail_component" v-model="formDataComponent[item.key]" ref="giftRefs" v-if="item.detail_component" />
                </div>
            </div>

        </div>
    </el-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref, defineAsyncComponent } from 'vue'
import { t } from '@/lang'
import { getRechargePackageInfo, getPackageGiftDict } from "@/addon/recharge/api/recharge";

const gifts = ref({})
const showDialog = ref(false)
const loading = ref(false)
let id = ''
const formData: Record<string, any> = ref({})
const formDataComponent: Record<string, any> = ref({})
const activeName = ref('basicInfo')
const handleClick = (data: string) => {
    activeName.value = data
}
const handleClose = (done: () => void) => {
    activeName.value = 'basicInfo';
    showDialog.value = false;
}
const getRechargePackageInfoFn = (id: number) => {
    loading.value = true
    const data = {
        recharge_id: id
    }
    getRechargePackageInfo(data).then((res: any) => {
        formData.value = Object.assign(formData.value, res.data)
        formDataComponent.value = Object.assign(formDataComponent.value, res.data.gift_json)
        loading.value = false
    })
}

const setFormData = async(row: any = null) => {
    id = row.id;
    getRechargePackageInfoFn(Number(id))

    const modules: any = import.meta.glob('@/**/*.vue')
    getPackageGiftDict().then(({ data }) => {
        Object.keys(data).forEach((key: string) => {
            if (modules[data[key].detail_component]) {
                data[key].detail_component && (data[key].detail_component = defineAsyncComponent(modules[data[key].detail_component]))
            } else {
                data.splice(key, 1);
            }
        })
        gifts.value = data
    })
}

defineExpose({
    showDialog,
    setFormData
})
</script>
<style lang="scss">
.member-detail-drawer {
    width: 1000px !important;
}
</style>
