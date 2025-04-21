<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addCard') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="cardTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('levelId')" prop="level_id">
                        <el-select class="w-[280px]" v-model="cardTable.searchParam.level_id" clearable :placeholder="t('levelIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in levelIdList"
                                       :key="index"
                                       :label="item['level_name']"
                                       :value="item['level_id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('memberId')" prop="member_id">
                        <el-select class="w-[280px]" v-model="cardTable.searchParam.member_id" clearable :placeholder="t('memberIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in memberIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['member_id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('orderId')" prop="order_id">
                        <el-select class="w-[280px]" v-model="cardTable.searchParam.order_id" clearable :placeholder="t('orderIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in orderIdList"
                                       :key="index"
                                       :label="item['order_id']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('cardNo')" prop="card_no">
                        <el-input v-model="cardTable.searchParam.card_no" :placeholder="t('cardNoPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('useTime')" prop="use_time">
                        <el-date-picker v-model="cardTable.searchParam.use_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="cardTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadCardList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="cardTable.data" size="large" v-loading="cardTable.loading">
                    <template #empty>
                        <span>{{ !cardTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="level_id_name" :label="t('levelId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="member_id_name" :label="t('memberId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="order_id_name" :label="t('orderId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="card_no" :label="t('cardNo')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="card_pwd" :label="t('cardPwd')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="use_member_name" :label="t('useMember')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="cardTable.page" v-model:page-size="cardTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="cardTable.total"
                        @size-change="loadCardList()" @current-change="loadCardList" />
                </div>
            </div>

            <edit ref="editCardDialog" @complete="loadCardList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getCardList, deleteCard, getWithMemberLevelList, getWithOrderList, getWithMemberList } from '@/addon/qiankun_vip_card/api/card'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/qiankun_vip_card/views/card/components/card-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let cardTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "level_id":"",
      "member_id":"",
      "order_id":"",
      "card_no":"",
      "use_time":[],
      "create_time":[]
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    

/**
 * 获取会员卡密列表
 */
const loadCardList = (page: number = 1) => {
    cardTable.loading = true
    cardTable.page = page

    getCardList({
        page: cardTable.page,
        limit: cardTable.limit,
         ...cardTable.searchParam
    }).then(res => {
        cardTable.loading = false
        cardTable.data = res.data.data
        cardTable.total = res.data.total
    }).catch(() => {
        cardTable.loading = false
    })
}
loadCardList()

const editCardDialog: Record<string, any> | null = ref(null)

/**
 * 添加会员卡密
 */
const addEvent = () => {
    editCardDialog.value.setFormData()
    editCardDialog.value.showDialog = true
}

/**
 * 编辑会员卡密
 * @param data
 */
const editEvent = (data: any) => {
    editCardDialog.value.setFormData(data)
    editCardDialog.value.showDialog = true
}

/**
 * 删除会员卡密
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('cardDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteCard(id).then(() => {
            loadCardList()
        }).catch(() => {
        })
    })
}

    
    const levelIdList = ref([])
    const setLevelIdList = async () => {
    levelIdList.value = await (await getWithMemberLevelList({})).data
    }
    setLevelIdList()
    const memberIdList = ref([])
    const setMemberIdList = async () => {
    memberIdList.value = await (await getWithMemberList({})).data
    }
    setMemberIdList()
    const orderIdList = ref([])
    const setOrderIdList = async () => {
    orderIdList.value = await (await getWithOrderList({})).data
    }
    setOrderIdList()
    const useMemberList = ref([])
    const setUseMemberList = async () => {
    useMemberList.value = await (await getWithMemberList({})).data
    }
    setUseMemberList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadCardList()
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
