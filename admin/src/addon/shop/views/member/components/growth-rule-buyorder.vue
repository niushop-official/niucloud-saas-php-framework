<template>
    <el-form ref="formRef" :model="formData" :rules="formRules">
        <el-form-item label="" prop="growth">
            <div>
                <div>
                    <span class="el-form-item__label">完成下单</span>
                    <el-switch v-model="formData.is_use" :active-value="1" :inactive-value="0"/>
                </div>
                <div class="flex mt-[10px]" v-show="formData.is_use">
                    <span class="el-form-item__label">每完成一单可获得</span>
                    <div class="w-[70px]">
                        <el-input v-model.number.trim="formData.growth" clearable />
                    </div>
                    <span class="ml-[10px] el-form-item__label">成长值</span>
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
    growth: ''
})

const formRef = ref(null)

const formRules = reactive<FormRules>({
    growth: [
        {
            validator: (rule: any, value: any, callback: Function) => {
                if (formData.value.is_use) {
                    if (Test.empty(formData.value.growth)) {
                        callback('请输入发放成长值数量')
                    }
                    if (!Test.digits(formData.value.growth)) {
                        callback('成长值数量格式错误')
                    }
                    if (formData.value.growth <= 0) {
                        callback('成长值数量不能小于等于0')
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
