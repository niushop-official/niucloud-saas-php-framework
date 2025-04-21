<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never" v-loading="loading">
            <el-form :model="formData" label-width="180px"  :rules="formRules" ref="formRef" class="page-form" v-if="!loading">
                <div class="text-sm leading-[25px] relative title">{{ t('titleOne') }}</div>
                <el-card class="box-card !border-none" shadow="never">
                    <el-form-item :label="t('isOpen')">
                        <el-radio-group v-model="formData.is_open">
                            <el-radio v-for="dict in is_openList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t(dict.value) }}</el-radio>
                        </el-radio-group>
                        <!-- <el-select v-model="formData.is_open"  clearable style="width: 200px;">
                            <el-option v-for="dict in is_openList" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                        </el-select> -->
                    </el-form-item>
                    

                    <!-- 股东分红设置 -->
                    <!-- <template v-if="formData.is_open!='0'"> -->
                    <template v-if="formData.is_open!='0'">
                        <el-form-item :label="t('isMax')">
                            <el-radio-group v-model="formData.is_max">
                                <el-radio v-for="dict in is_openList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t(dict.value) }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="t('isCommission')">
                            <el-radio-group v-model="formData.is_commission">
                                <el-radio v-for="dict in is_openList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t(dict.value) }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <template v-if="formData.is_commission!='0'">   
                            <el-form-item :label="t('minOrder')" >
                                <div class="flex flex-col">
                                    <el-input v-model="formData.min_order" clearable style="width: 300px;" @keyup="filterNumber($event)" >
                                        <template #append>单</template>
                                    </el-input>
                                    <!-- <span class="text-[#999] text-[12px]">{{t('up_proid_tips')}}</span> -->
                                </div>
                            </el-form-item>
                            <el-form-item :label="t('minOrderAmount')" >
                                <div class="flex flex-col">
                                    <el-input v-model="formData.min_order_amount" clearable style="width: 300px;" @keyup="filterNumber($event)" >
                                        <template #append>元</template>
                                    </el-input>
                                    <!-- <span class="text-[#999] text-[12px]">{{t('up_proid_tips')}}</span> -->
                                </div>
                            </el-form-item>
                        </template>

                        <el-form-item :label="t('settleType')" >
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.settle_type">
                                    <el-radio v-for="dict in settle_typeList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t('settleType' + dict.value) }}</el-radio>
                                </el-radio-group>
                                <span class="text-[#999] text-[12px]">{{t('settleType_tips')}}</span>
                            </div>
                        </el-form-item>

                        <el-form-item :label="t('takeType')">
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.take_type">
                                    <el-radio v-for="dict in take_typeList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t('takeType' + dict.value) }}</el-radio>
                                </el-radio-group>
                                <span class="text-[#999] text-[12px]">{{t('takeType_tips')}}</span>
                            </div>
                        </el-form-item>

                        <el-form-item :label="t('settleTime')">
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.settle_time">
                                    <el-radio v-for="dict in settle_timeList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t('settleTime' + dict.value) }}</el-radio>
                                </el-radio-group>
                                <span class="text-[#999] text-[12px]">{{t('settleTime_tips')}}</span>
                            </div>
                        </el-form-item>

                        <!-- <el-form-item :label="t('settleCondition')">
                            <div class="flex flex-col">
                                <el-radio-group v-model="formData.settle_condition">
                                    <el-radio v-for="dict in settle_conditionList" :key="dict.value" :label="dict.value" :value="dict.value">{{ t('settleCondition' + dict.value) }}</el-radio>
                                </el-radio-group>
                                <span class="text-[#999] text-[12px]">{{t('settleCondition_tips')}}</span>
                            </div>
                        </el-form-item> -->
<!--
                        <el-form-item :label="t('gradeRatio')">
                            <div class="flex flex-col">
                                 <el-input v-for="(item, index) in obj" :key="index" style="width: 100%;">
                                    <template #prepend>{{item.name}}</template>
                                    <template #append>%</template>
                                    </el-input>  
                            </div>
                               <el-input v-model="formData.fenhong_ratio"> <template #append>%</template> </el-input>
                            </div>
                        </el-form-item>-->
                    </template>
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
import { ref, reactive, computed, onMounted } from "vue";
import { t } from "@/lang";
import { useDictionary } from '@/app/api/dict';
import {getShareholderConfig, setShareholderConfig} from '@/addon/ly_shareholder/api/config'
import { getShareholderLevelList } from "@/addon/ly_shareholder/api/level"
import {  ElMessage, FormInstance } from 'element-plus'
// import { cloneDeep } from 'lodash-es'
import {  useRouter } from "vue-router";
import { filterNumber,filterDigit } from '@/utils/common';
onMounted(() => {
    getLevelList()
})

