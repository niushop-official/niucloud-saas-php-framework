<template>
    <div>
        <div @click="show">
            <slot>
                <el-button>{{ t('giftcardSelectPopupButton') }}</el-button>
                <div class="inline-block ml-[10px] text-[14px]" v-show="giftcardIds.length">
                    <span>{{ t('giftcardSelectPopupSelect') }}</span>
                    <span class="text-primary mx-[2px]">{{ giftcardIds.length }}</span>
                    <span>{{ t('giftcardSelectPopupPiece') }}</span>
                </div>
            </slot>
        </div>
        <el-dialog v-model="showDialog" :title="t('giftcardSelectPopupSelectGiftcardDialog')" width="1000px" :destroy-on-close="true" :close-on-click-modal="false" @close="closeDialog">

            <el-form :inline="true" :model="giftcardTable.searchParam" ref="searchFormRef">
                <el-form-item prop="select_type" class="form-item-wrap">
                    <el-select v-model="giftcardTable.searchParam.select_type" @change="handleSelectTypeChange">
                        <el-option :label="t('giftcardSelectPopupAllGiftcard')" value="all" />
                        <el-option :label="t('giftcardSelectPopupSelectedGiftcard')" value="selected" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="t('giftcardSelectPopupCardName')" prop="card_name" class="form-item-wrap">
                    <el-input v-model.trim="giftcardTable.searchParam.card_name" :placeholder="t('giftcardSelectPopupCardNamePlaceholder')" maxlength="20" />
                </el-form-item>
                <el-form-item :label="t('giftcardSelectPopupCardCategory')" prop="category_id" class="form-item-wrap">
                    <el-select v-model="giftcardTable.searchParam.category_id" :placeholder="t('giftcardSelectPopupCardCategoryPlaceholder')" clearable>
                        <el-option v-for="item in categoryOptions" :key="item.category_id" :label="item.category_name" :value="item.category_id" />
                    </el-select>
                </el-form-item>
                <el-form-item class="form-item-wrap">
                    <el-button type="primary" @click="loadGiftcardList()">{{ t('search') }}</el-button>
                    <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="giftcardTable.data" size="large" v-loading="giftcardTable.loading" ref="giftcardListTableRef" max-height="400"  @select="handleSelectChange" @select-all="handleSelectAllChange">
                <template #empty>
                    <span>{{ !giftcardTable.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column type="selection" width="55" />

                <el-table-column prop="giftcard_id" :label="t('giftcardSelectPopupCardInfo')" min-width="300">
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
<!--                                <span class="text-primary text-[12px] mr-[10px]">{{ row.type_name  }}</span>-->
                                <span class="text-primary text-[12px]">{{ row.card_right_type_name }}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="card_price" :label="t('giftcardSelectPopupCardPrice')" min-width="120" >
                    <template #default="{ row }">
                        <div>￥{{ row.card_price }}</div>
                    </template>
                </el-table-column>

                <el-table-column prop="category_id" :label="t('giftcardSelectPopupCardCategory')" min-width="140" :show-overflow-tooltip="true">
                    <template #default="{ row }">
                        <div>{{ row.category.category_name }}</div>
                    </template>
                </el-table-column>

                <el-table-column prop="validity_type" :label="t('validityType')" min-width="200" :show-overflow-tooltip="true">
                    <template #default="{ row }">
                        <div v-if="row.validity_type == 'forever'">{{ t('validityForever') }}</div>
                        <div v-if="row.validity_type == 'day'">购买后{{ row.validity_day }}天有效</div>
                        <div v-if="row.validity_type == 'date'">使用截止时间为：{{ row.validity_time || ''}}</div>
                    </template>
                </el-table-column>

            </el-table>
            <div class="mt-[16px] flex">
                <div class="flex items-center flex-1">
                    <div class="mr-[10px]" v-show="selectGiftcardNum">
                        <span>{{ t('giftcardSelectPopupBeforeTip') }}</span>
                        <span class="text-primary mx-[2px]">{{ selectGiftcardNum }}</span>
                        <span>{{ t('giftcardSelectPopupAfterTip') }}</span>
                    </div>
                    <el-button type="primary" link @click="clear" v-show="selectGiftcardNum">{{ t('giftcardSelectPopupClearGiftcard') }}</el-button>
                </div>
                <el-pagination v-model:current-page="giftcardTable.page" v-model:page-size="giftcardTable.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="giftcardTable.total"
                    @size-change="loadGiftcardList()" @current-change="loadGiftcardList" />
            </div>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="save">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, reactive, computed, nextTick } from 'vue'
import { cloneDeep } from 'lodash-es'
import { img,deepClone } from '@/utils/common'
import { ElMessage } from 'element-plus'
import { getGiftcardSelectPageList } from '@/addon/shop_giftcard/api/giftcard'
import { getCategoryList } from '@/addon/shop_giftcard/api/category'

const prop = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    max: {
        type: Number,
        default: 0
    },
    min: {
        type: Number,
        default: 0
    },
})

