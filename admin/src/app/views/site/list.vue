<template>
    <!--站点列表-->
    <div class="main-container">
        <el-card class="box-card !border-none setting-card" shadow="never">
            <el-card class="box-card !border-none my-[10px] table-search-wrap" shadow="never">
                <div class="flex justify-between items-start">
                    <el-form :inline="true" :model="siteTableData.searchParam" ref="searchFormRef" class="search-form">
                        <el-form-item prop="keywords">
                            <el-input v-model.trim="siteTableData.searchParam.keywords" :placeholder="t('siteNamePlaceholder')" />
                        </el-form-item>

                        <el-form-item prop="site_domain" v-if="isShow">
                            <el-input v-model.trim="siteTableData.searchParam.site_domain" :placeholder="t('siteDomainPlaceholder')" />
                        </el-form-item>

                        <el-form-item prop="app">
                            <el-select v-model="siteTableData.searchParam.app" clearable @change="appChangeFn" :placeholder="t('appIdPlaceholder')" class="input-width">
                                <el-option :label="t('selectPlaceholder')" value="all" />
                                <el-option :label="item['title']" :value="item['key']" v-for="(item, index) in Object.values(addonList)"  :key="index"/>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="group_id">
                            <el-select v-model="siteTableData.searchParam.group_id" clearable :placeholder="t('groupIdPlaceholder')" class="input-width">
                                <el-option :label="t('selectPlaceholder')" value="" />
                                <el-option :label="item['group_name']" :value="item['group_id']" v-for="(item, index) in groupList.all" :key="index"/>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="status">
                            <el-select v-model="siteTableData.searchParam.status" clearable :placeholder="t('请选择状态')" class="input-width">
                                <el-option :label="t('selectPlaceholder')" value="" />
                                <el-option :label="item" :value="index" v-for="(item, index) in statusList" :key="index"/>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="create_time" v-if="isShow">
                            <el-date-picker v-model="siteTableData.searchParam.create_time" type="datetimerange"
                                value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                                :end-placeholder="t('endDate')" />
                        </el-form-item>

                        <el-form-item prop="expire_time" v-if="isShow">
                            <el-date-picker v-model="siteTableData.searchParam.expire_time" type="datetimerange"
                                value-format="YYYY-MM-DD HH:mm:ss" :start-placeholder="t('startDate')"
                                :end-placeholder="t('endDate')" />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="loadSiteList()">{{ t('search') }}</el-button>
                            <el-button @click="resetForm(searchFormRef)">{{ t('reset') }}</el-button>
                            <el-button type="primary" link @click="isShow = !isShow">{{ isShow ? t('收起') : t('更多') }} <span class="iconfont iconjiantouxia ml-[4px] !text-[10px] mr-[10px] transition-transform duration-300" :class="{ 'rotate-180': isShow }"></span></el-button>
                        </el-form-item>
                    </el-form>
                    <div class="flex justify-end items-center flex-1">
                        <div class="right-btn-group "> 
                            <tempalte  class="flex items-center">
                                 <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="前台用户登录某站点后，是否允许切换至站点管理列表或进入其他站点"
                                    placement="top-start"
                                >
                                    <span class="text-[14px] mr-[10px] flex items-center" >允许切换站点 <el-icon><QuestionFilled /></el-icon> </span>
                                </el-tooltip>
                                <el-switch v-model="allowChange"  @change="handleSwitchChange" lazy class="mr-[25px]"  :active-value="1" :inactive-value="0" />

                            </tempalte>
                            <el-button type="primary" class="w-[100px]" @click="addEvent">
                                {{ t('addSite') }}
                            </el-button>
                            <el-button class="w-[100px]" @click="toSiteLink()">
                                {{ t('toSite') }}
                            </el-button>
                        </div>
                    </div>
                </div>

            </el-card>
            <div class="mt-[20px]">
                <el-table :data="siteTableData.data" size="large" v-loading="siteTableData.loading">
                    <template #empty>
                        <span>{{ !siteTableData.loading ? t('emptyData') : '' }}</span>
                    </template>
                    <el-table-column prop="site_id" :label="t('siteId')" width="100" :show-overflow-tooltip="true" />

                    <el-table-column :label="t('siteInfo')" width="300" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <img class="w-[54px] h-[54px] mr-[10px] rounded-[4px]" v-if="row.logo" :src="img(row.logo)" alt="">
                                <img class="w-[54px] h-[54px] mr-[10px] rounded-[4px]" v-else src="@/app/assets/images/site_default.png" alt="">
                                <div class="flex flex-col">
                                    <span>{{ row.site_name || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="t('manager')" width="150" align="left">
                        <template #default="{ row }">
                            <div class="flex items-center">
                                <div class="flex flex-col">
                                    <span>{{ row.admin.username || '' }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="group_name" :label="t('groupId')" width="150" :show-overflow-tooltip="true" />
                    <el-table-column prop="site_domain" :label="t('siteDomain')" width="250" :show-overflow-tooltip="true" />
                    <el-table-column prop="create_time" :label="t('createTime')" width="200" :show-overflow-tooltip="true" />
                    <el-table-column prop="expire_time" :label="t('expireTime')" width="200" :show-overflow-tooltip="true">
                        <template #default="{ row }">
                            <div v-if="row.expire_time == 0">永久</div>
                            <div v-else>{{ row.expire_time }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('status')" width="100" align="center">
                        <template #default="{ row }">
                            <el-tag class="ml-2" type="success" v-if="row.status == 1">{{ row.status_name }}</el-tag>
                            <el-tag class="ml-2" type="error" v-else-if="row.status == 3">
                                {{ row.status_name }}
                            </el-tag>
                            <el-tag class="ml-2" type="error" v-else>
                                {{ row.status_name }}
                            </el-tag>
                        </template>
                    </el-table-column>

                   <el-table-column :label="t('operation')" min-width="250" align="right" fixed="right">
                        <template #default="{ row }">
                            <div class="operation-buttons">
                                <div class="button-row">
                                    <el-button type="primary" link @click="toSiteLink(row.site_id)">{{ t('toSite') }}</el-button>
                                    <el-button type="primary" link @click="openClose(row.status, row.site_id)" v-if="row.status == 1 || row.status == 3">{{ row.status == 1 ? t('closeTxt') : t('openTxt') }}</el-button>
                                    <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                                </div>
                                <div class="button-row">
                                    <el-button type="primary" link @click="initSiteEvent(row)">{{ t('站点初始化') }}</el-button>
                                    <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                                    <el-button type="primary" link @click="deleteEvent(row)">{{ t('delete') }}</el-button>
                                </div>
                            </div>
                        </template>
                </el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="siteTableData.page" v-model:page-size="siteTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="siteTableData.total"
                        @size-change="loadSiteList()" @current-change="loadSiteList" />
                </div>
            </div>
            <!-- <div class="mt-[20px]">
                <div class="el-table--fit el-table--default el-table overflow-x-auto w-full" style="width: 100%;" v-loading="siteTableData.loading">

                    <div class="el-table__inner-wrapper">
                        <div class="el-table__header-wrapper">
                            <table class="el-table__header" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th class="el-table__cell !w-[100px] !h-[48px] border-b-[1px] !border-[var(--el-color-info-light-8)] border-solid"><div class="cell">{{ t('siteId') }}</div></th>
                                        <th class="el-table__cell !w-[300px] !h-[48px] border-b-[1px] !border-[var(--el-color-info-light-8)] border-solid"><div class="cell">{{ t('siteInfo') }}</div></th>
                                        <th class="el-table__cell !h-[48px] border-b-[1px] !border-[var(--el-color-info-light-8)] border-solid"><div class="cell">{{ t('manager') }}</div></th>
                                        <th class="el-table__cell !h-[48px] border-b-[1px] !border-[var(--el-color-info-light-8)] border-solid"><div class="cell">{{ t('groupId') }}</div></th>
                                        <th class="el-table__cell !w-[250px] !h-[48px] border-b-[1px] !border-[var(--el-color-info-light-8)] border-solid"><div class="cell">{{ t('siteDomain') }}</div></th>
                                        <th class="el-table__cell !h-[48px] border-b-[1px] !border-[var(--el-color-info-light-8)] border-solid"><div class="cell">{{ t('createTime') }}</div></th>
                                        <th class="el-table__cell !h-[48px] border-b-[1px] !border-[var(--el-color-info-light-8)] border-solid"><div class="cell">{{ t('expireTime') }}</div></th>
                                        <th class="el-table__cell !h-[48px] border-b-[1px] !border-[var(--el-color-info-light-8)] border-solid"><div class="cell">{{ t('status') }}</div></th>
                                        <th class="el-table__cell !h-[48px] border-b-[1px] !border-[var(--el-color-info-light-8)] border-solid "><div class="cell !text-right">{{ t('operation') }}</div></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="el-table__body-wrapper text-[14px]">
                            <div class="el-scrollbar" v-if="siteTableData.data&&siteTableData.data.length>0" >
                                <div class="el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
                                    <div class="el-scrollbar__view" style="display: inline-block; vertical-align: middle;">
                                        <table class="el-table__body" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed; width: 100%;" >
                                            <tbody tabindex="-1">
                                                <tr v-for="row in siteTableData.data" :key="row.site_id" class="hover-row relative el-table__row " >
                                                    <td class="w-[100px]"><div class="cell">{{ row.site_id }}</div></td>
                                                    <td class="w-[300px]">
                                                        <div class="flex items-center cell">
                                                            <img class="w-[54px] h-[54px] mr-[10px] rounded-[4px]" v-if="row.logo" :src="img(row.logo)" alt="">
                                                            <img class="w-[54px] h-[54px] mr-[10px] rounded-[4px]" v-else src="@/app/assets/images/site_default.png" alt="">
                                                            <div class="flex flex-col">
                                                                <span>{{ row.site_name || '' }}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="flex items-center cell">
                                                            <div class="flex flex-col">
                                                                <span>{{ row.admin.username || '' }}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><div class="cell">{{ row.group_name }}</div></td>
                                                    <td class="w-[250px]"><div class="cell">{{ row.site_domain}}</div></td>
                                                    <td><div class="cell">{{ row.create_time }}</div></td>
                                                    <td>
                                                        <div class="cell" v-if="row.expire_time == 0">永久</div>
                                                        <div class="cell" v-else>{{ row.expire_time }}</div>
                                                    </td>
                                                    <td>
                                                        <div class="cell">
                                                            <el-tag class="ml-2" type="success" v-if="row.status == 1">{{ row.status_name }}</el-tag>
                                                            <el-tag class="ml-2" type="error" v-else-if="row.status == 3">
                                                                {{ row.status_name }}
                                                            </el-tag>
                                                            <el-tag class="ml-2" type="error" v-else>
                                                                {{ row.status_name }}
                                                            </el-tag>
                                                        </div>
                                                    </td>
                                                    <td class="text-right pr-[20px] relative">
                                                        <el-button type="primary" link @click="openClose(row.status, row.site_id)" v-if="row.status == 1 || row.status == 3">{{ row.status == 1 ? t('closeTxt') : t('openTxt') }}</el-button>
                                                        <el-button type="primary" link @click="toSiteLink(row.site_id)">{{ t('toSite') }}</el-button>

                                                        <div class="manage-option text-right">
                                                            <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
                                                            <el-button type="primary" link @click="deleteEvent(row)">{{ t('delete') }}</el-button>
                                                            <el-button type="primary" link @click="infoEvent(row)">{{ t('info') }}</el-button>
                                                            <el-button type="primary" link @click="initSiteEvent(row)">{{ t('站点初始化') }}</el-button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div v-if="siteTableData.data.length == 0" class="flex justify-center items-center ">
                                <span class="text-center !h-[60px] leading-[60px] !text-[var(--el-text-color-secondary)] ">{{ !siteTableData.loading ? t('emptyData') : '' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="siteTableData.page" v-model:page-size="siteTableData.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="siteTableData.total"
                        @size-change="loadSiteList()" @current-change="loadSiteList" />
                </div>
            </div> -->

        </el-card>
        <edit-site ref="addSiteDialog" @complete="loadSiteList()" />
        <el-dialog v-model="delshowDialog" :title="t('warning')" width="500px" :destroy-on-close="true">
            <div>
                {{t('siteDeleteTips')}}
            </div>
            <el-form :model="captchaForm" ref="captchaFormRef" class="mt-4">
                <el-form-item label="验证码" prop="captcha_code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
                    <div class="flex items-center">
                        <el-input placeholder="请输入验证码" class="w-[200px]" maxlength="4" show-word-limit v-model="captchaForm.captcha_code" />
                        <img v-if="captchaForm.captcha_img" :src="captchaForm.captcha_img" alt="验证码" class="w-[100px] h-[32px] cursor-pointer ml-[10px]" @click="getCaptchaImage" />
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="delshowDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="confirmDelete" :disabled="!canClick" :loading="loading">{{ t('confirm') + (countdown > 0 ? ` (${countdown}s)` : '') }}</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="initshowDialog" :title="t('warning')" width="500px" :destroy-on-close="true">
            <div>
                {{t('siteInitTips')}}
            </div>
            <el-form :model="initCaptchaForm" ref="initCaptchaFormRef" class="mt-4">
                <el-form-item label="验证码" prop="captcha_code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
                    <div class="flex items-center">
                        <el-input placeholder="请输入验证码" class="w-[200px]" maxlength="4" show-word-limit v-model="initCaptchaForm.captcha_code"  />
                        <img v-if="initCaptchaForm.captcha_img" :src="initCaptchaForm.captcha_img" alt="验证码" class="w-[100px] h-[32px] cursor-pointer ml-[10px]" @click="getInitCaptchaImage" />
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="initshowDialog = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="confirmInit" :disabled="!initCanClick" :loading="loading">{{ t('confirm') + (initCountdown > 0 ? ` (${initCountdown}s)` : '') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { getToken, img } from '@/utils/common'

const countdown = ref(5)
const canClick = ref(false)
let timer: any = null

// 站点初始化倒计时相关变量
const initCountdown = ref(5)
const initCanClick = ref(false)
let initTimer: any = null

// 加载状态
const loading = ref(false)

const startCountdown = () => {
    countdown.value = 5
    canClick.value = false
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--
        } else {
            canClick.value = true
            clearInterval(timer)
        }
    }, 1000)
}

const startInitCountdown = () => {
    initCountdown.value = 5
    initCanClick.value = false
    if (initTimer) clearInterval(initTimer)
    initTimer = setInterval(() => {
        if (initCountdown.value > 0) {
            initCountdown.value--
        } else {
            initCanClick.value = true
            clearInterval(initTimer)
        }
    }, 1000)
}

import { t } from '@/lang'
import { getSiteList, getSiteGroupAll, getStatusList, closeSite, openSite, deleteSite, initSite ,getSiteAllowChange,putSiteAllowChange} from '@/app/api/site'
import { getsiteCaptcha } from '@/app/api/notice'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import EditSite from '@/app/views/site/components/edit-site.vue'
import { getInstalledAddonList } from '@/app/api/addon'
import useUserStore from '@/stores/modules/user'

const prop = defineProps({
    status: {
        type: String,
        default: ''
    }
})

const groupList = ref({
    all: []
})
const isShow = ref(false)
const statusList = ref([])

const siteTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        keywords: '',
        group_id: '',
        app: 'all',
        status: '',
        site_domain: '',
        create_time: [],
        expire_time: []
    }
})
// siteTableData.searchParam.status = route.query.id || ''
siteTableData.searchParam.status = prop.status || ''
const setGroupList = async () => {
    const obj = await (await getSiteGroupAll({})).data

    groupList.value.all = obj
    obj.forEach((item:any, index:any) => {
        if (!groupList.value[item.app]) {
            groupList.value[item.app] = []
            groupList.value[item.app].push(item)
        } else {
            groupList.value[item.app].push(item)
        }
    })
}
setGroupList()

