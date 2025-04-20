<template>
	<view class="u-skeleton">
		<!-- <image :src="img('/addon/huodong/img/fenxiao_rukou.png')" mode="widthFix" style="width: 100%;"></image>-->
		<view style="background-color: #007aff;height:200rpx;width:100%;color:#fff;text-align: center;padding-top: 65rpx;font-weight: bold;font-size: 22px;">成为推广员</view> 
		<view class="list" style="margin:-80rpx 0;border-radius: 50rpx 50rpx 0 0;padding:30rpx;width:auto;min-height:500rpx">
			<view v-if="form.status==1" class="flexmc" style="margin:250rpx 0">
				<u-icon name="info-circle" color="#eb6c12" :size="45"></u-icon>
				<view style="margin-top:50rpx">申请已提交</view>
				<view style="margin-top:20rpx">审核中, 请耐心等待~</view>
			</view>
			<view v-if="!form.id||form.status==0||form.status==-1">
				
				<view class="item flex" v-if="form.fail_msg">
					<view class="left">审核失败：</view>
					<view style="flex: 1;">
						<text style="color: red;">{{form.fail_msg}}</text>
					</view>
				</view>
				
				<view class="item flex">
					<view class="left">类型：</view>
					<view>
						<radio-group @change="typeChange">
							<span><radio :value="1" key="1" :checked="form.type==1" />企业</span>
							<span style="margin-left:30rpx"><radio :value="2" key="1" :checked="form.type==2"/>个人</span>
						</radio-group>
					</view>
				
				</view>
				<view class="item flex" >
					<view class="left">{{form.type==2?'姓名':'企业名称'}}</view>
					<input class="right" style="flex: 1;" type="text" v-model="form.name" :placeholder="'请输入'+(form.type==2?'姓名':'企业名称')">
				</view>
				<view class="item flex">
					<view class="left">联系电话：</view>
					<input class="right" style="flex: 1;" type="text" v-model="form.mobile" placeholder="请输入联系电话">
				</view>
				
				<!-- <view class="item flex" v-if="form.type==2">
					<view class="left">身份证号码：</view>
					<input class="right" style="flex: 1;" type="text" v-model="form.mobile" placeholder="请输入身份证号码">
				</view> -->
				<!-- <view class="item flex" v-if="form.type==2">
					<view class="left">身份证正面：</view>
					<view style="flex:1">
						<up-upload :fileList="fileList1" @afterRead="afterRead" @error="uploaderror" @delete="deletePic" width="80" name="1"  :maxCount="1"></up-upload>
					</view>
				</view>
				<view class="item flex" v-if="form.type==2">
					<view class="left">身份证反面：</view>
					<view style="flex:1">
						<up-upload :fileList="fileList1" @afterRead="afterRead" @error="uploaderror" @delete="deletePic" width="80" name="1"  :maxCount="1"></up-upload>
					</view>
				</view>-->
				<view class="item flex" v-if="form.type==1">
					<view class="left">营业执照：</view>
					<view style="flex:1;">
						<up-upload :fileList="fileList1" @afterRead="afterRead" @error="uploaderror" @delete="deletePic" width="80" name="1"  :maxCount="1"></up-upload>
					</view>
				</view> 
			</view>
			<view v-if="!form.id||form.status==0||form.status==-1" class="bg-white  flex" style="padding: 150rpx 5%;color: red;">
				<u-button type="primary" @click="submit">立即提交</u-button>
			</view>
			
			
			<view v-if="form.status==2" class="flexmc" style="margin:250rpx 0">
				<u-icon name="checkmark-circle-fill" color="#1cd66c" :size="45"></u-icon>
				<view style="margin-top:50rpx">审核已通过</view>
				<!-- <view style="margin-top:20rpx">审核中, 请耐性等待~</view> -->
			</view>
			
		</view>

		
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref, onMounted } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { redirect, img } from '@/utils/common';
	import { getPayInfo } from '@/app/api/pay'
	import { getDetail } from '@/addon/huodong/api/act'
	
	import { getOrderList, getOrderStatus,closeOrder,hexiaoOrder } from '@/addon/huodong/api/order'
	import { getconfig } from '@/addon/huodong/api/index'
	import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
	import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
	import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
	import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'
	import { useShare } from '@/hooks/useShare'
	
	const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
	
	
	import { apply,getmyfxuser } from '@/addon/huodong/api/fenxiao'
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
		type: 1,
		mobile: '',
		idcard: '',
		name: '',
		sfz1:'',
		sfz2:'',
		ying_image:'',
		status:0
	})

	onLoad((query : any) => { 
		getinfo();
	})
	const getinfo = () => {
		getmyfxuser({}).then((res : any) => {
			if(res.data){
				form.value = res.data
				if(form.value.status==2){
					uni.redirectTo({
						url:'./index'
					})
				}
			}
			
		}).catch(() => {
		})
	}
	const typeChange=(e)=>{
		console.log(e)
		form.value.type=e.detail.value
	}
	
	
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
	

	const submit = () => {
		console.log(form.value)
		if (!form.value.name) {
			uni.showToast({ title: '请填写名称', 'icon': 'none' }); return;
		}
		if (!form.value.mobile) {
			uni.showToast({ title: '请填写电话', 'icon': 'none' }); return;
		}
		
		
		var ying_image = [];
		for (var i = 0; i < fileList1.value.length; i++) {
			ying_image.push(fileList1.value[i].url);
		}
		form.value.ying_image = ying_image.join(',');
		if (form.value.type==1&&!form.value.ying_image) {
			uni.showToast({ title: '请上传营业执照', 'icon': 'none' }); return;
		}
		
		
		apply({
			name: form.value.name,
			type: form.value.type,
			mobile: form.value.mobile,
			ying_image:form.value.ying_image
		}).then((res : any) => {
			uni.showToast({ title: '提交成功' });
			setTimeout(function () {
				getinfo()
			}, 1500);
		}).catch(() => {
		})
	}
	
	
	
	
	let statusList = ref<Array<Object>>([]);
	let OrderList = ref<Array<any>>([]);
	let currstatusId = ref<number | string>('');
	let OrderTitle = ref<string>('');
	let mescrollRef = ref(null);
	let loading = ref<boolean>(false);
	
	interface acceptingDataStructure {
		data : acceptingDataItemStructure,
		msg : string,
		code : number
	}
	interface acceptingDataItemStructure {
		data : object,
		[propName : string] : number | string | object
	}
	
	
	
	const config = ref('');
	// getconfig().then((res)=>{
	// 	config.value = res.data;
	// })
	
	
	interface mescrollStructure {
		num : number,
		size : number,
		endSuccess : Function,
		[propName : string] : any
	}
	const getOrderListFn = (mescroll : mescrollStructure) => {
		loading.value = false;
		let data : object = {
			order_status: currstatusId.value,
			is_admin:1,
			name: OrderTitle.value,
			page: mescroll.num,
			limit: mescroll.size
		};
		
	
		getOrderList(data).then((res : acceptingDataStructure) => {
			let newArr = (res.data.data as Array<Object>);
			//设置列表数据
			if (mescroll.num == 1) {
				OrderList.value = []; //如果是第一页需手动制空列表
			}
			OrderList.value = OrderList.value.concat(newArr);
			mescroll.endSuccess(newArr.length);
			loading.value = true;
		}).catch(() => {
			loading.value = true;
			mescroll.endErr(); // 请求失败, 结束加载
		})
	}
	
	const loadstatus = (id : string) => {
		currstatusId.value = id;
		getMescroll().resetUpScroll();
	}
	
	const searchFn = () => {
		getMescroll().resetUpScroll();
	}
	
	const toactdetail = (id : string) => {
		uni.navigateTo({
			url: '/addon/huodong/pages/act/detail?id=' + id
		})
	}
	const todetail = (id : string) => {
		uni.navigateTo({
			url: '/addon/huodong/pages/order/detail?id=' + id
		})
	}
	const tohome = () => {
		redirect({ url: '/addon/huodong/pages/index/index' });
	}
	onMounted(() => {
		setTimeout(() => {
			getMescroll().optUp.textNoMore = t("end");
		}, 500)
	});
	
	
</script>

<style>
	@import '@/addon/huodong/static/css/base.css';
	page {
		background: #f5f5f5;
	}

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