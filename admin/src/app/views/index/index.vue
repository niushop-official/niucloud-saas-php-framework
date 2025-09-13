<template>
    <div class="flex items-center justify-center">
        <el-card class="box-card !border-none profile-data w-[1280px] mt-[20px] loading-box" shadow="never" v-loading="loading" >
        <!-- <div>   -->
            <div  class="box-border">
                <div class="bg-[#fff] mb-[20px] rounded-[6px] relative banner-box" v-if="showBanner" @mouseenter="hovering = 'banner'"  @mouseleave="hovering = ''">
                    <span class="absolute right-0 top-[-5px] text-[#999] hover:text-red-500 cursor-pointer z-10"  v-if="hovering === 'banner'">
                        <el-icon class="icon" :size="20" color="#7b7b7b" @click="closeModule('banner')">
                            <CircleCloseFilled />
                        </el-icon>
                    </span>
                    <div class="flex h-[156px]">
                        <div class="w-full h-full ">
                            <el-carousel :interval="3000" height="156px" class="rounded-[6px]">
                                <!-- <el-carousel-item >
                                    <div class="h-full index-carousel" @click="toApplication">
                                        <img :src="img('static/resource/images/banner_1.png')" alt="" class="w-full h-full cursor-pointer">
                                    </div>
                                </el-carousel-item>
                                <el-carousel-item >
                                    <div class="h-full index-carousel" @click="toApplication">
                                        <img :src="img('static/resource/images/banner_2.png')" alt="" class="w-full h-full cursor-pointer">
                                    </div>
                                </el-carousel-item> -->
                               
                                <el-carousel-item  v-for="(item, index) in bannerlistr" :key="index">
                                    <div class="h-full index-carousel" @click="toApplicationurl(item)">
                                        <img :src="item.image" alt="" class="w-full h-full cursor-pointer">
                                    </div>
                                </el-carousel-item>
                                
                            </el-carousel>
                        </div>
                    </div>
                </div>
                <div v-if="showQuickStart" class="mt-[50px] flex items-center justify-between relative" @mouseenter="hovering = 'quickStart'"  @mouseleave="hovering = ''">
                    <span class="absolute right-0 top-[-5px] text-[#999] hover:text-red-500 cursor-pointer z-10"  v-if="hovering === 'quickStart'">
                        <el-icon class="icon" :size="20" color="#7b7b7b" @click="closeModule('quickStart')">
                            <CircleCloseFilled />
                        </el-icon>
                    </span>
                    <div class="w-[67%]">
                        <p class="text-[18px] text-[#1D1F3A] mb-[10px]">快速开始，构建你的项目及应用</p>
                        <p class="text-[14px] text-[#4F516D]">基于Vue3+PHP8+MYSQL8的跨平台应用构建</p>
                        <div class="mt-[20px] grid grid-cols-2 gap-[20px]">
                            <!-- 卡片 1 -->
                            <div class="bg-[#EDEEF4] p-[20px] rounded-[6px] cursor-pointer flex flex-col items-start quick-action-card relative" @click="toLink('/admin/tools/addon')">
                                <div class="title flex items-center">
                                    <span class="iconfont iconkaifayigechajianc !text-[20px] mr-[10px]"></span>
                                    <span class="text-[14px] text-[#1D1F3A]">开发一个插件</span>
                                </div>
                                <div class="absolute bottom-3 left-5 right-4 desc">
                                    <p class="text-[12px] text-[#4F516D]">创建自定义功能扩展</p>
                                </div>
                                <span class="absolute right-4 top-[3px] -translate-y-1/2 text-[16px] iconfont iconFrame-1"></span>
                            </div>
                            <div class="bg-[#EDEEF4] p-[20px] rounded-[6px] cursor-pointer flex flex-col items-start quick-action-card relative" @click="toLink('/admin/tools/code')">
                                <div class="title flex items-center">
                                    <span class="iconfont iconAIshengchengchajianc !text-[20px] mr-[10px]"></span>
                                    <span class="text-[14px] text-[#1D1F3A]">AI生成插件</span>
                                </div>
                                <div class="absolute bottom-3 left-5 right-4 desc">
                                    <p class="text-[12px] text-[#4F516D]">使用AI自动生成插件代码</p>
                                </div>
                                <span class="absolute right-4 top-[3px] -translate-y-1/2 text-[16px] iconfont iconFrame-1"></span>
                            </div>
                            <div class="bg-[#EDEEF4] p-[20px] rounded-[6px] cursor-pointer flex flex-col items-start quick-action-card relative" @click="toHref('/app_manage/app_store','uninstalled')">
                                <div class="title flex items-center">
                                    <span class="iconfont iconanzhuangyigechajian1 !text-[20px] mr-[10px]"></span>
                                    <span class="text-[14px] text-[#1D1F3A]">安装一个插件</span>
                                </div>
                                <div class="absolute bottom-3 left-5 right-4 desc">
                                    <p class="text-[12px] text-[#4F516D]">从市场安装现有插件</p>
                                </div>
                                <span class="absolute right-4 top-[3px] -translate-y-1/2 text-[16px] iconfont iconFrame-1"></span>
                            </div>
                            <div class="bg-[#EDEEF4] p-[20px] rounded-[6px] cursor-pointer flex flex-col items-start quick-action-card relative" @click="toLink('/admin/tools/cloud_compile')">
                                <div class="title flex items-center">
                                    <span class="iconfont iconyunbianyic !text-[20px] mr-[10px]"></span>
                                    <span class="text-[14px] text-[#1D1F3A]">云编译</span>
                                </div>
                                <div class="absolute bottom-3 left-5 right-4 desc">
                                    <p class="text-[12px] text-[#4F516D]">在线编译你的应用</p>
                                </div>
                                <span class="absolute right-4 top-[3px] -translate-y-1/2 text-[16px] iconfont iconFrame-1"></span>
                            </div>
                        </div>
                    </div>
                    <div class="w-[33%] ml-[20px]">
                        <p class="text-[18px] text-[#1D1F3A] mb-[10px]">AI编程</p>
                        <div class="flex items-center text-[14px] text-[#4F516D]">
                            <div :class="['cursor-pointer mr-[20px]', { '!text-primary': activeName1 === '1' }]" @click="activeNameTabFn1('1')">{{ t("插件开发") }}</div>
                            <div :class="['cursor-pointer mr-[20px]', { '!text-primary': activeName1 === '2' }]" @click="activeNameTabFn1('2')">{{ t("插件设计") }}</div>
                            <div :class="['cursor-pointer mr-[20px]', { '!text-primary': activeName1 === '3' }]" @click="activeNameTabFn1('3')">{{ t("APP编译") }}</div>
                            <div :class="['cursor-pointer mr-[20px]', { '!text-primary': activeName1 === '4' }]" @click="activeNameTabFn1('4')">{{ t("小程序发布") }}</div>
                        </div>
                        <div class="bg-[#EDEEF4] h-[160px] rounded-[6px] mt-[20px] text-[#666] cursor-pointer">
                            <video src="@/app/assets/images/index/low-play.mp4" preload="auto" :controls="true" muted autoplay loop class="w-full h-full"></video>
                        </div>
                    </div>
                </div>

                <div v-if="showNiuCloud && appList.length > 0" class="mt-[50px] relative" @mouseenter="hovering = 'niuCloud'"  @mouseleave="hovering = ''">
                    <span class="absolute right-0 top-[-5px] text-[#999] hover:text-red-500 cursor-pointer z-10"  v-if="hovering === 'niuCloud'">
                        <el-icon class="icon" :size="20" color="#7b7b7b" @click="closeModule('niuCloud')">
                            <CircleCloseFilled />
                        </el-icon>
                    </span>
                    <p class="text-[18px] text-[#1D1F3A]">NIUCLOUD生态精选应用推荐</p>
                    <!-- <div class="flex justify-between mt-[20px]">
                        <div class="flex">
                            <div :class="['flex items-center text-[14px] h-[32px] rounded-full px-[20px] mr-[24px] text-[#fff] bg-[#AFB1C8] hover:bg-[#7B7E9A] cursor-pointer', { '!text-[#fff] !bg-[#7B7E9A]': activeName === 'installed' }]" @click="activeNameTabFn('installed')">{{ t("全部") }}</div>
                            <div :class="['flex items-center text-[14px] h-[32px] rounded-full px-[20px] mr-[24px] text-[#fff] bg-[#AFB1C8] hover:bg-[#7B7E9A] cursor-pointer', { '!text-[#fff] !bg-[#7B7E9A]': activeName === 'uninstalled' }]" @click="activeNameTabFn('uninstalled')">{{ t("商城") }}</div>
                            <div :class="['flex items-center text-[14px] h-[32px] rounded-full px-[20px] mr-[24px] text-[#fff] bg-[#AFB1C8] hover:bg-[#7B7E9A] cursor-pointer', { '!text-[#fff] !bg-[#7B7E9A]': activeName === 'all' }]" @click="activeNameTabFn('all')">{{ t("数字人") }}</div>
                            <div :class="['flex items-center text-[14px] h-[32px] rounded-full px-[20px] mr-[24px] text-[#fff] bg-[#AFB1C8] hover:bg-[#7B7E9A] cursor-pointer', { '!text-[#fff] !bg-[#7B7E9A]': activeName === 'all1' }]" @click="activeNameTabFn('all1')">{{ t("拼团") }}</div>
                        </div>
                    </div> -->
                    <div class="mt-[20px]">
                        <div class="grid grid-cols-5 gap-4">
                            <div v-for="(item,index) in appList.slice(0,5)" :key="index" @click="toApplicationDetail(item)" class="bg-[#EDEEF4] rounded-[8px] overflow-hidden text-[#666] cursor-pointer hover:shadow-xl transition-shadow duration-300 border-[1px] border-[#EDEEF4]">
                                <img :src="img(item.app_logo)" alt="" class="w-full rounded-t-[6px]" >
                                <div class="bg-[#fff] p-[10px]">
                                    <div class="text-[16px] text-[#1D1F3A] mb-[10px]">
                                        <span class="using-hidden">{{ item.app_name }}</span>
                                    </div>
                                    <div class="text-[12px] text-[#4F516D]">
                                        <span class="using-hidden">{{ item.app_desc }}</span>
                                    </div>
                                    <div class="text-[12px] mt-[20px] flex justify-between">
                                        <div class="flex items-center">
                                            <img :src="img(item.developer.headimg)" alt="" class="w-[18px] h-[18px] rounded-full mr-[6px]" v-if="item.developer.headimg">
                                            <img src="@/app/assets/images/member_head.png" alt="" class="w-[18px] h-[18px] rounded-full mr-[6px]" v-else>
                                            <span class="text-[#4F516D] text-[12px] using-hidden">{{ item.developer.nickname }}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <div class="mr-[10px]">
                                                <span class="iconfont iconchakan !text-[12px] mr-[8px] !text-[#4F516D]"></span>
                                                <span class="text-[#4F516D] text-[12px]">{{ item.visit_num}}</span>
                                            </div>
                                            <div>
                                                <span class="iconfont iconxiaoliang !text-[12px] mr-[8px] !text-[#4F516D]"></span>
                                                <span class="text-[#4F516D] text-[12px]">{{ item.sale_num }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-[18px]  mt-[50px] mb-[15px]">{{ t("dataSummarize") }}</div>
                <el-card class="box-card !border-none profile-data" shadow="never">
                    <el-row :gutter="20" class="top">
                        <el-col>
                            <el-card shadow="never" @click="toHref('site/manage','1')" class="cursor-pointer min-w-[180px] first-con">
                                <div class="text-[20px] font-bold">{{ statInfo.today_data.norma_site_count }}</div>
                                <div class="text-[14px] mb-[9px] text-[#4F516D]">{{ t("normalSiteSum") }}</div>
                            </el-card>
                        </el-col>
                        <el-col>
                            <el-card shadow="never" @click="toHref('site/manage','1')" class="cursor-pointer min-w-[180px] first-con">
                                <div class="text-[20px] font-bold">{{ statInfo.today_data.week_expire_site_count }}</div>
                                <div class="text-[14px] mb-[9px] text-[#4F516D]">{{ t("weekExpireSiteCount") }}</div>
                            </el-card>
                        </el-col>
                        <el-col>
                            <el-card shadow="never" @click="toHref('site/manage','2')" class="cursor-pointer min-w-[180px] first-con">
                                <div class="text-[20px] font-bold">{{ statInfo.today_data.expire_site_count }}</div>
                                <div class="text-[14px] mb-[9px] text-[#4F516D]">{{ t("expireSiteSum") }}</div>
                            </el-card>
                        </el-col>
                        <el-col>
                            <el-card shadow="never" @click="toHref('/app_manage/app_store','uninstalled')" class="cursor-pointer min-w-[180px] first-con">
                                <div class="text-[20px] font-bold">{{ statInfo.app.app_no_installed_count }}</div>
                                <div class="text-[14px] mb-[9px] text-[#4F516D]">{{ t("noInstallAppSun") }}</div>
                            </el-card>
                        </el-col>
                        <el-col>
                            <el-card shadow="never" @click="toHref('/app_manage/app_store','installed')" class="cursor-pointer min-w-[180px] first-con">
                                <div class="text-[20px] font-bold">{{ statInfo.app.app_installed_count }}</div>
                                <div class="text-[14px] mb-[9px] text-[#4F516D]">{{ t("installAppSun") }}</div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
                <div class="text-[18px] mt-[50px] mb-[15px]">{{ t("常用功能") }}</div>
                <div class="flex justify-between">
                    <div class="flex-1 h-[80px] flex  items-center cursor-pointer mr-[25px] bg-[#EDEEF4] rounded-[6px] pl-[25px] hover:bg-[#dcdfe6] transition-all duration-300" @click="toTypeLink('site/manage','list')">
                        <img class="w-[32px] h-[32px] " src="@/app/assets/images/index/site_list1.png" />
                        <span class="text-[14px] ml-3">{{ t("siteList") }}</span>
                    </div>
                    <div class="flex-1 h-[80px] flex  items-center cursor-pointer mr-[25px] bg-[#EDEEF4] rounded-[6px] pl-[25px] hover:bg-[#dcdfe6] transition-all duration-300" @click="toTypeLink('site/manage','group')">
                        <img class="w-[32px] h-[32px] " src="@/app/assets/images/index/site_tc1.png" />
                        <span class="text-[14px] ml-3">{{ t("sitePackage") }}</span>
                    </div>
                    <div class="flex-1 h-[80px] flex items-center cursor-pointer mr-[25px] bg-[#EDEEF4] rounded-[6px] pl-[25px] hover:bg-[#dcdfe6] transition-all duration-300" @click="toTypeLink('site/manage','list')" >
                        <img class="w-[32px] h-[32px] " src="@/app/assets/images/index/site_add1.png" />
                        <span class="text-[14px] ml-3">{{ t("newSite") }}</span>
                    </div>
                    <div class="flex-1 h-[80px] flex items-center cursor-pointer mr-[25px] bg-[#EDEEF4] rounded-[6px] pl-[25px] hover:bg-[#dcdfe6] transition-all duration-300" @click="toLink('/admin/site/user')">
                        <img class="w-[32px] h-[32px] " src="@/app/assets/images/index/site_user1.png" />
                        <span class="text-[14px] ml-3">{{ t("administrator") }}</span>
                    </div>
                    <div class="flex-1 h-[80px] flex items-center cursor-pointer bg-[#EDEEF4] rounded-[6px] pl-[25px] hover:bg-[#dcdfe6] transition-all duration-300" @click="toApplication">
                        <img class="w-[32px] h-[32px] " src="@/app/assets/images/index/app_store1.png" />
                        <span class="text-[14px] ml-3">{{ t("appMarketplace") }}</span>
                    </div>
                </div>

                <div class="mt-[50px] flex site">
                    <div class="flex-1 ">
                        <div class="text-[18px]  mb-[15px]">{{ t("newSite") }}</div>
                        <el-card class="box-card border mr-[30px] echarts-box" shadow="never">
                            <div ref="newSiteStat" class="echarts-con" :style="{ width: '100%', height: '280px' }"></div>
                        </el-card>
                    </div>
                    <div class="flex-1 ">
                        <div class="text-[18px]  mb-[15px]">{{ t("addUser") }}</div>
                        <el-card class="box-card border flex-1 echarts-box" shadow="never">
                            <div ref="addUser" class="echarts-con" :style="{ width: '100%', height: '280px' }"></div>
                        </el-card>
                    </div>
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
        <!-- </div>   -->
        </el-card>
        <el-dialog v-model="dialogVisible" title="版权信息" width="500">
            <span>{{ copyright.copyright_desc }}</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch ,onMounted} from 'vue'
