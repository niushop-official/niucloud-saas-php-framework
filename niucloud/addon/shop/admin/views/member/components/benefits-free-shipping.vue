<template>
    <el-form ref="formRef" :model="formData" :rules="formRules">
        <el-form-item label="" prop="money" class="!mb-0">
            <div class="flex items-center">
                <el-checkbox v-model="formData.is_use" :true-label="1" :false-label="0" label="" size="large" class="!mr-0"/>
                <span class="ml-[10px] el-form-item__label">包邮</span>
            </div>
        </el-form-item>
        <div class="text-sm text-gray-400 mb-[5px]">该包邮仅针对物流配送</div>
    </el-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { FormRules } from 'element-plus'

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
    is_use: 0
})
const formRef = ref(null)

const formRules = reactive<FormRules>({})

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
    return true
}

defineExpose({
    verify
})
</script>

<style lang="scss" scoped>
</style>