const allowChange = ref(0)
const getSiteAllowChangeFn = ()=>{
    getSiteAllowChange().then(({data})=>{
        allowChange.value = data.is_allow
        let isAllowChange = allowChange.value ? true : false
        localStorage.setItem('isAllowChange',isAllowChange.toString())
    })
    
}
getSiteAllowChangeFn()

// 开关切换时调用put接口
const handleSwitchChange = (value) => {
    let isAllow = value ? 1 : 0
    putSiteAllowChange({ is_allow:isAllow }).then(() => {
        getSiteAllowChangeFn()
    })
};

const setStatusList = async () => {
    statusList.value = await (await getStatusList()).data
}



setStatusList()

const searchFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.resetFields()
    loadSiteList()
}

/**
 * 应用选择
 */
const appChangeFn = () => {
    siteTableData.searchParam.group_id = ''
}

/**
 * 获取应用列表
 */
const addonList = ref([])
getInstalledAddonList().then(({ data }) => {
    addonList.value = data
}).catch()

/**
 * 获取站点列表
 */
const loadSiteList = (page: number = 1) => {
    siteTableData.loading = true
    siteTableData.page = page
    siteTableData.searchParam.app = siteTableData.searchParam.app == 'all' ? '' : siteTableData.searchParam.app
    getSiteList({
        page: siteTableData.page,
        limit: siteTableData.limit,
        ...siteTableData.searchParam
    }).then(res => {
        siteTableData.loading = false
        siteTableData.data = res.data.data
        siteTableData.total = res.data.total
    }).catch(() => {
        siteTableData.loading = false
    })
}
loadSiteList()

