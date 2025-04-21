<template>
	<view class="bg-gray-100 min-h-[100vh]" :style="themeColor()">
		<view class=" top-0 inset-x-0 z-10" style="background: #fff;">
			<view
				class='p-[10px] bg-white border-solid border-t-0 border-l-0 border-r-0 border-b-[1px] border-gray-200'>
				<u-search placeholder="请输入搜索活动关键词" actionText :actionStyle="{'width':0,'margin':0}" v-model="where.name"
					@clickIcon="searchFn" @search="searchFn"></u-search>
			</view>

			<view style="margin: 20rpx 20rpx;" v-if="banner.length>0">
				<up-swiper :list="banner" keyName="image" radius="6" height="364rpx" circular imgMode="aspectFill"
					@click="clickbanner"></up-swiper>
			</view>
			<up-notice-bar :text="newsbao" v-if="newsbao&&newsbao.length>0" direction="column"
				style="margin-bottom:10rpx;"></up-notice-bar>
			<scroll-view :scroll-x="true" :enable-flex="true" v-if="categoryList.length>0"
				class="nav-list bg-white align-center px-[10px] box-border">
				<view class="flex scroll-view-wrap">
					<view
						:class="['nav-item text-[16px] mx-[5px] h-[30px] leading-[30px] my-[5px] border-t-0 border-l-0 border-r-0',{'border-solid border-b-[2px] active': where.cate_id==item.id}]"
						style="margin-right: 40rpx;" @click="loadCategory(item.id)" v-for="(item,index) in categoryList"
						:key="item.id">
						{{item.name}}
					</view>
				</view>
			</scroll-view>

		</view>

		<view>
			<view v-if="config.list_type==1">
				<view v-for="(item,index) in newsList" :key="item.id" style="position: relative;"
					:class="['bg-white flex align-center p-[10px]',{'border-solid border-t-0 border-l-0 border-r-0 border-b-[1px] border-gray-200': newsList.length-1 !== index}] "
					@click="toLink(item.id)">
					<u--image width="274rpx" height="214rpx" :src="img(item.image)" v-if="item.image" model="aspectFill" radius="5">
						<template #error>
							<u-icon name="photo" color="#999" size="50"></u-icon>
						</template>
					</u--image>
					<view style="position: absolute;right:15rpx;top:185rpx;z-index: 2;">
						<up-tag :text="item.optext" v-if="item.opstatus<0" mode="dark" bg-color="#aaa"
							border-color="#aaa" size="mini" />
						<up-tag :text="item.optext" v-else mode="dark" bg-color="#00aa00" border-color="#00aa00"
							size="mini" />
					</view>
					<view class="flex-1 flex flex-col justify-between ml-[10px]">
						<view class="text-[16px] leading-[1.3] multi-hidden mt-[2px]">
							<text
								style="background:#ff9900;color:#fff;font-size:10px;padding:8rpx 10rpx;border-radius: 5rpx;margin-right:5rpx">{{item.cate_id_name}}</text>
							<text style="font-weight: bold;">{{item.name}}</text>
						</view>
						<view class="text-[14px]  mt-[5px] text-gray-500 ">
							<!-- <text class="catename">{{item.cate_id_name}}</text> -->
						</view>
						<view class="text-[12px]  flex justify-between mb-[5px]" style="color:#777">
							<text>人数限制:
								<text v-if="item.num">{{item.num+'人'}}</text>
								<text v-else>不限名额</text></text>
						</view>
						<view class="text-[12px]  flex justify-between mb-[5px]" style="color:#777;">
							活动地址: {{item.address}}
						</view>
						<view class="text-[12px]  flex justify-between mb-[5px]" style="color:#777">
							<text>活动开始时间: {{item.startime2}}</text>
						</view>
						<view class="text-[12px]  flex justify-between mb-[5px]" style="color:#777">
							<text>活动结束时间: {{item.endtime2}}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="config.list_type==2">
				<view v-for="(item,index) in newsList" :key="item.id" style="position: relative;"
					:class="['bg-white  align-center p-[10px]',{'border-solid border-t-0 border-l-0 border-r-0 border-b-[1px] border-gray-200': newsList.length-1 !== index}] "
					@click="toLink(item.id)">
					<u--image width="710rpx" height="364rpx" v-if="item.image" :src="img(item.image)" model="widthFix" radius="5">
						<template #error>
							<u-icon name="photo" color="#999" size="50"></u-icon>
						</template>
					</u--image>
					<view style="position: absolute;right:18rpx;top:12rpx;z-index: 2;">
						<up-tag :text="item.optext" v-if="item.opstatus<0" mode="dark" bg-color="#aaa"
							border-color="#aaa" size="mini" />
						<up-tag :text="item.optext" v-else mode="dark" bg-color="#00aa00" border-color="#00aa00"
							size="mini" />
					</view>
					<view class="flex-1 mt-[10px]">
						<view class="text-[16px] leading-[1.3] multi-hidden mt-[2px]">
							<text
								style="background:#ff9900;color:#fff;font-size:10px;padding:8rpx 10rpx;border-radius: 5rpx;margin-right:5rpx;">{{item.cate_id_name}}</text>
							<text style="font-weight: bold;font-size:16px">{{item.name}}</text>
						</view>
						<view class="text-[14px]  mt-[10rpx] text-gray-500 ">
							<!-- <text class="catename">{{item.cate_id_name}}</text> -->
						</view>
						<view class="text-[14px]  flex justify-between mb-[10rpx]" style="color:#777">
							<text>人数:
								<text style="margin-right:5rpx;color:#1677ff">{{item.sales||0}}</text>/
								<text v-if="item.num">{{item.num+'人'}}</text>
								<text v-else>不限</text></text>
						</view>
						<view class="text-[14px]  flex justify-between mb-[10rpx]" style="color:#777;line-height:38rpx">
							<text>地址: {{item.address}}</text>
						</view>
						<view class="text-[14px]  flex justify-between mb-[10rpx]" style="color:#777">
							<text>时间: {{item.startime2}} 至 {{item.endtime2}}</text>
						</view>
					</view>
				</view>
			</view>
			<u-empty v-if="newsList.length==0&&loadend" text="暂无相关活动" style="padding-top: 100rpx;"></u-empty>
		</view>
		<!--<up-tabbar :value="0" :fixed="true" :placeholder="false" :safeAreaInsetBottom="false">
			<up-tabbar-item text="活动首页" icon="home"></up-tabbar-item>
			<up-tabbar-item text="我的报名" icon="order" @click="tolog"></up-tabbar-item>
		</up-tabbar> -->
		<tabbar />
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref, onMounted } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { t } from '@/locale'
	import { redirect, img } from '@/utils/common';
	import { getActList, getActCategory, getBanner, getnewsbao } from '@/addon/huodong/api/act'
	import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue'
	import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue'
	import useMescroll from '@/components/mescroll/hooks/useMescroll.js'
	import { lookimg, tourl } from '@/addon/huodong/utils/common';
	import { onPageScroll, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
	import { useShare } from '@/hooks/useShare'

	// const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);
	const { setShare, onShareAppMessage, onShareTimeline } = useShare()
	setShare()
	onShareAppMessage()
	onShareTimeline()
	
	

	let categoryList = ref<Array<Object>>([]);
	let newsList = ref<Array<any>>([]);
	let currCategoryId = ref<number | string>('');
	let actTitle = ref<string>('');
	// let mescrollRef = ref(null);
	// let loading = ref<boolean>(false);
	var where = ref({
		page: 1,
		limit: 20,
		name: '',
		cate_id: '',
	})
	var loadend = ref(false);
	var loading = ref(false);
	var loadTitle = ref('');
	var isPage = false;

	onLoad(async () => {
		await getActCategory().then((res) => {
			const initData = { name: t("all"), id: '' };
			categoryList.value.push(initData);
			categoryList.value = categoryList.value.concat(res.data);
		});
		reload(true)
	})
	const newsbao = ref([]);
	getnewsbao().then((res) => {
		newsbao.value = res.data;
	});
	var config = ref([])
	config.value.list_type = 2;
 

	const getlist = async (isPage : boolean) => {
		if (loadend.value) return;
		if (loading.value) return;

		loading.value = true;
		loadTitle.value = '';

		getActList(where.value).then((res) => {
			console.log(res.data)
			if (isPage === true) newsList.value = [];
			const list = res.data.data;
			const lists = SplitArray(list, newsList.value);
			const loadend2 = list.length < where.value.limit;
			newsList.value = lists;
			// total.value = res.data.data.total;
			console.log(loadend2)
			loadend.value = loadend2;
			loading.value = false;
			console.log(where.value.page)
			where.value.page = where.value.page + 1;
		})




		// let data : object = {
		// 	cate_id: currCategoryId.value,
		// 	name: actTitle.value,
		// 	page: mescroll.num,
		// 	limit: mescroll.size
		// };


	};

	// 重新加载数据的函数
	const reload = async (isPage : boolean) => {
		if (isPage === true) {
			loadend.value = false;
			where.value.page = 1;
		}
		await getlist(isPage);
	};

	const SplitArray = (list, sp) => {
		if (typeof list != 'object') return [];
		if (sp === undefined) sp = [];
		for (var i = 0; i < list.length; i++) {
			sp.push(list[i]);
		}
		return sp;
	}
	const loadCategory = (id : string) => {
		where.value.cate_id = id;
		reload(true);
	}

	const searchFn = () => {
		reload(true);
	}
	onPullDownRefresh(() => {
		reload(true);
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 200);
	})

	onReachBottom(() => {
		reload();
	})


	const toLink = (id : string) => {
		redirect({ url: '/addon/huodong/pages/act/detail', param: { id } })
	}
	const tolog = () => {
		redirect({ url: '/addon/huodong/pages/order/list' });
	}


	let banner = ref<Array<Object>>([]);
	getBanner().then((res : any) => {
		for (var i = 0; i < res.data.length; i += 1) {
			res.data[i].image = img(res.data[i].image);
		}
		console.log(res.data);
		banner.value = res.data
	})
	const clickbanner = (e) => {
		console.log(e);
		if (!banner.value[e].url) return;
		tourl(banner.value[e].url)
	};
</script>

<style lang="scss" scoped>
	@import '@/addon/huodong/static/css/base.css';
	.nav-item.active {
		color: $u-primary;
	}

	.scroll-view-wrap {
		word-break: keep-all;
	}

	.catename {
		// border:1px solid #0269ff;
		background: #33a7ff;
		border-radius: 5rpx;
		color: #fff;
		padding: 5rpx 10rpx;
		font-size: 12px;
	}
</style>