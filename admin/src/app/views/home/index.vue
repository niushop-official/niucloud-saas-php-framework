<template>
    <div class="bg-[#F7F9FA] min-h-screen">
        <!-- <div class="flex justify-between items-center">
            <layoutHeader></layoutHeader>
        </div> -->
        <div class="flex justify-between items-center py-[24px] pr-[64px] home-head">
            <div class="flex items-center w-[219px] justify-center" v-if="webConfig">
                <div class="max-w-[82px] h-[40px] overflow-hidden">
                    <el-image class="h-[40px]" :src="img(webConfig.icon)" fit="contain">
                        <template #error>
                            <div class="flex justify-center items-center w-full h-full"><img class="max-w-[70px]" src="@/app/assets/images/logo.default.png" alt=""  object-fit="contain"></div>
                        </template>
                    </el-image>
                </div>
                <span class="ml-[10px] max-w-[120px] text-[16px] font-bold truncate">{{webConfig.site_name}}</span>
            </div>
            <div class="flex items-center">
                <div v-if="userStore.userInfo.is_super_admin" class="border-primary border-[1px] h-[30px] px-[15px] flex items-center rounded-[6px] mr-[10px] cursor-pointer" @click="toHome">
                    <span class="iconfont iconguanliduan !text-primary mr-1"></span>
                    <span class="text-[14px] text-primary">控制台</span>
                </div>
                <span class="mr-[12px] text-[14px]">{{userStore.userInfo.username}}</span>
                <span @click="logoutFn()" class="text-[14px] cursor-pointer text-[var(--el-color-primary)]">退出</span>
            </div>
        </div>

        <div class="w-full m-auto " :style="{height:'calc(100vh - 80px)'}">
            <!-- <div class="flex justify-between items-center">
                <span class="text-[24px] font-bold">站点列表</span>
                <el-button type="primary" class="w-[90px] !h-[34px]" :disabled="siteGroupLoading" @click="handleChick">创建站点</el-button>
            </div> -->
            <div class="flex justify-between h-full">
                <div class="text-[14px] whitespace-nowrap w-[220px] bg-white h-full border-r-[1px] border-[var(--el-border-color-light)]">
                    <el-scrollbar :always="true">
                        <div class="px-[20px] mt-[20px]">
                            <div class="mt-3 text-[#9699B6] mb-1">应用</div>
                            <div>
                                <div :class="['px-[25px] cursor-pointer h-[40px] leading-[40px]', {'bg-[#EAEBF0] rounded-[4px]': params.app == ''}]" @click="cutAppFn('')">
                                    <span class="iconfont iconsuoyouyingyongc !text-[17px] mr-[10px] "></span>
                                    <span>所有应用</span>
                                </div>
                                <div :class="['px-[25px] cursor-pointer h-[40px] leading-[40px] flex items-center', {'bg-[#EAEBF0] rounded-[4px]': params.app == item.key}]" @click="cutAppFn(item.key)"   v-for="(item, index) in (showMore ? addonList : addonList.slice(0, 4))" :key="index">
                                    <img v-if="item.icon" :src="item.icon" class="w-[17px] h-[17px] mr-[10px] rounded-full" />
                                    <span class="iconfont iconsuoyouyingyongc !text-[17px] mr-[10px] " v-else></span>
                                    <span>{{item.title}}</span>
                                </div>
                            </div>
                            <div v-if="addonList.length > 4" class="text-[#9699B6] text-[14px] cursor-pointer flex items-center mt-1" @click="showMore = !showMore">
                                <span class="iconfont iconjiantouxia ml-[4px] !text-[14px] mr-[10px] transition-transform duration-300" :class="{ 'rotate-180': showMore }"></span>
                                <span>{{ showMore ? '收起' : '更多' }}</span>
                            </div>
                        </div>

                        <div class="px-[20px] mt-[20px]">
                            <div class="text-[#9699B6] mb-1">平台分类</div>
                            <div>
                                <div :class="['px-[25px] cursor-pointer h-[40px] leading-[40px] flex items-center', {'bg-[#EAEBF0] rounded-[4px]': typeName == 'h5'}]" @click="cutAppTypeFn('h5')">
                                    <span class="iconfont iconH5c !text-[17px] mr-[10px] "></span>
                                    <span>H5</span>
                                </div>
                                <div :class="['px-[25px] cursor-pointer h-[40px] leading-[40px] flex items-center', {'bg-[#EAEBF0] rounded-[4px]': typeName == 'wx'}]" @click="cutAppTypeFn('wx')">
                                    <span class="iconfont iconxiaochengxutongbuc !text-[17px] mr-[10px] "></span>
                                    <span>微信小程序</span>
                                </div>
                                <div :class="['px-[25px] cursor-pointer h-[40px] leading-[40px] flex items-center', {'bg-[#EAEBF0] rounded-[4px]': typeName == 'pc'}]" @click="cutAppTypeFn('pc')">
                                    <span class="iconfont iconPCc !text-[17px] mr-[10px] "></span>
                                    <span>PC</span>
                                </div>
                                <div :class="['px-[25px] cursor-pointer h-[40px] leading-[40px] flex items-center', {'bg-[#EAEBF0] rounded-[4px]': typeName == 'app'}]" @click="cutAppTypeFn('app')">
                                    <span class="iconfont iconAPPc !text-[17px] mr-[10px] "></span>
                                    <span>APP</span>
                                </div>
                                <div :class="['px-[25px] cursor-pointer h-[40px] leading-[40px] flex items-center', {'bg-[#EAEBF0] rounded-[4px]': typeName == 'zfb'}]" @click="cutAppTypeFn('zfb')">
                                    <span class="iconfont iconzhifubaoxiaochengxuc !text-[17px] mr-[10px] "></span>
                                    <span>支付宝小程序</span>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="flex-1 h-full p-[20px] flex flex-col">
                    <div class="flex-1 min-h-0">
                        <el-scrollbar>
                            <div class="flex justify-between items-center input-box">
                                <el-input v-model.trim="params.keywords" class="!w-[350px] !h-[40px]" placeholder="请输入要搜索的站点名称/编号" @keyup.enter.native="getHomeSiteFn()">
                                    <template #suffix>
                                        <el-icon @click.stop="getHomeSiteFn()" class="cursor-pointer">
                                            <Search />
                                        </el-icon>
                                    </template>
                                </el-input>
                                <div class="flex items-center text-[14px] cursor-pointer pr-[10px] h-[40px]">
                                    <div class="text-[#9699B6]">排序：</div>
                                    <div>
                                        <!-- <span>创建时间</span>
                                        <span class="ml-[10px]">站点名称</span>
                                        <span class="ml-[10px]">站点类型</span> -->
                                        <el-select v-model="params.sort" placeholder="请选择" class="!w-[200px] !h-[40px] !border-none" @change="getHomeSiteFn()">
                                            <el-option v-for="item in sortList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </div>
                                    <el-button type="primary" class="w-[90px] !h-[34px] ml-[20px]" :disabled="siteGroupLoading" @click="handleChick">创建站点</el-button>
                                </div>
                            </div>

                            <div class="ml-[-20px]">
                                <div class="flex flex-wrap mt-[30px]" v-loading="loading">
                                    <div v-for="(item, index) in tableData" :key="index" @click="selectSite(item)" :class="['home-item w-[313px] ml-[20px] box-border mb-[20px] border-[1px] border-[#E8E9EB] rounded-[6px] cursor-pointer']">
                                        <div class="flex items-center px-[24px] pt-[22px] pb-[10px] home-item-head relative">
                                            <!-- <div class="absolute h-[4px] w-full z-1 left-0 top-0" :style="{'background-color': item.theme_color}" v-if="item.theme_color"></div> -->
                                            <img v-if="item.icon" class="w-[46px] h-[46px] mr-[15px] img-shadow rounded-[6px] overflow-hidden" :src="img(item.icon)" />
                                            <img v-else class="w-[46px] h-[46px] mr-[15px] rounded-[6px] img-shadow overflow-hidden" src="@/app/assets/images/site_default.png" />
                                            <div class="flex flex-col flex-1 justify-center">
                                                <div class="flex items-center flex-wrap">
                                                    <span class="text-[16px] text-[#000] max-w-[160px] truncate mr-[10px]">{{item.site_name}}</span>
                                                    <div class="flex items-center justify-center min-w-[42px] h-[18px] bg-[#FF5500] rounded-tl-md rounded-br-md items-tab" v-if="item.app_name">
                                                        <span class="text-[12px] text-[#000]">{{item.app_name}}</span>
                                                    </div>
                                                </div>
                                                <!-- <span class="text-[12px] mt-[3px] text-[#666]">{{item.create_time ? item.create_time.split(" ")[0] : '--'}} 到 {{item.expire_time ? item.expire_time.split(" ")[0] : '--'}}</span> -->
                                                <span class="text-[12px] mt-[3px] text-[#666]">NO：{{item.site_id}}</span>
                                            </div>
                                            <!-- <div class="absolute right-[12px] top-[10px] isshow">
                                                <span class="iconfont icona-gengduoV6xx-28"></span>
                                            </div> -->
                                        </div>
                                        <div class="px-[24px] py-[20px] text-[#666]">
                                            <!-- <p class="text-[14px]">站点编号：{{item.site_id}}</p> -->

                                            <p class="text-[14px] mt-[2px] text-[var(--el-color-primary)]">
                                                <span class="iconfont icona-Frame427322133 !text-[14px]"></span>
                                                <span>{{item.group_name || '--'}}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div v-if="!tableData.length && !loading" class="m-auto mt-[100px]">
                                        <img src="@/app/assets/images/site_empty.png" class="w-[220px] h-[165px]"/>
                                        <p class="text-center text-gray-400 text-[14px] mt-[20px]">暂无站点</p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-[16px] flex justify-center pr-[10px]">
                                <el-pagination v-model:current-page="site.params.page" v-model:page-size="site.params.limit"
                                    layout="total, sizes, prev, pager, next, jumper" :total="site.total"
                                    @size-change="getHomeSiteFn()" @current-change="getHomeSiteFn" :hide-on-single-page="true"/>
                            </div>
                        </el-scrollbar>
                    </div>
                    <div class="flex justify-between text-[12px] mt-[20px] text-[#666]" v-if="copyright">
                        <div>
                            <a :href="copyright.copyright_link" target="_blank">
                                <span class="mr-3" v-if="copyright.company_name">{{ copyright.company_name }}</span>
                            </a>
                            <a href="https://beian.miit.gov.cn/" v-if="copyright.icp" target="_blank">
                                <span class="mr-3">{{ copyright.icp }}</span>
                            </a>
                        </div>
                        <div class="flex items-center  cursor-pointer">
                            <span class="mx-1" @click="getInfoFn">版权信息</span> | <span
                            class="mx-1">开发者联盟与隐私的声明</span> | <span class="mx-1">隐私政策</span> | <span
                            class="mx-1">联系我们</span> | <span class="mx-1">Cookies</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
    <el-dialog v-model="dialogVisible" title="版权信息" width="500">
        <span>{{ copyright.copyright_desc }}</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确定</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="createSiteDialog" width="54vw" :destroy-on-close="true" style="border-radius: 25px;">
        <template #title>
            <div class="text-[#333333] text-[22px] ml-[15px] leading-[1] mt-[10px]">创建站点</div>
        </template>
        <div class="flex flex-col mx-[25px] h-[430px] mt-[15px]">
            <div class="flex items-center">
                <div class="text-[18px] text-[#333333]">站点名称</div>
                <div class="w-[350px] h-[34px] ml-[10px]">
                    <el-form :model="createSiteData.formData" ref="formRef">
                        <el-form-item prop="username">
                            <el-input class="create-site-name" v-model.trim="createSiteData.formData.site_name" maxlength="20" placeholder="请输入站点名称" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <div class="flex-1 mt-[20px] h-[160px]" v-show="createSiteData.step == 1">
                <div class="text-[18px] text-[#333333]">店铺套餐</div>
                <el-scrollbar class="w-full mt-[10px] meal-site -ml-[10px]" height="350px">
                    <div class="w-full whitespace-nowrap" v-show="createSiteData.step == 1">
                        <div v-for="(item, index) in siteGroup" :key="index"
                             class="inline-flex flex-col w-[300px] h-[330px] box-border rounded-[17px] border-transparent border-[2px] border-solid create-site-item my-[10px]"
                            :class="{'bg-[#F6F7FF] border-[#466CEA]': createSiteData.formData.group_id == item.group_id ,'ml-[20px]': index > 0, ' ml-[10px]': index == 0, 'mr-[10px]': (siteGroup.length-1) == index }"
                            @click="createSiteData.formData.group_id = item.group_id">
                            <div class="w-[140px] h-[40px] px-[15px] truncate text-white text-[16px] text-center leading-[40px] creatBg relative -left-[1px] -top-[2px]">
                                {{ item.site_group.group_name }}
                            </div>
                            <el-scrollbar class="flex pb-[20px] pt-[4px] box-border !h-[260px] w-[100%] scrollbarBox">
                                <div class="flex mx-[30px] mt-[14px] leading-[1] items-center w-full" v-for="app in item.site_group.app_name">
                                    <div class="nc-iconfont nc-icon-duiV6mm text-[#466CEA]"></div>
                                    <div class="text-[14px] text-[#666666] ml-[3px] truncate">{{ app }}</div>
                                </div>
                                <div class="flex mx-[30px] mt-[14px] leading-[1] text-center w-full" v-for="addon in item.site_group.addon_name">
                                    <div class="nc-iconfont nc-icon-duiV6mm text-[#466CEA]"></div>
                                    <div class="text-[14px] text-[#666666] ml-[3px] truncate">{{ addon }}</div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="createSiteFn" class="w-[118px] h-[44px] mt-[10px] text-[16px]">创建站点</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref, toRefs, computed, watch} from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getHomeSite, getSiteGroup, createSite } from '@/app/api/home'
