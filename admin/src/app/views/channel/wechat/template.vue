<template>
    <!--模板消息-->
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" class="w-[100px]" @click="batchAcquisitionFn()">{{ t('batchAcquisition') }}</el-button>
            </div>

            <el-tabs v-model="activeName" class="my-[20px]" @tab-change="handleClick">
                <el-tab-pane :label="t('wechatAccessFlow')" name="/channel/wechat" />
                <el-tab-pane :label="t('customMenu')" name="/channel/wechat/menu" />
                <el-tab-pane :label="t('wechatTemplate')" name="/channel/wechat/message" />
                <el-tab-pane :label="t('reply')" name="/channel/wechat/reply" />
            </el-tabs>

            <el-table :data="cronTableData.data" :span-method="templateSpan" size="large" v-loading="cronTableData.loading">
                <template #empty>
                    <span>{{ !cronTableData.loading ? t('emptyData') : '' }}</span>
                </template>

                <el-table-column prop="addon_name" :label="t('addon')" min-width="120" />
                <el-table-column prop="name" :show-overflow-tooltip="true" :label="t('name')" min-width="150" >
                    <template #default="{ row }">
                        <div class="flex items-center">
                            <span class="mr-[5px]">{{row.name }}</span>
                            <el-tooltip :content="row.wechat.tips" v-if="row.wechat.tips" placement="top">
                                <icon name="element WarningFilled" />
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column :label="t('messageType')" min-width="100" align="center">
                    <template #default="{ row }">
                        <span>{{ row.message_type == 1 ? t('buyerNews') : t('sellerMessage') }}</span>
                    </template>
                </el-table-column>

                <el-table-column :label="t('isStart')" min-width="100" align="center">
                    <template #default="{ row }">
                        {{ row.is_wechat == 1 ? t('startUsing') : t('statusDeactivate') }}
                    </template>
                </el-table-column>

                <el-table-column :label="t('response')" min-width="180">
                    <template #default="{ row }">
                        <div v-for="(item, index) in row.wechat.content" :key="'a' + index" class="text-left">{{ item.join("：") }}</div>
                    </template>
                </el-table-column>

                <el-table-column prop="wechat_template_id" :label="t('serialNumber')" min-width="140" />

                <el-table-column :label="t('operation')" fixed="right" align="right" width="200">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="infoSwitch(row)">{{ row.is_wechat == 1 ? t('close') : t('open') }}</el-button>
                        <el-button type="primary" link @click="batchAcquisitionFn(row)">{{ t('regain') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getTemplateList, getBatchAcquisition } from '@/app/api/wechat'
import { editNoticeStatus } from '@/app/api/notice'
import { AnyObject } from '@/types/global'
import { ElLoading } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const cronTableData = reactive({
    loading: true,
    data: []
})
const activeName = ref('/channel/wechat/message')
const handleClick = (val: any) => {
    router.push({ path: activeName.value })
}
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
    }).catch((e) => {
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
 * 开启或关闭模版消息
 */
interface Switch {
    key: string;
    type: string;
    status: number
}

const infoSwitch = (res: AnyObject) => {
    const data = ref<Switch>({
        key: '',
        type: '',
        status: 0
    })
    data.value.status = res.is_wechat ? 0 : 1
    data.value.key = res.key
    data.value.type = 'wechat'
    cronTableData.loading = true
    editNoticeStatus(data.value).then(res => {
        loadCronList()
    }).catch(() => {
        cronTableData.loading = false
    })
}
</script>
<style lang="scss" scoped>
:deep(.el-tabs__item:hover) {
    border-bottom: 2px solid var(--el-color-primary);
}

:deep(.el-tabs__item) {
    padding: 0;
}

:deep(.el-tabs__item+.el-tabs__item) {
    margin-right: 20px;
    margin-left: 20px;
    // border-bottom: 2px solid var(--el-color-primary);
}

:deep(.el-tabs--top) {
    .el-tabs__active-bar {
        display: none;
    }

    .el-tabs__item.is-active {
        border-bottom: 2px solid var(--el-color-primary);
    }

    .el-tabs__item.is-top:nth-child(2) {
        margin-right: 20px;
    }

}</style>
