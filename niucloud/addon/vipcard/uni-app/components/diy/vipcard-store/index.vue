<template>
	<view :style="warpCss">
		<view :style="maskLayer"></view>
		<view class="diy-vipcard-store">
			<view class="flex items-center p-[32rpx] pb-0">
				<template v-if="info">
					<image class="w-[96rpx] h-[96rpx]" :src="img(info.headimg)" @error="info.headimg = 'addon/vipcard/vipcard/index/head.png'" mode="aspectFill"/>
					<view class="ml-[22rpx] mr-[60rpx] w-[56%]">
						<view class="flex-1  multi-hidden font-bold">{{info.nickname}}</view>
						<view class="text-[#696B70] text-[24rpx] mt-[10rpx]">UID：{{ info.member_no }}</view>
					</view>
				</template>
				<template v-else>
					<image class="w-[96rpx] h-[96rpx]" :src="img('addon/vipcard/vipcard/index/head.png')" mode="aspectFill"/>
					<view class="flex-1 ml-[20rpx] mr-[60rpx] w-[56%] multi-hidden font-bold" @click="toLogin">{{ t('login') }}/{{ t('register') }}</view>
				</template>
				<view class="flex flex-col items-center justify-center" @click="toMemberCode()">
					<image class="w-[36rpx] h-[36rpx]" :src="img('addon/vipcard/vipcard/index/code.png')" mode="aspectFill">
					</image>
					<text class="text-xs mt-1">{{t('memberCode')}}</text>
				</view>
			</view>
			<view class="card-list pb-[32rpx]">
				<view class="card-item" @click="toLink('/addon/vipcard/pages/order/my_reserved')">
					<image class="w-[42rpx] h-[42rpx]" :src="img('addon/vipcard/vipcard/index/reserve.png')" mode="aspectFill"/>
					<text class="text-xs">{{t('reserve')}}</text>
				</view>
				<view class="card-item" @click="toLink('/addon/vipcard/pages/order/my_card')">
					<image class="w-[42rpx] h-[42rpx]" :src="img('addon/vipcard/vipcard/index/card.png')" mode="aspectFill">
					</image>
					<text class="text-xs">{{t('cardLink')}}</text>
				</view>
				<view class="card-item" @click="toLink('/app/pages/member/index')">
					<image class="w-[42rpx] h-[42rpx]" :src="img('addon/vipcard/vipcard/index/my.png')" mode="aspectFill">
					</image>
					<text class="text-xs">{{t('myLink')}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
// 会员信息
import { ref,computed, watch, onMounted, nextTick,getCurrentInstance } from 'vue';
import { redirect, img, getToken } from '@/utils/common';
import useDiyStore from '@/app/stores/diy';
import { t } from '@/locale';
import useMemberStore from '@/stores/member'
import { useLogin } from '@/hooks/useLogin';

  const props = defineProps(['component', 'index']);
	const diyStore = useDiyStore();

	const diyComponent = computed(() => {
		if (diyStore.mode == 'decorate') {
			return diyStore.value[props.index];
		} else {
			return props.component;
		}
	})

	const warpCss = computed(() => {
		var style = '';
        style += 'position:relative;';
        if(diyComponent.value.componentStartBgColor) {
            if (diyComponent.value.componentStartBgColor && diyComponent.value.componentEndBgColor) style += `background:linear-gradient(${diyComponent.value.componentGradientAngle},${diyComponent.value.componentStartBgColor},${diyComponent.value.componentEndBgColor});`;
            else style += 'background-color:' + diyComponent.value.componentStartBgColor + ';';
        }

        if(diyComponent.value.componentBgUrl) {
            style += `background-image:url('${ img(diyComponent.value.componentBgUrl) }');`;
            style += 'background-size: cover;background-repeat: no-repeat;';
        }

		if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
		return style;
	})

  // 背景图加遮罩层
  const maskLayer = computed(()=>{
      var style = '';
      if(diyComponent.value.componentBgUrl) {
          style += 'position:absolute;top:0;width:100%;';
          style += `background: rgba(0,0,0,${diyComponent.value.componentBgAlpha / 10});`;
          style += `height:${height.value}px;`;

          if (diyComponent.value.topRounded) style += 'border-top-left-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
          if (diyComponent.value.topRounded) style += 'border-top-right-radius:' + diyComponent.value.topRounded * 2 + 'rpx;';
          if (diyComponent.value.bottomRounded) style += 'border-bottom-left-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
          if (diyComponent.value.bottomRounded) style += 'border-bottom-right-radius:' + diyComponent.value.bottomRounded * 2 + 'rpx;';
      }

      return style;
  });

	const toLink = (url: any, param = {}) => {
		redirect({ url, param })
	}

	const toLogin = () => {
		useLogin().setLoginBack({ url: '/app/pages/member/index' })
	}

	const memberStore = useMemberStore()
	const refresh = () => {
		useMemberStore().getMemberInfo()
	}

	const info = computed(() => {
		// 装修模式
		if (diyStore.mode == 'decorate') {
			return {
				headimg: 'addon/vipcard/vipcard/index/head.png',
				nickname: '昵称',
				balance: 0,
				point: 0,
				money: 0,
				member_no: 'NIU0000021'
			}
		} else {
			return memberStore.info;
		}
	})

	const toMemberCode = () => {
		if (!getToken()) {
			useLogin().setLoginBack({ url: '/addon/vipcard/pages/index' })
			return false;
		}

		// redirect({ url: '/app/pages/member/code' }); // todo 会员码页面后续完善
	}

  const instance = getCurrentInstance();
  const height = ref(0)

  onMounted(() => {
      refresh();
      // 装修模式下刷新
      if (diyStore.mode == 'decorate') {
          watch(
              () => diyComponent.value,
              (newValue, oldValue) => {
                  if (newValue && newValue.componentName == 'VipcardStore') {
                      nextTick(() => {
                          const query = uni.createSelectorQuery().in(instance);
                          query.select('.diy-vipcard-store').boundingClientRect((data: any) => {
                              height.value = data.height;
                          }).exec();
                      })
                  }
              }
          )
      }
  });
</script>

<style lang="scss" scoped>
	.card-list {
		@apply flex justify-around items-center mt-5;

		.card-item {
			@apply flex flex-1 flex-col items-center justify-center relative;
			border-right: 2rpx solid #D6D6D6;
			// &::after {
			// 	content: "";
			// 	position: absolute;
			// 	width: 2rpx;
			// 	height: 72rpx;
			// 	background-color: #D6D6D6;
			// 	right: -175%;
			// }

			&:last-of-type {
				border-right-color: transparent;
			}

			text {
				@apply mt-1;
			}
		}
	}
</style>
