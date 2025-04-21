<template>
	<view class="page" v-if="ranklist">
		<view class="top" style="margin-top: 70rpx;">

			<view class="top-item" v-if="ranklist.length>1">
				<image class="top-item-headimg" :src="img(ranklist[1].headimg||'/addon/huodong/avatar.png')"
									style="width: 120rpx;height: 120rpx;margin-top: 20rpx;"></image>
				<text class="top-item-name">{{ranklist[1].member_id_name}}</text>
				<text style="color: #fff;">
					获得<text class="top-item-score" style="color: #ffab1a;margin: 0 5rpx;">{{ranklist[1].num}}</text>积分
				</text>
				<image :src="img('addon/huodong/img/guan (2).png')"
					style="width: 100rpx;right: 0;top: -6rpx;right: 12rpx; height: 100rpx;position: absolute;"
					class="guan" mode="widthFix"></image>
			</view>
			<view class="top-item" v-if="ranklist.length>0">
				<image class="top-item-headimg" :src="img(ranklist[0].headimg||'/addon/huodong/avatar.png')"></image>
				<text class="top-item-name">{{ranklist[0].member_id_name}}</text>

				<text style="color: #fff;">
					获得<text class="top-item-score" style="color: #ffff00;margin: 0 5rpx;">{{ranklist[0].num}}</text>积分
				</text>

				<image :src="img('addon/huodong/img/guan (1).png')"
					style="width: 120rpx;right: 0;top: -30rpx;right: -7rpx; height: 120rpx;position: absolute;"
					class="guan" mode="widthFix"></image>
			</view>
			<view class="top-item" v-if="ranklist.length>2">
				<image class="top-item-headimg" :src="img(ranklist[2].headimg||'/addon/huodong/avatar.png')"
									style="width: 100rpx;height: 100rpx;margin-top: 40rpx;"></image>
				<text class="top-item-name">{{ranklist[2].member_id_name}}</text>

				<text style="color: #fff;">
					获得<text class="top-item-score" style="color: #dcdcdc;margin: 0 5rpx;">{{ranklist[2].num}}</text>积分
				</text>

				<image :src="img('addon/huodong/img/guan (3).png')"
					style="width: 90rpx;right: 0;top: 15rpx;right: 23rpx; height: 90rpx;position: absolute;"
					class="guan" mode="widthFix"></image>
			</view>
		</view>
		<view class="ranking" v-if="ranklist.length>3">
			<view v-for="(item, index) in ranklist" :key="index">
				<view class="ranking-list-item"  v-if="index>2">
					<text class="ranking-list-number">{{index + 1}}</text>
					<view class="ranking-list-nickname line1" style="flex:1;width:350rpx">
						<image :src="item.headimg||img('/addon/huodong/avatar.png')" style="width:85rpx;height:85rpx"></image>
						<view style="width:250rpx;margin-left:0;flex:1;text-align: left;" class="line1">{{item.member_id_name}}</view>
					</view>
					<text style="text-align: right;">获得<text class="ranking-list-score"
							style=";margin-left: 5rpx;">{{item.num}}</text>积分</text>
				</view>
			</view>
		</view>
		<up-empty v-if="loadend&&ranklist.length==0"></up-empty>
	</view>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { getrankone } from '@/addon/huodong/api/act';
	import { redirect, img } from '@/utils/common';
	import { onLoad } from '@dcloudio/uni-app'
	import { useShare } from '@/hooks/useShare'
		const { setShare, onShareAppMessage, onShareTimeline } = useShare()
		setShare()
		onShareAppMessage()
		onShareTimeline()
	


	const ranklist = ref([]);
	const loadend = ref(false);
	const current = ref(3);
	const id = ref('')
	onLoad((query : any) => {
			console.log(query, query.id, 'query');
			id.value = query.id || '';
			getdata();
		})
	// 获取数据的异步函数
	const getdata = async () => {
		await getrankone({ type: current.value + 1,id:id.value }).then((res) => {

			ranklist.value = res.data;
			loadend.value = true;
			// console.log(ranklist.value)
		});


	};

	// tab切换时的处理函数
	const tabChange = (e : number) => {
		current.value = e;
		getdata();
	};

	// tab点击时的处理函数（原代码部分逻辑不太明确，这里保留基本结构等待完善）
	const tabClick = (status : any) => {
		// 原代码中this.where.status不太明确其来源，这里假设你后续会补充完整相关逻辑
		// this.where.status = status;
		// this.reload(true);
	};

	getdata();
</script>

<style lang="scss">
	page {
		background: #2886ff;
	}

	.page {
		padding-bottom: 20rpx;

		.tab {
			display: flex;
			justify-content: center;
			padding: 25rpx;
			margin-bottom: 25rpx;
			color: #fff;

			view {
				height: 70rpx;
				width: 220rpx;
				line-height: 70rpx;
				box-sizing: border-box;
				border: 1px solid #fff;
				font-size: 16px;
				text-align: center;
				font-weight: bold;

				&:active {
					background: #fff;
					color: #2886ff;
				}

				&:nth-child(1) {
					border-radius: 35rpx 0 0 35rpx;
				}

				&:nth-child(2) {
					border-radius: 0 0 0 0;
				}

				&:nth-child(3) {
					border-radius: 0 35rpx 35rpx 0;
				}
			}

			.tab-active {
				background: #fff;
				color: #2886ff;
			}
		}

		.top {
			width: 660rpx;
			margin: auto;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;

			.top-item {
				width: 200rpx;
				height: 300rpx;
				display: flex;
				flex-direction: column;
				position: relative;
				align-items: center;
				border-radius: 100rpx 100rpx 0 0;
				color: #fff;


				&:nth-child(1) {
					.top-item-headimg {
						border: 8rpx solid #c7c7c7;
					}
				}

				&:nth-child(2) {
					height: 320rpx;

					.top-item-headimg {
						border: 8rpx solid #ffff00;
					}
				}

				&:nth-child(3) {
					.top-item-headimg {
						border: 8rpx solid #aa5500;
					}
				}

				.top-item-king {
					width: 45rpx;
					height: 45rpx;
				}

				.top-item-headimg {
					border-radius: 50%;
					width: 140rpx;
					height: 140rpx;
				}

				.top-item-name {
					margin: 10rpx 0;
					font-weight: bold;width:150rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;text-align:center;
				}

				.top-item-score {
					font-size: 18px;
					color: #ffff00;
					font-weight: bold;
				}
			}
		}

		.ranking {
			width: 700rpx;
			border-radius: 30rpx;
			margin: auto;
			background: #fff;
			box-sizing: border-box;
			padding: 20rpx 40rpx 20rpx 0;
			margin-top: 10rpx;

			.ranking-list-item {
				height: 110rpx;
				display: flex;
				align-items: center;
				font-size: 14px;

				.ranking-list-number {
					display: block;
					width: 70rpx;
					color: #777;
					text-align: center;
				}

				.ranking-list-score {
					width: 170rpx;
					color: #2886ff;
					font-size: 16px;
					text-align: right;
				}

				.ranking-list-nickname {
					display: flex;
					align-items: center;
					// width: calc(100% - 200rpx);
					width:250rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;text-align:center;margin-right:35rpx;

					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}

					text {
						width: auto;
					}
				}
			}
		}
	}
</style>