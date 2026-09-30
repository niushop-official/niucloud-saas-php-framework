<template>
    <div class="table-pagination">
        <el-pagination
            v-model:current-page="pageModel"
            v-model:page-size="pageSizeModel"
            :page-sizes="pageSizes"
            :total="total"
            :disabled="disabled"
            :hide-on-single-page="hideOnSinglePage"
            :layout="layout"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
    currentPage?: number
    pageSize?: number
    pageSizes?: number[]
    total?: number
    disabled?: boolean
    hideOnSinglePage?: boolean
    layout?: string
}

interface Emits {
    (event: 'update:currentPage', value: number): void
    (event: 'update:pageSize', value: number): void
    (event: 'size-change', value: number): void
    (event: 'current-change', value: number): void
}

const props = withDefaults(defineProps<Props>(), {
    currentPage: 1,
    pageSize: 10,
    pageSizes: () => [10, 20, 50, 100],
    total: 0,
    disabled: false,
    hideOnSinglePage: false,
    layout: 'total, sizes, ->, prev, pager, next, jumper'
})

const emit = defineEmits<Emits>()

const pageModel = computed({
    get: () => props.currentPage,
    set: value => emit('update:currentPage', value)
})

const pageSizeModel = computed({
    get: () => props.pageSize,
    set: value => emit('update:pageSize', value)
})

const handleSizeChange = (value: number) => emit('size-change', value)
const handleCurrentChange = (value: number) => emit('current-change', value)
</script>

<style lang="scss" scoped>
.table-pagination {
    display: flex;
    align-items: center;
    min-height: var(--cmp-table-pagination-min-height);
    margin-top: var(--cmp-table-pagination-margin-top);
    padding-inline: var(--cmp-table-pagination-padding-inline);
    color: var(--cmp-table-pagination-text);
    font-size: var(--cmp-table-pagination-font-size);
}

:deep(.el-pagination) {
    width: 100%;
}

:deep(.el-pagination .btn-prev),
:deep(.el-pagination .btn-next),
:deep(.el-pagination .el-pager li) {
    width: var(--cmp-table-pagination-item-size);
    min-width: var(--cmp-table-pagination-item-size);
    height: var(--cmp-table-pagination-item-size);
    border-radius: var(--cmp-table-pagination-item-radius);
}

:deep(.el-pagination .el-select) {
    width: var(--cmp-table-pagination-size-select-width);
}

:deep(.el-pagination .el-select__wrapper),
:deep(.el-pagination .el-input__wrapper) {
    min-height: var(--cmp-table-pagination-control-height);
    border-radius: var(--cmp-table-pagination-control-radius) !important;
}

:deep(.el-pagination__editor.el-input) {
    width: var(--cmp-table-pagination-jumper-input-width);
}

:deep(.el-pagination .el-pager li.is-active) {
    color: var(--cmp-table-pagination-active-text);
    background-color: var(--cmp-table-pagination-active-bg);
}

@media (max-width: 768px) {
    :deep(.el-pagination) {
        flex-wrap: wrap;
        row-gap: var(--cmp-table-pagination-gap);
    }

    :deep(.el-pagination__rightwrapper) {
        margin-left: 0;
        width: 100%;
    }
}
</style>
