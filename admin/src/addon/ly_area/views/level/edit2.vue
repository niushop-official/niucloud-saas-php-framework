<template>
    <div class="main-container">
        <div class="detail-head">
            <div class="left" @click="back()">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{t('returnToPreviousPage')}}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="150px" ref="formRef" :rules="formRules" class="page-form">
                <div class="text-sm leading-[25px] title">{{ t('titleOne') }}</div>
                
                <el-form-item :label="t('levelNum')" >
                    <el-input v-model="formData.level_num" clearable :placeholder="t('levelNumPlaceholder')" class="input-width" />
                </el-form-item>

                <el-form-item :label="t('levelName')" >
                    <el-input v-model="formData.level_name" clearable :placeholder="t('levelNamePlaceholder')" class="input-width" />
                </el-form-item>
                
                <el-form-item :label="t('levelArea')" >
                    <!-- <el-select class="input-width"  v-model="formData.level_area" clearable :placeholder="t('levelAreaPlaceholder')">
                    <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in level_areaList"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                        />
                    </el-select> -->
                    <el-radio-group v-model="formData.level_area">
                        <el-radio label="1">{{ t('levelArea1') }}</el-radio>
                        <el-radio label="2">{{ t('levelArea2') }}</el-radio>
                        <el-radio label="3">{{ t('levelArea3') }}</el-radio>
                        <el-radio label="4">{{ t('levelArea4') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="t('levelRate')" >
                    <el-input v-model="formData.level_rate" clearable :placeholder="t('levelRatePlaceholder')" class="input-width" >
                        <template #append>%（按比例）</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="150px" ref="formRef" :rules="formRules" class="page-form">
            <div class="text-sm leading-[25px] title">{{ t('titleTwo') }}</div>
                <el-form-item :label="t('upType')" >
                    <el-radio-group v-model="formData.up_type">
                        <el-radio :label="0">{{t('upTypeOne')}}</el-radio>
                        <el-radio :label="1">{{t('upTypeTwo')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <!-- <el-form-item :label="t('orderGoodsId')" >
                    <el-input v-model="formData.order_goods_id" clearable :placeholder="t('orderGoodsIdPlaceholder')" class="input-width" />
                </el-form-item> -->

                <el-form-item :label="t('orderGoodsId')" >
                    <div class="flex flex-col">
                        <goods-select-popup  ref="goodsSelectPopupRef" v-model="formData.order_goods_id" :min="1" :max="9999" />
                        <span class="text-[#999] text-[12px]">{{t('orderGoodsId')}}</span>
                    </div>
                </el-form-item>

                <el-form-item :label="t('orderMoney')" >
                    <el-input v-model="formData.order_money" clearable :placeholder="t('orderMoneyPlaceholder')" class="input-width" >
                        <template #append>元</template>
                    </el-input>
                </el-form-item>
                
                <!-- <el-form-item :label="t('status')" >
                    <el-select class="input-width"  v-model="formData.status" clearable :placeholder="t('statusPlaceholder')">
                    <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in statusList"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item> -->
                
            </el-form>
        </el-card>
         <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(formRef)">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('cancel') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import type { FormInstance } from 'element-plus'
import goodsSelectPopup from '@/addon/shop/views/goods/components/goods-select-popup.vue'
import { getLevelInfo,addLevel,editLevel } from '@/addon/ly_area/api/level';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id:number = parseInt(route.query.id);
const loading = ref(false)
const pageName = route.meta.title


/**
 * 表单数据
 */
const initialFormData = {
    level_id: 0,
    level_name: '',
    level_num: 0,
    level_area: 1,
    level_rate: '',
    up_type: 0,
    order_goods_id: '',
    order_money: '',
    status: 0,
}
const formData: Record<string, any> = reactive({ ...initialFormData })

// const setFormData = async (id:number = 0) => {
//     Object.assign(formData, initialFormData)
//     const data = await (await getLevelInfo(id)).data
//     Object.keys(formData).forEach((key: any) => {
//         if (data[key] != undefined) formData[key] = data[key]
//         formData.up_proid = response.data.up_proid && res.data.up_proid != '0' ?  res.data.up_proid.split(',') : [];
//     })
// }
// if(id) setFormData(id);

const setFormData = async (level_id: number = 0) => {
  Object.assign(formData, initialFormData);
  const response = await getLevelInfo(level_id);
  const data = response.data;
  for (const key of Object.keys(formData)) {
    if (data[key] != undefined) formData[key] = data[key]
    formData.order_goods_id = response.data.order_goods_id && response.data.order_goods_id != '0' ?  response.data.order_goods_id.split(',') : [];
   
  }
};
if (id) setFormData(id);

const formRef = ref<FormInstance>()
// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    let level_areaList = ref([])
    const level_areaDictList = async () => {
    level_areaList.value = await (await useDictionary('area')).data.dictionary
    }
    level_areaDictList();
    watch(() => level_areaList.value, () => { formData.level_area = level_areaList.value[0].value })
    let statusList = ref([])
    const statusDictList = async () => {
    statusList.value = await (await useDictionary('is_open')).data.dictionary
    }
    statusDictList();
    watch(() => statusList.value, () => { formData.status = statusList.value[0].value })

    


const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
       if (valid) {
           loading.value = true
           let data = formData
        //    data.order_goods_id = data.order_goods_id.join()

           const save = id ? editLevel : addLevel
           save(data).then(res => {
               loading.value = false
               back()
           }).catch(err => {
               loading.value = false
           })

       }
    })
}

const back = () => {
    router.push('/ly_area/level')
};
</script>

<style lang="scss" scoped></style>