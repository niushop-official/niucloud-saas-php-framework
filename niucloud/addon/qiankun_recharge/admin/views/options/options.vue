<template>
  <div class="main-container">
    <el-card class="box-card !border-none" shadow="never">

      <div class="flex justify-between items-center">
        <span class="text-lg">{{ pageName }}</span>
        <el-button type="primary" @click="addEvent">
          {{ t('addOptions') }}
        </el-button>
      </div>

      <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
        <el-form :inline="true" :model="optionsTable.searchParam" ref="searchFormRef">
          <el-form-item :label="t('title')" prop="title">
            <el-input v-model="optionsTable.searchParam.title" :placeholder="t('titlePlaceholder')"/>
          </el-form-item>

          <el-form-item :label="t('giveLevel')" prop="give_level">
            <el-select class="w-[280px]" v-model="optionsTable.searchParam.give_level" clearable :placeholder="t('giveLevelPlaceholder')">
              <el-option
                  v-for="(item, index) in giveLevelList"
                  :key="index"
                  :label="item['level_name']"
                  :value="item['level_id']"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('status')" prop="status">
            <el-select class="" v-model="optionsTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
              <el-option :label="t('all')" value=""></el-option>
              <el-option :label="t('status0')" :value="0"></el-option>
              <el-option :label="t('status1')" :value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="loadOptionsList()">{{ t('search') }}</el-button>
            <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <div class="mt-[10px]">
        <el-table :data="optionsTable.data" size="large" v-loading="optionsTable.loading">
          <template #empty>
            <span>{{ !optionsTable.loading ? t('emptyData') : '' }}</span>
          </template>
          <el-table-column prop="title" :label="t('title')" min-width="120" :show-overflow-tooltip="true"/>
          <el-table-column prop="recharge" :label="t('recharge')" min-width="120" :show-overflow-tooltip="true"/>
          <el-table-column prop="give_price" :label="t('givePrice')" min-width="120" :show-overflow-tooltip="true"/>
          <el-table-column prop="give_integral" :label="t('giveIntegral')" min-width="120" :show-overflow-tooltip="true"/>
          <el-table-column prop="give_coupon_name" :label="t('giveCoupon')" min-width="180" :show-overflow-tooltip="true"/>
          <el-table-column prop="give_level_name" :label="t('giveLevel')" min-width="120" :show-overflow-tooltip="true"/>
          <el-table-column prop="status" :label="t('status')" min-width="120" :show-overflow-tooltip="true"/>
          <el-table-column prop="sort" :label="t('sort')" min-width="120" :show-overflow-tooltip="true"/>
          <el-table-column :label="t('operation')" fixed="right" min-width="120">
            <template #default="{ row }">
              <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
              <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
            </template>
          </el-table-column>

        </el-table>
        <div class="mt-[16px] flex justify-end">
          <el-pagination v-model:current-page="optionsTable.page" v-model:page-size="optionsTable.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="optionsTable.total"
                         @size-change="loadOptionsList()" @current-change="loadOptionsList"/>
        </div>
      </div>

      <edit ref="editOptionsDialog" @complete="loadOptionsList"/>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getOptionsList, deleteOptions, getWithCouponList, getWithMemberLevelList } from '@/addon/qiankun_recharge/api/options'
import { img } from '@/utils/common'
import { ElMessageBox, FormInstance } from 'element-plus'
import Edit from '@/addon/qiankun_recharge/views/options/components/options-edit.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

let optionsTable = reactive({
  page: 1,
  limit: 10,
  total: 0,
  loading: true,
  data: [],
  searchParam: {
    'title': '',
    'give_level': '',
    'status': ''
  }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据

/**
 * 获取充值项列列表
 */
const loadOptionsList = (page: number = 1) => {
  optionsTable.loading = true
  optionsTable.page = page

  getOptionsList({
    page: optionsTable.page,
    limit: optionsTable.limit,
    ...optionsTable.searchParam
  }).then(res => {
    optionsTable.loading = false
    optionsTable.data = res.data.data
    optionsTable.total = res.data.total
  }).catch(() => {
    optionsTable.loading = false
  })
}
loadOptionsList()

const editOptionsDialog: Record<string, any> | null = ref(null)

/**
 * 添加充值项列
 */
const addEvent = () => {
  editOptionsDialog.value.setFormData()
  editOptionsDialog.value.showDialog = true
}

/**
 * 编辑充值项列
 * @param data
 */
const editEvent = (data: any) => {
  editOptionsDialog.value.setFormData(data)
  editOptionsDialog.value.showDialog = true
}

/**
 * 删除充值项列
 */
const deleteEvent = (id: number) => {
  ElMessageBox.confirm(t('optionsDeleteTips'), t('warning'),
      {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning',
      }
  ).then(() => {
    deleteOptions(id).then(() => {
      loadOptionsList()
    }).catch(() => {
    })
  })
}

const giveCouponList = ref([])
const setGiveCouponList = async () => {
  giveCouponList.value = await (await getWithCouponList({})).data
}
setGiveCouponList()
const giveLevelList = ref([])
const setGiveLevelList = async () => {
  giveLevelList.value = await (await getWithMemberLevelList({})).data
}
setGiveLevelList()

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  loadOptionsList()
}
</script>

<style lang="scss" scoped>
/* 多行超出隐藏 */
.multi-hidden {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
