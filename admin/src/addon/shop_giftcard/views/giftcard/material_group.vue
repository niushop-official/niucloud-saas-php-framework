<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-lg">{{pageName}}</span>
                <el-button type="primary" @click="addEvent">
                    {{ t('addMaterialGroup') }}
                </el-button>
            </div>

            <el-tabs class="demo-tabs" model-value="/shop_giftcard/material/group" @tab-change="handleClick">
                <el-tab-pane :label="t('list')" name="/shop_giftcard/material" />
                <el-tab-pane :label="t('group')" name="/shop_giftcard/material/group" />
            </el-tabs>

            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <el-form :inline="true" :model="materialGroupTable.searchParam" ref="searchFormRef">
                    <el-form-item :label="t('groupName')" prop="group_name">
                        <el-input v-model.trim="materialGroupTable.searchParam.group_name" :placeholder="t('groupNamePlaceholder')" maxlength="20"/>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="loadMaterialGroupList()">{{ t('search') }}</el-button>
                        <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="mt-[10px]">
                <el-table :data="materialGroupTable.data" size="large" v-loading="materialGroupTable.loading">
                    <template #empty>
                        <span>{{ !materialGroupTable.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="group_name" :label="t('groupName')" min-width="200" :show-overflow-tooltip="true"/>

                    <el-table-column prop="sort" :label="t('sort')" min-width="150" sortable="custom">
                        <template #default="{ row }">
                            <el-input v-model.trim="row.sort" class="!w-[120px]" maxlength="8" @blur="sortInputListener(row.sort, row)" />
                        </template>
                    </el-table-column>

                    <el-table-column prop="create_time" :label="t('createTime')" min-width="200" sortable="custom">
                        <template #default="{ row }">
                            <div>{{ row.create_time }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('operation')" fixed="right" width="150">
                       <template #default="{ row }">
                           <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                           <el-button type="primary" link @click="deleteEvent(row.group_id)">{{ t('delete') }}</el-button>
                       </template>
                    </el-table-column>

                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="materialGroupTable.page" v-model:page-size="materialGroupTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="materialGroupTable.total"
                        @size-change="loadMaterialGroupList()" @current-change="loadMaterialGroupList" />
                </div>
            </div>

            <edit ref="editMaterialGroupDialog" @complete="loadMaterialGroupList" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getMaterialGroupPageList, deleteMaterialGroup,modifyMaterialGroupSort } from '@/addon/shop_giftcard/api/material'
import { ElMessage,ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/shop_giftcard/views/giftcard/components/material-group-edit.vue'
import { useRoute,useRouter } from 'vue-router'
import { debounce  } from '@/utils/common'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title;

let materialGroupTable = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "group_name":"",
    }
})

const searchFormRef = ref<FormInstance>()

/**
 * 获取礼品卡素材分组列表
 */
const loadMaterialGroupList = (page: number = 1) => {
    materialGroupTable.loading = true
    materialGroupTable.page = page

    getMaterialGroupPageList({
        page: materialGroupTable.page,
        limit: materialGroupTable.limit,
         ...materialGroupTable.searchParam
    }).then(res => {
        materialGroupTable.loading = false
        materialGroupTable.data = res.data.data
        materialGroupTable.total = res.data.total
    }).catch(() => {
        materialGroupTable.loading = false
    })
}
loadMaterialGroupList()

const editMaterialGroupDialog: Record<string, any> | null = ref(null)

/**
 * 添加礼品卡素材分组
 */
const addEvent = () => {
    editMaterialGroupDialog.value.setFormData()
    editMaterialGroupDialog.value.showDialog = true
}

/**
 * 编辑礼品卡素材分组
 * @param data
 */
const editEvent = (data: any) => {
    editMaterialGroupDialog.value.setFormData(data)
    editMaterialGroupDialog.value.showDialog = true
}

/**
 * 删除礼品卡素材分组
 */
const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('materialGroupDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteMaterialGroup(id).then(() => {
            loadMaterialGroupList()
        }).catch(() => {
        })
    })
}

// 修改排序号
const sortInputListener = debounce((sort, row) => {
    if (isNaN(sort) || !/^\d{0,10}$/.test(sort)) {
        ElMessage({
            type: 'warning',
            message: `${ t('sortTips') }`
        })
        return
    }
    if (sort > 99999999) {
        row.sort = 99999999
    }
    modifyMaterialGroupSort({
        group_id: row.group_id,
        sort
    }).then((res) => {
    })
})

const handleClick = (path: string) => {
    router.push({ path })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    loadMaterialGroupList()
}
</script>

<style lang="scss" scoped>
</style>
