<template>
    <el-form ref="formRef" label-width="120px" :model="formData" :rules="formRules">
        <el-form-item :label="t('point')" prop="value">
            <el-input v-model.trim="formData.value" clearable placeholder="0" class="input-width-short" maxlength="8" show-word-limit />
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { FormRules } from 'element-plus'
import Test from '@/utils/test'
import { t } from "@/lang";

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => {
            return {}
        }
    }
})
const emits = defineEmits(['update:modelValue'])

const formData = ref({
    value: ''
})

const formRef = ref(null)
// 正则表达式
const regExp = {
    required: /[\S]+/,
    number: /^\d{0,10}$/,
    digit: /^\d{0,10}(.?\d{0,2})$/,
    special: /^\d{0,10}(.?\d{0,3})$/
}
const formRules = reactive<FormRules>({
    value: [{
        trigger: 'blur',
        validator: (rule: any, value: any, callback: any) => {
            if (value === null || value === '') {
                callback()
            } else if (isNaN(value) || !regExp.number.test(value)) {
                callback(t('limitTips'))
            } else if (value < 0) {
                callback(t('valueMustBeGreaterThanZero'))
            } else {
                callback();
            }
        }
    }],
})

const value = computed({
    get () {
        return props.modelValue
    },
    set (value) {
        emits('update:modelValue', value)
    }
})

watch(() => value.value, (nval, oval) => {
    if ((!oval || !Object.keys(oval).length) && Object.keys(nval).length) {
        formData.value = value.value
    }
}, { immediate: true })

watch(() => formData.value, () => {
    value.value = formData.value
}, { deep: true })

const verify = async () => {
    let verify = true
    await formRef.value?.validate((valid) => {
        verify = valid
    })
    return verify
}

defineExpose({
    verify
})
</script>

<style lang="scss" scoped>
.input-width-short{
    width: 190px;
}
</style>
