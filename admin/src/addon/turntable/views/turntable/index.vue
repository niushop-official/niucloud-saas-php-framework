<template>
  <div class="main-container">
    <el-card class="box-card !border-none" shadow="never">
      <div class="flex justify-between items-center">
        <span class="text-page-title">{{ pageName }}</span>
        <el-button type="primary" class="w-[150px]" @click="addEvent">{{
          t("addTurntable")
        }}</el-button>
      </div>
      <el-card
        class="box-card !border-none my-[10px] table-search-wrap"
        shadow="never"
      >
        <el-form
          :inline="true"
          :model="roleTableData.searchParam"
          ref="searchFormRef"
        >
          <el-form-item :label="t('gameName')" prop="seach">
            <el-input
              v-model="roleTableData.searchParam.game_name"
              class="w-[240px]"
              :placeholder="t('gameNamePlaceholder')"
            />
          </el-form-item>
          <el-form-item :label="t('createTime')" prop="create_time">
            <el-date-picker
              v-model="roleTableData.searchParam.create_time"
              type="datetimerange"
              value-format="YYYY-MM-DD HH:mm:ss"
              :start-placeholder="t('startDate')"
              :end-placeholder="t('endDate')"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadGamesList()">{{
              t("search")
            }}</el-button>
            <el-button @click="resetForm(searchFormRef)">{{
              t("reset")
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-tabs
        v-model="roleTableData.searchParam.status"
        class="tabs"
        @tab-change="tabHandleClick"
      >
        <el-tab-pane :label="t('all')" name=""></el-tab-pane>
        <el-tab-pane :label="t('haveNotStarted')" name="1"></el-tab-pane>
        <el-tab-pane :label="t('underway')" name="2"></el-tab-pane>
        <el-tab-pane :label="t('finished')" name="3"></el-tab-pane>
        <el-tab-pane :label="t('closed')" name="4"></el-tab-pane>
      </el-tabs>
      <!-- 表格数据 -->
      <el-table
        :data="roleTableData.data"
        size="large"
        v-loading="roleTableData.loading"
        ref="gamesListTableRef"
        @sort-change="sortChange"
      >
        <template #empty>
          <span>{{ !roleTableData.loading ? t("emptyData") : "" }}</span>
        </template>
        <el-table-column
          prop="game_name"
          :label="t('gameName')"
          min-width="120"
        />
        <el-table-column
          prop="winning_rate"
          :label="t('winningRate')"
          min-width="120"
        >
          <template #default="{ row }">
            <span class="text-[14px]">{{ row.winning_rate }} %</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="points"
          :label="t('pointsTable')"
          min-width="120"
        />
        <el-table-column
          prop="join_type"
          :label="t('joinTypeTable')"
          min-width="120"
        >
          <template #default="{ row }">
            <div v-if="row.join_type == 0">
              <span>每天{{ row.join_frequency }}次</span>
            </div>
            <div v-if="row.join_type == 1">
              <span>一人{{ row.join_frequency }}次</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="join_num"
          :label="t('joinNumTable')"
          min-width="120"
          sortable="custom"
        />
        <el-table-column
          prop="winning_num"
          :label="t('winningNumTable')"
          min-width="120"
          sortable="custom"
        />
        <el-table-column
          prop="status_name"
          :label="t('statusNameTable')"
          min-width="120"
        />
        <el-table-column
          prop="start_time"
          :label="t('startTimeTable')"
          min-width="180"
          sortable="custom"
        />
        <el-table-column
          prop="end_time"
          :label="t('endTimeTable')"
          min-width="180"
          sortable="custom"
        />
        <el-table-column
          :label="t('operation')"
          fixed="right"
          align="right"
          min-width="120"
        >
          <template #default="{ row }">
            <el-button type="primary" link @click="detailEvent(row)">{{
              t("detail")
            }}</el-button>
            <template
              v-for="button in getActionButtons(row)"
              :key="button.text"
            >
              <el-button type="primary" link @click="button.action(row)">{{
                button.text
              }}</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="page flex justify-between mt-[16px]">
        <div class="expand">
          <el-button @click="weightScaleClick">权重分布概率器</el-button>
        </div>
        <div class="page">
          <el-pagination
            v-model:current-page="roleTableData.page"
            v-model:page-size="roleTableData.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="roleTableData.total"
            @size-change="loadGamesList()"
            @current-change="loadGamesList"
          />
        </div>
      </div>
      <!-- 抽奖活动推广弹出框 -->
      <turntable-spread-popup ref="turntableSpreadPopupRef" />
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { t } from '@/lang'
import { FormInstance, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import {
    getSearchListApi,
    deleteGamesApi,
    closeGamesApi,
    openGamesApi
} from '@/addon/turntable/api/turntable'
import turntableSpreadPopup from '@/addon/turntable/views/turntable/components/turntable-spread-popup.vue'
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
const activeName = ref('')

const gamesListTableRef = ref()

const roleTableData = reactive({
    page: 1,
    limit: 20,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        game_name: '',
        start_time: [],
        status: '',
        order: '',
        sort: ''
    }
})
const value3 = ref(true)
const searchFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    roleTableData.searchParam.game_name = ''
    roleTableData.searchParam.start_time = []
    roleTableData.searchParam.status = ''
    loadGamesList()
}
/**
 * 获取活动列表
 */
const loadGamesList = (page: number = 1) => {
    roleTableData.loading = true
    roleTableData.page = page

    const searchData = cloneDeep(roleTableData.searchParam)
    getSearchListApi({
        page: roleTableData.page,
        limit: roleTableData.limit,
        ...searchData
    })
        .then((res) => {
            roleTableData.loading = false
            roleTableData.data = res.data.data
            roleTableData.total = res.data.total
        })
        .catch(() => {
            roleTableData.loading = false
        })
}
loadGamesList()
// 当前选中tab页面
const tabHandleClick = (event: any) => {
    roleTableData.searchParam.status = event
    loadGamesList()
}
const detailEvent = (row: any) => {
    // 处理详情事件
    router.push('/turntable/turntable/detail?game_id=' + row.game_id)
}

const editEvent = (row: any) => {
    // 处理编辑事件
    router.push('/turntable/turntable/real_edit?game_id=' + row.game_id)
}

// 奖品推广
const turntableSpreadPopupRef: any = ref(null)
const promotionEvent = (row: any) => {
    // 处理推广事件
    turntableSpreadPopupRef.value.show(row)
}

const deleteEvent = (row: any) => {
    // 处理删除事件
    ElMessageBox.confirm(t('statusChangeTips'), t('warning'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning'
    }).then(() => {
        deleteGamesApi({
            game_id: row.game_id
        }).then((res) => {
            loadGamesList()
        })
    })
}

const closeEvent = (row: any) => {
    // 处理关闭事件
    ElMessageBox.confirm(t('statusCloseChangeTips'), t('warning'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning'
    }).then(() => {
        closeGamesApi({
            game_id: row.game_id
        }).then((res) => {
            loadGamesList()
        })
    })
}

const openEvent = (row: any) => {
    // 处理开启事件
    ElMessageBox.confirm(t('statusOpenChangeTips'), t('warning'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning'
    }).then(() => {
        openGamesApi({
            game_id: row.game_id
        }).then((res) => {
            loadGamesList()
        })
    })
}
// 操作栏选项
const getActionButtons = (row: any) => {
    const buttons = []
    if (row.status === 1) {
        buttons.push(
            { text: t('edit'), action: editEvent },
            { text: t('promotion'), action: promotionEvent },
            { text: t('delete'), action: deleteEvent }
        )
    } else if (row.status === 2) {
        buttons.push(
            { text: t('promotion'), action: promotionEvent },
            { text: t('close'), action: closeEvent }
        )
    } else if (row.status === 3) {
        buttons.push({ text: t('delete'), action: deleteEvent })
    } else if (row.status === 4) {
        buttons.push(
            { text: t('delete'), action: deleteEvent },
            { text: t('open'), action: openEvent }
        )
    }
    return buttons
}
/**
 * 添加抽奖
 */
const addEvent = () => {
    router.push({ path: '/turntable/turntable/real_edit' })
}

/**
 * 权重分布概率器
 * */
const weightScaleClick = () => {
    router.push({ path: '/turntable/turntable/weight' })
}
// 监听排序
const sortChange = (event: any) => {
    let sort = ''
    if (event.order == 'ascending') {
        sort = 'asc'
    } else if (event.order == 'descending') {
        sort = 'desc'
    }
    if (sort) {
        roleTableData.searchParam.order = event.prop
        roleTableData.searchParam.sort = sort
    }
    loadGamesList()
}
</script>
