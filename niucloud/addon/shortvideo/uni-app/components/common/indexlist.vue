<template>
	<view class="">

<!-- #ifdef MP -->
		<view style="padding:0 20rpx;overflow-x: hidden;width:710rpx">
		<!-- #endif -->
		<!-- #ifdef H5 -->
	<view style="padding:0;overflow-x: hidden;width:750rpx">
		<!-- #endif -->
		
			<custom-waterfalls-flow ref="waterfallsFlowRef" @imageClick="imageClick" @wapperClick="imageClick"
				imageKey="cover" :value="videolist" :column="2" :columnSpace="1.5" :seat="2" style="margin: 0 3%;">
				<!-- #ifdef MP-WEIXIN -->
				<view class="item" v-for="(item,index) in videolist" :key="index" slot="slot{{index}}">
					<view style="padding: 15rpx;">
						<view class="title line2">{{item.name}}</view>
						<view class="flexb" style="padding:10rpx;width:250rpx">
							<view class="flex">
								<image :src="img(item.member.headimg)"
									style="width: 40rpx;height:40rpx;border-radius: 50%;" mode="aspectFill"></image>
								<view class="line1" style="width: 170rpx;">{{item.member.nickname}}</view>
							</view>
							<view class="flex" @tap.stop="tolike(item.id,index)">
								<u-icon name="heart-fill" v-if="item.is_like" size="18" color="#e33c2f"></u-icon>
								<u-icon name="heart" v-else size="18" color="#888"></u-icon>
								<text style="margin-left: 5rpx;">{{item.like_num||0}}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<template v-slot:default="item">
					<view class="item" style="padding: 0 15rpx;font-size: 14px;">
						<view class="title line2">{{item.name}}</view>
						<view class="flexb" style="padding:10rpx;width:250rpx">
							<view class="flex" v-if="item.member"
								@click="tourl('/addon/shortvideo/pages/ta?member_id='+item.member_id)">
								<image :src="img(item.member.headimg)"
									style="width: 40rpx;height:40rpx;border-radius: 50%;margin-right:5rpx"
									mode="aspectFill"></image>
								<view class="line1" style="width: 170rpx;">{{item.member.nickname}}</view>
							</view>
							<view class="flex" @tap.stop="tolike(item.id,0)">
								<u-icon name="heart-fill" v-if="item.is_like" size="18" color="#e33c2f"></u-icon>
								<u-icon name="heart" v-else size="18" color="#888"></u-icon>
								<text style="margin-left: 5rpx;">{{item.like_num||0}}</text>
							</view>
						</view>
					</view>
				</template>
				<!-- #endif -->
			</custom-waterfalls-flow>
		</view>

		<view class="flex" v-if="config?.open_fabu==1" @click="tourl('/addon/shortvideo/pages/add',0,0)"
			style="background: #ee260d;color:#fff;position: fixed;right:0;bottom:10%;border-radius:30rpx 0 0 30rpx;padding:5rpx 20rpx 5rpx 20rpx">
			<u-icon name="plus" color="#fff"></u-icon>
			<text style="margin-left:10rpx">发作品</text>
		</view>
		<!-- <view class="flex" v-if="config?.open_fabu==1" @click="tourl('/addon/shortvideo/pages/add',0,0)"
			style="background: #ee260d;color:#fff;position: fixed;right:0;bottom:15%;border-radius:30rpx 0 0 30rpx;padding:5rpx 20rpx 5rpx 20rpx">
			<u-icon name="account" color="#fff"></u-icon>
			<text style="margin-left:10rpx">我的</text>
		</view> -->
	</view>
</template>


<script>
	import {
		redirect,
		img
	} from '@/utils/common';
	import {
		useShare
	} from '@/hooks/useShare'
	import {
		lookimg,
		tourl
	} from '@/addon/shortvideo/utils/common';
	import {
		getConfigApi,videoLikeApi
	} from '@/addon/shortvideo/api/video'
	import customWaterfallsFlow from '@/addon/shortvideo/components/custom-waterfalls-flow/components/custom-waterfalls-flow/custom-waterfalls-flow.vue';
	export default {
		components: {
			customWaterfallsFlow
		},
		props: {
			videolist: []
		},
		data() {
			return {
				tourl: tourl,
				img: img,
				config: ''
			}
		},
		created() {

		},
		methods: {
			refresh() {
				this.$refs.waterfallsFlowRef.refresh()
			},
			imageClick(e) {
				console.log(e);
				uni.navigateTo({
					url: './index?id=' + e.id
				})
			},
			tolike(id) {
				var index = 0;
				for (var i = 0; i < this.videolist.length; i++) {
					if(this.videolist[i].id==id){
						index = i;break;
					}
				}
				
				const state = !this.videolist[index].is_like;

				videoLikeApi({
					id: this.videolist[index].id,
					is_like: state
				}).then(res => {
					uni.showToast({
						icon: 'none',
						title: state ? '点赞成功' : '取消点赞'
					});
					 this.videolist[index].is_like = state;
					if (state) {
						this.videolist[index].like_num += 1;
					} else {
						this.videolist[index].like_num -= 1;
					}
					// this.reload(true);
				});
			},
			reload(type){
				// this.$emit('reload',type)
			}
		},
	}
</script>

<style scoped>
	@import '@/addon/shortvideo/static/css/base.css';

	view {
		display: block;
	}
</style>