<template>
  <div class="main-container">
    <el-card class="box-card !border-none" shadow="never">
      <div class="flex justify-between items-center">
        <span class="text-page-title">{{ pageName }}</span>
        <el-button type="primary" class="w-[100px]" @click="addEvent">
          {{ t('addReserve') }}
        </el-button>
      </div>

      <div class="flex items-center mt-5">
        <span class="text-sm">{{ t('reserveStatus') }}</span>
        <div v-for="(item, index) in reserveStatus" :key="index" class="flex items-center">
          <span class="w-[16px] h-[16px] ml-[30px] mr-[10px]" :style="{ backgroundColor: reserveStatusColor[item.status] }"></span>
          <span class="text-sm">{{ item.name }}</span>
        </div>
      </div>
      <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
        <el-form :inline="true" :model="searchParam" ref="searchFormRef">
          <el-form-item :label="t('client')" prop="reserve_state">
            <el-input :placeholder="t('clientPlaceholder')" v-model="clientName" class="w-[200px]" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="getReserveBoardFn(weekIndex)">{{ t('search') }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <div class="time-data mt-3" v-if="reserveBoard?.length">
        <div class="flex justify-center items-center text-lg">
          <span class="iconfont iconxiangzuojiantou font-bold cursor-pointer" @click="cutWeekFn('sub')"></span>
          <div class="mx-6">{{ reserveBoard[0].date }} - {{ reserveBoard[reserveBoard.length - 1].date }}</div>
          <span class="iconfont iconxiangyoujiantou font-bold cursor-pointer" @click="cutWeekFn('add')"></span>
        </div>
        <div v-loading="reserveBoardLoading">
          <div class="time-data-head">
            <div v-for="(item, index) in reserveBoard" :key="index">
              <span>{{ item.week }} {{ item.date }}</span>
            </div>
          </div>
          <div class="time-data-body">
            <div class="flex flex-col common-scrollbar" v-for="(item, index) in reserveBoard" :key="index">
              <div class="project-item" :style="{ borderColor: reserveStatusColor[subItem.reserve_state] }" v-for="(subItem, subIndex) in item.data" :key="subIndex">
                <p>{{ subItem.reserve_name }}</p>
                <span class="my-1">{{ subItem?.reserve_date.split(' ')[1] }}</span>
                <p class="name">{{ subItem?.goods?.goods_name }}</p>
                <el-dropdown>
                  <span class="item-btn iconfont icongengduo"></span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <!-- <el-dropdown-item>预约详情</el-dropdown-item> -->
                      <!-- <el-dropdown-item>确认预约</el-dropdown-item> -->
                      <el-dropdown-item @click="detailEvent(subItem)">{{ t('reserveDetail') }}</el-dropdown-item>
                      <el-dropdown-item @click="editEvent(subItem)" v-if="subItem.reserve_state != -1 && subItem.reserve_state != 3">{{ t('editReserve') }}</el-dropdown-item>
                      <el-dropdown-item v-if="subItem.reserve_state != -1 && subItem.reserve_state != 3" @click="statusEvent(subItem.reserve_id, -1)">{{ t('closeReserve') }}</el-dropdown-item>
                      <el-dropdown-item v-if="subItem.reserve_state == 1" @click="statusEvent(subItem.reserve_id, 2)">{{ t('arrivedAtTheStore') }}</el-dropdown-item>
                      <el-dropdown-item v-if="subItem.reserve_state == 2" @click="statusEvent(subItem.reserve_id, 3)">{{ t('completed') }}</el-dropdown-item>
                      <el-dropdown-item v-if="subItem.reserve_state == -1" @click="deleteEvent(subItem.reserve_id)">{{ t('deleteReserve') }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <add-reserve ref="addReserveDialog" @complete="getReserveBoardFn" />
    <reserve-detail ref="reserveDetailDialog" @complete="getReserveBoardFn" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { t } from '@/lang'
  import { deleteReserve, getReserveBoard, getReserveStatus, editReserveStatus } from '@/addon/vipcard/api/vipcard'
  import { ElMessageBox, FormInstance } from 'element-plus'
  import addReserve from '@/addon/vipcard/views/reserve/components/add-reserve.vue'
  import reserveDetail from '@/addon/vipcard/views/reserve/components/reserve-detail.vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const pageName = route.meta.title

  const searchFormRef = ref<FormInstance>()

  /**
   * 获取预约状态
   */
  const reserveStatus = ref([])
  const reserveStatusColor = ref({
    '-1': '#ccc',
    1: '#8558fa',
    2: '#1475fa',
    3: '#fa5b14',
    4: '#10c610'
  })
  const getReserveStatusFn = async () => {
    const data = await (await getReserveStatus()).data
    reserveStatus.value = data
  }
  getReserveStatusFn()

  /**
   * 获取预约面板
   */
  const reserveBoardLoading = ref(true)
  const reserveBoard = ref([])
  const clientName = ref('')
  const weekIndex = ref(0)
  const getReserveBoardFn = (page: number = 0) => {
    reserveBoardLoading.value = true
    const obj = {
      length: page,
      search_name: clientName.value
    }

    getReserveBoard(obj)
      .then((res) => {
        reserveBoard.value = res.data
        reserveBoardLoading.value = false
      })
      .catch(() => {
        reserveBoardLoading.value = false
      })
  }
  getReserveBoardFn()

  // 切换周
  const cutWeekFn = (type: any) => {
    if (type == 'add') weekIndex.value++
    else if (type == 'sub') weekIndex.value--
    getReserveBoardFn(weekIndex.value)
  }

  const addReserveDialog: Record<string, any> | null = ref(null)

  /**
   * 添加预约
   */
  const addEvent = () => {
    addReserveDialog.value.setFormData()
    addReserveDialog.value.showDialog = true
  }

  /**
   * 编辑预约
   * @param data
   */
  const editEvent = (data: any) => {
    addReserveDialog.value.setFormData(data)
    addReserveDialog.value.showDialog = true
  }
  const reserveDetailDialog: Record<string, any> | null = ref(null)

  /**
   * 预约详情
   * @param data
   */
  const detailEvent = (data: any) => {
    reserveDetailDialog.value.setFormData(data)
    reserveDetailDialog.value.showDialog = true
  }

  /**
   * 删除预约
   */
  const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('vipcardReserveDeleteTips'), t('warning'), {
      confirmButtonText: t('confirm'),
      cancelButtonText: t('cancel'),
      type: 'warning'
    }).then(() => {
      deleteReserve(id).then(() => {
        getReserveBoardFn()
      })
    })
  }

  const statusEvent = (id: number, num: number) => {
    if (num == -1) {
      ElMessageBox.confirm(t('vipcardReserveDeleteTips'), t('warning'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning'
      })
        .then(() => {
          editReserveStatus({
            reserve_id: id,
            reserve_state: num
          }).then(() => {
            getReserveBoardFn()
          })
        })
        .catch(() => {})
      return
    }
    editReserveStatus({
      reserve_id: id,
      reserve_state: num
    }).then(() => {
      getReserveBoardFn()
    })
  }
