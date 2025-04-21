<template>
	<view class="videomine">
		<view class="content">
			<!-- <view style="padding-bottom:20rpx;background-image: url('https://a.53326.com/dydao/d/20200417/2u5sx2ili3x.jpg');background-size: 100% 100%;');"> -->
			<view style="background-color: #3e0062;padding-bottom:20rpx;" >
				<view class="headbox">
					<view class="left">
						<up-avatar class="headimg" :src="userinfo.headimg" size="66"></up-avatar>
						<view class="headinfo acea-row row-column-around" style="margin-left:20rpx">
							<view class="nickname" style="width: 350upx;line-height: 50rpx;">{{userinfo.nickname}}
							</view>
							<view class="mobile">{{userinfo.last_visit_time}}来过~</view>
						</view>
					</view>
				</view>
				<!-- <view class="desc">{{userinfo.mark}}</view> -->
				<view class="databox">
					<view class="item" @click="tofollowlist(userinfo.member_id,0)">
						<text class="num">{{userinfo.fensinum|numFormat}}
						</text>
						<text>粉丝</text>
					</view>
					<view class="item" @click="tofollowlist(userinfo.member_id,1)">
						<text class="num">{{userinfo.follownum|numFormat}}</text>
						<text>关注</text>
					</view>
					<view class="item">
						<text class="num">{{userinfo.belikenum|numFormat}}</text>
						<text>获赞</text>
					</view>
				</view>
			</view>

			<view
				stype="border-radius:18rpx;margin-top:-80rpx;padding:20rpx 3%;position: relative;z-index: 2;background: #f00;">
				<view class="navlist" style="display: flex;align-items: center; ">
					<view class="item" :class="{on:statusIndex==1}" @click="changstatus(1)">
						{{userinfo.videonum|numFormat}}
						作品</view>
					<view class="item" :class="{on:statusIndex==2}" @click="changstatus(2)">
						{{userinfo.likenum|numFormat}}
						喜欢</view>
					<view class="item" :class="{on:statusIndex==3}" @click="changstatus(3)" v-if="userinfo.ismy">
						{{userinfo.shennum|numFormat}} 审核中
					</view>
				</view>
				<view class="videobox flexmc" v-if="userinfo.ismy&&videolist.length==0&&statusIndex==1" style="color:#666;margin:200rpx 0;">
					<view>您还没有发布任何作品</view>
					<view v-show="config?.open_fabu==1" @click="tourl('/addon/shortvideo/pages/add',1,0)" style="padding:8rpx 35rpx;border:1px solid #333;margin-top:30rpx;border-radius: 5rpx;">立即发布</view>
				</view>
				<view class="videobox" v-if="videolist.length">
					<view class="item" v-for='(item,index) in videolist' :key="index" style="height:380rpx">
						<view style="position: relative;">
							<image class="cover" :src="img(item.cover)" mode="ass" @click="tovideolist(item)"></image>

							<view>
								<view v-if="item.status==1&&item.is_show==1">
									<view class="bot" @click="tolike(item.id,index)"
										style="background: rgba(0, 0, 0, 0.5);width:100%;">
										<image class="aixin has" :src="img('addon/shortvideo/static/img/aixinRed.png')"
											v-if="item.is_like" mode="">
										</image>
										<image class="aixin " :src="img('addon/shortvideo/static/img/aixin.png')" v-else
											mode=""></image>
										<text class="likenum">{{item.like_num|numFormat}}</text>
									</view>
								</view>
								<view class="nopass" v-else-if="item.status==1">
									未上架
								</view>
								<view class="nopass" v-else>
									<text class="" v-if="item.status==2" style="color: red;">
										<view class="">审核未通过</view>
										<view class="">点击编辑</view>
									</text>
									<text class="" v-else>审核中</text>
								</view>
							</view>
						</view>
						<view v-if="userinfo.ismy&&item.member_id==userinfo.my_id&&(statusIndex==1||statusIndex==3)">
							<view style="display: flex;justify-content: space-between;padding: 10rpx 10rpx;">
								<!-- <view @click="toedit(item.id)" v-if="item.is_show==0">编辑</view> -->
								<view @click="up_show(item.id,0,'下架')" v-if="item.status==1&&item.is_show==1"
									style="color: #999;">下架</view>
								<view @click="up_show(item.id,1,'上架')" v-else-if="item.status==1&&item.is_show==0">上架
								</view>
								<view v-else>审核中</view>
								<view @click="del(item.id)" style="color: red;">删除</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class='loadingicon acea-row row-center-wrapper'
					style="clear:both;display: flex;justify-content:center;margin-top:30rpx">
					<text style="color: #999;">{{loadTitle}}</text>
				</view> -->
				<view class="unfloat"></view>
			</view>
		</view>

		<!-- <view style="height: 140rpx;width: 100%;"></view>
		<view class="footnav" v-if="!member_id" style="border-top: none;">
			<view @click="tourl('/addon/shortvideo/pages/index',1,0)" class="item">
				<image class="footimg" :src="img('addon/shortvideo/static/img/homehei.png')" mode=""></image>
				<view class="foottext">短视频</view>
			</view>
			<view class="item addbox " v-show="config?.open_fabu==1" @click="tourl('/addon/shortvideo/pages/add',1,0)">
				<view class="addbox">
					<image class="addboximg" :src="img('addon/shortvideo/static/img/add.png')"></image>
				</view>
			</view>
			<view class="item active">
				<image class="footimg" :src="img('addon/shortvideo/static/img/mine.png')" mode=""></image>
				<view class="foottext">我的</view>
			</view>
		</view> -->

	</view>
