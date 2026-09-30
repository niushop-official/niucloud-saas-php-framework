<template>
    <div class="table-actions">
        <el-button
            v-for="(action, index) in visibleActions"
            :key="`visible-${index}`"
            :type="actionType(action)"
            :class="{ 'table-delete': action.type === 'danger' }"
            link
            :disabled="action.disabled"
            :loading="action.loading"
            @click="action.onClick && action.onClick()"
        >
            {{ action.label }}
        </el-button>

        <el-dropdown
            v-if="moreActions.length"
            trigger="hover"
            :disabled="moreDisabled"
            @command="handleCommand"
        >
            <span class="table-actions__more" :class="{ 'is-disabled': moreDisabled }" :title="moreText">
                <icon name="element MoreFilled" size="14px" />
            </span>

            <template #dropdown>
                <el-dropdown-menu class="table-actions__menu">
                    <el-dropdown-item
                        v-for="(action, index) in moreActions"
                        :key="`more-${index}`"
                        :command="index"
                        :disabled="action.disabled || action.loading"
                        :class="{ 'is-danger': action.type === 'danger' }"
                    >
                        {{ action.label }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface TableAction {
    /** 按钮文案 */
    label: string
    /** 按钮类型：primary（默认）/ success / warning / danger / default */
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'default'
    /** 是否展示，等价于原 v-if */
    show?: boolean
    /** 是否禁用 */
    disabled?: boolean
    /** 是否加载中（仅外露按钮生效） */
    loading?: boolean
    /** 点击回调 */
    onClick?: () => void
}

interface Props {
    /** 操作项列表。超出上限至少 2 项才收进「更多」，只多 1 项时全部直接展示 */
    actions?: TableAction[]
    /** 直接展示的操作数量上限。只多出 1 项时不收起 */
    max?: number
    /** 「更多」按钮提示文案（内容为三个点图标，仅作为 title 提示） */
    moreText?: string
}

const props = withDefaults(defineProps<Props>(), {
    actions: () => [],
    max: 2,
    moreText: '更多'
})

/**
 * 过滤掉不展示的操作
 */
const activeActions = computed(() => (props.actions || []).filter(action => action && action.show !== false))

/**
 * 超出上限至少 2 项才收进「更多」。只多出 1 项时直接展示，不出现更多图标。
 */
const useMore = computed(() => activeActions.value.length > props.max + 1)

/**
 * 直接展示的操作
 */
const visibleActions = computed(() => (useMore.value ? activeActions.value.slice(0, props.max) : activeActions.value))

/**
 * 收进「更多」的操作
 */
const moreActions = computed(() => (useMore.value ? activeActions.value.slice(props.max) : []))

/**
 * 「更多」内全部禁用时不响应点击
 */
const moreDisabled = computed(() => moreActions.value.every(action => action.disabled || action.loading))

const actionType = (action: TableAction) => {
    if (action.type === 'danger') return 'default'
    if (action.type === 'success') return 'success'
    if (action.type === 'warning') return 'warning'
    if (action.type === 'default') return 'default'
    return 'primary'
}

const handleCommand = (index: number) => {
    const action = moreActions.value[index]
    if (!action || action.disabled) return
    action.onClick && action.onClick()
}
</script>

<style lang="scss" scoped>
.table-actions {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: nowrap;
}

// 「更多」触发器：与操作按钮同高的方形图标按钮，悬停出现底色
.table-actions__more {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: var(--cmp-table-more-size);
    height: var(--cmp-table-more-size);
    margin-left: var(--cmp-table-action-gap);
    color: var(--cmp-table-more-text);
    border-radius: var(--cmp-table-more-radius);
    cursor: pointer;
    transition: color var(--el-transition-duration-fast) ease-in-out,
        background-color var(--el-transition-duration-fast) ease-in-out;

    &:hover {
        color: var(--cmp-table-more-hover-text);
        background-color: var(--cmp-table-more-hover-bg);
    }

    // 「更多」内全部禁用时不响应点击，也不给悬停反馈
    &.is-disabled {
        cursor: default;

        &:hover {
            color: var(--cmp-table-more-text);
            background-color: transparent;
        }
    }
}
</style>

<style lang="scss">
// 下拉菜单挂载在 body 下，需全局样式
.table-actions__menu {
    padding-block: var(--cmp-table-action-menu-padding-block);
    border-radius: var(--cmp-table-action-menu-radius);
    background-color: var(--cmp-table-action-menu-bg);
    box-shadow: var(--cmp-table-action-menu-shadow);

    .el-dropdown-menu__item {
        min-width: var(--cmp-table-action-menu-min-width);
        height: var(--cmp-table-action-menu-item-height);
        padding-inline: var(--cmp-table-action-menu-item-padding-inline);
        color: var(--cmp-table-action-menu-text);
        font-size: var(--cmp-table-action-menu-item-font-size);

        &:not(.is-disabled):hover,
        &:not(.is-disabled):focus {
            color: var(--cmp-table-action-menu-hover-text);
            background-color: var(--cmp-table-action-menu-hover-bg);
        }

        &.is-danger {
            color: var(--cmp-table-action-menu-danger-text);

            &:not(.is-disabled):hover,
            &:not(.is-disabled):focus {
                color: var(--cmp-table-action-menu-danger-text);
            }
        }
    }
}
</style>
