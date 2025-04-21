<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <!-- <el-button type="primary" @click="addEvent">
                    {{ t('addAreaReward') }}
                </el-button> -->
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="areaRewardTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('memberId')" prop="search">
                        <el-input v-model="areaRewardTable.searchParam.search" :placeholder="t('memberIdPlaceholder')" />
                    </el-form-item>

                    <el-form-item :label="t('levelId')" prop="level_id">
                        <el-select v-model="areaRewardTable.searchParam.level_id" class="input-width" clearable :placeholder="t('areaLevelPlaceholder')">
                            <el-option v-for="item in config.leveList" :key="item.value" :label="item.level_name" :value="item.level_id" />
                        </el-select>
                    </el-form-item>
     
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="" v-model="areaRewardTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待结算" value="0"></el-option>
                            <el-option label="已结算" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="areaRewardTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadAreaRewardList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="areaRewardTable.data" size="large" v-loading="areaRewardTable.loading">
                    <template #empty>
                        <span>{{ !areaRewardTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('ID')" min-width="80" :show-overflow-tooltip="true"/>

                    <el-table-column prop="member_id" :label="t('memberInfo')" min-width="180">
                        <template #default="{ row }">
                            <div v-if="row.member" class="flex items-center cursor-pointer" @click="toMember(row.member_id)">
                                <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                    <el-image v-if="row.member && row.member.headimg" class="w-[50px] h-[50px]" :src="img(row.member.headimg)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" />
                                            </div>
                                        </template>
                                    </el-image>
                                    <img v-else class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" fit="contain" />
                                </div>
                                <div class="ml-2">
                                    <span v-if="row.member.nickname" :title="row.member.nickname" class="multi-hidden">{{row.member.nickname}}</span>
                                    <span v-else :title="row.member.nickname" class="multi-hidden">{{row.member.username}}</span>
                                    <span class="text-primary text-[12px]">{{row.member.mobile}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('levelId')" min-width="120">
                        <template #default="{ row }">
                            <div v-if="row.areaLevel" class="cursor-pointer price-wrap" >
                                <span>{{row.areaLevel.level_name}}</span>
                                <!-- <el-icon class="ml-[5px]" :size="14"><EditPen /></el-icon> -->
                            </div>
                        </template>
                    </el-table-column>

                    <!-- 代理区域 -->
                    <el-table-column :label="t('agentArea')" min-width="120">
                        <template #default="{ row }">
                            <div v-if="row.agent_area" class="cursor-pointer price-wrap" >
                                <span>{{row.agent_area}}</span>
                                <!-- <el-icon class="ml-[5px]" :size="14"><EditPen /></el-icon> -->
                            </div>
                        </template>
                    </el-table-column>

                    <!-- 下单会员及订单号 -->
                    <el-table-column prop="buy_mid" :label="t('buyMid')" min-width="200">
                        <template #default="{ row }">
                            <div v-if="row.buyMember" class="flex items-center cursor-pointer" @click="toMember(row.member_id)">
                                <div class="min-w-[50px] h-[50px] flex items-center justify-center">
                                    <el-image v-if="row.buyMember && row.buyMember.headimg" class="w-[50px] h-[50px]" :src="img(row.buyMember.headimg)" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <img class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" />
                                            </div>
                                        </template>
                                    </el-image>
                                    <img v-else class="w-[50px] h-[50px]" src="@/app/assets/images/default_headimg.png" fit="contain" />
                                </div>
                                <div class="ml-2">
                                    <span v-if="row.buyMember.nickname" :title="row.buyMember.nickname" class="multi-hidden">{{row.buyMember.nickname}}</span>
                                    <span v-else :title="row.buyMember.nickname" class="multi-hidden">{{row.buyMember.username}}</span>
                                    <span class="text-primary text-[12px]">{{row.buyMember.mobile}}</span>
                                </div>
                            </div>
                            <!-- 订单号 -->
                            <div v-if="row.shopOrder" class="flex items-center cursor-pointer" @click="toOrder(row.shopOrder.order_id)">
                                <span class="text-primary text-[12px]">{{row.shopOrder.order_no}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="full_address" :label="t('address')" min-width="150">
                        <template #default="{ row }">
                            <div v-if="row.shopOrder" class="flex items-center cursor-pointer" @click="toOrder(row.shopOrder.order_id)">
                                <span class="text-primary text-[12px]">{{row.shopOrder.taker_full_address}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <!-- <el-table-column prop="order_goods_id" :label="t('orderGoodsId')" min-width="120" :show-overflow-tooltip="true"/> -->

                    <el-table-column :label="t('amount')" min-width="120">
                        <template #default="{ row }">
                            <div  class="cursor-pointer price-wrap" >
                                <span>{{row.order_amount}}&nbsp;元</span>
                                <!-- <span>{{row.settle_amount}}&nbsp;/</span>
                                <span>&nbsp;{{row.give_rate}}</span> -->
                                <!-- <el-icon class="ml-[5px]" :size="14"><EditPen /></el-icon> -->
                            </div>
                        </template>
                    </el-table-column>
                    
                    <!-- <el-table-column prop="level_rate" :label="t('levelRate')" min-width="120" :show-overflow-tooltip="true"/> -->
                    
                    
                    <!-- <el-table-column prop="level_agents" :label="t('levelAgents')" min-width="120" :show-overflow-tooltip="true"/> -->
                    
                    <el-table-column prop="dividend_amount" :label="t('dividendAmount')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="status" :label="t('status')" min-width="100" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <el-tag v-if="row.status == 0" type="warning">{{ t('unSettlement') }}</el-tag>
                            <el-tag v-else-if="row.status == 1" type="success">{{ t('settlement') }}</el-tag>
                            <!-- {{ row.status == 0? '待结算' : row.thaw_status == 1? '已结算'  : '' }} -->
                        </template>
                    </el-table-column>
                    
                    <!-- 创建时间 -->
                    <el-table-column :label="t('createTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
                        </template>
                    </el-table-column>
                    <!-- 结算时间 -->
                    <el-table-column prop="settle_time" :label="t('settleTime')" min-width="180">
                        <template #default="{ row }">
                            {{ row.settle_time || '' }}
                        </template>
                    </el-table-column>
 
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <!-- <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button> -->
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="areaRewardTable.page" v-model:page-size="areaRewardTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="areaRewardTable.total"
                        @size-change="loadAreaRewardList()" @current-change="loadAreaRewardList" />
                </div>
            </div>

            
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getAreaRewardList, deleteAreaReward } from '@/addon/ly_area/api/reward'
import { getLevelList } from "@/addon/ly_area/api/level";
import { img } from '@/utils/common'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title;

const config :Record<string, any> = reactive({
    leveList: [],
})
let areaRewardTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    settle_time:0,
    searchParam:{
        search: '',
    //   "member_id":"",
      "level_id":"",
      "buy_mid":"",
      "order_id":"",
      "order_goods_id":"",
      "create_time":[],
      status: '',
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    
/**
 * 获取链动2+1奖励列表
 */
const loadAreaRewardList = (page: number = 1) => {
    areaRewardTable.loading = true
    areaRewardTable.page = page

    getAreaRewardList({
        page: areaRewardTable.page,
        limit: areaRewardTable.limit,
         ...areaRewardTable.searchParam
    }).then(res => {
        areaRewardTable.loading = false
        areaRewardTable.data = res.data.data
        areaRewardTable.total = res.data.total
    }).catch(() => {
        areaRewardTable.loading = false
    })
}
loadAreaRewardList()

// 获取链动等级
const getLevelListFn = (bool=false) => {
    getLevelList({
        page: 1,
        limit: 11
    }).then((res:any) => {
        config.leveList = res.data.data
        if(bool){
            ElMessage({
                message: t('refreshSuccess'),
                type: 'success'
            })
        }
    })
}
getLevelListFn()

//跳转区域等级列表页面
const addLevelFn = ()=>{
    const routeData = router.resolve('/ly_area/level')
    window.open(routeData.href)
}



/**
 * 删除奖励
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('areaRewardDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteAreaReward(id).then(() => {
            loadAreaRewardList()
        }).catch(() => {
        })
    })
}

// 跳转会员详情
const toMember = (id:number) => {
    const routeData = router.resolve(`/member/detail?id=${id}`)
    window.open(routeData.href, '_blank')
}  

const toOrder = (id:number) => {
    const routeData = router.resolve(`/shop/order/detail?order_id=${id}`)
    window.open(routeData.href, '_blank')
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadAreaRewardList()
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