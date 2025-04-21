import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory('/cashier/'),
    routes: [
        {
            path: '/',
            meta: {
                title: '收银',
                key: 'cashier'
            },
            component: () => import('@/views/index/index.vue'),
        },
        {
            path: '/login',
            meta: {
                title: '收银台 - 登录'
            },
            component: () => import('@/views/login/index.vue'),
        },
        {
            path: '/hang',
            meta: {
                title: '挂单',
                key: 'hang'
            },
            component: () => import('@/views/index/hang.vue'),
        },
        {
            path: '/order',
            meta: {
                title: '订单',
                key: 'order'
            },
            component: () => import('@/views/index/order.vue'),
        },
        {
            path: '/refund',
            meta: {
                title: '退货',
                key: 'refund'
            },
            component: () => import('@/views/index/refund.vue'),
        },
        {
            path: '/user_list',
            meta: {
                title: '用户',
                key: 'user_list'
            },
            component: () => import('@/views/index/user.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/index/404.vue')
        }
    ]
})

//router设置页面标题
router.beforeEach((to, from, next) => {
    console.log(from)
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title as string
    }
    next()
})

export default router
