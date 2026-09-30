<template>
    <div class="index-dashboard">

        <div class="index-page">
            <!-- ================= 轮播图 ================= -->
            <div class="index-banner index-closable" v-if="showBanner">
                <section class="index-carousel">
                    <!-- 无图片时的兜底装饰 -->
                    <span class="index-carousel-decor">
                        <span class="index-carousel-grid"></span>
                    </span>
                    <el-carousel :interval="3000" height="150px" class="index-carousel-body">
                        <el-carousel-item v-for="(item, index) in bannerlistr" :key="index">
                            <div class="index-carousel-item" @click="toApplicationurl(item)">
                                <img :src="item.image" alt="" />
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                    <span class="index-carousel-veil"></span>
                </section>
                <span class="index-module-close" @click="closeModule('banner')">
                    <el-icon :size="20">
                        <CircleCloseFilled />
                    </el-icon>
                </span>
            </div>

            <!-- ================= 快速开始 + AI 编程 ================= -->
            <div class="index-row index-closable" v-if="showQuickStart">
                <section class="index-panel">
                    <h2 class="index-panel-title">快速开始，构建你的项目及应用</h2>
                    <p class="index-panel-sub">基于Vue3+PHP8+MYSQL8的跨平台应用构建</p>
                    <div class="index-tile-grid">
                        <div class="index-tile" @click="toLink('/admin/tools/addon')">
                            <span class="index-tile-ic"><i class="iconfont iconkaifayigechajianc"></i></span>
                            <span class="index-tile-body">
                                <span class="index-tile-text">开发一个插件</span>
                                <span class="index-tile-tip">创建自定义功能扩展</span>
                            </span>
                        </div>
                        <div class="index-tile" @click="toLink('/admin/tools/code')">
                            <span class="index-tile-ic"><i class="iconfont iconAIshengchengchajianc"></i></span>
                            <span class="index-tile-body">
                                <span class="index-tile-text">AI生成插件</span>
                                <span class="index-tile-tip">使用AI自动生成插件代码</span>
                            </span>
                        </div>
                        <div class="index-tile" @click="toHref('/app_manage/app_store','uninstalled')">
                            <span class="index-tile-ic"><i class="iconfont iconanzhuangyigechajian1"></i></span>
                            <span class="index-tile-body">
                                <span class="index-tile-text">安装一个插件</span>
                                <span class="index-tile-tip">从市场安装现有插件</span>
                            </span>
                        </div>
                        <div class="index-tile" @click="toLink('/admin/tools/cloud_compile')">
                            <span class="index-tile-ic"><i class="iconfont iconyunbianyic"></i></span>
                            <span class="index-tile-body">
                                <span class="index-tile-text">云编译</span>
                                <span class="index-tile-tip">在线编译你的应用</span>
                            </span>
                        </div>
                    </div>
                </section>

                <section class="index-panel">
                    <h2 class="index-panel-title">AI编程</h2>
                    <div class="index-tabs">
                        <div class="index-tab" :class="{ 'is-active': activeName1 === '1' }"
                            @click="activeNameTabFn1('1')">{{ t("插件开发") }}</div>
                        <div class="index-tab" :class="{ 'is-active': activeName1 === '2' }"
                            @click="activeNameTabFn1('2')">{{ t("插件设计") }}</div>
                        <div class="index-tab" :class="{ 'is-active': activeName1 === '3' }"
                            @click="activeNameTabFn1('3')">{{ t("APP编译") }}</div>
                        <div class="index-tab" :class="{ 'is-active': activeName1 === '4' }"
                            @click="activeNameTabFn1('4')">{{ t("小程序发布") }}</div>
                    </div>
                    <div class="index-video">
                        <video src="@/app/assets/images/index/low-play.mp4" preload="auto" :controls="true" muted
                            autoplay loop></video>
                    </div>
                </section>

                <span class="index-module-close" @click="closeModule('quickStart')">
                    <el-icon :size="20">
                        <CircleCloseFilled />
                    </el-icon>
                </span>
            </div>

            <!-- ================= 生态精选应用推荐 ================= -->
            <section class="index-section index-closable" v-if="showNiuCloud && appList.length > 0">
                <h2 class="index-section-title">NIUCLOUD生态精选应用推荐</h2>
                <div class="index-app-grid" :class="{ 'is-loading': loading }">
                    <div class="index-app-card" v-for="(item,index) in appList.slice(0,5)" :key="index"
                        @click="toApplicationDetail(item)">
                        <div class="index-app-cover">
                            <img :src="img(item.app_logo)" alt="">
                        </div>
                        <div class="index-app-body">
                            <div class="index-app-name using-hidden">{{ item.app_name }}</div>
                            <div class="index-app-desc multi-hidden">{{ item.app_desc }}</div>
                            <div class="index-app-meta">
                                <img :src="img(item.developer.headimg)" alt="" class="index-app-avatar"
                                    v-if="item.developer.headimg">
                                <img src="@/app/assets/images/member_head.png" alt="" class="index-app-avatar" v-else>
                                <span class="index-app-dev using-hidden">{{ item.developer.nickname }}</span>
                                <span class="index-app-nums">
                                    <span class="index-app-num">
                                        <i class="iconfont iconchakan"></i>{{ item.visit_num }}
                                    </span>
                                    <span class="index-app-num">
                                        <i class="iconfont iconxiaoliang"></i>{{ item.sale_num }}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="index-module-close" @click="closeModule('niuCloud')">
                    <el-icon :size="20">
                        <CircleCloseFilled />
                    </el-icon>
                </span>
            </section>

            <!-- ================= 数据概况 ================= -->
            <section class="index-section">
                <h2 class="index-section-title">{{ t("dataSummarize") }}</h2>
                <div class="index-stat-grid">
                    <div class="index-stat index-stat--success" @click="toHref('site/manage','1')">
                        <span class="index-stat-ic">
                            <el-icon>
                                <Check />
                            </el-icon>
                        </span>
                        <div class="index-stat-num">{{ statInfo.today_data.norma_site_count || 0 }}</div>
                        <div class="index-stat-label">{{ t("normalSiteSum") }}</div>
                    </div>
                    <div class="index-stat index-stat--warning" @click="toWeekExpireSite()">
                        <span class="index-stat-ic">
                            <el-icon>
                                <Clock />
                            </el-icon>
                        </span>
                        <div class="index-stat-num">{{ statInfo.today_data.week_expire_site_count|| 0 }}</div>
                        <div class="index-stat-label">{{ t("weekExpireSiteCount") }}</div>
                    </div>
                    <div class="index-stat index-stat--danger" @click="toHref('site/manage','2')">
                        <span class="index-stat-ic">
                            <el-icon>
                                <Close />
                            </el-icon>
                        </span>
                        <div class="index-stat-num">{{ statInfo.today_data.expire_site_count|| 0 }}</div>
                        <div class="index-stat-label">{{ t("expireSiteSum") }}</div>
                    </div>
                    <div class="index-stat index-stat--info" @click="toHref('/app_manage/app_store','uninstalled')">
                        <span class="index-stat-ic">
                            <el-icon>
                                <Box />
                            </el-icon>
                        </span>
                        <div class="index-stat-num">{{ statInfo.app.app_no_installed_count|| 0 }}</div>
                        <div class="index-stat-label">{{ t("noInstallAppSun") }}</div>
                    </div>
                    <div class="index-stat index-stat--primary" @click="toHref('/app_manage/app_store','installed')">
                        <span class="index-stat-ic">
                            <el-icon>
                                <Download />
                            </el-icon>
                        </span>
                        <div class="index-stat-num">{{ statInfo.app.app_installed_count|| 0 }}</div>
                        <div class="index-stat-label">{{ t("installAppSun") }}</div>
                    </div>
                </div>
            </section>

            <!-- ================= 常用功能 ================= -->
            <section class="index-section">
                <h2 class="index-section-title">{{ t("常用功能") }}</h2>
                <div class="index-fn-grid">
                    <div class="index-fn" @click="toTypeLink('site/manage','list')">
                        <span class="index-fn-ic">
                            <img src="@/app/assets/images/index/site_list1.png" alt="">
                        </span>
                        <span class="index-fn-text">{{ t("siteList") }}</span>
                    </div>
                    <div class="index-fn" @click="toTypeLink('site/manage','group')">
                        <span class="index-fn-ic">
                            <img src="@/app/assets/images/index/site_tc1.png" alt="">
                        </span>
                        <span class="index-fn-text">{{ t("sitePackage") }}</span>
                    </div>
                    <div class="index-fn" @click="toTypeLink('site/manage','list')">
                        <span class="index-fn-ic">
                            <img src="@/app/assets/images/index/site_add1.png" alt="">
                        </span>
                        <span class="index-fn-text">{{ t("newSite") }}</span>
                    </div>
                    <div class="index-fn" @click="toLink('/admin/site/user')">
                        <span class="index-fn-ic">
                            <img src="@/app/assets/images/index/site_user1.png" alt="">
                        </span>
                        <span class="index-fn-text">{{ t("administrator") }}</span>
                    </div>
                    <div class="index-fn" @click="toApplication">
                        <span class="index-fn-ic">
                            <img src="@/app/assets/images/index/app_store1.png" alt="">
                        </span>
                        <span class="index-fn-text">{{ t("appMarketplace") }}</span>
                    </div>
                </div>
            </section>

            <!-- ================= 趋势图表 ================= -->
            <div class="index-chart-row">
                <section class="index-panel index-chart">
                    <div class="index-chart-head">
                        <span class="index-chart-legend index-chart-legend--site"></span>{{ t("newSite") }}
                    </div>
                    <div ref="newSiteStat" class="index-chart-body"></div>
                </section>
                <section class="index-panel index-chart">
                    <div class="index-chart-head">
                        <span class="index-chart-legend index-chart-legend--user"></span>{{ t("addUser") }}
                    </div>
                    <div ref="addUser" class="index-chart-body"></div>
                </section>
            </div>

            <!-- ================= 版权信息 ================= -->
            <div class="index-copyright" v-if="copyright">
                <div>
                    <a :href="copyright.copyright_link" target="_blank">
                        <span class="mr-3" v-if="copyright.company_name">{{ copyright.company_name }}</span>
                    </a>
                    <a href="https://beian.miit.gov.cn/" v-if="copyright.icp" target="_blank">
                        <span class="mr-3">{{ copyright.icp }}</span>
                    </a>
                </div>
                <div class="index-copyright-links">
                    <span class="mx-1" @click="getInfoFn">版权信息</span> | <span
                        class="mx-1">开发者联盟与隐私的声明</span> | <span class="mx-1">隐私政策</span> | <span
                        class="mx-1">联系我们</span> | <span class="mx-1">Cookies</span>
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
// 即将过期：状态正常，到期时间为当前时刻到 7 天后
const toWeekExpireSite = () => {
    const pad = (n: number) => String(n).padStart(2, '0')
    const format = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    const start = new Date()
    const end = new Date(start.getTime() + 7 * 86400 * 1000)
    router.push({
        path: 'site/manage',
        query: {
            id: '1',
            expire_time: [format(start), format(end)]
        }
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
/* ==========================================================================
   首页控制台
   参考稿：niucloud-dashboard.html
   约定：
   1. 颜色 / 圆角 / 间距 / 边框 / 字号统一使用全局 Token，不直接写死视觉值；
   2. 模块之间用「边框」区分层级，不使用阴影；
   3. 本页专用值以 --index-* 局部变量声明，仅作用于本组件。
   ========================================================================== */
.index-dashboard {
    --index-gap: var(--space-6);
    /* 内容区最大宽度，超宽屏居中显示 */
    --index-max-width: 1400px;
    --index-accent: var(--sys-color-primary);
    --index-accent-soft: var(--sys-color-primary-soft);
    /* 图例色与 ECharts 折线颜色保持一致 */
    --index-chart-site: #2fceb6;
    --index-chart-user: #f7dc76;

    --index-close-size: 20px;
    --index-close-shift: 18px;

    position: relative;
    box-sizing: border-box;
    width: 100%;
    max-width: var(--index-max-width);
    margin-inline: auto;
    /* 20px 图标放进 15px 右侧留白时多出的宽度，避免按钮被滚动容器裁切 */
    padding-right: max(0px, calc(var(--index-close-size) - var(--cmp-layout-content-padding)));
    overflow: visible;
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-base);
}

.index-page {
    position: relative;
    z-index: 1;
    display: grid;
    gap: var(--cmp-page-section-gap);
}

/* 入场动画：分区自上而下依次淡入，fill-mode 用 backwards，动画结束后不残留 transform */
@keyframes index-rise {
    from {
        opacity: 0;
        transform: translateY(18px);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

@keyframes index-spin {
    to {
        transform: rotate(360deg);
    }
}

.index-page > * {
    animation: index-rise .8s cubic-bezier(.22, 1, .36, 1) backwards;
}

.index-page > *:nth-child(2) {
    animation-delay: .08s;
}

.index-page > *:nth-child(3) {
    animation-delay: .16s;
}

.index-page > *:nth-child(4) {
    animation-delay: .24s;
}

.index-page > *:nth-child(5) {
    animation-delay: .32s;
}

.index-page > *:nth-child(6) {
    animation-delay: .4s;
}

.index-page > *:nth-child(7) {
    animation-delay: .48s;
}

/* ========== 通用模块：面板 / 卡片 ========== */
.index-panel {
    position: relative;
    box-sizing: border-box;
    padding: var(--space-6);
    background-color: var(--sys-color-bg-surface);
    border: var(--border-default);
    border-radius: var(--sys-radius-lg);
}

.index-panel-title {
    margin: 0;
    font-size: var(--sys-font-size-lg);
    font-weight: var(--sys-font-weight-semibold);
    line-height: 1.4;
}

.index-panel-sub {
    margin: var(--space-2) 0 0;
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-sm);
}

.index-section {
    position: relative;
}

.index-section-title {
    margin: 0 0 var(--space-5);
    font-size: var(--sys-font-size-lg);
    font-weight: var(--sys-font-weight-semibold);
}

/* 右上角外侧留在模块范围内：鼠标移出卡片去点按钮时，悬停不会中断 */
.index-closable {
    margin-top: calc(var(--index-close-shift) * -1);
    margin-right: calc(var(--index-close-size) * -1);
    padding-top: var(--index-close-shift);
    padding-right: var(--index-close-size);
}

.index-module-close {
    position: absolute;
    top: 5px;
    right: 0;
    z-index: 6;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--index-close-size);
    height: var(--index-close-size);
    color: var(--sys-color-text-placeholder);
    cursor: pointer;
    visibility: hidden;
    pointer-events: none;
    transition: color .2s;

    .index-closable:hover > & {
        visibility: visible;
        pointer-events: auto;
    }

    &:hover {
        color: var(--sys-color-danger);
    }
}

/* ========== 轮播图 ==========
   关闭按钮在轮播外侧，避免被圆角裁切；悬停区域包住按钮 */
.index-banner {
    position: relative;
}

.index-carousel {
    position: relative;
    overflow: hidden;
    border: var(--border-default);
    border-radius: var(--sys-radius-lg);
    background: linear-gradient(105deg, var(--el-color-primary),
            var(--el-color-primary-light-3) 55%, var(--el-color-primary-dark-2));
}

/* 无轮播数据时展示的兜底装饰 */
.index-carousel-decor {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.index-carousel-grid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgb(255 255 255 / 22%) 1.5px, transparent 1.5px);
    background-size: 22px 22px;
    -webkit-mask-image: linear-gradient(90deg, transparent 45%, #000);
    mask-image: linear-gradient(90deg, transparent 45%, #000);
}



.index-carousel-body {
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-radius: var(--sys-radius-lg);
}

.index-carousel-item {
    width: 100%;
    height: 100%;
    cursor: pointer;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.index-carousel-veil {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    height: 50%;
    background: linear-gradient(180deg, rgb(0 0 0 / 0%) 0%, rgb(0 0 0 / 20%) 100%);
    pointer-events: none;
}

.index-carousel :deep(.el-carousel__indicators) {
    right: var(--space-6);
    bottom: var(--space-3);
    left: auto;
    transform: none;
}

.index-carousel :deep(.el-carousel__indicator) {
    padding: var(--space-1);
}

.index-carousel :deep(.el-carousel__indicator .el-carousel__button) {
    width: 8px;
    height: 8px;
    border-radius: var(--sys-radius-full);
    background-color: rgb(255 255 255 / 45%);
    opacity: 1;
    transition: width .3s, background-color .3s;
}

.index-carousel :deep(.el-carousel__indicator.is-active .el-carousel__button) {
    width: 26px;
    background-color: var(--el-color-white);
}

.index-carousel :deep(.el-carousel__arrow) {
    width: 34px;
    height: 34px;
    border: 1px solid rgb(255 255 255 / 35%);
    background-color: rgb(255 255 255 / 18%);
    color: var(--el-color-white);
}

/* ========== 快速开始 + AI 编程 ==========
   两块保持与改造前相近的高度：两栏等高，内容自适应填满，整体只比原来略高 */
.index-row {
    position: relative;
    display: grid;
    grid-template-columns: 1.12fr 1fr;
    gap: var(--index-gap);
    align-items: stretch;
}

.index-row > .index-panel {
    display: flex;
    flex-direction: column;
    min-height: 0;
    padding-block: var(--space-5);
}

.index-tile-grid {
    display: grid;
    flex: 1;
    min-height: 0;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    /* 两行均分剩余高度，但不低于内容高度 */
    grid-template-rows: repeat(2, minmax(auto, 1fr));
    gap: var(--space-4);
    margin-top: var(--space-5);
}

.index-tile {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    background-color: var(--sys-color-fill-extra-light);
    border: var(--border-default);
    border-radius: var(--sys-radius-lg);
    cursor: pointer;
    transition: border-color .25s, background-color .25s, transform .25s;

    &:hover {
        background-color: var(--sys-color-bg-surface);
        border-color: var(--sys-color-primary-border);
        transform: translateY(-2px);
    }

    &:hover .index-tile-ic {
        background: linear-gradient(135deg, var(--sys-color-primary), var(--sys-color-primary-hover));
        color: var(--el-color-white);
    }
}

.index-tile-ic {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: var(--sys-radius-md);
    background-color: var(--sys-color-primary-soft);
    color: var(--sys-color-primary);
    font-size: var(--sys-font-size-xl);
    transition: background-color .25s, color .25s;
}

/* 名称 + 简介：纵向排列在图标右侧，简介常驻显示 */
.index-tile-body {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
}

.index-tile-text {
    font-size: var(--sys-font-size-base);
    font-weight: var(--sys-font-weight-medium);
}

/* 简介：置于名称下方，次级灰色，字号小于名称 */
.index-tile-tip {
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
    line-height: 1.4;
}

/* AI 编程标签栏 */
.index-tabs {
    display: flex;
    gap: var(--space-6);
    margin-top: var(--space-1);
    border-bottom: 1px solid var(--sys-color-border-light);
}

.index-tab {
    position: relative;
    padding: var(--space-2) 0;
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-base);
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    transition: color .2s;

    &:hover {
        color: var(--sys-color-primary);
    }

    &.is-active {
        color: var(--sys-color-primary);
        font-weight: var(--sys-font-weight-semibold);

        &::after {
            content: "";
            position: absolute;
            right: 0;
            bottom: -1px;
            left: 0;
            height: 2px;
            border-radius: 2px 2px 0 0;
            background: linear-gradient(90deg, var(--sys-color-primary-hover), var(--sys-color-primary));
        }
    }
}

/* 播放器高度跟随栏目内容，与改造前的 160px 量级保持一致 */
.index-video {
    display: flex;
    flex: 1;
    min-height: 150px;
    overflow: hidden;
    margin-top: var(--space-4);
    border: var(--border-default);
    border-radius: var(--sys-radius-lg);
    background-color: #10142b;

    video {
        display: block;
        width: 100%;
        height: 150px;
        object-fit: contain;
    }
}

/* ========== 应用推荐 ========== */
.index-app-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--space-5);
    transition: opacity .5s ease, transform .5s ease;

    &.is-loading {
        opacity: 0;
        transform: translateY(8px);
    }
}

.index-app-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--sys-color-bg-surface);
    border: var(--border-default);
    border-radius: var(--sys-radius-lg);
    cursor: pointer;
    transition: border-color .25s, transform .25s;

    &:hover {
        border-color: var(--sys-color-primary-border);
        transform: translateY(-4px);
    }

    &:hover .index-app-cover img {
        transform: scale(1.05);
    }
}

