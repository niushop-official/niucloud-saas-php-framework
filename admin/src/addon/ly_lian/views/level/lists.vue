<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-page-title">{{ pageName }}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t("addLevel") }}
                </el-button>
            </div>
            <!-- <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="labelTable.params" ref="searchFormRef">
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="labelTable.params.create_time" type="datetimerange"
							value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
							:end-placeholder="t('endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getFenxiaoLevelListFn()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card> -->
        <div class="mt-[20px]">
            <el-table :data="labelTable.data" size="large" v-loading="labelTable.loading">
                <template #empty>
                    <span>{{ !labelTable.loading ? t("emptyData") : "" }}</span>
                </template>
                <el-table-column prop="level_id" :label="t('ID')" min-width="80" />

                <el-table-column :label="t('levelNum')" min-width="120" >
                    <template #default="{row}">
                        <span>{{ levelWeightList[row.level_num] }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="level_name" :label="t('levelName')" min-width="120" />

                <!-- 直推奖 -->
                <el-table-column :label="t('Rate')" min-width="150" >
                    <template #default="{ row }">
                        <span v-if="row.recommend_rate > 0">{{ row.recommend_rate }}&nbsp%</span>
                        <span v-else>{{ row.recommend_money }}&nbsp元</span>
                    </template>
                </el-table-column>

                <!-- 见点奖 -->
                <el-table-column :label="t('seeRate')" min-width="150" >
                    <template #default="{ row }">
                        <span v-if="row.see_rate > 0">{{ row.see_rate }}&nbsp%</span>
                        <span v-else>{{ row.see_money }}&nbsp元</span>
                    </template>
                </el-table-column>

                <!-- 培育奖 -->
                <el-table-column :label="t('cultivateRate')" min-width="150" >
                    <template #default="{ row }">
                        <span v-if="row.cultivate_rate > 0">{{ row.cultivate_rate }}&nbsp%</span>
                        <span v-else>{{ row.cultivate_money }}&nbsp元</span>
                    </template>
                </el-table-column>

                <!-- 冻结比例 -->
                <el-table-column prop="frozen_rate" :label="t('frozenRate')" min-width="120" >
                    <template #default="{ row }">
                        <span>{{ row.frozen_rate }}&nbsp;%</span>
                    </template>
                </el-table-column>

                <el-table-column prop="level_text" :label="t('upgradeConditions')" min-width="200">
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
                @size-change="getLianLevelListFn()" @current-change="getLianLevelListFn" />
        </div>
        </div>
    </el-card>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { t } from "@/lang";
import { ElMessageBox } from 'element-plus'
import {getLevelList,deleteLevel} from '@/addon/ly_lian/api/level'
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const pageName = route.meta.title;
const labelTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    data:[],
    recommend_type: 0,
    frozen_rate: 0.00,

})
const levelWeightList = ['默认等级','一级','二级']
// const levelWeightList = ['一级','二级','三级','四级','五级','六级','七级','八级','九级','十级']
// const searchFormRef = ref()
const getLianLevelListFn = ()=>{
    labelTable.loading=true
    getLevelList({
        page: labelTable.page,
        limit: labelTable.limit,
    }).then((res:any)=>{
        labelTable.data = res.data.data
        labelTable.total = res.data.total
        labelTable.loading = false
    }).catch(()=>{
        labelTable.loading= false
    })
}
getLianLevelListFn()
// const resetForm = (formEl: FormInstance | undefined) => {
//     if (!formEl) return
//     formEl.resetFields()

//     getShareholderLeveListFn()
// }
const addEvent = () => {
    router.push('/ly_lian/level_edit')
};
const editEvent = (id:Number)=>{
    router.push(`/ly_lian/level_edit?id=${id}`)
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
        deleteLevel(id).then(() => {
            getLianLevelListFn()
            repeat.value = false
        }).catch(() => {
            repeat.value = false
        })
    })
}
</script>
<style lang="scss" scoped></style>
