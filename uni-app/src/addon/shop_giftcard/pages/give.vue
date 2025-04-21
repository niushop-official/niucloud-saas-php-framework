<template>
    <view class="bg-[#f8f8f8] min-h-[100vh]" :style="themeColor()">
        <template v-if="Object.keys(detail).length">
            <view class="px-[var(--sidebar-m)] py-[var(--top-m)]">
                <view class="w-full h-[430rpx] relative">
                    <image v-if="detail.card_cover" class="w-full h-[430rpx] rounded-[var(--rounded-mid)]" :src="img(detail.card_cover)" @error="detail.card_cover= defaultCard(detail)" mode="aspectFill" />
                    <image v-else class="w-full h-[430rpx] rounded-[var(--rounded-mid)]" :src="img(defaultCard(detail))" mode="aspectFill" />
                    <view class="absolute bottom-[var(--pad-top-m)] left-0 right-0 flex justify-center">
                        <button :class="{'!bg-[#EF000C]':detail.giftcard.card_right_type=='balance','!bg-[#FF7700]':detail.giftcard.card_right_type=='goods'}"
                            class="h-[44rpx] font-500 text-[24rpx] !text-[#fff] bg-[var(--primary-color)] m-0 rounded-[var(--rounded-big)] remove-border">
                            <text class="text-[20rpx] text-[24rpx] iconfont mr-[5rpx]" :class="{'iconchuzhikaV6mm':detail.giftcard.card_right_type=='balance','iconduihuankaV6mm-1':detail.giftcard.card_right_type=='goods'}"></text>
                            <text v-if="detail.giftcard.card_right_type=='balance'" class="leading-[44rpx]">{{ detail.balance }}{{ t('yuan') }}</text>
                            <text class="leading-[44rpx]">{{ detail.giftcard.card_right_type_name }}</text>
                        </button>
                    </view>
                    <!-- <view v-if="!formData.card_bag_id"  class="flex justify-between w-full px-[var(--pad-sidebar-m)] left-0 bottom-[var(--pad-top-m)] absolute">
                      <view class="h-[44rpx] leading-[44rpx] text-[26rpx]" style="text-stroke: 0.1rpx #FFFFFF;">{{detail.card_no}}</view>
                    </view> -->
                </view>
                <view class="mt-[var(--top-m)] card-template">
                    <view class="title">{{ t('blessing') }}</view>
                    <view v-if="detail.giftcard.blessing_json" class="w-full flex flex-wrap gap-x-[var(--pad-sidebar-m)]">
                        <view v-for="item in detail.giftcard.blessing_json" :key="item.id" @click="blessingItemClick(item)"
                            class="h-[60rpx] px-[30rpx] box-border text-[28rpx] leading-[56rpx] rounded-[30rpx] bg-[var(--temp-bg)] mb-[var(--pad-top-m)] box-border border-[2rpx] border-solid border-[var(--temp-bg)]"
                            :class="{'!border-[var(--primary-color)] !bg-[var(--primary-color-light)] !text-[var(--primary-color)]':item.id === formData.blessing_id}">{{ item.blessing }}</view>
                        <view @click="blessingItemClick({id:'',blessing:''})"
                            class="h-[60rpx] px-[30rpx] box-border text-[28rpx] leading-[56rpx] rounded-[30rpx] bg-[var(--temp-bg)] mb-[var(--pad-top-m)] box-border border-[2rpx] border-solid border-[var(--temp-bg)]"
                            :class="{'!border-[var(--primary-color)] !bg-[var(--primary-color-light)] !text-[var(--primary-color)]':active}">{{ t('customBlessing') }}</view>
                    </view>
                    <view v-if="active" class="h-[200rpx] bg-[var(--temp-bg)] rounded-[var(--rounded-big)] px-[var(--pad-sidebar-m)] py-[var(--pad-top-m)] box-border">
                        <textarea class="leading-[1.5] h-[100%] w-[100%] text-[28rpx]" v-model.trim="blessing" cols="30" rows="5" :placeholder="t('blessingPlaceholder')" placeholder-class="text-[28rpx] text-[var(--text-color-light9)]" maxlength="20" @input="blessingInput" />
                    </view>
                </view>
            </view>
            <view class="border-[0] border-t-[2rpx] border-solid border-[#f5f5f5] w-full tab-bar" :class="{'h-[70rpx]':!formData.card_bag_id,'h-[124rpx]':formData.card_bag_id}">
                <view class="border-[0] border-t-[2rpx] border-solid border-[#f5f5f5] w-full px-[var(--pad-sidebar-m)] bg-[#fff] box-border fixed left-0 bottom-0 tab-bar z-1 items-center">
                    <button v-if="detail.status=='to_use' && detail.giftcard.is_give"
                        class="w-full !h-[70rpx] font-500 text-[26rpx] !text-[#fff] primary-btn-bg !m-0 leading-[70rpx] rounded-full remove-border"
                        :class="{'opacity-40':disable}" @click="save">{{ t('giftToFriendsSave') }}</button>
                    <view v-if="formData.card_bag_id && detail.to_use_count"
                          class="mt-[20rpx] text-[24rpx] text-center leading-[34rpx] !text-[var(--text-color-light9)]" @click="giveSetUp">{{ t('giveSetUp') }}</view>
                </view>
            </view>
            <share-poster ref="sharePosterRef" posterType="shop_giftcard_give" :posterId="detail.giftcard.poster_id" :copyUrl="copyUrl" :posterParam="posterParam" :copyUrlParam="copyUrlParam" />
            <give-popup v-model="dialogVisible" :max-num="detail.to_use_count" @success="giveSetUpSuccess" />
        </template>

        <loading-page :loading="loading"></loading-page>

        <!-- #ifdef MP-WEIXIN -->
        <!-- 小程序隐私协议 -->
        <wx-privacy-popup ref="wxPrivacyPopupRef"></wx-privacy-popup>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { redirect, img, getToken, goback } from '@/utils/common';
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref, computed, nextTick } from 'vue'
import { t } from '@/locale'
import givePopup from '@/addon/shop_giftcard/components/give-popup/give-popup';
import useMemberStore from '@/stores/member'
import { giveCard, giveCardBatch } from '@/addon/shop_giftcard/api/card';
import sharePoster from '@/components/share-poster/share-poster.vue'
import { useShare } from '@/hooks/useShare'
import { useLogin } from '@/hooks/useLogin'