.index-app-cover {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    border-bottom: 1px solid var(--sys-color-border-light);
    background-color: var(--sys-color-fill-light);

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform .35s ease;
    }
}

.index-app-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-4);
}

.index-app-name {
    font-size: var(--sys-font-size-base);
    font-weight: var(--sys-font-weight-semibold);
}

/* 两行截断复用全局 .multi-hidden，这里只负责配色与字号 */
.index-app-desc {
    min-height: 36px;
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
    line-height: 18px;
}

.index-app-meta {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-top: auto;
    padding-top: var(--space-3);
    border-top: 1px dashed var(--sys-color-border-light);
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
}

.index-app-avatar {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    border-radius: var(--sys-radius-full);
    object-fit: cover;
}

.index-app-dev {
    flex: 1;
    min-width: 0;
}

.index-app-nums {
    display: flex;
    flex-shrink: 0;
    gap: var(--space-3);
}

.index-app-num {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);

    i {
        font-size: var(--sys-font-size-xs);
    }
}

/* ========== 数据概况 ========== */
.index-stat-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--space-5);
}

.index-stat {
    position: relative;
    overflow: hidden;
    padding: var(--space-5);
    background-color: var(--sys-color-bg-surface);
    border: var(--border-default);
    border-radius: var(--sys-radius-lg);
    cursor: pointer;
    transition: border-color .25s, transform .25s;


    &:hover {
        border-color: var(--index-accent);
        transform: translateY(-4px);
    }

    &:hover .index-stat-ic {
        background-color: var(--index-accent);
        color: var(--el-color-white);
    }
}

