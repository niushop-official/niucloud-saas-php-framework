<template>
    <div class="main-container">
        <div class="detail-head">
            <div class="left" @click="back()">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{ t("returnToPreviousPage") }}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>
        <el-card class="box-card !border-none" shadow="never" v-loading="loading">
            <el-form :model="formData" label-width="130px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('levelName')" prop="level_id">
                    <el-select v-model="formData.level_id" class="input-width" clearable :placeholder="t('levelNamePlaceholder')">
                        <el-option v-for="item in config.leveList" :key="item.value" :label="item.level_name" :value="item.level_id" />
                    </el-select>
                    <span class="text-[var(--el-color-primary)] ml-[10px] cursor-pointer" @click="getShareholderLevelListFn(true)">刷新</span>
                    <span class="text-[var(--el-color-primary)] ml-[10px] cursor-pointer" @click="addLevelFn">添加等级</span>
                </el-form-item>
                <el-form-item :label="t('shareholderMemberName')" prop="member_id">
                    <!-- <span v-if="formData.member_id" class="mr-[10px]">{{ formData.member_name }}</span> -->
                    <div v-if="!formData.member_id" class="w-[180px] h-[32px] mr-[15px] box-border border-[1px] border-solid border-[#dcdfe6] px-[10px]">
                       <span>{{ t('memberDefault') }}</span> 
                    </div>
                    <div v-if="formData.member_id" class="parent-name w-[180px] h-[32px] flex justify-between items-center mr-[15px] box-border border-[1px] border-solid border-[#dcdfe6] px-[10px]">
                       <span>{{ formData.member_name }}</span> 
                       <el-icon class="!hidden cursor-pointer" color="#dcdfe6" @click="clearaMember"><CircleClose /></el-icon>
                    </div>
                    <el-button type="primary" @click="selectMemberFn">{{ t('selectMemberName') }}</el-button>
                </el-form-item>
              
            </el-form>
        </el-card>
        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="save()">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('back') }}</el-button>
            </div>
        </div>
     
        <member-of-select-popup :title="t('memberSelectPricePopupTitle')" ref="memberOfSelectPopupRef" @load="selectMemberCallbackFn" />
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { t } from "@/lang";
import {getShareholderLevelList} from '@/addon/ly_shareholder/api/level'
import {addShareholder} from '@/addon/ly_shareholder/api/shareholder'
import memberOfSelectPopup from '@/addon/ly_shareholder/views/components/member-of-select-popup.vue'
import { FormInstance, ElMessage } from 'element-plus'
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const pageName = route.meta.title;
const config :Record<string, any>= reactive({
    leveList:[]
})
/**
 * 表单数据
 */
const initialFormData = {
    level_id:null,
    member_name: '',
    member_id: null
};
const formData: Record<string, any> = reactive({ ...initialFormData });
const loading = ref<Boolean>(false)
const formRef = ref<FormInstance>()
const formRules = computed(() => {
    return {
        level_id: [{ required: true, message: t('levelNamePlaceholder'), trigger: 'change' }],
        member_id: [{ required: true, message: t('selectMemberNamePlaceholder'), trigger: 'change' }],
    }
})
//获取股东等级
let getLevelLoad = false;
const getShareholderLevelListFn=(bool=false)=>{
    if(getLevelLoad) return false;
    getLevelLoad = true;
    getShareholderLevelList({
        page: 1,
        limit: 11,
    }).then((res:any)=>{
        config.leveList = res.data.data
        getLevelLoad = false;
        if(bool){
            ElMessage({
                message: t('refreshSuccess'),
                type: 'success'
            })
        }
    })
}
getShareholderLevelListFn()

//选择上级会员弹框
const memberOfSelectPopupRef = ref<any>()
// 选择会员
const selectMemberFn = () => {
    memberOfSelectPopupRef.value?.show();
}
//选择回调
const selectMemberCallbackFn = (row: any) => {
    formData.member_id =row.member_id
    formData.member_name = row.nickname || row.username
    formRef.value?.validateField('member_id')
}
const clearaMember=()=>{
    formData.member_id = null
    formData.member_name = ''
}
const repeat = ref<boolean>(false)
const save = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            if (repeat.value) return
            repeat.value = true
             addShareholder(formData).then((res) => {
                repeat.value = false
                back()
            }).catch(() => {
                repeat.value = false
            })
        }
    })
}
const back = () => {
    router.push('/ly_shareholder/lists')
};

//跳转股东等级列表页面
const addLevelFn = ()=>{
    const routeData = router.resolve('/ly_shareholder/shareholder_level')
    window.open(routeData.href)
}
</script>
<style lang="scss" scoped>
.parent-name:hover{
   .el-icon{
    display: block !important;
   }
} 
</style>