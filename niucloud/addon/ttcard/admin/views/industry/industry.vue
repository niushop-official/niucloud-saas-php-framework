<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addIndustry') }}
                </el-button>
            </div>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="industryTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('name')" prop="name">
                        <el-input v-model="industryTable.searchParam.name" :placeholder="t('namePlaceholder')" />
                    </el-form-item>
                    
                    <el-form-item :label="t('flagStatus')" prop="flag_status">
                        <el-select class="w-[280px]" v-model="industryTable.searchParam.flag_status" clearable :placeholder="t('flagStatusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in flag_statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    
                    <el-form-item :label="t('status')" prop="status">
                        <el-select class="w-[280px]" v-model="industryTable.searchParam.status" clearable :placeholder="t('statusPlaceholder')">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="loadIndustryList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="industryTable.data" size="large" v-loading="industryTable.loading">
                    <template #empty>
                        <span>{{ !industryTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="id" :label="t('id')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="name" :label="t('name')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column :label="t('flagStatus')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in flag_statusList">
                                <div v-if="item.value == row.flag_status">{{ item.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('status')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(item, index) in statusList">
                                <div v-if="item.value == row.status">{{ item.name }}</div>
                            </div>
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
                    <el-pagination v-model:current-page="industryTable.page" v-model:page-size="industryTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="industryTable.total"
                        @size-change="loadIndustryList()" @current-change="loadIndustryList" />
                </div>
            </div>

            <edit ref="editIndustryDialog" @complete="loadIndustryList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getIndustryList, deleteIndustry } from '@/addon/ttcard/api/industry'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/ttcard/views/industry/components/industry-edit.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let industryTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "name":"",
      "flag_status":"",
      "status":""
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    const flag_statusList = ref([] as any[])
    const flag_statusDictList = async () => {
    flag_statusList.value = await (await useDictionary('标识置顶热门')).data.dictionary
    }
    flag_statusDictList();
    const statusList = ref([] as any[])
    const statusDictList = async () => {
    statusList.value = await (await useDictionary('展示状态')).data.dictionary
    }
    statusDictList();

/**
 * 获取行业管理列表
 */
const loadIndustryList = (page: number = 1) => {
    industryTable.loading = true
    industryTable.page = page

    getIndustryList({
        page: industryTable.page,
        limit: industryTable.limit,
         ...industryTable.searchParam
    }).then(res => {
        industryTable.loading = false
        industryTable.data = res.data.data
        industryTable.total = res.data.total
    }).catch(() => {
        industryTable.loading = false
    })
}
loadIndustryList()

const editIndustryDialog: Record<string, any> | null = ref(null)

/**
 * 添加行业管理
 */
const addEvent = () => {
    editIndustryDialog.value.setFormData()
    editIndustryDialog.value.showDialog = true
}

/**
 * 编辑行业管理
 * @param data
 */
const editEvent = (data: any) => {
    editIndustryDialog.value.setFormData(data)
    editIndustryDialog.value.showDialog = true
}

/**
 * 删除行业管理
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('industryDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteIndustry(id).then(() => {
            loadIndustryList()
        }).catch(() => {
        })
    })
}

    

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadIndustryList()
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
