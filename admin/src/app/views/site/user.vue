<template>
  <!--站点用户-->
  <div class="main-container">
    <el-card class="box-card !border-none" shadow="never">

      <div class="flex justify-between items-center">
        <span class="text-page-title">{{ pageName }}</span>
        <div>
          <el-button type="primary" class="w-[100px]" @click="userEditRef.setFormData()">{{ t('addUser') }}</el-button>
        </div>
      </div>

      <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
        <el-form :inline="true" :model="userTableData.searchParam" ref="searchFormRef" class="search-form">
          <el-form-item prop="username">
            <el-input v-model.trim="userTableData.searchParam.username" :placeholder="t('userNamePlaceholder')" />
          </el-form-item>
          <!-- <el-form-item :label="t('createTime')" prop="create_time">
              <el-date-picker v-model="userTableData.searchParam.create_time" type="datetimerange"
                  value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                  :end-placeholder="t('endDate')" />
          </el-form-item> -->
          <el-form-item prop="last_time">
            <el-date-picker v-model="userTableData.searchParam.last_time" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                            :end-placeholder="t('endDate')" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadUserList()">{{ t('search') }}</el-button>
            <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <div>
        <el-table :data="userTableData.data" size="large" v-loading="userTableData.loading">
          <template #empty>
            <span>{{ !userTableData.loading ? t('emptyData') : '' }}</span>
          </template>
          <el-table-column :label="t('headImg')" width="100" align="left">
            <template #default="{ row }">
              <div class="w-[54px] h-[54px] flex items-center justify-center">
                <img v-if="row.head_img" :src="img(row.head_img)" class="w-[54px] rounded-full" />
                <img v-else src="@/app/assets/images/member_head.png" class="w-[54px] rounded-full" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="username" :label="t('accountNumber')" min-width="120" show-overflow-tooltip />
          <el-table-column prop="mobile" :label="t('手机号')" min-width="120" show-overflow-tooltip />
          <el-table-column prop="real_name" :label="t('userRealName')" min-width="120" show-overflow-tooltip />
          <el-table-column prop="site_num" :label="t('siteNum')" min-width="120" show-overflow-tooltip align="center" />
          <!-- <el-table-column prop="create_time" :label="t('createTime')" min-width="180" align="center">
              <template #default="{ row }">
                  {{ row.create_time || '' }}
              </template>
          </el-table-column> -->
          <el-table-column prop="last_time" :label="t('lastLoginTime')" min-width="180" align="center">
            <template #default="{ row }">
              {{ row.last_time || '' }}
            </template>
          </el-table-column>
          <el-table-column :label="t('lastLoginIP')" min-width="180" align="center">
            <template #default="{ row }">
              {{ row.last_ip || '' }}
            </template>
          </el-table-column>
          <el-table-column :label="t('operation')" align="right" fixed="right" width="180">
            <template #default="{ row }">
              <el-button type="primary" link @click="detailEvent(row.uid)">{{ t('detail') }}</el-button>
              <template v-if="!row.is_super_admin">
                <el-button type="primary" link @click="editEvent(row.uid)" >{{ t('edit') }}</el-button>
                <el-button type="primary" link @click="detailEvent(row.uid, 'userCreateSiteLimit')" >{{ t('userCreateSiteLimit') }}</el-button>
                <el-button type="primary" link @click="deleteEvent(row.uid)" >{{ t('delete') }}</el-button>
              </template>
              <!-- <div class="manage-option text-right ">
                  <template v-if="!row.is_super_admin">
                      <el-button type="primary" link @click="editEvent(row.uid)" >{{ t('edit') }}</el-button>
                      <el-button type="primary" link @click="detailEvent(row.uid, 'userCreateSiteLimit')" >{{ t('userCreateSiteLimit') }}</el-button>
                      <el-button type="primary" link @click="deleteEvent(row.uid)" >{{ t('delete') }}</el-button>
                  </template>
              </div> -->
            </template>
          </el-table-column>
        </el-table>

        <div class="mt-[16px] flex justify-end">
          <el-pagination v-model:current-page="userTableData.page" v-model:page-size="userTableData.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="userTableData.total"
                         @size-change="loadUserList()" @current-change="loadUserList" />
        </div>
      </div>

    </el-card>

    <user-edit ref="userEditRef" @complete="loadUserList()"/>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getUserList, deleteUser } from '@/app/api/user'
