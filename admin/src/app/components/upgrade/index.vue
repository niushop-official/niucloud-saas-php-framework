<template>
    <!-- 升级前校验：点击升级后首先弹出，通过后自动关闭；
         随后按「是否存在历史备份」决定：有则弹选项弹窗，无则直接发起升级 -->
    <!-- 不加 destroy-on-close：v-if="checkVisible" 已保证每次打开都是新实例，
         再叠一层动画结束后的销毁会和关闭时序打架（已卸载的 vnode 被重复处理） -->
    <el-dialog v-model="checkVisible" title="升级前校验" :width="dialogWidth" :close-on-click-modal="false" :close-on-press-escape="false">
        <div class="min-h-[150px]">
            <verify-panel v-if="checkVisible" scene="upgrade" :params="{ addon: upgradeAppKey }"
                          :auto-next="true" :auto-next-delay="500" :show-prev="false"
                          :next-text="t('nextStep')" @next="onCheckPassed"
                          @passed="is_pass = true" @failed="is_pass = false" />
        </div>
    </el-dialog>

    <!-- 升级选项：仅保留备份选项（无历史备份时不会弹出，校验通过即直接发起升级） -->
    <el-dialog v-model="showDialog" title="升级" :width="dialogWidth" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="dialogClose">
        <template v-if="upgradeContent">
            <el-scrollbar max-height="50vh">
                <!-- 备份选项（存在历史备份时才可勾选） -->
                <div class="p-[16px] border-[1px] rounded-[8px] border border-solid border-[#ebeef5]" v-if="upgradeContent.last_backup">
                    <div class="flex justify-between items-center">
                        <el-checkbox v-model="upgradeOption.is_need_backup" :label="t('upgrade.isNeedBackup')" :true-value="true" :false-value="false" size="large" ></el-checkbox>
                        <el-button link type="primary" class="!text-[#9699B6]" @click="toBackupRecord">{{ t('upgrade.isNeedBackupBtn') }}</el-button>
                    </div>

                    <div class="text-[14px] text-[#374151] mt-[10px] mb-[10px]">{{ t('upgrade.isNeedBackupTips') }}</div>
                    <div class="text-[14px] text-[#9699B6]">{{ t('上次备份时间：') }}{{ upgradeContent.last_backup.complete_time }}</div>
                </div>
            </el-scrollbar>
        </template>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="showDialog = false">{{ t("cancel") }}</el-button>
                <el-button type="primary" :loading="loading" :disabled="!isAllowUpgrade" @click="upgradeAddonFn">
                    {{ t("upgrade.upgradeButton") }}
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogUpgradePrompt" title="升级提示" width="500" :before-close="handleClose">
        <p>您当前使用的{{applicationType == 'app' ? '应用' : '插件'}}版本是 {{applicationVersion}}，若想升级到 {{newApplicationVersion}} 版本，需要先把框架从 v{{frameworkVersion}} 升级到 v{{ newFrameworkVersion }} 。</p>
        <div class="flex items-center">
            <span>如需升级框架，请点击升级框架操作。</span>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="upgradePromptConfirm">升级框架</el-button>
                <el-button @click="dialogUpgradePrompt = false">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, h, watch, nextTick } from 'vue'
