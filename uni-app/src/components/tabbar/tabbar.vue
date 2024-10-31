<template>
	<template v-if="tabbar && Object.keys(tabbar).length">
		<u-tabbar :value="value" zIndex="9999" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true"
			:inactive-color="tabbar.value.textColor" :active-color="tabbar.value.textHoverColor">
			<block v-for="item in tabbar.value.list">
				<u-tabbar-item class="py-[5rpx]" :style="{'background-color': tabbar.value.backgroundColor}" :text="item.text"
					:icon="img(value == item.link.url ? item.iconSelectPath : item.iconPath)" :name="item.link.url"
					v-if="tabbar.value.type == 1" @click="itemBtn(item.link.url)"></u-tabbar-item>
				<u-tabbar-item class="py-[5rpx]" :style="{'background-color': tabbar.value.backgroundColor}"
					:icon="img(value == item.link.url ? item.iconSelectPath : item.iconPath)" :name="item.link.url"
					v-if="tabbar.value.type == 2" @click="itemBtn(item.link.url)"></u-tabbar-item>
				<u-tabbar-item class="py-[5rpx]" :style="{'background-color': tabbar.value.backgroundColor}" :text="item.text" :name="item.link.url"
					v-if="tabbar.value.type == 3" @click="itemBtn(item.link.url)"></u-tabbar-item>
			</block>
		</u-tabbar>
		<view class="tab-bar-placeholder"></view>
	</template>
</template>

<script setup lang="ts">
	import { ref,reactive,computed,watch } from 'vue'
	import { redirect, currRoute,currShareRoute, img } from '@/utils/common'
	import useConfigStore from '@/stores/config'
	import { cloneDeep } from 'lodash-es'

    const props = defineProps({
        addon: {
            type: String,
            default: ''
        }
    })

	let addon:any = props.addon;

    const configStore = useConfigStore()
	if(!addon && configStore.addon){
        addon = configStore.addon;
	}

    const tabbar:any = reactive({})

    const setTabbar = ()=> {
	    let list = cloneDeep(useConfigStore().tabbarList);
	    if (list.length == 1) {
		    Object.assign(tabbar, list[0]);
	    } else {
		    let isExist = false;
		    for (let i = 0; i < list.length; i++) {
			    if (list[i].key == addon) {
				    Object.assign(tabbar, list[i]);
				    isExist = true;
				    break;
			    }
		    }

		    if (!isExist) {

			    // 检测是否单应用
			    let count = 0;
			    let singleTabbar = {}
			    try {
				    if (list) {
					    list.forEach((item: any) => {
						    if (item.info.type == 'app') {
							    count++;
							    singleTabbar = item;
						    }
					    })
				    }

				    if (count == 1) {
					    Object.assign(tabbar, singleTabbar);
				    }

			    } catch (e) {

			    }
		    }

	    }
    }

    setTabbar()

    watch(
        () => props.addon,
        (newValue, oldValue) => {
            if(newValue && oldValue && newValue != oldValue) {
                setTabbar()
            }
        }
        , { immediate: true }
    )

    if(!props.addon) {
        watch(
            () => useConfigStore().tabbarList,
            (newValue, oldValue) => {
                if (newValue) {
                    setTabbar()
                }
            }
            , { deep: true, immediate: true }
        )
    }

	const value = computed(() => {
        let query:any = currShareRoute().params;
        let str = [];
        for (let key in query) {
            str.push(key + '=' + query[key]);
        }
		return '/' + currRoute() + (str.length > 0 ? '?' + str.join('&') : '')
	})

	// const tabbarChange = (url : string) => {
        // 外部链接
	// }
	
	const itemBtn = (url)=>{
		if (url.indexOf('http') != -1 || url.indexOf('http') != -1) {
		
		    // #ifdef H5
		    window.location.href = url;
		    // #endif
		
		    // #ifdef MP
		    redirect({
		        url: '/app/pages/webview/index',
		        param: { src: encodeURIComponent(url) }
		    });
		    // #endif
		} else {
			let query:any = currShareRoute().params;
			let str = [];
			for (let key in query) {
				str.push(key + '=' + query[key]);
			}
			if(url == ('/' + currRoute()) && !str.length) return
		    redirect({ url,mode: 'reLaunch' })
		}
	}
    defineExpose({
    })
</script>

<style lang="scss" scoped>
	.tab-bar-placeholder {
		padding-bottom: calc(constant(safe-area-inset-bottom) + 112rpx);
		padding-bottom: calc(env(safe-area-inset-bottom) + 112rpx);
	}
</style>
