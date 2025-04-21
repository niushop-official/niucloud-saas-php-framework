<template>
	<view>
		<view style="position:fixed;left:0;top:0;z-index: 22;width: 100%;">
			 
			<view style="padding:15rpx 3%;background: #fff;width: 94%;">
				<u-search placeholder="请输入搜索关键词" actionText :actionStyle="{'width':0,'margin':0}" v-model="where.keyword"
				@search="reload(true)"></u-search>
			</view>
		</view>
		<!-- #ifdef MP -->
		<view style="height: 90rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height: 120rpx;"></view>
		<!-- #endif -->
		<indexlist ref="indexlist" :videolist="videolist" v-if="videolist.length>0"></indexlist>
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
		tofollowuser
	} from '@/addon/shortvideo/api/video'
	import sharepopup from '@/addon/shortvideo/components/share-popup/share-popup.vue'
	import indexlist from '@/addon/shortvideo/components/common/indexlist.vue'
	var app = getApp();
	export default {
		components: {
			sharepopup,indexlist
		},
		data() {
			return {
				tourl: tourl,
				img: img,opt:'',
				videolist: [],
				loading: false,
				loadend: false,
				where: {
					page: 1,
					limit: 10,
					keyword: '',
				},
				type:2,
				config:''
			}
		},
		onLoad: function(opt) {
			// this.opt = this.getparams(opt);
			
			var that = this;
			getConfigApi({}).then(res => {
				that.config = res.data;
			})
		},
		onReady() {
			this.reload(true);
		},
		methods: {
			xuantype(type){
				this.type=type
				this.reload(true);
			},
			getlist(isPage) {
				var that = this;
				if (that.loadend) return;
				if (that.loading) return;
			
				that.loading = true;
				that.loadTitle = '';
				
				this.where.is_follow= this.curcate==1?1:0;
				getVideolistApi({
					ismyguanzhu: that.type == 1 ? 1 : 0,
					is_news: that.type == 3 ? 1 : 0,
					id: this.opt.id || '',
					tauid: this.opt.tauid || '',
					page: this.where.page,
					limit: this.where.limit,
					keyword: this.where.keyword,
				
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
					if (isPage === true)  that.$refs.indexlist.refresh();;
					
			 
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

	.page {
		background: #000;
	}

	/* #ifndef APP-PLUS */
	.page {
		width: 750rpx;
		height: 100vh;
		overflow: hidden;
		position: relative;
	}

	/* #endif */
	.page {
		position: absolute;
		width: 750rpx;
		top: 0;
		left: 0;
		/* width: 750rpx; */
	}

	.swiper {
		position: absolute;
		width: 750rpx;
		top: 0;
		left: 0;
	}

	.video {
		position: absolute;
		width: 750rpx;
		top: 0;
		left: 0;
	}

	.coverbox {
		position: absolute;
		width: 750rpx;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		display: flex;
		;
		align-items: center;
		justify-content: center;
	}

	.coverbox image {
		width: 100%;
		height: 100%;
	}

	.flex-row {
		display: flex;
		flex-direction: row
	}

	.goback {
		position: absolute;
		z-index: 4;
		top: 40px;
		left: 15px;
		width: 30px;
		height: 30px;
		display: flex;
		flex-direction: column;
		align-items: center
	}

	.goback-img {
		width: 30px;
		height: 30px
	}

	.playbox {
		position: absolute;
		width: 750rpx;
		height: 100%;
		flex: 1;
		background: rgba(0, 0, 0, 0.5);
		z-index: 32
	}

	.playbox-img {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 90rpx;
		height: 90rpx;
		margin-left: -30rpx;
		margin-top: -30rpx
	}

	.headimg {
		position: absolute;
		z-index: 4;
		top: 360rpx;
		right: 12rpx;
		/* border: 4rpx solid #FFFFFF; */
		margin-top: 80rpx;

	}

	.headimg-img {
		width: 86rpx;
		height: 86rpx;
		border-radius: 50%;
	}

	.viewnum {
		position: absolute;
		z-index: 4;
		top: 760rpx;
		right: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 90rpx;

	}

	.viewnum-img {
		width: 82rpx;
		height: 82rpx
	}

	.viewnum-txt {
		font-size: 24rpx;
		color: #fff;
		text-shadow: 0px 6px 12px rgba(0, 0, 0, 0.12);
	}

	.likenum {
		position: absolute;
		z-index: 4;
		top: 500rpx;
		right: 12rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 80rpx;
	}

	.xihuan {
		width: 90rpx;
		height: 90rpx
	}

	.likenum-txt {
		font-size: 24rpx;
		color: #fff;
		text-shadow: 0px 6px 12px rgba(0, 0, 0, 0.12);
	}

	.pingnum {
		position: absolute;
		z-index: 4;
		top: 630rpx;
		right: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 100rpx;
	}

	.pingnum-img {
		width: 71rpx;
		height: 71rpx;
	}

	.pingnum-txt {
		font-size: 24rpx;
		color: #fff;
		text-shadow: 0px 6px 12px rgba(0, 0, 0, 0.12);
	}

	.fenxiangnum {
		position: absolute;
		z-index: 4;
		top: 890rpx;
		right: 23rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 120rpx;
	}

	.fenxiangnum-img {
		width: 65rpx;
		height: 65rpx
	}

	.fenxiangnum-txt {
		font-size: 24rpx;
		color: #fff;
		text-shadow: 0px 6px 12px rgba(0, 0, 0, 0.12);
	}

	.linkurl {
		position: absolute;
		z-index: 4;
		bottom: 160rpx;
		right: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		background: rgba(100, 100, 100, 0.5);
		padding: 10rpx 0 10rpx 20rpx;
		border-radius: 30rpx 0 0 30rpx
	}

	.linkurl-img {
		width: 36rpx;
		height: 36rpx
	}

	.linkurl-txt {
		font-size: 26rpx;
		color: #fff;
	}

	.bottomshadow {
		position: absolute;
		z-index: 4;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 400rpx;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%);
		border-radius: 10px;
	}

	.cart {
		position: absolute;
		z-index: 5;
		bottom: 40rpx;
		right: 50rpx;
		width: 88rpx;
		height: 88rpx;
		display: relative
	}

	.cart-img {
		width: 88rpx;
		height: 88rpx
	}

	.cart-txt {
		position: absolute;
		z-index: 5;
		bottom: 6rpx;
		color: #fff;
		width: 88rpx;
		text-align: center;
		font-size: 28rpx;
		font-weight: bold
	}

	.title {
		/* position: absolute;
		z-index: 3;
		bottom: 160rpx;
		left: 30rpx; */
		width: 500rpx;
		overflow: hidden;
	}

	.title-txt {
		font-size: 36rpx;
		color: #fff;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.bottombox {
		position: absolute;
		z-index: 3;
		bottom: 35rpx;
		width: 650rpx;
		left: 30rpx;
		justify-content: flex-start;
	}

	.goodsbox {
		display: flex;
		flex-direction: row;
		background: #fff;
		padding: 15rpx;
		border-radius: 10rpx;
		width: 580rpx;
		margin-top: 30rpx;
	}

	.goodsbox image {
		width: 150rpx;
		height: 140rpx;
		margin-right: 15rpx;
	}

	.goodsbox {
		display: flex;
		flex-direction: row;
	}

	.goodsbox .buybtn {
		background: linear-gradient(to right, #ff8023 0, #ff4b50 100%) !important;
		color: #fff;
		padding: 5rpx 10rpx;
		border-radius: 5rpx;
		font-size: 12px;
		display: flex;
		;
		align-items: center;
		flex-direction: row;
		width: 150rpx;
		justify-content: center;
	}

	.goodsbox .right {
		color: #000;
		line-height: 36rpx;
		font-size: 14px;
	}

	.desc {

		width: 580rpx;
		overflow: hidden;
	}

	.desc-txt {
		font-size: 28rpx;
		height: 88rpx;
		line-height: 44rpx;
		color: #fff;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.proModel {
		width: 480rpx;
		height: 190rpx;
		position: absolute;
		bottom: 120rpx;
		right: 10rpx;
		z-index: 10;
		display: flex
	}

	.proModel-bgimg {
		width: 480rpx;
		height: 190rpx;
	}

	.proModel-content {
		width: 470rpx;
		display: flex;
		flex-direction: row;
		flex: 1;
		padding: 20rpx;
		position: relative;
		position: absolute;
		bottom: 24rpx;
		right: 10rpx
	}

	.proModel-content-img {
		width: 128rpx;
		height: 128rpx;
		border-radius: 10rpx;
		flex-shrink: 0
	}

	.proModel-content-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx
	}

	.proModel-content-name {
		color: #212121;
		font-size: 28rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-weight: bold;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.proModel-content-sales {
		color: #999999;
		font-size: 24rpx;
		height: 40rpx;
		line-height: 40rpx
	}

	.proModel-content-price {
		color: #0067ff;
		font-size: 28rpx;
		font-weight: bold;
		height: 50rpx;
		line-height: 50rpx
	}

	.probox {
		width: 750rpx;
		height: 700rpx;
		padding: 20rpx 20rpx;
		background: #fff;
		z-index: 6;
		position: absolute
	}

	.probox-replyshadow {
		position: absolute;
		z-index: 7;
		background: rgba(0, 0, 0, 0.4);
		width: 750rpx;
		flex: 1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.probox-close {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		z-index: 7;
		width: 50rpx;
		height: 50rpx;
		padding: 10rpx;
	}

	.probox_title {
		height: 60rpx;
		line-height: 60rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row
	}

	.probox_title-t1 {
		font-size: 28rpx;
		color: #000;
		font-weight: bold
	}

	.probox_title-t2 {
		font-size: 28rpx;
		color: #000;
		font-weight: bold
	}

	.probox_content {
		height: 580rpx;
		overflow: scroll;
		display: flex;
	}

	.probox_content-item {
		display: flex;
		flex-direction: row;
		flex: 1;
		padding: 20rpx;
		position: relative
	}

	.probox_content-item-img {
		width: 188rpx;
		height: 188rpx;
		border-radius: 10rpx;
		flex-shrink: 0
	}

	.probox_content-item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx
	}

	.probox_content-item-name {
		color: #212121;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 40rpx;
		font-weight: bold;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.probox_content-item-sales {
		color: #999999;
		font-size: 24rpx;
		height: 50rpx;
		line-height: 50rpx
	}

	.probox_content-item-price {
		color: #0067ff;
		font-size: 36rpx;
		font-weight: bold;
		height: 50rpx;
		line-height: 50rpx
	}

	.probox_content-item-btn {
		position: absolute;
		top: 140rpx;
		right: 20rpx;
		background: linear-gradient(-90deg, #0067ff 0%, rgba(253, 74, 70, 0.76) 100%);
		border-radius: 26px;
		width: 150rpx;
		height: 54rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center
	}

	.probox_content-item-btn-txt {
		color: #FFFFFF;
		font-size: 24rpx;
		font-weight: bold;
		text-align: center
	}

	.fenxiao_content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		width: 750rpx;
		height: 280rpx;
		padding: 20rpx 0;
		background: #fff;
		display: flex;
	}

	.popupshare__close2 {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		z-index: 1000;
		width: 50rpx;
		height: 50rpx;
		padding: 10rpx;
	}

	.sharetypecontent {
		flex: 1;
		width: 710rpx;
		height: 250rpx;
		margin: 0 20rpx;
		display: flex;
		flex-direction: row;
		padding: 50rpx;
	}

	.fenxiaoitem {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff;
		font-size: 24rpx;
		border: 0
	}

	.sharetypecontent button::after {
		border: 0
	}

	.fenxiaoitem-img {
		width: 90rpx;
		height: 90rpx;
		padding: 0;
		margin: 0
	}

	.fenxiaoitem-t1 {
		font-size: 24rpx;
		color: #111111;
		height: 60rpx;
		line-height: 60rpx
	}

	.sharetypecontent-f2 {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center
	}

	.sharetypecontent-f2-img {
		width: 90rpx;
		height: 90rpx;
	}

	.sharetypecontent-f2-t1 {
		font-size: 24rpx;
		color: #111111;
		height: 60rpx;
		line-height: 60rpx
	}

	.haibaoModel {
		position: absolute;
		z-index: 99;
		width: 750rpx;
		height: 1200rpx;
		top: 100rpx;
		left: 0
	}

	.haibaoModel-main {
		width: 670rpx;
		height: 1100rpx;
		margin: 60rpx 40rpx 30rpx 40rpx;
		background: #fff;
		position: relative;
		border-radius: 20rpx;
		display: flex
	}

	.haibaoModel-close {
		position: absolute;
		padding: 20rpx;
		top: 0;
		right: 0;
		z-index: 10;
	}

	.haibaoModel-img {
		width: 40rpx;
		height: 40rpx;
	}

	.haibaoModel-content {
		flex: 1;
		padding: 70rpx 20rpx 30rpx 20rpx;
		color: #333;
		font-size: 30rpx;
		text-align: center;
		display: flex
	}

	.haibaoModel-content-img {
		flex: 1;
	}

	.proModel-close {
		width: 36rpx;
		height: 36rpx;
		padding: 10rpx;
		position: absolute;
		top: 6rpx;
		right: 14rpx;
		z-index: 9
	}


	.pinglun {
		width: 750rpx;
		padding: 0 20rpx;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background: #fff;
		z-index: 8;
		border-top: 1px solid #ccc;
	}

	.pinglun-faceicon {
		width: 46rpx;
		height: 46rpx;
		margin-left: 10rpx;
		margin-right: 18rpx
	}

	.pinglun-input {
		flex: 1;
		color: #000;
		font-size: 32rpx;
		padding: 0;
		line-height: 100rpx
	}

	.pinglun-buybtn {
		margin-left: 0.08rpx;
		background: #0067ff;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 30rpx;
		border-radius: 6rpx
	}

	.pinglun-buybtn-txt {
		color: #fff;
		font-size: 28rpx;
		height: 60rpx;
		line-height: 60rpx;
	}


	.pingjiabox {
		/* width: 750rpx;
		height: 700rpx;
		padding: 20rpx 20rpx;
		background: #fff;
		z-index: 6; */

	}

	.pingjiabox-replyshadow {
		position: absolute;
		z-index: 7;
		background: rgba(0, 0, 0, 0.4);
		width: 750rpx;
		flex: 1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.pingjiabox-close {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		z-index: 7;
		width: 50rpx;
		height: 50rpx;
		padding: 10rpx;
	}

	.pingjiabox_title {
		height: 60rpx;
		line-height: 60rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row
	}

	.pingjiabox_title-t1 {
		font-size: 28rpx;
		color: #000;
		font-weight: bold
	}

	.pingjiabox_title-t2 {
		font-size: 28rpx;
		color: #000;
		font-weight: bold
	}

	.pingbox {
		height: 880rpx;
		overflow: scroll;
		display: flex;
	}

	.pingbox-plcontent {
		display: flex;
		flex-direction: row;
		vertical-align: middle;
		color: #111;
		font-size: 14px;
		line-height: 23px;
	}

	.pingitem {
		flex: 1;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row
	}

	.pingitem-f1 {
		width: 80rpx;
	}

	.pingitem-f1-img {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%
	}

	.pingitem-f2 {
		flex: 1
	}

	.pingitem-f2-t1 {
		font-size: 28rpx
	}

	.pingitem-f2-t2 {
		color: #000;
		margin: 10rpx 0;
		line-height: 50rpx;
	}

	.pingitem-f2-t3 {
		display: flex;
		flex-direction: row;
		flex: 1
	}

	.pingitem-f2-t3-x1 {
		color: #999;
		font-size: 26rpx;
	}

	.pingitem-f2-t3-x2 {
		flex: 1;
		display: flex;
		flex-direction: row;
	}

	.pingitem-f2-pzan {
		display: flex;
		flex-direction: row
	}

	.pingitem-f2-pzan-img {
		width: 32rpx;
		height: 32rpx;
		margin-right: 10rpx
	}

	.pingitem-f2-pzan-txt {
		font-size: 28rpx;
		text-align: center;
		display: block;
		color: #666
	}

	.pingitem-f2-phuifu {
		margin-left: 6px;
		color: #507DAF;
		font-size: 26rpx
	}

	.pingbox-relist {
		flex: 1;
		background: #f5f5f5;
		padding: 20rpx 20rpx 10rpx 20rpx;
		margin-bottom: 20rpx
	}

	.pingbox-relist-item2 {
		font-size: 24rpx;
		margin-bottom: 10rpx
	}

	.pingbox-relist-headimg {
		width: 30rpx;
		height: 30rpx;
		border-radius: 15rpx;
		margin-right: 8rpx
	}

	.pingbox-relist-nickname {
		color: #333;
		font-size: 24rpx
	}

	.pingbox-relist-f2 {
		margin-top: 10rpx
	}

	.comment-nodata {
		color: #666;
		font-size: 26rpx
	}

	.comment-nomore {
		flex: 1;
		color: #999;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		text-align: center
	}

	@supports(bottom: env(safe-area-inset-bottom)) {
		.dp-tabbar-bot {
			padding-bottom: 0 !important;
		}

		.dp-tabbar-bar {
			padding-bottom: 0 !important;
		}
	}
</style>
<style>
	 .lefticon{
		 position:fixed;left:30rpx;top:20rpx;
	 }
	 .righticon{
	 		 position:fixed;right:30rpx;top:20rpx;
	 }
</style> 