</template>

<script setup lang="ts">
	import {
		reactive,
		ref,
		onMounted
	} from 'vue';
	import {
		onLoad, onShow, onPullDownRefresh, onReachBottom
	} from '@dcloudio/uni-app';
	import {
		redirect,
		img
	} from '@/utils/common';
	import {
		getuserinfo,
		getVideolistApi, getConfigApi,
		tofollowuser, videoLikeApi, myvideo_status, myvideo_del
	} from '@/addon/shortvideo/api/video'
	import { lookimg, tourl, SplitArray } from '@/addon/shortvideo/utils/common';
	const imgValue = img;

	const userinfo = ref({
		member_id: '',
		nickname: '', headimg: ''
	});
	const isfollow = ref(0);
	const videolist = ref([]);
	const statusIndex = ref(1);
	const loadTitle = ref('');
	const loading = ref(false);
	const loadend = ref(false);
	const where = ref({
		ismypost: 1,
		ismylike: '',
		ismyshen: '',
		page: 1,
		limit: 18,
		member_id: ''
	});
	const istiao = ref(false);
	const xiaoxinum = ref(0);

	function numFormat(value) {
		const valueNumber = Number(value > 0 ? value : 0);
		if (valueNumber > 9999) {
			return (valueNumber * 0.0001).toFixed(1) + 'w';
		} else if (valueNumber > 999) {
			return (valueNumber * 0.001).toFixed(1) + 'k';
		}
		return valueNumber;
	}

	onLoad((options) => { 
		
		console.log(options);
		if (options.hasOwnProperty('member_id')) {
			userinfo.value.member_id = options.member_id;
			member_id.value = options.member_id
		}
		if (options.hasOwnProperty('ismylike')) {
			changstatus(2);
		}
		getuserinfos();

	});

	onShow(() => {
		istiao.value = false;
	});
	const config = ref([]);
	getConfigApi({}).then(res => {
		config.value = res.data;
	})
	function getuserinfos() {
		getuserinfo({
			member_id: userinfo.value?.member_id
		}).then((res) => {
			console.log(res);
			if (res.data) {
				userinfo.value = res.data.userinfo;
				isfollow.value = res.data.userinfo.isfollow;
				where.value.member_id = res.data.userinfo.member_id;
				loadend.value = false;
				where.value.page = 1;
				getvideolists(true);
			}
		});
	}

	function getvideolists(isPage) {

		if (loadend.value) return;
		if (loading.value) return;
		if (isPage === true) {
			videolist.value = [];
		}
		loading.value = true;
		loadTitle.value = '';
		getVideolistApi(where.value).then((res) => {
			uni.stopPullDownRefresh();
			const list = res.data.videoList;
			const videolistValue = SplitArray(list, videolist.value);
			const loadendValue = list.length < where.value.limit;
			loadend.value = loadendValue;
			loading.value = false;
			loadTitle.value = loadendValue ? '已全部加载' : '加载更多';
			videolist.value = videolistValue;
			where.value.page = where.value.page + 1;
		});
	}

	function tofollow(isfollow2) {

		tofollowuser({
			member_id: userinfo.value.member_id,
			isfollow
		}).then((res) => {
			isfollow.value = isfollow2;
			getuserinfos();
			uni.showToast({
				title: isfollow2 ? '关注成功' : '取消成功', icon: 'none'
			});
		});
	}

	function tofollowlist(member_id, isfollow) {
		uni.navigateTo({
			url: './follow?member_id=' + member_id + '&isfollow=' + isfollow
		});
	}

	function tovideolist(item) {


		if (item.status == '1') {
			uni.navigateTo({
				url: '/addon/shortvideo/pages/index?id=' + item.id + '&tauid=' + item.member_id
			});
			// const member_id = userinfo.value.member_id;
			// const ismylike = statusIndex.value === 2 ? 1 : 0;
			// const ismypost = statusIndex.value !== 2 ? 1 : 0;
			// const url = '../mine/index?member_id=' + userinfo.value.member_id;
			// if (istiao.value) {
			// 	uni.showToast({
			// 		title: '加载中',
			// 		icon: 'none'
			// 	});
			// 	return false;
			// }
			// istiao.value = true;
			// uni.navigateTo({
			// 	url: '../index?id=' + item.id + '&member_id=' + member_id + '&ismylike=' + ismylike +
			// 		'&ismypost=' + ismypost + '&backurl=' + url
			// });
		} else if (userinfo.value.ismy) {
			uni.navigateTo({
				url: '../add?id=' + item.id
			});
		}
	}


	function changstatus(index) {
		statusIndex.value = index;
		loadend.value = false;
		if (index === 3) {
			where.value.ismyshen = 1;
			where.value.ismylike = '';
			where.value.ismypost = '';
		} else if (index === 2) {
			where.value.ismylike = 1;
			where.value.ismypost = '';
			where.value.ismyshen = '';
		} else {
			where.value.ismypost = 1;
			where.value.ismylike = '';
			where.value.ismyshen = '';
		}
		where.value.page = 1;
		getvideolists(true);
	}

	function reload() {
		loadend.value = false;
		where.value.page = 1;
		getvideolists(true);
	}

	function up_show(id, status, text) {
		uni.showModal({
			title: '提示',
			content: status === 0 ? '确定下架吗? 上架需重新审核' : '确定上架吗',
			success(res) {
				if (res.confirm) {
					myvideo_status({
						id: id,
						is_show: status
					}).then((res) => {
						uni.showToast({
							title: text + '成功'
						});
						getuserinfos();
						reload();
					});
				}
			}
		});
	}

	function del(id) {
		uni.showModal({
			title: '提示',
			content: '确定删除该内容? ',
			success(res) {
				if (res.confirm) {
					myvideo_del({
						id
					}).then((res) => {
						getuserinfos();
						uni.showToast({
							title: '删除成功'
						});
						reload();
					});
				}
			}
		});
	}

	function toedit(id) {
		uni.navigateTo({
			url: '/addon/shortvideo/pages/add?id=' + id
		});
	}

	function tolike(id, index) {

		videoLikeApi({ id }).then((res) => {
			// getuserinfos();
			videolist.value[index].is_like = !videolist.value[index].is_like
			if (videolist.value[index].is_like) {
				videolist.value[index].like_num += 1;
			} else {
				videolist.value[index].like_num -= 1;
			}

		})
	}

	onReachBottom(() => {
		getvideolists();
	});

	function onPullDownRefresh() {
		reload();
		getuserinfos();
	};
