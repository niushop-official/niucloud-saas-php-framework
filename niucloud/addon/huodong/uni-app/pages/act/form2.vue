<template>
	<view class="u-skeleton">
		<view v-if="info" :class="['bg-white flex align-center p-[10px]']  " @click="toLink(info.id)">
			<u--image width="220rpx" height="220rpx" class="mr-[10px]" v-if="info.image" :src="img(info.image)"
				model="aspectFill" :border-radius="20">
			</u--image>
			<view class="flex-1 flex flex-col justify-between  ">
				<view class="text-[16px] leading-[1.3] multi-hidden mt-[2px]" style="font-weight: bold;">{{info.name}}
				</view>
				<view class="text-[14px]  mb-[10px] mt-[10px] text-gray-500 ">
					<!-- <text class="catename">{{item.cate_id_name}}</text> -->
					<text
						style="background:#ff9900;color:#fff;font-size:10px;padding:8rpx 10rpx;border-radius: 5rpx;">{{info.cate_id_name}}</text>

				</view>
				<view class="text-[12px]  flex justify-between mb-[5px]">
					<text>活动地址: {{info.address}}</text>
				</view>
				<view class="text-[12px]  flex justify-between mb-[5px]">
					<text>活动开始时间: {{info.startime}}</text>
				</view>
				<view class="text-[12px]  flex justify-between mb-[5px]">
					<text>活动结束时间: {{info.endtime}}</text>
				</view>
			</view>
		</view>
		<view class="list" style="margin-top:30rpx">
			<!-- <view class="item flex">
				<view class="left">姓名：</view>
				<input class="right" style="flex: 1;" type="text" v-model="form.realname" placeholder="请输入姓名">
			</view>
			<view class="item flex">
				<view class="left">联系电话：</view>
				<input class="right" style="flex: 1;" type="text" v-model="form.mobile" placeholder="请输入联系电话">
			</view> -->
			<!-- <view class="item flex">
				<view class="left">分享平台：</view>
				
				<picker :range="pickerColumns" @change="handlePickerConfirm"  style="flex: 1; height: 60rpx; line-height: 60rpx;">
					<view class="right" @click="pickerShow=true" style="flex: 1; height: 60rpx; line-height: 60rpx;">
						{{form.jietu_pingtai || '请选择分享平台'}}
					</view>
				</picker>
			</view> -->
			<view class="item flex">
				<view class="left">抖音链接：</view>
				<input class="right" style="flex: 1;" type="text" v-model="form.douyin_url" placeholder="请输入抖音链接">
			</view>
			<view class="item flex">
				<view class="left">快手链接：</view>
				<input class="right" style="flex: 1;" type="text" v-model="form.kuaishou_url" placeholder="请输入快手链接">
			</view>
			<view class="item flex">
				<view class="left">小红书链接：</view>
				<input class="right" style="flex: 1;" type="text" v-model="form.xiaohongshu_url" placeholder="请输入小红书链接">
			</view>
			<view class="item flex">
				<view class="left" style="flex: 0.4;">视频号链接：</view>
				<input class="right" style="flex: 1;" type="text" v-model="form.shipinhao_url" placeholder="请输入微信视频号链接">
			</view>
			<view class="item flex">
				<view class="left">图片：</view>
				<view style="flex:1;">
					<up-upload :fileList="fileList1" @afterRead="afterRead" @error="uploaderror" @delete="deletePic" width="80" name="1"  :maxCount="1"></up-upload>
				</view>
			</view>
		</view>
		<view class="bg-white u-padding-30" style="margin-top:30rpx">
			<view class="flex"><up-icon name="info-circle"></up-icon>
				<text style="margin-left: 10rpx;font-weight: bold;">注意事项</text>
			</view>
			<view>
				<view>报名信息需真实准确。</view>
				<view>活动名额有限，先报先得。</view>
				<view>报名成功后会收到请及时参与核销。</view>
			</view>
		</view>
		<view class="bg-white footbox flex">
			<view v-if="info.price>0&&info.is_pay==1" style="margin-right: 20rpx;padding-top:15rpx;color: red;">
				￥<text style="font-size:18px">{{info.price}}</text>
			</view>
			<u-button type="primary" @click="submit">立即提交</u-button>
		</view>
		<pay ref="payRef" @close="payClose" />
	</view>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import { redirect, img } from '@/utils/common';
	import { getPayInfo } from '@/app/api/pay'
	import { getDetail } from '@/addon/huodong/api/act'
	import { SubmitOrder } from '@/addon/huodong/api/order'
	import {
		uploadImage
	} from '@/app/api/system'
	const payInfo = ref<any>({
		trade_type: '',
		trade_id: ''
	})
	const payRef = ref()
	const info = ref('')
	const form = ref({
		realname: '',
		mobile: '',
		sfz: '',
		act_id: '',
		douyin_url: '',
		kuaishou_url: '',
		xiaohongshu_url: '',
		shipinhao_url: '',
		jietu_image: '',

	})
	const pickerShow = ref(false);
	const pickerColumns = ref(['抖音', '快手', '小红书', '微信视频号']);


	onLoad((query : any) => {
		form.value.act_id = query.id || 1;
		getinfo();
	})

	const getinfo = () => {
		getDetail({ id: form.value.act_id }).then((res : any) => {
			info.value = res.data
		}).catch(() => {
		})
	}
	const submit = () => {
		console.log(form.value)
		// if (!form.value.realname) {
		// 	uni.showToast({ title: '请填写姓名', 'icon': 'none' }); return;
		// }
		// if (!form.value.mobile) {
		// 	uni.showToast({ title: '请填写电话', 'icon': 'none' }); return;
		// }
		if (!form.value.douyin_url) {
			uni.showToast({ title: '请选择抖音链接', 'icon': 'none' }); return;
		}
		if (!form.value.kuaishou_url) {
			uni.showToast({ title: '请选择快手链接', 'icon': 'none' }); return;
		}
		if (!form.value.xiaohongshu_url) {
			uni.showToast({ title: '请选择小红书链接', 'icon': 'none' }); return;
		}
		if (!form.value.shipinhao_url) {
			uni.showToast({ title: '请选择视频号链接', 'icon': 'none' }); return;
		}
		
		if (fileList1.value.length==0) {
			uni.showToast({ title: '请上传图片', 'icon': 'none' }); return;
		}
		var jietu_image = [];
		for (var i = 0; i < fileList1.value.length; i++) {
			jietu_image.push(fileList1.value[i].url);
		}
		form.value.jietu_image = jietu_image.join(',');
		
		SubmitOrder({
			act_id: form.value.act_id,
			realname: form.value.realname,
			mobile: form.value.mobile,
			pid: uni.getStorageSync('pid'),

			douyin_url: form.value.douyin_url,
			kuaishou_url: form.value.kuaishou_url,
			shipinhao_url: form.value.shipinhao_url,
			xiaohongshu_url: form.value.xiaohongshu_url,
			jietu_image: form.value.jietu_image,
		}).then((res : any) => {
			if (res.data.trade_id == -100) {
				uni.showToast({ title: '报名成功' });
				setTimeout(function () {
					uni.redirectTo({
						url: '/addon/huodong/pages/order/list'
					})
				}, 1500);
				return;
			}
			payRef.value?.open(res.data.trade_type, res.data.trade_id, '/addon/huodong/pages/order/list')
		}).catch(() => {
		})
	}
	
	const handlePickerConfirm = (e: any) => {
		console.log(e)
	    form.value.jietu_pingtai = pickerColumns.value[e.detail.value];
	    pickerShow.value = false;
	};
	
	const handlePickerCancel = () => {
	    pickerShow.value = false;
	};
	
	// 删除图片
	const fileList1 = ref([])
	const clear = () => {
		fileList1.value = [];
	};
	const deletePic = (event) => {
		fileList1.value.splice(event.index, 1);
	};
	const uploaderror = (event) => {
		console.log(event);
		if (event.errno == 112) {
			uni.showModal({
				title: '权限不足',
				content: '请在用户隐私保护指引里面声明【收集你选中的照片或视频信息】'
			})
		} else {
			uni.showModal({
				title: '上传失败',
				content: event.errMsg,
				showCancel: false
			})
		}
	
	};
	
	// 新增图片
	const afterRead = async (event) => {
		uni.showLoading({
			title: '上传中'
		})
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		let lists = [].concat(event.file);
		let fileListLen = 0;//fileList1.value.length;
		lists.map((item) => {
			fileList1.value.push({
				...item,
				status: 'uploading',
				message: '上传中',
			});
		});
		for (let i = 0; i < lists.length; i++) {
			console.log('urlurl', lists[i].url);
			const result = await uploadFilePromise(lists[i].url);
			console.log('result', result);
			let item = fileList1.value[fileListLen];
			
			fileList1.value = [];
			fileList1.value.splice(fileListLen, 1, {
				...item,
				status: 'success',
				message: '',
				url: result,
			});
			fileListLen++;
		}
	};
	
	const uploadFilePromise = (url) => {
	
		return new Promise((resolve, reject) => {
			console.log(url)
			uploadImage({
				filePath: url,
				name: 'file'
			}).then(res => {
				uni.hideLoading()
				resolve(res.data.url);
			}).catch(() => { })
	
		});
	};
</script>

<style>
	page {
		background: #f5f5f5;font-size: 14px;
	}
@import '@/addon/huodong/static/css/base.css';
	.list {
		width: 100%;
		background: #fff;
	}

	.list .item {
		margin: 0 3%;
		border-bottom: 1px solid #eee;

		padding: 20rpx 0;
	}

	.list .item .left {
		flex: 0.4;
		font-weight: 600;
	}

	.list .item .right {
		height: 60rpx;
		padding: 0 0;

	}

	.footbox {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 94%;
		background-color: #ffffff;
		padding: 10rpx 3%;
		border-top: 1px solid #f4f6f8;
		z-index: 100;
	}
</style>