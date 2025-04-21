<template>
    <div class="main-container bg-[#fff]">
      <div class="flex ml-[18px] justify-between items-center pt-[20px] mb-[5px]">
        <span class="text-page-title">{{ pageName }}</span>
      </div>
      <el-form :model="formData" label-width="150px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
        <el-card class="box-card !border-none" shadow="never">
          <el-form-item :label="t('reserveTime')">
            <el-checkbox-group v-model="formData.week">
              <el-checkbox :label="'1'">{{ t('monday') }}</el-checkbox>
              <el-checkbox :label="'2'">{{ t('tuesday') }}</el-checkbox>
              <el-checkbox :label="'3'">{{ t('wednesday') }}</el-checkbox>
              <el-checkbox :label="'4'">{{ t('thursday') }}</el-checkbox>
              <el-checkbox :label="'5'">{{ t('friday') }}</el-checkbox>
              <el-checkbox :label="'6'">{{ t('saturday') }}</el-checkbox>
              <el-checkbox :label="'7'">{{ t('sunday') }}</el-checkbox>
              <br />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <div class="demo-time-range">
              <el-time-select v-model="formData.start" class="mr-4" :placeholder="t('startTime')" start="00:00" step="00:15" end="23:30" />-
              <el-time-select v-model="formData.end" :placeholder="t('endTime')" start="00:15" step="00:15" end="23:45" />
            </div>
          </el-form-item>

          <el-form-item :label="t('reserveTimeInterval')">
            <el-radio-group v-model="formData.interval">
              <el-radio :label="30">30{{ t("minute") }}</el-radio>
              <el-radio :label="60">1{{ t("hour") }}</el-radio>
              <el-radio :label="90">90{{ t("minute") }}</el-radio>
              <el-radio :label="120">2{{ t("hour") }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="t('reserveEarly')">
            <el-input class="input-width" v-model.trim="formData.advance" @keyup="filterNumber($event)">
              <template #append>{{ t("hour") }}</template>
            </el-input>
          </el-form-item>
        </el-card>
      </el-form>
      <div class="fixed-footer-wrap">
        <div class="fixed-footer">
          <el-button type="primary" :loading="loading" @click="onSave(formRef)">{{ t("save") }}</el-button>
        </div>
      </div>
    </div>
  </template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { setReserveConfig, getReserveConfig } from '@/addon/o2o/api/reserve'
import { FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
import { filterNumber } from '@/utils/common'
import { cloneDeep } from 'lodash-es'

const route = useRoute()
const pageName = route.meta.title
const loading = ref(false)

const formData = reactive<Record<string, string | Array>>({
    week: [],
    start: '',
    end: '',
    interval: '',
    advance: ''
})

const getFormData = async () => {
    loading.value = true
    const data = await (await getReserveConfig()).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
        if (data[key] != undefined && key == 'start') formData[key] = timestampTransition(data[key])
        if (data[key] != undefined && key == 'end') formData[key] = timestampTransition(data[key])
    })
    loading.value = false
}
getFormData()

const formRef = ref<FormInstance>()
const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            const data = cloneDeep(formData)
            data.week = data.week.join(',')
            data.start = timeTransition(data.start)
            data.end = timeTransition(data.end)
            if (data.start > data.end) {
                const num = data.start
                data.start = data.end
                data.end = num
            }
            setReserveConfig(data).then(res => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
const timeTransition = (time:any) => {
    const arr = time.split(':')
    const num = arr[0] * 60 * 60 + arr[1] * 60
    return num
}

const timestampTransition = (timeStamp:any) => {
    let hour = Math.floor(timeStamp / (60 * 60))
    let minute = Math.floor(timeStamp / 60) - (hour * 60)
    hour = hour < 10 ? ('0' + hour) : hour
    minute = minute < 10 ? ('0' + minute) : minute

    return hour + ':' + minute
}

</script>

<style lang="scss" scoped></style>
