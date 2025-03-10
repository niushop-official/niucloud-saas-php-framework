<template>
    <div v-loading="loading" >
        <el-card class="box-card !border-none" shadow="never">
            <div class="box-border">
                <el-card class="box-card !border-none profile-data" shadow="never">
                    <template #header>
                        <div class="border-none w-full">
                            <span class="text-[16px]">{{ t("dataSummarize") }}</span>
                            <!-- <span class="text-[12px] text-[#666] leading-[16px] ml-[18px]">更新时间 : </span>
                            <span class="text-[12px] text-[#666] leading-[16px]">{{ time }}</span> -->
                        </div>
                    </template>

                    <el-row :gutter="20" class="mt-[15px] top">
                        <el-col> 
                            <el-card shadow="never" @click="toHref('site/list','1')" class="box-card border cursor-pointer min-w-[180px] first-con">
                                <img class="max-w-[24px] max-h-[24px] mb-[10px]" src="@/app/assets/images/index/site_normal.png" />
                                <el-statistic :value="statInfo.today_data.norma_site_count">
                                    <template #title>
                                        <div class="text-[14px] mb-[15px] text-[#666]">
                                            {{ t("normalSiteSum") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </el-card>
                        </el-col>
                        <el-col>
                            <el-card shadow="never" @click="toHref('site/list','1')" class="cursor-pointer min-w-[180px] first-con">
                                <img class="max-w-[24px] max-h-[24px] mb-[10px]" src="@/app/assets/images/index/site2.png" />
                                <el-statistic :value="statInfo.today_data.week_expire_site_count">
                                    <template #title>
                                        <div class="text-[14px] mb-[15px] text-[#666]">
                                            {{ t("weekExpireSiteCount") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </el-card>
                        </el-col>
                        <el-col>
                            <el-card shadow="never" @click="toHref('site/list','2')" class="cursor-pointer min-w-[180px] first-con">
                                <img class="max-w-[24px] max-h-[24px] mb-[15px]" src="@/app/assets/images/index/site3.png" />
                                <el-statistic :value="statInfo.today_data.expire_site_count">
                                    <template #title>
                                        <div class="text-[14px] mb-[9px] text-[#666]">
                                            {{ t("expireSiteSum") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </el-card>
                        </el-col>
                        <el-col>
                            <el-card shadow="never" @click="toHref('/app_manage/app_store','uninstalled')" class="cursor-pointer min-w-[180px] first-con">
                                <img class="max-w-[24px] max-h-[24px] mb-[15px]" src="@/app/assets/images/index/not_install.png" />
                                <el-statistic :value="statInfo.app.app_no_installed_count">
                                    <template #title>
                                        <div class="text-[14px] mb-[9px] text-[#666]">
                                            {{ t("noInstallAppSun") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </el-card>
                        </el-col>
                        <el-col>
                            <el-card shadow="never"   @click="toHref('/app_manage/app_store','installed')" class="cursor-pointer min-w-[180px] first-con">
                                <img class="max-w-[24px] max-h-[24px] mb-[10px]" src="@/app/assets/images/index/install.png" />
                                <el-statistic :value="statInfo.app.app_installed_count">
                                    <template #title>
                                        <div class="text-[14px] mb-[9px] text-[#666]">
                                            {{ t("installAppSun") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
                <div class="text-[16px] mt-[20px] mb-[15px]">{{ t("常用功能") }}</div>
                <el-card class="box-card border" shadow="never">
                    <div class="flex justify-between" >
                        <div class="flex-1 h-[125px] flex justify-center flex-col items-center cursor-pointer mr-[25px]" @click="toLink('site/list')">
                            <img class="w-[64px] h-[64px] mb-[5px]" src="@/app/assets/images/index/site_list.png" />
                            <span class="text-[14px]">{{ t("siteList") }}</span>
                        </div>
                        <div class="flex-1 h-[125px] flex justify-center flex-col items-center cursor-pointer mr-[25px]" @click="toLink('site/group')">
                            <img class="w-[64px] h-[64px] mb-[5px]" src="@/app/assets/images/index/site_tc.png" />
                            <span class="text-[14px]">{{ t("sitePackage") }}</span>
                        </div>
                        <div class="flex-1 h-[125px] flex justify-center flex-col items-center cursor-pointer mr-[25px]" @click="toLink('site/list')">
                            <img class="w-[64px] h-[64px] mb-[5px]" src="@/app/assets/images/index/site_add.png" />
                            <span class="text-[14px]">{{ t("newSite") }}</span>
                        </div>
                        <div class="flex-1 h-[125px] flex justify-center flex-col items-center cursor-pointer mr-[25px]" @click="toLink('/admin/site/user')">
                            <img class="w-[64px] h-[64px] mb-[5px]" src="@/app/assets/images/index/site_user.png" />
                            <span class="text-[14px]">{{ t("administrator") }}</span>
                        </div>
                        <div class="flex-1 h-[125px] flex justify-center flex-col items-center cursor-pointer" @click="toApplication">
                            <img class="w-[64px] h-[64px] mb-[5px]" src="@/app/assets/images/index/app_store.png" />
                            <span class="text-[14px]">{{ t("appMarketplace") }}</span>
                        </div>
                    </div>
                </el-card> 
                

                <div class="mt-[20px] flex site">
                    <div class="flex-1 ">
                       <div class="text-[16px] mb-[15px]">{{ t("newSite") }}</div>
                        <el-card class="box-card border profile-data mr-[30px]" shadow="never">
                            <template #header>
                        
                            </template>
                            <div ref="newSiteStat" class="echarts-con" :style="{ width: '100%', height: '320px' }"></div>
                        </el-card> 
                    </div>
                    <div class="flex-1 ">
                        <div class="text-[16px] mb-[15px]">{{ t("addUser") }}</div>
                        <el-card class="box-card border flex-1 profile-data" shadow="never">
                            <template #header>
                            </template>
                            <div ref="addUser" class="echarts-con" :style="{ width: '100%', height: '320px' }"></div>
                        </el-card>
                    </div>
                </div>
                <div class="flex justify-between text-[12px] mt-[20px] text-[#666]" v-if="copyright">
                <div>
                    <a :href="copyright.copyright_link" target="_blank">
                            <!-- <span class="mr-3" v-if="copyright.copyright_desc">{{ copyright.copyright_desc }}</span> -->
                            <span class="mr-3" v-if="copyright.company_name">{{ copyright.company_name }}</span>
                    </a>
                    <a href="https://beian.miit.gov.cn/" v-if="copyright.icp" target="_blank">
                            <span class="mr-3">{{ copyright.icp }}</span>
                    </a>
                </div>
                <div class="flex items-center  cursor-pointer"> 
                    <span class="mx-1" @click="getInfoFn">版权信息</span> | <span class="mx-1">开发者联盟与隐私的声明</span> | <span class="mx-1">隐私政策</span> | <span class="mx-1">联系我们</span> | <span class="mx-1">Cookies</span> 
                </div>
            </div>
            </div>
            
        </el-card>
        <el-dialog v-model="dialogVisible" title="版权信息" width="500">
            <span>{{ copyright.copyright_desc }}</span>
            <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">
                确定
                </el-button>
            </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { t } from '@/lang'
import { getStatInfo } from '@/app/api/stat'
import * as echarts from 'echarts'
import { getFrameworkNewVersion } from '@/app/api/module'
import { getWebCopyright } from '@/app/api/sys'
import { useRoute, useRouter } from 'vue-router'
import { AnyObject } from '@/types/global'
import useStyleStore from '@/stores/modules/style'
import Storage from '@/utils/storage'

const dialogVisible = ref(false)
const loading = ref(true)
const newSiteStat = ref<any>(null)
const addUser = ref<any>(null)
const styleStore = useStyleStore()
const currLayout = ref(Storage.get('admin_layout') || 'admin')

const copyright = ref(null)
getWebCopyright().then(({ data }) => {
    copyright.value = data   
})
interface NewVersion{
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

const getInfoFn = () => {
    if(copyright.value.copyright_desc){
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

const getStatInfoFn = async () => {
    statInfo.value = await (await getStatInfo()).data
    loading.value = false
    setTimeout(() => {
        drawChart()
    }, 20)
}
getStatInfoFn()

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
                itemStyle:{
                    normal:{
                        color:'#2FCEB6',//点的颜色
                    }
                },
                lineStyle:{
                    color:'#2FCEB6',//线的颜色
                }
            },
            
        ]
    })
    newSiteStatOption.value.xAxis.data = statInfo.value.site_stat.date
    newSiteStatOption.value.series[0].data = statInfo.value.site_stat.value
    newSiteStatChart.setOption(newSiteStatOption.value)

    // 新增用户
    const newUserChart = echarts.init(addUser.value)
    const newUserOption:AnyObject = ref({
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
                itemStyle:{
                    normal:{
                        color:'#F7DC76',//点的颜色
                    }
                },
                lineStyle:{
                    color:'#F7DC76',//线的颜色
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
const toLink = (link:any) => {
    router.push(link)
}
const toHref = (url:any, id:any) => {
    router.push({
        path: url,
        query: { id }
    })
}
const toApplication = () => {
    window.open('https://www.niucloud.com/app')
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
    function checkTime (i:any) {
        if (i < 10) {
            return '0' + i
        }
        return i
    }
    time.value = year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
}
nowTime()

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
        padding:  0 !important;
    }
    .top :deep(.el-col){
        max-width: calc(100% / 5) !important;
    }
    .first-con{
        // border: 1px solid #E9ECEF;
        // background: #fff;
        padding: 20px 30px 10px;
        height: 160px;
        // border-radius: 8px;
    }
    .echarts-con{
        // border: 1px solid #E9ECEF;
        // background: #fff;
        padding-top:20px;
        // border-radius: 8px;
    }
</style>
