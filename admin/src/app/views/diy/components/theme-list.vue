<template>
    <el-dialog v-model="dialogThemeVisible" :title="dialogTitle" width="535px" align-center class="custom-theme-dialog" @close="cancelFn">
        <div class="flex flex-col items-baseline">
            <div class="flex items-center flex-wrap max-h-[365px] overflow-auto [&>:nth-child(3n)]:mr-0">
                <div :key="tempIndex" v-for="(tempItem, tempIndex) in themeTemp"
                     class="flex flex-col border-[1px] border-solid border-[#dcdee2] rounded-[4px] px-[10px] pt-[10px] pb-[15px] mr-[10px] cursor-pointer my-[5px]"
                     :class="{ '!border-[var(--el-color-primary)]': currTheme.id == tempItem.id }"
                     @click="themeTempChange(tempItem)">
                    <div class="flex justify-between pb-[5px]">
                        <div class="text-[14px] text-[#666] max-w-[85px] whitespace-nowrap overflow-hidden text-ellipsis" :class="{ '!text-[#333]': currTheme.id == tempItem.id }">{{ tempItem.title }}</div>
                        <div>
                            <span class="iconfont iconshanchu-fanggaiV6xx !text-[14px] text-[#999]" v-if="currTheme.id != tempItem.id && tempItem.theme_type != 'default' && currTableTheme != tempItem.id" @click.stop="deleteThemeFn(tempItem)"></span>
                            <span class="nc-iconfont nc-icon-bianjiV6xx1 !text-[14px] text-[#999] ml-[5px]" @click.stop="editThemeFn('edit', tempItem)"></span>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="w-[70px] h-[54px] pl-[7px] pt-[9px] flex flex-col mr-[4px] rounded-[4px] text-[10px] leading-[1] text-[#fff]"
                            :style="{ backgroundColor: tempItem.theme['--primary-color'] }">
                            <span>主色调</span>
                        </div>
                        <div class="flex flex-col">
                            <div class="secod-color-item mb-[4px]" :style="{ backgroundColor: tempItem.theme['--primary-help-color2'] }">
                                <span>辅色</span>
                            </div>
                            <div class="secod-color-item" :style="{ backgroundColor: tempItem.theme['--primary-color-dark'] }">
                                <span>配色</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center border-[1px] border-solid border-[var(--el-color-primary)] rounded-[2px] h-[32px] px-[15px] cursor-pointer mt-[15px]" @click="editThemeFn()">
                <span class="text-[14px] text-[var(--el-color-primary)]">新增配色</span>
            </div>
        </div>
        <edit-theme ref="editThemeRef" @confirm="editThemeConfirm" />
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancelFn()">取消</el-button>
                <el-button type="primary" @click="confirmFn()">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import { setDiyTheme, getDefaultTheme, deleteTheme } from '@/app/api/diy'
import { cloneDeep } from 'lodash-es'
import editTheme from './edit-theme.vue'

const editThemeRef = ref()
const dialogThemeVisible = ref(false)
let confirmRepeat = false
const currTheme = reactive({
    title: '',
    id: '',
    theme: {},
    default_theme: {},
    new_theme: [],
    addon_title: '',
    key: ''
})
const themeTemp = ref([])
const emit = defineEmits(['confirm'])

const initData = (params: any, callback: any = '') => {
    getDefaultTheme({ addon: params.key }).then((res) => {
        themeTemp.value = res.data || []
        if (callback) {
            callback(res.data[res.data.length - 1])
        }
    })
}

const currTableTheme = ref('')
const open = (res: any) => {
    currTableTheme.value = res.id
    initData(res)
    confirmRepeat = false
    currTheme.title = res.title
    currTheme.id = res.id
    currTheme.theme = res.theme
    currTheme.addon_title = res.addon_title
    currTheme.key = res.key
    dialogThemeVisible.value = true
}

const dialogTitle = computed(() => {
    const name = `选择${ currTheme.addon_title }配色`
    return name
})

// 切换不同配色
const themeTempChange = (item: any = {}) => {
    currTheme.title = item.title
    currTheme.id = item.id
    currTheme.theme = item.theme
    currTheme.default_theme = item.default_theme
    currTheme.new_theme = item.new_theme
}

// 编辑色调
const editThemeFn = (type = 'add', item = {}) => {
    const theme = {
        default_theme: {}, // 当前色调的默认值
        theme: {}, // 当前色调
        title: '',
        id: '', // 标识，区分是自定义还是模版色调,
        new_theme: [], // 新增颜色值
        key: '', // 表示是哪个插件
        theme_field: ''
    }
    if (type == 'edit') {
        theme.title = item.title
        theme.theme = cloneDeep(item.theme) || {}
        theme.id = item.id
        theme.default_theme = cloneDeep(item.default_theme) || ''
        theme.new_theme = cloneDeep(item.new_theme) || []
        theme.new_theme = cloneDeep(item.new_theme) || []
    }
    theme.key = currTheme.key
    // 颜色展示的默认数据
    themeTemp.value.forEach((item, index) => {
        if (item.id == currTheme.id) {
            theme.theme_field = item.theme_field
        }
    })
    editThemeRef.value.open(theme)
}

// 编辑色调回调
const editThemeConfirm = (res: any) => {
    initData(currTheme, (params: any) => {
        currTheme.new_theme = res.new_theme
        currTheme.theme = res.theme
        currTheme.title = res.title
        currTheme.id = res.id || params.id // 若是新增的色调，id为空, 需要把之前的的id赋值
    })
}

// 删除色调
let deleteRepeat = false
const deleteThemeFn = (res: any) => {
    if (deleteRepeat) return false
    deleteRepeat = true
    const id = res.id
    deleteTheme(id).then((res) => {
        initData(currTheme)
        deleteRepeat = false
    }).catch(() => {
        deleteRepeat = false
    })
}

// 点击保存
const confirmFn = () => {
    if (confirmRepeat) return
    confirmRepeat = true

    const params = {}
    params.addon = currTheme.key
    params.id = currTheme.id
    params.title = currTheme.title
    params.theme = currTheme.theme
    params.new_theme = currTheme.new_theme

    setDiyTheme(params).then((res) => {
        confirmRepeat = false
        dialogThemeVisible.value = false
        emit('confirm')
    }).catch(() => {
        confirmRepeat = false
    })
}

// 点击取消
const cancelFn = () => {
    dialogThemeVisible.value = false
    emit('confirm')
}

defineExpose({
    dialogThemeVisible,
    open
})
</script>

<style lang="scss" scoped>
.secod-color-item {
    @apply w-[60px] h-[25px] flex flex-col rounded-[4px] text-[10px] text-[#fff] leading-[1] items-end pt-[8px] pr-[7px];
}
</style>
