<template>
    <u-popup :show="show" @close="show = false" mode="bottom" :round="10"  zIndex="10090">
        <view class="popup-common relative">
			<view class="title">选择时间</view>
            <view class="absolute  top-[36rpx] right-[36rpx] text-[24rpx] text-[var(--text-color-light6)] leading-[30rpx] z-10" @click="clearDate">清除</view>
            <view class="px-[var(--popup-sidebar-m)] mb-[20rpx] mt-[10rpx]">
                <view class="flex items-center justify-between mb-[30rpx]">
                    <view class="w-[160rpx] h-[66rpx] box-border flex-center rounded-[33rpx] bg-[var(--temp-bg)] text-center text-[26rpx] text-[var(--text-color-light6)] border-[2rpx] border-solid border-[var(--temp-bg)]"  v-for="(item,index) in curselectDate" :key="'a'+index" :class="{'text-primary !border-[var(--primary-color)] !bg-[rgba(239,0,12,0.04)]': currentValue.type == item.type}"  @click="loadDateFn(item)">{{item.name}}</view> 
                </view>
                <view class="flex items-center justify-between">
                    <view class="w-[316rpx] h-[66rpx] box-border leading-[62rpx] rounded-[33rpx] bg-[var(--temp-bg)] text-center text-[26rpx] text-[var(--text-color-light6)] border-[2rpx] border-solid border-[var(--temp-bg)]" :class="{'text-primary !border-[var(--primary-color)] !bg-[var(--primary-color-light)]': currentValue.type == 'first'}" @click="currentValue.type = 'first'">{{dateList.nowDate[0].substr(0,10)}}</view>
                    <view class="nc-iconfont nc-icon-jianV6xx"></view>
                    <view class="w-[316rpx] h-[66rpx] box-border leading-[62rpx] rounded-[33rpx] bg-[var(--temp-bg)] text-center text-[26rpx] text-[var(--text-color-light6)] border-[2rpx] border-solid border-[var(--temp-bg)]" :class="{'text-primary !border-[var(--primary-color)] !bg-[var(--primary-color-light)]': currentValue.type == 'second'}" @click="currentValue.type = 'second'">{{dateList.nowDate[1].substr(0,10)}}</view>
                </view>
            </view>
            <view class="gradation-picker">
                <picker-view indicator-class="!h-[80rpx] !bg-[var(--temp-bg)]" :value="dateList.curIndex" @change="bindChange" class="w-[750rpx] px-[60rpx] h-[396rpx] box-border">
                    <picker-view-column>
						<view class="text-center leading-[80rpx] text-[28rpx]" v-for="(item,index) in dateList.years" :key="index">{{item}}年</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="text-center leading-[80rpx] text-[28rpx]" v-for="(item,index) in dateList.months" :key="index">{{item}}月</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="text-center leading-[80rpx] text-[28rpx]" v-for="(item,index) in dateList.days" :key="index">{{item}}日</view>
                    </picker-view-column>
                </picker-view>
            </view>
            <view class="btn-wrap flex justify-between items-center !pt-[30rpx]">
                <button class="btn flex-1 !leading-[76rpx] mr-[20rpx] !text-[var(--primary-color)] border-[2rpx] border-solid border-[var(--primary-color)] rounded-[100rpx] bg-transparent box-border" hover-class="none" @click="reset">重置</button>
                <button class="btn flex-1 border-[0] rounded-[100rpx] primary-btn-bg" shape="circle" hover-class="none" @click="save">确定</button>
            </view>
        </view>
    </u-popup>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue'