import { t } from '@/lang'
import { getStatInfo } from '@/app/api/stat'
import { getAppIndex ,getAdvList} from '@/app/api/addon'
import * as echarts from 'echarts'
import { getFrameworkNewVersion } from '@/app/api/module'
import { getWebCopyright } from '@/app/api/sys'
import { useRoute, useRouter } from 'vue-router'
import { AnyObject } from '@/types/global'
import useStyleStore from '@/stores/modules/style'
import { img } from '@/utils/common'

const activeName = ref('installed')

const activeNameTabFn = (data: any) => {
    activeName.value = data
}
const activeName1 = ref('1')

const activeNameTabFn1 = (data: any) => {
    activeName1.value = data
}
const dialogVisible = ref(false)
const loading = ref(true)
const newSiteStat = ref<any>(null)
const addUser = ref<any>(null)
const styleStore = useStyleStore()

const copyright = ref(null)
getWebCopyright().then(({ data }) => {
    copyright.value = data
})

interface NewVersion {
    last_version: string
}

interface StatInfo {
    today_data: AnyObject,
    system: AnyObject,
    version: AnyObject,
    about: any,
    site_stat: AnyObject,
    site_group_stat: AnyObject,
    member_count_stat: AnyObject,
    app: AnyObject
}

const newVersion = ref<NewVersion>({
    last_version: ''
})

