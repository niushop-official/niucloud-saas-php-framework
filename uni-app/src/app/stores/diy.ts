import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import { diyRedirect, currRoute, getToken } from '@/utils/common';
import { useLogin } from '@/hooks/useLogin';
import { ensureDiyDecorateBridge, notifyAdminDecorateReady } from '@/utils/diy-decorate-bridge';

interface Diy {
    mode: string, // 模式：decorate 装修，为空表示正常
    id: any,
    pageMode: string, // 页面展示模式，diy：自定义，fixed：固定
    currentIndex: number,
    global: {
        title: string,
        pageStartBgColor: string, // 页面背景颜色（开始）
        pageEndBgColor: string, // 页面背景颜色（结束）
        bottomTabBar: any, // 底部导航
        copyright: any, // 版权信息
        bgUrl: string
    },
    // 组件集合
    value: any[],
    topFixedStatus: string, // 置顶组件的状态
    scrollTop: number,
    topTabarHeight: number,
    componentRefs: any,
    imageAdsSameScreen: any, // 图片广告, 是否设置沉浸式
}

const useDiyStore = defineStore('diy', {
    state: (): Diy => {
        return {
            mode: '',
            id: 0,
            pageMode: 'diy',
            currentIndex: -99,
            global: {
                title: "",
                pageStartBgColor: '', // 页面背景颜色（开始）
                pageEndBgColor: '', // 页面背景颜色（结束）
                bottomTabBar: {
                    control: true, // 是否允许展示编辑
                    isShow: true, // 是否显示
                    designNav:{
                        title:'',
                        key:''
                    }
                },
                copyright:{
                    control: true, // 是否允许展示编辑
                    isShow: false, // 是否显示
                    textColor: '#ccc',
                },
                bgUrl: ''
            },
            value: [], // 组件集合
            topFixedStatus: 'home', // 顶部 置顶组件状态，home：展示首页数据、diy：展示置顶组件定义的子页面
            scrollTop: 0, // 滚动位置
            topTabarHeight: 0,
            componentRefs: null,
            imageAdsSameScreen: false
        }
    },
    getters: {},
    actions: {
        // 初始化
        init() {
            // #ifdef H5
            ensureDiyDecorateBridge()
            notifyAdminDecorateReady()
            // #endif
        },
        // 将数据传输给后台
        postMessage(index: any, component: any) {
            // #ifdef H5
            this.currentIndex = index;
            if (component)
                var data: any = JSON.stringify({
                    type: 'data',
                    index: this.currentIndex,
                    global: toRaw(this.global),
                    value: toRaw(this.value),
                    component: toRaw(component)
                });
            // 传输给后台数据
            window.parent.postMessage(data, '*');
            // #endif
        },
        // 选中正在编辑的组件
        changeCurrentIndex(index: number, component: any = null) {
            // #ifdef H5

            // 实际展示禁止编辑
            if (this.mode == '') return;

            // 减少重复请求
            if (this.currentIndex == index) return;
            this.currentIndex = index;
            const data = JSON.stringify({
                type: 'change',
                index,
                component: toRaw(component)
            });
            window.parent.postMessage(data, '*');
            // #endif
        },
        toRedirect(data: any) {
            if (Object.keys(data).length) {
                if (!data.name) return;
                if (currRoute() == 'app/pages/member/index' && !getToken()) {
                    useLogin().setLoginBack({ url: data.url })
                    return;
                }
                diyRedirect(data);
            }
        },
    }
})

export default useDiyStore
