<template>
  <el-card>
    <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
      <el-form-item :label="t('status')">
        <el-radio-group v-model="formData.open">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>

      <view v-if="formData.open">
        <el-form-item :label="t('rule')+(index+1)" v-for="(item, index) in formData.rules" :key="index">
          <view class="flex flex-1">
            <el-input v-model="item.commission" clearable :placeholder="t('currentCommission')">
              <template #append>%</template>
            </el-input>
            <view class="cursor-pointer text-danger ml-[10px] w-[50px]" @click="del(index)">删除</view>
          </view>
        </el-form-item>
        <el-form-item :label="t('after')">
          <view class="flex flex-1">
            <el-input v-model="formData.after" clearable :placeholder="t('currentCommission')">
              <template #append>%</template>
            </el-input>
            <view class="cursor-pointer text-danger ml-[10px] w-[50px]"></view>
          </view>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addOne">添加规则</el-button>
        </el-form-item>
      </view>
    </el-form>

    <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">提交</el-button>
            </span>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import {computed, reactive, ref} from 'vue'
import {t} from '@/lang'
import type {FormInstance} from 'element-plus'
import {addConfig, getConfigInfo} from '@/addon/qiankun_recovery/api/config'

const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
  open: 0,
  after: '',
  rules: [] as { commission: number }[],
}
const formData: Record<string, any> = reactive({...initialFormData})

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
  return {
    open: [
      {required: true, message: t('openPlaceholder'), trigger: 'blur'},

    ]
  }
})

const emit = defineEmits(['complete'])

const addOne = () => {
  formData.rules.push({
    commission: '',
  })
}

const del = (index: number) => {
  formData.rules.splice(index, 1)
}

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
