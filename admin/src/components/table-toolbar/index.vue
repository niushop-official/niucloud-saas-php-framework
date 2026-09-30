<template>
    <div class="table-toolbar">
        <div class="table-toolbar__title">
            <slot name="title">{{ title }}</slot>
        </div>

        <div class="table-toolbar__content">
            <div v-if="selectable" class="table-toolbar__selection">
                <span v-if="hasSelection" class="table-toolbar__selected">
                    已选
                    <strong>{{ selectedCount }}</strong>
                    条
                </span>

                <el-dropdown
                    trigger="click"
                    :disabled="selectionDisabled || selectionLoading || (!currentPageCount && !totalCount)"
                    @command="handleSelectionCommand"
                >
                    <el-button
                        class="table-toolbar__selection-trigger"
                        type="primary"
                        link
                        :disabled="selectionDisabled"
                        :loading="selectionLoading"
                    >
                        {{ hasSelection ? '重新选择' : '选择数据' }}
                        <icon
                            v-if="!selectionLoading"
                            class="table-toolbar__selection-arrow"
                            name="element ArrowDown"
                            size="12px"
                        />
                    </el-button>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="page" :disabled="currentPageCount <= 0">
                                选择当前页（{{ currentPageCount }} 条）
                            </el-dropdown-item>
                            <el-dropdown-item v-if="allowSelectAll" command="all" :disabled="totalCount <= 0">
                                选择全部筛选结果（{{ totalCount }} 条）
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <el-button
                    v-if="hasSelection"
                    class="table-toolbar__clear"
                    link
                    :disabled="selectionDisabled || selectionLoading"
                    @click="emit('clear-selection')"
                >
                    清空
                </el-button>

                <template v-if="slots['batch-actions']">
                    <span class="table-toolbar__divider"></span>
                    <div class="table-toolbar__batch-actions">
                        <slot
                            name="batch-actions"
                            :selected-count="selectedCount"
                            :has-selection="hasSelection"
                        ></slot>
                    </div>
                </template>
            </div>

            <template v-if="slots.actions">
                <span v-if="selectable" class="table-toolbar__divider"></span>
                <div class="table-toolbar__actions">
                    <slot name="actions"></slot>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'

interface Props {
    title?: string
    selectable?: boolean
    selectedCount?: number
    currentPageCount?: number
    totalCount?: number
    selectionLoading?: boolean
    selectionDisabled?: boolean
    /**
     * 是否允许「选择全部筛选结果」。
     * 当模块没有独立全量列表接口时置为 false，仅保留「选择当前页」。
     */
    allowSelectAll?: boolean
}

interface Emits {
    (event: 'select-page'): void
    (event: 'select-all'): void
    (event: 'clear-selection'): void
}

const props = withDefaults(defineProps<Props>(), {
    title: '',
    selectable: true,
    selectedCount: 0,
    currentPageCount: 0,
    totalCount: 0,
    selectionLoading: false,
    selectionDisabled: false,
    allowSelectAll: true
})

const emit = defineEmits<Emits>()
const slots = useSlots()
const hasSelection = computed(() => props.selectedCount > 0)

const handleSelectionCommand = (command: string | number | object) => {
    if (command == 'page') emit('select-page')
    if (command == 'all') emit('select-all')
}
</script>

<style lang="scss" scoped>
.table-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--cmp-table-toolbar-gap);
    min-height: var(--cmp-table-toolbar-min-height);
    padding-inline: var(--cmp-table-toolbar-padding-inline);
    background-color: var(--cmp-table-toolbar-bg);
}

.table-toolbar__title {
    min-width: 0;
    color: var(--cmp-table-toolbar-title-text);
    font-size: var(--cmp-table-toolbar-title-font-size);
    font-weight: var(--cmp-table-toolbar-title-font-weight);
    line-height: var(--cmp-table-line-height);
}

.table-toolbar__content,
.table-toolbar__selection,
.table-toolbar__batch-actions,
.table-toolbar__actions {
    display: flex;
    align-items: center;
}

.table-toolbar__content {
    flex-shrink: 0;
    gap: var(--cmp-table-toolbar-gap);
}

.table-toolbar__selection,
.table-toolbar__batch-actions,
.table-toolbar__actions {
    gap: var(--cmp-table-toolbar-selection-gap);
}

// Element Plus 自带 .el-button + .el-button { margin-left: 12px }，
// 与上面的 gap 叠加后按钮间距会翻倍（24px）。这里清掉自带外边距，
// 间距只由 gap 承担，保持工具栏内的一致性。
.table-toolbar__actions {
    :deep(.el-button + .el-button) {
        margin-left: 0;
    }
}

.table-toolbar__selected {
    color: var(--cmp-table-toolbar-selected-text);
    font-size: var(--cmp-table-font-size);
    white-space: nowrap;

    strong {
        color: var(--cmp-table-toolbar-selected-count-text);
        font-weight: var(--sys-font-weight-medium);
    }
}

.table-toolbar__selection-trigger,
.table-toolbar__clear {
    min-height: var(--cmp-table-more-size);
    margin: 0;
    padding: 0;
    font-size: var(--cmp-table-action-font-size);
}

.table-toolbar__clear {
    color: var(--cmp-table-action-text);

    &:hover {
        color: var(--cmp-table-action-hover-text);
    }
}

.table-toolbar__selection-arrow {
    margin-left: 4px;
}

.table-toolbar__divider {
    width: 1px;
    height: 16px;
    background-color: var(--cmp-table-toolbar-divider);
}

@media (max-width: 768px) {
    .table-toolbar {
        align-items: flex-start;
        flex-direction: column;
        padding-block: 12px;
    }

    .table-toolbar__content {
        flex-wrap: wrap;
        width: 100%;
    }
}
</style>