// 插件
const appList = ref<any>([])
const getAppIndexFn = () => {
    getAppIndex().then((res) => {
        appList.value = res.data
    })
}

const bannerlistr = ref<any>([])
const getAdvListFn = () => {
    getAdvList().then((res) => {
        bannerlistr.value = res.data
    })
}

const getInfoFn = () => {
    if (copyright.value.copyright_desc) {
        dialogVisible.value = true
    }
}

getFrameworkNewVersion().then(({ data }) => {
    newVersion.value = data
})

const statInfo = ref<StatInfo>({
    today_data: {},
    system: {},
    version: {},
    about: [],
    member_count_stat: {},
    site_stat: {},
    site_group_stat: {},
    app: {}
})

const getStatInfoFn = async() => {
    statInfo.value = await (await getStatInfo()).data
    setTimeout(() => {
        drawChart()
    }, 20)
}


// 绘制折线图
const drawChart = () => {
    // 新增站点
    const newSiteStatChart = echarts.init(newSiteStat.value)
    const newSiteStatOption = ref({
        legend: {},
        xAxis: {
            data: []
        },
        yAxis: {},
        tooltip: {
            trigger: 'axis'
        },
        series: [
            {
                name: t('newSite'),
                type: 'line',
                data: [],
                itemStyle: {
                    normal: {
                        color: '#2FCEB6' //点的颜色
                    }
                },
                lineStyle: {
                    color: '#2FCEB6' //线的颜色
                }
            },

        ]
    })
    newSiteStatOption.value.xAxis.data = statInfo.value.site_stat.date
    newSiteStatOption.value.series[0].data = statInfo.value.site_stat.value
    newSiteStatChart.setOption(newSiteStatOption.value)

    // 新增用户
    const newUserChart = echarts.init(addUser.value)
    const newUserOption: AnyObject = ref({
        legend: {},
        xAxis: {
            data: []
        },
        yAxis: {},
        tooltip: {
            trigger: 'axis'
        },
        series: [
            {
                name: t('addUser'),
                type: 'line',
                data: [],
                itemStyle: {
                    normal: {
                        color: '#F7DC76' //点的颜色
                    }
                },
                lineStyle: {
                    color: '#F7DC76' //线的颜色
                }
            }
        ]
    })
    newUserOption.value.xAxis.data = statInfo.value.member_count_stat.date
    newUserOption.value.series[0].data = statInfo.value.member_count_stat.value
    newUserChart.setOption(newUserOption.value)

    window.addEventListener('resize', () => {
        // 页面大小变化后Echarts也更改大小
        newSiteStatChart.resize()
        newUserChart.resize()
    })
}

