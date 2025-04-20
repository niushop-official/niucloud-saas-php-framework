<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addBiographical') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="biographicalTable.searchParam" ref="searchFormRef">
                    
                    <el-form-item :label="t('userId')" prop="user_id">
                        <el-select class="w-[280px]" v-model="biographicalTable.searchParam.user_id" clearable :placeholder="t('userIdPlaceholder')">
                           <el-option
                                       v-for="(item, index) in userIdList"
                                       :key="index"
                                       :label="item['nickname']"
                                       :value="item['id']"
                                   />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="biographicalTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model="biographicalTable.searchParam.name" :placeholder="t('namePlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('phone')" prop="phone">
                        <el-input v-model="biographicalTable.searchParam.phone" :placeholder="t('phonePlaceholder')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('genderStatus')" prop="gender_status">
                        <el-select class="w-[280px]" v-model="biographicalTable.searchParam.gender_status" clearable :placeholder="t('genderStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in gender_statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('email')" prop="email">
                        <el-input v-model="biographicalTable.searchParam.email" :placeholder="t('emailPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('wechatNum')" prop="wechat_num">
                        <el-input v-model="biographicalTable.searchParam.wechat_num" :placeholder="t('wechatNumPlaceholder')" />
                    </el-form-item>
                    <el-form-item :label="t('position')" prop="position">
                        <el-input v-model="biographicalTable.searchParam.position" :placeholder="t('positionPlaceholder')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('typeStatus')" prop="type_status">
                        <el-select class="w-[280px]" v-model="biographicalTable.searchParam.type_status" clearable :placeholder="t('typeStatusPlaceholder')">
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
                        <el-input v-model="biographicalTable.searchParam.education" :placeholder="t('educationPlaceholder')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('unemployedStatus')" prop="unemployed_status">
                        <el-select class="w-[280px]" v-model="biographicalTable.searchParam.unemployed_status" clearable :placeholder="t('unemployedStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in unemployed_statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item :label="t('createTime')" prop="create_time">
                        <el-date-picker v-model="biographicalTable.searchParam.create_time" type="datetimerange" format="YYYY-MM-DD hh:mm:ss"
                            :start-placeholder="t('startDate')" :end-placeholder="t('endDate')" />
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadBiographicalList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="biographicalTable.data" size="large" v-loading="biographicalTable.loading">
                    <template #empty>
                        <span>{{ !biographicalTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" fixed :label="t('id')" width="60" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="user_id_name" :label="t('userId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('status')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="name" :label="t('name')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="phone" :label="t('phone')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('avatar')" width="100" align="left">
                        <template #default="{ row }">
                            <el-avatar v-if="row.avatar" :src="img(row.avatar)" />
                            <el-avatar v-else icon="UserFilled" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="age" :label="t('age')" width="80" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('genderStatus')" width="80" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in gender_statusList">
                                <div v-if="item.value == row.gender_status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="email" :label="t('email')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="wechat_num" :label="t('wechatNum')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="position" :label="t('position')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="expected" :label="t('expected')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="working" :label="t('working')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('typeStatus')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in type_statusList">
                                <div v-if="item.value == row.type_status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="education" :label="t('education')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="city" :label="t('city')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('unemployedStatus')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in unemployed_statusList">
                                <div v-if="item.value == row.unemployed_status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="delive_num" :label="t('deliveNum')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="view_num" :label="t('viewNum')" min-width="120" :show-overflow-tooltip="true"/>
                    
                     <el-table-column :label="t('reporttime')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            {{ row.reporttime || '' }}
                        </template>
                    </el-table-column>
                    
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
                    <el-pagination v-model:current-page="biographicalTable.page" v-model:page-size="biographicalTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="biographicalTable.total"
                        @size-change="loadBiographicalList()" @current-change="loadBiographicalList" />
                </div>
            </div>

            
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getBiographicalList, deleteBiographical, getWithUserList } from '@/addon/ttcard/api/biographical'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let biographicalTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "user_id":"",
      "status":"",
      "name":"",
      "phone":"",
      "gender_status":"",
      "email":"",
      "wechat_num":"",
      "position":"",
      "type_status":"",
      "education":"",
      "unemployed_status":"",
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
    const gender_statusList = ref([] as any[])
    const gender_statusDictList = async () => {
    gender_statusList.value = await (await useDictionary('性别')).data.dictionary
    }
    gender_statusDictList();
    const type_statusList = ref([] as any[])
    const type_statusDictList = async () => {
    type_statusList.value = await (await useDictionary('应聘类型')).data.dictionary
    }
    type_statusDictList();
    const unemployed_statusList = ref([] as any[])
    const unemployed_statusDictList = async () => {
    unemployed_statusList.value = await (await useDictionary('是否待业')).data.dictionary
    }
    unemployed_statusDictList();

/**
 * 获取简历管理列表
 */
const loadBiographicalList = (page: number = 1) => {
    biographicalTable.loading = true
    biographicalTable.page = page

    getBiographicalList({
        page: biographicalTable.page,
        limit: biographicalTable.limit,
         ...biographicalTable.searchParam
    }).then(res => {
        biographicalTable.loading = false
        biographicalTable.data = res.data.data
        biographicalTable.total = res.data.total
    }).catch(() => {
        biographicalTable.loading = false
    })
}
loadBiographicalList()

const router = useRouter()

/**
 * 添加简历管理
 */
const addEvent = () => {
    router.push('/biographical/biographical_edit')
}

/**
 * 编辑简历管理
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/biographical/biographical_edit?id='+data.id)
}

/**
 * 删除简历管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('biographicalDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteBiographical(id).then(() => {
            loadBiographicalList()
        }).catch(() => {
        })
    })
}

    
    const userIdList = ref([])
    const setUserIdList = async () => {
    userIdList.value = await (await getWithUserList({})).data
    }
    setUserIdList()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadBiographicalList()
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