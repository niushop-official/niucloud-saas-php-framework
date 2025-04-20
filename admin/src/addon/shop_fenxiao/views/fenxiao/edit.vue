<template>
    <div class="main-container" v-loading="loading">

        <!--返回-->
        <el-card class="card !border-none" shadow="never">
            <el-page-header :content="pageName" :icon="ArrowLeft" @back="back()" />
        </el-card>
        <!--返回 end-->

        <el-card class="card mt-[15px] !border-none" shadow="never">
            <el-form class="page-form" :model="formData" label-width="130px" ref="formRef" :rules="formRules">
                <el-form-item :label="t('levelName')" prop="level_id">
                    <el-select v-model="formData.level_id" class="input-width" clearable :placeholder="t('levelNamePlaceholder')">
                        <el-option v-for="item in config.leveList" :key="item.value" :label="item.level_name" :value="item.level_id" />
                    </el-select>
                    <span class="text-[var(--el-color-primary)] ml-[10px] cursor-pointer" @click="getFenxiaoLevelListFn(true)">刷新</span>
                    <span class="text-[var(--el-color-primary)] ml-[10px] cursor-pointer" @click="addLevelFn">添加等级</span>
                </el-form-item>

                <el-form-item :label="t('fenxiaoMemberName')" prop="member_id">
                    <div v-if="!formData.member_id" class="w-[180px] h-[32px] mr-[15px] px-[10px] box-border border-[1px] border-solid border-[var(--el-border-color)]">
                       <span class="text-[var(--el-text-color-secondary)]">{{ t('memberDefault') }}</span> 
                    </div>
                    <div v-if="formData.member_id" class="parent-name w-[180px] h-[32px] flex justify-between items-center mr-[15px] px-[10px] box-border border-[1px] border-solid border-[var(--el-border-color)]">
                       <span class="text-[var(--el-text-color-regular)]">{{ formData.member_name }}</span> 
                       <el-icon class="!hidden cursor-pointer" color="#dcdfe6" @click="clearaMember"><CircleClose /></el-icon>
                    </div>
                    <el-button type="primary" @click="selectMemberFn">{{ t('selectMemberName') }}</el-button>
                </el-form-item>

                <el-form-item :label="t('fenxiao')">
                    <div v-if="!formData.parent" class="w-[180px] h-[32px] mr-[15px] px-[10px] box-border border-[1px] border-solid border-[var(--el-border-color)]">
                       <span class="text-[var(--el-text-color-secondary)]">{{ t('fenxiaoDefault') }}</span> 
                    </div>
                    <div v-if="formData.parent" class="parent-name w-[180px] h-[32px] flex justify-between items-center mr-[15px] px-[10px] box-border border-[1px] border-solid border-[var(--el-border-color)]">
                       <span class="text-[var(--el-text-color-regular)]">{{ formData.parent_name }}</span>
                       <el-icon class="!hidden cursor-pointer" color="#dcdfe6" @click="clearaParent"><CircleClose /></el-icon>
                    </div>
                    <el-button type="primary" @click="selectFenxiaoFn">{{ t('selectFenxiao') }}</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="save()">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('back') }}</el-button>
            </div>
        </div>

        <!-- 选择分销商弹窗 -->
        <fenxiao-of-select-popup :title="t('fenxiaoSelectPricePopupTitle')" ref="fenxiaoOfSelectPopupRef" @load="selectFenxiaoCallbackFn" />
        <member-of-select-popup :title="t('memberSelectPricePopupTitle')" ref="memberOfSelectPopupRef" @load="selectMemberCallbackFn" />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { t } from "@/lang";
import { getFenxiaoLevelList } from '@/addon/shop_fenxiao/api/level'
import { addFengxiao } from '@/addon/shop_fenxiao/api/fenxiao'
import fenxiaoOfSelectPopup from '@/addon/shop_fenxiao/views/components/fenxiao-of-select-popup.vue'
import memberOfSelectPopup from '@/addon/shop_fenxiao/views/components/member-of-select-popup.vue'
import { FormInstance, ElMessage } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
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
    id: 0,
    level_id:null,
    parent_name: '',
    parent: null,
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
//获取分销等级
let getLevelLoad = false;
const getFenxiaoLevelListFn=(bool=false)=>{
    if(getLevelLoad) return false;
    getLevelLoad = true;
    getFenxiaoLevelList({
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
getFenxiaoLevelListFn()
//选择上级分销商弹框
const fenxiaoOfSelectPopupRef = ref<any>()
// 选择分销商
const selectFenxiaoFn = () => {
    fenxiaoOfSelectPopupRef.value?.show();
}
const clearaParent = ()=>{
    formData.parent = null
    formData.parent_name = ''
}
//选择回调
const selectFenxiaoCallbackFn = (row: any) => {
    formData.parent = row.member.member_id
    formData.parent_name = row.member.nickname || row.member.username
    formRef.value?.validateField('parent')
}
//选择上级会员弹框
const memberOfSelectPopupRef = ref<any>()
// 选择会员
const selectMemberFn = () => {
    memberOfSelectPopupRef.value?.show();
}
//选择回调
const selectMemberCallbackFn = (row: any) => {
    formData.member_id =row.member_id
    formData.member_name = row.member.nickname || row.member.username
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
             addFengxiao(formData).then((res) => {
                repeat.value = false
                back()
            }).catch(() => {
                repeat.value = false
            })
        }
    })
}
const back = () => {
    router.push('/shop_fenxiao/lists')
}

//跳转分销等级列表页面
const addLevelFn = ()=>{
    const routeData = router.resolve('/shop_fenxiao/management/level')
    window.open(routeData.href)
}
</script>

<style lang="scss" scoped>
    .parent-name:hover {

        .el-icon{
            display: block !important;
        }
    } 
</style>