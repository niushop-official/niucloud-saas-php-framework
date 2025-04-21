<template>
    <div v-for="item in gifts">
        <component :is="item.edit_component" v-model="formData[item.key]" ref="giftRefs" v-if="item.edit_component"/>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, computed, watch } from 'vue'
import {getPackageGiftDict} from "@/addon/recharge/api/recharge";

const gifts = ref({})
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
const giftRefs = ref([])

watch(() => value.value, (nval, oval) => {
    if ((!oval || !Object.keys(oval).length) && Object.keys(nval).length) {
        formData.value = value.value
    }
}, { immediate: true })

watch(() => formData.value, () => {
    value.value = formData.value
}, { deep: true })

const modules: any = import.meta.glob('@/**/*.vue')
getPackageGiftDict().then(({ data }) => {
    Object.keys(data).forEach((key: string) => {
        if (modules[data[key].edit_component]) {
            data[key].edit_component && (data[key].edit_component = defineAsyncComponent(modules[data[key].edit_component]))
        } else {
            data.splice(key, 1);
        }
    })
    gifts.value = data
})

const verify = async () => {
    let verify = true
    for (let i = 0; i < giftRefs.value.length; i++) {
        const item = giftRefs.value[i]
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
