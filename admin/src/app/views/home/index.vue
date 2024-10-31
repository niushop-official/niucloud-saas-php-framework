<template>
    <div>
        <div class="flex justify-between items-center py-[24px] pl-[62px] pr-[64px] home-head">
            <div class="flex items-center" v-if="webConfig">
                <img class="w-[32x] h-[32px] rounded-full" v-if="webConfig.icon" :src="img(webConfig.icon)" alt="">
                <img class="w-[32x] h-[32px] rounded-full" v-else src="@/app/assets/images/icon-addon.png" alt="">
                <span class="ml-[10px] text-[16px] font-bold">{{webConfig.site_name}}</span>
            </div>
            <div class="flex items-center">
                <span class="mr-[12px] text-[14px]">{{userStore.userInfo.username}}</span>
                <span @click="logoutFn()" class="text-[14px] cursor-pointer text-[var(--el-color-primary)]">退出</span>
            </div>
        </div>

        <div class="w-[1200px] m-auto  mt-[62px]">
            <div class="flex justify-between items-center">
                <span class="text-[24px] font-bold">站点列表</span>
                <el-button type="primary" class="w-[90px] !h-[34px]" :disabled="siteGroupLoading" @click="handleChick">创建站点</el-button>
            </div>
            <div class="flex justify-between items-center mt-[18px]">
                <div class="w-[800px] text-[14px] whitespace-nowrap">
                    <el-scrollbar :always="true">
                        <span :class="['px-[10px] cursor-pointer h-[35px] leading-[35px] inline-block', {'text-[var(--el-color-primary)]': params.app == ''}]" @click="cutAppFn('')">所有应用</span>
                        <span :class="['px-[10px] cursor-pointer h-[35px] leading-[35px] inline-block', {'text-[var(--el-color-primary)]': params.app == item.key}]" @click="cutAppFn(item.key)" v-for="(item,index) in addonList" :key="index">{{item.title}}</span>
                    </el-scrollbar>
                </div>
                <el-input v-model.trim="params.keywords" class="!w-[300px] !h-[34px]" placeholder="请输入要搜索的站点名称/编号" @keyup.enter.native="getHomeSiteFn()">
                    <template #suffix>
                        <el-icon @click.stop="getHomeSiteFn()" class="cursor-pointer">
                            <Search />
                        </el-icon>
                    </template>
                </el-input>
            </div>

            <div class="min-h-[580px]">
                <div class="flex flex-wrap mt-[30px]" v-loading="loading">
                    <div v-for="(item, index) in tableData" :key="index" @click="selectSite(item)" :class="['home-item w-[285px] box-border mb-[20px] cursor-pointer',{'mr-[20px]': index ==0 || (index+1)%4 != 0}]">
                        <div class="flex items-center px-[24px] pt-[22px] pb-[16px] bg-[#F0F2F4] home-item-head relative">
                            <div class="absolute h-[5px] w-full z-1 left-0 top-0" :style="{'background-color': item.theme_color}" v-if="item.theme_color"></div>
                            <img v-if="item.icon" class="w-[48px] h-[48px] mr-[15px] rounded-[50%] overflow-hidden" :src="img(item.icon)" />
                            <img v-else class="w-[48px] h-[48px] mr-[15px] rounded-[50%] overflow-hidden" src="@/app/assets/images/member_head.png" />
                            <div class="flex flex-col flex-1 justify-center">
                                <div class="flex items-center flex-wrap">
                                    <span class="text-[16px] text-[#000] max-w-[145px] font-bold truncate mr-[10px]">{{item.site_name}}</span>
                                    <div class="flex items-center justify-center min-w-[42px] h-[18px] bg-[#FF5500] rounded-tl-md rounded-br-md items-tab" v-if="item.app_name">
                                        <span class="text-[12px] text-[#fff]">{{item.app_name}}</span>
                                    </div>
                                </div>
                                <span class="text-[12px] mt-[3px] text-[#555]">{{item.create_time ? item.create_time.split(" ")[0] : '--'}} 到 {{item.expire_time ? item.expire_time.split(" ")[0] : '--'}}</span>
                            </div>
                        </div>
                        <div class="px-[24px] py-[20px] text-[#6D7278]">
                            <p class="text-[14px]">站点编号：{{item.site_id}}</p>
                            <p class="text-[14px] mt-[2px]">站点套餐：{{item.group_name || '--'}}</p>
                        </div>
                    </div>
                    <div v-if="!tableData.length && !loading" class="m-auto mt-[100px]">
                        <img src="@/app/assets/images/site_empty.png"/>
                        <p class="text-center text-gray-400 mt-[20px]">暂无站点</p>
                    </div>
                </div>
            </div>

            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="site.params.page" v-model:page-size="site.params.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="site.total"
                    @size-change="getHomeSiteFn()" @current-change="getHomeSiteFn" :hide-on-single-page="true"/>
            </div>
        </div>
    </div>

    <el-dialog v-model="createSiteDialog" width="54vw" :destroy-on-close="true" style="border-radius: 25px;">
        <template #title>
            <div class="text-[#333333] text-[22px] ml-[15px] leading-[1] mt-[10px]">创建站点</div>
        </template>
        <div class="flex flex-col mx-[25px] h-[430px] mt-[15px]">
            <div class="flex items-center">
                <div class="text-[18px] text-[#333333]">站点名称</div>
                <div class="w-[420px] h-[34px] ml-[10px]">
                    <el-form :model="createSiteData.formData" ref="formRef" :rules="formRules">
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
                            @click="createSiteData.formData.group_id = item.group_id"
                        >
                            <div class="w-[140px] h-[40px] px-[15px] truncate text-white text-[16px] text-center leading-[40px] creatBg relative -left-[1px] -top-[2px]">
                                {{ item.site_group.group_name }}
                            </div>
                            <el-scrollbar class="flex pb-[20px] pt-[4px] box-border !h-[260px]">
                                <div class="flex mx-[30px] mt-[14px] leading-[1] items-center" v-for="app in item.site_group.app_name">
                                    <div class="nc-iconfont nc-icon-duiV6mm text-[#466CEA]"></div>
                                    <div class="text-[14px] text-[#666666] ml-[3px] truncate">{{ app }}</div>
                                </div>
                                <div class="flex mx-[30px] mt-[14px] leading-[1] text-center" v-for="addon in item.site_group.addon_name">
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
import { img } from '@/utils/common'
import useUserStore from '@/stores/modules/user'
import useSystemStore from '@/stores/modules/system'
import storage from '@/utils/storage'
import { getInstalledAddonList } from '@/app/api/addon'
import { ElMessage } from 'element-plus'
import { AnyObject } from '@/types/global'
import Test from '@/utils/test'

