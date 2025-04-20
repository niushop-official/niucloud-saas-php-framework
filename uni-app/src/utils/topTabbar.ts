import { ref } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';
import { deepClone } from '@/utils/common';

export function topTabar() {

    const param: any = ref({
        title: '',
        topStatusBar: {
            style: 'style-1',
            bgColor: 'transparent',
            rollBgColor: '#fff',
            textColor: '#fff',
            rollTextColor: '#333'
        }
    })

    const scrollVal = ref(1); // 默认的传入滚动值
    const scrollBool = ref(-1);

    // 设置初始数据
    const setTopTabbarParam = (data: any = {}) => {
        if (data && typeof data != 'object') return param
        for (let key in data) {
            if (key == 'title') {
                param.value.title = data.title || '';
            } else if (key == 'topStatusBar' && data.topStatusBar) {
                for (let subKey in data.topStatusBar) {
                    param.value.topStatusBar[subKey] = data.topStatusBar[subKey]
                }
            } else {
                param.value[key] = data[key]
            }
        }
        return deepClone(param.value);
    }

    onPageScroll((e) => {
        if (e.scrollTop <= 0) {
            // -1 表示页面滚动值小于零，头部组件随页面下拉而下来
            scrollBool.value = -1;
        } else if (e.scrollTop > scrollVal.value) {
            // 1 表示页面滚动值大于传入滚动值，头部组件随页面上拉背景、文字颜色采用滚动后的变量
            scrollBool.value = 1
        } else {
            // 2 表示页面滚动值小于传入滚动值，头部组件随页面下拉背景、文字颜色采用滚动前的变量
            scrollBool.value = 2
        }
    })

    const getScrollBool = () => {
        return scrollBool.value;
    }

    return {
        getScrollBool,
        setTopTabbarParam
    }
}
