import useUserStore from '@/stores/modules/user'

const permission = {
    mounted(el: HTMLElement, binding: any) {
        const { value: permission } = binding;
        const userStore = useUserStore()
        const rules = userStore.rules
        let isHavePermission = true

        if (typeof permission == 'string') {
            isHavePermission = rules.includes(permission)
        } else if (Array.isArray(permission)) {
            isHavePermission = permission.every(element => rules.includes(element))
        }

        // 如果没有权限，则隐藏按钮
        if (!isHavePermission) el.style.display = 'none';
    }
}

/**
 * 注册自定义指令
 */
export default {
    install(app: any) {
        app.directive('permission', permission)
    }
};
