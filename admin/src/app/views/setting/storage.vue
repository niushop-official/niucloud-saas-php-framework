<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

           <div class="flex justify-between items-center">
                <span class="text-page-title">{{pageName}}</span>
            </div>

            <div class="mt-[20px]">
                <el-table :data="storageTableData.data" size="large" v-loading="loading">

                    <template #empty>
                        <span>{{ !loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="name" :label="t('name')" min-width="100" :show-overflow-tooltip="true"/>
                    <el-table-column :label="t('isUse')" min-width="180" align="center">
                        <template #default="{ row }">
                            <el-tag class="ml-2" type="success" v-if="row.is_use == 1">{{ t('statusNormal') }}</el-tag>
                            <el-tag class="ml-2" type="error" v-if="row.is_use == 0">{{t('statusDeactivate') }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" align="right" fixed="right" width="100">
                       <template #default="{ row, $index }">
                           <el-button type="primary" link @click="editEvent(row, $index)">{{ t('config') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
            </div>

            <template v-for="(item, index) in storageTableData.data">
                <component :is="item.component" :ref="(el) => setStorageTypeRefs(el, index)" v-if="item.component" @complete="loadStorageList()"/>
            </template>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, reactive, ref } from 'vue'
import { t } from '@/lang'
import { getStorageList } from '@/app/api/sys'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title
const storageTypeRefs = ref([])

const storageTableData = reactive({
    data: []
})
const loading = ref(true)

const modules: any = import.meta.glob('@/**/*.vue')
/**
 * 获取配置信息
 */
const loadStorageList = () => {
    loading.value = true
    getStorageList().then(({ data }) => {
        Object.keys(data).forEach((key: string) => {
            data[key].component && (data[key].component = defineAsyncComponent(modules[data[key].component]))
        })
        storageTableData.data = data
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}

loadStorageList()

const setStorageTypeRefs = (el, index) => {
    storageTypeRefs.value[index] = (el)
}

const editEvent = (data: any, index: number) => {
    storageTypeRefs.value[index].setFormData(data)
    storageTypeRefs.value[index].showDialog = true
}

</script>

<style lang="scss" scoped></style>