const router = useRouter()
const route = useRoute()
if (route.path == '/admin/index') {
    styleStore.changeStyle()
}
watch(() => route.path, (newval, oldval) => {
    if (newval !== '/admin/index') {
        styleStore.changeBlack()
    }
})

/**
 * 链接跳转
 */
const toLink = (link: any) => {
    router.push(link)
}
const toHref = (url: any,id: any) => {
    router.push({
        path: url,
        query: { id }
    })
}
const toTypeLink = (url: any,type: any) => {
    router.push({
        path: url,
        query: { type }
    })
}
const toApplication = () => {
    window.open('https://www.niucloud.com/app')
}
const toApplicationurl = (item: any) => {
    window.open(item.url)
}
const toApplicationDetail = (item: any) => {
    window.open(`https://www.niucloud.com/app/detail?id=${item.app_id}`)
}
// 更新时间
const time = ref('')
const nowTime = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hh = checkTime(date.getHours())
    const mm = checkTime(date.getMinutes())
    const ss = checkTime(date.getSeconds())

    function checkTime(i: any) {
        if (i < 10) {
            return '0' + i
        }
        return i
    }

    time.value = year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
}
nowTime()

const showQuickStart = ref(true)
const showNiuCloud = ref(true)
const showBanner = ref(true)
const hovering = ref('')

