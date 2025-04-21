<template>
    <el-upload v-bind="upload" ref="uploadRef">
        <slot></slot>
    </el-upload>
</template>

<script lang='ts' setup>
import { computed, ref } from 'vue'
import { getToken } from '@/utils/common'
import storage from '@/utils/storage'
import { ElMessage, UploadFile, UploadFiles } from 'element-plus'

const prop = defineProps({
    type: {
        type: String,
        default: 'image'
    }
})

const emits = defineEmits(['success'])

const uploadRef = ref<Record<string, any> | null>(null)
// 上传文件
const upload = computed(() => {
    const headers: Record<string, any> = {}
    headers[import.meta.env.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken()
    headers[import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY] = storage.get('siteId') || 0

    return {
        action: `${import.meta.env.VITE_APP_BASE_URL}/wechat/media/${prop.type}`,
        multiple: true,
        headers,
        accept: prop.type == 'image' ? '.bmp,.png,.jpeg,.jpg,.gif' : '.mp4',
        onSuccess: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
            if (response.code >= 1) {
                emits('success', response.data)
                uploadRef.value?.handleRemove(uploadFile)
            } else {
                uploadFile.status = 'fail'
                uploadRef.value?.handleRemove(uploadFile)
                ElMessage({ message: response.msg, type: 'error' })
            }
        }
    }
})
</script>
