<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never" v-loading="labelTable.loading">

            <el-form class="page-form" :model="formData" label-width="180px"  :rules="formRules" ref="formRef">
                <div class="text text-[14px] leading-[25px]">{{ t('baseTitle') }}</div>
                <el-card class="card !border-none" shadow="never">
                    <el-form-item :label="t('isEnable')">
                        <el-radio-group v-model="agentConfig.is_open" @change="isOpenChange">
                            <el-radio label="1">{{ t('are') }}</el-radio>
                            <el-radio label="0">{{ t('no') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="t('teamLevel')">
                        <el-button type="primary" class="mb-[15px]" @click="addEvent">
                            {{ t('addLevel') }}
                        </el-button>
                        <el-table :data="labelTable.data" size="large" v-loading="labelTable.loading">
                            <template #empty>
                                <span>{{ !labelTable.loading ? t("emptyData") : "" }}</span>
                            </template>
                            <el-table-column prop="name" :label="t('levelName')" min-width="120" />
                            <el-table-column :label="t('money')" min-width="120">
                                <template #default="{ row }">
                                    {{moneyFormat(row.money) || '0.00' }}
                                </template>
                            </el-table-column>
                            <el-table-column :label="t('discount')" min-width="120" >
                                <template #default="{ row }">
                                    {{row.discount || 0 }}
                                </template>
                            </el-table-column>
                            <el-table-column :label="t('operation')" fixed="right" align="right" min-width="120">
                                <template #default="{ row }">
                                    <el-button type="primary" link @click="editEvent(row)">{{ t("edit") }}</el-button>
                                    <el-button type="primary" link @click="deleteEvent(row.level_id)">{{ t("delete") }}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-card>
            </el-form>
        </el-card>

        <!-- 添加渠道代理 -->
        <el-dialog v-model="agentDialog" :title="(isEditLevelDialog ? t('editLevel') : t('addLevel'))" width="450px" :destroy-on-close="true" :close-on-click-modal="false">
            <el-form ref="levelListInfoRef" :model="levelDialogData" label-width="110px" :rules="formRules">
                <el-form-item :label="t('levelName')" prop="name">
                    <el-input v-model.trim="levelDialogData.name" :placeholder="t('levelNamePlaceholder')" maxlength="25" show-word-limit />
                </el-form-item>
                <el-form-item :label="t('money')" prop="money">
                    <div class="flex flex-col">
                        <el-input v-model.trim="levelDialogData.money" maxlength="7" show-word-limit @keyup="filterDigit($event)" class="!w-[300px]" :placeholder="t('moneyPlaceholder')">
                            <template #append>元</template>
                        </el-input>
                        <span class="text-[#999] leading-[1.3] mt-[5px] text-[12px]">等级费用指代理商申请的费用，目前代理申请线下处理，系统只做记录</span>
                    </div>
                </el-form-item>
                <el-form-item :label="t('discount')" prop="discount">
                    <div class="flex flex-col">
                        <el-input v-model.trim="levelDialogData.discount" class="!w-[300px]" @keyup="filterDigit($event)" :placeholder="t('discountPlaceholder')" maxlength="60">
                            <template #append>折</template>
                        </el-input>
                        <span class="text-[#999] leading-[1.3] mt-[5px] text-[12px]">折扣数据0-10折</span>
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="agentDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="onSave(levelListInfoRef)">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { t } from "@/lang";
import { img, moneyFormat,filterDigit } from '@/utils/common';
import { getAgentLevelList, editAgentLevel, addAgentLevel, deleteAgentLevel, setAgentConfig, getAgentConfig } from '@/addon/shop_fenxiao/api/agent'
import { FormInstance, ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const pageName = route.meta.title;

const agentDialog = ref(false);
const labelTable = reactive({
    loading: false,
    data:[]
});

const getAgentLevelFn = ()=> {
    labelTable.loading = true
    getAgentLevelList().then((res: any) => {
        labelTable.data = res.data
        labelTable.loading = false
    }).catch(() => {
        labelTable.loading = false
    })
}
getAgentLevelFn()

/********************* 添加渠道等级start **************************/
const levelListInfoRef = ref<FormInstance>()
const isEditLevelDialog = ref(false);
const levelDialogData: Record<string, any> = reactive({
    name:'',
    money: '',
    discount: ''
})
const addEvent = () => {
    isEditLevelDialog.value = false;
    agentDialog.value = true;
    levelDialogData.discount = "";
    levelDialogData.money = "";
    levelDialogData.name = "";
};

// 表单验证规则
const formRules = computed(() => {
    return {
        name: [
            { required: true, message: t('levelNamePlaceholder'), trigger: 'blur' }
        ],
        money: [
            { required: true, message: t('moneyPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    if(parseFloat(value) < 0){
                        callback(new Error(t('lessThan')))
                    } else callback()
                },
                trigger: ['blur', 'change']
            }
        ],
        discount: [
            { required: true, message: t('discountPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    var num = parseFloat(value);
                    if(isNaN(num) || num < 0 || num > 10 || num.toFixed(2) != num){
                        callback(new Error(t('discountIntPlaceholder')))
                    } else callback()
                },
                trigger: ['blur', 'change']
            }
        ]
    }
})

const saveLoading = ref(false);
const onSave = async (formEl: FormInstance | undefined) => {
    if (saveLoading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            saveLoading.value = true;
            const data = levelDialogData
            const save = isEditLevelDialog.value ? editAgentLevel : addAgentLevel
            save(data).then(res => {
                saveLoading.value = false
                agentDialog.value = false;
                getAgentLevelFn();
            }).catch(() => {
                saveLoading.value = false
            })
        }
    })
}
/********************* 添加渠道等级end **************************/


/********************* 编辑渠道等级start **************************/
const editEvent = (data: Record<string, any>)=>{
    levelDialogData.level_id = data.level_id;
    levelDialogData.discount = data.discount;
    levelDialogData.money = parseFloat(data.money);
    levelDialogData.name = data.name;
    isEditLevelDialog.value = true;
    agentDialog.value = true;

}
/********************* 编辑渠道等级end **************************/

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
        deleteAgentLevel({level_id:id}).then(() => {
            getAgentLevelFn()
            repeat.value = false
        }).catch(() => {
            repeat.value = false
        })
    })
}
/********************* 设置渠道配置 **************************/
const agentConfig = ref({is_open: 0});
const configLoading = ref(false);
const getAgentConfigFn = (page: number = 1)=>{
    getAgentConfig().then((res:any)=>{
        agentConfig.value.is_open = res.data.is_open;
    })
}
getAgentConfigFn()

const isOpenChange = ()=>{
    if(configLoading.value) return false;
    configLoading.value = true;
    setAgentConfig({is_open: agentConfig.value.is_open}).then((res:any)=>{
        configLoading.value = false;
    })
}
</script>

<style lang="scss" scoped></style>
