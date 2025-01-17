<template>
    <el-dialog v-model="dialogThemeVisible" title="编辑色调"  width="850px" align-center>
        <el-form :model="openData" label-width="150px" :rules="formRules" class="h-[640px] overflow-auto" ref="formRef" @submit.prevent>

            <el-form-item label="色调名称" prop="title" >
                <el-input v-model="openData.title" placeholder="请输入色调名称" maxlength="15" class="!w-[250px]" :disabled="openData.mark != 'diy'" />
            </el-form-item>

            <el-form-item :label="item.title" v-for="(item,index) in  formData" :key="index">
                <el-color-picker v-model="item.value" show-alpha :predefine="diyStore.predefineColors"/>
                <div class="form-tip">{{item.tip}}</div>
            </el-form-item>

            <el-form-item :label="item.title" v-for="(item,index) in  openData.diy_value" :key="index">
                <div class="flex items-center">
                    <el-color-picker v-model="item.value" show-alpha :predefine="diyStore.predefineColors"/>
                    <span class="text-primary cursor-pointer text-[14px] ml-[20px]"  @click="editThemeFn(item)">编辑</span>
                    <span class="text-primary cursor-pointer text-[14px] ml-[8px]"  @click="deleteThemeFn(item)">删除</span>
                </div>
                <div class="form-tip">{{item.tip}}</div>
            </el-form-item>

            <el-form-item>
                <div class="flex items-center text-primary cursor-pointer text-[14px]" @click="addThemeFn">
                    <span class="mr-[3px]">+</span>
                    <span>新增颜色</span>
                </div>
                <div class="form-tip">新增颜色key值不能与当前的存在的key值重复</div>
            </el-form-item>
        </el-form>
        <add-theme ref="addThemeRef" @confirm="addThemeConfirm" />   
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogThemeVisible = false">取消</el-button>
                <el-button type="primary" plain @click="resetConfirmFn()">重置</el-button>
                <el-button type="primary" @click="confirmFn(formRef)">保存</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { t } from '@/lang'
import { filterNumber } from '@/utils/common'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import addTheme from './add-theme.vue'
import useDiyStore from '@/stores/modules/diy'
import type { FormInstance } from 'element-plus'
const diyStore = useDiyStore()

const dialogThemeVisible = ref(false)
const addThemeRef = ref(null)
const openData: Record<string, any> = reactive({ // 用于接收弹窗打开时的参数
    title: '',
    mark: '',
    diy_value: [],
    default: {},
    data: {}
}) 

const emit = defineEmits(['confirm'])

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        title: [
            { required: true, message: "请输入色调名称", trigger: 'blur' }
        ]
    }
})

/**
* 表单数据
*/
const initialFormData = [
    {
        title: '主色调',
        label: '--primary-color',
        value: '#333333',
        tip: '主色调在uiapp中使用：var(--primary-color)'
    },
    {
        title: '辅色调',
        label: '--primary-help-color',
        value: '#333333',
        tip: '辅色调在uiapp中使用：var(--primary-help-color)'
    },
    {
        title: '页面背景色',
        label: '--page-bg-color',
        value: '#ffffff',
        tip: '页面背景色在uiapp中使用：var(--page-bg-color)'
    },
    {
        title: '主色调浅色（淡）',
        label: '--primary-color-light',
        value: '',
        tip: '主色调浅色（淡）在uiapp中使用：var(--primary-color-light)'
    },
    {
        title: '主色调浅色（深）',
        label: '--primary-color-light2',
        value: '',
        tip: '主色调浅色（深）在uiapp中使用：var(--primary-color-light2)'
    },
    {
        title: '灰色调',
        label: '--primary-color-dark',
        value: '#cccccc',
        tip: '灰色调在uiapp中使用：var(--primary-color-dark)'
    },
    {
        title: '禁用色',
        label: '--primary-color-disabled',
        value: '#eeeeee',
        tip: '禁用色在uiapp中使用：var(--primary-color-disabled)'
    },
    {
        title: '价格颜色',
        label: '--price-text-color',
        value: '#333333',
        tip: '价格颜色在uiapp中使用：var(--price-text-color)'
    }
]
const formData = ref([...cloneDeep(initialFormData)])

const open = (res:any) => { //参数： name=>色调名称，key=>区分系统还是应用的标识，default=>色调颜色的默认值，用于重置，data=>当前色调颜色值
    Object.keys(openData).forEach((key: string) => {
        openData[key] = res[key] != undefined ? cloneDeep(res[key]) : '';
    });
    
    // 恢复默认值
    formData.value.forEach((item,index) => {
        initialFormData.forEach((subItem, subIndex)=>{
            if(item.label == subItem.label){
                item.value = subItem.value;
            }
        })
    });

    // 渲染值
    formData.value.forEach((item,index) => {
        item.value = res.data[item.label] ? res.data[item.label] : item.value
    });

    dialogThemeVisible.value = true
}

// 新增颜色
const addThemeFn = ()=>{
    let keyArr = []
    formData.value.forEach((item,index) => {
        keyArr.push(item.label);
    });
    let obj = {
        key: keyArr
    }
    addThemeRef.value.open(obj);
}

// 编辑颜色
const editThemeFn = (res:any)=>{
    let keyArr = []
    formData.value.forEach((item,index) => {
        keyArr.push(item.label);
    });
    let obj = {
        key: keyArr,
        data: res
    }
    addThemeRef.value.open(obj);
}
// 删除颜色 
const deleteThemeFn = (res:any)=>{
    let indent = -1;
    for(let i = 0; i < openData.diy_value.length; i++){
        if(openData.diy_value[i].label == res.label){
            indent = i;
        }
    }
    if(indent > -1){
        openData.diy_value.splice(indent,1);
    }
}

// 添加颜色组件回调
const addThemeConfirm = (res:any) =>{
    for(let i = 0; i < openData.diy_value.length; i++){
        if(openData.diy_value[i].label == res.label){
            openData.diy_value[i] = res;
            return;
        }
    }
    openData.diy_value.push(res);
}

// 重置当前配色
const resetConfirmFn = ()=>{
    if(openData.default && Object.keys(openData.default).length){
        formData.value.forEach((item,index)=>{
            item.value = cloneDeep(openData.default[item.label]);
        })
    }else{
        formData.value = cloneDeep(initialFormData);
    }

    openData.diy_value = [];
    
    if(openData.mark == 'diy'){
        openData.title = '';
    }

    ElMessage({
        message: '重置成功',
        type: 'success',
    })
}


const confirmFn = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            let params = {
                theme: {},
                diy_value: [],
                title: ''
            }
            params.title = openData.title;

            formData.value.forEach((item,index) => {
                params.theme[item.label] = item.value
            });
            openData.diy_value.forEach((item,index) => {
                params.theme[item.label] = item.value
            });

            params.diy_value = openData.diy_value || [];
            
            emit('confirm', params);

            dialogThemeVisible.value = false;
        }
    })
}
defineExpose({
    dialogThemeVisible,
    open
})
</script>

<style lang="scss" scoped>

</style>
