<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addGiftcard') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="giftcardTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('cardName')" prop="card_name">
                        <el-input v-model.trim="giftcardTable.searchParam.card_name" :placeholder="t('cardNamePlaceholder')" maxlength="20"/>
                    </el-form-item>
                    <el-form-item :label="t('categoryId')" prop="category_id">
                        <el-select v-model.trim="giftcardTable.searchParam.category_id" :placeholder="t('categoryIdPlaceholder')" clearable>
                            <el-option v-for="item in categoryOptions" :key="item.category_id" :label="item.category_name" :value="item.category_id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('cardRightType')" prop="card_right_type">
                        <el-select v-model.trim="giftcardTable.searchParam.card_right_type" :placeholder="t('cardRightTypePlaceholder')" clearable>
                            <el-option v-for="item in cardRightTypeOptions" :key="item.type" :label="item.name" :value="item.type" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('status')" prop="status">
                        <el-select v-model="giftcardTable.searchParam.status" :placeholder="t('statusPlaceholder')">
                            <el-option :label="t('statusAll')" value="" />
                            <el-option :label="t('statusOn')" value="1" />
                            <el-option :label="t('statusOff')" value="0" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadGiftcardList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">

                <el-tabs v-model="giftcardTable.searchParam.type" @tab-click="tabHandleClick">
                    <el-tab-pane :label="t('typeAll')" name=""></el-tab-pane>
                    <el-tab-pane :label="t('typeVirtual')" name="virtual"></el-tab-pane>
                    <el-tab-pane :label="t('typeReal')" name="real"></el-tab-pane>
                </el-tabs>

                <div class="mb-[10px] flex items-center">
                    <el-checkbox v-model="toggleCheckbox" size="large" class="px-[14px]" @change="toggleChange" :indeterminate="isIndeterminate" />
                    <el-button @click="batchGiftcardStatus(1)" size="small">{{ t('batchOn') }}</el-button>
                    <el-button @click="batchGiftcardStatus(0)" size="small">{{ t('batchOff') }}</el-button>
                </div>

                <el-table :data="giftcardTable.data" size="large" v-loading="giftcardTable.loading" ref="giftcardListTableRef" @sort-change="sortChange" @selection-change="handleSelectionChange">
                    <template #empty>
                        <span>{{ !giftcardTable.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column type="selection" width="55" />

                    <el-table-column prop="giftcard_id" :label="t('cardInfo')" min-width="230">
                        <template #default="{ row }">
                            <div class="flex items-center cursor-pointer">
                                <div class="min-w-[80px] h-[50px] flex items-center justify-center">
                                    <el-image class="w-[80px] h-[50px]" :src="img(row.cover.split(',')[0])" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[80px] h-[50px]" src="@/addon/shop/assets/goods_default.png" />
                                            </div>
                                        </template>
                                    </el-image>
                                </div>
                                <div class="ml-2">
                                    <span :title="row.card_name" class="multi-hidden">{{ row.card_name }}</span>
                                    <span class="text-primary text-[12px]">{{ row.type_name }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="category_id" :label="t('categoryId')" min-width="120" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-if="row.category">{{ row.category.category_name }}</div>
                            <div v-else>--</div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="card_right_type_name" :label="t('cardRightType')" min-width="100" :show-overflow-tooltip="true"/>

                    <el-table-column prop="validity_type" :label="t('validityType')" min-width="180">
                        <template #default="{ row }">
                            <div v-if="row.validity_type == 'forever'">{{ t('validityForever') }}</div>
                            <div v-if="row.validity_type == 'day'">购买后{{ row.validity_day }}天有效</div>
                            <div v-if="row.validity_type == 'date'">使用截止时间为：{{ row.validity_time || ''}}</div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="sale_count" :label="t('saleCount')" min-width="170" :show-overflow-tooltip="true" sortable="custom">
                        <template #header>
                            <div style="display: inline-flex; align-items: center">
                                <span class="mr-[5px]">{{ t('saleCount') }}</span>
                                <el-tooltip class="box-item" effect="light" placement="top">
                                    <template #content>{{t('saleCountTips1')}}<br />{{t('saleCountTips2')}} </template>
                                    <el-icon color="#666">
                                        <QuestionFilled />
                                    </el-icon>
                                </el-tooltip>
                            </div>
                        </template>
                        <template #default="{ row }">
                            <div v-if="row.type == 'virtual'">{{ row.sale_count }}</div>
                            <div v-else-if="row.type == 'real'">{{ row.activate_count }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="sort" min-width="120" :show-overflow-tooltip="true" sortable="custom">
                        <template #header>
                            <div style="display: inline-flex; align-items: center">
                                <span class="mr-[5px]">{{ t('sort') }}</span>
                                <el-tooltip class="box-item" effect="light" :content="t('sortRules')" placement="top">
                                    <el-icon color="#666">
                                        <QuestionFilled />
                                    </el-icon>
                                </el-tooltip>
                            </div>
                        </template>
                        <template #default="{ row }">
                            <el-input v-model.trim="row.sort" class="w-[70px]" maxlength="8" @blur="sortInputListener(row.sort, row)" />
                        </template>
                    </el-table-column>

                    <el-table-column prop="status" :label="t('status')" min-width="80" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <el-tag type="success" v-if="row.status == 1" @click="modiftStatusEvent(row, 0)" class="cursor-pointer">{{ t('statusOn') }}</el-tag>
                            <el-tag type="info" v-else @click="modiftStatusEvent(row, 1)" class="cursor-pointer">{{ t('statusOff') }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="use_count" :label="t('useCount')" min-width="120" :show-overflow-tooltip="true" sortable="custom"/>

                    <el-table-column prop="create_time" :label="t('createTime')" min-width="150" sortable="custom">
                        <template #default="{ row }">
                            <div>{{ row.create_time }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="toDetailEvent(row)">{{ t('giftcardDetail') }}</el-button>
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="spreadEvent(row)" v-if="row.type !== 'real'">{{ t('spreadGiftcard') }}</el-button>
                           <el-button type="primary" link v-if="row.type == 'real'" @click="toMakeCardEvent(row)">{{ t('makeCard') }}</el-button>
                           <el-button type="primary" link v-if="row.type == 'virtual'" @click="toOrderEvent(row)">{{ t('toOrder') }}</el-button>
                           <el-button type="primary" link v-if="row.status == 0" @click="deleteEvent(row.giftcard_id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="giftcardTable.page" v-model:page-size="giftcardTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="giftcardTable.total"
                        @size-change="loadGiftcardList()" @current-change="loadGiftcardList" />
                </div>
            </div>

        </el-card>

        <!-- 礼品卡推广弹出框 -->
        <spread-popup ref="spreadPopupRef" />

        <giftcard-detail ref="giftcardDetailDialog"></giftcard-detail>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getGiftcardPageList,getGiftcardCardRightType,deleteGiftcard,modifyGiftcardStatus,modifyGiftcardSort } from '@/addon/shop_giftcard/api/giftcard'
import { getCategoryList } from '@/addon/shop_giftcard/api/category'
import { debounce,img,setTablePageStorage,getTablePageStorage  } from '@/utils/common'
import { ElMessage,ElMessageBox,FormInstance } from 'element-plus'
import { useRouter,useRoute } from 'vue-router'
import giftcardDetail from '@/addon/shop_giftcard/views/giftcard/components/giftcard-detail.vue'
import spreadPopup from '@/components/spread-popup/index.vue'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title;

let giftcardTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        type: "",
        category_id: "",
        card_right_type: "",
        card_name: "",
        status: "",
        order: '',
        sort: ''
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取礼品卡活动列表
 */
const loadGiftcardList = (page: number = 1) => {
    giftcardTable.loading = true
    giftcardTable.page = page

    getGiftcardPageList({
        page: giftcardTable.page,
        limit: giftcardTable.limit,
         ...giftcardTable.searchParam
    }).then(res => {
        giftcardTable.loading = false
        giftcardTable.data = res.data.data
        giftcardTable.total = res.data.total
        setTablePageStorage(giftcardTable.page,giftcardTable.limit,giftcardTable.searchParam)
    }).catch(() => {
        giftcardTable.loading = false
    })
}

// 礼品卡分类
const categoryOptions: any = reactive([])
// 礼品卡权益类型
const cardRightTypeOptions: any = reactive({})

// 初始化数据
const initData = () => {
    getCategoryList({}).then(res=>{
        const data = res.data
        if (data) {
            categoryOptions.splice(0, categoryOptions.length, ...data)
        }
    })
    getGiftcardCardRightType({}).then((res: any) => {
        const data = res.data
        if (data) {
            Object.assign(cardRightTypeOptions,data);
        }
    })

    loadGiftcardList(getTablePageStorage(giftcardTable.searchParam).page)
}

initData()

// 当前选中tab页面
const tabHandleClick = (tab: any, event: Event) => {
    giftcardTable.searchParam.type = tab.props.name
    loadGiftcardList()
}

// 批量复选框
const toggleCheckbox = ref()

// 复选框中间状态
const isIndeterminate = ref(false)

// 监听批量复选框事件
const toggleChange = (value: any) => {
    isIndeterminate.value = false
    giftcardListTableRef.value.toggleAllSelection()
}

const giftcardListTableRef = ref()

// 选中数据
const multipleSelection: any = ref([])

// 监听表格单行选中
const handleSelectionChange = (val: []) => {
    multipleSelection.value = val

    toggleCheckbox.value = false
    if (multipleSelection.value.length > 0 && multipleSelection.value.length < giftcardTable.data.length) {
        isIndeterminate.value = true
    } else {
        isIndeterminate.value = false
    }

    if (multipleSelection.value.length == giftcardTable.data.length) {
        toggleCheckbox.value = true
    }
}

// 礼品卡预览
const previewEvent = (data: any) => {
    const url = router.resolve({
        path: '/preview/wap',
        query: {
            page: `/addon/shop_giftcard/pages/detail?giftcard_id=${data.giftcard_id}`
        }
    })
    window.open(url.href)
}

const repeat = ref(false)

// 监听排序
const sortChange = (event: any) => {
    let sort = ''
    if (event.order == 'ascending') {
        sort = 'asc'
    } else if (event.order == 'descending') {
        sort = 'desc'
    }
    if (sort) {
        giftcardTable.searchParam.order = event.prop
        giftcardTable.searchParam.sort = sort
    }
    loadGiftcardList()
}

// 修改礼品卡开启关闭状态
const modiftStatusEvent = (row: any, value: any) => {
    if (value) {
        if (repeat.value) return
        repeat.value = true
        modifyGiftcardStatus({
            giftcard_ids: row.giftcard_id,
            status: value
        }).then((res) => {
            loadGiftcardList()
            repeat.value = false
        }).catch(() => {
            repeat.value = false
        })
    } else {
        ElMessageBox.confirm(t('modifyStatusEventTips'), t('warning'),
            {
                confirmButtonText: t('confirm'),
                cancelButtonText: t('cancel'),
                type: 'warning'
            }
        ).then(() => {
            modifyGiftcardStatus({
                giftcard_ids: row.giftcard_id,
                status: value
            }).then((res) => {
                loadGiftcardList()
            })
        })
    }
}

// 批量设置开启关闭
const batchGiftcardStatus = (status: any) => {
    if (multipleSelection.value.length == 0) {
        ElMessage({
            type: 'warning',
            message: `${t('batchEmptySelectedGiftcardTips')}`
        })
        return
    }

    if (repeat.value) return
    repeat.value = true

    const giftcardIds: any = []
    multipleSelection.value.forEach((item: any) => {
        giftcardIds.push(item.giftcard_id)
    })

    modifyGiftcardStatus({
        giftcard_ids: giftcardIds,
        status
    }).then((res) => {
        loadGiftcardList()
        repeat.value = false
    }).catch(() => {
        repeat.value = false
    })
}

// 修改排序号
const sortInputListener = debounce((sort, row) => {
    if (isNaN(sort) || !/^\d{0,10}$/.test(sort)) {
        ElMessage({
            type: 'warning',
            message: `${t('sortTips')}`
        })
        return
    }
    if(sort>99999999){
        row.sort = 99999999
    }
    modifyGiftcardSort({
        giftcard_id: row.giftcard_id,
        sort
    }).then((res) => {
        // loadGiftcardList();
    })
})

/**
 * 添加礼品卡活动
 */
const addEvent = () => {
    router.push('/shop_giftcard/giftcard/edit')
}

/**
 * 编辑礼品卡活动
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/shop_giftcard/giftcard/edit?giftcard_id='+data.giftcard_id)
}

// 跳转到礼品卡详情
const giftcardDetailDialog = ref(null)
const toDetailEvent = (data: any)=>{
    // const url = router.resolve({
    //     path: `/shop_giftcard/giftcard/detail`,
    //     query: {
    //         giftcard_id: data.giftcard_id
    //     }
    // })
    // window.open(url.href)
    // let data = {id: res.giftcard_id};
    // giftcardDetailDialog.value.setFormData(data);
    // giftcardDetailDialog.value.showDialog = true;
    router.push(`/shop_giftcard/giftcard/detail?giftcard_id=${ data.giftcard_id }`)
}

// 礼品卡推广
const spreadPopupRef = ref(null)

const spreadEvent = (data: any) => {
    const pagePath = "/addon/shop_giftcard/pages/detail"
    const columnName = "giftcard_id"
    const columnValue = data.giftcard_id
    const title = "礼品卡推广"
    const folder = "giftcard"

    spreadPopupRef.value?.show(pagePath, columnName, columnValue, title,folder)
}


// 跳转到制卡（实体礼品卡）
const toMakeCardEvent = (data: any) =>{
    const url = router.resolve({
        path: `/shop_giftcard/makecard`,
        query: {
            giftcard_id: data.giftcard_id
        }
    })
    window.open(url.href)
}

// 跳转到订单（虚拟礼品卡）
const toOrderEvent = (data: any) =>{
    const url = router.resolve({
        path: `/shop_giftcard/order/list`,
        query: {
            giftcard_id: data.giftcard_id
        }
    })
    window.open(url.href)
}

/**
 * 删除礼品卡活动
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('giftcardDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteGiftcard(id).then(() => {
            loadGiftcardList()
        }).catch(() => {
        })
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadGiftcardList()
}
</script>

<style lang="scss" scoped>
</style>