</script>

<style lang="scss" scoped>
  .time-data {
    .time-data-head,
    .time-data-body {
      @apply flex justify-between w-full border-[1px] border-r-0 border-solid border-[#E6E6E6] mt-5;

      & > div {
        width: 14%;
        height: 50px;
        @apply flex items-center justify-center flex-1 border-0 border-r-[1px] border-solid border-[#E6E6E6] text-sm;
      }
    }

    .time-data-body {
      @apply mt-0 border-t-0 py-1;

      & > div {
        height: 500px;
        align-items: baseline;
      }

      .project-item {
        @apply flex flex-col border-[1px] border-solid border-[#999] border-t-[3px] px-1 pb-2 pt-1 w-[90%] box-border rounded-sm my-3 ml-[6%];

        .item-btn {
          @apply self-end border-[1px] border-solid border-[#ccc] text-[#ccc] rounded-xl text-lg font-bold ml-auto;
        }

        .name {
          @apply truncate mb-2;
        }
      }

      .common-scrollbar {
        overflow-y: scroll;
        box-sizing: border-box;
        justify-content: normal;

        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
          background-color: rgba(0, 0, 0, 0);
        }

        &::-webkit-scrollbar-button {
          display: none;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 6px;
          box-shadow: inset 0 0 6px rgba(45, 43, 43, 0.45);
          background-color: #ddd;
        }

        &::-webkit-scrollbar-track {
          background-color: transparent;
        }
      }
    }
  }
</style>
