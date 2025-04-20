<template>
	<view>
		<view class="videomine" v-if="config&&config.open_fabu==1">
			<view class="content">
				<!-- <view class="item" style="border-bottom: 1px solid #999;">
					<view class="left">分类</view>
					<view class="right">
						<picker mode="selector" :range="catelist" :range-key="'name'" @change="changecate">
							<view style="width: 400rpx;">
								<text v-if="cate_index!=-1">{{catelist[cate_index].name}}</text>
								<text v-else style="color: #999;">请选择分类</text>
							</view>
						</picker>
					</view>
				</view> -->
				<view class="item">
					<view class="left">标题</view>
					<view class="right">
						<input type="text" v-model="videoinfo.name" placeholder="请填写标题" />
						<view style="color: red;">
							<!-- 商业广告类需要备注**市（区）或**镇并在首页注册资料，其它不限 -->
						</view>
					</view>
				</view>
				<view class="item ">
					<view class="left">内容描述</view>
					<view class="right">
						<input type="text" v-model="videoinfo.desc" placeholder="请填写内容描述" />
						<view style="color: red;">
							平台仅提供信息服务，禁止夸大/虚假宣传
							<!-- 上传后不可修改，如需修改联系客服留言备注ID或手机号 -->
						</view>
					</view>
				</view>

				<view class="item ">
					<text class="left">上传视频
					</text>
					<view class="right">
						<!-- <view class="videobox" v-if="videoinfo.url">
							<video :src="videoinfo.url" class="video"></video>
							<text class="close iconfont icon-guanbi" @click="delectVideo"></text>
						</view>
						<view class="novideoimg" v-else>
							<image @tap="chooseVideo" :src="img('addon/shortvideo/static/img/addvideo.png')" mode="">
							</image>
						</view> -->
						<u-upload :fileList="fileList1" accept="video" @afterRead="afterRead1" @delete="deletePic1"
							name="file" :maxCount="1"></u-upload>
					</view>
				</view>
				<view class="item ">
					<text class="left flex">
						<!-- <u-icon name="photo" color="#fff"></u-icon> -->
						上传封面图
						<!-- (非必传) -->
						<text style="color: #ff7070;margin-left: 10rpx;"> </text>
					</text>
					<view class="right">
						<!-- <view class="coverimg" v-if="videoinfo.cover">
							<image :src="videoinfo.cover" @tap="uploadpic" mode="widthFix"></image>
						</view>
						<view class="novideoimg" v-else>
							<image @tap="uploadpic" src="~@/static/img/video/addcover.png" mode=""></image>
						</view> -->
						<u-upload :fileList="fileList2" @afterRead="afterRead2" @delete="deletePic2" @error="uploaderror" name="file"
							:maxCount="1"></u-upload>
						<!-- <view class="upload-img">
							<view class="img-wrapper" v-if="videoinfo.cover" style="p">
								<image :src="videoinfo.cover" @click="uploadpic" ></image>
								<u-icon name="close" @click="deleteImg(videoinfo.cover='')" color="#fff"></u-icon>
							</view>
							<view class="novideoimg" v-else @click="uploadpic">
								<image :src="img('addon/shortvideo/static/img/addcover.png')"
									mode="widthFix">
								</image>
							</view>
						</view> -->
					</view>
				</view>

				<view class="item" v-if="config?.open_shop==1">
					<view class="left">关联商品</view>
					<view class="right flex">
						<view @click="tourl('/addon/shortvideo/pages/goodslist',0,0)" style="flex:1;width:520rpx"
							class="line2">
							
							<view class="goodsbox flex" v-if="goods?.goods_id">
								<image :src="img(goods.goods_cover||goods.goods_image)"></image>
								<view class="right" style="flex:1;">
									<view class="line2">{{goods.goods_name}}</view>
									<view class="flexb" style="display: flex;flex-direction: row;justify-content: space-between;margin-top: 10rpx;">
										<view style="color: #fb5c3a;font-size: 16px;font-weight: bold;">￥{{goods.goodsSku.sale_price}}</view>
									</view>
								</view>
							</view>
							<view v-else style="color:#999">请选择商品</view>
						</view>
						<u-icon  v-if="goods?.goods_id" @click="goods=''" name="close" color="#fff" size="20"></u-icon>
						<u-icon v-else name="arrow-right" size="20"></u-icon>
					</view>
				</view>
				 <view class="item ">
					<view class="left">参与话题</view>
					<view class="right flex">
						<view style="flex:1;width:620rpx">
							<text v-for="(item, index) in labellist" :key="index" @click="xuanlabel(index)"
								style="border-radius: 30px;font-size: 12px;padding:10rpx 15rpx;margin:0 15rpx 10rpx 0;border:1px solid #fff;display:inline-block;"
								:style="[`background-color:${item.check?'#fff':'#000'};color:${item.check?'#000':'#fff'}`]">
								<text class="tn-tag-content__item--prefix ">#</text> {{ item.name }}
							</text>
						</view>
					</view>
				</view> 


				<!-- 用户协议 -->
				<view class="xieyibox"
					style="display: flex;justify-content: flex-start;align-items: flex-start;width: 94%;margin-left: 3%;">
					<!-- <checkbox-group @change="tocheckBox">
						<checkbox value="1" :checked="tongyi"> </checkbox>
					</checkbox-group> -->
					<view style="margin:5rpx 10rpx 0 0"><u-icon name="checkmark-circle-fill" v-if="tongyi"
							@click="tongyi=!tongyi" color="#f00" size="20"></u-icon>
						<u-icon name="checkmark-circle" v-else @click="tongyi=!tongyi" color="#fff"
							size="20"></u-icon></view>
							
							
							
					<view> <text @click="tongyi=!tongyi">提交代表您同意</text> <text @click="showmianze=true"
							style="color: #ea3c3d;">《发布内容用户协议》</text></view>
				</view>

			</view>
			<view class="loadingbox" v-if="loading">
				<view class="loadingmsg  acea-row row-center-wrapper">
					<view class='loadingicon acea-row row-center-wrapper' style="color: #eee;">
						<text class='loading iconfont icon-jiazai' style="color: #eee;"></text>
					</view>
					<view>上传中...{{percent}}%</view>
				</view>
			</view>
			<view style="height:100rpx;width: 100%;"></view>
			<view class="submitbox" @click="submit()">
				提交
			</view>

			<!-- <view style="height: 140rpx;width: 100%;"></view>
			<view class="footnav" style="border-top: none;">
				<view @click="tourl('/addon/shortvideo/pages/index',1,0)" class="item">
					<image class="footimg" :src="img('addon/shortvideo/static/img/homehei.png')" mode=""></image>
					<view class="foottext">短视频</view>
				</view>
				<view class="item addbox active" v-show="config?.open_fabu==1" hover-class="none">
					<view class="addbox">
						<image class="addboximg" :src="img('addon/shortvideo/static/img/add.png')"></image>
					</view>
				</view>
				<view class="item " @click="tourl('/addon/shortvideo/pages/my',1,0)">
					<image class="footimg" :src="img('addon/shortvideo/static/img/mineno.png')" mode=""></image>
					<view class="foottext">我的</view>
				</view>
			</view> -->


			<u-popup class="haibaoModel" :show="showmianze" v-if="showmianze" mode="center" closeable
				@close="showmianze=false">
				<view style="padding:20rpx 3%;">
					<scroll-view class="haibaoModel-main" style="width: 630rpx;height: 1000rpx;" scroll-y="">
						<view class="p-[20rpx]" style="color:#000;">
							<u-parse :content="config.mianze"></u-parse>

						</view>
					</scroll-view>
					<view class="submitbox" @click="showmianze=false">
						我已知晓
					</view>
				</view>
			</u-popup>

		</view>
		<view v-if="config&&config.open_fabu==0" style="text-align: center;margin-top: 200rpx;color:#999">
			加载中...
		</view>
	</view>