const userStore:AnyObject = useUserStore()

interface Site{
    params: {
        keywords: string,
        page: number,
        limit: number,
        app: string,
        sort: boolean
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

const site:Site = reactive({
    params: {
        keywords: '',
        page: 1,
        limit: 12,
        app: '',
        sort: false
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

// 网络设置
const webConfig = computed(() => useSystemStore().website)

const selectSite = (site: any) => {
    storage.set({ key: 'siteId', data: site.site_id })
    storage.set({ key: 'siteInfo', data: site })
    storage.set({ key: 'comparisonSiteIdStorage', data: site.site_id })
    location.href = `${location.origin}/site/`
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
getInstalledAddonList().then(({ data }) => {
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

.border-color {
    border-color: var(--el-color-primary);
}

.text-color {
    color: var(--el-color-primary);
}
.home-item{
    box-shadow: 0 2px 4px 0 rgba(161,167,183,0.18);
    .items-tab span{
        transform: scale(0.9);
    }
}
.home-item:hover {
    border-color: var(--el-color-primary);
    .title {
        color: var(--el-color-primary);
    }
    .home-item-head{
        background-color: #A1A7B7;
        span{
            color: #fff !important;
        }
    }
}
.home-head{
    box-shadow: 0 4px 8px 0 rgba(28,31,55,0.04);
}
.creatBg{
    background: url('@/app/assets/images/creatBg.png');
    background-repeat: no-repeat;
}
.create-site-item{
    box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
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