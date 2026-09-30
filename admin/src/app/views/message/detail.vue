<template>
    <div class="main-container w-full" v-loading="loading">
        <el-card shadow="never" class="!border-none">
            <template #header>
                <div class="flex items-center justify-between">
                    <span class="text-[15px] font-bold text-[#1D1F3A]">消息详情</span>
                    <el-button size="small" @click="goBack">返回</el-button>
                </div>
            </template>

            <template v-if="info.id">
                <div class="mb-[12px]">
                    <div class="text-[16px] font-bold text-[#1D1F3A] mb-[8px]">{{ info.title }}</div>
                    <div class="flex items-center flex-wrap gap-[8px]">
                        <el-tag size="small" effect="plain">{{ categoryText }}</el-tag>
                        <el-tag size="small" effect="plain" :type="levelTagType(info.level)">{{ levelName(info.level) }}</el-tag>
                        <el-tag size="small" effect="plain" :type="info.is_read ? 'info' : 'danger'">
                            {{ info.is_read ? '已读' : '未读' }}
                        </el-tag>
                    </div>
                </div>

                <el-descriptions :column="2" border class="mb-[12px]">
                    <el-descriptions-item label="创建时间">{{ info.create_time || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="阅读时间">{{ info.read_time ? info.read_time : '-' }}</el-descriptions-item>
                </el-descriptions>

                <div class="mb-[12px]">
                    <div class="text-[13px] text-[#6b7280] mb-[6px]">消息内容</div>
                    <!-- content 为富文本（如补丁 description），后端已过滤；异常内容降级为纯文本 -->
                    <div v-if="info.content" class="message-content-box">
                        <div v-html="info.content"></div>
                    </div>
                    <div v-else class="message-content-box">暂无内容</div>
                </div>

                <!-- 附加数据：补丁下载地址 / 跳转入口 -->
                <div v-if="attachUrl || jumpPath" class="mb-[12px]">
                    <div class="text-[13px] text-[#6b7280] mb-[6px]">附加信息</div>
                    <div class="flex items-center flex-wrap gap-[10px]">
                        <el-button v-if="attachUrl" type="primary" size="small" @click="openAttach">下载附件</el-button>
                        <el-button v-if="jumpPath" size="small" @click="goJump">前往处理</el-button>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-[8px]">
                    <el-button type="primary" plain :disabled="info.is_read" @click="handleRead">标记已读</el-button>
                    <el-button type="danger" plain @click="handleDelete">删除</el-button>
                </div>
            </template>

            <el-empty v-else description="消息不存在或已被删除" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getMessageInfo, getMessageCategory, markMessageRead, deleteMessage } from '@/app/api/notice'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const info = ref<any>({})

const messageId = computed(() => Number(route.query.id ?? 0))

/** 附加数据中的下载地址与跳转路径 */
const attachUrl = computed(() => String(info.value?.params?.attach_url ?? ''))
const jumpPath = computed(() => String(info.value?.params?.router_path ?? info.value?.params?.url ?? ''))

/** 分类名称映射（后端只回传分类标识） */
const categoryNameMap = ref<Record<string, string>>({})

const categoryText = computed(() => {
    const category = String(info.value?.category ?? '')
    const sub = String(info.value?.sub_category ?? '')
    const categoryName = categoryNameMap.value[ category ] || category
    const subName = categoryNameMap.value[ `${category}.${sub}` ] || sub
    return subName ? `${categoryName} / ${subName}` : categoryName
})

const levelMap: Record<string, string> = { info: '普通', success: '成功', warning: '警告', error: '错误' }

const levelName = (level: string) => levelMap[ level ] ?? '普通'

const levelTagType = (level: string) => {
    const map: Record<string, any> = { success: 'success', warning: 'warning', error: 'danger' }
    return map[ level ] ?? 'info'
}

/** 加载分类树，用于把分类标识翻译为名称 */
const loadCategory = async () => {
    try {
        const res: any = await getMessageCategory()
        const tree = res?.data ?? {}
        const map: Record<string, string> = {}
        Object.keys(tree).forEach((key) => {
            map[ key ] = tree[ key ]?.name ?? key
            Object.keys(tree[ key ]?.sub ?? {}).forEach((subKey) => {
                map[ `${key}.${subKey}` ] = tree[ key ].sub[ subKey ]?.name ?? subKey
            })
        })
        categoryNameMap.value = map
    } catch (e) {
        categoryNameMap.value = {}
    }
}

const loadInfo = async () => {
    if (!messageId.value) return
    loading.value = true
    try {
        const res: any = await getMessageInfo(messageId.value)
        info.value = res?.data ?? {}
        // 打开详情即视为已读
        if (info.value.id && !info.value.is_read) {
            await markMessageRead([ info.value.id ]).catch(() => {})
            info.value.is_read = true
        }
    } catch (e) {
        info.value = {}
    } finally {
        loading.value = false
    }
}

const handleRead = async () => {
    await markMessageRead([ messageId.value ])
    info.value.is_read = true
    ElMessage.success('操作成功')
}

const handleDelete = async () => {
    try {
        await ElMessageBox.confirm('确定要删除这条消息吗？', '删除消息', {
            type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消'
        })
    } catch (e) {
        return
    }
    await deleteMessage([ messageId.value ])
    ElMessage.success('删除成功')
    goBack()
}

const openAttach = () => {
    if (attachUrl.value) window.open(attachUrl.value, '_blank')
}

const goJump = () => {
    if (jumpPath.value) router.push(jumpPath.value)
}

const goBack = () => {
    router.push('/admin/message/list')
}

onMounted(async () => {
    await loadCategory()
    await loadInfo()
})
</script>

<style lang="scss" scoped>
.message-content-box {
    padding: 12px 14px;
    min-height: 80px;
    font-size: 13px;
    line-height: 22px;
    color: #303133;
    background-color: #fafafa;
    border-radius: 4px;
    white-space: pre-wrap;
    word-break: break-all;
}
</style>
