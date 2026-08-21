<template>
    <div v-for="item in benefits">
        <component :is="item.component" v-model="formData[item.key]" ref="benefitsRefs" v-if="item.component"/>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { t } from '@/lang'
import { getBenefitsDict } from '@/app/api/member'
import { resolveAsyncComponent } from '@/utils/core-component-resolver'

const benefits = ref({})
const props = defineProps({
    modelValue: {
        type: Object,
        default: () => {
            return {}
        }
    }
})
const emits = defineEmits(['update:modelValue'])
const formData = ref({})
const value = computed({
    get () {
        return props.modelValue
    },
    set (value) {
        emits('update:modelValue', value)
    }
})
const benefitsRefs = ref([])

watch(() => value.value, (nval, oval) => {
    if ((!oval || !Object.keys(oval).length) && Object.keys(nval).length) {
        formData.value = value.value
    }
}, { immediate: true })

watch(() => formData.value, () => {
    value.value = formData.value
}, { deep: true })

getBenefitsDict().then(({ data }) => {
    Object.keys(data).forEach((key: string) => {
        data[key].component && (data[key].component = resolveAsyncComponent(data[key].component))
    })
    benefits.value = data
})

/**
 * 验证
 */
const verify = async () => {
    let verify = true
    for (let i = 0; i < benefitsRefs.value.length; i++) {
        const item = benefitsRefs.value[i]
        !await item.verify() && (verify = false)
    }
    return verify
}

defineExpose({
    verify
})
</script>

<style lang="scss" scoped>
</style>
