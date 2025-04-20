<template>
    <div class="main-container">
        <el-card class="card !border-none" shadow="never" v-loading="configLoading">

            <el-form class="page-form" :model="formData" label-width="180px" :rules="formRules" ref="formRef">
                <div class="text text-[14px] leading-[25px]">{{ t('baseTitle') }}</div>
                <el-card class="card !border-none" shadow="never">
                    <el-form-item :label="t('isEnable')">
                        <el-radio-group v-model="config.is_open" @change="isOpenChange">
                            <el-radio label="1">{{ t('are') }}</el-radio>
                            <el-radio label="0">{{ t('no') }}</el-radio> 
                        </el-radio-group>
                    </el-form-item>
                </el-card>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { t } from "@/lang";
import { getTaskConfig, setTaskConfig } from '@/addon/shop_fenxiao/api/task'
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const pageName = route.meta.title;

const config = ref({is_open: '0'});
const configLoading = ref(true);
const getTaskConfigFn = ()=>{
    getTaskConfig().then((res:any)=>{
        configLoading.value = false;
        config.value = res.data;
    })
}
getTaskConfigFn()

const isOpenChange = ()=>{
    if(configLoading.value) return false;
    configLoading.value = true;
    setTaskConfig({is_open: config.value.is_open}).then((res:any)=>{
        configLoading.value = false;
    })
}
</script>

<style lang="scss" scoped>
    .el-input.el-input-group--append {
        width: 150px;
    }
</style>
