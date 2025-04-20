<template>
    <div>
      <el-dialog v-model="showDialog" :title="prop.title" width="800px" :close-on-press-escape="false" :destroy-on-close="true" :close-on-click-modal="false">
        <el-form :inline="true" :model="goodsTable.searchParam" ref="searchFormRef">
          <el-form-item :label="t('memberInfo')">
            <el-input v-model="goodsTable.searchParam.search" :placeholder="t('memberNamePlaceholder')" maxlength="60" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getMemberListFn()">{{ t('search') }}</el-button>
            <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
          </el-form-item>
        </el-form>
  
        <el-table :data="goodsTable.data" size="large" v-loading="goodsTable.loading" max-height="400" @selection-change="handleSelectionChange">
          <template #empty>
            <span>{{ !goodsTable.loading ? t('emptyData') : '' }}</span>
          </template>
          <el-table-column v-if="prop.max > 1" type="selection" width="55" />
          <el-table-column prop="nickname" :show-overflow-tooltip="true" :label="t('memberInfo')" min-width="170">
            <template #default="{ row }">
              <div class="flex items-center">
                <img class="w-[50px] h-[50px] mr-[10px]" v-if="row.headimg" :src="img(row.headimg)" alt="" />
                <img class="w-[50px] h-[50px] mr-[10px]" v-else src="@/app/assets/images/default_headimg.png" alt="" />
                <div class="flex flex flex-col">
                  <span>{{ row.nickname || row.username || '' }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" :label="t('mobile')" min-width="120">
            <template #default="{ row }">
              {{ row.mobile }}
            </template>
          </el-table-column>
          <el-table-column v-if="prop.max == 1" :label="t('operation')" fixed="right" align="right">
            <template #default="{ row }">
              <el-button type="primary" @click="rowSave(row)">{{ t('select') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="mt-[16px] flex justify-end">
          <el-pagination v-model:current-page="goodsTable.page" v-model:page-size="goodsTable.limit" layout="total, sizes, prev, pager, next, jumper" :total="goodsTable.total" @size-change="getMemberListFn()" @current-change="getMemberListFn" />
        </div>
  
        <template #footer>
          <span class="dialog-footer" v-if="prop.max > 1">
            <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
            <el-button type="primary" @click="save">{{ t('confirm') }}</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { t } from '@/lang'
  import { ref, reactive } from 'vue'
  import { img } from '@/utils/common'
  import { cloneDeep } from 'lodash-es'
  import { ElMessage, FormInstance } from 'element-plus'
  import { getMemberListOfSelect } from '@/addon/ly_shareholder/api/shareholder'
  const prop = defineProps({
    title: {
      type: String,
      default: '',
    },
    max: {
      type: Number,
      default: 1,
    },
  })
  
  const showDialog = ref(false)
  const emit = defineEmits(['load'])
  const goodsTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
      search: '',
    },
  })
  
  /**
   * 获取会员列表
   */
  const getMemberListFn = (page: number = 1) => {
    goodsTable.loading = true
    goodsTable.page = page
    const searchData = cloneDeep(goodsTable.searchParam)
    getMemberListOfSelect({
      page: goodsTable.page,
      limit: goodsTable.limit,
      ...searchData,
    })
      .then((res) => {
        goodsTable.loading = false
        goodsTable.data = res.data.data
        goodsTable.total = res.data.total
      })
      .catch((err) => {
        console.log(err)
        goodsTable.loading = false
      })
  }
  
  let searchFormRef = ref<FormInstance>()
  // 重置搜索条件
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    goodsTable.searchParam.search = ''
    getMemberListFn()
  }
  
  let selectMemberData = ref<Array<any>>([])
  // 选择会员列表
  const handleSelectionChange = (data: Array<any>) => {
    selectMemberData.value = data
  }
  
  const show = (data: any) => {
    getMemberListFn()
    showDialog.value = true
  }
  
  const save = () => {
    if (selectMemberData.value.length > prop.max) {
      ElMessage.error(`最多选择${prop.max}个会员`)
      return
    }
    emit('load', selectMemberData.value)
    showDialog.value = false
  }
  const rowSave = (row: any) => {
    emit('load', row)
    showDialog.value = false
  }
  defineExpose({
    showDialog,
    show,
  })
  </script>
  
  <style lang="scss" scoped></style>
  