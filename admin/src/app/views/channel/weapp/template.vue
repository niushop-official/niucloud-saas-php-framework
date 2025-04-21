<template>
    <!--订阅消息-->
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
            </div>

            <el-tabs v-model="activeName" class="my-[20px]" @tab-change="handleClick">
                <el-tab-pane :label="t('weappAccessFlow')" name="/channel/weapp" />
                <el-tab-pane :label="t('subscribeMessage')" name="/channel/weapp/message" />
                <el-tab-pane :label="t('weappRelease')" name="/channel/weapp/code" />
            </el-tabs>

            <el-alert :title="t('operationTipTwo')" type="info" show-icon />

            <div class="mt-[20px]">
                <el-table :data="cronTableData.data" :span-method="templateSpan" size="large" v-loading="cronTableData.loading">
                    <template #empty>
                        <span>{{ !cronTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="addon_name" :label="t('addon')" min-width="120" />
                    <el-table-column prop="name" :show-overflow-tooltip="true" :label="t('name')" min-width="150" >
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <span class="mr-[5px]">{{row.name }}</span>
                                <el-tooltip :content="row.weapp.tips" v-if="row.weapp.tips" placement="top">
                                    <icon name="element WarningFilled" />
                                </el-tooltip>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('response')" min-width="180">
                        <template #default="{ row }">
                            <div v-for="(item, index) in row.weapp.content" :key="'a' + index" class="text-left">{{ item.join(":") }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('isStart')" min-width="100" align="center">
                        <template #default="{ row }">
                            {{ row.is_weapp == 1 ? t('startUsing') : t('statusDeactivate') }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="weapp_template_id" :label="t('serialNumber')" min-width="180" />

                    <el-table-column :label="t('operation')" fixed="right" align="right" width="200">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="infoSwitch(row)">{{ row.is_weapp == 1 ? t('close') : t('open') }}</el-button>
                            <el-button type="primary" link @click="batchAcquisitionFn(row)">{{ t('regain') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getTemplateList, getBatchAcquisition } from '@/app/api/weapp'
import { editNoticeStatus } from '@/app/api/notice'
import { ElLoading } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { AnyObject } from '@/types/global'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const activeName = ref('/channel/weapp/message')
const handleClick = (val: any) => {
    router.push({ path: activeName.value })
}
const cronTableData = reactive({
    loading: true,
    data: []
})

/**
 * 获取消息模板列表
 */
const loadCronList = (page: number = 1) => {
    cronTableData.loading = true

    getTemplateList().then(res => {
        cronTableData.loading = false
        let data = []
        res.data.forEach(item => {
            if (item.notice.length) {
                const addons = []
                Object.keys(item.notice).forEach((key, index) => {
                    const notice = item.notice[key]
                    notice.addon_name = item.title
                    addons.push(notice)
                })
                if (addons.length) {
                    addons[0].rowspan = addons.length
                    data = data.concat(addons)
                }
            }
        })
        cronTableData.data = data
    }).catch(() => {
        cronTableData.loading = false
    })
}
loadCronList()

const templateSpan = (row : any) => {
    if (row.columnIndex === 0) {
        if (row.row.rowspan) {
            return {
                rowspan: row.row.rowspan,
                colspan: 1
            }
        } else {
            return {
                rowspan: 0,
                colspan: 0
            }
        }
    }
}

/**
 * 批量获取
 */
const batchAcquisitionFn = (row: AnyObject | null = null) => {
    const loading = ElLoading.service({ lock: true, background: 'rgba(0, 0, 0, 0)' })
    getBatchAcquisition({ keys: row ? [row.key] : [] }).then(() => {
        loadCronList()
        loading.close()
    }).catch(() => {
        loading.close()
    })
}

/**
 * 开启或关闭订阅消息
 */
interface Switch {
    key: string;
    type: string;
    status: number
}
const infoSwitch = (res:any) => {
    const data = ref<Switch>({
        key: '',
        type: '',
        status: 0
    })
    data.value.status = res.is_weapp ? 0 : 1
    data.value.key = res.key
    data.value.type = 'weapp'
    cronTableData.loading = true
    editNoticeStatus(data.value).then(res => {
        loadCronList()
    }).catch(() => {
        cronTableData.loading = false
    })
}

</script>

<style lang="scss" scoped></style>