const router = useRouter()

const addSiteDialog: Record<string, any> | null = ref(null)
/**
 * 添加站点
 */
const addEvent = (data: any) => {
    addSiteDialog.value.setFormData()
    addSiteDialog.value.showDialog = true
}

/**
 * 站点详情
 * @param data
 */
const infoEvent = (data: any) => {
    router.push({ path: '/admin/site/info', query: { id: data.site_id } })
}

/**
 * 编辑站点详情
 * @param data
 */
const editEvent = (data: any) => {
    addSiteDialog.value.setFormData(data)
    addSiteDialog.value.showDialog = true
}

/**
 * 站点登录
 * @param siteId
 */
const toSiteLink = (siteId:number = 0) => {
    window.localStorage.setItem('site.token', getToken())
    window.localStorage.setItem('site.comparisonTokenStorage', getToken())
    window.localStorage.setItem('site.userinfo', JSON.stringify(useUserStore().userInfo))
    if (siteId) {
        const userinfo = useUserStore().userInfo
        if (userinfo.is_super_admin != undefined && !userinfo.is_super_admin) {
            const siteIds = userinfo.site_ids || []
            if (siteIds.indexOf(siteId) == -1) {
                ElMessage({
                    message: t('noPermission'),
                    type: 'warning'
                })
                return
            }
        }
        window.localStorage.setItem('site.siteId', siteId)
        window.localStorage.setItem('site.comparisonSiteIdStorage', siteId)
        window.open(`${location.origin}/site/`)
    } else {
        // window.open(`${location.origin}/home/index`)
        router.push({ path: '/home/index' })
    }
}

