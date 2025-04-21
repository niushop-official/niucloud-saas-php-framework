<template>
    <div class="main-container material">
        <el-card class="box-card !border-none full-container" shadow="never">
            <div class="flex flex-col h-full">

                <div class="flex justify-between items-center">
                    <span class="text-lg">{{pageName}}</span>
                    <el-button type="primary" @click="addEvent">
                        {{ t('addMaterial') }}
                    </el-button>
                </div>

                <el-tabs class="demo-tabs" model-value="/shop_giftcard/material" @tab-change="handleClick">
                    <el-tab-pane :label="t('list')" name="/shop_giftcard/material" />
                    <el-tab-pane :label="t('group')" name="/shop_giftcard/material/group" />
                </el-tabs>

                <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                    <div class="flex justify-between items-center">
                        <el-form :inline="true" :model="materialTable.searchParam" ref="searchFormRef">

                            <el-form-item :label="t('materialId')" prop="group_id">
                                <el-select v-model="materialTable.searchParam.group_id" :placeholder="t('materialGroupIdPlaceholder')" clearable>
                                    <el-option v-for="item in groupOptions" :key="item.group_id" :label="item.group_name" :value="item.group_id" />
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="formSearch()">{{ t('search') }}</el-button>
                                <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                            </el-form-item>
                        </el-form>
                        <el-button v-if="operate === false" class="ml-[10px]" type="primary" @click="editClick">{{ t('edit') }}</el-button>
                        <el-button v-else class="ml-[10px]" type="primary" @click="editClick">{{ t('complete') }}</el-button>
                    </div>
                </el-card>

                <el-scrollbar class="flex-1">
                    <div class="flex flex-wrap gap-x-[10px] gap-y-[10px]" v-if="materialTable.data.length">
                        <div class="w-[257.50px]" v-for="(item, index) in materialTable.data" :key="item.material_id">
                            <div class="material-wrap w-full rounded cursor-pointer overflow-hidden relative flex items-center justify-center h-[120px]" @click="selectFile(item)">
                                <el-image v-if="operate" :src="img(item.url)" fit="contain" />
                                <el-image v-else :src="img(item.url)" fit="contain" :preview-src-list="item.image_list"/>
                                <div class="absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60" v-show="selectedFile[item.material_id]">
                                    <icon name="element Select" color="#fff" size="40px" />
                                    <div class="file-box-active absolute z-[1] bottom-0 right-0 w-full h-full">
                                        <span class="absolute bottom-[2px] right-[2px] text-white z-[2] leading-none">{{ getFileIndex(item.material_id) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center items-center mt-[19%]"  v-if="!materialTable.data.length && !materialTable.loading">
                        <div class="flex flex-col justify-center items-center">
                            <img src="@/app/assets/images/no_attachment.png" class="max-w-[160px] max-h-[120px] mb-[15px]">
                            <span class="text-[var(--el-text-color-secondary)] text-[14px]">{{t('materialCartEmpty')}}</span>
                        </div>
                    </div>
                    
                </el-scrollbar>
                <div class="flex justify-between items-center mt-[16px]">
                    <div>
                        <div class="flex items-center" v-if="operate">
                            <el-checkbox v-model="selectAll" :label="t('selectAll')" size="large" />
                            <el-button class="ml-[15px]" @click="deleteEvent">{{ t('delete') }}</el-button>
                            <el-button @click="moveMaterialEvent">{{ t('move') }}</el-button>
                        </div>
                    </div>
                    <el-pagination v-model:current-page="materialTable.page" v-model:page-size="materialTable.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="materialTable.total"
                        @size-change="loadMaterialList()" @current-change="loadMaterialList" />
                </div>
            </div>
            <edit ref="editMaterialDialog" @complete="loadMaterialList" />
            <Move ref="MoveMaterialDialog"  @complete="moveLoadMaterial" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref,toRaw,watch } from 'vue'
import { t } from '@/lang'
import { getMaterialPageList, deleteMaterial,getMaterialGroupList } from '@/addon/shop_giftcard/api/material'
import { img } from '@/utils/common'
import { ElMessage,ElMessageBox,FormInstance } from 'element-plus'
import Edit from '@/addon/shop_giftcard/views/giftcard/components/material-edit.vue'
import Move from '@/addon/shop_giftcard/views/giftcard/components/material-move.vue'
import { useRoute,useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const pageName = route.meta.title;

const materialTable = reactive({
    page: 1,
    limit: 30,
    total: 0, 
    loading: true,
    data: [],
    searchParam:{
      "group_id":"",
    }
})

const searchFormRef = ref<FormInstance>()

// 素材分组列表下拉框
const groupOptions: any = reactive([])

const refreshGroup = () =>{
    getMaterialGroupList({}).then(res=>{
        const data = res.data
        if (data) {
            groupOptions.splice(0, groupOptions.length, ...data)
        }
    })
}

refreshGroup()

/**
 * 获取礼品卡素材列表
 */
const loadMaterialList = (page: number = 1) => {
    materialTable.loading = true
    materialTable.page = page

    getMaterialPageList({
        page: materialTable.page,
        limit: materialTable.limit,
         ...materialTable.searchParam
    }).then((res: any) => {
        materialTable.loading = false
        materialTable.data = res.data.data
        materialTable.data.forEach((item:any)=>{
            item.image_list = []
            item.image_list.push(img(item.url))
        })
        materialTable.total = res.data.total
    }).catch(() => {
        materialTable.loading = false
    })
}

loadMaterialList()

const editMaterialDialog: Record<string, any> | null = ref(null)

/**
 * 添加礼品卡素材
 */
const addEvent = () => {
    initOperateClick();
    editMaterialDialog.value.setFormData()
    editMaterialDialog.value.showDialog = true
}

//点击编辑礼品卡按钮
const editClick=()=>{
    operate.value = !operate.value
    if(selectedFileIndex.value.length) clearSelected()
}

//点击初始化礼品卡按钮
const initOperateClick=()=>{
    operate.value = false;
    if(selectedFileIndex.value.length) clearSelected()
}

// 选中的礼品卡素材
const operate = ref(false)
const selectedFile: Record<string, any> = ref({})

const selectedFileIndex:any = ref([])
// 获取礼品卡素材的下标
const getFileIndex = (material_id:any)=>{
    let index = selectedFileIndex.value.indexOf(material_id);
    if(index == -1) return 0;
    return index + 1;
}
/**
 * 选择礼品卡素材
 */
const selectFile = (data: any) => {
    if(!operate.value) return
    if (selectedFile.value[data.material_id]) {
        delete selectedFile.value[data.material_id]
        selectedFileIndex.value.splice(selectedFileIndex.value.indexOf(data.material_id),1);
    } else {
        selectedFile.value[data.material_id] = toRaw(data)
        selectedFileIndex.value.push(data.material_id);
    }
}

// 全选礼品卡素材
const selectAll = ref(false)
watch(selectAll, () => {
    if (selectAll.value) {
        const keys = Object.keys(toRaw(selectedFile.value))
        materialTable.data.forEach((item: Record<string, any>) => {
            if (!keys.includes(item.material_id)) {
                selectedFile.value[item.material_id] = toRaw(item)
                selectedFileIndex.value.push(item.material_id)
            }
        })
    } else {
        clearSelected()
    }
})

/**
 * 清空选中礼品卡素材
 */
 const clearSelected = () => {
    selectedFile.value = {}
    selectedFileIndex.value = []
}

const MoveMaterialDialog = ref()

const moveMaterialEvent = () => {
    if (!selectedFileIndex.value.length) {
        ElMessage({ message: t('materialIdPlaceholder'), type: 'warning' })
        return
    }
    MoveMaterialDialog.value?.setFormData(selectedFileIndex.value)
}
/**
 
/**
 * 编辑礼品卡素材
 * @param data
 */
const editEvent = (data: any) => {
    editMaterialDialog.value.setFormData(data)
    editMaterialDialog.value.showDialog = true
}

const moveLoadMaterial = () =>{
    editClick();
    loadMaterialList();
}

/**
 * 删除礼品卡素材
 */
const deleteEvent = () => {
    if (!selectedFileIndex.value.length) {
        ElMessage({ message: t('materialIdPlaceholder'), type: 'warning' })
        return
    }
    ElMessageBox.confirm(t('materialDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning',
        }
    ).then(() => {
        deleteMaterial({
            material_ids: selectedFileIndex.value.toString()
        }).then(() => {
            loadMaterialList()
        })
    })
}

const handleClick = (path: string) => {
    router.push({ path })
}

const formSearch = ()=>{
    initOperateClick();
    loadMaterialList();
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    initOperateClick();
    loadMaterialList()
}
</script>

<style lang="scss">
.material {
        overflow: hidden;
        min-height: calc(100vh - 94px);
        background-color: var(--el-bg-color-overlay);

        .full-container {
            height: calc(100vh - 100px);
        }

		.el-card__body {
			height: 100%;
		}
        .material-wrap {
            background-color: var(--el-border-color-extra-light);
            .file-box-active:after {
                content: "";
                display: block;
                position: absolute;
                border: 15px solid;
                border-bottom-color: var(--el-color-primary);
                border-right-color: var(--el-color-primary);
                border-top-color: transparent;
                border-left-color: transparent;
                bottom: 0;
                right: 0;
            }
        }
		// .el-tabs {
		// 	display: flex;
        //     flex-direction: column;
        //     height: calc(100% - 40px);
		// }

		// .el-tabs__content {
		// 	flex: 1;

		// 	.el-tab-pane {
		// 		height: 100%;
		// 	}
		// }
	}
</style>