const emit = defineEmits(['update:modelValue','giftcardSelect'])

const giftcardIds: any = computed({
    get () {
        return prop.modelValue
    },
    set (value) {
        emit('update:modelValue', value)
    }
})

const showDialog = ref(false)

// 已选礼品卡列表
const selectGiftcard: any = reactive({})

// 已选礼品卡列表id
const selectGiftcardId: any = reactive([])

// 已选礼品卡数量
const selectGiftcardNum: any = computed(() => {
    return Object.keys(selectGiftcard).length
})

const giftcardTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        card_name: '',
        category_id: '',
        select_type: 'all',
        giftcard_ids: '',
        verify_giftcard_ids: '',
    }
})

const searchFormRef = ref()

// 查询全部/已选礼品卡
const handleSelectTypeChange = (value: any) => {
    loadGiftcardList()
}

// 礼品卡分类
const categoryOptions: any = reactive([])

// 初始化数据
const initData = () => {
    // 查询礼品卡分类树结构
    getCategoryList({}).then(res=>{
        const data = res.data
        if (data) {
            categoryOptions.splice(0, categoryOptions.length, ...data)
        }
    })
}

initData()

const giftcardListTableRef = ref()

// 监听表格复选框
const handleSelectChange = (selection: any, row: any) => {
    // 是否选中
    let isSelected = false
    for (let i = 0; i < selection.length; i++) {
        if (selection[i].giftcard_id == row.giftcard_id) {
            isSelected = true
            break
        }
    }

    if (isSelected) {
        selectGiftcardId.push(row.giftcard_id)
        selectGiftcard['giftcard_' + row.giftcard_id] = deepClone(row)
    } else {
        selectGiftcardId.splice(selectGiftcardId.indexOf(row.giftcard_id), 1)
        // 未选中，删除当前礼品卡
        delete selectGiftcard['giftcard_' + row.giftcard_id]
    }
}

// 监听表格全选
const handleSelectAllChange = (selection: any) => {
    if (selection.length) {
        selection.forEach((item: any) => {
            selectGiftcard['giftcard_' + item.giftcard_id] = item
            if(selectGiftcardId.indexOf(item.giftcard_id) == -1){
                selectGiftcardId.push(item.giftcard_id)
            }
        })
    } else {
        // 未选中，删除当前页面的数据
        giftcardTable.data.forEach((item: any) => {
            selectGiftcardId.splice(selectGiftcardId.indexOf(item.giftcard_id),1)
            delete selectGiftcard['giftcard_' + item.giftcard_id]
        })
    }
}

/**
 * 获取礼品卡列表
 */
const loadGiftcardList = (page: number = 1, callback: any = null) => {
    giftcardTable.loading = true
    giftcardTable.page = page

    const searchData = cloneDeep(giftcardTable.searchParam);

    if (searchData.select_type == 'selected') {
        const giftcard_ids = <any>[]
        for (let k in selectGiftcard) {
            giftcard_ids.push(parseInt(k.replace('giftcard_', '')))
        }
        searchData.giftcard_ids = giftcard_ids
    } else {
        searchData.giftcard_ids = '';
    }

    getGiftcardSelectPageList({
        page: giftcardTable.page,
        limit: giftcardTable.limit,
        ...searchData
    }).then(res => {
        giftcardTable.loading = false
        giftcardTable.data = res.data.data
        giftcardTable.total = res.data.total

        if (callback) callback(res.data.verify_giftcard_ids)

        setGoodsSelected();

    }).catch(() => {
        giftcardTable.loading = false
    })

}

