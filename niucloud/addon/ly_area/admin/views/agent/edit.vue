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
            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
                <!-- <el-form-item :label="t('memberId')" >
                    <el-input v-model="formData.member_id" clearable :placeholder="t('memberIdPlaceholder')" class="input-width" />
                </el-form-item> -->

                <!-- 关联会员 -->
                <el-form-item :label="t('memberId')" prop="member_id">
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

                <el-form-item :label="t('fullAddress')" prop="full_area">
					<el-select v-model="formData.province_id" value-key="id" clearable class="w-[200px]"  ref="provinceRef">
						<el-option :label="t('provincePlaceholder')" :value="0"/>
						<el-option v-for="(item, index) in areaList.province " :key="index" :label="item.name"  :value="item.id"/>
					</el-select>
					<el-select v-model="formData.city_id" value-key="id" clearable class="w-[200px] ml-3" ref="cityRef">
						<el-option :label="t('cityPlaceholder')" :value="0"/>
						<el-option v-for="(item, index) in areaList.city " :key="index" :label="item.name"  :value="item.id"/>
					</el-select>
					<el-select v-model="formData.district_id" value-key="id" clearable class="w-[200px] ml-3"  ref="districtRef">
						<el-option :label="t('districtPlaceholder')" :value="0"/>
						<el-option v-for="(item, index) in areaList.district " :key="index" :label="item.name"  :value="item.id"/>
					</el-select>
				</el-form-item>
                
                
                
                <el-form-item :label="t('status')">
                    <el-radio-group v-model="formData.status">
                        <el-radio label="0">{{ t('status0') }}</el-radio>
                        <el-radio label="1">{{ t('status1') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="t('agentLevel')" >
                    <el-radio-group v-model="formData.agent_level">
                        <el-radio label="1">{{ t('agentLevel1') }}</el-radio>
                        <el-radio label="2">{{ t('agentLevel2') }}</el-radio>
                        <el-radio label="3">{{ t('agentLevel3') }}</el-radio>
                        <el-radio label="4">{{ t('agentLevel4') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <!-- <el-form-item :label="t('rate')" >
                    <el-input v-model="formData.rate" clearable :placeholder="t('ratePlaceholder')" class="input-width" />
                </el-form-item> -->
                
            </el-form>
        </el-card>
         <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(formRef)">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('cancel') }}</el-button>
            </div>
        </div>

        <member-of-select-popup :title="t('memberSelectPricePopupTitle')" ref="memberOfSelectPopupRef" @load="selectMemberCallbackFn" />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import type { FormInstance } from 'element-plus'
import { getAgentInfo,addAgent,editAgent } from '@/addon/ly_area/api/agent';
import { getShopAddressInfo, addShopAddress, editShopAddress } from '@/addon/shop/api/shop_address'
import { getMap, getAreaListByPid, getAreaByCode } from '@/app/api/sys'
import memberOfSelectPopup from '@/addon/ly_area/views/components/member-of-select-popup.vue'
import { useRoute } from 'vue-router'
import { NULL } from 'sass';

const route = useRoute()
const id:number = parseInt(route.query.id as string);
const loading = ref(false)
const pageName = route.meta.title

interface areaType{
    province: any[],
    city: any[],
    district: any[],
    street: any[]
}
const areaList = reactive<areaType>({
    province: [],
    city: [],
    district: [],
    street: []
})
const provinceRef = ref()
const cityRef = ref()
const districtRef = ref()
const streetRef = ref()

/**
 * 获取省
 */
 getAreaListByPid(0).then(res => {
    areaList.province = res.data
})

let mapKey: string = ''
onMounted(() => {
    const mapScript = document.createElement('script')
    getMap().then(res => {
        mapKey = res.data.key
        mapScript.type = 'text/javascript'
        mapScript.src = 'https://map.qq.com/api/gljs?libraries=tools,service&v=1.exp&key=' + res.data.key
        document.body.appendChild(mapScript)
    })
    // mapScript.onload = () => {
    //     setTimeout(() => {
    //         initMap()
    //     }, 500)
    // }
})

const storeArea = reactive({
    province_id: 0,
    city_id: 0,
    district_id: 0,
    street_id: 0
})



/**
 * 表单数据
 */
const initialFormData = reactive<Record<string, string | boolean | Array<string> >>({
    agent_id: '0',
    member_id: '',
    member_name: '',
    level_id: '',
    province_id: '',
    city_id: '',
    district_id: '',
    street_id: '',
    address: '',
    full_area: '',
    status: '',
    agent_level: '',
    rate: '',
})
const formData: Record<string, any> = reactive({ ...initialFormData })

const setFormData = async (id:number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getAgentInfo(id)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    // 判断 agent_level 的值，并设置对应的单选按钮选中状态
    if (data.agent_level) {
        formData.agent_level = data.agent_level.toString();
    }
    if(data.status){
        formData.status = data.status.toString();
    }
}
if(id) setFormData(id);

const formRef = ref<FormInstance>()
// 选中数据
const selectData = ref<any[]>([])

    
// 表单验证规则
/**
 * 获取市
 */
 watch(() => formData.province_id, (nval) => {
    if (nval) {
        getAreaListByPid(formData.province_id).then(res => {
            areaList.city = res.data

            const cityId = formData.city_id
            if (cityId) {
                let isExist = false
                for (let i = 0; i < res.data.length; i++) {
                    if (cityId == res.data[i].id) {
                        isExist = true
                        break
                    }
                }
                if (isExist) {
                    formData.city_id = cityId
                    return
                }
            }
            formData.city_id = 0
            areaChange()
        })
    } else {
        formData.city_id = 0
    }
})

/**
* 获取区
 */
watch(() => formData.city_id, (nval) => {
    if (nval) {
        getAreaListByPid(formData.city_id).then(res => {
            areaList.district = res.data

            const districtId = formData.district_id
            if (districtId) {
                let isExist = false
                for (let i = 0; i < res.data.length; i++) {
                    if (districtId == res.data[i].id) {
                        isExist = true
                        break
                    }
                }
                if (isExist) {
                    formData.district_id = districtId
                    return
                }
            }
            areaChange()
            formData.district_id = 0
        })
    } else {
        formData.district_id = 0
    }
})

watch(() => formData.district_id, (nval) => {
    if (nval) {
        areaChange()
    }
})

const areaChange = () => {
    setTimeout(() => {
        const address = [
            formData.province_id ? provinceRef.value.selectedLabel : '',
            formData.city_id ? cityRef.value.selectedLabel : '',
            formData.district_id ? districtRef.value.selectedLabel : ''
        ]

        // addressToLatLng({ mapKey, address: address.join('') }).then(({ message, result }) => {
        //     if (message == 'query ok') {
        //         const latLng = new (window as any).TMap.LatLng(result.location.lat, result.location.lng)
        //         map.setCenter(latLng)
        //         marker.updateGeometries({
        //             id: 'center',
        //             position: latLng
        //         })
        //     }
        // })
    }, 500)
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
    formData.member_name = row.nickname || row.username
    formRef.value?.validateField('member_id')
}
const clearaMember=()=>{
    formData.member_id = null
    formData.member_name = ''
}

const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
       if (valid) {
           loading.value = true
        //    let data = formData
           
           const data = formData
            const address = [
                data.province_id ? provinceRef.value.selectedLabel : '',
                data.city_id ? cityRef.value.selectedLabel : '',
                data.district_id ? districtRef.value.selectedLabel : '',
            ]
            data.full_area = address.join('')

           const save = id ? editAgent : addAgent

           save(data).then(res => {
               loading.value = false
               history.back()
           }).catch(err => {
               loading.value = false
           })

       }
    })
}

// 验证手机号格式
const mobileVerify = (rule: any, value: any, callback: any) => {
    if (value && !/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error(t('generateMobile')))
    } else {
        callback()
    }
}

// 验证身份证号
const idCardVerify = (rule: any, value: any, callback: any) => {
    if (value && !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
        callback(new Error(t('generateIdCard')))
    } else {
        callback()
    }
}

// 验证邮箱号
const emailVerify = (rule: any, value: any, callback: any) => {
    if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        callback(new Error(t('generateEmail')))
    } else {
        callback()
    }
}


// 验证请输入整数
const numberVerify = (rule: any, value: any, callback: any) => {
    if (!Number.isInteger(value)) {
        callback(new Error(t('generateNumber')))
    } else {
        callback()
    }
}
const back = () => {
    history.back()
}
</script>

<style lang="scss" scoped></style>