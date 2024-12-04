import { defineStore } from 'pinia'
import { getInitInfo, getSiteInfo } from '@/app/api/system'
import useConfigStore from '@/stores/config'
import useMemberStore from '@/stores/member'
import { isWeixinBrowser } from '@/utils/common'
import { cloneDeep } from 'lodash-es';

interface System {
    site: AnyObject | null,
    siteApps: string[],
    siteAddons: string[],
    currRoute: string,
    mapConfig: any,
    initStatus: any, // 初始化状态
    menuButtonInfo: any, // 如果是小程序，获取右上角胶囊的尺寸信息
    shareCallback: any, // 分享回调
    defaultPositionAddress:any,
	diyAddressInfo: any  // 定位信息
}

const useSystemStore = defineStore('system', {
    state: (): System => {
        return {
            site: null,
            siteApps: [],
            siteAddons: [],
            currRoute: '',
            mapConfig: {
                is_open: 1,
                valid_time: 0
            },
            initStatus: 'wait',
            menuButtonInfo: {
                height: '',
                top: '',
                right: '',
                width: ''
            },
            shareCallback: null,
            defaultPositionAddress:'定位中',
			diyAddressInfo: null
        }
    },
    actions: {
        // 获取初始化数据信息
        getInitFn(callback: any) {

            let url = '';
            // #ifdef H5
            if (isWeixinBrowser()) {
                url = uni.getSystemInfoSync().platform == 'ios' ? uni.getStorageSync('initUrl') : location.href
            }
            // #endif

            getInitInfo({
                url
            }).then((res: any) => {
                if (res.data) {
                    let data = res.data;

                    // 底部导航
                    const configStore = useConfigStore()
                    configStore.tabbarList = data.tabbar_list;

                    // 地图配置
                    this.mapConfig.is_open = data.map_config.is_open;
                    this.mapConfig.valid_time = data.map_config.valid_time;
                    uni.setStorageSync('mapConfig', this.mapConfig);

                    // 站点信息
                    this.site = data.site_info
                    this.siteApps = data.site_info.app
                    this.siteAddons = data.site_info.site_addons.map((item: AnyObject) => {
                        return item.key
                    })

                    // 会员等级
                    const memberStore = useMemberStore();
                    memberStore.levelList = data.member_level;

                    // 登录注册配置
                    configStore.login.is_username = data.login_config.is_username
                    configStore.login.is_mobile = data.login_config.is_mobile
                    configStore.login.is_auth_register = parseInt(data.login_config.is_auth_register)
                    configStore.login.is_force_access_user_info = parseInt(data.login_config.is_force_access_user_info)
                    configStore.login.is_bind_mobile = parseInt(data.login_config.is_bind_mobile)
                    configStore.login.agreement_show = parseInt(data.login_config.agreement_show)
                    configStore.login.bg_url = data.login_config.bg_url // 背景图
                    configStore.login.logo = data.login_config.logo //logo
                    configStore.login.desc = data.login_config.desc // 描述
                    uni.setStorageSync('login_config', configStore.login)

                    this.initStatus = 'finish'; // 初始化完成
                    if (callback) callback()
                }
            })

            this.getMenuButtonInfoFn();
        },
        getMenuButtonInfoFn() {
            // 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
            // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
            this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
            // #endif
        },
        async getSiteInfoFn() {
            await getSiteInfo().then((res: any) => {
                this.site = res.data
                this.siteApps = res.data.app
                this.siteAddons = res.data.site_addons.map((item: AnyObject) => {
                    return item.key
                })
            }).catch((err) => {
            })
        },
		// 当前选择的收货地址信息[经纬度，当前定位地址，定位过期时间]
		setAddressInfo(data:any = {}) {
			let addressInfo = cloneDeep(data);
			// 过期时间
			var date = new Date();
			date.setSeconds(60 * this.mapConfig.valid_time);
			addressInfo.valid_time = date.getTime() / 1000; // 定位信息 5分钟内有效，过期后将重新获取定位信息
			
			if(this.diyAddressInfo){
				this.diyAddressInfo = Object.assign(this.diyAddressInfo, addressInfo);
			}else{
				this.diyAddressInfo = addressInfo;
			}
			
			if(Object.keys(data).length){
				uni.setStorageSync('location_address', addressInfo);
			}else{
				uni.removeStorageSync('location_address');
			}
		}
    }
})

export default useSystemStore
