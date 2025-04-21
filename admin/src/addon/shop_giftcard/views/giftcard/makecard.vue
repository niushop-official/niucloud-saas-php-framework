<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addCard') }}
                </el-button>
            </div>

            <div class="mt-[10px]">
                <el-table :data="cardMakeTable.data" size="large" v-loading="cardMakeTable.loading">
                    <template #empty>
                        <span>{{ !cardMakeTable.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="make_card_way_name" :label="t('makeCardWay')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column prop="card_right_type_name" :label="t('cardRightType')" min-width="100" :show-overflow-tooltip="true"/>

                    <el-table-column prop="total_count" :label="t('totalCount')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column prop="success_count" :label="t('successCount')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column prop="fail_count" :label="t('failCount')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column prop="status_name" :label="t('status')" min-width="120" :show-overflow-tooltip="true"/>

                    <el-table-column prop="create_time" :label="t('createTime')" min-width="150"/>

                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                       <template #default="{ row }">
                            <template v-if="row.make_card_way == 'import'">
                                <el-button type="primary" link @click="downloadLog(row,'total')">{{ t('importLog') }}</el-button>
                                <el-button type="primary" link @click="downloadLog(row,'fail')">{{ t('importErrorLog') }}</el-button>
                            </template>
                            <el-button type="primary" link @click="exportEvent(row)" v-if="row.success_count > 0">{{ t('exportAction') }}</el-button>
                            <el-button type="primary" link @click="deleteEvent(row.make_id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="cardMakeTable.page" v-model:page-size="cardMakeTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="cardMakeTable.total"
                        @size-change="loadGiftcardMakeList()" @current-change="loadGiftcardMakeList" />
                </div>
            </div>

            <import-log ref="downloadDialog" @complete="loadGiftcardMakeList" />
            <edit ref="editGiftcardMakeDialog" @complete="loadGiftcardMakeList" />
            <export-sure ref="exportSureDialog" :show="flag" :type="export_type" :searchParam="cardMakeTable.searchParam" @close="handleClose" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getGiftcardMakeList, deleteGiftcardMake } from '@/addon/shop_giftcard/api/giftcard'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/shop_giftcard/views/giftcard/components/makecard-edit.vue'
import importLog from '@/addon/shop_giftcard/views/giftcard/components/makecard-import-log.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title;

let cardMakeTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      giftcard_id: route.query.giftcard_id,
      card_make_id: ""
    }
})

/**
 * 获取礼品卡实体制作列表
 */
const loadGiftcardMakeList = (page: number = 1) => {
    cardMakeTable.loading = true
    cardMakeTable.page = page

    getGiftcardMakeList({
        page: cardMakeTable.page,
        limit: cardMakeTable.limit,
         ...cardMakeTable.searchParam
    }).then(res => {
        cardMakeTable.loading = false
        cardMakeTable.data = res.data.data
        cardMakeTable.total = res.data.total
    }).catch(() => {
        cardMakeTable.loading = false
    })
}
loadGiftcardMakeList()

const editGiftcardMakeDialog: Record<string, any> | null = ref(null)

/**
 * 添加礼品卡实体制作
 */
const addEvent = () => {
    editGiftcardMakeDialog.value.showDialog = true
}

/**
 * 删除礼品卡实体制作
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('cardDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteGiftcardMake(id).then(() => {
            loadGiftcardMakeList()
        }).catch(() => {
        })
    })
}

/**
 * 导出卡密
 * @param make_id
 */
const exportSureDialog = ref(null)
const flag = ref(false)
const handleClose = (val) => {
	flag.value = val
}
const export_type = ref('')
const exportEvent = (data: any) => {
    cardMakeTable.searchParam.card_make_id = data.make_id
    if (data.card_right_type == 'balance') {
        export_type.value = 'shop_giftcard_balance_card'
    } else {
        export_type.value = 'shop_giftcard_goods_card'
    }
	flag.value = true
}

const downloadDialog: Record<string, any> | null = ref(null)
const downloadLog = (data: any, type: string) => {
    if (type == 'total') {
        downloadDialog.value.setTableData(data.output)
    } else if (type == 'fail') {
        downloadDialog.value.setTableData(data.fail_output)
    }
    downloadDialog.value.logType = type
    downloadDialog.value.showDialog = true
}
</script>

<style lang="scss" scoped>
</style>