</script>

<style>
	@import '@/addon/shortvideo/static/css/base.css';
	page{
		background-color: #fff;
	}

	.videomine {
		color: #fff;
		/* padding-top: 50rpx; */
		overflow-x: hidden;
	}

	.headbox {
		width: 86%;
		padding: 80rpx 8% 30rpx;
		align-items: center;
		display: flex;
	}

	.headbox .left {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.headbox .headimg {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.headbox .nickname {
		font-size: 16px;
	}

	.headbox .mobile {
		font-size: 14px;
		color: #fff;
	}

	.guanzhu {
		background-color: #fff;
		border-radius: 60px;
		height: 50rpx;
		width: 140rpx;
		line-height: 50rpx;
		text-align: center;
		color: #161923;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.guanzhu.has {
		color: #fff;
		border: 1px solid #fff;
		background: none;
	}

	.guanzhu .guanzhuimg {
		width: 40rpx;
		height: 40rpx;
		margin-right: 5rpx;
		display: inline-block;
		vertical-align: middle;
	}


	.desc {
		font-size: 12px;
		color: #999999;
		width: 86%;
		margin: 30rpx 0;
	}

	.databox {
		font-size: 12px;
		color: #fff;
		width: 86%;
		margin: 0 5% 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-radius: 15rpx;
		/* background-color: #333333; */
		padding: 14rpx 20rpx;
	}

	.databox .item {
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-radius: 15rpx;
		flex-direction: column;
		/* background-color: #333333; */
	}

	.databox .item .num {
		font-size: 22px;
		color: #fff;
		margin-bottom: 0;
	}

	.databox .item .num .unit {
		font-size: 14px;
		color: #fff;
	}

	.navlist {
		width: 90%;
		margin: 20rpx 5%;
		display: flex;
		justify-content: center;
	}

	.navlist .item {
		color: #999999;
		margin-right: 50rpx;
		padding: 20rpx 10rpx 10rpx;
	}

	.navlist .item.on {
		color: #000;
		position: relative;
	}

	.navlist .item.on:after {
		content: '';
		position: absolute;
		left: 35%;
		top: auto;
		bottom: -6rpx;
		right: 0;
		height: 6rpx;
		width: 30%;
		background-color: #000;
	}

	.videobox {
		width: 100%;
		margin-left: 0.6%;
	}

	.videobox .item {
		width: 32.0%;
		/* height: 360rpx; */
		float: left;
		margin: 5rpx 5rpx;
		position: relative;
	}

	.videobox .item .cover {
		width: 100%;
		height: 300rpx;
		border-radius: 10rpx;
	}

	.videobox .item .bot {
		position: absolute;
		bottom: 10rpx;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.videobox .item .bot .aixin {
		width: 34rpx;
		height: 34rpx;
		margin-right: 8rpx;
	}

	.videobox .item .bot .likenum {
		margin-top: 13rpx;
	}

	.videobox .item .nopass {
		position: absolute;
		bottom: 0;
		left: 0;
		text-align: center;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		color: #fff;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 自定义导航 */
	.footnav {
		position: fixed;
		z-index: 1;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 110rpx;
		background-color: rgba(0, 0, 0, 0.8);
		opacity: 1;
		box-shadow: 0px -7px 7px -7px #5E5E5E;
	}

	.footnav .item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		color: #999;
	}

	.footnav .item.active {
		color: #fff;
	}

	.footnav .item .footimg {
		width: 74rpx;
		height: 74rpx;
		margin-top: -14rpx;
	}

	.footnav .item .foottext {
		margin-top: -14rpx;
		font-size: 14px;
	}

	.footnav .item .iconfont {
		font-size: 22px;
		color: #999;
	}

	.footnav .item .addbox {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-top: 0;
		/* background-color: #161923; */
		text-align: center;
		line-height: 120rpx;
		/* box-shadow: 0px -7px 7px -7px #5E5E5E; */
	}

	.footnav .item .addbox .addboximg {
		width: 86rpx;
		height: 86rpx;
		margin: 16rpx;
	}

	.footnav .item.active .iconfont {
		font-size: 22px;
		color: #e73d3d;
	}

	.unfloat {
		clear: both;
	}
</style>