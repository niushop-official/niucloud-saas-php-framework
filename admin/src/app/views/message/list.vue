<template>
    <div ref="pageRef" class="main-container table-fill-page w-full" :style="pageStyle">
        <div class="table-fill-page__card">
            <!-- 筛选 -->
            <div class="table-search-wrap table-search-wrap--panel">
                <el-form :model="searchParams" inline>
                    <el-form-item label="消息分类">
                        <el-select v-model="searchParams.category" placeholder="全部" clearable class="!w-[150px]"
                                   @change="onCategoryChange">
                            <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="子分类">
                        <el-select v-model="searchParams.sub_category" placeholder="全部" clearable class="!w-[150px]">
                            <el-option v-for="item in subCategoryOptions" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="阅读状态">
                        <el-select v-model="searchParams.is_read" placeholder="全部" clearable class="!w-[150px]">
                            <el-option v-for="(label, value) in readOptions" :key="value" :label="label" :value="value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="searchParams.title" placeholder="请输入消息标题" clearable class="!w-[180px]" />
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-date-picker
                            v-model="searchParams.create_time"
                            type="daterange"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            class="!w-[260px]"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadList">查询</el-button>
                        <el-button @click="resetSearch">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <!-- 列表 -->
            <div class="table-panel table-fill-page__panel">
                <table-toolbar
                    title="消息中心"
                    :selected-count="selectedCount"
                    :current-page-count="tableData.data.length"
                    :total-count="tableData.total"
                    :selection-loading="selectionLoading"
                    @select-page="selectCurrentPage"
                    @select-all="selectAllResults"
                    @clear-selection="clearSelection"
                >
                    <template #batch-actions>
                        <el-button type="primary" link :disabled="!selectedCount || selectionLoading" @click="handleBatchRead">
                            标记已读
                        </el-button>
                        <el-button class="table-delete" link :disabled="!selectedCount || selectionLoading" @click="handleBatchDelete">
                            批量删除
                        </el-button>
                    </template>
                    <template #actions>
                        <span class="mr-[10px] text-[13px] text-[#6b7280]">未读 {{ unreadCount }} 条</span>
                        <el-button plain @click="handleReadAll">全部已读</el-button>
                    </template>
                </table-toolbar>
            <div class="table-fill-page__table">
            <el-table height="100%" ref="tableRef" :data="tableData.data" row-key="id" v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" reserve-selection />
                <el-table-column prop="title" label="标题" min-width="180" show-overflow-tooltip />
                <el-table-column label="分类" width="160">
                    <template #default="{ row }">
                        <span>{{ row.category_name }}<template v-if="row.sub_category_name"> / {{ row.sub_category_name }}</template></span>
                    </template>
                </el-table-column>
                <el-table-column label="等级" width="100">
                    <template #default="{ row }">
                        <el-tag :type="levelTagType(row.level)" effect="plain" size="small">{{ levelName(row.level) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="内容" min-width="240" show-overflow-tooltip>
                    <template #default="{ row }">
                        <span>{{ stripHtml(row.content) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100">
                    <template #default="{ row }">
                        <el-tag :type="row.is_read ? 'info' : 'danger'" effect="plain" size="small">
                            {{ row.is_read ? '已读' : '未读' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" width="180" />
                <el-table-column label="操作" width="200" fixed="right">
                    <template #default="{ row }">
                        <table-actions :actions="rowActions(row)" />
                    </template>
                </el-table-column>
                <template #empty>
                    <span>暂无消息</span>
                </template>
            </el-table>
            </div>

            <table-pagination
                v-model:current-page="tableData.page"
                v-model:page-size="tableData.limit"
                :total="tableData.total"
                :page-sizes="[10, 20, 50, 100]"
                @size-change="loadList"
                @current-change="loadList"
            />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { stripHtml } from '@/utils/common'
import TableActions from '@/components/table-actions/index.vue'
import TablePagination from '@/components/table-pagination/index.vue'
import TableToolbar from '@/components/table-toolbar/index.vue'
import { getMessageList, getMessageCategory, getMessageUnreadCount, markMessageRead, deleteMessage } from '@/app/api/notice'

const router = useRouter()

// 表格占满页面剩余高度，超出部分在表格内部滚动
const { pageRef, pageStyle } = useTablePageHeight()

/**
 * 表格行内操作：超过 2 个自动收进「更多」
 */
const rowActions = (row: any) => [
    { label: '详情', onClick: () => toDetail(row) },
    { label: '标记已读', disabled: !!row.is_read, onClick: () => handleRead(row) },
    { label: '删除', type: 'danger', onClick: () => handleDelete(row) }
]

const readOptions: Record<string, string> = { '0': '未读', '1': '已读' }

const levelMap: Record<string, string> = { info: '普通', success: '成功', warning: '警告', error: '错误' }

/** 分类树：{ other: { name, sub: { system_notice: { name } } } } */
const categoryTree = ref<Record<string, any>>({})
/** 分类名称映射，用于把列表里的分类标识翻译为名称 */
const categoryNameMap = ref<Record<string, string>>({})

const loading = ref(false)
const unreadCount = ref(0)
const tableRef = ref<InstanceType<typeof ElTable>>()
const selectedIds = ref<number[]>([])
const selectionLoading = ref(false)
const syncingSelection = ref(false)
const selectedCount = computed(() => selectedIds.value.length)

const searchParams = reactive<Record<string, any>>({
    category: '',
    sub_category: '',
    is_read: '',
    title: '',
    create_time: []
})

const tableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    data: [] as any[]
})

const categoryOptions = computed(() => {
    return Object.keys(categoryTree.value).map((key) => ({
        value: key,
        label: categoryTree.value[key]?.name ?? key
    }))
})

const subCategoryOptions = computed(() => {
    const category = searchParams.category
    if (!category) return []
    const sub = categoryTree.value[category]?.sub ?? {}
    return Object.keys(sub).map((key) => ({
        value: key,
        label: sub[key]?.name ?? key
    }))
})

const levelTagType = (level: string) => {
    const map: Record<string, any> = { success: 'success', warning: 'warning', error: 'danger' }
    return map[ level ] ?? 'info'
}

const levelName = (level: string) => levelMap[ level ] ?? '普通'

const onCategoryChange = () => {
    searchParams.sub_category = ''
}

const buildParams = () => {
    const params: Record<string, any> = {
        page: tableData.page,
        limit: tableData.limit
    }
    if (searchParams.category !== '') params.category = searchParams.category
    if (searchParams.sub_category !== '') params.sub_category = searchParams.sub_category
    if (searchParams.is_read !== '' && searchParams.is_read !== null) params.is_read = searchParams.is_read
    if (searchParams.title) params.title = searchParams.title
    if (searchParams.create_time && searchParams.create_time.length === 2) {
        params.create_time = searchParams.create_time
    }
    return params
}

/** 列表只回传分类标识，这里补齐展示用的名称 */
const decorate = (rows: any[]) => {
    return rows.map((row) => ({
        ...row,
        category_name: categoryNameMap.value[ row.category ] ?? row.category,
        sub_category_name: categoryNameMap.value[ `${row.category}.${row.sub_category}` ] ?? row.sub_category
    }))
}

const loadList = async () => {
    loading.value = true
    try {
        const res: any = await getMessageList(buildParams())
        const data = res?.data ?? {}
        tableData.data = decorate(data.data ?? [])
        tableData.total = Number(data.total ?? 0)
        tableData.page = Number(data.current_page ?? tableData.page)
        tableData.limit = Number(data.per_page ?? tableData.limit)
        await syncCurrentPageSelection()
    } catch (e) {
        tableData.data = []
        tableData.total = 0
    } finally {
        loading.value = false
    }
}

/**
 * 将跨页选择状态同步到当前页复选框
 */
const syncCurrentPageSelection = async () => {
    await nextTick()
    syncingSelection.value = true
    tableRef.value?.clearSelection()
    const selectedIdSet = new Set(selectedIds.value)
    tableData.data.forEach((row: any) => {
        if (selectedIdSet.has(row.id)) tableRef.value?.toggleRowSelection(row, true)
    })
    await nextTick()
    syncingSelection.value = false
}

const loadUnreadCount = async () => {
    try {
        const res: any = await getMessageUnreadCount()
        unreadCount.value = Object.values(res?.data ?? {}).reduce(
            (total: number, item: any) => total + Number(item?.count ?? 0), 0
        )
    } catch (e) {
        unreadCount.value = 0
    }
}

const loadCategory = async () => {
    try {
        const res: any = await getMessageCategory()
        const tree = res?.data ?? {}
        categoryTree.value = tree
        const map: Record<string, string> = {}
        Object.keys(tree).forEach((key) => {
            map[ key ] = tree[ key ]?.name ?? key
            Object.keys(tree[ key ]?.sub ?? {}).forEach((subKey) => {
                map[ `${key}.${subKey}` ] = tree[ key ].sub[ subKey ]?.name ?? subKey
            })
        })
        categoryNameMap.value = map
    } catch (e) {
        categoryTree.value = {}
    }
}

const resetSearch = () => {
    searchParams.category = ''
    searchParams.sub_category = ''
    searchParams.is_read = ''
    searchParams.title = ''
    searchParams.create_time = []
    tableData.page = 1
    loadList()
}

/**
 * 合并当前页勾选结果，并保留其他分页已勾选的数据
 */
const handleSelectionChange = (rows: any[]) => {
    if (syncingSelection.value) return
    const currentPageIds = new Set(tableData.data.map((row: any) => row.id))
    const otherPageIds = selectedIds.value.filter(id => !currentPageIds.has(id))
    selectedIds.value = Array.from(new Set([
        ...otherPageIds,
        ...rows.map(row => row.id)
    ]))
}

/**
 * 重新选择当前页数据
 */
const selectCurrentPage = () => {
    selectedIds.value = tableData.data.map((row: any) => row.id)
    syncCurrentPageSelection()
}

/**
 * 重新选择当前筛选条件下的全部数据
 */
const selectAllResults = async () => {
    selectionLoading.value = true
    try {
        const params = buildParams()
        const res: any = await getMessageList({
            ...params,
            page: 1,
            limit: Math.max(Number(tableData.total) || 0, Number(params.limit) || 0)
        })
        const rows: any[] = res?.data?.data ?? []
        selectedIds.value = rows.map((row: any) => row.id)
        await syncCurrentPageSelection()
    } catch (e) {
        selectedIds.value = []
    } finally {
        selectionLoading.value = false
    }
}

/**
 * 清空全部分页选择
 */
const clearSelection = () => {
    selectedIds.value = []
    syncingSelection.value = true
    tableRef.value?.clearSelection()
    nextTick(() => {
        syncingSelection.value = false
    })
}

const toDetail = (row: any) => {
    router.push({ path: '/admin/message/detail', query: { id: row.id } })
}

const handleRead = async (row: any) => {
    await markMessageRead([ row.id ])
    row.is_read = true
    await loadUnreadCount()
    ElMessage.success('操作成功')
}

const handleReadAll = async () => {
    await markMessageRead([])
    await Promise.all([ loadList(), loadUnreadCount() ])
    ElMessage.success('操作成功')
}

const handleBatchRead = async () => {
    const ids = [ ...selectedIds.value ]
    if (!ids.length) return
    await markMessageRead(ids)
    clearSelection()
    await Promise.all([ loadList(), loadUnreadCount() ])
    ElMessage.success('操作成功')
}

const handleDelete = async (row: any) => {
    try {
        await ElMessageBox.confirm('确定要删除这条消息吗？', '删除消息', {
            type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消'
        })
    } catch (e) {
        return
    }
    await deleteMessage([ row.id ])
    await Promise.all([ loadList(), loadUnreadCount() ])
}

const handleBatchDelete = async () => {
    const ids = [ ...selectedIds.value ]
    if (!ids.length) return
    try {
        await ElMessageBox.confirm(`确定要删除选中的 ${ ids.length } 条消息吗？`, '批量删除', {
            type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消'
        })
    } catch (e) {
        return
    }
    await deleteMessage(ids)
    clearSelection()
    await Promise.all([ loadList(), loadUnreadCount() ])
}

onMounted(async () => {
    await loadCategory()
    await loadList()
    await loadUnreadCount()
})
</script>
