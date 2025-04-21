<template>
    <div>
        <el-dialog v-model="showDialog" :title="prop.title" width="800px" :destroy-on-close="true" :close-on-click-modal="false">
            <el-form :inline="true" :model="goodsTable.searchParam" ref="searchFormRef" @submit.native.prevent>
                <el-form-item :label="t('fenxiaoName')" prop="keyword">
                    <el-input v-model.trim="goodsTable.searchParam.keyword" :placeholder="t('fenxiaoNamePlaceholder')" maxlength="60" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loadGoodsList()">{{ t('search') }}</el-button>
                    <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="goodsTable.data" size="large" v-loading="goodsTable.loading" max-height="400" @selection-change="handleSelectionChange">
                <template #empty>
                    <span>{{ !goodsTable.loading ? t('emptyData') : '' }}</span>
                </template>
                <el-table-column v-if="prop.max>1" type="selection" width="55" />
                <el-table-column prop="goods_id" :label="t('fenxiaoName')" min-width="200">
                    <template #default="{ row }">
                        <div class="flex items-center cursor-pointer">
                            <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                <el-image v-if="row.member && row.member.headimg" class="w-[50px] h-[50px]" :src="img(row.member.headimg)" fit="contain">
                                    <template #error>
                                        <div class="image-slot">
                                            <img class="w-[50px] h-[50px] rounded-full" src="@/app/assets/images/member_head.png" alt="">
                                        </div>
                                    </template>
                                </el-image>
                                <img class="w-[50px] h-[50px] rounded-full" v-else src="@/app/assets/images/member_head.png" alt="">
                            </div>
                            <div class="ml-2">
                                <span :title="(row.member && row.member.nickname || row.member && row.member.username)" class="multi-hidden">{{row.member && row.member.nickname || row.member && row.member.username}}</span>
                                <span class="text-primary text-[12px]">{{row.member && row.member.mobile}}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="t('fenxiaoLevel')" min-width="120">
                    <template #default="{ row }">
                        <div class="cursor-pointer price-wrap">
                            <span>{{ row.fenxiaoLevel ? row.fenxiaoLevel.level_name : '--' }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="sort" :label="t('currentState')" min-width="100">
                    <template #default="{ row }">
                        {{ row.status_name }}
                    </template>
                </el-table-column>
                <el-table-column v-if="prop.max==1" :label="t('operation')" fixed="right" align="right">
                    <template #default="{row}">
                        <el-button type="primary" @click="rowSave(row)">{{ t('select') }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="goodsTable.page" v-model:page-size="goodsTable.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="goodsTable.total"
                    @size-change="loadGoodsList()" @current-change="loadGoodsList" />
            </div>

            <template #footer>
                <span class="dialog-footer" v-if="prop.max>1">
                    <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="save">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, reactive,nextTick } from 'vue'
import { img } from '@/utils/common'
import { cloneDeep } from 'lodash-es'
import { ElMessage, FormInstance } from 'element-plus'
import { getSelectFenxiaoList } from '@/addon/shop_fenxiao/api/fenxiao'

const prop = defineProps({
    title: {
        type: String,
        default: ''
    },
    max: {
        type: Number,
        default: 1
    },
    params: {
        type: Object,
        default: () => {
            return {
                is_agent: 'all' // 是否查询代理商 all 全部  0 非代理 1 仅查询代理
            }
        }
    }
})
const showDialog = ref(false)
const emit = defineEmits(['load'])
const goodsTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        keyword: ''
    }
})
const loadGoodsList = (page: number = 1) => {
    goodsTable.loading = true
    goodsTable.page = page
    const searchData = cloneDeep(goodsTable.searchParam)
    getSelectFenxiaoList({
        page: goodsTable.page,
        limit: goodsTable.limit,
       ...prop.params,
        ...searchData
    }).then((res:any) => {
        goodsTable.loading = false;
        goodsTable.data = res.data.data;
        goodsTable.total = res.data.total;
    }).catch(() => {
        goodsTable.loading = false
    })
}

let searchFormRef = ref<FormInstance>()
// 重置搜索条件
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    goodsTable.searchParam.keyword = '';
    loadGoodsList()
}

let selectFenxiaoData = ref<Array<any>>([]);
// 选择分销商列表
const handleSelectionChange = (data:Array<any>)=>{
    selectFenxiaoData.value=data;
}

const show = (data: any) => {
    nextTick(() => {
        loadGoodsList()
        showDialog.value = true
    });
}

const save = () => {
    if(selectFenxiaoData.value.length > prop.max){
        ElMessage.error(`最多选择${prop.max}个分销商`);
        return
    }
    emit('load',selectFenxiaoData.value);
    showDialog.value = false;
}
const rowSave = (row:any)=>{
    emit('load',row);
    showDialog.value = false;
}
defineExpose({
    showDialog,
    show
})
</script>

<style lang="scss" scoped>
</style>
