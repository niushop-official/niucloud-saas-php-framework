<template>
    <el-dialog v-model="dialogMemberVisible" title="添加地址"  width="850px">
        <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form">

            <el-form-item label="收货人" prop="name">
                <el-input v-model.trim="formData.name" clearable placeholder="请输入收货人" class="input-width" maxlength="10" />
            </el-form-item>

            <el-form-item label="联系电话" prop="mobile">
                <el-input v-model.trim="formData.mobile" clearable placeholder="请输入联系电话" class="input-width" @keyup="filterNumber($event)" @blur="formData.mobile = $event.target.value"/>
            </el-form-item>

            <el-form-item label="地址" prop="address_area">
                <el-select v-model="formData.province_id" value-key="id" clearable class="w-[200px]" ref="provinceRef">
                    <el-option :label="t('provincePlaceholder')" :value="0"/>
                    <el-option v-for="(item, index) in areaList.province" :key="index" :label="item.name" :value="item.id"/>
                </el-select>
                <el-select v-model="formData.city_id" value-key="id" clearable class="w-[200px] ml-3" ref="cityRef">
                    <el-option :label="t('cityPlaceholder')" :value="0"/>
                    <el-option v-for="(item, index) in areaList.city " :key="index" :label="item.name" :value="item.id"/>
                </el-select>
                <el-select v-model="formData.district_id" value-key="id" clearable class="w-[200px] ml-3" ref="districtRef">
                    <el-option :label="t('districtPlaceholder')" :value="0"/>
                    <el-option v-for="(item, index) in areaList.district " :key="index" :label="item.name" :value="item.id"/>
                </el-select>
            </el-form-item>

            <el-form-item prop="address" label="详细地址">
                <el-input v-model.trim="formData.address" clearable placeholder="请输入详细地址"  class="input-width" maxlength="120"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogMemberVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmFn(formRef)">保存</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { t } from '@/lang'
import { getAreaListByPid } from '@/app/api/sys'
import { addMemberAddress } from '@/app/api/member'
import { filterNumber } from '@/utils/common'
import type { FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'

const dialogMemberVisible = ref(false)
const areaList = reactive({
    province: [],
    city: [],
    district: []
})
const provinceRef = ref()
const cityRef = ref()
const districtRef = ref()
let confirmRepeat = false

/**
* 表单数据
*/
const initialFormData = {
    member_id: 0,
    name: '',
    mobile: '',
    province_id: 0,
    province_name: '',
    city_id: 0,
    city_name: '',
    district_id: 0,
    district_name: '',
    address: '',
    full_address: ''
}

const formData: Record<string, any> = reactive({ ...initialFormData })

const open = (id:any) => {
    Object.assign(formData, initialFormData)
    formData.member_id = id
    confirmRepeat = false
    dialogMemberVisible.value = true
}

/**
 * 获取省
 */
getAreaListByPid(0).then(res => {
    areaList.province = res.data
})

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
            formData.district_id = 0
        })
    } else {
        formData.district_id = 0
    }
})

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        name: [
            { required: true, message: "请输入收货人", trigger: 'blur' }
        ],
        mobile: [
            { required: true, message: "请输入联系电话", trigger: 'blur' },
            {
                trigger: 'blur',
                validator: (rule: any, value: any, callback: any) => {
                    if (value && !/^1[3-9]\d{9}$/.test(value)) {
                        callback(new Error('请输入正确的联系电话'))
                    }
                    callback()
                }
            }
        ],
        address_area: [
            {
                required: true,
                validator: (rule: any, value: any, callback: any) => {
                    if (!formData.province_id) {
                        callback(new Error(t('请选择省')))
                    }
                    if (!formData.city_id) {
                        callback(new Error(t('请选择市')))
                    }
                    if (areaList.district.length && !formData.district_id) {
                        callback(new Error(t('请选择区/县')))
                    }
                    callback()
                },
                trigger: 'blur'
            }
        ],
        address: [
            { required: true, message: t('addressPlaceholder'), trigger: 'blur' }
        ]
    }
})

const confirmFn = async (formEl: FormInstance | undefined) => {
    if (confirmRepeat || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            confirmRepeat = true

            const data = cloneDeep(formData)
            const address = [
                data.province_id ? (provinceRef.value.selectedLabel|| provinceRef.value.currentPlaceholder) : '',
                data.city_id ? (cityRef.value.selectedLabel|| cityRef.value.currentPlaceholder) : '',
                data.district_id ? (districtRef.value.selectedLabel|| districtRef.value.currentPlaceholder) : '',
                data.address
            ]
            data.full_address = address.join('')

            addMemberAddress(data).then(res => {
                dialogMemberVisible.value = false
                confirmRepeat = false
                emit('confirm')
            }).catch(() => {
                confirmRepeat = false
            })
        }
    })
}

const emit = defineEmits(['confirm'])
defineExpose({
    dialogMemberVisible,
    open
})
</script>

<style lang="scss" scoped>

</style>