import useUserStore from '@/stores/modules/user'
import useSystemStore from '@/stores/modules/system'
import { getWebCopyright } from '@/app/api/sys'
import { getGroupAppList } from '@/app/api/addon'
import { ElMessage } from 'element-plus'
import { AnyObject } from '@/types/global'
import Test from '@/utils/test'
import { img,getToken } from '@/utils/common'

const userStore:AnyObject = useUserStore()
const showMore = ref(false)
const copyright = ref(null)
getWebCopyright().then(({ data }) => {
    copyright.value = data
})
const dialogVisible = ref(false)
const getInfoFn = () => {
    if (copyright.value.copyright_desc) {
        dialogVisible.value = true
    }
}
interface Site{
    params: {
        keywords: string,
        page: number,
        limit: number,
        app: string,
        sort: string
    },
    loading: boolean,
    tableData: {
        logo: string,
        app_name: string,
        site_name: string,
        create_time: string,
        expire_time: string,
        site_id: number,
        group_name: string
    }[],
    total: 0
}

const sortList = ref([
    // {
    //     label: '全部',
    //     value: 'all'
    // },
    {
        label: '创建时间',
        value: 'create_time'
    },
    {
        label: '站点编号',
        value: 'site_id'
    },
    // {
    //     label: '站点类型',
    //     value: 'app_name'
    // }
])

