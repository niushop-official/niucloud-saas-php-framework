<template>
    <el-dialog v-model="status" :title="t('exportTip')" width="300px" :close-on-click-modal="true" :close-on-press-escape="false" :show-close="false">
        <span>{{ t('exportPlaceholder') }}</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">{{ t('cancel') }}</el-button>
                <el-button type="primary" @click="detectionExportFn" :loading="loading">{{ t('exportConfirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { t } from '@/lang'
import { exportData, exportDataCheck } from '@/app/api/sys'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const prop = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: ''
    },
    searchParam: {
        type: Object,
        default: () => {
            return {}
        }
    }
})

const loading = ref(false)

const status = computed({
    get() {
        return prop.show
    },
    set(value) {
        emit('update:show', value)
    }
})
const emit = defineEmits(['update:show', 'close'])

const router = useRouter()

/**
 * 导出报表并跳转到下载页
 */
const detectionExportFn = () => {
    loading.value = true
    const url = router.resolve({
        path: '/site/setting/export'
    })
    exportDataCheck(prop.type, { page: 1, limit: 1, ...prop.searchParam }).then((res: any) => {
        if (res.data) {
            exportData(prop.type, prop.searchParam).then(() => {
                loading.value = false
                emit('close', false)
                setTimeout(() => {
                    window.open(url.href)
                }, 100)
            })
        } else {
            loading.value = false
            ElMessage.error(res.msg)
        }
    }).catch(() => {
        loading.value = false
    })
}
// 关闭弹框
const close = () => {
    emit('close', false)
}
</script>

<style lang="scss" scoped></style>
