<template>
    <el-upload v-bind="upload" class="w-full upload-file">
        <slot>
            <el-input v-model="value" class="w-full" :readonly="true" :title="value">
                <template #append>{{ t('upload.root') }}</template>
            </el-input>
        </slot>
    </el-upload>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { t } from '@/lang'
import { getToken } from '@/utils/common'
import { UploadFile, ElMessage } from 'element-plus'
import storage from '@/utils/storage'

const prop = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    api: {
        type: String,
        default: 'sys/document/document'
    },
    accept: {
        type: String,
        default: '.doc,.docx,.xml,.txt,.pem,.zip,.rar,.7z,.crt,.key,.xls,.xlsx'
    }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get () {
        return prop.modelValue
    },
    set (value) {
        emit('update:modelValue', value)
    }
})

const upload = computed(() => {
    const headers: Record<string, any> = {}
    headers[import.meta.env.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken()
    headers[import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY] = storage.get('siteId') || 0
    const baseURL = import.meta.env.VITE_APP_BASE_URL.substr(-1) == '/' ? import.meta.env.VITE_APP_BASE_URL : `${import.meta.env.VITE_APP_BASE_URL}/`

    return {
        action: `${baseURL}${prop.api}`,
        showFileList: false,
        accept: prop.accept,
        headers,
        onSuccess: (response: any, uploadFile: UploadFile) => {
            if (response.code != undefined && response.code != 1) {
                ElMessage({ message: response.msg, type: 'error' })
                return
            }
            value.value = response.data.url
            ElMessage({ message: t('upload.success'), type: 'success' })
        }
    }
})
</script>

<style lang="scss">
.upload-file .el-upload {
    width: 100%;
}
</style>
