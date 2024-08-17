<template>
    <div v-loading="loading">
        <el-card class="box-card !border-none" shadow="never">
            <div class="p-[30px] box-border border-[1px] border-[var(--el-border-color)] border-solid bg-[var(--el-bg-color)]">
                <el-card class="box-card !border-none profile-data" shadow="never">
                    <template #header>
                        <div class="card-header mb-[20px] w-full">
                            <span class="text-[18px]">{{ t("dataSummarize") }}</span>
                            <span class="text-[12px] text-[#666] leading-[16px] ml-[18px]">更新时间 : </span>
                            <span class="text-[12px] text-[#666] leading-[16px]">{{ time }}</span>
                        </div>
                    </template>

                    <el-row :gutter="20" class="mt-[20px] top">
                        <el-col>
                            <div @click="toHref('site/list','1')" class="cursor-pointer">
                                <el-statistic :value="statInfo.today_data.norma_site_count" >
                                    <template #title>
                                        <div class="text-[14px] mb-[9px] text-[#666]">
                                            {{ t("normalSiteSum") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col>
                            <div @click="toHref('site/list','1')" class="cursor-pointer">
                                <el-statistic :value="statInfo.today_data.week_expire_site_count" >
                                    <template #title>
                                        <div class="text-[14px] mb-[9px] text-[#666]">
                                            {{ t("weekExpireSiteCount") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col>
                            <div @click="toHref('site/list','2')" class="cursor-pointer">
                                <el-statistic :value="statInfo.today_data.expire_site_count">
                                    <template #title>
                                        <div class="text-[14px] mb-[9px] text-[#666]">
                                            {{ t("expireSiteSum") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col>
                            <div @click="toHref('/app_manage/app_store','uninstalled')" class="cursor-pointer">
                                <el-statistic :value="statInfo.app.app_no_installed_count">
                                    <template #title>
                                        <div class="text-[14px] mb-[9px] text-[#666]">
                                            {{ t("noInstallAppSun") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col>
                            <div @click="toHref('/app_manage/app_store','installed')" class="cursor-pointer">
                                <el-statistic :value="statInfo.app.app_installed_count">
                                    <template #title>
                                        <div class="text-[14px] mb-[9px] text-[#666]">
                                            {{ t("installAppSun") }}
                                        </div>
                                    </template>
                                </el-statistic>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
                
                <div class="flex justify-between mt-[15px]">
                    <div class="flex-1 h-[145px] bg-[var(--el-color-info-light-9)] flex justify-center flex-col items-center cursor-pointer mr-[25px]" @click="toLink('site/list')">
                        <img class="max-w-[40px] max-h-[40px] mb-[5px]" src="@/app/assets/images/index/site1.png" />
                        <span class="text-[16px]">{{ t("siteList") }}</span>
                    </div>
                    <div class="flex-1 h-[145px] bg-[var(--el-color-info-light-9)] flex justify-center flex-col items-center cursor-pointer mr-[25px]" @click="toLink('site/group')">
                        <img class="max-w-[40px] max-h-[40px] mb-[5px]" src="@/app/assets/images/index/site_class1.png" />
                        <span class="text-[16px]">{{ t("sitePackage") }}</span>
                    </div>
                    <div class="flex-1 h-[145px] bg-[var(--el-color-info-light-9)] flex justify-center flex-col items-center cursor-pointer mr-[25px]" @click="toLink('site/list')">
                        <img class="max-w-[40px] max-h-[40px] mb-[5px]" src="@/app/assets/images/index/new_site1.png" />
                        <span class="text-[16px]">{{ t("newSite") }}</span>
                    </div>
                    <div class="flex-1 h-[145px] bg-[var(--el-color-info-light-9)] flex justify-center flex-col items-center cursor-pointer mr-[25px]" @click="toLink('/admin/site/user')">
                        <img class="max-w-[40px] max-h-[40px] mb-[5px]" src="@/app/assets/images/index/auth1.png" />
                        <span class="text-[16px]">{{ t("administrator") }}</span>
                    </div>
                    <div class="flex-1 h-[145px] bg-[var(--el-color-info-light-9)] flex justify-center flex-col items-center cursor-pointer" @click="toApplication">
                        <img class="max-w-[40px] max-h-[40px] mb-[5px]" src="@/app/assets/images/index/app1.png" />
                        <span class="text-[16px]">{{ t("appMarketplace") }}</span>
                    </div>
                </div>

                <div class="mt-[60px] flex site">
                    <el-card class="box-card !border-none flex-1 profile-data mr-[30px]" shadow="never">
                        <template #header>
                            <div class="card-header mb-[20px]">
                                <span class="text-[18px]">{{ t("newSite") }}</span>
                            </div>
                        </template>
                        <div ref="newSiteStat" class="mt-[20px]" :style="{ width: '100%', height: '300px' }"></div>
                    </el-card>
                    <el-card class="box-card !border-none flex-1 profile-data" shadow="never">
                        <template #header>
                            <div class="card-header mb-[20px]">
                                <span class="text-[18px]">{{ t("addUser") }}</span>
                            </div>
                        </template>
                        <div ref="addUser" class="mt-[20px]" :style="{ width: '100%', height: '300px' }"></div>
                    </el-card>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { t } from '@/lang'
import { getStatInfo } from '@/app/api/stat'
import * as echarts from 'echarts'
import { getFrameworkNewVersion } from '@/app/api/module'
import { useRoute, useRouter } from 'vue-router'
import { AnyObject } from '@/types/global'
import useStyleStore from '@/stores/modules/style'

const loading = ref(true)
const newSiteStat = ref<any>(null)
const addUser = ref<any>(null)
const styleStore = useStyleStore()

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
                data: []
            }
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
                data: []
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
    }

    :deep(.profile-data .el-card__body) {
        padding: 20px 0 !important;
    }
    .top :deep(.el-col){
        max-width: calc(100% / 5) !important;
    }
</style>
