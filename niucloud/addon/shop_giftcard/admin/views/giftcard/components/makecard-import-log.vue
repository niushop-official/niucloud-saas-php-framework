<template>
    <el-dialog v-model="showDialog" :title="logType == 'total' ? t('importLog') : t('importErrorLog')" width="550px" :destroy-on-close="true" @close="closeDialog">
        <el-table :data="tableData" size="large" max-height="400">
            <el-table-column prop="id" :label="t('number')" min-width="80" />
            <el-table-column prop="name" :label="t('fileName')" min-width="200" />
            <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                <template #default="{ row }">
                    <el-button type="primary" link @click="download(row.path)">{{ t('download') }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="showDialog = false">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref,reactive } from 'vue'
import { t } from '@/lang'

const showDialog = ref(false)
const loading = ref(true)
const logType = ref('total')

interface ItableData {
    id: number,
    name: string,
    path: string
}
const tableData = reactive<Array<ItableData>>([]);

const setTableData = async (data: any = null) => {
    loading.value = true
    data.forEach((item: any, index: number) => {
        const parts = item.split("\\");
        const name = parts[parts.length - 1];
        let rowData = {
            id: index + 1,
            name: name,
            path: item
        }
        tableData.push(rowData)
    })
    loading.value = false
}

// 下载
const download = (path: string) => {
    let url = `${import.meta.env.VITE_IMG_DOMAIN || location.origin}/${path}`;
    window.open(url)
}

const closeDialog = () => {
    tableData.splice(0, tableData.length)
}

defineExpose({
    showDialog,
    setTableData,
    logType
})
</script>
<style lang="scss" scoped></style>