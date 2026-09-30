<template>
    <el-popover
        class="box-item"
        :width="540"
        trigger="hover"
        :show-after="200"
        :hide-after="300"
        :offset="4"
        @show="onShow"
    >
        <template #reference>
            <div class="relative">
                <icon name="iconfont iconFramec-1" />
                <span v-if="unreadCount > 0"
                      class="absolute top-[-3px] right-[-5px] min-w-[12px] h-[12px] px-[3px] rounded-full bg-[#DA203E] text-white text-[12px] leading-[12px] flex justify-center items-center">
                    {{ unreadCount > 99 ? '99+' : unreadCount }}
                </span>
            </div>
        </template>

        <div class="message-panel">
            <div class="flex items-center justify-between mb-[8px]">
                <span class="text-[14px] font-bold text-[#1D1F3A]">消息</span>
                <div class="flex items-center">
                    <el-button link type="primary" size="small" :disabled="unreadCount === 0" @click="handleReadAll">
                        全部已读
                    </el-button>
                    <el-button link type="primary" size="small" @click="toMessageCenter">消息中心</el-button>
                </div>
            </div>

            <el-scrollbar max-height="320px" v-loading="loading">
                <div v-if="!list.length" class="message-empty">暂无消息</div>
                <div v-for="item in decoratedList" :key="item.id" class="message-item" :class="{ 'is-unread': !item.is_read }"
                     @click="handleRead(item)">
                    <div class="flex items-center justify-between">
                        <span class="message-title">{{ item.title }}</span>
                        <el-icon class="message-close" @click.stop="handleDelete(item)">
                            <Close />
                        </el-icon>
                    </div>
                    <div class="flex items-center gap-[6px] mt-[2px]">
                        <span class="message-category">{{ item.category_name }}</span>
                        <span v-if="item.sub_category_name" class="message-category">{{ item.sub_category_name }}</span>
                    </div>
                    <div class="message-content">{{ stripHtml(item.content) }}</div>
                    <div class="flex items-center justify-between mt-[4px]">
                        <span class="message-time">{{ item.create_time }}</span>
                        <span v-if="!item.is_read" class="w-[6px] h-[6px] rounded-full bg-[#DA203E]"></span>
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </el-popover>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import { stripHtml } from '@/utils/common'
import { useMessageStream } from '@/hooks/useMessageStream'
import { getMessageList, getMessageUnreadCount, markMessageRead, deleteMessage, getMessageCategory } from '@/app/api/notice'

/** 头部下拉展示的最大条数 */
const MAX_SHOW = 10

const router = useRouter()

const loading = ref(false)
const list = ref<any[]>([])
const unreadCount = ref(0)

/** 分类名称映射（后端列表只回传分类标识） */
const categoryNameMap = ref<Record<string, string>>({})

/**
 * 实时通道：优先 SSE，不可用时自动降级长轮询。
 * 未读数由服务端主动下发，无需前端轮询。
 */
const { unreadTotal: streamUnreadTotal, snapshot, connect: connectStream } = useMessageStream()

watch(streamUnreadTotal, (val) => {
    if (typeof val === 'number') unreadCount.value = val
})

// 快照里带了分类名称，直接用来渲染最近消息
watch(snapshot, (val) => {
    if (!val?.latest?.length) return
    if (document.visibilityState === 'hidden') return
    list.value = val.latest
})

/** 加载最近消息 */
const loadList = async () => {
    loading.value = true
    try {
        const res: any = await getMessageList({ page: 1, limit: MAX_SHOW })
        list.value = res?.data?.data ?? []
    } catch (e) {
        list.value = []
    } finally {
        loading.value = false
    }
}

/** 加载未读数量（实时通道不可用时的兜底） */
const loadUnreadCount = async () => {
    try {
        const res: any = await getMessageUnreadCount()
        unreadCount.value = sumUnread(res?.data ?? {})
    } catch (e) {
        unreadCount.value = 0
    }
}

/** 未读结构为 { 分类: { count, sub: { 二级: n } } }，汇总为总数 */
const sumUnread = (data: Record<string, any>): number => {
    return Object.values(data).reduce((total: number, item: any) => total + Number(item?.count ?? 0), 0)
}

/** 分类名称映射：{ 'other' => '其它消息', 'other.system_notice' => '系统公告' } */
const loadCategoryName = async (category: Record<string, any>) => {
    const map: Record<string, string> = {}
    Object.keys(category).forEach((key) => {
        map[key] = category[key]?.name ?? key
        Object.keys(category[key]?.sub ?? {}).forEach((subKey) => {
            map[`${key}.${subKey}`] = category[key].sub[subKey]?.name ?? subKey
        })
    })
    categoryNameMap.value = map
}

/** 补齐列表项的分类名称 */
const decorate = (items: any[]) => {
    return items.map((item) => ({
        ...item,
        category_name: item.category_name || categoryNameMap.value[item.category] || '',
        sub_category_name: item.sub_category_name || categoryNameMap.value[`${item.category}.${item.sub_category}`] || ''
    }))
}

const onShow = () => {
    loadList()
}

/** 点击消息：标记已读并进入详情页 */
const handleRead = async (item: any) => {
    if (!item.is_read) {
        await markMessageRead([ item.id ]).catch(() => {})
        item.is_read = true
        unreadCount.value = Math.max(unreadCount.value - 1, 0)
    }
    router.push({ path: '/admin/message/detail', query: { id: item.id } })
}

const handleReadAll = async () => {
    try {
        await markMessageRead([])
        unreadCount.value = 0
        list.value.forEach((item) => item.is_read = true)
        ElMessage.success('操作成功')
    } catch (e) {
        // 失败提示由拦截器处理
    }
}

const handleDelete = async (item: any) => {
    try {
        await ElMessageBox.confirm('确定要删除这条消息吗？', '删除消息', {
            type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消'
        })
    } catch (e) {
        return
    }
    await deleteMessage([ item.id ])
    if (!item.is_read) unreadCount.value = Math.max(unreadCount.value - 1, 0)
    list.value = list.value.filter((v) => v.id !== item.id)
}

const toMessageCenter = () => {
    router.push('/admin/message/list')
}

const decoratedList = computed(() => decorate(list.value))

/** 加载分类树，用于把分类标识翻译为名称 */
const loadCategory = async () => {
    try {
        const res: any = await getMessageCategory()
        await loadCategoryName(res?.data ?? {})
    } catch (e) {
        // 分类名称取不到不影响主流程
    }
}

onMounted(async () => {
    await loadCategory()
    await loadList()
    await loadUnreadCount()
    // 实时通道建立后由服务端推送未读数
    connectStream()
})
</script>

<style lang="scss" scoped>
:deep(.box-item .el-popover.el-popper) {
    padding: 13px 16px !important;
}

.message-item {
    padding: 8px 20px 8px 6px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #f7f8fa;
    }

    &.is-unread .message-title {
        font-weight: 600;
    }
}

.message-title {
    font-size: 13px;
    color: #1d1f3a;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.message-category {
    display: inline-block;
    padding: 0 5px;
    font-size: 12px;
    line-height: 17px;
    color: #6b7280;
    background-color: #f2f3f5;
    border-radius: 3px;
}

.message-close {
    color: #a0a3bd;
    font-size: 12px;

    &:hover {
        color: var(--el-color-primary);
    }
}

.message-content {
    margin-top: 2px;
    font-size: 12px;
    line-height: 18px;
    color: #6b7280;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.message-time {
    font-size: 12px;
    color: #a0a3bd;
}

.message-empty {
    padding: 30px 0;
    font-size: 12px;
    color: #a0a3bd;
    text-align: center;
}
</style>