const openClose = (i, site_id) => {
    if (i == 1) {
        ElMessageBox.confirm(t('closeSiteTips'), t('warning'),
            {
                confirmButtonText: t('confirm'),
                cancelButtonText: t('cancel'),
                type: 'warning'
            }
        ).then(() => {
            closeSite({ site_id }).then(res => {
                loadSiteList()
            })
        })
    }
    if (i == 3) {
        openSite({ site_id }).then(res => {
            loadSiteList()
        })
    }
}
const delshowDialog = ref(false)
const delshowDialogdata = ref({})
const initshowDialog = ref(false)
const initshowDialogdata = ref({})

// 验证码表单
const captchaFormRef = ref()
const captchaForm = ref({
    captcha_code: '',
    captcha_key: '',
    captcha_img: ''
})

const initCaptchaFormRef = ref()
const initCaptchaForm = ref({
    captcha_code: '',
    captcha_key: '',
    captcha_img: ''
})

// 监听删除对话框显示状态，启动倒计时
watch(delshowDialog, (newVal) => {
    if (newVal) {
        startCountdown()
        getCaptchaImage()
    }
})

// 监听站点初始化对话框显示状态，启动倒计时
watch(initshowDialog, (newVal) => {
    if (newVal) {
        startInitCountdown()
        getInitCaptchaImage()
    }
})

