<template>
  <div class="main-container">
    <div class="detail-head">
      <div class="left" @click="router.push({ path: '/turntable/index' })">
        <span class="iconfont iconxiangzuojiantou !text-xs"></span>
        <span class="ml-[1px]">{{ t('returnToPreviousPage') }}</span>
      </div>
      <span class="adorn">|</span>
      <span class="right">{{ pageName }}</span>
    </div>
    <el-card class="box-card mt-[15px] !border-none" shadow="never" v-if="detailData.basicInfo">
      <el-descriptions :title="t('basicInfo')" class="mt-[30px] ">
        <el-descriptions-item :label="t('activityName')">{{ detailData.basicInfo.game_name}}</el-descriptions-item>
        <el-descriptions-item :label="t('activityStatus')">{{ detailData.basicInfo.status_name}}</el-descriptions-item>
        <el-descriptions-item :label="t('startTime')">{{ detailData.basicInfo.start_time}}</el-descriptions-item>
        <el-descriptions-item :label="t('endTime')">{{ detailData.basicInfo.end_time}}</el-descriptions-item>
        <el-descriptions-item :label="t('winningProbability')">
          <el-tag size="small" type="primary">{{ detailData.basicInfo.winning_rate}}<span>%</span></el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="t('joinCondition')">{{ detailData.basicInfo.level_iid_name}}</el-descriptions-item>
        <el-descriptions-item :label="t('consumeNape')">{{ detailData.basicInfo.points}}<span class="pl-1">{{ t ('points')}}</span></el-descriptions-item>
        <el-descriptions-item :label="t('joinNumber')">
          <span v-if="detailData.basicInfo.join_type == 0"><span>每天{{detailData.basicInfo.join_frequency}}次</span></span>
          <span v-if="detailData.basicInfo.join_type == 1"><span>一人{{detailData.basicInfo.join_frequency}}次</span></span>
        </el-descriptions-item>
        <el-descriptions-item :label="t('losingLotteryTops')">{{ detailData.basicInfo.no_winning_desc}}</el-descriptions-item>
        <el-descriptions-item :label="t('displayWinners')">{{ detailData.basicInfo.is_show_winner_name}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :title="t('gamesSwardSetting')" class="mt-[30px]"></el-descriptions>
      <el-table :data="detailData.gamesAwardTableData" size="large" v-loading="detailData.gamesAwardLoading" ref="gamesListTableRef" class="w-[100px]" @sort-change="sortChange">
        <template #empty>
          <span>{{ !detailData.loading ? t('emptyData') : '' }}</span>
        </template>
        <el-table-column prop="award_name" :label="t('awardName')"/>
        <el-table-column prop="prize" :label="t('awardTypeName')"/>
        <el-table-column prop="award_num" :label="t('awardNumName')" sortable="custom"/>
        <el-table-column prop="receive_num" :label="t('receiveNumName')" sortable="custom"/>
        <el-table-column prop="remaining_num" :label="t('remainingNumName')" sortable="custom"/>
        <el-table-column prop="award_winning_rate" :label="t('awardWinningRateName')" sortable="custom"/>
      </el-table>
      <div class="mt-[16px] flex justify-end">
        <el-pagination
            v-model:current-page="detailData.gamesAwardPage"
            v-model:page-size="detailData.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="detailData.gamesAwardTotal"
            @size-change="getGamesAwardData()"
            @current-change="getGamesAwardData"
        />
      </div>
      <el-descriptions :title="t('drawRecord')" class="mt-[50px]"></el-descriptions>
      <el-form :inline="true" :model="detailData.searchParam" ref="searchFormRef" class="flex justify-end mt-[30px]">
        <el-form-item prop="seach">
          <el-input v-model="detailData.searchParam.member_nick_name" class="w-[240px]"
                    :placeholder="t('memberName')" />
        </el-form-item>
          <el-form-item prop="start_time">
            <el-date-picker
                v-model="detailData.searchParam.draw_start_create_time"
                type="datetime"
                :aria-label="t('startTime')"
                :placeholder="t('startTime')"
                style="width: 100%"
                value-format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
          <el-form-item prop="end_time">
            <el-date-picker
                v-model="detailData.searchParam.draw_end_create_time"
                type="datetime"
                :aria-label="t('endTime')"
                :placeholder="t('endTime')"
                style="width: 100%"
                value-format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
        <el-form-item>
          <el-button @click="getGameDrawRecordData()">{{ t('search') }}</el-button>
        </el-form-item>
      </el-form>
      <el-tabs
          v-model="detailData.searchParam.is_winning"
          type="card"
          class="demo-tabs"
          @tab-click="tabHandleClick"
      >
        <el-tab-pane :label="t('all')" name="0"></el-tab-pane>
        <el-tab-pane :label="t('winner')" name="2"></el-tab-pane>
        <el-tab-pane :label="t('loser')" name="1"></el-tab-pane>
      </el-tabs>
      <!-- 表格数据 -->
      <el-table :data="detailData.gameDrawRecordData" v-loading="detailData.gameDrawRecordLoading" stripe class="w-[100px]" >
        <template #empty>
          <span>{{ !detailData.gameDrawRecordLoading ? t('emptyData') : '' }}</span>
        </template>
        <el-table-column prop="member_nick_name" :label="t('memberName')" min-width="120" />
        <el-table-column prop="award_name" :label="t('winnerInfo')" min-width="120" />
        <el-table-column prop="create_time" :label="t('luckyDrawTime')" min-width="120" />
        <el-table-column prop="address_name" :label="t('addressName')" min-width="120" />
        <el-table-column prop="mobile" :label="t('mobile')" min-width="120" />
        <el-table-column prop="full_address" :label="t('fullAddress')" min-width="120" />
      </el-table>
      <div class="mt-[16px] flex justify-end">
        <el-pagination
            v-model:current-page="detailData.gameDrawRecordPage"
            v-model:page-size="detailData.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="detailData.gameDrawRecordTotal"
            @size-change="getGameDrawRecordData()"
            @current-change="getGameDrawRecordData"
        />
      </div>
    </el-card>

  </div>
</template>
<script lang="ts" setup>
import { ref,reactive} from 'vue'
import { t } from '@/lang'
import { useRoute, useRouter } from 'vue-router'
import { cloneDeep } from 'lodash-es'
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title
import {getGamesDetailApi} from '@/addon/turntable/api/turntable'
const gameId: number = parseInt(route.query.game_id as string)

const detailData = reactive({
  gamesAwardPage: 1,
  limit:20,
  gameDrawRecordPage:1,
  gamesAwardTotal: 0,
  gameDrawRecordTotal: 0,
  gamesAwardLoading: true,
  gameDrawRecordLoading: true,
  basicInfo:{},
  gamesAwardTableData:[],
  gameDrawRecordData :[],
  searchParam: {
    member_nick_name: '',
    draw_start_create_time: '',
    draw_end_create_time:'',
    is_winning:'0',
    order: '',
    sort: ''
  },
})
const getGamesData = ()=>{
  getGamesDetailApi({
    game_id: gameId
  }).then((res)=>{
    detailData.basicInfo = res.data.basicInfo
  })
}
const getGamesAwardData = (page:number = 1)=>{
  detailData.gamesAwardPage = page
  detailData.gamesAwardLoading = true
  const searchData = cloneDeep(detailData.searchParam)
  getGamesDetailApi({
    game_id: gameId,
    page:detailData.gamesAwardPage,
    limit:detailData.limit,
    ...searchData
  }).then((res) => {
    detailData.gamesAwardTableData = res.data.gameAward.data
    detailData.gamesAwardTotal = res.data.gameAward.total
    detailData.gamesAwardLoading = false
  }).catch(() => {
    detailData.gamesAwardLoading = false
  })
}
const getGameDrawRecordData = (page:number = 1)=>{
  const searchData = cloneDeep(detailData.searchParam)
  detailData.gameDrawRecordPage = page
  detailData.gameDrawRecordLoading = true
  getGamesDetailApi({
    page: detailData.gameDrawRecordPage,
    limit:detailData.limit,
    game_id: gameId,
    ...searchData
  }).then((res) => {
    detailData.gameDrawRecordData = res.data.gameDrawRecord.data
    detailData.gameDrawRecordTotal = res.data.gameDrawRecord.total
    detailData.gameDrawRecordLoading = false
  }).catch(() => {
    detailData.gameDrawRecordLoading = false
  })
}
getGamesData()
getGamesAwardData()
getGameDrawRecordData()
// 当前选中tab页面
const tabHandleClick = (event:any) => {
  detailData.searchParam.is_winning = event.props.name
  getGameDrawRecordData()
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
    detailData.searchParam.order = event.prop
    detailData.searchParam.sort = sort
  }
  getGamesAwardData()
}
</script>