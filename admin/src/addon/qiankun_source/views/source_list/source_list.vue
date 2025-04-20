<template>
  <div class="main-container">
    <el-card class="box-card !border-none" shadow="never">

      <div class="flex justify-between items-center">
        <span class="text-lg">{{ pageName }}</span>
        <el-button type="primary" @click="addEvent">
          {{ t('addSourceList') }}
        </el-button>
      </div>

      <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
        <el-form :inline="true" :model="sourceListTable.searchParam" ref="searchFormRef">

          <el-form-item :label="t('cateId')" prop="cate_id">
            <el-select class="w-[280px]" v-model="sourceListTable.searchParam.cate_id" clearable :placeholder="t('cateIdPlaceholder')">
              <el-option
                  v-for="(item, index) in cateIdList"
                  :key="index"
                  :label="item['title']"
                  :value="item['id']"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('userId')" prop="user_id">
            <el-input v-model="sourceListTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')"/>
          </el-form-item>
          <el-form-item :label="t('text')" prop="text">
            <el-input v-model="sourceListTable.searchParam.text" clearable :placeholder="t('textPlaceholder')"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadSourceListList()">{{ t('search') }}</el-button>
            <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <div class="mt-[10px]">
        <el-table :data="sourceListTable.data" size="large" v-loading="sourceListTable.loading">
          <template #empty>
            <span>{{ !sourceListTable.loading ? t('emptyData') : '' }}</span>
          </template>
          <el-table-column prop="cate_id_name" :label="t('cateId')" min-width="120" :show-overflow-tooltip="true"/>
          <el-table-column prop="text" :label="t('text')" min-width="200" :show-overflow-tooltip="true"/>
          <el-table-column prop="nickname" :label="t('nickname')" min-width="200" :show-overflow-tooltip="true">
            <template #default="{ row }">
              <div class="flex items-center">
                <img :src="row.headimg?img(row.headimg):'/src/app/assets/images/member_head.png'" class="w-[40px] h-[40px] mr-[10px]">
                <span class="text-[#606266]">{{ row.username || row.nickname || '后台添加' }}</span>
              </div>
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
          <el-pagination v-model:current-page="sourceListTable.page" v-model:page-size="sourceListTable.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="sourceListTable.total"
                         @size-change="loadSourceListList()" @current-change="loadSourceListList"/>
        </div>
      </div>

      <edit ref="editSourceListDialog" @complete="loadSourceListList"/>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref, watch} from 'vue'
import {t} from '@/lang'
import {useDictionary} from '@/app/api/dict'
import {getSourceListList, deleteSourceList, getWithCategoryList} from '@/addon/qiankun_source/api/source_list'
import {img} from '@/utils/common'
import {ElMessageBox, FormInstance} from 'element-plus'
import Edit from '@/addon/qiankun_source/views/source_list/components/source-list-edit.vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const pageName = route.meta.title;

let sourceListTable = reactive({
  page: 1,
  limit: 10,
  total: 0,
  loading: true,
  data: [],
  searchParam: {
    "cate_id": "",
    "user_id": "",
    "text": ""
  }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据


/**
 * 获取素材管理列表
 */
const loadSourceListList = (page: number = 1) => {
  sourceListTable.loading = true
  sourceListTable.page = page

  getSourceListList({
    page: sourceListTable.page,
    limit: sourceListTable.limit,
    ...sourceListTable.searchParam
  }).then(res => {
    sourceListTable.loading = false
    sourceListTable.data = res.data.data
    sourceListTable.total = res.data.total
  }).catch(() => {
    sourceListTable.loading = false
  })
}
loadSourceListList()

const editSourceListDialog: Record<string, any> | null = ref(null)

/**
 * 添加素材管理
 */
const addEvent = () => {
  editSourceListDialog.value.setFormData()
  editSourceListDialog.value.showDialog = true
}

/**
 * 编辑素材管理
 * @param data
 */
const editEvent = (data: any) => {
  editSourceListDialog.value.setFormData(data)
  editSourceListDialog.value.showDialog = true
}

/**
 * 删除素材管理
 */
const deleteEvent = (id: number) => {
  ElMessageBox.confirm(t('sourceListDeleteTips'), t('warning'),
      {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning',
      }
  ).then(() => {
    deleteSourceList(id).then(() => {
      loadSourceListList()
    }).catch(() => {
    })
  })
}


const cateIdList = ref([])
const setCateIdList = async () => {
  cateIdList.value = await (await getWithCategoryList({})).data
}
setCateIdList()

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  loadSourceListList()
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
