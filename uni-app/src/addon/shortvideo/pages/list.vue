<template>
	<view>
		<view style="position:fixed;left:0;top:0;z-index: 22;width: 100%;">
			<view class="navbox flexm" style="padding-left:85rpx">
				<view class="item" @click="tourl('/addon/shortvideo/pages/index',0,0)">视频</view>
				<view class="item" :class="type==1?'on':''" @click="xuantype(1)">关注</view>
				<view class="item" :class="type==2?'on':''" @click="xuantype(2)">推荐</view>
				<view class="item" :class="type==3?'on':''" @click="xuantype(3)">最新</view>
			</view>
			<scroll-view class="navbox2 flexm" style="padding-left:0" >
				<view class="item" :class="where.label==''?'on':''" @click="xuanlabel('')">全部</view>
				<view class="item" :class="where.label==item.id?'on':''" v-for="(item) in labellist" @click="xuanlabel(item.id)">{{item.name}}</view>
			</scroll-view>

			<view class="lefticon " v-if="config?.open_fabu==1" @click="tourl('/addon/shortvideo/pages/my',0,0)">
				<u-icon name="account" color="#000" :size="26"></u-icon>
			</view>
			<view class="righticon " @click="tourl('/addon/shortvideo/pages/search',0,0)" style="right:110rpx">
				<u-icon name="search" color="#000" size="26"></u-icon>
			</view>
			<view class="righticon " v-if="config?.open_fabu==1" @click="tourl('/addon/shortvideo/pages/add',0,0)">
				<u-icon name="camera" color="#000" size="26"></u-icon>
			</view>
			<!-- <view style="padding:15rpx 3%;background: #fff;width: 94%;">
				<u-search placeholder="请输入搜索关键词" actionText :actionStyle="{'width':0,'margin':0}" v-model="where.keyword"
				@search="reload(true)"></u-search>1
			</view> -->
		</view>
		<!-- #ifdef MP -->
		<view style="height: 120rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height: 200rpx;"></view>
		<!-- #endif -->
		<indexlist ref="indexlist" :videolist="videolist"  v-if="videolist.length>0"></indexlist>
		<tabbar />
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
		lookimg,
		tourl
	} from '@/addon/shortvideo/utils/common';
	import {
		getVideolistApi,
		addViewsApi,
		videoLikeApi,
		getvideoCommentlistApi,
		tocommentApi,
		commentLikeApi,
		getConfigApi,
		getcatelistApi,
		tofollowuser,getlabellistApi
	} from '@/addon/shortvideo/api/video'
	import sharepopup from '@/addon/shortvideo/components/share-popup/share-popup.vue'
	import indexlist from '@/addon/shortvideo/components/common/indexlist.vue'
	var app = getApp();
	export default {
		components: {
			sharepopup,
			indexlist
		},
		data() {
			return {
				tourl: tourl,
				img: img,
				opt: '',
				videolist: [],
				loading: false,
				loadend: false,
				where: {
					page: 1,
					limit: 10,
					keyword: '',
					label:''
				},
				type: 2,
				config: '',
				labellist:[],
			}
		},
		onLoad: function(opt) {
			// this.opt = this.getparams(opt);

			var that = this;
			getConfigApi({}).then(res => {
				that.config = res.data;
			})
			getlabellistApi({}).then(res => {
				that.labellist = res.data;
			})
		},
		onReady() {
			this.reload(true);
		},
		methods: {
			xuantype(type) {
				this.type = type
				this.reload(true);
			},
			xuanlabel(label) {
				this.where.label = label;
				this.reload(true);
			},
			getlist(isPage) {
				var that = this;
				if (that.loadend) return;
				if (that.loading) return;

				that.loading = true;
				that.loadTitle = '';

				this.where.is_follow = this.curcate == 1 ? 1 : 0;
				getVideolistApi({
					ismyguanzhu: that.type == 1 ? 1 : 0,
					is_news: that.type == 3 ? 1 : 0,
					id: this.opt.id || '',
					tauid: this.opt.tauid || '',
					page: this.where.page,
					limit: this.where.limit,
					keyword: this.where.keyword,
					label:this.where.label

				}).then(res => {
					console.log(res.data);
					if (isPage === true) that.$set(that, 'videolist', []);
					let list = res.data.videoList;
					let lists = that.SplitArray(list, that.videolist);
					let loadend = list.length < that.where.limit;
					that.videolist = lists;
					// that.total = res.data.list.total;
					that.loadend = loadend;
					that.loading = false;

					that.$set(that.where, 'page', that.where.page + 1);
					if (isPage === true) that.$refs.indexlist.refresh();;


					// that.videolist = res.data.videoList;
					that.isload = true;

					// if (that.videolist.length > 0) {
					// 	that.title = that.videolist[that.videoindex].name;
					// 	that.desc = that.videolist[that.videoindex].desc;
					// 	that.pic = that.videolist[that.videoindex].cover;

					// 	setTimeout(() => {
					// 		that.updateVideo(true);
					// 	}, 200)
					// } else {
					// 	this._videoContextList = [];
					// 	uni.createVideoContext(`video` + this._videoIndex).pause();
					// 	uni.createVideoContext(`video` + this._videoIndex).seek(0);
					// 	that.title = '';
					// 	that.desc = '';
					// 	that.pic = '';
					// }
					console.log(that.videolist)
				})
			},
			SplitArray(list, sp) {
				if (typeof list != 'object') return [];
				if (sp === undefined) sp = [];
				for (var i = 0; i < list.length; i++) {
					sp.push(list[i]);
				}
				return sp;
			},
			reload(isPage) {
				if (isPage === true) {
					this.loadend = false;
					this.$set(this.where, 'page', 1);
				}
				this.getlist(isPage);
			},
		},
		onPullDownRefresh() {
			this.reload(true)
			setTimeout(() => {
				uni.stopPullDownRefresh()
				//this.tui.toast("刷新成功");
			}, 200);
		},
		onReachBottom() {
			this.reload()
		},
	}
</script>

<style>
	@import '@/addon/shortvideo/static/css/base.css';

	/* 导航 */
	.navbox2 {
		background-color: #fff;
		font-size: 16px;
		width: 100%;
		white-space: nowrap;
		display: inline-block;
	}

	.navbox2 .item {
		padding: 15rpx 10rpx 20rpx;
		/* border-bottom: 4rpx solid #fff; */
		margin: 0 18rpx;
		white-space: nowrap;
		display: inline-block;
		font-size: 14px;
		position: relative;
		color: #666;
	}

	.navbox2 .item.on {
		/* border-bottom: 4rpx solid #e93323; */
		color: #000;
		font-size: 14px;
		font-weight: bold;
	}

/* 	.navbox2 .item.on::after {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 10rpx;
		z-index: 2;
		width: 40rpx;
		height: 12rpx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #000;
		border-radius: 10rpx;
	} */

	.lefticon {
		position: fixed;
		left: 30rpx;
		top: 20rpx;
	}

	.righticon {
		position: fixed;
		right: 30rpx;
		top: 20rpx;
	}
</style>