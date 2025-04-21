<template>
  <div class="main-container">
    <el-form class="page-form" :model="formData" :rules="formRules"  label-width="150px" ref="ruleFormRef" v-loading="loading">
      <el-card class="box-card !border-none" shadow="never">
        <h3 class="panel-title !text-sm">{{ t('commonSetting') }}</h3>
        <el-form-item :label="t('isPayNiuCloudShop')" prop="formData.is_shop">
          <el-switch v-model="formData.is_shop" :active-value="1" :inactive-value="0" @change="switchChange($event, 'is_shop')" />
          <div class="form-tip">{{ t('isPayNiuCloudShopTips') }}</div>
        </el-form-item>
      </el-card>
    </el-form>
    <div class="fixed-footer-wrap">
      <div class="fixed-footer">
        <el-button type="primary" @click="onSave(ruleFormRef)">{{ t('save') }}</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { t } from '@/lang'
import {getGamesSettings, setGamesSettings} from "@/addon/turntable/api/settings";
import { FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
import { cloneDeep } from 'lodash-es'

const route = useRoute()
const pageName = route.meta.title

const loading = ref(true)

const ruleFormRef = ref<FormInstance>()
const formData = reactive<Record<string, number | boolean>>({
  is_shop: 0
})

const switchChange = (val, key) => {
  formData[key] = val
}

const setFormData = async () => {
  const data = await (await getGamesSettings()).data
  Object.keys(formData).forEach((key: string) => {
    if (data[key] != undefined) formData[key] = Number(data[key])
  })
  loading.value = false
}
setFormData()

const onSave = async (formEl: FormInstance | undefined) => {
  if (loading.value || !formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      const save = cloneDeep(formData)
      Object.keys(save).forEach((key) => {
        save[key] = Number(save[key])
      })

      setGamesSettings(save).then(() => {
        loading.value = false
      }).catch(() => {
        loading.value = false
      })
    }
  })
}
</script>

<style lang="scss" scoped></style>