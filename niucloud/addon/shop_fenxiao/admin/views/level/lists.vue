<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t("addLevel") }}
                </el-button>
            </div>

            <div class="mt-[20px]">
                <el-table :data="labelTable.data" size="large" v-loading="labelTable.loading">
                    <template #empty>
                        <span>{{ !labelTable.loading ? t("emptyData") : "" }}</span>
                    </template>
                    <el-table-column :label="t('levelNum')" min-width="120" >
                        <template #default="{row}">
                            <span>{{ levelWeightList[row.level_num] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="level_name" :label="t('levelName')" min-width="120" />
                    <el-table-column :label="t('oneRate')" min-width="200" >
                        <template #default="{ row }">
                            <span>{{ row.one_rate }}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="two_rate" :label="t('twoRate')" min-width="120" >
                        <template #default="{ row }">
                            <span>{{ row.two_rate }}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="level_text" :label="t('upgradeConditions')" min-width="150">
                        <template #default="{ row }">
                            <div class="flex flex-col">
                                <span v-for="(item, index) in row.level_text.list" :key="index">{{item}}{{row.level_text.list.length != index+1 ? row.level_text.text : ''}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                        <template #default="{ row }">
                            <el-button type="primary" link @click="editEvent(row.level_id)">{{ t("edit") }}</el-button>
                            <el-button v-if="!row.is_default" type="primary" link @click="deleteEvent(row.level_id)">{{ t("delete") }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="labelTable.page" v-model:page-size="labelTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="labelTable.total"
                        @size-change="getFenxiaoLevelListFn()" @current-change="getFenxiaoLevelListFn" />
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { t } from "@/lang";
import { ElMessageBox } from 'element-plus'
import { getFenxiaoLevelList, deleteFenxiaoLevel } from '@/addon/shop_fenxiao/api/level'
import { useRoute, useRouter } from "vue-router";
import { setTablePageStorage,getTablePageStorage } from "@/utils/common";

const route = useRoute();
const router = useRouter();
const pageName = route.meta.title;
const labelTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data:[],
    searchParam: {}
})
const levelWeightList = ['默认等级','一级','二级','三级','四级','五级','六级','七级','八级','九级','十级']
const getFenxiaoLevelListFn = (page: number = 1)=> {
    labelTable.loading = true
    getFenxiaoLevelList({
        page: labelTable.page,
        limit: labelTable.limit,
        ...labelTable.searchParam
    }).then((res: any) => {
        labelTable.data = res.data.data
        labelTable.total = res.data.total
        labelTable.loading = false
        setTablePageStorage(labelTable.page,labelTable.limit,labelTable.searchParam)
    }).catch(() => {
        labelTable.loading = false
    })
}
getFenxiaoLevelListFn(getTablePageStorage(labelTable.searchParam).page);

const addEvent = () => {
    router.push('/shop_fenxiao/management/level_edit')
};
const editEvent = (id:Number)=> {
    router.push(`/shop_fenxiao/management/level_edit?id=${ id }`)
}
// 删除等级
const repeat = ref<boolean>(false)
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('levelDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        if (repeat.value) return
        repeat.value = true
        deleteFenxiaoLevel(id).then(() => {
            getFenxiaoLevelListFn()
            repeat.value = false
        }).catch(() => {
            repeat.value = false
        })
    })
}
</script>

<style lang="scss" scoped></style>