onMounted(() => {
    showQuickStart.value = localStorage.getItem('showQuickStart') !== 'false'
    showNiuCloud.value = localStorage.getItem('showNiuCloud') !== 'false'
    showBanner.value = localStorage.getItem('showBanner') !== 'false'

      // 定义异步初始化函数
  const initData = async () => {
    loading.value = true;
    try {
        await Promise.all([
        getStatInfoFn(),
        getAdvListFn(),
        getAppIndexFn()
      ]);

      loading.value = false;
    } catch (error) {
        console.error('初始化失败', error);
        loading.value = false;
    }
  };
  // 执行初始化函数
  initData();
})

const closeModule = (module:any) => {
    if (module === 'quickStart') {
        showQuickStart.value = false
        localStorage.setItem('showQuickStart', 'false')
    } else if (module === 'niuCloud') {
        showNiuCloud.value = false
        localStorage.setItem('showNiuCloud', 'false')
    } else if (module === 'banner') {
        showBanner.value = false
        localStorage.setItem('showBanner', 'false')
    }
}
</script>

<style lang="scss" scoped>
.profile-data {
    background-color: transparent !important;
}

:deep(.profile-data .el-card__header) {
    padding: 0 !important;
    border: none !important;
}

:deep(.profile-data .el-card__body) {
    padding: 0 !important;
}

