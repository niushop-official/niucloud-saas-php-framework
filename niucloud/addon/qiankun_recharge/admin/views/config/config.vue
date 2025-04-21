<template>
  <el-card>
    <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
      <el-form-item :label="t('open')">
        <el-radio-group v-model="formData.open" :placeholder="t('openPlaceholder')">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="t('minRecharge')">
        <el-input v-model="formData.min_recharge" clearable :placeholder="t('minRechargePlaceholder')" class="input-width"/>
      </el-form-item>

      <el-form-item :label="t('rechargeDesc')">
        <el-input type="textarea" rows="5" v-model="formData.recharge_desc" clearable :placeholder="t('rechargeDescPlaceholder')" class="input-width"/>
      </el-form-item>

    </el-form>

    <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{
                    t('confirm')
                  }}</el-button>
            </span>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import {computed, reactive, ref} from 'vue'
import {t} from '@/lang'
import type {FormInstance} from 'element-plus'
import {addConfig, getConfigInfo} from '@/addon/qiankun_recharge/api/config'

const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
  open: 0,
  min_recharge: '',
  recharge_desc: '',
}
const formData: Record<string, any> = reactive({...initialFormData})

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
  return {
    open: [
      {required: true, message: t('openPlaceholder'), trigger: 'blur'},

    ]
    ,
    min_recharge: [
      {required: true, message: t('minRechargePlaceholder'), trigger: 'blur'},

    ]
    ,
    recharge_desc: [
      {required: true, message: t('rechargeDescPlaceholder'), trigger: 'blur'},

    ]

  }
})

const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
  if (loading.value || !formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true

      addConfig(formData).then(() => {
        loading.value = false
        emit('complete')
      }).catch((err) => {
        console.log(err)
        loading.value = false
      })
    }
  })
}

const setFormData = async (row: any = null) => {
  Object.assign(formData, initialFormData)
  loading.value = true
  if (row) {
    const data = await (await getConfigInfo(row.id)).data
    if (data) Object.keys(formData).forEach((key: string) => {
      if (data[key] != undefined) formData[key] = data[key]
    })
  }
  loading.value = false
}

defineExpose({
  setFormData
})

getConfigInfo().then(res => {
  setFormData(res.data)
})
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.diy-dialog-wrap .el-form-item__label {
  height: auto !important;
}
</style>
