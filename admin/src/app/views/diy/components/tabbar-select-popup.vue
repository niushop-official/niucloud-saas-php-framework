<template>
    <div>
        <div @click="show">
            <slot>
                <el-input v-model="selectData.title" :placeholder="t('请选择底部导航')" readonly class="link-input">
                    <template #suffix>
                        <div @click.stop="clear">
                            <el-icon v-if="selectData.key">
                                <Close />
                            </el-icon>
                            <el-icon v-else>
                                <ArrowRight />
                            </el-icon>
                        </div>
                    </template>
                </el-input>
            </slot>
        </div>
        <el-dialog v-model="showDialog" :title="t('底部导航选择')" width="850px" :destroy-on-close="true" :close-on-click-modal="false">
        <el-table class="" :data="tableData.data" size="large" v-loading="tableData.loading" height="400px">
            <template #empty>
                <span>{{ !tableData.loading ? t('emptyData') : '' }}</span>
            </template>
            <el-table-column min-width="7%">
                <template #default="{ row }">
                    <el-checkbox v-model="row.checked" @change="handleCheckChange($event,row)" />
                </template>
            </el-table-column>
            <el-table-column prop="title" :label="t('title')" min-width="30%" >
                <template #default="{ row }">
                    <span>{{ row.info.title }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="key" :label="t('key')" min-width="30%"/>

            <el-table-column :label="t('type')" min-width="30%">
                <template #default="{ row }">
                    <span>{{ row.info.type === 'app' ? t('app') : t('addon') }}</span>
                </template>
            </el-table-column>
        </el-table>

        <div class="mt-[16px] flex justify-end">
            <el-pagination v-model:current-page="tableData.page" v-model:page-size="tableData.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"
                           @size-change="loadBottomNavList()" @current-change="loadBottomNavList" />
        </div>
        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="save">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
    
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, reactive, nextTick,computed } from 'vue'
import { FormInstance, ElMessage } from "element-plus";
import { getDiyBottomList } from '@/app/api/diy'
import { cloneDeep } from 'lodash-es'

const prop = defineProps({
    modelValue: {
        type: Object,
        default: () => {
            return {
                key: '',
                title: '',
            }
        }
    },
    ignore: {
        type: Array,
        default: []
    }
})

const clear = () => {
    selectData.value = {
        key: '',
        title: ''
    }
    setTimesSelected()
}

const emit = defineEmits(['update:modelValue', 'confirm', 'success'])

const selectData: any = computed({
    get() {
        return prop.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
const searchFormRef = ref<FormInstance>()

const timeListTableRef = ref()
const showDialog = ref(false)
const show = () => {
    showDialog.value = true
    loadBottomNavList()
}

const tableData: any = reactive({
        page: 1,
        limit: 10,
        total: 0,
        loading: true,
        data: [],
    })

    // 获取自定义页面列表
const loadBottomNavList = (page: number = 1) => {
    tableData.loading = true
    tableData.page = page

    getDiyBottomList({}).then(res => {
    tableData.loading = false

        const len = Math.ceil(res.data.length / tableData.limit)
        const data = cloneDeep(res.data)
        const dataGather = []
        for (let i = 0; i < len; i++) {
            dataGather[i] = data.splice(0, tableData.limit)
        }
        tableData.data = dataGather[tableData.page - 1]
        tableData.data.forEach((item: any) => {
            item.checked = item.key == selectData.value.key
        })
        tableData.total = res.data.length
        setTimesSelected();
    }).catch(() => {
        tableData.loading = false
    })
}

loadBottomNavList()
const handleCheckChange = (isSelect: any, row: any) => {
    if (isSelect) {
        selectData.value = {
            key: row.key,
            title: row.info.title
        };
    } else {
        selectData.value = {
            key: '',
            title: ''
        };
    }
    setTimesSelected()
}

// // 表格设置选中状态
const setTimesSelected = () => {
    nextTick(() => {
        for (let i = 0; i < tableData.data.length; i++) {
            tableData.data[i].checked = false
            if (selectData.value.key == tableData.data[i].key) {
                tableData.data[i].checked = true
                selectData.value.key = tableData.data[i].key
                selectData.value.title = tableData.data[i].info.title
            }
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()

    loadBottomNavList()
}

const save = () => {
    if (selectData.value.key == '') {
        ElMessage({
            type: 'warning',
            message: `${ t('请选择底部导航') }`
        })
        return;
    }
   selectData.value = {
        key: selectData.value.key,
        title: selectData.value.title
   }
   showDialog.value = false;

}

defineExpose({
    show,
    showDialog,
})
</script>

<style lang="scss" scoped>
.form-item-wrap {
    margin-right: 10px !important;
    margin-bottom: 10px !important;

    &.last-child {
        margin-right: 0 !important;
    }
}
</style>
