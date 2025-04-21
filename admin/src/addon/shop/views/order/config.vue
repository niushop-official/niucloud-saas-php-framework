<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-form :model="formData" label-width="95" ref="formRef" :rules="rules" class="page-form" v-loading="loading">
                <el-card class="box-card !border-none" shadow="never">
                    <div class="flex justify-start items-center">
                        <h3 class="panel-title !text-sm pl-[15px]">{{ t('closeOrderInfo') }}</h3>
                        <el-form-item class="ml-[-80px]" prop="is_close">
                            <el-checkbox v-model="formData.is_close"  true-label="1" false-label="2" />
                        </el-form-item>
                    </div>
                    <el-form-item prop="close_length" v-if="formData.is_close == '1'">
                        <div>
                            <p class="!text-sm">
                                <span>{{ t('closeOrderInfoLeft') }}</span>
                                <el-input v-model.trim="formData.close_length" class="!w-[120px] mx-[10px]" @keyup="filterNumber($event)" clearable />
                                <span>{{ t('closeOrderInfoRight') }}</span>
                            </p>
                            <p class="text-[12px] text-[#a9a9a9] leading-normal  mt-[5px]">{{ t('closeOrderInfoBottom') }}</p>
                        </div>
                    </el-form-item>
                </el-card>
                <el-card class="box-card !border-none" shadow="never">
                    <div class="flex justify-start items-center">
                        <h3 class="panel-title !text-sm pl-[15px]">{{ t('confirm') }}</h3>
                        <el-form-item  class="ml-[-80px]"  prop="is_finish">
                            <el-checkbox v-model="formData.is_finish"  true-label="1" false-label="2" />
                        </el-form-item>
                    </div>
                    <el-form-item prop="finish_length" v-if="formData.is_finish == '1'">
                        <div>
                            <p class="!text-sm">
                                <span>{{ t('confirmLeft') }}</span>
                                <el-input v-model.trim="formData.finish_length" class="!w-[120px] mx-[10px]" @keyup="filterNumber($event)" clearable />
                                <span>{{ t('confirmRight') }}</span>
                            </p>
                            <p class="text-[12px] text-[#a9a9a9] leading-normal  mt-[5px]">{{ t('confirmBottom') }}</p>
                        </div>
                    </el-form-item>
                </el-card>
                <el-card class="box-card !border-none" shadow="never">
                    <div class="flex justify-start items-center">
                        <h3 class="panel-title !text-sm pl-[15px]">{{ t('refund') }}</h3>
                        <el-form-item  class="ml-[-80px]" prop="no_allow_refund">
                            <el-checkbox v-model="formData.no_allow_refund"  :true-label="1" :false-label="2" />
                        </el-form-item>
                    </div>
                    <el-form-item prop="refund_length" v-if="formData.no_allow_refund == '1'">
                        <div>
                            <p class="!text-sm">
                                <span>{{ t('refundLeft') }}</span>
                                <el-input v-model.trim="formData.refund_length" class="!w-[120px] mx-[10px]" @keyup="filterNumber($event)" clearable />
                                <span>{{ t('refundRight') }}</span>
                            </p>
                            <p class="text-[12px] text-[#a9a9a9] leading-normal  mt-[5px]">{{ t('refundBottom') }}</p>
                        </div>
                    </el-form-item>
                </el-card>
                <!-- 万能表单 -->
                <el-card class="box-card !border-none" shadow="never">
                    <h3 class="panel-title !text-sm pl-[15px]">{{ t('diyForm') }}</h3>
                    <el-form-item>
                        <el-select v-model="formData.form_id" :placeholder="t('diyFormPlaceholder')" clearable>
                            <el-option v-for="item in diyFormOptions" :key="item.form_id" :label="item.page_title" :value="item.form_id" />
                        </el-select>
                        <div class="ml-[10px]">
                            <span class="cursor-pointer text-primary mr-[10px]" @click="refreshDiyForm(true)">{{ t('refresh') }}</span>
                            <span class="cursor-pointer text-primary" @click="toDiyFormEvent">{{ t('addDiyForm') }}</span>
                        </div>
                    </el-form-item>
                </el-card>
                <el-card class="box-card !border-none" shadow="never">
                    <h3 class="panel-title !text-sm pl-[15px]">{{ t('evaluate') }}</h3>
                    <el-form-item prop="refund_length">
                        <span>{{ t('isEvaluate') }}</span>
                        <el-radio-group class="mx-[10px]" v-model="formData.is_evaluate">
                            <el-radio :label="1">{{ t('isEvaluateOpen') }}</el-radio>
                            <el-radio :label="0">{{ t('isEvaluateClose') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="refund_length">
                        <span>{{ t('evaluateIsToExamine') }}</span>
                        <el-radio-group class="mx-[10px]" v-model="formData.evaluate_is_to_examine">
                            <el-radio :label="1">{{ t('isEvaluateOpen') }}</el-radio>
                            <el-radio :label="0">{{ t('isEvaluateClose') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="refund_length">
                        <span>{{ t('evaluateIsShow') }}</span>
                        <el-radio-group class="mx-[10px]" v-model="formData.evaluate_is_show">
                            <el-radio :label="1">{{ t('isEvaluateOpen') }}</el-radio>
                            <el-radio :label="0">{{ t('isEvaluateClose') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-card>
                <el-card class="box-card !border-none" shadow="never">
                    <h3 class="panel-title !text-sm pl-[15px]">{{ t('invoice') }}</h3>
                    <el-form-item>
                        <span>{{ t('isInvoice') }}</span>
                        <el-radio-group class="mx-[10px]" v-model="formData.is_invoice">
                            <el-radio label="2">{{ t('isInvoiceClose') }}</el-radio>
                            <el-radio label="1">{{ t('isInvoiceOpen') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="invoice">
                        <div class="flex">
                            <div>{{ t('invoiceContent') }}</div>
                            <div class="mx-[10px]">
                                <el-form-item :prop="`invoice_content[${index}]`" v-for="(item, index) in formData.invoice_content" :key="index" :rules="[{ validator: (rule:any, value:any, callback:Function) => {
                                            if (formData.is_invoice === '1') {
                                                if (value === ''){
                                                    return callback(t('invoicePlaceholder'))
                                                } else {
                                                    return callback()
                                                }
                                            } else {
                                                return callback()
                                            }
                                        }, trigger: 'blur' }]">
                                    <div :class="['w-[120px] relative', index ? 'mt-[15px]' : '']" >
                                        <el-input v-model.trim="formData.invoice_content[index]" class="!w-[120px]" clearable />
                                        <el-icon v-if="index" color="rgba(0, 0, 0, 0.3)" class="!absolute right-[-6px] top-[-5px]" @click="clearInvoiceContent(index)">
                                            <CircleCloseFilled />
                                        </el-icon>
                                    </div>
                                </el-form-item>
                            </div>
                            <el-button @click="insertInvoiceContent">{{ t('insert') }}</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item prop="invoice_type">
                        <span class="mr-[10px]">{{ t('invoiceType') }}</span>
                        <el-checkbox-group v-model="formData.invoice_type">
                            <el-checkbox label="1">{{ t('electronicInvoice') }}</el-checkbox>
                            <el-checkbox label="2">{{ t('paperInvoice') }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-card>
            </el-form>
            <div class="fixed-footer-wrap" v-if="!loading">
                <div class="fixed-footer">
                    <el-button type="primary" @click="onSave(formRef)">{{ t('save') }}</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
import { ref,reactive } from 'vue'
import { t } from '@/lang'
import { getConfig, setConfig } from '@/addon/shop/api/order'
import { useRoute,useRouter } from 'vue-router'
import { filterNumber } from '@/utils/common'
import { getDiyFormList } from '@/app/api/diy_form'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

const pageName = route.meta.title
const formData = ref({
    close_length: '10',
    finish_length: '1',
    invoice_content: [''],
    invoice_type: [],
    is_close: '1',
    is_finish: '1',
    is_invoice: '1',
    no_allow_refund: '1',
    refund_length: '1',
    is_evaluate: 1,
    evaluate_is_to_examine: 1,
    evaluate_is_show: 1,
    form_id: ''
})

const validCloseLength = (rule:any, value:any, callback:Function) => {
    if (formData.value.is_close != '2') {
        if (value == '') {
            return callback(new Error(t('CloseLengthPlaceholder')))
        } else if (Number(value) >= 10 && Number(value) <= 1440) {
            return callback()
        } else {
            return callback(new Error(t('closeOrderInfoBottom')))
        }
    } else {
        return callback()
    }
}

const validFinishLength = (rule:any, value:any, callback:Function) => {
    if (formData.value.is_finish != '2') {
        if (value == '') {
            return callback(new Error(t('finishLengthPlaceholder')))
        } else if (Number(value) >= 1 && Number(value) <= 30) {
            return callback()
        } else {
            return callback(new Error(t('confirmBottom')))
        }
    } else {
        return callback()
    }
}

const validRefundLength = (rule:any, value:any, callback:Function) => {
    if (formData.value.no_allow_refund != '2') {
        if (value == '') {
            return callback(new Error(t('validRefundLengthPlaceholder')))
        } else if (Number(value) >= 1 && Number(value) <= 30) {
            return callback()
        } else {
            return callback(new Error(t('refundBottom')))
        }
    } else {
        return callback()
    }
}

const validInvoiceType = (rule:any, value:any, callback:Function) => {
    if (formData.value.is_invoice === '1') {
        if (!value.length) {
            return callback(new Error(t('invoiceTypePlaceholder')))
        } else {
            return callback()
        }
    } else {
        return callback()
    }
}

const rules = ref({
    close_length: [
        { validator: validCloseLength, trigger: 'blur' }
    ],
    finish_length: [
        { validator: validFinishLength, trigger: 'blur' }
    ],
    refund_length: [
        { validator: validRefundLength, trigger: 'blur' }
    ],
    invoice_type: [
        { validator: validInvoiceType, trigger: 'change' }
    ]
})

/** ***************** 万能表单-start *************************/
// 万能表单列表下拉框
const diyFormOptions = reactive([])
// 跳转到万能表单列表，添加表单
const toDiyFormEvent = () => {
    const url = router.resolve({
        path: '/diy_form/list'
    })
    window.open(url.href)
}

// 刷新万能表单
const refreshDiyForm = (bool = false) => {
    getDiyFormList({
        type: 'DIY_FROM_ORDER_PAYMENT',
        status: 1
    }).then((res) => {
        const data = res.data
        if (data) {
            diyFormOptions.splice(0, diyFormOptions.length, ...data)
            if (bool) {
                ElMessage({
                    message: t('refreshSuccess'),
                    type: 'success'
                })
            }
        }
    })
}

refreshDiyForm()
/** *****************万能表单-end *************************/

const loading = ref(false)
const getConfigFn = () => {
    loading.value = true
    getConfig().then(res => {
        Object.values(res.data).forEach(el => {
            formData.value = Object.assign(formData.value, el)
        })
        formData.value.form_id = res.data.form_id;
        if (!formData.value.invoice_content.length) formData.value.invoice_content.push('')
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}
const insertInvoiceContent = () => {
    formData.value.invoice_content.push('')
}
const clearInvoiceContent = (index:number) => {
    formData.value.invoice_content.splice(index, 1)
}
getConfigFn()
const formRef = ref()

const onSave = async (formEl: any) => {
    await formEl.validate(async (valid:any) => {
        if (valid) {
            loading.value = true
            setConfig(formData.value).then(res => {
                getConfigFn()
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>
<style lang="scss" scoped>
</style>