</template>
<script setup lang="ts">
	import { reactive, ref, onMounted } from 'vue';
	import { onLoad, onShow } from '@dcloudio/uni-app';
	import { t } from '@/locale';
	import { redirect, img } from '@/utils/common';
	import { lookimg, tourl } from '@/addon/shortvideo/utils/common';
	import { useShare } from '@/hooks/useShare';
	import {
		uploadImage
	} from '@/app/api/system'
	import {
		getLabel
	} from '@/addon/shortvideo/api/index'
	import {
		uploadVideo, toaddvideo, getvideodetail, getConfigApi
	} from '@/addon/shortvideo/api/video'

	const imgValue = img;
	const tourlValue = tourl;

	const where = reactive({
		status: 1,
		page: 1,
		limit: 18,
		uid: ''
	});

	const imageList = reactive([]);
	const sourceTypeIndex = ref(2);
	const checkedValue = ref(true);
	const checkedIndex = ref(0);
	const sourceType = reactive(['拍摄', '相册', '拍摄或相册']);
	const cameraList = reactive([
		{ value: 'back', name: '后置摄像头', checked: 'true' },
		{ value: 'front', name: '前置摄像头' }
	]);
	const cameraIndex = ref(0);
	const VideoOfImagesShow = ref(true);
	const loading = ref(false);
	const videoinfo = ref({
		id: '',
		name: '',
		desc: '',
		url: '',
		cover: '',labelname:[],goods_ids:'',label_ids:''
	});
	const issubmit = ref(false);
	const percent = ref(0);
	const tongyi = ref(false);
	const cate_index = ref(-1);
	const catelist = reactive([]);

	function getcatelist() {
		request.post('video/getcatelist', {}, { noAuth: false, noLoad: true }).then((res) => {
			catelist.value = res.data;
			if (videoinfo.value.id) {
				getvideodetails();
			}
		});
	}
	const config = ref([]);
	const showmianze = ref(false)
	getConfigApi({}).then(res => {
		config.value = res.data;
		// uni.setNavigationBarTitle({
		// 	title: config.value.site_name
		// })
	})
	const goods = ref({ goods_id: '' });
	
	onShow(() => {
		goods.value = uni.getStorageSync('shortvideo_goods') || '';
		console.log(goods.value.goods_name)
		uni.removeStorageSync('shortvideo_goods');
	})
	

	function changecate(e : any) {
		cate_index.value = e.detail.value;
	}
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
	const uploadVideoPromise = (url) => {

		return new Promise((resolve, reject) => {
			console.log(url)
			uploadVideo({
				filePath: url,
				name: 'file'
			}).then(res => {
				uni.hideLoading()
				resolve(res.data.url);
			}).catch(() => { })

		});
	};
	function getvideodetails() {
		const that = this as any;
		getvideodetail({ id: videoinfo.value.id }).then((res) => {
			console.log(res);
			const data = res.data.list;
			videoinfo.value = data;
			for (let i = 0; i < catelist.length; i++) {
				if (catelist[i].id === data.cate_id) {
					cate_index.value = i;
					break;
				}
			}
		}).catch((err) => {
			uni.showToast({ title: err });
		});
	}

	function tocheckBox(e : any) {
		console.log(e)
		tongyi.value = e.detail.value[0] === 1 ? true : false;
		console.log(tongyi.value)
	}

	const labellist = ref([])
	getLabel().then((res : any) => {console.log(res.data)
		
			// var color = ["#ff0000", "#099e7e", "#6a85ff", "#008000", "#ffa500", "#c71585", "#800080",
			// 	"#a52a2a", "#9acd32", "#ff4500", "#ff0000", "#099e7e", "#6a85ff", "#008000", "#ffa500", "#c71585", "#800080",
			// 	"#a52a2a", "#9acd32", "#ff4500", "#ff0000", "#099e7e", "#6a85ff", "#008000", "#ffa500", "#c71585", "#800080",
			// 	"#a52a2a", "#9acd32", "#ff4500"
			// ];
			// var bgcolor = ["#ffe1de", "#e0ffff", "#edeeff", "#aae7b6", "#f5efe5", "#f7e2f7", "#ececfc",
			// 	"#fce4de", "#f4f8ec", "#ffeadf", "#edeeff", "#aae7b6", "#f5efe5", "#f7e2f7", "#ececfc",
			// 	"#fce4de", "#f4f8ec", "#ffeadf", "#edeeff", "#aae7b6", "#f5efe5", "#f7e2f7", "#ececfc",
			// 	"#fce4de", "#f4f8ec", "#ffeadf"
			// ];
			for (var i = 0; i < res.data.length; i++) {
				labellist.value.push({
					id: res.data[i].id,
					name: res.data[i].name,
					// color: color[i],
					// bgcolor: bgcolor[i]
					// check: info.value && info.value.labelname&& info.value.labelname.indexOf(res.data[i].name) > -1 ? true : false
				})
			}
			console.log(res.data)
			console.log(labellist.value)
		});

	const xuanlabel = (n) => {
		console.log('change', n);
		labellist.value[n].check = !labellist.value[n].check;
	};
	
	const fileList1 = ref([]);

	const deletePic1 = (event) => {
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
const fileList2 = ref([]);
	const afterRead1 = async (event) => {
		uni.showLoading({
			title: '上传中'
		})
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		let lists = [].concat(event.file);
		let fileListLen = fileList1.value.length;
		lists.map((item) => {
			fileList1.value.push({
				...item,
				status: 'uploading',
				message: '上传中',
			});
		});
		for (let i = 0; i < lists.length; i++) {
			console.log('urlurl', lists[i].url);
			const result = await uploadVideoPromise(lists[i].url);
			console.log('result', result);
			let item = fileList1.value[fileListLen];
			fileList1.value.splice(fileListLen, 1, {
				...item,
				status: 'success',
				message: '',
				url: result,
			});
			fileListLen++;
			if(config.value?.cover_houzhui){
				fileList2.value = [{url: result+config.value.cover_houzhui}]
				console.log( result+config.value.cover_houzhui)
			}
		}
	};




	

	const deletePic2 = (event) => {
		fileList2.value.splice(event.index, 1);
	};
	// 新增图片
	const afterRead2 = async (event) => {
		uni.showLoading({
			title: '上传中'
		})
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		let lists = [].concat(event.file);
		let fileListLen = 0;//fileList2.value.length;
		lists.map((item) => {
			fileList2.value.push({
				...item,
				status: 'uploading',
				message: '上传中',
			});
		});
		for (let i = 0; i < lists.length; i++) {
			console.log('urlurl', lists[i].url);
			const result = await uploadFilePromise(lists[i].url);
			console.log('result', result);
			let item = fileList2.value[fileListLen];
			fileList2.value.splice(fileListLen, 1, {
				...item,
				status: 'success',
				message: '',
				url: result,
			});
			fileListLen++;
			
			
		}
	};






	function submit() {
		const that = this as any;
		const videoinfoValue = videoinfo.value;
		const name = videoinfoValue.name;
		const desc = videoinfoValue.desc;
		const url = videoinfoValue.url;
		const cover = videoinfoValue.cover;
		if (!tongyi.value) {
			uni.showToast({ title: '请阅读并同意发布内容用户协议', icon: 'none' });
			return;
		}
		if (name === '') {
			uni.showToast({ title: '请填写标题', icon: 'none' });
			return;
		}
		if (desc === '') {
			uni.showToast({ title: '请填写描述内容', icon: 'none' });
			return;
		}
		/* if (cate_index.value === -1) {
			uni.showToast({ title: '请选择分类',icon:'none' });
			return;
		}
		const cate_id = catelist[cate_index.value].id;
		videoinfoValue.cate_id = cate_id; */

		var videos = [];
		for (var i = 0; i < fileList1.value.length; i++) {
			videos.push(fileList1.value[i].url);
		}
		if (!videos.length) {
			return uni.showToast({
				title: '请上传视频',
				icon: 'none'
			});
		}
		videoinfoValue.url = videos.join(',')


		var imgs = [];
		for (var i = 0; i < fileList2.value.length; i++) {
			imgs.push(fileList2.value[i].url);
		}
		if (!imgs.length) {
			return uni.showToast({
				title: '请上传图片',
				icon: 'none'
			});
		}
		videoinfoValue.cover = imgs.join(',')
		videoinfoValue.goods_ids = goods.value?.goods_id||'';

var label_ids = [];
		for (var i = 0; i < labellist.value.length; i++) {
			if (labellist.value[i].check) {
				label_ids.push(labellist.value[i].id);
			}
		}
		if (!label_ids.length) {
			return uni.showToast({
				title: '请选择话题',
				icon: 'none'
			});
		}
		console.log(label_ids)
		videoinfoValue.label_ids = label_ids.join(',');
		
		
		

		console.log(videoinfoValue);
		if (issubmit.value) {
			uni.showToast({ title: '请勿频繁提交', icon: 'none' });
			return;
		}
		
		console.log('videoinfoValue', videoinfoValue)
		issubmit.value = true;
		toaddvideo(videoinfoValue).then((res) => {
			issubmit.value = false;
			uni.showToast({ title: '提交成功' });
			setTimeout(() => {
				uni.redirectTo({ url: '/addon/shortvideo/pages/my' });
			}, 1500);
		});
	}

	// function chooseVideo() {
	// 	percent = 0;
	// 	uni.chooseVideo({
	// 		maxDuration: uni.getSystemInfoSync().platform === 'mp' ? 60 : 180,
	// 		count: 1,
	// 		compressed: true,
	// 		camera: cameraList[cameraIndex.value].value,
	// 		sourceType: ['album', 'camera'],
	// 		success: (responent) => {
	// 			const videoFile = responent.tempFilePath;
	// 			that.loading = true;
	// 			that.uploadFile(videoFile);
	// 		},
	// 		fail: (err) => {
	// 			console.log(err);
	// 		}
	// 	});
	// }

	// function uploadFile(videoFile : string) {
	// 	const that = this as any;
	// 	uploadFile(videoFile, 'video', (result) => {
	// 		uni.hideLoading();
	// 		that.loading = false;
	// 		console.log(result, '-result---');
	// 		videoinfo.value.url = result;
	// 	}, (res) => {
	// 		if (that.percent >= 100 && videoinfo.value.url) {
	// 			that.loading = false;
	// 		} else if (res.progress < 99) {
	// 			that.percent = res.progress;
	// 		}
	// 		console.log(that.percent);
	// 		console.log('上传进度:' + res.progress);
	// 		console.log('已经上传的数据长度' + res.totalBytesSent);
	// 		console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
	// 	});
	// }

	// function previewImage(e : any) {
	// 	const current = e.target.dataset.src;
	// 	uni.previewImage({
	// 		current,
	// 		urls: imageList
	// 	});
	// }


	// const uploadpic = (event) => {
	// 	uni.chooseImage({
	// 		count: 1,
	// 		sizeType: ['original', 'compressed'],
	// 		sourceType: ['album', 'camera'],
	// 		success: function (res) {
	// 			var tempFilePaths = res.tempFilePaths;
	// 			uploadFilePromise(tempFilePaths[0]).then((res) => {
	// 				console.log('result', res);
	// 				videoinfo.value.cover = img(res);
	// 			});
	// 		}

	// 	})
	// }

	// function delect(index : number) {
	// 	uni.showModal({
	// 		title: '提示',
	// 		content: '是否要删除该图片',
	// 		success: (res) => {
	// 			if (res.confirm) {
	// 				imageList.splice(index, 1);
	// 			}
	// 		}
	// 	});
	// }

	// function delectVideo() {
	// 	uni.showModal({
	// 		title: '提示',
	// 		content: '是否要删除此视频',
	// 		success: (res) => {
	// 			if (res.confirm) {
	// 				videoinfo.value.url = '';
	// 			}
	// 		}
	// 	});
	// }
</script>

<style>
	@import '@/addon/shortvideo/static/css/base.css';
	page {
		background-color: #000;
	}

	.loadingbox {
		width: 100%;
		height: 100%;
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
	}

	.loadingbox .loadingmsg {
		background-color: rgba(0, 0, 0, 0.4);
		padding: 40rpx 20rpx;
		margin-top: -50rpx;
	}

	.videomine {
		color: #fff;
		background-color: #000;
		padding-top: 50rpx;
		overflow-x: hidden;
	}


	.novideoimg {
		width: 140rpx;
		height: 140rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 30rpx;
		border: 1px solid #999;
		border-radius: 10rpx;
	}

	.novideoimg image {
		width: 70rpx;
		height: 70rpx
	}

	.videobox {
		margin: 40rpx;
		position: relative;
		width: 400rpx;
		height: 500rpx;
	}

	.coverimg image {
		width: 300rpx;
		margin: 20rpx 30rpx;
		height: 500rpx;
	}

	.videobox .close {
		position: absolute;
		top: -40rpx;
		right: -40rpx;
		font-size: 40rpx;

	}

	.video {
		width: 400rpx;
		height: 500rpx;
	}


	.content .item {
		width: 94%;
		margin-left: 3%;
		padding: 10rpx 0 40rpx;

	}

	.content .item .left {
		padding: 5rpx 0;
	}

	.content .item .right input {
		border-bottom: 1px solid #999;
		height: 80rpx;
		line-height: 80rpx;
		padding: 10rpx 0;
	}

	.submitbox {
		background-color: #d31711;
		margin: 30rpx 3%;
		line-height: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
		text-align: center;
		font-size: 16px;
	}
</style>

<style lang="scss">
	.upload-img {
		display: flex;
		flex-wrap: wrap;

		.img-wrapper {
			position: relative;
			display: flex;
			flex-wrap: wrap;
			margin: 30rpx 20rpx 20rpx 0;

			image {
				width: 158rpx;
				height: 158rpx;
			}

			.iconfont {
				position: absolute;
				right: -15rpx;
				top: -20rpx;
				font-size: 40rpx;
				color: red;
			}
		}

		.add-img {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 158rpx;
			height: 158rpx;
			background: #161923;
			border: 1px solid #999;
			border-radius: 10rpx;
			margin-top: 20rpx;
			margin-bottom: 20rpx;

			.iconfont {
				color: #B5B5B5;
				font-size: 55rpx;
			}
		}
	}
</style>

<style>
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
		flex-direction: row;
		background-color: rgba(0, 0, 0, 0.7);
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
		width: 80rpx;
		height: 80rpx;
		margin: 16rpx;
	}

	.footnav .item.active .iconfont {
		font-size: 22px;
		color: #e73d3d;
	}
	.goodsbox{
		display: flex;flex-direction: row;background: #fff;padding: 15rpx;border-radius: 10rpx;width: 580rpx;margin-top: 0;
	}
	.goodsbox image{
		width: 150rpx;height: 140rpx;margin-right: 15rpx;
	}
	.goodsbox{
		display: flex;flex-direction: row;
	}
	.goodsbox .buybtn{
		background: linear-gradient(to right, #ff8023 0, #ff4b50 100%) !important;color:#fff;padding: 5rpx 10rpx;border-radius: 5rpx;font-size: 12px;
		display: flex;;align-items: center;flex-direction: row;width: 150rpx;justify-content: center;
	}
	.goodsbox .right{
		color: #000;line-height: 36rpx;font-size: 14px;
	}
</style>