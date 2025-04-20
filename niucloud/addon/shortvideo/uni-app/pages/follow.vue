<template>
	<view class="followbox"> 
	   
		<view class='follow-list' v-if="followList.length">
			<view class='item acea-row row-center-wrapper' v-for='(item,index) in followList' :key="index" >
				<view class="left" @click="touserdetial(item.user.member_id)">
					<up-avatar :src="item.user?.headimg" mode="" size="40"></up-avatar>
				</view>
				<view class="center" @click="touserdetial(item.user?.member_id)">
					<view class="title">{{item.user?.nickname}}</view>
				</view>
				<view class="right">
					<view class="guanzhu" @click="toguanzhu(item.user?.member_id,item.isfollow);item.isfollow=!item.isfollow" v-if="item.isfollow">
						{{item.isfensi?'互相关注':'已关注'}}
					</view>
					<view class="guanzhu no" @click="toguanzhu(item.user?.member_id,item.isfollow);item.isfollow=!item.isfollow" v-else>关注</view>
				</view>
			</view>
		</view>
		<view class='loadingicon flex ' style="margin: 50rpx 0;display:flex;justify-content:center">
			<text style="color: #999;">{{loadTitle}}</text>
		</view>

	</view>
</template>

<script>
	import {
		reactive,
		ref,
		onMounted
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		t
	} from '@/locale'
	import {
		redirect,
		img
	} from '@/utils/common';
	import {
		useShare
	} from '@/hooks/useShare'
	import {
		getfensilist,getfollowlist,
		tofollowuser
	} from '@/addon/shortvideo/api/video'
	import { lookimg, tourl,SplitArray } from '@/addon/shortvideo/utils/common';
	export default {
		components: {
	
		},
		data() {
			return {
				img:img,
				statusIndex: 1,
				followList: [],
				loadTitle: '',
				loading: false,
				loadend: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				where: {
					status: 1,
					page: 1,
					limit: 10,
					member_id: '',
					isfollow: 1
				},
				isme: false

			};
		},
		onLoad(options) {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#ffffff'
			})
			console.log(options);
			if (options.hasOwnProperty('member_id')) { 
				this.$set(this.where, 'member_id', options.member_id); 
			}
			if (options.hasOwnProperty('isfollow')) { 
				this.$set(this.where, 'isfollow', options.isfollow); 
			}
			if (options.hasOwnProperty('isme')) { 
				this.isme = options.isme
			}
			// this.$set(this.where, 'member_id', 7523);
			// this.$set(this.where, 'isfollow', 0); 
			this.reload()
		},
		methods: {
			reload(){
				this.loadend = false;
				this.$set(this.where, 'page', 1); 
				this.followList = [];
				this.getfollowlists();
			},
			/**
			 * 授权回调
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getfollowlists();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			changstatus: function(index) {
				this.statusIndex = index;
				this.loadend = false;
				this.$set(this.where, 'status', index)
				this.$set(this.where, 'page', 1);
				this.getfollowlists(true);
			},

			/**
			 * 获取列表
			 */
			getfollowlists: function(isPage) {
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				if (isPage === true) that.$set(that, 'followList', []);
				that.loading = true;
				that.loadTitle = '';
				if(that.where.isfollow == 1){
					uni.setNavigationBarTitle({
						title: '关注列表'
					})
					getfollowlist(that.where).then(res => {
						uni.stopPullDownRefresh()
						let list = res.data.list;
						let followList = SplitArray(list, that.followList);
						let loadend = list.length < that.where.limit;
						that.loadend = loadend;
						that.loading = false;
						that.loadTitle = loadend ? '已全部加载' : '加载更多';
						that.$set(that, 'followList', followList);
						that.$set(that, 'isme', res.data.isme);
						that.$set(that.where, 'page', that.where.page + 1);
					}).catch(err => {
						that.loading = false;
						that.loadTitle = '加载更多';
					});
				}else{
					uni.setNavigationBarTitle({
						title: '粉丝列表'
					})
					getfensilist(that.where).then(res => {
						uni.stopPullDownRefresh();
						let list = res.data.list;
						console.log(list);
						let followList = SplitArray(list, that.followList);
						let loadend = list.length < that.where.limit;
						that.loadend = loadend;
						that.loading = false;
						that.loadTitle = loadend ? '已全部加载' : '加载更多';
						that.$set(that, 'followList', followList);
						that.$set(that, 'isme', res.data.isme);
						that.$set(that.where, 'page', that.where.page + 1);
					}).catch(err => {
						that.loading = false;
						that.loadTitle = '加载更多';
					});
				}


			},
			toguanzhu(member_id, isfollow) {
				
				let that = this;
				tofollowuser({
					'member_id': member_id,
					'isfollow': !isfollow
				}).then(res => {
					console.log(res);
				}).catch(err => {
					console.log(err);
				});
			},
			touserdetial(member_id) {
				uni.redirectTo({
					url: '/addon/shortvideo/pages/ta?member_id=' + member_id
				})
			}, 
		},
		onPullDownRefresh() {
			this.reload();
		},
		onReachBottom() {
			this.getfollowlists();
		}
	}
</script>

<style>
	page,
	uni-page-body {
		background-color: #000;
	}

	.followbox {
		background-color: #000;
		color: #fff;
	}
	.follow-list{
		margin-top: 30rpx;
	}
	.follow-list .item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1px solid #555;
		margin: 0 3%;
	}

	.follow-list .item .left image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.follow-list .item .center {
		flex: 1;
		margin: 0 20rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		align-items: flex-start;
	}

	.follow-list .item .center .title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 400rpx;
	}

	.follow-list .item .center .desc {
		overflow: hidden;
		width: 400rpx;
		color: #999;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.follow-list .item .right .guanzhu {
		border-radius: 30rpx;
		background-color: #161923;
		color: #fff;
		text-align: center;
		height: 50rpx;
		line-height: 48rpx;
		border: 1px solid #fff;
		width: 140rpx;
	}

	.follow-list .item .right .guanzhu.no {
		background-color: #fff;
		;
		color: #161923;
	}
</style>