// const route = useRoute();
const router = useRouter();
// const pageName = route.meta.title;
const loading = ref<Boolean>(false)
/**
 * 表单数据
 */
 const formData = reactive<Record<string, string | Array>>({
    is_open: '1',
    is_max: '0',
    is_commission: '0',
    min_order: '',
    min_order_amount: '0.00',
    settle_type: '0',
    settle_time: '0',
    take_type: '0',
    fenhong_ratio: '',
    settle_condition: '1'
})

const getFormData = async (id: number = 0) => {
    loading.value = true
    const data = await (await getShareholderConfig()).data
    formData.is_open = data?.is_open
    formData.is_max = data?.is_max
    formData.is_commission = data?.is_commission
    formData.min_order = data?.min_order
    formData.min_order_amount = data?.min_order_amount
    formData.settle_type = data?.settle_type
    formData.settle_time = data?.settle_time
    formData.take_type = data?.take_type
    formData.fenhong_ratio = data?.fenhong_ratio
    formData.settle_condition = data?.settle_condition
    loading.value = false
}

getFormData()

const formRef = ref<FormInstance>()
const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            const data = JSON.parse(JSON.stringify(formData))

            data.min_order_amount = data.min_order_amoun

            setShareholderConfig(data).then(res => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
function save() {
    const data = JSON.parse(JSON.stringify(formData))
            // data.up_proid = data.up_proid.join(',')
            // data.up_cid = data.up_cid.join(',')
            // data.up_amount = data.up_amount

            setShareholderConfig(data).then(res => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
}

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
const is_openList = ref([] as any[])
    const is_openDictList = async () => {
    is_openList.value = await (await useDictionary('is_open')).data.dictionary
    }
    is_openDictList();
    const multiList = ref([] as any[])
    const multiDictList = async () => {
    multiList.value = await (await useDictionary('is_open')).data.dictionary
    }
    multiDictList();

    const settle_typeList = ref([] as any[])
    const settle_typeDictList = async () => {
    settle_typeList.value = await (await useDictionary('settle_type')).data.dictionary
    }
    settle_typeDictList();
    const take_typeList = ref([] as any[])
    const take_typeDictList = async () => {
    take_typeList.value = await (await useDictionary('take_type')).data.dictionary
    }
    take_typeDictList();
    const settle_timeList = ref([] as any[])
    const settle_timeDictList = async () => {
    settle_timeList.value = await (await useDictionary('settle_time')).data.dictionary
    }
    settle_timeDictList();
    
    const settle_conditionList = ref([] as any[])
    const settle_conditionDictList = async () => {
    settle_conditionList.value = await (await useDictionary('settle_condition')).data.dictionary
    }
    settle_conditionDictList();




const getShareholderConfigFn=()=>{
    loading.value = true
    getShareholderConfig().then((res:any)=>{
        Object.keys(formData).forEach((key:any)=>{
            if (res.data[key] != undefined) formData[key] = res.data[key]
            // formData.goods_ids = res.data.goods_ids.split(',')
        })
        loading.value = false
    })
}
getShareholderConfigFn()
// const repeat = ref<boolean>(false)
// const save = ()=>{
//     var data :any = cloneDeep(formData)
    // if(formData.apply_type!='3'&&formData.fenxiao_condition=='3'){
    //     if(!formData.goods_ids.length){
    //         ElMessage({
    //             type: 'warning',
    //             message: `${t('goodsIdsPlaceholder')}`
    //         })
    //     }
    // } 
//     data.goods_ids = data.goods_ids.join()
//     formRef.value?.validate((valid) => {
//         if(valid){
//             if (repeat.value) return
//             repeat.value = true
//             setShareholderConfig(data).then((res:any)=>{
//                 repeat.value = false
//             }).catch(()=>{
//                 repeat.value = false
//             })
//         }
//     })
// }


// const toLink = (type)=>{
//     let routeData = router.resolve(`/setting/agreement/edit?key=${type}`)
//     window.open(routeData.href,' blank');
// }
const obj = ref({})
function getLevelList() {
    getShareholderLevelList({}).then(res => {
      obj.value = res.data.map(i => {
        return {
            name: i.level_name
        }
      })
      console.log(obj.value)
    })
}
</script>
<style lang="scss" scoped>
.el-input.el-input-group--append {
    width: 170px;
}
</style>