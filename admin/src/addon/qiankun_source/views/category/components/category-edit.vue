<template>
  <el-dialog v-model="showDialog" :title="formData.id ? t('updateCategory') : t('addCategory')" width="50%" class="diy-dialog-wrap" :destroy-on-close="true">
    <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
      <el-form-item :label="t('title')">
        <el-input v-model="formData.title" clearable :placeholder="t('titlePlaceholder')" class="input-width"/>
      </el-form-item>

      <el-form-item :label="t('icon')">
        <upload-image v-model="formData.icon"/>
      </el-form-item>

      <el-form-item :label="t('sort')">
        <el-input v-model="formData.sort" clearable :placeholder="t('sortPlaceholder')" class="input-width"/>
      </el-form-item>

      <el-form-item :label="t('status')">
        <el-radio-group v-model="formData.status" :placeholder="t('statusPlaceholder')">
          <el-radio :label="1">{{ t('status1') }}</el-radio>
          <el-radio :label="0">{{ t('status0') }}</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>

    <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{
                    t('confirm')
                  }}</el-button>
            </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {ref, reactive, computed, watch} from 'vue'
import {t} from '@/lang'
import type {FormInstance} from 'element-plus'
import {addCategory, editCategory, getCategoryInfo} from '@/addon/qiankun_source/api/category'

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
  id: '',
  title: '',
  icon: '',
  sort: 100,
  status: 1,
}
const formData: Record<string, any> = reactive({...initialFormData})

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
  return {
    title: [
      {required: true, message: t('titlePlaceholder'), trigger: 'blur'},

    ]
    ,
    icon: [
      {required: true, message: t('iconPlaceholder'), trigger: 'blur'},

    ]
    ,
    sort: [
      {required: true, message: t('sortPlaceholder'), trigger: 'blur'},

    ]
    ,
    status: [
      {required: true, message: t('statusPlaceholder'), trigger: 'blur'},

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
  let save = formData.id ? editCategory : addCategory

  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true

      let data = formData

      save(data).then(res => {
        loading.value = false
        showDialog.value = false
        emit('complete')
      }).catch(err => {
        loading.value = false
      })
    }
  })
}

// 获取字典数据


const setFormData = async (row: any = null) => {
  Object.assign(formData, initialFormData)
  loading.value = true
  if (row) {
    const data = await (await getCategoryInfo(row.id)).data
    if (data) Object.keys(formData).forEach((key: string) => {
      if (data[key] != undefined) formData[key] = data[key]
    })
  }
  loading.value = false
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

defineExpose({
  showDialog,
  setFormData
})
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.diy-dialog-wrap .el-form-item__label {
  height: auto !important;
}
</style>
