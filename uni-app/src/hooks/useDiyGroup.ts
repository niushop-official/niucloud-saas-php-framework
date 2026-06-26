/**
 * Core 层 useDiyGroup：修复装修模式下 data 快照导致预览空白
 * 通过 Vite 插件 alias 替换 addon 内 ./useDiyGroup，不修改 src/addon 源码
 */
import { ref, onMounted, nextTick, computed, watch } from 'vue';
import Sortable from 'sortablejs';
import { range } from 'lodash-es';
import { onPageScroll, onHide, onShow } from '@dcloudio/uni-app';
import useDiyStore from '@/app/stores/diy';

export function useDiyGroup(params: any = {}) {
    const showCopyright = ref(false);

    let scrollVal: any = "";
    const componentsScrollBool: any = ref({});
    const diyStore = useDiyStore();

    const positionFixed = ref(['fixed', 'top_fixed', 'right_fixed', 'bottom_fixed', 'left_fixed']);

    const data = computed(() => {
        if (diyStore.mode == 'decorate') {
            return diyStore;
        }
        return params.data;
    })

    // 装修模式：同步 store → props.data（diy-group 初始化时可能是快照引用）
    watch(
        () => [diyStore.mode, diyStore.pageMode, diyStore.global, diyStore.value] as const,
        () => {
            if (diyStore.mode !== 'decorate' || !params.data) return
            params.data.pageMode = diyStore.pageMode
            params.data.global = diyStore.global
            params.data.value = diyStore.value
        },
        { deep: true, immediate: true }
    )

    const getComponentClass = (index: any, component: any) => {
        const obj: any = {
            relative: true,
            selected: diyStore.currentIndex == index,
            decorate: diyStore.mode == 'decorate'
        }
        obj['top-fixed-' + diyStore.topFixedStatus] = true;

        if (component.position && positionFixed.value.indexOf(component.position) != -1) {
            obj['ignore-draggable-element'] = true;
        } else {
            obj['draggable-element'] = true;
        }
        if (component.componentName == 'ImageAds') {
            obj['overflow-hidden'] = true
        }
        return obj;
    }

    const isShowPlaceHolder = (index: any, component: any) => {
        // #ifdef H5
        if (diyStore.mode == 'decorate') {
            const el: any = document.getElementById('componentList');
            if (el && el.children.length && el.children[index]) {
                const height = el.children[index].offsetHeight;
                let top = 0;
                if (component.margin.top < 0) {
                    top = component.margin.top * 2 * -1;
                    if (top > height) {
                        return false;
                    }
                }
            }
            return true;
        }
        // #endif
        return false;
    }

    const onMountedLifeCycle = () => {
        onMounted(() => {
            // #ifdef H5
            if (diyStore.mode == 'decorate') {
                const el: any = document.getElementById('componentList');
                const sortable = Sortable.create(el, {
                    draggable: '.draggable-element',
                    animation: 200,
                    onEnd: event => {
                        const temp = diyStore.value[event.oldIndex!];
                        diyStore.value.splice(event.oldIndex!, 1);
                        diyStore.value.splice(event.newIndex!, 0, temp);

                        nextTick(() => {
                            sortable.sort(range(diyStore.value.length).map((value: any) => {
                                return value.toString();
                            }));

                            diyStore.postMessage(event.newIndex, diyStore.value[event.newIndex]);
                        });
                    }
                });
            }
            // #endif

            nextTick(() => {
                setTimeout(() => {
                    scrollVal = uni.getStorageSync('componentsScrollValGroup');
                    if (scrollVal) {
                        for (const key in scrollVal) {
                            componentsScrollBool.value[key] = -1;
                        }
                    }
                    showCopyright.value = true;
                }, 500)
            });
        });
    }

    const refresh = () => {
        nextTick(() => {
            let time: any = null;
            const fn = () => {
                diyStore.componentRefs = params.getFormRef().componentRefs;
                data.value.componentRefs = params.getFormRef().componentRefs;
                params.getFormRef().componentRefs.topTabbarRef?.refresh();
                if (time) clearInterval(time);
            }

            const getPass = () => {
                let pass = false;
                try {
                    params.getFormRef()
                    pass = true;
                } catch (e) {
                    pass = false;
                }
                if (pass) {
                    fn();
                }
                return pass;
            }

            if (!getPass()) {
                time = setInterval(() => {
                    getPass()
                }, 100)
            }
        })
    }

    const placeholderEvent = () => {
    }

    const isPagesHide = ref(false)
    onShow(() => {
        isPagesHide.value = false;
    })
    onHide(() => {
        isPagesHide.value = true;
        diyStore.global.bottomTabBar.isShow = false
    })

    const scrollValStr = ref()
    const onPageScrollLifeCycle = () => {
        onPageScroll((e) => {
            if (scrollVal && !isPagesHide.value) {
                for (const key in scrollVal) {
                    if (e.scrollTop <= 0) {
                        componentsScrollBool.value[key] = -1;
                    } else if (e.scrollTop > scrollVal[key]) {
                        componentsScrollBool.value[key] = 1;
                    } else {
                        componentsScrollBool.value[key] = 2
                    }
                }
            }
        })
    }

    return {
        scrollV: scrollValStr,
        data,
        componentsScrollBool,
        showCopyright,
        placeholderEvent,
        refresh,
        isShowPlaceHolder,
        getComponentClass,
        onPageScroll: onPageScrollLifeCycle,
        onMounted: onMountedLifeCycle
    }
}
