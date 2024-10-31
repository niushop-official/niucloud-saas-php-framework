<template>
    <el-dialog v-model="showDialog" :title="t('userCreateSiteLimit')" width="700px" :destroy-on-close="true">
        <el-form :model="formData" label-width="130px" ref="formRef" :rules="formRules" class="page-form" autocomplete="off" v-loading="loading">
            <el-form-item :label="t('siteGroup')" prop="group_id">
                <el-select v-model="formData.group_id" :placeholder="t('siteGroupPlaceholder')" :disabled="formData.id">
                    <el-option :label="item.group_name" :value="item.group_id" v-for="item in props.siteGroup"/>
                </el-select>
            </el-form-item>
            <el-form-item :label="t('createSiteNum')" prop="num">
                <div>
                    <el-input v-model.number.trim="formData.num" class="!w-[150px]"/>
                    <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" v-if="formData.group_id">{{ t('createdSiteNum') }}：{{ props.siteGroup[formData.group_id].site_num }}</p>
                </div>
            </el-form-item>
            <el-form-item :label="t('createSiteTimeLimit')" prop="month">
                <el-input v-model.number.trim="formData.month" class="!w-[150px]">
                    <template #append>
                        {{ t('month') }}
                    </template>
                </el-input>
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
import { computed, ref, watch } from 'vue'
import { t } from '@/lang'
import { getUserCreateSiteLimitInfo, addUserCreateSiteLimit, editUserCreateSiteLimit } from '@/app/api/user'
import { FormInstance } from 'element-plus'

const props = defineProps({
    siteGroup: {
        type: Object,
        default: () => {
            return {}
        }
    },
    uid: {
        type: Number,
        default: 0
    }
})
const showDialog = ref(false)
const formRef = ref(null)
const formData = ref({
    id: 0,
    uid: props.uid,
    group_id: '',
    num: 1,
    month: 1
})
const loading = ref(false)
// 表单验证规则
const formRules = computed(() => {
    return {
        group_id: [
            { required: true, message: t('siteGroupPlaceholder'), trigger: 'blur' }
        ],
        num: [
            { required: true, message: t('numPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: any, callback: Function) => {
                    if (value <= 0) callback(t('numCannotLtZero'))
                    callback()
                }
            }
        ],
        month: [
            { required: true, message: t('monthPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: any, callback: Function) => {
                    if (value <= 0) callback(t('monthCannotLtZero'))
                    callback()
                }
            }
        ]
    }
})

const emits = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            const save = formData.value.id ? editUserCreateSiteLimit : addUserCreateSiteLimit

            save(formData.value).then(() => {
                loading.value = false
                showDialog.value = false
                emits('complete')
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

const setFormData = (id: number = 0) => {
    if (id) {
        getUserCreateSiteLimitInfo(id).then(({ data }) => {
            formData.value = data
            showDialog.value = true
        })
    } else {
        showDialog.value = true
    }
}

watch(() => showDialog.value, () => {
    if (!showDialog.value) {
        formData.value = {
            id: 0,
            uid: props.uid,
            group_id: '',
            num: 1,
            month: 1
        }
    }
})

defineExpose({
    setFormData,
    loading
})
</script>

<style lang="scss" scoped></style>