// 表格设置选中状态
const setGoodsSelected = () => {
    nextTick(() => {
        if (!giftcardListTableRef.value) return;
        for (let i = 0; i < giftcardTable.data.length; i++) {
            giftcardListTableRef.value.toggleRowSelection(giftcardTable.data[i], false);
            if (selectGiftcard['giftcard_' + giftcardTable.data[i].giftcard_id]) {
                giftcardListTableRef.value.toggleRowSelection(giftcardTable.data[i], true);
            }
        }
    });
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()

    loadGiftcardList()
}

const show = () => {
    for (let k in selectGiftcard) {
        delete selectGiftcard[k];
    }
    // 检测礼品卡id集合是否存在，移除不存在的礼品卡id，纠正数据准确性
    giftcardTable.searchParam.verify_giftcard_ids = giftcardIds.value;
    loadGiftcardList(1, (verify_giftcard_ids: any) => {
        // 第一次打开弹出框时，纠正数据，并且赋值已选礼品卡
        if (giftcardIds.value) {
            giftcardIds.value.splice(0, giftcardIds.value.length, ...verify_giftcard_ids)
            giftcardIds.value.forEach((item: any) => {
                if (!selectGiftcard['giftcard_' + item]) {
                    selectGiftcard['giftcard_' + item] = {};
                }
            })

            // 赋值已选择的礼品卡
            for (let i = 0; i < giftcardTable.data.length; i++) {
                if (giftcardIds.value.indexOf(giftcardTable.data[i].giftcard_id) != -1) {
                    selectGiftcard['giftcard_' + giftcardTable.data[i].giftcard_id] = giftcardTable.data[i];
                }
            }
        }
    })

    showDialog.value = true
}

// 清空已选礼品卡
const clear = () => {
    for (let k in selectGiftcard) {
        delete selectGiftcard[k];
    }
    giftcardTable.searchParam.verify_giftcard_ids = '';
    loadGiftcardList()
    setGoodsSelected();
}

const save = () => {
    if (prop.min && selectGiftcardNum.value < prop.min) {
        ElMessage({
            type: 'warning',
            message: `${t('giftcardSelectPopupGiftcardMinTip')}${prop.min}${t('giftcardSelectPopupPiece')}`,
        });
        return;
    }

    if (prop.max && prop.max > 0 && selectGiftcardNum.value && selectGiftcardNum.value > prop.max) {
        ElMessage({
            type: 'warning',
            message: `${t('giftcardSelectPopupGiftcardMaxTip')}${prop.max}${t('giftcardSelectPopupPiece')}`,
        });
        return;
    }

    let ids: any = [];
    for (let k in selectGiftcard) {
        ids.push(parseInt(k.replace('giftcard_', '')));
    }

    giftcardIds.value.splice(0, giftcardIds.value.length, ...ids)
    emit('giftcardSelect',selectGiftcard)
    initSearchParam();
    showDialog.value = false
}

// 关闭弹窗
const closeDialog = () => {
    initSearchParam();
}

// 重置表单搜索
const initSearchParam = ()=>{
    giftcardTable.searchParam.card_name = '';
    giftcardTable.searchParam.category_id = '';
    giftcardTable.searchParam.select_type = 'all';
    giftcardTable.searchParam.giftcard_ids = '';
    giftcardTable.searchParam.verify_giftcard_ids = '';
}

defineExpose({
    showDialog,
    selectGiftcard,
    selectGiftcardNum
})
</script>

<style lang="scss" scoped>
.form-item-wrap {
    margin-right: 10px !important;
    margin-bottom: 10px !important;

    &.last-child {
        margin-right: 0 !important;
    }
}
</style>
