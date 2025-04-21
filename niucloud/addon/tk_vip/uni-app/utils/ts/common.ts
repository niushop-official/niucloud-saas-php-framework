import { img, redirect, getToken } from '@/utils/common'
import { checkReal } from '@/addon/tk_vip/api/real'
import useSystemStore from "@/stores/system";
const systemStore = useSystemStore();
import { useLogin } from "@/hooks/useLogin";
export function authLogin() {
	if (!getToken()) {
		const login = useLogin();
		// 第三方平台自动登录
		// #ifdef MP
		login.getAuthCode();
		// #endif
		// #ifdef H5
		useLogin().setLoginBack({ url: '/addon/tk_cps/pages/diy' })
		// #endif
	}
	return true //自动进行登录
}
export function checkRealFn() {
	if (!getToken()) {
		const login = useLogin();
		// 第三方平台自动登录
		// #ifdef MP
		login.getAuthCode();
		// #endif
		// #ifdef H5
		useLogin().setLoginBack({ url: '/addon/tk_vip/pages/index' })
		// #endif
	}
	checkReal().then(async (res) => {
		let real_info = await res.data
		if (real_info.type == 'redirect') {
			redirect({ url: real_info.page })
			return
		}
		if (real_info.type == 'msg') {
			uni.$u.toast(real_info.msg)
			return
		}
	})
}
export function dateChange(date) {
	return new Date(date).getTime() // 将日期值转换为时间戳
}
export function timeChange(timestamp) {
	const date = new Date(timestamp * 1000);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export function timeChangeDay(timestamp) {
	const date = new Date(timestamp * 1000);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	return `${day} ${hours}:${minutes}`;
}
export function getLocation() {
	uni.getLocation({
		type: 'wgs84',
		success: function (res) {
			return res;
		}
	});
}
export function telPhone(phone) {
	uni.makePhoneCall({
		phoneNumber: phone
	})
}
export function imgListPreview(item, index) {
	if (Array.isArray(item)) {
		// 检查数组是否为空
		if (!item.length) return false;

		// 使用map方法代替forEach，这样可以返回一个新的数组
		const urlList = item.map(img);

		// 使用uni-app的previewImage方法预览图片
		uni.previewImage({
			indicator: "number",
			current: index, // 确保index在item数组的范围内
			loop: true,
			urls: urlList
		});
	} else {
		// 检查item是否为空字符串
		if (item === '') return false;

		// 创建包含单个图片URL的数组
		const urlList = [img(item)];

		// 使用uni-app的previewImage方法预览单个图片
		uni.previewImage({
			indicator: "number",
			loop: true,
			urls: urlList
		});
	}
}