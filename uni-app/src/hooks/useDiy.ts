import { ref, reactive, computed, inject, watch, type Ref } from 'vue';
import { onLoad, onShow, onHide, onPageScroll, onUnload } from '@dcloudio/uni-app';
import { img, handleOnloadParams } from '@/utils/common';
import { getDiyInfo } from '@/app/api/diy';
import useDiyStore from '@/app/stores/diy';
import { getUni } from '@/utils/uni-runtime';
import { ADDON_PAGE_QUERY_KEY } from '@/utils/addon-page-lifecycle';
import { resolveDecorateMode } from '@/utils/diy-decorate-bridge';
import { preloadMpDiySubPackages } from '@/utils/mp-diy-preload';

export function useDiy(params: any = {}) {

    const loading = ref(true);
    const diyStore = useDiyStore();
    const addonPageQuery = inject<Ref<Record<string, unknown>> | null>(ADDON_PAGE_QUERY_KEY, null);

    const id = ref(0)
    const name = ref(params.name || '')
    const template = ref('')
    const currRoute = ref('') //当前路由
    const requestData: any = reactive({});

    // 自定义页面 数据
    const diyData = reactive({
        pageMode: 'diy',
        title: '',
        global: {},
        value: []
    })

    const getLoading = () => {
        return loading.value;
    }

    const data: any = computed(() => {
        if (diyStore.mode == 'decorate') {
            return diyStore;
        } else {
            return diyData;
        }
    })

    const isShowTopTabbar = ref(false);

    const pageStyle = () => {
        let style = '';
        if (data.value.global.pageStartBgColor) {
            if (data.value.global.pageStartBgColor && data.value.global.pageEndBgColor) style += `background:linear-gradient(${ data.value.global.pageGradientAngle },${ data.value.global.pageStartBgColor },${ data.value.global.pageEndBgColor });`;
            else style += 'background-color:' + data.value.global.pageStartBgColor + ';';
        }
        if (data.value.global.bottomTabBar && data.value.global.bottomTabBar.isShow) {
            style += 'min-height:calc(100vh - 50px);';
        } else {
            style += 'min-height:calc(100vh);';
        }
        if (data.value.global.bgUrl) {
            style += `background-image:url('${ img(data.value.global.bgUrl) }');`;
        }

        if (data.value.global.bgHeightScale) {
            style += `background-size: 100% ${ data.value.global.bgHeightScale }%;`;
        }

        return style;
    };

    function applyDiyResponse(res: any, afterApply?: (data: any) => void) {
        Object.assign(requestData, res.data);
        if (!requestData.value) {
            loading.value = false
            if (afterApply) afterApply(requestData)
            return
        }

        diyData.pageMode = requestData.mode;
        diyData.title = requestData.title;

        const sources = JSON.parse(requestData.value);

        diyData.global = sources.global;
        diyData.global.id = requestData.id;
        diyData.global.site_id = requestData.site_id;
        diyData.global.type = requestData.type;

        if (diyData.global.popWindow && diyData.global.popWindow.show) {
            diyData.global.popWindow.id = requestData.id;
        }

        diyData.value = sources.value;
        diyData.value.forEach((item: any) => {
            item.pageStyle = '';
            item.componentIsShow = true
            if (item.pageStartBgColor) {
                if (item.pageStartBgColor && item.pageEndBgColor) item.pageStyle += `background:linear-gradient(${ item.pageGradientAngle },${ item.pageStartBgColor },${ item.pageEndBgColor });`;
                else item.pageStyle += 'background-color:' + item.pageStartBgColor + ';';
            }

            if (item.margin) {
                if (item.margin.top > 0) {
                    item.pageStyle += 'padding-top:' + item.margin.top * 2 + 'rpx' + ';';
                }
                item.pageStyle += 'padding-bottom:' + item.margin.bottom * 2 + 'rpx' + ';';
                item.pageStyle += 'padding-right:' + item.margin.both * 2 + 'rpx' + ';';
                item.pageStyle += 'padding-left:' + item.margin.both * 2 + 'rpx' + ';';
            }
        });

        diyStore.global = diyData.global
        diyStore.value = diyData.value

        isShowTopTabbar.value = diyData.value.some((item: any) => {
            return item && item.position && item.position == 'top_fixed'
        });

        getUni().setNavigationBarTitle({
            title: diyData.title
        });

        loading.value = false;
        if (afterApply) afterApply(requestData)
    }

    function fetchDiyInfo(callback: any = null) {
        getDiyInfo({
            id: id.value,
            name: name.value,
            template: template.value
        }).then((res: any) => {
            applyDiyResponse(res, callback)
        }).catch(() => {
            loading.value = false
        })
    }

    function syncDecorateDataFromStore() {
        if (diyStore.mode !== 'decorate') return
        diyData.pageMode = diyStore.pageMode
        diyData.global = diyStore.global
        diyData.value = diyStore.value
    }

    // #ifdef H5
    watch(
        () => [diyStore.mode, diyStore.pageMode, diyStore.global, diyStore.value] as const,
        () => syncDecorateDataFromStore(),
        { deep: true, immediate: true }
    )
    // #endif

    // 监听页面加载
    const onLoadLifeCycle = () => {
        onLoad((option: any) => {
            // #ifdef MP-WEIXIN
            // 处理小程序场景值参数
            option = handleOnloadParams(option);
            preloadMpDiySubPackages()
            // #endif

            // #ifdef H5
            if (!option.mode && addonPageQuery?.value?.mode) {
                option.mode = addonPageQuery.value.mode
            }
            diyStore.mode = resolveDecorateMode(option);
            if (diyStore.mode == 'decorate') {
                loading.value = false;
                syncDecorateDataFromStore()
            }
            // #endif

            id.value = option.id || '';
            if (name.value == '') name.value = option.name || '';
            template.value = option.template || '';
        });
    }

    // 监听页面显示
    const onShowLifeCycle = (callback: any = null) => {
        onShow(() => {
            /******** 解决跳转自定义页面空白问题-第二步-start **********/
            let curPage: any = getCurrentPages();
            currRoute.value = curPage[curPage.length - 1] ? curPage[curPage.length - 1].route : ''; //获取当前页面的路由
            let urlArr = []
            if (uni.getStorageSync('diyPageBlank')) {
                urlArr = uni.getStorageSync('diyPageBlank');
            }
            if (!urlArr.length || urlArr.length && urlArr.indexOf(currRoute.value) == -1) {
                diyStore.topFixedStatus = 'home'
            } else if (urlArr.length && urlArr.indexOf(currRoute.value) != -1) {
                diyStore.topFixedStatus = 'diy'
            }
            /******** 解决跳转自定义页面空白问题-第二步-end **********/

            // #ifdef H5
            if (!diyStore.mode) {
                diyStore.mode = resolveDecorateMode({})
            }
            // #endif

            // 装修模式：postMessage 与后台同步，数据由父页面推送
            if (diyStore.mode == 'decorate') {
                diyStore.init();
                syncDecorateDataFromStore()
            } else {
                fetchDiyInfo(callback)
            }
        })
    }

    // 监听页面隐藏
    const onHideLifeCycle = (callback: any = null) => {
        onHide(() => {
            /******** 解决跳转自定义页面空白问题-第一步 -start **********/
            let url = [];
            if (uni.getStorageSync('diyPageBlank')) {
                url = uni.getStorageSync('diyPageBlank');
            }

            // 清空重复、与当前页面路径一致的url
            if (url.length) {
                url = Array.from(new Set(url))
                url.forEach((item, index, arr) => {
                    if (item == currRoute.value) {
                        arr.splice(index, 1);
                    }
                })
            }

            // 当diyStore.topFixedStatus == "diy"时,存储到diyPageBlank缓存中
            if (diyStore.topFixedStatus == "diy") {
                url.push(currRoute.value);
            }
            uni.setStorageSync('diyPageBlank', url);
            /******** 解决跳转自定义页面空白问题-第一步 -end **********/

            if (callback) callback()
        })
    }

    // 监听页面卸载
    const onUnloadLifeCycle = (callback: any = null) => {
        onUnload(() => {
            if (callback) callback()
        })
    }

    // 监听滚动事件
    const onPageScrollLifeCycle = () => {
        onPageScroll((e) => {
            if (e.scrollTop > 0) {
                diyStore.scrollTop = e.scrollTop;
            }
            // uni.$emit('scroll')
        })
    }

    return {
        getLoading,
        get data() {
            return data.value
        },
        isShowTopTabbar,
        pageStyle,
        onLoad: onLoadLifeCycle,
        onShow: onShowLifeCycle,
        onHide: onHideLifeCycle,
        onUnload: onUnloadLifeCycle,
        onPageScroll: onPageScrollLifeCycle,
    }
}