// 会员信息
const memberStore = useMemberStore()
const userInfo = computed(() => memberStore.info)

const detail: any = ref({})
const loading = ref(true)
const disable = ref(false)
const formData: any = ref({
    card_id: '',
    blessing: '',
    blessing_id: '',
    give_id: '',
    card_bag_id: '',
    give_num: '',
    limit_num: ''
})
const active = ref(false)
const blessing = ref('')
const dialogVisible = ref(false)

// 分享
const { setShare } = useShare()
const wxPrivacyPopupRef: any = ref(null)
onLoad((option: any) => {
    if (!option.card_id && !option.card_bag_id) {
        let parameter = {
            url: '/addon/shop_giftcard/pages/index',
            title: t('notCard'),
            mode: 'reLaunch'
        };
        goback(parameter);
    } else {
        // 检测是否登录
        if (!getToken()) {
            useLogin().setLoginBack({
                url: '/addon/shop_giftcard/pages/give',
                param: { card_id: option.card_id, card_bag_id: option.card_bag_id }
            })
            return false
        }

        nextTick(() => {
            // #ifdef MP
            if (wxPrivacyPopupRef.value) wxPrivacyPopupRef.value.proactive();
            // #endif
        })

        formData.value.card_id = option.card_id || ''
        formData.value.card_bag_id = option.card_bag_id || ''
        formData.value.give_id = uni.getStorageSync('give_id')

        if (userInfo.value) {
            giveCardFn()
        } else {
            memberStore.getMemberInfo(() => {
                giveCardFn()
            })
        }

    }
})
onShow(() => {
    if (Object.keys(detail.value).length) giveCardFn();
})
const giveCardFn = (callback: any = null) => {
    loading.value = true
    let giveCardApi = formData.value.card_bag_id ? giveCardBatch : giveCard

    giveCardApi(formData.value).then((res: any) => {
        if (res.data) {
            detail.value = res.data;

            if (!uni.getStorageSync('give_id')) uni.setStorageSync('give_id', detail.value.give_id)
            copyUrlFn();
            let link = '';
            let path = '/addon/shop_giftcard/pages/receive_info' + copyUrlParam.value;

            // #ifdef H5
            let pathName = location.pathname;
            let packageArr: any = ['/app/', '/addon/'];
            for (let i = 0; i < packageArr.length; i++) {
                if (pathName.indexOf(packageArr[i]) != -1) {
                    pathName = pathName.substr(0, pathName.indexOf(packageArr[i]));
                }
            }

            link = location.origin + pathName + path;
            // #endif

            setTimeout(() => {
                let share = {
                    title: t('shareTitle'),
                    desc: formData.value.blessing,
                    url: detail.value.card_cover,
                    link,
                    path
                }

                setShare({
                    wechat: {
                        ...share
                    },
                    weapp: {
                        ...share
                    }
                });
            }, 600);

            if (callback) callback();
        }
        loading.value = false
        disable.value = false

    }).catch(() => {
        loading.value = false
        disable.value = false
    })
}

