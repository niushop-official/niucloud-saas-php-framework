<template>
    <div class="w-full h-full">
        <div @click="openDialog" class="cursor-pointer w-full h-full flex flex-col justify-center items-center">
            <slot></slot>
        </div>
        <el-dialog v-model="showDialog" :title="t('selectMaterial')" width="1070px" class="material-dialog" :destroy-on-close="true">
            <div class="flex flex-row items-center group-list">
                <el-button :type="materialTable.searchParam.group_id==''?'primary':''" @click="groupClick('')">全部</el-button>
                <template v-for="item in groupOptions" :key="item.group_id">
                    <el-button :type="materialTable.searchParam.group_id==item.group_id?'primary':''" @click="groupClick(item.group_id)">{{ item.group_name }}</el-button>
                </template>
            </div>
            <el-scrollbar class="!h-[40vh]">
                <div class="flex flex-wrap">
                    <div class="w-[247.50px] mb-[10px] mx-[5px]" v-for="(item, index) in materialTable.data" :key="item.material_id">
                        <div class="material-wrap w-full rounded cursor-pointer overflow-hidden relative flex items-center justify-center h-[120px]" @click="selectFile(item)">
                            <el-image v-if="operate" :src="img(item.url)" fit="contain" />
                            <el-image v-else :src="img(item.url)" fit="contain"/>
                            <div class="absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60" v-show="selectedFile[item.material_id]">
                                <icon name="element Select" color="#fff" size="40px" />
                                <div class="file-box-active absolute z-[1] bottom-0 right-0 w-full h-full">
                                    <span class="absolute bottom-[2px] right-[2px] text-white z-[2] leading-none">{{ getFileIndex(item.material_id) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
            <template #footer>
                <div class="flex justify-between items-center">
                    <el-pagination v-model:current-page="materialTable.page" v-model:page-size="materialTable.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="materialTable.total"
                    @size-change="loadMaterialList()" @current-change="loadMaterialList" />
                    <span class="dialog-footer">
                        <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                        <el-button type="primary" @click="confirm">{{ t('confirm') }}</el-button>
                    </span>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref,toRaw } from 'vue'
import { t } from '@/lang'
import { getMaterialPageList, getMaterialGroupList } from '@/addon/shop_giftcard/api/material'
import { img,deepClone } from '@/utils/common'
import { ElMessage } from 'element-plus'

const prop = defineProps({
    // 选择数量限制
    limit: {
        type: Number,
        default: 1
    }
})

const showDialog = ref(false)
const materialTable = reactive({
    page: 1,
    limit: 20,
    total: 0,
    loading: true,
    data: [],
    searchParam:{
      "group_id":"",
    }
})
const openDialog = () => {
    showDialog.value = true
    clearSelected()
}
// 素材分组
const groupOptions: any = ref([])

const refreshGroup = () =>{
    getMaterialGroupList({}).then(res=>{
        const data = res.data
        if (data) groupOptions.value = data
    })
}
refreshGroup()
const groupClick = (group_id:string)=>{
    materialTable.searchParam.group_id = group_id
    loadMaterialList()
}

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
// 选中的礼品卡素材
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
    if (selectedFile.value[data.material_id]) {
        delete selectedFile.value[data.material_id]
        selectedFileIndex.value.splice(selectedFileIndex.value.indexOf(data.material_id),1);
    } else {
        const keys = Object.keys(toRaw(selectedFile.value))
        const length = keys.length
        if (prop.limit == 1 && length == prop.limit) {
            delete selectedFile.value[keys[0]]
            selectedFileIndex.value.splice(selectedFileIndex.value.indexOf(keys[0]),1);
        } else if (prop.limit && length >= prop.limit) {
            ElMessage.info(t('upload.triggerUpperLimit'))
            return
        }
        selectedFile.value[data.material_id] = toRaw(data)
        selectedFileIndex.value.push(data.material_id);
    }
}
const emit = defineEmits(['confirm'])

/**
 * 确认选择
 */
const confirm = () => {
    showDialog.value = false

    let filesObj = selectedFile.value || {};
    let filesIndexObj = selectedFileIndex.value || {};
    // 整理图片顺序
    let arr = [];
    Object.values(filesIndexObj).forEach((item,index)=>{
        for(let key in filesObj){
            if(item == key){
                arr.push(deepClone(filesObj[key]))
            }
        }
    })

    emit('confirm', prop.limit == 1 ? arr[0] ?? null : arr)
}
/**
 * 清空选中礼品卡素材
 */
 const clearSelected = () => {
    selectedFile.value = {}
    selectedFileIndex.value = []
}
defineExpose({
    showDialog
})
</script>

<style lang="scss">
.material-dialog {
    .group-list{
        .el-button{
            margin-bottom: 20px;
        }
    }
    .el-upload-list {
        position: absolute;
        z-index: 5;
    }

    .el-upload-list__item {
        background: var(--el-dialog-bg-color);
        box-shadow: var(--el-dialog-box-shadow);
    }

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
}
</style>
