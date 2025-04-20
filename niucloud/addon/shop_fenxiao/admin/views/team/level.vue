<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never" v-loading="loading">

            <el-form class="page-form" :model="formData" label-width="180px"  :rules="formRules" ref="formRef">
                <div class="text text-[14px] leading-[25px]">{{ t('baseTitle') }}</div>
                <el-card class="card !border-none" shadow="never">
                    <el-form-item :label="t('isEnable')">
                        <el-radio-group v-model="teamLevelData.is_open">
                            <el-radio label="1">{{ t('are') }}</el-radio>
                            <el-radio label="0">{{ t('no') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="t('teamLevel')">
                        <el-table :data="teamLevelData.level" size="large" ref="goodsListTableRef" @selection-change="handleSelectionChange">
                            <template #empty>
                                <span>{{ t('emptyData') }}</span>
                            </template>
                            <el-table-column prop="level_name" :label="t('fenxiaoLevel')" min-width="200">
                                <template #default="{ row }">
                                    <div>{{row.level_name}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="team_rate" :label="t('bonus')" min-width="200">
                                <template #default="{ row }">
                                    <el-input v-model.trim="row.team_rate" maxlength="6" show-word-limit @change="inputChange($event,'team_rate',row)" clearable class="!w-[180px]" @keyup="filterDigit($event)" :placeholder="t('setBonus')">
                                        <template #append>%</template>
                                    </el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="team_flat_rate" :label="t('bonus_flat')" min-width="300">
                                <template #default="{ row }">
                                    <el-input  v-model.trim="row.team_flat_rate" maxlength="6" show-word-limit  @change="inputChange($event,'team_flat_rate',row)"  clearable class="!w-[180px]" @keyup="filterDigit($event)" :placeholder="t('setBonus')">
                                        <template #append>%</template>
                                    </el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-card>
            </el-form>
        </el-card>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="save">{{ t('save') }}</el-button>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { t } from "@/lang";
import {getTeamConfig, setTeamConfig} from '@/addon/shop_fenxiao/api/team'
import {  ElMessage } from 'element-plus'
import {  useRouter } from "vue-router";
import { filterDigit } from '@/utils/common'

const loading = ref<Boolean>(false)

const teamLevelData = ref({
    is_open: "0",
    level: [],
    loading: false
});
const getTeamConfigFn = () => {
    loading.value = true
    getTeamConfig().then((res:any) => {
        teamLevelData.value.is_open = (res.data.is_open).toString();
        teamLevelData.value.level = res.data.level
        loading.value = false
    })
}
getTeamConfigFn()

const inputChange = (event, type, data)=>{
    const regex = /^([1-9]\d*|0)(\.\d+)?$|^0\.(?!0+\b)\d+(\d*[1-9])?$/;
    if(!event) return false; //防止和清空功能冲突
    event = Number(event);
    if (!regex.test(event)) {
        ElMessage.error(t('teamTips'))
        event = 0
    }
    if (parseFloat(event) > 100) {
        ElMessage.error(t('teamTipsNumericalRange'))
        event = 100
    }
    teamLevelData.value.level.forEach((item,index)=>{
        if(item.level_id == data.level_id){
            item[type] = parseFloat(event).toFixed(2);
        }
    })
}
let isSaveRepetition = false;
const save = ()=>{
    let obj: any = {};
    obj.is_open = teamLevelData.value.is_open;
    obj.level = [];
    teamLevelData.value.level.forEach((item: any,index)=>{
        let itemObj: any = {};
        itemObj.level_id = item.level_id;
        itemObj.team_rate = item.team_rate;
        itemObj.team_flat_rate = item.team_flat_rate;
        obj.level.push(itemObj);
    })

    if(isSaveRepetition) return false;
    isSaveRepetition = true;
    setTeamConfig(obj).then((res:any) => {
        getTeamConfigFn();
        isSaveRepetition = false;
    })
}
</script>

<style lang="scss" scoped>
    .el-input.el-input-group--append {
        width: 150px;
    }
</style>
