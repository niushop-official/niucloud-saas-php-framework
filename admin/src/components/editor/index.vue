<template>
    <upload-attachment type="image" ref="imageRef" limit="" @confirm="imageSelect" />
    <upload-attachment type="video" ref="videoRef" @confirm="videoSelect" />
    <vue-ueditor-wrap v-model="content" :config="editorConfig"  :editorDependencies="['ueditor.config.js','ueditor.all.js']" ref="editorRef"></vue-ueditor-wrap>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { getToken, img } from '@/utils/common'
import { VueUeditorWrap } from 'vue-ueditor-wrap'
import storage from '@/utils/storage'

const editorRef = ref()

const prop = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    mode: {
        type: String,
        default: 'simple'
    },
    height: {
        type: Number,
        default: 600
    }
})

const emit = defineEmits(['update:modelValue', 'handleBlur'])

const imageRef: Record<string, any> | null = ref(null)
const videoRef: Record<string, any> | null = ref(null)

const content = computed({
    get () {
        return prop.modelValue
    },
    set (value) {
        emit('update:modelValue', value)
    }
})

let editorEl = null

const serverHeaders = {}
serverHeaders[import.meta.env.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken()
serverHeaders[import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY] = storage.get('siteId') || 0
const baseUrl = import.meta.env.VITE_APP_BASE_URL.substr(-1) == '/' ? import.meta.env.VITE_APP_BASE_URL : `${import.meta.env.VITE_APP_BASE_URL}/`

const editorConfig = ref({
    debug: false,
    UEDITOR_HOME_URL: import.meta.env.MODE == 'development' ? '/public/ueditor/' : '/admin/ueditor/',
    UEDITOR_CORS_URL: import.meta.env.MODE == 'development' ? location.origin + '/ueditor/' : location.origin + '/admin/ueditor/',
    serverUrl: `${baseUrl}sys/ueditor`,
    serverHeaders,
    // 编辑器不自动被内容撑高
    autoHeightEnabled: false,
    // 初始容器高度
    initialFrameHeight: prop.height,
    // 初始容器宽度
    initialFrameWidth: '100%',
    toolbarCallback: function(cmd, editor) {
        editorEl = editor
        switch (cmd) {
            case 'insertimage':
                imageRef.value.showDialog = true
                return true
            case 'insertvideo':
                videoRef.value.showDialog = true
                return true
        }
    }
})

const imageSelect = (data: Record<string, any>) => {
    data.forEach((item: any) => {
        editorEl?.execCommand('insertHtml', `<img src="${img(item.url)}">`)
    })
}

const videoSelect = (data: Record<string, any>) => {
    editorEl?.execCommand('insertHtml', `<video src="${img(data.url)}">`)
}
</script>

<style lang="scss" scoped></style>
