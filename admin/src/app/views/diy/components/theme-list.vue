<template>
    <el-dialog v-model="dialogThemeVisible" :title="data.addon_title"  width="550px"  align-center>
        <el-form class="page-form mt-[15px]" :model="formData" label-width="90px" v-loading="loading">
            <el-form-item label="选择配色">
                <div class="flex items-center flex-wrap">
                    <template v-for="(tempItem,tempIndex) in theme_temp">
                        <div :key="tempIndex" v-if="tempItem.name != 'diy'" class="flex items-center border-[1px] border-solid border-[#dcdee2] rounded-[5px] h-[40px] px-[15px] mr-[10px] cursor-pointer my-[5px]" :class="{'!border-[var(--el-color-primary)]': curr_theme_mark == tempItem.name}" @click="themeTempChange(tempItem)">
                            <span v-if="data.theme" class="w-[20px] h-[20px] mr-[5px] rounded-[3px]" :style="{backgroundColor: data.theme['--primary-color']}"></span>
                            <span class="text-[14px]" :class="{'!text-[var(--el-color-primary)]': curr_theme_mark == tempItem.name}">{{tempItem.title}}</span>
                        </div>
                    </template>
                    <div class="flex items-center border-[1px] border-solid border-[#dcdee2] rounded-[5px] h-[40px] px-[15px] cursor-pointer" :class="{'!border-[var(--el-color-primary)]': curr_theme_mark == 'diy'}" @click="themeTempChange('diy')">
                        <span class="nc-iconfont nc-icon-tianjiaV6xx mr-[5px]" :class="{'!text-[var(--el-color-primary)]': curr_theme_mark == 'diy'}"></span>
                        <span class="text-[14px]" :class="{'!text-[var(--el-color-primary)]': curr_theme_mark == 'diy'}">自定义</span>
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <edit-theme ref="editThemeRef"  @confirm="editThemeConfirm"/>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogThemeVisible = false">取消</el-button>
                <el-button type="primary" plain @click="editThemeFn()">编辑</el-button>
                <el-button type="primary" @click="confirmFn()">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { t } from '@/lang'
import { setDiyTheme, getDefaultTheme } from '@/app/api/diy'
import { cloneDeep } from 'lodash-es'
import editTheme from './edit-theme.vue'
import useDiyStore from '@/stores/modules/diy'
import { time } from 'echarts'
const diyStore = useDiyStore()

const editThemeRef = ref(null)
const dialogThemeVisible = ref(false)
let confirmRepeat = false
const curr_theme_title = ref('') //当前配色title
const curr_theme_mark = ref('') //当前配色标识
const curr_theme_value = ref('') //当前配色theme
const theme_temp = ref([]);
const mode = ref('default'); // 当前模式

const data = ref({})
const open = (res:any) => {

    confirmRepeat = false;
    data.value = cloneDeep(res);
    curr_theme_value.value = res.value;
    curr_theme_mark.value = res.color_mark;
    curr_theme_title.value = res.color_name;

    // 新增颜色
    theme_temp.value.forEach((item,index)=>{
        if(item.name == data.value.color_mark){
            item.diy_value = data.value.diy_value;
            item.title = res.color_name;
        }
    })

    mode.value = res.mode;
    dialogThemeVisible.value = true
}

const emit = defineEmits(['confirm'])

const initData = () => {
    getDefaultTheme().then((res) => {
        theme_temp.value = res.data || [];

        // 将自定义添加到里面
        let diy_theme_temp = {
            name: 'diy',
            theme: '',
            title: ''
        }
        theme_temp.value.push(diy_theme_temp);
    })
}
initData()

// 切换不同配色
const themeTempChange = (item)=>{
    if(item.name == data.value.color_mark){ // 选择默认配色的情况
        curr_theme_title.value = data.value.color_name;
        curr_theme_mark.value = data.value.color_mark;
        curr_theme_value.value = data.value.value;
    }else if(typeof item == 'object'){ // 选择除默认配色的情况
        curr_theme_title.value = item.title;
        curr_theme_mark.value = item.name;
        curr_theme_value.value = item.theme;
    }else{ // 自定义情况
        curr_theme_title.value = '自定义';
        curr_theme_mark.value = item;
        curr_theme_value.value = '';
    }
}

// 编辑色调
const editThemeFn = ()=>{
    let theme = {
        default: {}, // 当前色调的默认值
        data: {}, // 当前色调
        title:'',
        mark: '', // 标识，区分是自定义还是模版色调,
        diy_value: [] // 新增颜色值
    }
    theme.data = cloneDeep(curr_theme_value.value) || {};
    theme.mark = curr_theme_mark.value;
    theme_temp.value.forEach((item,index)=>{
        if(item.name == curr_theme_mark.value){
            theme.default = item.theme ? cloneDeep(item.theme) : '';
            theme.diy_value= item.diy_value || [];
            theme.title = item.title;
        }
    })
    editThemeRef.value.open(theme)
}

// 编辑色调回调
const editThemeConfirm = (res)=>{
    if(curr_theme_mark.value == data.value.color_mark){
        data.value.value = res.theme;
    }
    theme_temp.value.forEach((item,index)=>{
        if(item.name == curr_theme_mark.value){
            item.diy_value= res.diy_value || [];
        }
    })
    data.value.title = res.title;
    curr_theme_value.value = res.theme;
}

// 点击保存
const confirmFn = () => {
    if (confirmRepeat) return
    confirmRepeat = true
    let params = {}
    params.id = data.value.id;
    params.mode = mode.value;
    params.color_mark = curr_theme_mark.value;
    params.value = curr_theme_value.value;
    params.key = data.value.key;
    params.color_name = curr_theme_mark.value == 'diy' ? (data.value.title || '自定义') : curr_theme_title.value;
    theme_temp.value.forEach((item,index)=>{
        if(item.name == curr_theme_mark.value){
            params.diy_value = cloneDeep(item.diy_value);
        }
    })

    setDiyTheme(params).then((res) => {
        emit('confirm', data);
        confirmRepeat = false;
        dialogThemeVisible.value = false;
    }).catch(()=>{
        confirmRepeat = false;
    })

}

defineExpose({
    dialogThemeVisible,
    open
})
</script>

<style lang="scss" scoped>

</style>
