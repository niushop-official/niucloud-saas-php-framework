<template>
	<view class="">

		<view class="" style="position: relative;z-index: 2;border-radius: 16rpx 16rpx 0 0;background:#fff;">
			<up-search bgColor="#f5f5f5" v-model="where.keyword" placeholder="输入关键词搜索" :showAction="false" @search="reload(true)" style="padding:20rpx 30rpx;"></up-search>
			<view style="background-color: #fff;">
				<up-sticky :offsetTop="0">
					<view class="u-flex sortbox"
						style="justify-content: space-around;padding:0 0;font-size: 16px;top:0">
						<view class="item " :class="where.level==1?'on':''" @click="changesort(1)">直接邀请</view>
						<view class="item" :class="where.level==2?'on':''" @click="changesort(2)">间接邀请</view>
					</view>
				</up-sticky>
			</view>

			<view class="listbox">
				<view class=" item yuanbox" v-for="(item) in newsList">
					<view class="flexb">
						<view class="flex">
							 <image :src="item.headimg||img('/addon/huodong/avatar.png')" style="width:85rpx;height:85rpx;border-radius:50%;margin-right:20rpx;wdith:100rpx"></image>
						 
							<view style="flex:1">
								<view style="font-weight:bold;">{{item.nickname}}</view>
								<view class="desc">手机号码: {{item.mobile||'未完善'}}</view>
								<view class="desc">邀请时间: {{item.adddate}}</view>
							</view>
						</view>
					</view>
				</view>
				<u-empty v-if="newsList.length==0&&loadend" text="暂无相关推荐人" style="padding: 300rpx 0;"></u-empty>
			</view>
		</view>


	</view>
</template>


<script setup lang="ts"> 
	import { reactive, ref, onMounted } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { t } from '@/locale'
	import { redirect, img } from '@/utils/common';
	import { getteamList,getmyfxuser } from '@/addon/huodong/api/fenxiao'; 

	import { lookimg, tourl } from '@/addon/huodong/utils/common';

	import { onPageScroll, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'

 
	let newsList = ref<Array<any>>([]); 
	var sort = ref(1);
	var where = ref({
		page: 1,
		limit: 20,
		name: '',
		level: 1,
	})
	var loadend = ref(false);
	var loading = ref(false);
	var loadTitle = ref('');
	var isPage = false;

	onLoad(async () => {
		 
		reload(true)
		getinfo()
	})
	
	const form = ref({})
	const getinfo = () => {
		getmyfxuser({}).then((res : any) => {
			if(res.data){
				form.value = res.data
				if(form.value.status!=2){
					uni.reLaunch({
						url:'./apply'
					})
				}
			}
			
		}).catch(() => {
		})
	}
	  
	const getlist = async (isPage : boolean) => {
		if (loadend.value) return;
		if (loading.value) return;

		loading.value = true;
		loadTitle.value = '';

		getteamList(where.value).then((res) => {
			console.log(res.data)
			if (isPage === true) newsList.value = [];
			const list = res.data.data;
			const lists = SplitArray(list, newsList.value);
			const loadend2 = list.length < where.value.limit;
			newsList.value = lists;
			console.log(loadend2)
			loadend.value = loadend2;
			loading.value = false;
			console.log(where.value.page)
			where.value.page = where.value.page + 1;
		})
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
	const changesort = (id : string) => {
		where.value.level = id;
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
</script>

<style scoped>
	@import '@/addon/huodong/static/css/base.css';

	page {
		background: #f5f5f5;
	}

	.body {
		padding: 25rpx 3%;
	}
	.listbox {
		padding: 20rpx;
	}
	.sortbox .item.on{
		color:red;
	}
</style>