const appList = ref([
    {
        title: 'H5',
        key: 'H5'
    },
    {
        title: '微信小程序',
        key: 'weapp'
    },
    {
        title: 'PC',
        key: 'pc'
    },
    {
        title: 'APP',
        key: 'app'
    },
    {
        title: '支付宝小程序',
        key: 'aliapp'
    }
])

const site:Site = reactive({
    params: {
        keywords: '',
        page: 1,
        limit: 20,
        app: '',
        sort: 'create_time'
    },
    loading: false,
    tableData: [],
    total: 0
})

const { params, loading, tableData } = toRefs(site)
const getHomeSiteFn = (page: number = 1) => {
    site.params.page = page
    site.loading = true
    getHomeSite(site.params).then(res => {
        site.tableData = res.data.data
        site.total = res.data.total
        site.loading = false
    }).catch(() => {
        site.loading = false
    })
}
getHomeSiteFn()

// 切换应用
const cutAppFn = (app:any) => {
    site.params.app = app
    getHomeSiteFn()
}
const typeName = ref('')
const cutAppTypeFn = (app:any) => {
    // site.params.app = app
    typeName.value = app
    getHomeSiteFn()
}

// 网络设置
const webConfig = computed(() => useSystemStore().website)

const selectSite = (site: any) => {
    window.localStorage.setItem('site.siteId', site.site_id)
    window.localStorage.setItem('site.siteInfo', site)
    window.localStorage.setItem('site.comparisonSiteIdStorage', site.site_id)
    window.open(`${ location.origin }/site/`);
}