.top :deep(.el-col) {
    max-width: calc(100% / 5) !important;
}

.first-con {
    // border: 1px solid #E9ECEF;
    // background: #fff;
    padding: 20px 30px 10px;
    // height: 80px;
    background: #EDEEF4 !important;
    border-radius: 6px !important;
    border: none !important;
    &:hover {
        background: #dcdfe6 !important; // 你可以换成你想要的颜色
    }
}

.echarts-con {
    // border: 1px solid #E9ECEF;
    // background: #fff;
    padding-top: 20px;
    border-radius: 6px !important;
}
.echarts-box{
    border-radius: 6px !important;
}

.quick-action-card {
  position: relative;
  overflow: visible; /* 允许伪元素超出 */
  z-index: 0;
}

/* 伪元素作为视觉外壳 */
.quick-action-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #EDEEF4;
  border-radius: 8px;
  z-index: -1;
  transition: transform 0.3s ease;
}

/* 悬浮时放大背景，但不动内容 */
.quick-action-card:hover::before {
  transform: scaleY(1.3);
  transform-origin: center;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.desc{
  opacity: 0;
  transition: opacity 0.3s ease;
}

.quick-action-card:hover > .desc{
  opacity: 1;
}
.quick-action-card > span:last-child {
  opacity: 0;
  transform: translate(-8px, 8px); /* 初始位置稍微向下右 */
  transition: all 0.3s ease;
}

.quick-action-card:hover > span:last-child {
  opacity: 1;
  transform: translate(0, 0); /* 回到原位（实现右上浮动） */
}


.quick-action-card:hover > .desc,
.quick-action-card:hover > span:last-child {
  opacity: 1;
}
.quick-action-card:hover > .title {
  transform: translateY(-15px);
}

.title {
  transition: transform 0.3s ease; 
}
:deep(.banner-box .el-carousel__indicator){
    padding: 2px !important;
}
:deep(.loading-box .el-loading-spinner){
    top: 33%;
}
</style>