.index-stat--success {
    --index-accent: var(--sys-color-success);
    --index-accent-soft: var(--el-color-success-light-9);
}

.index-stat--warning {
    --index-accent: var(--sys-color-warning);
    --index-accent-soft: var(--el-color-warning-light-9);
}

.index-stat--danger {
    --index-accent: var(--sys-color-danger);
    --index-accent-soft: var(--el-color-danger-light-9);
}

.index-stat--info {
    --index-accent: var(--sys-color-info);
    --index-accent-soft: var(--sys-color-fill-light);
}

.index-stat--primary {
    --index-accent: var(--sys-color-primary);
    --index-accent-soft: var(--sys-color-primary-soft);
}

.index-stat-ic {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: var(--sys-radius-md);
    background-color: var(--index-accent-soft);
    color: var(--index-accent);
    font-size: var(--sys-font-size-md);
    transition: background-color .25s, color .25s;
}

.index-stat-num {
    color: var(--sys-color-text-primary);
    font-size: 30px;
    font-weight: var(--sys-font-weight-semibold);
    line-height: 1.15;
    font-variant-numeric: tabular-nums;
}

.index-stat-label {
    margin-top: var(--space-1);
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-sm);
}

/* ========== 常用功能 ========== */
.index-fn-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--space-5);
}

