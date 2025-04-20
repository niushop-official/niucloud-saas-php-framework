export default [
    {
        path: "/article/list",
        component: () => import('~/addon/cms/pages/article/list.vue')
    },
    {
        path: "/article/detail",
        component: () => import('~/addon/cms/pages/article/detail.vue')
    }
]
