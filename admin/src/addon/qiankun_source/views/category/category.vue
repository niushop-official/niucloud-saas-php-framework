<template>
  <div class="main-container">
    <el-card class="box-card !border-none" shadow="never">

      <div class="flex justify-between items-center">
        <span class="text-lg">{{ pageName }}</span>
        <el-button type="primary" @click="addEvent">
          {{ t('addCategory') }}
        </el-button>
      </div>

      <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
        <el-form :inline="true" :model="categoryTable.searchParam" ref="searchFormRef">
          <el-form-item :label="t('title')" prop="title">
            <el-input v-model="categoryTable.searchParam.title" :placeholder="t('titlePlaceholder')"/>
          </el-form-item>
          <el-form-item :label="t('status')" prop="status">
            <el-select class="" v-model="categoryTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
              <el-option label="全部" value=""></el-option>
              <el-option :label="t('status1')" :value="1"></el-option>
              <el-option :label="t('status0')" :value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="loadCategoryList()">{{ t('search') }}</el-button>
            <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <div class="mt-[10px]">
        <el-table :data="categoryTable.data" size="large" v-loading="categoryTable.loading">
          <template #empty>
            <span>{{ !categoryTable.loading ? t('emptyData') : '' }}</span>
          </template>
          <el-table-column prop="title" :label="t('title')" min-width="120" :show-overflow-tooltip="true"/>

          <el-table-column :label="t('icon')" width="100" align="left">
            <template #default="{ row }">
              <el-avatar v-if="row.icon" :src="img(row.icon)"/>
              <el-avatar v-else icon="UserFilled"/>
            </template>
          </el-table-column>
          <el-table-column prop="sort" :label="t('sort')" min-width="120" :show-overflow-tooltip="true"/>

          <el-table-column prop="status" :label="t('status')" min-width="120" :show-overflow-tooltip="true">
            <template #default="{ row }">
              {{ row.status ? t('status1') : t('status0') }}
            </template>
          </el-table-column>

          <el-table-column :label="t('operation')" fixed="right" min-width="120">
            <template #default="{ row }">
              <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
              <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
            </template>
          </el-table-column>

        </el-table>
        <div class="mt-[16px] flex justify-end">
          <el-pagination v-model:current-page="categoryTable.page" v-model:page-size="categoryTable.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="categoryTable.total"
                         @size-change="loadCategoryList()" @current-change="loadCategoryList"/>
        </div>
      </div>

      <edit ref="editCategoryDialog" @complete="loadCategoryList"/>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref, watch} from 'vue'
import {t} from '@/lang'
import {useDictionary} from '@/app/api/dict'
import {getCategoryList, deleteCategory} from '@/addon/qiankun_source/api/category'
import {img} from '@/utils/common'
import {ElMessageBox, FormInstance} from 'element-plus'
import Edit from '@/addon/qiankun_source/views/category/components/category-edit.vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const pageName = route.meta.title;

let categoryTable = reactive({
  page: 1,
  limit: 10,
  total: 0,
  loading: true,
  data: [],
  searchParam: {
    "title": "",
    "sort": "",
    "status": "",
    "create_time": ""
  }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据


/**
 * 获取乾坤素材分类列表
 */
const loadCategoryList = (page: number = 1) => {
  categoryTable.loading = true
  categoryTable.page = page

  getCategoryList({
    page: categoryTable.page,
    limit: categoryTable.limit,
    ...categoryTable.searchParam
  }).then(res => {
    categoryTable.loading = false
    categoryTable.data = res.data.data
    categoryTable.total = res.data.total
  }).catch(() => {
    categoryTable.loading = false
  })
}
loadCategoryList()

const editCategoryDialog: Record<string, any> | null = ref(null)

/**
 * 添加乾坤素材分类
 */
const addEvent = () => {
  editCategoryDialog.value.setFormData()
  editCategoryDialog.value.showDialog = true
}

/**
 * 编辑乾坤素材分类
 * @param data
 */
const editEvent = (data: any) => {
  editCategoryDialog.value.setFormData(data)
  editCategoryDialog.value.showDialog = true
}

/**
 * 删除乾坤素材分类
 */
const deleteEvent = (id: number) => {
  ElMessageBox.confirm(t('categoryDeleteTips'), t('warning'),
      {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning',
      }
  ).then(() => {
    deleteCategory(id).then(() => {
      loadCategoryList()
    }).catch(() => {
    })
  })
}


const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  loadCategoryList()
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