// 获取验证码图片
const getCaptchaImage = () => {
    getsiteCaptcha().then(res => {
        captchaForm.value.captcha_key = res.data.captcha_key
        captchaForm.value.captcha_img = res.data.img
        captchaForm.value.captcha_code = ''
    }).catch(() => {
    })
}

const getInitCaptchaImage = () => {
    getsiteCaptcha().then(res => {
        initCaptchaForm.value.captcha_key = res.data.captcha_key
        initCaptchaForm.value.captcha_img = res.data.img
        initCaptchaForm.value.captcha_code = ''
    }).catch(() => {
    })
}
const deleteEvent = (data: any) => {
    delshowDialog.value = true
    delshowDialogdata.value = data
    // ElMessageBox.confirm(t('siteDeleteTips'), t('warning'),
    //     {
    //         confirmButtonText: t('confirm'),
    //         cancelButtonText: t('cancel'),
    //         type: 'warning'
    //     }
    // ).then(() => {
    //     deleteSite(data.site_id).then(res => {
    //         loadSiteList()
    //     }).catch(() => {
    //     })
    // })
}
// 站点初始化
const initSiteEvent = (data: any) => {
    initshowDialog.value = true
    initshowDialogdata.value = data
    // ElMessageBox.confirm(t('siteInitTips'), t('warning'),
    //     {
    //         confirmButtonText: t('confirm'),
    //         cancelButtonText: t('cancel'),
    //         type: 'warning'
    //     }
    // ).then(() => {
    //     initSite({ site_id: data.site_id }).then(res => {
    //         loadSiteList()
    //     })
    // })
}

