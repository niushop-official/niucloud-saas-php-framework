<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addRecruit') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="recruitTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('userId')" prop="user_id">
                        <el-select class="w-[280px]" v-model="recruitTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in userIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="recruitTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('recruitStatus')" prop="recruit_status">
                        <el-select class="w-[280px]" v-model="recruitTable.searchParam.recruit_status" clearable :placeholder="t('recruitStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in recruit_statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('websiteId')" prop="website_id">
                        <el-select class="w-[280px]" v-model="recruitTable.searchParam.website_id" clearable :placeholder="t('websiteIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in websiteIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('industryId')" prop="industry_id">
                        <el-select class="w-[280px]" v-model="recruitTable.searchParam.industry_id" clearable :placeholder="t('industryIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in industryIdList"
                                       :key="index"
                                       :label="item['name']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('title')" prop="title">
                        <el-input v-model="recruitTable.searchParam.title" :placeholder="t('titlePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('position')" prop="position">
                        <el-input v-model="recruitTable.searchParam.position" :placeholder="t('positionPlaceholder')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('typeStatus')" prop="type_status">
                        <el-select class="w-[280px]" v-model="recruitTable.searchParam.type_status" clearable :placeholder="t('typeStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in type_statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('education')" prop="education">
                        <el-input v-model="recruitTable.searchParam.education" :placeholder="t('educationPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="recruitTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadRecruitList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="recruitTable.data" size="large" v-loading="recruitTable.loading">
                    <template #empty>
                        <span>{{ !recruitTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" width="60" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="user_id_name" :label="t('userId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('status')" width="120" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('recruitStatus')" width="120" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in recruit_statusList">
                                <div v-if="item.value == row.recruit_status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('typeStatus')" width="120" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in type_statusList">
                                <div v-if="item.value == row.type_status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="industry_id_name" :label="t('industryId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="website_id_name" :label="t('websiteId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    
                    
                    <el-table-column prop="scale" :label="t('scale')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="title" :label="t('title')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="position" :label="t('position')" width="150" :show-overflow-tooltip="true"/>
                    
                    
                    
                    <el-table-column prop="education" :label="t('education')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="city" :label="t('city')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="address" :label="t('address')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="age" :label="t('age')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="month_salary" :label="t('monthSalary')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="tags" :label="t('tags')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('createTime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.create_time || '' }}
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
                    <el-pagination v-model:current-page="recruitTable.page" v-model:page-size="recruitTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="recruitTable.total"
                        @size-change="loadRecruitList()" @current-change="loadRecruitList" />
                </div>
            </div>

            
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getRecruitList, deleteRecruit, getWithUserList, getWithWebsiteList, getWithIndustryList } from '@/addon/ttcard/api/recruit'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let recruitTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "user_id":"",
      "status":"",
      "recruit_status":"",
      "website_id":"",
      "industry_id":"",
      "title":"",
      "position":"",
      "type_status":"",
      "education":"",
      "create_time":""
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
    const recruit_statusList = ref([] as any[])
    const recruit_statusDictList = async () => {
    recruit_statusList.value = await (await useDictionary('招聘状态')).data.dictionary
    }
    recruit_statusDictList();
    const type_statusList = ref([] as any[])
    const type_statusDictList = async () => {
    type_statusList.value = await (await useDictionary('应聘类型')).data.dictionary
    }
    type_statusDictList();

/**
 * 获取招聘管理列表
 */
const loadRecruitList = (page: number = 1) => {
    recruitTable.loading = true
    recruitTable.page = page

    getRecruitList({
        page: recruitTable.page,
        limit: recruitTable.limit,
         ...recruitTable.searchParam
    }).then(res => {
        recruitTable.loading = false
        recruitTable.data = res.data.data
        recruitTable.total = res.data.total
    }).catch(() => {
        recruitTable.loading = false
    })
}
loadRecruitList()

const router = useRouter()

/**
 * 添加招聘管理
 */
const addEvent = () => {
    router.push('/recruit/recruit_edit')
}

/**
 * 编辑招聘管理
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/recruit/recruit_edit?id='+data.id)
}

/**
 * 删除招聘管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('recruitDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteRecruit(id).then(() => {
            loadRecruitList()
        }).catch(() => {
        })
    })
}

    
    const userIdList = ref([])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList({})).data
    }
    setUserIdList()
    const websiteIdList = ref([])
    const setWebsiteIdList = async () => {
    websiteIdList.value = await (await getWithWebsiteList({})).data
    }
    setWebsiteIdList()
    const industryIdList = ref([])
    const setIndustryIdList = async () => {
    industryIdList.value = await (await getWithIndustryList({})).data
    }
    setIndustryIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadRecruitList()
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