const toHome = () => {
    if (!window.localStorage.getItem('admin.token')) {
        window.localStorage.setItem('admin.token', getToken())
        window.localStorage.setItem('admin.comparisonTokenStorage', getToken())
    }
    if (!window.localStorage.getItem('admin.userinfo')) {
        window.localStorage.setItem('admin.userinfo', JSON.stringify(useUserStore().userInfo))
    }
    location.replace(location.origin + '/admin')
}

const logoutFn = () => {
    userStore.logout()
}

/**
 * 获取应用列表
 */
const addonList = ref<{
    key: string,
    title: string
}[]>([])
getGroupAppList().then(({ data }) => {
    const apps:any = []
    Object.keys(data).forEach(key => {
        const addon = data[key]
        addon.type == 'app' && apps.push(addon)
    })
    addonList.value = apps
}).catch()

const siteGroupLoading = ref(true)
const siteGroup = ref([])
getSiteGroup().then(({ data }) => {
    !Test.empty(data) && (siteGroup.value = data)
    siteGroupLoading.value = false
}).catch(() => {
    siteGroupLoading.value = false
})

const createSiteDialog = ref(false)
const handleChick = () => {
    if (!siteGroup.value.length) {
        ElMessage('暂无店铺套餐')
        return
    }
    createSiteDialog.value = true
}

