<template>
  <el-dialog v-model="showDialog" :title="formData.reserve_id ? t('updateReserve') : t('addReserve')" width="500px" :destroy-on-close="true">
    <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
      <el-form-item :label="t('phone')" prop="mobile" v-if="!formData.reserve_id">
        <el-input v-model="formData.mobile" :placeholder="t('phonePlaceholder')" class="input-width">
          <template #append>
            <span class="iconfont iconsousuo text-[#a3a6ab] cursor-pointer" @click="getMemberInfoFn(formData.mobile)"></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="t('client')" prop="reserve_name">
        <el-input v-model="formData.reserve_name" disabled class="input-width" />
      </el-form-item>
      <el-form-item :label="t('reserveItem')" prop="goods_id">
        <el-select v-model="formData.goods_id" class="input-width" :placeholder="t('reserveItemPlaceholder')">
          <el-option v-for="item in serviceList" :key="item.goods_id" :label="item.goods_name" :value="item.goods_id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('technician')" prop="technician_id">
        <el-select v-model="formData.technician_id" class="input-width" :placeholder="t('technicianPlaceholder')">
          <el-option v-for="item in technicianList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item :label="t('arrivalTime')" prop="reserve_date">
        <div class="input-width">
          <el-date-picker style="width: 50%" v-model="formData.select_date" type="date" value-format="YYYY-MM-DD" :disabled-date="disabledDate" @change="onDateChange" />
          <el-time-select style="width: 50%" :disabled="!formData.select_date" v-model="formData.select_time" :start="beginTime"  :step="timeInterval" :end="endTime" :min-time="startTime"/>
          <!-- <el-date-picker v-model="formData.reserve_date" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" :placeholder="t('arrivalTimePlaceholder')" /> -->
        </div>
      </el-form-item>

      <el-form-item :label="t('remark')">
        <el-input v-model="formData.remark" :rows="2" type="textarea" :placeholder="t('remarkPlaceholder')" class="input-width" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
        <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, computed } from 'vue'
import { t } from '@/lang'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { addReserve, editReserve, getMemberInfo, getServicePagesList, getTechnicianListTo, getReserveConfig } from '@/addon/vipcard/api/vipcard'

const showDialog = ref(false)
const loading = ref(false)

/**
   * 表单数据
   */
const initialFormData = {
    reserve_id: '',
    mobile: '',
    member_id: '',
    reserve_name: '',
    reserve_date: '',
    select_date: '',
    select_time: '',
    goods_id: '',
    remark: '',
    technician_id: ''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const state: Record<string, any> = reactive({
    xzcode: {
        week: []
    },
    beginTime: '',
    endTime: '',
    week: [],
    timeInterval: '',
    startTime: '00:00'
})
const { beginTime, endTime, timeInterval, startTime } = toRefs(state)
const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        member_id: [{ required: true, message: t('memberIdPlaceholder'), trigger: 'blur' }],
        reserve_date: [{ required: true, message: t('arrivalTimePlaceholder'), trigger: 'blur' }],
        goods_id: [{ required: true, message: t('reserveItemPlaceholder'), trigger: ['blur', 'change'] }],
        technician_id: [{ required: true, message: t('technicianPlaceholder'), trigger: ['blur', 'change'] }],
        reserve_name: [{ required: true, message: t('memberNamePlaceholder'), trigger: 'blur' }],
        mobile: [
            { required: true, message: t('phonePlaceholder'), trigger: ['blur', 'change'] },
            { validator: validateMobile, trigger: ['blur', 'change'] }
        ]
    }
})
// 自定义手机号验证函数
const validateMobile = (rule: any, value: string, callback: any) => {
    if (!value) {
        callback(new Error(t('phonePlaceholder')))
    } else if (!/^\d{11}$/.test(value)) {
        callback(new Error(t('phoneFormatError')))
    } else {
        callback()
    }
}
const setReserveConfigFn = () => {
    getReserveConfig().then((res) => {
        state.xzcode = res.data
        const beginTime = secondsToHM(state.xzcode.start)
        const endTime = secondsToHM(state.xzcode.end)
        state.beginTime = beginTime
        state.endTime = endTime
        const timeInterval = convertMinutesToHM(state.xzcode.interval)
        state.timeInterval = timeInterval
        const week = []

        state.xzcode.week.forEach((element) => {
            if (element == 7) {
                element = 0
            }
            week.push(Number(element))
        })

        state.week = week
    })
}

// 辅助函数：将分钟转换为 HH:mm 格式
const convertMinutesToHM = (minutes: number) => {
    const hours = Math.floor(minutes / 60) // 计算小时
    const mins = minutes % 60 // 计算剩余分钟
    // 格式化补零
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

const disabledDate = (time: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // 设置时间为当天的00:00:00
    return time < today
}

// 辅助函数：将分钟转换为 HH:mm:ss 格式
const secondsToHM = (seconds: any) => {
    const hours = Math.floor(seconds / 3600) // 计算小时
    const minutes = Math.floor((seconds % 3600) / 60) // 计算剩余分钟
    // 格式化补零
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

setReserveConfigFn()
const onDateChange = (date: string) => {
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // 设置时间为当天的00:00:00

    if (selectedDate.toDateString() === today.toDateString()) {
        state.startTime = new Date().toLocaleTimeString().slice(0, 5)
    } else {
        state.startTime = '00:00'
    }
}
const emit = defineEmits(['complete'])

// 通过搜索手机号来获取会员
const memberInfo = ref({})
const getMemberInfoFn = (mobile: any) => {
    // if (mobile.length < 11) {
    //   // '请输入正确的手机号'
    //   ElMessage.error('请输入正确的手机号')
    //   return
    // }
    getMemberInfo({
        mobile
    }).then((res) => {
        if (res.data.length == 0) {
            ElMessage.error('未找到该会员')
            return
        }
        memberInfo.value = Object.keys(res.data).length ? res.data : {}
        formData.member_id = memberInfo.value.member_id || ''
        formData.reserve_name = memberInfo.value.nickname || ''
    })
}

// 获取项目列表
const serviceList = ref([])
const getServicePagesListFn = () => {
    getServicePagesList({}).then((res) => {
        serviceList.value = res.data
    })
}

getServicePagesListFn()

/**
   * 确认
   * @param formEl
   */
const confirm = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    const save = formData.reserve_id ? editReserve : addReserve

    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true

            const data = formData
            save(data)
                .then((res) => {
                    loading.value = false
                    showDialog.value = false
                    emit('complete')
                })
                .catch(() => {
                    loading.value = false
                })
        }
    })
}

const technicianList = ref([])
const setFormData = async (row: any = null) => {
    technicianList.value = await (await getTechnicianListTo()).data
    Object.assign(formData, initialFormData)
    if (row) {
        Object.keys(formData).forEach((key: string) => {
            if (row[key] != undefined) formData[key] = row[key]
        })
        if (formData.reserve_date) {
            formData.select_date = formData.reserve_date.slice(0, 10)
            formData.select_time = formData.reserve_date.slice(11)
        }
    }
    // 如果 technician_id 为 0，则设置为空字符串
    if (formData.technician_id === 0) {
        formData.technician_id = ''
    }
    loading.value = false
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