const blessingItemClick = (item: any) => {
    active.value = item.id ? false : true
    if (item.id) blessing.value = ''
    formData.value.blessing = item.blessing
    formData.value.blessing_id = item.id
}

const blessingInput = () => {
    blessing.value = blessing.value.substr(0, 20)
    formData.value.blessing = blessing.value.substr(0, 20)
}
const giveSetUp = () => {
    if (disable.value) return
    dialogVisible.value = true
}
const giveSetUpSuccess = (value: any) => {
    formData.value = Object.assign(formData.value, value)
    formData.value.give_id = 0;
    dialogVisible.value = false
    giveCardFn()
}
const save = () => {
    if (disable.value) return
    if (!formData.value.blessing) {
        uni.showToast({ title: t('blessingPlaceholder'), icon: 'none' })
        return
    }
    disable.value = true
    giveCardFn(() => {
        openShareFn()
    })
}

/************* 分享海报-start **************/
const sharePosterRef: any = ref(null);
const copyUrl = ref('/addon/shop_giftcard/pages/receive_info')
const copyUrlParam = ref('');

let posterParam: any = {};

// 分享海报链接
const copyUrlFn = () => {
    copyUrlParam.value = '?give_id=' + detail.value.give_id;
    if (userInfo.value && userInfo.value.member_id) copyUrlParam.value += '&mid=' + userInfo.value.member_id;
}

const openShareFn = () => {
    posterParam.give_id = detail.value.give_id;
    if (userInfo.value && userInfo.value.member_id) posterParam.member_id = userInfo.value.member_id;
    sharePosterRef.value.openShare()
}
/************* 分享海报-end **************/
const defaultCard = (data) => {
    let imgUrl = '';
    if (data.giftcard.card_right_type == 'balance') {
        imgUrl = 'addon/shop_giftcard/diy/index/value_card.jpg';
    } else {
        imgUrl = 'addon/shop_giftcard/diy/index/redemption_card.jpg';
    }
    return imgUrl;
}
</script>

<style lang="scss" scoped>
.tab-bar {
    padding-top: 16rpx;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 16rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 16rpx);
}
</style>
<style lang="scss">
:deep(.u-input) {
    background-color: transparent !important;
}

:deep(.u-form-item) {
    flex: 1;

    .u-line {
        display: none;
    }
}

:deep(.u-form-item__body__right) {
    display: flex;
    align-items: center;
}

:deep(view[name="content"]) {
    transform: scaleX(1) scaleY(1) !important;
}

//礼品卡描边
.text-stroke {
    -webkit-text-stroke-color: #FFF; /* 文字描边颜色 */
    -webkit-text-stroke-width: 1rpx; /* 文字描边宽度 */
}
</style>