import { img } from '@/utils/common'
import type { FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import userEdit from './components/user-edit.vue'
import { ElMessageBox } from "element-plus";

const router = useRouter()
const route = useRoute()
const pageName = route.meta.title
const userEditRef = ref(null)

const userTableData = reactive({
  page: 1,
  limit: 10,
  total: 0,
  loading: true,
  data: [],
  searchParam: {
    username: '',
    site_name: '',
    // create_time: [],
    last_time: []
  }
})

const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.resetFields()
  loadUserList()
}

/**
 * 获取用户列表
 */
const loadUserList = (page: number = 1) => {
  userTableData.loading = true
  userTableData.page = page

  getUserList({
    page: userTableData.page,
    limit: userTableData.limit,
    ...userTableData.searchParam

  }).then(res => {
    userTableData.loading = false
    userTableData.data = res.data.data
    userTableData.total = res.data.total
  }).catch(() => {
    userTableData.loading = false
  })
}
loadUserList()

/**
 * 查看详情
 */
const detailEvent = (uid: number, tab: string = '') => {
  router.push({ path: '/admin/site/user_info', query: { uid, tab } })
}

/**
 * 编辑用户
 * @param uid
 */
const editEvent = (uid: number) => {
  userEditRef.value.setFormData(uid)
}

/**
 * 删除用户
 */
const deleteEvent = (uid: number) => {
  ElMessageBox.confirm(t('userDeleteTips'), t('warning'),
      {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning'
      }
  ).then(() => {
    deleteUser(uid).then(res => {
      loadUserList()
    }).catch(() => {
    })
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-table tr td) {
  height: 100px !important;
}
:deep(.el-input__wrapper){
  box-shadow: none !important;
  border-radius: 4px !important;
  border: 1px solid #D1D5DB !important;
  height: 32px !important;
}
:deep(.el-select__wrapper){
  box-shadow: none !important;
  border-radius: 4px !important;
  border: 1px solid #D1D5DB !important;
  height: 32px !important;
}
:deep(.el-button){
  border-radius: 4px !important;
}
/* 设置 el-select 的 placeholder 颜色 */
:deep(.search-form .el-select__placeholder.is-transparent) {
  color: #C4C7DA;
  font-size: 12px;
}

/* 设置 el-select 选中后的颜色 */
:deep(.search-form .el-select__placeholder) {
  color: #4F516D;
  font-size: 12px;

}
/* 设置 el-input 的 placeholder 颜色 */
:deep(.search-form .el-input__inner::placeholder) {
  color: #C4C7DA;
  font-size: 12px;

}
/* 设置 el-input 输入内容后的颜色 */
:deep(.search-form .el-input__inner) {
  color: #4F516D;
  font-size: 12px;

}
/* 设置 el-date-picker 的 placeholder 颜色 */
:deep(.search-form .el-date-editor .el-range-input::placeholder) {
  color: #C4C7DA;
  font-size: 12px;
}

/* 设置 el-date-picker 的输入内容颜色 */
:deep(.search-form .el-date-editor .el-range-input) {
  color: #4F516D;
  font-size: 12px;
}

.manage-option {
  line-height: 50px;
  padding: 0 30px;
  position: absolute;
  right: 0;
  width: 100vw;
  bottom: 0;
  background-color: #f4f6f9;
  transition: all .3s;
  box-shadow: 0 4px 4px rgba(220, 220, 220, .3);
  opacity: 0;
  z-index: 999;
  white-space: nowrap;
}

/* 当行被 hover 时 */
:deep(.el-table__row:hover) {
  position: relative;
  z-index: 10;
}

/* 当行被 hover 时，其下的单元格允许溢出 */
:deep(.el-table__row:hover .el-table__cell) {
  overflow: visible;
}

/* 当行被 hover 时，显示 manage-option 并调整其位置 */
:deep(.el-table__row:hover .manage-option) {
  opacity: 1;
  bottom: -51px;
}

:deep(.el-table__fixed-body-wrapper:hover),
:deep(.el-table__fixed-body-wrapper .el-table__row:hover) {
  z-index: 10;
}

:deep(.el-table__fixed-body-wrapper .el-table__row:hover .el-table__cell) {
  overflow: visible;
}
</style>
