import { redirect, img } from '@/utils/common';

export const lookimg = (imgs, index) => {

	var urls = [];
	for (var i = 0; i < imgs.length; i++) {
		urls.push(img(imgs[i]))
	}
	console.log(urls)
	uni.previewImage({
		urls: urls,
		index: index || 0
	})
}
export const SplitArray = (list, sp) => {

	if (typeof list != 'object') return [];
	if (sp === undefined) sp = [];
	for (var i = 0; i < list.length; i++) {
		sp.push(list[i]);
	}
	return sp;
}

export const tourl = (url, type, login) => {

	if (login == 1) {

		var userinfo = uni.getStorageSync('userinfo');
		console.log(userinfo)
		if (!userinfo || !userinfo.id) {
			uni.showToast({
				title: '请登录',
				icon: 'none'
			});
			if (url) {
				uni.setStorageSync('backurl', url)
			}



			setTimeout(function () {
				uni.redirectTo({ //这是点击检查登录, 如果要保留上个页面
					url: '/app/pages/auth/login'
				})
			}, 1000);
			// #ifndef H5
			// #endif


			return;
		}
	}
	//console.log('url', url);
	if (
		url.indexOf('/pages/index/index') != -1 ||
		url.indexOf('/app/pages/member/index') != -1
	) {
		console.log('111');
		uni.switchTab({
			url: url
		})
		return false;
	}
	if (type == 1) {
		uni.redirectTo({
			url: url
		})
	} else if (type == 2) {
		uni.reLaunch({
			url: url
		})
	} else if (type == 3) {
		uni.switchTab({
			url: url
		})
	} else {
		uni.navigateTo({
			url: url
		})
		console.log(url);
	}


}
export const getpageParam = () => {

	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	let curRoute = routes[routes.length - 1].route //获取当前页面路由
	let curParam = routes[routes.length - 1].options; //获取路由参数
	// 拼接参数
	let param = '?'
	for (let key in curParam) {
		if (param) {
			param += '&' + key + '=' + curParam[key]
		} else {
			param += key + '=' + curParam[key]
		}

	}
	let data = {}
	data.curRoute = curRoute
	data.curParam = curParam
	return curRoute + param;
}

export const Formattimestamp = (timestamp) => {
	const dateObj = new Date(timestamp);
	const timestamp2 = dateObj.getTime();

	return  parseInt(timestamp2/1000);
}

export const toditu=(item)=>{
		uni.openLocation({
			latitude: Number(item.latitude || item.lat),
			longitude: Number(item.longitude || item.lng),
			name: item.name,
			address: item.address
		})
	}

export const timestampFormat = (timestamp) => {
	function zeroize(num) {
		return (String(num).length == 1 ? '0' : '') + num;
	}

	var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
	var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

	var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
	var tmDate = new Date(timestamp * 1000);  // 参数时间戳转换成的日期对象

	var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
	var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

	if (timestampDiff < 60) { // 一分钟以内
		return "刚刚";
	} else if (timestampDiff < 3600) { // 一小时前之内
		return Math.floor(timestampDiff / 60) + "分钟前";
	} else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
		return '今天' + zeroize(H) + ':' + zeroize(i);
	} else {
		var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
		if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
			return '昨天' + zeroize(H) + ':' + zeroize(i);
		} else if (curDate.getFullYear() == Y) {
			return zeroize(m) + '-' + zeroize(d) + ' ' + zeroize(H) + ':' + zeroize(i);
		} else {
			return Y + '-' + zeroize(m) + '-' + zeroize(d) + ' ' + zeroize(H) + ':' + zeroize(i);
		}
	}
}