const createSiteData = ref({
    step: 1,
    loading: false,
    formData: {
        group_id: 0,
        site_name: ''
    }
})

const createSiteFn = () => {
    if (!createSiteData.value.formData.group_id) {
        ElMessage({ message: '请先选择店铺套餐', type: 'error' })
        return
    }
    if (Test.empty(createSiteData.value.formData.site_name)) {
        ElMessage({ message: '请输入站点名称', type: 'error' })
        return
    }
    if (createSiteData.value.loading) return
    createSiteData.value.loading = true

    createSite(createSiteData.value.formData).then(() => {
        createSiteData.value.loading = false
        createSiteDialog.value = false
        getHomeSiteFn()
    }).catch(() => {
        createSiteData.value.loading = false
    })
}

watch(() => createSiteDialog.value, () => {
    if (!createSiteDialog.value) {
        createSiteData.value = {
            step: 1,
            loading: false,
            formData: {
                group_id: 0,
                site_name: ''
            }
        }
    }
})
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
    @apply rounded-none;
}
.class-select {
    position: relative;
    // font-weight: bold;
    color: var(--el-color-primary);

    &::after {
        content: "";
        position: absolute;
        bottom: 2px;
        height: 2px; /* 下划线的高度 */
        background-color: var(--el-color-primary); /* 下划线颜色 */
        width: 75%;
        left: 12%;
    }
}
.border-color {
    border-color: var(--el-color-primary);
}

.text-color {
    color: var(--el-color-primary);
}
.home-item{
    // box-shadow: 0 2px 4px 0 rgba(161,167,183,0.18);
    background:#fff;
    .items-tab span{
        transform: scale(0.9);
    }
}
.isshow{
    display: none;
}
.home-item:hover {
    box-shadow: 0 0 18px rgba(0,0,0, 0.07);
    // border-color: var(--el-color-primary);
    .title {
        color: var(--el-color-primary);
    }
    .isshow{
        display: block;
    }
    .home-item-head{
        // background-color: #A1A7B7;
        span{
            // color: #fff !important;
        }
    }
}
.home-head{
    background:#fff;
    box-shadow: 0 4px 8px 0 rgba(28,31,55,0.04);
}
.img-shadow{
    box-shadow: 0 0 4px rgba(0,0,0, 0.07);
}
.creatBg{
    background: url('@/app/assets/images/creatBg.png') no-repeat;
}
.create-site-item{
    box-shadow: 0 0 9px 0 rgba(0,0,0,0.1);
}
:deep(.el-button){
    border-radius: 4px !important;
}
:deep(.input-box .el-input__wrapper) {
    box-shadow: none !important;
    border-radius: 4px !important;
}
:deep(.input-box .el-select__wrapper) {
    height: 40px !important;
    box-shadow: none !important;
    border-radius: 4px !important;
}
:deep(.scrollbarBox .el-scrollbar__wrap ){
    width: 100% !important;
}
</style>
<style lang="scss">
.create-site-name .el-input__wrapper{
    border-radius: 6px !important;
}
.meal-site{
    height: calc(100% - 30px) !important;
}
</style>