.index-fn {
    --index-accent: var(--sys-color-primary);
    --index-accent-soft: var(--sys-color-primary-soft);

    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-4) var(--space-5);
    background-color: var(--sys-color-bg-surface);
    border: var(--border-default);
    border-radius: var(--sys-radius-lg);
    cursor: pointer;
    transition: border-color .25s, transform .25s;

    &:hover {
        border-color: var(--index-accent);
        transform: translateY(-4px);
    }

    &:hover .index-fn-ic {
        border-color: var(--index-accent);
        transform: scale(1.06);
    }
}

/* 五个入口按 Token 状态色区分，保持色彩语义统一 */
.index-fn:nth-child(1) {
    --index-accent: var(--sys-color-primary);
    --index-accent-soft: var(--sys-color-primary-soft);
}

.index-fn:nth-child(2) {
    --index-accent: var(--sys-color-primary-hover);
    --index-accent-soft: var(--sys-color-primary-muted);
}

.index-fn:nth-child(3) {
    --index-accent: var(--sys-color-success);
    --index-accent-soft: var(--el-color-success-light-9);
}

.index-fn:nth-child(4) {
    --index-accent: var(--sys-color-warning);
    --index-accent-soft: var(--el-color-warning-light-9);
}

.index-fn:nth-child(5) {
    --index-accent: var(--sys-color-danger);
    --index-accent-soft: var(--el-color-danger-light-9);
}

