<template>
  <el-dialog v-model="showDialog" :title="formData.id ? t('updateTechnician') : t('addTechnician')" width="500px" :destroy-on-close="true">
    <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
      <el-form-item :label="t('name')" prop="name">
        <el-input maxlength="20" show-word-limit v-model.trim="formData.name" clearable :placeholder="t('namePlaceholder')" class="input-width" />
      </el-form-item>
      <el-form-item :label="t('headimg')">
        <upload-image v-model="formData.headimg" />
      </el-form-item>
      <el-form-item :label="t('mobile')" prop="mobile">
        <el-input v-model.trim="formData.mobile" clearable maxlength="11" :placeholder="t('mobilePlaceholder')" class="input-width" />
      </el-form-item>
      <el-form-item :label="t('seniority')" prop="">
        <el-input v-model="formData.seniority" clearable :placeholder="t('seniorityPlaceholder')" class="input-width" @keyup="filterNumber($event)" maxlength="2">
          <template #append>{{ t('year') }}</template>
        </el-input>
      </el-form-item>
      <el-form-item :label="t('number')" prop="">
        <el-input v-model="formData.number" clearable :placeholder="t('numberPlaceholder')" class="input-width" @keyup="filterNumber($event)" />
      </el-form-item>
      <el-form-item :label="t('position')" prop="">
        <el-input v-model="formData.position" clearable :placeholder="t('positionPlaceholder')" class="input-width" />
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
  import { ref, reactive, computed } from 'vue'
  import { t } from '@/lang'
  import type { FormInstance } from 'element-plus'
  import { addTechnician, editTechnician } from '@/addon/vipcard/api/vipcard'
  import { filterNumber } from '@/utils/common'

  const showDialog = ref(false)
  const loading = ref(false)

  /**
   * 表单数据
   */
  const initialFormData = {
    id: '',
    name: '',
    mobile: '',
    seniority: '0',
    number: '',
    position: '',
    headimg: ''
  }
  const formData: Record<string, any> = reactive({ ...initialFormData })

  const formRef = ref<FormInstance>()

  // 表单验证规则
  const formRules = computed(() => {
    return {
      name: [{ required: true, message: t('namePlaceholder'), trigger: 'blur' }],
      mobile: [
        { required: true, message: t('mobilePlaceholder'), trigger: 'blur' },
        {
          trigger: 'blur',
          validator: (rule: any, value: any, callback: any) => {
            if (value && !/^1[3-9]\d{9}$/.test(value)) {
              callback(new Error(t('mobileNumberFormatTips')))
            }
            callback()
          }
        }
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
    const save = formData.id ? editTechnician : addTechnician

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

  const setFormData = async (row: any = null) => {
    Object.assign(formData, initialFormData)
    if (row) {
      if (row) {
        Object.keys(formData).forEach((key: string) => {
          if (row[key] != undefined) formData[key] = row[key]
        })
      }
    }
    loading.value = false
  }

  defineExpose({
    showDialog,
    setFormData
  })
</script>

<style lang="scss" scoped></style>
