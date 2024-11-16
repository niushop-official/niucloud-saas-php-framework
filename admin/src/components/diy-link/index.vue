<template>
    <div>
        <div @click="show">
            <slot>
                <el-input v-model="value.title" :placeholder="t('linkPlaceholder')" readonly class="link-input">
                    <template #suffix>
                        <div @click.stop="clear">
                            <el-icon v-if="value.name">
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
        <el-dialog v-model="showDialog" :title="t('selectLinkTips')" width="40%" :close-on-press-escape="false" :destroy-on-close="true" :close-on-click-modal="false" @close="cancel">

            <div class="flex items-start">
                <el-scrollbar class="w-[140px] border-r h-[350px]">
                    <div v-for="(item, index) in link" :key="index"
                        class="h-[40px] leading-[40px] cursor-pointer hover:bg-primary-light-9 px-[10px] hover:text-primary"
                        :class="[item.name == parentLinkName ? 'bg-primary-light-9 text-primary' : '']"
                        @click="changeParentLink(item)">
                        {{ item.title }}
                    </div>
                </el-scrollbar>
                <el-scrollbar class="pl-4 h-[350px] flex-1">
                    <el-form label-width="100px" class="px-[10px]">
                        <template v-if="parentLinkName == 'DIY_LINK'">
                            <div class="mb-[16px]">
                                <el-form-item :label="t('diyLinkName')">
                                    <el-input v-model="selectLink.title" :placeholder="t('diyLinkNamePlaceholder')" />
                                </el-form-item>
                            </div>
                            <div class="mb-[16px]">
                                <el-form-item :label="t('diyLinkUrl')">
                                    <el-input v-model="selectLink.url" :placeholder="t('diyLinkUrlPlaceholder')" />
                                </el-form-item>
                            </div>
                            <el-form-item label=" ">
                                <div class="text-sm text-gray-400 select-text">路径必须以“/”开头，例：/app/pages/index/index</div>
                            </el-form-item>
                            <el-form-item label=" ">
                                <div class="text-sm text-gray-400 select-text">跳转外部链接“http”或“https”开头，例：https://baidu.com</div>
                            </el-form-item>
                        </template>
                        <template v-if="parentLinkName == 'DIY_JUMP_OTHER_APPLET'">
                            <div class="mb-[16px]">
                                <el-form-item :label="t('diyAppletId')">
                                    <el-input v-model="selectLink.appid" :placeholder="t('diyAppletIdPlaceholder')" clearable maxlength="50"  />
                                </el-form-item>
                            </div>
                            <div class="mb-[16px]">
                                <el-form-item :label="t('diyAppletPage')">
                                    <el-input v-model="selectLink.page" :placeholder="t('diyAppletPagePlaceholder')" clearable maxlength="100" />
                                </el-form-item>
                            </div>
                            <el-form-item label=" ">
                                <div class="text-sm text-gray-400 select-text">仅支持小程序之间的跳转，不支持从其他渠道跳转小程序</div>
                            </el-form-item>
                            <el-form-item label=" ">
                                <div class="text-sm text-gray-400 select-text">小程序路径格式如：app/pages/index/index</div>
                            </el-form-item>
                        </template>
                        <template v-if="parentLinkName == 'DIY_MAKE_PHONE_CALL'">
                            <div class="mb-[16px]">
                                <el-form-item :label="t('diyMakePhone')">
                                    <el-input v-model="selectLink.mobile" :placeholder="t('diyMakePhonePlaceholder')" clearable maxlength="50" />
                                </el-form-item>
                            </div>
                            <el-form-item label=" ">
                                <div class="text-sm text-gray-400 select-text">电话号码支持手机号码和固定电话</div>
                            </el-form-item>
                        </template>
                        <div v-else class="flex flex-wrap">
                            <div v-for="(item, index) in childList" :key="index"
                                class="border border-br rounded-[3px] mr-[10px] mb-[10px] px-4 h-[32px] leading-[32px] cursor-pointer hover:bg-primary-light-9 px-[10px] hover:text-primary"
                                 :class="{ 'border-primary text-primary': (parentLinkName != 'DIY_PAGE' && item.name == selectLink.name) || (parentLinkName == 'DIY_PAGE' && item.url == selectLink.url) }"
                                @click="changeChildLink(item)">{{ item.title }}
                            </div>
                        </div>
                    </el-form>
                </el-scrollbar>
            </div>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="save">{{ t('confirm') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, computed } from 'vue'
import { cloneDeep } from 'lodash-es'
import { getLink } from '@/app/api/diy'
import { ElMessage } from 'element-plus'

const prop = defineProps({
    modelValue: {
        type: Object,
        default: () => { }
    },
    ignore:{
        type:Array,
        default:[]
    }
})

const emit = defineEmits(['update:modelValue', 'confirm','success'])

const value: any = computed({
    get () {
        return prop.modelValue
    },
    set (value) {
        emit('update:modelValue', value)
    }
})

const showDialog = ref(false)

const isDrag = ref(false)

const link: any = ref([])

const parentLinkName = ref('')

const childList: any = ref([])

const selectLink: any = ref([])

const show = () => {
    getLinkFn(() => {
        // 每次打开时赋值
        if (value.value.name != '') {
            selectLink.value = cloneDeep(value.value)
            parentLinkName.value = selectLink.value.parent
            for (let key in link.value) {
                if (link.value[key].name == parentLinkName.value) {
                    changeParentLink(link.value[key])
                }
            }
        }
        showDialog.value = true
        isDrag.value = true
        emit('confirm', isDrag.value)
    })
}

const getLinkFn = (callback:any=null)=> {
    getLink({}).then((res: any) => {
        link.value = res.data
        if (prop.ignore && prop.ignore.length) {
            for (let key in link.value) {
                for (let i = 0; i < prop.ignore.length; i++) {
                    if (key == prop.ignore[i]) {
                        delete link.value[key];
                        break;
                    }
                }
            }
        }

        childList.value = Object.values(link.value)[0].child_list
        if (value.value.name != '') {
            selectLink.value = cloneDeep(value.value)
        } else {
            selectLink.value = {
                parent: Object.values(link.value)[0].name
            }
        }
        parentLinkName.value = selectLink.value.parent

        if (callback) callback()
    })
}

// 选择父级链接
const changeParentLink = (item: any) => {
    childList.value = item.child_list
    parentLinkName.value = item.name
}

// 选择子链接
const changeChildLink = (item: any) => {
    delete item.is_share
    Object.assign(selectLink.value, item)
}

const clear = () => {
    value.value = {
        name: '',
        parent: '',
        title: '',
        url: ''
    }
}

const save = () => {
    if (parentLinkName.value === 'DIY_LINK') {
        // 自定义链接

        if (!selectLink.value.title) {
            ElMessage({
                message: t('diyLinkNameNotEmpty'),
                type: 'warning'
            });
            return
        }

        if (!selectLink.value.url) {
            ElMessage({
                message: t('diyLinkUrlNotEmpty'),
                type: 'warning'
            });
            return
        }

        selectLink.value.parent = parentLinkName.value
        selectLink.value.name = parentLinkName.value
        selectLink.value.action = '';

        delete selectLink.value.appid;
        delete selectLink.value.mobile;

    } else if (parentLinkName.value == 'DIY_PAGE') {
        // 自定义页面

        selectLink.value.name = parentLinkName.value
        selectLink.value.parent = parentLinkName.value
        selectLink.value.action = 'decorate';

        delete selectLink.value.appid;
        delete selectLink.value.mobile;

    } else if (parentLinkName.value == 'DIY_JUMP_OTHER_APPLET') {
        // 小程序跳转

        if (!selectLink.value.appid) {
            ElMessage({
                message: t('diyAppletIdNotEmpty'),
                type: 'warning'
            });
            return
        }

        if (!selectLink.value.page) {
            ElMessage({
                message: t('diyAppletPageNotEmpty'),
                type: 'warning'
            });
            return
        }

        selectLink.value.name = parentLinkName.value
        selectLink.value.parent = parentLinkName.value
        selectLink.value.title = '微信小程序-' + selectLink.value.appid
        selectLink.value.action = '';

        delete selectLink.value.url;
        delete selectLink.value.mobile;

    } else if (parentLinkName.value == 'DIY_MAKE_PHONE_CALL') {
        // 拨打电话

        if (!selectLink.value.mobile) {
            ElMessage({
                message: t('diyMakePhoneNotEmpty'),
                type: 'warning'
            });
            return
        }

        selectLink.value.name = parentLinkName.value
        selectLink.value.parent = parentLinkName.value
        selectLink.value.title = '拨打电话：' + selectLink.value.mobile
        selectLink.value.action = '';

        delete selectLink.value.url;
        delete selectLink.value.appid;
    }

    value.value = cloneDeep(selectLink.value)
    showDialog.value = false
    isDrag.value = false
    emit('confirm', isDrag.value)
    emit('success')
}

const cancel = () => {
    showDialog.value = false
    isDrag.value = false
    emit('confirm', isDrag.value)
}
defineExpose({
    showDialog
})
</script>

<style lang="scss">
    .link-input .el-input__inner{
        cursor: pointer;
    }
</style>