.index-fn-ic {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 1px solid transparent;
    border-radius: var(--sys-radius-md);
    background-color: var(--index-accent-soft);
    transition: border-color .25s, transform .25s;

    img {
        width: 26px;
        height: 26px;
        object-fit: contain;
    }
}

.index-fn-text {
    font-size: var(--sys-font-size-base);
    font-weight: var(--sys-font-weight-medium);
}

/* ========== 趋势图表 ========== */
.index-chart-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--index-gap);
}

.index-chart-head {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-3);
    font-size: var(--sys-font-size-base);
    font-weight: var(--sys-font-weight-medium);
}

.index-chart-legend {
    width: 10px;
    height: 10px;
    border-radius: var(--sys-radius-sm);
}

.index-chart-legend--site {
    background-color: var(--index-chart-site);
}

.index-chart-legend--user {
    background-color: var(--index-chart-user);
}

.index-chart-body {
    width: 100%;
    height: 280px;
}

/* ========== 版权信息 ========== */
.index-copyright {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);

    a {
        color: inherit;
    }
}

.index-copyright-links {
    display: flex;
    align-items: center;
    cursor: pointer;
}

/* ========== 响应式 ========== */
@media (max-width: 1180px) {

    .index-row,
    .index-chart-row {
        grid-template-columns: minmax(0, 1fr);
    }

    .index-app-grid,
    .index-stat-grid,
    .index-fn-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 768px) {
    .index-dashboard {
        padding: var(--space-3);
    }

    .index-app-grid,
    .index-stat-grid,
    .index-fn-grid,
    .index-tile-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (prefers-reduced-motion: reduce) {

    .index-page > * {
        animation: none;
    }

    .index-tile,
    .index-app-card,
    .index-stat,
    .index-fn {
        transition: none;
    }
}
</style>
