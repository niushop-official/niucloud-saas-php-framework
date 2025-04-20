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
                    
                    <el-form-item :label="t('userId')" prop="user_id">
                        <el-select class="w-[280px]" v-model="cardTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in userIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="cardTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('auditingStatus')" prop="auditing_status">
                        <el-select class="w-[280px]" v-model="cardTable.searchParam.auditing_status" clearable :placeholder="t('auditingStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in auditing_statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('industryId')" prop="industry_id">
                        <el-select class="w-[280px]" v-model="cardTable.searchParam.industry_id" clearable :placeholder="t('industryIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in industryIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model="cardTable.searchParam.name" :placeholder="t('namePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('phone')" prop="phone">
                        <el-input v-model="cardTable.searchParam.phone" :placeholder="t('phonePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('position')" prop="position">
                        <el-input v-model="cardTable.searchParam.position" :placeholder="t('positionPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('email')" prop="email">
                        <el-input v-model="cardTable.searchParam.email" :placeholder="t('emailPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('wechatNum')" prop="wechat_num">
                        <el-input v-model="cardTable.searchParam.wechat_num" :placeholder="t('wechatNumPlaceholder')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('recommend')" prop="recommend">
                        <el-select class="w-[280px]" v-model="cardTable.searchParam.recommend" clearable :placeholder="t('recommendPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in recommendList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('defaultStatus')" prop="default_status">
                        <el-select class="w-[280px]" v-model="cardTable.searchParam.default_status" clearable :placeholder="t('defaultStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in default_statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('connectionsStatus')" prop="connections_status">
                        <el-select class="w-[280px]" v-model="cardTable.searchParam.connections_status" clearable :placeholder="t('connectionsStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in connections_statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('createtime')" prop="createtime">
                        <el-date-picker v-model="cardTable.searchParam.createtime" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadCardList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="cardTable.data" fit size="large" v-loading="cardTable.loading">
                    <template #empty>
                        <span>{{ !cardTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" fixed :label="t('id')" width="80" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="user_id_name" :label="t('userId')" width="140" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('status')" width="120" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('auditingStatus')" width="120" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in auditing_statusList">
                                <div v-if="item.value == row.auditing_status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="industry_id_name" :label="t('industryId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('avatar')" width="100" align="left">
                        <template #default="{ row }">
                            <el-avatar v-if="row.avatar" :src="img(row.avatar)" />
                            <el-avatar v-else icon="UserFilled" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" :label="t('name')" width="160" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('gender')" width="80" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in genderList">
                                <div v-if="item.value == row.gender">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="age" :label="t('age')" width="80" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="phone" :label="t('phone')" width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="position" :label="t('position')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="tags" :label="t('tags')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="email" :label="t('email')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="address" :label="t('address')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="wechat_num" :label="t('wechatNum')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('wechatCodeImage')" width="100" align="left">
                        <template #default="{ row }">
                            <el-avatar v-if="row.wechat_code_image" :src="img(row.wechat_code_image)" />
                            <el-avatar v-else icon="UserFilled" />
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('recommend')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in recommendList">
                                <div v-if="item.value == row.recommend">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('defaultStatus')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in default_statusList">
                                <div v-if="item.value == row.default_status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('connectionsStatus')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in connections_statusList">
                                <div v-if="item.value == row.connections_status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>

                     <el-table-column :label="t('minicodeImage')" width="100" align="left">
                        <template #default="{ row }">
                            <el-avatar v-if="row.minicode_image" :src="img(row.minicode_image)" />
                            <el-avatar v-else icon="UserFilled" />
                        </template>
                    </el-table-column>

                    <el-table-column prop="weigh" :label="t('weigh')" min-width="120" :show-overflow-tooltip="true"/>

                     <el-table-column :label="t('createtime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.createtime || '' }}
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
import { getCardList, deleteCard, getWithUserList, getWithIndustryList, getWithCardbackgroundList } from '@/addon/ttcard/api/card'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/card/components/card-edit.vue'
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
      "user_id":"",
      "status":"",
      "auditing_status":"",
      "industry_id":"",
      "name":"",
      "phone":"",
      "position":"",
      "email":"",
      "wechat_num":"",
      "recommend":"",
      "default_status":"",
      "connections_status":"",
      "createtime":[]
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    const statusList = ref([] as any[])
    const statusDictList = async () => {
    statusList.value = await (await useDictionary('展示状态')).data.dictionary
    }
    statusDictList();
    const auditing_statusList = ref([] as any[])
    const auditing_statusDictList = async () => {
    auditing_statusList.value = await (await useDictionary('名片审核状态')).data.dictionary
    }
    auditing_statusDictList();
    const genderList = ref([] as any[])
    const genderDictList = async () => {
    genderList.value = await (await useDictionary('性别')).data.dictionary
    }
    genderDictList();
    const recommendList = ref([] as any[])
    const recommendDictList = async () => {
    recommendList.value = await (await useDictionary('是否')).data.dictionary
    }
    recommendDictList();
    const default_statusList = ref([] as any[])
    const default_statusDictList = async () => {
    default_statusList.value = await (await useDictionary('是否')).data.dictionary
    }
    default_statusDictList();
    const connections_statusList = ref([] as any[])
    const connections_statusDictList = async () => {
    connections_statusList.value = await (await useDictionary('是否')).data.dictionary
    }
    connections_statusDictList();

/**
 * 获取名片管理列表
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
 * 添加名片管理
 */
const addEvent = () => {
    editCardDialog.value.setFormData()
    editCardDialog.value.showDialog = true
}

/**
 * 编辑名片管理
 * @param data
 */
const editEvent = (data: any) => {
    editCardDialog.value.setFormData(data)
    editCardDialog.value.showDialog = true
}

/**
 * 删除名片管理
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

    
    const userIdList = ref([])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList({})).data
    }
    setUserIdList()
    const industryIdList = ref([])
    const setIndustryIdList = async () => {
    industryIdList.value = await (await getWithIndustryList({})).data
    }
    setIndustryIdList()
    const cardBgIdList = ref([])
    const setCardBgIdList = async () => {
    cardBgIdList.value = await (await getWithCardbackgroundList({})).data
    }
    setCardBgIdList()

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