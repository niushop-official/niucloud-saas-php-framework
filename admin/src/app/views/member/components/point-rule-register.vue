<template>
    <el-form ref="formRef" :model="formData" :rules="formRules">
        <el-form-item label="" prop="point">
            <div>
                <div>
                    <span class="el-form-item__label">会员注册</span>
                    <el-switch v-model="formData.is_use" :active-value="1" :inactive-value="0"/>
                </div>
                <div class="flex mt-[10px]" v-show="formData.is_use">
                    <span class="el-form-item__label">发放</span>
                    <div class="w-[70px]">
                        <el-input v-model.number.trim="formData.point" clearable />
                    </div>
                    <span class="ml-[10px] el-form-item__label">积分</span>
                </div>
            </div>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { FormRules } from 'element-plus'
import Test from '@/utils/test'

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
    is_use: 0,
    point: ''
})

const formRef = ref(null)

const formRules = reactive<FormRules>({
    point: [
        {
            validator: (rule: any, value: any, callback: Function) => {
                if (formData.value.is_use) {
                    if (Test.empty(formData.value.point)) {
                        callback('请输入发放积分数量')
                    }
                    if (!Test.digits(formData.value.point)) {
                        callback('积分数量格式错误')
                    }
                    if (formData.value.point <= 0) {
                        callback('积分数量不能小于等于0')
                    }
                    callback()
                } else {
                    callback()
                }
            }
        }
    ]
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
</style>
