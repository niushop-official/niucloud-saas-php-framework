<template>
    <el-dialog v-model="invoiceDialog" :title="t('invoice')" width="420px">
        <div>
            <el-form :model="makeInvoice" ref="makeInvoiceFormRef" :rules="formRules" label-width="80px" label-position="right" >
                <el-form-item :label="t('invoiceNumber')" prop="invoice_number">
                    <el-input v-model.trim="makeInvoice.invoice_number" maxlength="30"/>
                </el-form-item>
                <el-form-item :label="t('invoiceVoucher')" prop="invoice_voucher">
                    <upload-image v-model="makeInvoice.invoice_voucher" />
                </el-form-item>
                <el-form-item :label="t('remark')" prop="remark">
                    <el-input v-model.trim="makeInvoice.remark" type="textarea" maxlength="200" show-word-limit />
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="invoiceDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="refundDialogLoading" @click="refundDialogConfirm(makeInvoiceFormRef)">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { t } from '@/lang'
import { FormInstance } from 'element-plus'
import { setInvoice } from '@/addon/shop/api/order'

const invoiceDialog = ref(false)

/**
 * 表单数据
 */
const makeInvoice = ref({
    invoice_number: '',
    remark: '',
    invoice_voucher: ''
})

const refundDialogLoading = ref(false)
let id = 0
const setInvoiceData = async (row: any = null) => {
    if (row) {
        id = row.id
        makeInvoice.value.invoice_number = row.invoice_number
        makeInvoice.value.remark = row.remark
        makeInvoice.value.invoice_voucher = row.invoice_voucher
    }
}

const emit = defineEmits(['complete'])
const refundDialogConfirm = async (formEl: FormInstance | undefined) => {
    if (refundDialogLoading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            refundDialogLoading.value = true
            const data = makeInvoice.value
            setInvoice(id, data).then((res) => {
                emit('complete')
                invoiceDialog.value = false
                refundDialogLoading.value = false
            }).catch(() => {
                refundDialogLoading.value = false
            })
        }
    })
}
const makeInvoiceFormRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        invoice_number: [{ required: true, message: t('invoiceNumberPlaceholder'), trigger: 'blur' }]
    }
})
defineExpose({
    invoiceDialog,
    setInvoiceData
})
</script>