import { t } from '@/lang'
import { getVersions } from '@/app/api/auth'
import { getFrameworkNewVersion } from '@/app/api/module'
import { getUpgradeContent } from '@/app/api/upgrade'
import { createTask, getTaskActive } from '@/app/api/task'
import VerifyPanel from '@/app/components/verify-panel/index.vue'
import { AnyObject } from '@/types/global'
import { ElNotification, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import useTaskRunnerStore from '@/stores/modules/taskRunner'

const router = useRouter()
const runner = useTaskRunnerStore()

/** 弹窗宽度：与「文件差异」弹窗（components/file-diff）保持一致 */
const dialogWidth = '880px'

/** 升级选项弹窗（插件信息 + 选项） */
const showDialog = ref<boolean>(false)
/** 升级前校验弹窗（校验通过后自动关闭） */
const checkVisible = ref<boolean>(false)
const upgradeContent = ref<null | AnyObject>(null)
/**
 * getUpgradeContent 的在途请求
 *
 * 校验弹窗现在点击即弹、不再等内容接口，因此校验有可能先于内容返回；
 * 弹选项弹窗前需据此等待（内容为空时选项弹窗无从渲染）。
 */
let contentPromise: Promise<any> | null = null
const isAllowUpgrade = ref(true) // 是否允许升级
/** 本次升级的应用标识（传给统一校验组件做升级前校验） */
const upgradeAppKey = ref('')
const loading = ref(false)
const emits = defineEmits(['complete'])
const upgradeOption = ref({
    is_need_backup: false,
    is_need_cloudbuild: false
})

const is_pass = ref(false)

const dialogUpgradePrompt = ref(false)
const applicationVersion = ref('')
const newApplicationVersion = ref('')
const applicationType = ref('app')

const frameworkVersion = ref('')
getVersions().then((res) => {
    frameworkVersion.value = res.data.version.version
})
const newFrameworkVersion = ref('')
getFrameworkNewVersion().then(({ data }) => {
    newFrameworkVersion.value = data.last_version
})

const isNeedUpgrade = (currVersion: string, onlineVersion: string) => {
    if (isNaN(parseInt(onlineVersion.replaceAll('.', ''))) || isNaN(parseInt(currVersion.replaceAll('.', '')))) return false
    return parseInt(onlineVersion.replaceAll('.', '')) > parseInt(currVersion.replaceAll('.', ''))
}

/**
 * 归一化升级内容里的插件展示字段
 *
 * 云端返回的图标字段命名不统一（icon / app_icon / logo），这里统一成 icon 与 type_label，
 * 模板只读字段，无需在模板里调用函数或做兼容判断。
 * @param list getUpgradeContent 返回的 content
 * @return array
 */
const normalizeContent = (list: any[]): any[] => ( list || [] ).map((item: any) => {
    const app = item?.app || {}
    return {
        ...item,
        icon: app.icon || app.app_icon || app.logo || '',
        type_label: app.app_type === 'app' ? '应用' : '插件'
    }
})

/** 终态任务（不视为「进行中」） */
const TERMINAL_STATUS = [ 'success', 'failed', 'canceled', 'rolled_back', 'rollback_failed' ]

/**
 * 取当前进行中的指定类型任务
 * 进行中的任务可能有多个（互斥任务与非互斥任务并行），这里按类型精确定位
 */
const findActiveTask = (taskType: string): Promise<any> => getTaskActive().then(({ data }) => {
    const list = Array.isArray(data?.list) && data.list.length ? data.list : ( data?.task_key ? [ data ] : [] )
    return list.find((item: any) => item?.task_type === taskType && !TERMINAL_STATUS.includes(String(item?.status ?? ''))) ?? null
})

/**
 * 打开升级流程
 * - 已有进行中的升级任务：直接进入任务详情查看进度
 * - 否则先弹出「升级前校验」，通过后自动关闭并弹出选项弹窗（插件信息 + 选项）
 */
const open = (addonKey: string = '', callback: any = null, otherData: any = {}) => {
    // 续跑：存在进行中的升级任务时直接跳到任务详情（升级过程统一在任务详情查看）
    findActiveTask('upgrade').then((active) => {
        if (active) {
            toTaskDetail(active.task_key)
            if (callback) callback()
            return
        }

        if (addonKey && addonKey.indexOf('niucloud-admin') == -1 && frameworkVersion.value != newFrameworkVersion.value && isNeedUpgrade(frameworkVersion.value, newFrameworkVersion.value)) {
            applicationVersion.value = otherData.install_info.version
            newApplicationVersion.value = otherData.version
            applicationType.value = otherData.type
            dialogUpgradePrompt.value = true
            if (callback) callback()
            return
        }
        if (loading.value) return
        loading.value = true

        // 先弹出校验弹窗：不等升级内容接口（要请求云端），点击后立即有反馈。
        // 校验参数由入参推导：框架升级传空串，与 upgrade_apps 的口径保持一致
        upgradeAppKey.value = addonKey === 'niucloud-admin' ? '' : addonKey
        handleUpgrade()

        contentPromise = getUpgradeContent(addonKey).then(({ data }) => {
            loading.value = false
            upgradeContent.value = data
            // 内容归一化：本弹窗不再展示插件信息，但保留字段兼容（扩展 / 其它入口可能读取）
            upgradeContent.value.content = normalizeContent(upgradeContent.value.content)

            // 内容到达后用真实应用列表校正校验参数（供「重新校验」使用）
            const apps = upgradeContent.value?.upgrade_apps?.join(',') ?? ''
            upgradeAppKey.value = apps === 'niucloud-admin' ? '' : apps

            let upgradeCount = 0
            let failUpgradeCount = 0
            for (let i = 0; i < upgradeContent.value.content.length; i++) {
                if (upgradeContent.value.content[i].version_list.length) {
                    upgradeCount++
                } else {
                    failUpgradeCount++
                }
            }
            if (upgradeContent.value.content.length == upgradeCount) {
                isAllowUpgrade.value = true
            } else if (upgradeContent.value.content.length == failUpgradeCount) {
                isAllowUpgrade.value = false
            }
            // 校验弹窗已在发起请求前弹出，此处不再重复打开（否则会重置已通过的校验状态）
            if (callback) callback()
        }).catch(() => {
            loading.value = false
            if (callback) callback()
        })
    })
}

/** 打开统一任务详情（全局抽屉）：升级过程与结果统一在任务详情查看，不离开当前页 */
const toTaskDetail = (key: string) => {
    if (!key) return
    runner.openDetail(key, 'upgrade')
}

/** 打开升级前校验弹窗（校验参数 upgradeAppKey 由 open() 预置，此处不再从内容推导） */
const handleUpgrade = () => {
    is_pass.value = false
    checkVisible.value = true
}

/**
 * 校验通过：自动关闭校验弹窗，按是否有可勾选项决定流程
 *
 * - 存在历史备份（last_backup）：弹出选项弹窗让用户确认是否备份
 * - 无历史备份：没有可选项，跳过选项弹窗直接发起升级
 * - 无可升级内容：两者都不做，提示后结束
 */
const onCheckPassed = async () => {
    is_pass.value = true
    // verify-panel 在自己的定时器回调里 emit('next')，此刻它可能仍有渲染在途；
    // 同步卸载会让 Vue 去 patch 已销毁的 vnode，故延后一个 tick 再关闭
    nextTick(() => {
        checkVisible.value = false
    })

    // 校验不再等内容接口，因此它可能先返回：这里等内容落地再决定后续流程
    if (contentPromise) await contentPromise.catch(() => null)

    if (!upgradeContent.value) {
        ElMessage({ message: '获取升级内容失败，请重新发起升级', type: 'error' })
        return
    }

    // 全部应用都没有可升级版本：既不弹选项也不发起升级
    if (!isAllowUpgrade.value) {
        ElMessage({ message: '暂无可升级的内容', type: 'warning' })
        return
    }

    // 无备份选项：无需用户选择，直接发起升级（下一步）
    if (!upgradeContent.value.last_backup) {
        upgradeAddonFn()
        return
    }

    showDialog.value = true
}

/**
 * 发起升级：交由统一任务中心（sys_task）创建并驱动
 * 任务创建成功后关闭选项弹窗并跳转任务详情
 */
const upgradeAddonFn = () => {
    if (!is_pass.value) return
    if (loading.value) return
    loading.value = true
    
    showDialog.value = false
    
    const appKey = upgradeContent.value?.upgrade_apps.join(',') != 'niucloud-admin' ? upgradeContent.value?.upgrade_apps.join(',') : ''

    // 无选项分支没有弹窗缓冲：先打开占位抽屉，避免「校验弹窗已关、详情还没出来」的空窗
    runner.openPendingDetail('upgrade', '正在发起升级')

    createTask('upgrade', { addon: appKey, data: upgradeOption.value }).then((res: any) => {
        loading.value = false
        emits('complete')

        const key = res?.data?.task_key
        if (!key) {
            runner.closePendingDetail()
            ElMessage({ message: '升级任务创建失败', type: 'error' })
            return
        }
        toTaskDetail(key)
    }).catch((err: any) => {
        loading.value = false
        runner.closePendingDetail()
        ElMessage({ message: err?.msg || err?.message || '升级发起失败', type: 'error' })
    })
}

let notificationEl: any = null
/**
 * 升级中任务提示（处于后台运行时，引导用户回到向导/统一任务页）
 */

const elNotificationClick = () => {
    findActiveTask('upgrade').then((active) => {
        if (active) {
            notificationEl && notificationEl.close()
            toTaskDetail(active.task_key)
        }
    })
}

const upgradePromptConfirm = () => {
    dialogUpgradePrompt.value = false
    open('niucloud-admin')
}

const dialogClose = (done: () => {}) => {
    done()
}

const handleClose = (done: () => {}) => {
    dialogUpgradePrompt.value = false
    done()
}

watch(
    () => showDialog.value,
    () => {
        if (!showDialog.value) resetLocal()
    }
)

/**
 * 关闭向导仅隐藏视图，任务在后台继续（可于统一任务页 / 通知中恢复），不做取消
 */
const resetLocal = () => {
    loading.value = false
    is_pass.value = false
    upgradeOption.value = {
        is_need_backup: true,
        is_need_cloudbuild: false
    }
}


const activeName = ref(0)

const toBackupRecord = () => {
    const routeUrl = router.resolve({
        path: '/tools/task_records'
    })
    window.open(routeUrl.href, '_blank')
}

defineExpose({
    open,
    loading
})
</script>

<style lang="scss" scoped>
:deep(.el-button){
    border-radius: 4px !important;
}
.table-head-bg {
    background-color: var(--el-table-header-bg-color);
}
:deep(.el-checkbox__label){
    color: var(--el-color-primary);
}

:deep(.terminal .t-log-box span) {
    white-space: pre-wrap;
}

:deep(.number-of-steps) {
    .el-step__line {
        margin: 0 25px;
        background: #dddddd;
    }

    .el-step__head {
        margin-top: 10px;
    }

    .is-success {
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);

        .el-step__icon {
            background: var(--el-color-primary);
            color: #fff;
            // box-shadow: 0 0 0 4px var(--el-color-primary-light-9);

            i {
                color: #fff;
            }
        }

        .el-step__line {
            margin: 0 25px;
            background: var(--el-color-primary);
        }
    }
    .is-finish {
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);

        .el-step__icon {
            background: var(--el-color-primary)!important;
            color: #fff !important;
            // box-shadow: 0 0 0 4px var(--el-color-primary-light-9);

            i {
                color: #fff;
            }
        }

        .el-step__line {
            margin: 0 25px;
            background: var(--el-color-primary);
        }
    }

    .is-process {
        color: var(--el-color-primary);
        font-weight: inherit;

        // font-size: 18px;
        .el-step__icon {
            padding: 10px;
            border: 1px solid var(--el-color-primary);
            background: var(--el-color-primary)!important;
            color: #fff !important;
            // box-shadow: 0 0 0 4px var(--el-color-primary-light-9);
        }
    }

    .is-wait {
        color: #333;
    }
}
:deep(.el-dialog__title){
    font-size: 20px;
    font-weight: bold;
}
:deep(.el-result__title p){
    font-size: 25px;
    color: #1D1F3A;
    font-weight: 500;
}
:deep(.el-result__subtitle p){
    font-size: 15px;
    color: #4F516D;
    font-weight: 500;
    word-break: break-all;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>

<style scoped>
.el-timeline-item {
    min-height: 100px;
}

.el-timeline-item :deep(.el-timeline-item__node--normal) {
    left: 117px;
    width: 18px;
    height: 18px;

    background: rgba(25, 103, 249, 0.12) !important;
    border-radius: 50%;
    /* 创建圆形 */
    position: relative;
    /* 用于定位伪元素 */
}

.el-timeline-item :deep(.el-timeline-item__node--normal::before) {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    /* 中心圆直径 */
    height: 8px;
    background-color: var(--el-color-primary);
    /* 中心圆颜色 */
    border-radius: 50%;
    /* 中心圆为圆形 */
    transform: translate(-50%, -50%);
    /* 居中显示 */
}

.el-timeline-item :deep(.el-timeline-item__tail) {
    left: 125px;
    border-left-color: #dddddd;
    border-left-style: dashed;
    margin: 24px 0 12px;
    height: calc(100% - 24px - 12px);
}

.time-dialog-wrap :deep(.el-dialog__header) {
    padding: 10px 20px;
    height: 25px;
    line-height: 25px;
    text-align: left;
    background: #fff;
    border-bottom: solid 1px #e4e7ed;
}

.time-dialog-wrap :deep(.el-card__body) {
    padding: 8px;
}

.time-dialog-wrap :deep(.el-card.is-always-shadow) {
    box-shadow: none;
}

.time-dialog-wrap :deep(.el-dialog__headerbtn .el-dialog__close) {
    color: #666;
}

.time-dialog-wrap :deep(.el-dialog__headerbtn:hover .el-dialog__close) {
    color: #666;
}

.time-dialog-wrap :deep(.el-dialog__headerbtn) {
    top: 14px;
}

.time-dialog-wrap :deep(.el-collapse) {
    margin-left: 119px;
    border: none;
    margin-top: -22px;
}

.time-dialog-wrap :deep(.el-collapse-item__header) {
    border: none;
    line-height: 25px;
    height: 25px;
    position: relative;
    z-index: 999;
}

.time-dialog-wrap :deep(.el-collapse-item__wrap) {
    border: none;
}

.time-dialog-wrap :deep(.el-collapse-item__content) {
    margin-top: 15px;
    padding-bottom: 0 !important;
}

.time-dialog-wrap :deep(.el-timeline-item__node--01) {
    width: 18px !important;
    height: 18px !important;
    left: 117px !important;
}
</style>
<style>
.time-dialog-wrap .el-dialog {
    margin: 0 auto !important;
    max-height: 90%;
    overflow: hidden;
    top: 5%;
}

.time-dialog-wrap .el-dialog {
    margin: 0 auto !important;
    height: 65%;
    overflow: hidden;
    top: 10%;
}

.time-dialog-wrap .el-dialog__body {
    position: absolute;
    left: 0;
    top: 46px;
    bottom: 0;
    right: 0;
    z-index: 1;
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 20px 0 0;
}

.time-dialog-wrap .el-timeline-item__wrapper {
    top: -20px !important;
}
</style>
