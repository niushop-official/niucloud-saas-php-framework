<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addLevel') }}
                </el-button>
            </div>

            <div class="mt-[10px]">
                <el-table :data="levelTable.data" size="large" v-loading="levelTable.loading">
                    <template #empty>
                        <span>{{ !levelTable.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="level_id" :label="t('levelId')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <el-table-column prop="level_name" :label="t('levelName')" min-width="120" :show-overflow-tooltip="true"/>
                    
                    <!-- <el-table-column prop="level_num" :label="t('levelNum')" min-width="120" :show-overflow-tooltip="true"/> -->
                    
                    <el-table-column :label="t('levelArea')" min-width="180" align="center" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-for="(option, index) in levelAreaOptions">
                                <div v-if="option.value == row.level_area">{{ option.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="level_rate" :label="t('levelRate')" min-width="120" :show-overflow-tooltip="true"/>


                    <el-table-column prop="level_text" :label="t('upgradeConditions')" min-width="200">
                        <template #default="{ row }">
                            <div class="flex flex-col">
                                <span v-for="(item, index) in row.level_text.list" :key="index">{{item}}{{row.level_text.list.length != index+1 ? row.level_text.text : ''}}</span>
                            </div>
                        </template>
                    </el-table-column>                   

                    <!-- 等级开关状态 -->
                    <el-table-column :label="t('status')" min-width="150">
                        <template #default="{ row }">
                            <el-switch v-model="row.status" :active-value="1" :inactive-value="0"
                                @change="statusChange(row, $event)" />
                            <span style="padding-left: 5px;">{{ row.status ? t('开启') : t('关闭')}}</span>
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="t('operation')" fixed="right" min-width="120">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.level_id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="levelTable.page" v-model:page-size="levelTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="levelTable.total"
                        @size-change="loadLevelList()" @current-change="loadLevelList" />
                </div>
            </div>

            
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { t } from '@/lang'
import { useDictionary } from '@/app/api/dict'
import { getLevelList, deleteLevel, updateLevelStatus } from '@/addon/ly_area/api/level'
import { getAreaConfig } from '@/addon/ly_area/api/config'
import { img } from '@/utils/common'
import { ElMessageBox,FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = route.meta.title;

let levelTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "level_name":"",
      "level_area":"",
      "status":"",
      "create_time":[]
    }
})

const searchFormRef = ref<FormInstance>()

// 选中数据
const selectData = ref<any[]>([])

// 字典数据
    // const level_areaList = ref([] as any[])
    // const level_areaDictList = async () => {
    // level_areaList.value = await (await useDictionary('area')).data.dictionary
    // }
    // level_areaDictList();
    // const statusList = ref([] as any[])
    // const statusDictList = async () => {
    // statusList.value = await (await useDictionary('is_open')).data.dictionary
    // }
    // statusDictList();

// 自定义代理区域选项
const levelAreaOptions = ref([
    { value: 1, name: '省级' },
    { value: 2, name: '市级' },
    { value: 3, name: '区级' },
    { value: 4, name: '街道' }
])


/**
 * 获取区域代理等级列表
 */
const loadLevelList = (page: number = 1) => {
    levelTable.loading = true
    levelTable.page = page

    getLevelList({
        page: levelTable.page,
        limit: levelTable.limit,
         ...levelTable.searchParam
    }).then(res => {
        levelTable.loading = false
        levelTable.data = res.data.data
        levelTable.total = res.data.total
    }).catch(() => {
        levelTable.loading = false
    })
}
loadLevelList()

const router = useRouter()

/**
 * 添加区域代理等级
 */
const addEvent = () => {
    router.push('/ly_area/level_edit')
}

/**
 * 编辑区域代理等级
 * @param data
 */
const editEvent = (data: any) => {
    router.push('/ly_area/level_edit?id='+data.level_id)
}

// const editEvent = (id:Number)=>{
//     router.push(`/ly_area/level_edit?id=${id}`)
// }

const statusChange = (row: any, value: boolean) => {
    // 更新该行的状态
    row.status = value? 1 : 0;
    // 这里可以调用更新状态的 API，假设更新 API 为 updateLevelStatus
    updateLevelStatus(row).then(() => {
        // 更新成功后可以重新加载列表或进行其他操作
        loadLevelList();
    }).catch(() => {
        // 处理错误情况
        ElMessageBox.error(t('updateStatusFailed'));
        // 可以将状态恢复为原来的值
        row.status =!value? 1 : 0;
    });
}

/**
 * 删除区域代理等级
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('levelDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteLevel(id).then(() => {
            loadLevelList()
        }).catch(() => {
        })
    })
}

    

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadLevelList()
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