const emits = defineEmits(['confirm'])
// 弹框时间选择
const show = ref(false)
const create_time: any = ref([])
// 日期
const init = () =>{
    const date = new Date();
    const years = []
    const months = []
    const days = []
    const year = date.getFullYear()
    const month = date.getMonth();
    const day = date.getDate()

    for (let i = 1990; i <= date.getFullYear()+2; i++) {
        years.push(i)
    }
    for (let i = 1; i <= 12; i++) {
        months.push(i)
    }
    let dayCount = getDaysInMonth(year, month+1)
    for (let i = 1; i <= dayCount; i++) {
        days.push(i)
    }
    let yearIndex = years.indexOf(year)
    let curIndex = [yearIndex, month, day-1]
    let nowDate = `${year}-${month + 1 < 10 ? '0' + (month + 1) :(month + 1) }-${day < 10 ? '0' + day :day }`
    let nowDateStart = `${year}-${month + 1 < 10 ? '0' + (month + 1) :(month + 1) }-${day < 10 ? '0' + day :day } 00:00:00`
    let nowDateEnd = `${year}-${month + 1 < 10 ? '0' + (month + 1) :(month + 1) }-${day < 10 ? '0' + day :day } 23:59:59`
    let lastMonthDate = new Date(date.getFullYear(),month - 1,date.getDate())
    let lastThreeMonthDate = new Date(date.getFullYear(),month - 3,date.getDate())
    let halfYear = new Date(date.getFullYear(), month - 6, date.getDate())
    let lastYear =new Date(date.getFullYear() - 1, month, date.getDate())
    const formatDate = (dateTime:any) => {
        const yearTime = dateTime.getFullYear()
        const monthTime = dateTime.getMonth() + 1
        const dayTime = dateTime.getDate()
        return `${yearTime}-${monthTime < 10 ? '0' + monthTime : monthTime}-${dayTime < 10 ? '0' + dayTime :dayTime } 00:00:00`
    }
    return {
        years,
        months,
        days,
        curIndex,
        nowDate,
        nowDateStart,
        nowDateEnd,
        lastMonth: formatDate(lastMonthDate),
        lastThreeMonth: formatDate(lastThreeMonthDate),
        halfYear: formatDate(halfYear),
        lastYear: formatDate(lastYear)
    }
}
const getDaysInMonth = (year: any, month: any) => {
    let  date = new Date(year, month, 0).getDate()
    return date
}
const getDaysCount = (year: any, month: any) =>{
    let count = getDaysInMonth(year, month)
    let days = []
    for (let i = 1; i <= count; i++) {
        days.push(i)
    }
    return days
}
const dateList = reactive({
    years: init().years,
    months: init().months,
    days: init().days,
    curIndex:init().curIndex, //当前选中下标
    nowDate:[init().nowDateStart,init().nowDateEnd] //当前选中日期
})
 
const bindChange = (e: any) =>{
    const val = e.detail.value
    let year = dateList.years[val[0]]
    let month= dateList.months[val[1]]
    let day = dateList.days[val[2]]
    // 根据年份,月份判断天数
    dateList.days = getDaysCount(year, month)
    if(currentValue.value.type == 'first'){
        dateList.nowDate[0] = `${year}-${month < 10 ? '0' + month :month }-${day < 10 ? '0' + day :day } 00:00:00`
    }else if(currentValue.value.type == 'second'){
        dateList.nowDate[1] = `${year}-${month < 10 ? '0' + month :month }-${day < 10 ? '0' + day :day } 23:59:59`
    }
}
const curselectDate = reactive([
    {
        time:[init().lastMonth,init().nowDateEnd],
        type:'lastMonth',
        name:'近1个月'
    },
    {
        time:[init().lastThreeMonth,init().nowDateEnd],
        type:'lastThreeMonth',
        name:'近3个月'
    },
    {
        time:[init().halfYear,init().nowDateEnd],
        type:'halfYear',
        name:'近半年'
    },
    {
        time:[init().lastYear,init().nowDateEnd],
        type:'lastYear',
        name:'近一年'
    }
])
// 时间搜索
const currentValue = ref({
    type: 'first',
    time: []
})
const loadDateFn = (data: any) =>{
    currentValue.value.type = data.type
    currentValue.value.time = data.time
    dateList.nowDate[0] = currentValue.value.time[0]
    dateList.nowDate[1] = currentValue.value.time[1]
}

const save = () =>{
    if(currentValue.value.type == 'first' ||currentValue.value.type == 'second'){
        create_time.value = dateList.nowDate
        let start = new Date(create_time.value[0]).getTime()
        let end = new Date(create_time.value[1]).getTime()
        if( start > end){
            uni.showToast({ title: '开始时间不能大于结束时间', icon: 'none' })
            return
        }
    }else{
        create_time.value = currentValue.value.time
    }
    emits('confirm',create_time.value)
    show.value = false
}
const reset = () =>{
    currentValue.value.type = 'first'
    dateList.curIndex = init().curIndex
    dateList.nowDate = [init().nowDateStart,init().nowDateEnd]
}

const clearDate = () =>{
    emits('confirm',[])
    show.value = false
}
defineExpose({
    show
})
</script>

<style scoped>
:deep(.uni-picker-view-content){
    z-index: 10;
}

:deep(.uni-picker-view-indicator::before){
    border: none !important;
}
:deep(.uni-picker-view-indicator::after){
    border: none !important;
}
</style>
<style lang="scss">
	.gradation-picker{
		position: relative;
		&::after{
			content: "";
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			height: 70rpx;
			background: linear-gradient(#fff, rgba(255,255,255,.5));
			z-index: 10;
		}
		&::before{
			content: "";
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			height: 70rpx;
			background: linear-gradient(#fff, rgba(255,255,255,.5));
			z-index: 12;
		}
	}
</style>