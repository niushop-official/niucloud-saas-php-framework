<template>
    <el-dialog v-model="showDialog" :title="popTitle" width="500px" :destroy-on-close="true">
        <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
            <el-form-item :label="t('amount')" prop="amount">
                <el-input v-model="formData.amount" clearable :placeholder="t('amountPlaceholder')" class="input-width" />
            </el-form-item>
            <el-form-item :label="t('money')" prop="money">
                <el-input v-model="formData.money" clearable :placeholder="t('moneyPlaceholder')" class="input-width" />
            </el-form-item>
			
			<el-form-item :label="t('jifen')" prop="jifen">
			    <el-input v-model="formData.jifen" clearable :placeholder="t('jifenPlaceholder')" class="input-width" />
			</el-form-item>

            <el-form-item :label="t('level')" prop="level_id">
                <el-select v-model="formData.level_id" clearable :placeholder="t('memberLevelUpdate')" class="input-width">
                    <el-option :label="t('memberLevelUpdate')" :value="0" />
                    <el-option :label="item['level_name']" :value="item['level_id']" v-for="(item,index) in levelSelectData"  :key="index"/>
                </el-select>
                <div class="text-sm text-gray-400">{{ t('memberLevelUpdateTips') }}</div>
            </el-form-item>
          
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { addBalance, editBalance, getBalanceInfo } from '@/addon/yk_recharge/api/recharge'
import { getMemberLevelAll } from '@/app/api/member'

let popTitle: string = ''

const showDialog = ref(false)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
	setting_id:'',
    amount: '',
    money: '',
    jifen: '',
    level_id:''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        amount: [
            { required: true, message: t('amountPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string | number, callback: any) => {
                    if (value === '' || isNaN(value as number)) {
                        callback(new Error(t('amountNumber')))
                    }
                    callback()
                },
                trigger: 'blur'
            }
        ],
        money: [
            { required: true, message: t('moneyPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string | number, callback: any) => {
                    if (value === '' || isNaN(value as number)) {
                        callback(new Error(t('moneyNumber')))
                    }
                    callback()
                },
                trigger: 'blur'
            }
        ],
        jifen: [
            { required: true, message: t('jifenPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string | number, callback: any) => {
                    if (value === '' || isNaN(value as number)) {
                        callback(new Error(t('jifenNumber')))
                    }
                    callback()
                },
                trigger: 'blur'
            }
        ]
    }
})

const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    const save = formData.setting_id ? editBalance : addBalance

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            const data = formData

            save(data).then(res => {
                loading.value = false
                showDialog.value = false
                emit('complete')
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

const setFormData = async (row: any = null) => {
    loading.value = true
    Object.assign(formData, initialFormData)
    popTitle = t('addBalance')
    if (row) {
        popTitle = t('updateBalance')
        const data = await (await getBalanceInfo(row.setting_id)).data
        Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
        })
    }
    loading.value = false
}

const levelSelectData = ref([])
getMemberLevelAll().then(({ data }) => {
    levelSelectData.value = data
})

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
