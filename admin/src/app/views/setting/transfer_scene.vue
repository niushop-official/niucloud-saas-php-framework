<template>
  <div class="main-container">
    <el-card class="box-card mt-[15px] !border-none" shadow="never" v-for="(item, key) in screne" :key="key">
      <div class="flex  items-center mb-[20px]">
        <h3 class="text-[14px] mr-[20px]">{{ item.name }}</h3>
        <div class="flex items-center">
          <span class="text-[14px] mr-[10px]">{{ t('transferSceneId') }}：</span>
          <div class="flex items-center">
            <el-input
                v-model.trim="item.scene_id"
                maxlength="5"
                minlength="4"
                class="!w-[60px]"
                :class="item.error ? '!border-red-500' : ''"
                :disabled="item.disabled"
                @blur="handleInput($event,key,item)"
                :ref="(el: any) =>{ if(el) inputRefs[key] = el }"
                v-show="!item.disabled"
            />
            <div v-show="item.disabled">{{ item.scene_id ? item.scene_id : '--' }}</div>
            <div @click="handleDisabled(item, key)" class="w-[40px] flex items-center ml-[8px]">
              <el-icon size="20" color="var(--el-color-primary)">
                <Edit/>
              </el-icon>
            </div>
            <span v-if="item.error" class="text-red-500 text-xs ml-2">场景值最少为4位</span>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between p-[10px] table-item-border bg">
          <span class="text-base w-[230px]">{{ t('transferType') }}</span>
          <span class="text-base w-[230px]">{{ t('recvPerception') }}</span>
          <span class="text-base w-[230px]">{{ t('reportInfos') }}</span>
          <span class="text-base w-[80px] text-center">{{ t('operation') }}</span>
        </div>
        <div v-if="Object.values(item.trade_scene_data).length">
          <div class="flex items-center justify-between p-[10px] table-item-border"
               v-for="(subItem, subKey) in item.trade_scene_data" :key="subKey">
            <div class="flex w-[230px] flex-shrink-0 text-base">{{ subItem.name }}</div>
            <div class="flex w-[230px] flex-shrink-0 text-base">{{ subItem.perception }}</div>
            <div class="w-[230px] flex-shrink-0 text-base">
              <div v-for="(childItem,childKey) in subItem.infos" :key="childKey">{{ childKey }}：{{ childItem }}</div>
            </div>
            <div class="flex items-center justify-center w-[80px] select-none">
              <button class="text-base text-primary" @click="configFn(item,subItem,subKey)">{{ t('deploy') }}</button>
            </div>
          </div>
        </div>
        <div v-else class="min-h-[80px] flex items-center justify-center text-base">
          {{ t('noData') }}
        </div>
      </div>
    </el-card>
    <el-dialog v-model="showDialog" :title="curData.name" width="550px" :destroy-on-close="true">
      <el-form :model="formData" label-width="110px" ref="formRef" class="page-form">
        <el-form-item :label="t('recvPerception')" prop="perception"
                      :rules="[{ required: true, message: t('recvPerceptionTips'), trigger: 'blur' }]">
          <el-select v-model="formData.perception" :placeholder="t('recvPerceptionTips')" clearable class="!w-[300px]">
            <el-option v-for="(item,index) in curData.user_recv_perception" :key="index" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <template v-for="(item, index) in curData.transfer_scene_report_infos" :key="index">
          <el-form-item :label="item" :prop="`infos[${item}]`"
                        :rules="[{ required: true, message: `请输入${item}`, trigger: 'blur' }]">
            <el-input v-model.trim="formData.infos[item]" maxlength="40" class="!w-[300px]"/>
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">{{ t('cancel') }}</el-button>
                    <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{
                        t('confirm')
                      }}</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, ref} from 'vue'
import {t} from '@/lang'
import {getTransferScene, setSceneId, setTradeScene} from '@/app/api/pay'
import {cloneDeep} from 'lodash-es'
import {FormInstance} from 'element-plus'

const screne = ref<any>({})
const loading = ref(false)
const getTransferSceneFn = () => {
  getTransferScene().then(res => {
    screne.value = res.data
    for (const key in screne.value) {
      screne.value[key].disabled = true
      screne.value[key].error = false
    }
  })
}
getTransferSceneFn()

// 更改场景值（最终修复版）
const handleInput = (e: any, key: any, data: any) => {
  const val = e.target.value?.trim() || ''
  const originalVal = originalValues.value[key] || ''

  // 有值 → 清空：必须提交接口置空
  if (val === '' && originalVal !== '') {
    data.error = false
    setSceneId({
      scene: key,
      scene_id: ''
    }).then(() => {
      data.disabled = true
      getTransferSceneFn()
    })
    return
  }

  // 本来就空：不提交
  if (val === '' && originalVal === '') {
    data.error = false
    data.disabled = true
    return
  }

  // 有值但长度不够：提示，不提交
  if (val.length < 4) {
    data.error = true
    return
  }

  // 合法 4-5 位：提交
  if (val.length >= 4 && val.length <= 5) {
    data.error = false
    setSceneId({
      scene: key,
      scene_id: val
    }).then(() => {
      data.disabled = true
      getTransferSceneFn()
    })
  }
}

const inputRefs = ref<any>({})
const originalValues = ref<any>({})
const handleDisabled = (data: any, key: any) => {
  originalValues.value[key] = data.scene_id
  data.disabled = false
  data.error = false
  nextTick(() => {
    inputRefs.value[key]?.focus()
  })
}

const showDialog = ref(false)
const curData = ref<any>({})
const formData = ref({
  type: '',
  scene: '',
  perception: '',
  infos: {}
})
const configFn = (data: any, subData: any, type: any) => {
  curData.value = cloneDeep(data)
  formData.value.type = type
  formData.value.scene = subData.scene
  formData.value.perception = subData.perception
  formData.value.infos = cloneDeep(subData.infos)
  showDialog.value = true
}
const formRef = ref<FormInstance>()

const confirm = async (formEl: FormInstance | undefined) => {
  if (loading.value || !formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      setTradeScene(formData.value).then(() => {
        loading.value = false
        showDialog.value = false
        getTransferSceneFn()
      }).catch(() => {
        loading.value = false
      })
    }
  })
}

const cancel = () => {
  showDialog.value = false
}
</script>

<style lang="scss" scoped>
.table-item-border {
  @apply border-b border-[var(--el-border-color)];
}
</style>