const confirmDelete = () => {
    captchaFormRef.value.validate((valid) => {
        if (!valid) return
        loading.value = true
        const params = {
            site_id: delshowDialogdata.value.site_id,
            captcha_code: captchaForm.value.captcha_code,
            captcha_key: captchaForm.value.captcha_key
        }
        deleteSite(params).then(res => {
            loadSiteList()
            delshowDialog.value = false
        }).catch(() => {
            getCaptchaImage() // 验证失败重新获取验证码
        }).finally(() => {
            loading.value = false
        })
    })
}

const confirmInit = () => {
    initCaptchaFormRef.value.validate((valid) => {
        if (!valid) return
        loading.value = true
        const params = {
            site_id: initshowDialogdata.value.site_id,
            captcha_code: initCaptchaForm.value.captcha_code,
            captcha_key: initCaptchaForm.value.captcha_key
        }
        initSite(params).then(res => {
            loadSiteList()
            initshowDialog.value = false
        }).catch(() => {
            getInitCaptchaImage() // 验证失败重新获取验证码
        }).finally(() => {
            loading.value = false
        })
    })
}
</script>

<style lang="scss" scoped>
.right-btn-group {
  display: flex;
  align-items: center;
  white-space: nowrap; // 禁止内部元素换行
  flex-shrink: 0; // 防止容器被挤压
  min-width: 0; // 兼容部分浏览器的最小宽度限制
}
:deep(.el-table tr td) {
    height: 100px !important;
}
:deep(.el-input__wrapper){
    box-shadow: none !important;
    border-radius: 4px !important;
    border: 1px solid #D1D5DB !important;
    height: 32px !important;
}
:deep(.el-select__wrapper){
    box-shadow: none !important;
    border-radius: 4px !important;
    border: 1px solid #D1D5DB !important;
    height: 32px !important;
}
:deep(.el-button){
    border-radius: 4px !important;
}
/* 设置 el-select 的 placeholder 颜色 */
:deep(.search-form .el-select__placeholder.is-transparent) {
    color: #C4C7DA;
    font-size: 12px;
}

/* 设置 el-select 选中后的颜色 */
:deep(.search-form .el-select__placeholder) {
    color: #4F516D;
    font-size: 12px;

}
/* 设置 el-input 的 placeholder 颜色 */
:deep(.search-form .el-input__inner::placeholder) {
    color: #C4C7DA;
    font-size: 12px;

}
/* 设置 el-input 输入内容后的颜色 */
:deep(.search-form .el-input__inner) {
    color: #4F516D;
    font-size: 12px;

}
/* 设置 el-date-picker 的 placeholder 颜色 */
:deep(.search-form .el-date-editor .el-range-input::placeholder) {
  color: #C4C7DA;
  font-size: 12px;
}

/* 设置 el-date-picker 的输入内容颜色 */
:deep(.search-form .el-date-editor .el-range-input) {
  color: #4F516D;
  font-size: 12px;
}
/* 样式原样保留或略微调整即可适配原生 table */
.manage-option {
  line-height: 50px;
  padding: 0 30px;
  position: absolute;
  right: 0;
  width: 100vw;
  bottom: 0;
  background-color: #f4f6f9;
  transition: all 0.3s;
  box-shadow: 0 4px 4px rgba(220, 220, 220, 0.3);
  opacity: 0;
  z-index: 999;
  white-space: nowrap;
}

/* 悬浮整行显示 manage-option */
.hover-row:hover {
    position: relative;
  z-index: 10;
}
.hover-row:hover>td {
  background-color: var(--el-table-row-hover-bg-color) !important;
}
.hover-row>td {
  border-bottom: 1px solid var(--el-color-info-light-8) !important;
}
.hover-row:hover .manage-option {
  opacity: 1;
  bottom: -51px;
}
:deep(.setting-card .el-card__body){
    padding: 0 !important;
}
// :deep(.el-scrollbar__view){
//     margin-bottom: 53px !important;
// }

</style>
