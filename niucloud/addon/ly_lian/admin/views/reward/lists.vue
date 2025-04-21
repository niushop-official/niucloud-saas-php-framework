<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <!-- <el-button type="primary" @click="addEvent">
                    {{ t('addLianReward') }}
                </el-button> -->
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="lianRewardTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('memberId')" prop="search">
                        <el-input v-model="lianRewardTable.searchParam.search" :placeholder="t('memberIdPlaceholder')" />
                    </el-form-item>
                    <!-- <el-form-item :label="t('levelId')" prop="level_id">
                        <el-select class="" v-model="lianRewardTable.searchParam.level_id" clearable :placeholder="t('levelIdPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                        </el-select>
                    </el-form-item> -->

                    <el-form-item :label="t('levelId')" prop="level_id">
                        <el-select v-model="lianRewardTable.searchParam.level_id" class="input-width" clearable :placeholder="t('levelIdPlaceholder')">
                            <el-option v-for="item in config.leveList" :key="item.value" :label="item.level_name" :value="item.level_id" />
                        </el-select>
                    </el-form-item>
                    
                    <!-- <el-form-item :label="t('buyMid')" prop="buy_mid">
                        <el-input v-model="lianRewardTable.searchParam.buy_mid" :placeholder="t('buyMidPlaceholder')" />
                    </el-form-item> -->
                    <!-- <el-form-item :label="t('orderId')" prop="order_id">
                        <el-input v-model="lianRewardTable.searchParam.order_id" :placeholder="t('orderIdPlaceholder')" />
                    </el-form-item> -->
                    
                    <el-form-item :label="t('rewardType')" prop="reward_type">
                        <el-select class="" v-model="lianRewardTable.searchParam.reward_type" clearable :placeholder="t('rewardTypePlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="直推奖" value="0"></el-option>
                            <el-option label="见点奖" value="1"></el-option>
                            <el-option label="培育奖" value="2"></el-option>
                            <el-option label="平级奖" value="3"></el-option>
                            <el-option label="解冻结算" value="9"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('thawStatus')" prop="thaw_status">
                        <el-select class="" v-model="lianRewardTable.searchParam.thaw_status" clearable :placeholder="t('thawStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待解冻" value="0"></el-option>
                            <el-option label="已解冻发放" value="1"></el-option>
                            <el-option label="已失效" value="-1"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="lianRewardTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadLianRewardList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="lianRewardTable.data" size="large" v-loading="lianRewardTable.loading">
                    <template #empty>
                        <span>{{ !lianRewardTable.loading ? t('emptyData') : '' }}</span>
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
                            <div v-if="row.lianLevel" class="cursor-pointer price-wrap" >
                                <span>{{row.lianLevel.level_name}}</span>
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
                            <div v-if="row.lianOrder" class="flex items-center cursor-pointer" @click="toOrder(row.lianOrder.order_id)">
                                <span class="text-primary text-[12px]">{{row.lianOrder.order_no}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <!-- <el-table-column prop="orderid" :label="t('orderId')" min-width="120">
                        <template #default="{ row }">
                            <div v-if="row.lianOrder" class="flex items-center cursor-pointer" @click="toOrder(row.lianOrder.order_id)">
                                <span class="text-primary text-[12px]">{{row.lianOrder.order_no}}</span>
                            </div>
                        </template>
                    </el-table-column> -->
                    
                    <!-- <el-table-column prop="order_goods_id" :label="t('orderGoodsId')" min-width="120" :show-overflow-tooltip="true"/> -->

                    <el-table-column :label="t('settleAmount')" min-width="170">
                        <template #default="{ row }">
                            <div  class="cursor-pointer price-wrap" >
                                <span>{{row.settle_amount}}&nbsp;元</span>
                                <!-- <span>{{row.settle_amount}}&nbsp;/</span>
                                <span>&nbsp;{{row.give_rate}}</span> -->
                                <!-- <el-icon class="ml-[5px]" :size="14"><EditPen /></el-icon> -->
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="give_amount" :label="t('giveAmount')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <!-- <el-table-column prop="frozen_rate" :label="t('frozenRate')" min-width="120" :show-overflow-tooltip="true"/> -->
                    
                    <el-table-column prop="frozen_amount" :label="t('frozenAmount')" min-width="120" :show-overflow-tooltip="true"/>
                    <!-- 奖励类型 -->
                    <el-table-column prop="reward_type" :label="t('rewardType')" min-width="120" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.reward_type == 0? '直推奖' : row.reward_type == 1? '见点奖' : row.reward_type == 2? '培育奖' : row.reward_type == 3? '平级奖' : ''}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="thaw_status" :label="t('thawStatus')" min-width="120" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.thaw_status == 0? '冻结中' : row.thaw_status == 1? '已解冻' : row.thaw_status == 2? '正常' : row.thaw_status == -1? '已失效' : '' }}
                        </template>
                    </el-table-column>
                    
                    <!-- 奖励状态 -->
                    <el-table-column prop="thaw_status" :label="t('currentState')" min-width="100">
                        <template #default="{ row }">
                            {{ row.status == 0? '预计收益' : row.status == 1? '待结算' : row.status == 2? '已结算' : row.status == -1? '已失效' : '' }}
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
                    <el-pagination v-model:current-page="lianRewardTable.page" v-model:page-size="lianRewardTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="lianRewardTable.total"
                        @size-change="loadLianRewardList()" @current-change="loadLianRewardList" />
                </div>
            </div>

            
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getLianRewardList, deleteLianReward } from '@/addon/ly_lian/api/reward'
import { getLevelList } from "@/addon/ly_lian/api/level";
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
let lianRewardTable = reactive({
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
      "reward_type":"",
      "thaw_status":"",
      "create_time":[],
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    
/**
 * 获取链动2+1奖励列表
 */
const loadLianRewardList = (page: number = 1) => {
    lianRewardTable.loading = true
    lianRewardTable.page = page

    getLianRewardList({
        page: lianRewardTable.page,
        limit: lianRewardTable.limit,
         ...lianRewardTable.searchParam
    }).then(res => {
        lianRewardTable.loading = false
        lianRewardTable.data = res.data.data
        lianRewardTable.total = res.data.total
    }).catch(() => {
        lianRewardTable.loading = false
    })
}
loadLianRewardList()

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

//跳转链动等级列表页面
const addLevelFn = ()=>{
    const routeData = router.resolve('/ly_lian/level')
    window.open(routeData.href)
}

/**
 * 添加链动2+1奖励
 */
const addEvent = () => {
    router.push('/ly_lian/lian_reward_edit')
}

/**
 * 编辑链动2+1奖励
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/ly_lian/lian_reward_edit?id='+data.id)
}

/**
 * 删除链动2+1奖励
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('lianRewardDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteLianReward(id).then(() => {
            loadLianRewardList()
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
    loadLianRewardList()
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