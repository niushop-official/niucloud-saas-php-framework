<template>
    <u-popup :show="show" @close="show = false" mode="bottom" :round="10" >
        <view>
            <view class="py-[30rpx] px-[40rpx] flex items-center justify-between">
                <view class="text-center flex-1">选择时间</view>
                <view class="nc-iconfont nc-icon-guanbiV6xx text-[36rpx] text-primary" @click="show = false"></view>
            </view>
            <view class="px-[30rpx] mb-[20rpx]">
                <view class="flex items-center justify-between mb-[30rpx]">
                    <view class="w-[160rpx] h-[60rpx] leading-[60rpx] rounded-[30rpx] bg-[#F4F6FA] text-center text-[26rpx] text-[var(--text-color-light6)] border-[2rpx] border-solid border-[#F4F6FA]"  v-for="(item,index) in curselectDate" :key="'a'+index" :class="{'text-primary !border-[var(--primary-color)] !bg-[rgba(239,0,12,0.04)]': currentValue.type == item.type}"  @click="loadDateFn(item)">{{item.name}}</view>
                </view>
                <view class="flex items-center justify-between">
                    <view class="w-[316rpx] h-[60rpx] leading-[60rpx] rounded-[30rpx] bg-[#F4F6FA] text-center text-[26rpx] text-[var(--text-color-light6)] border-[2rpx] border-solid border-[#F4F6FA]" :class="{'text-primary !border-[var(--primary-color)] !bg-[rgba(239,0,12,0.04)]': currentValue.type == 'first'}" @click="currentValue.type = 'first'">{{dateList.nowDate[0]}}</view>
                    <view class="nc-iconfont nc-icon-jianV6xx"></view>
                    <view class="w-[316rpx] h-[60rpx] leading-[60rpx] rounded-[30rpx] bg-[#F4F6FA] text-center text-[26rpx] text-[var(--text-color-light6)] border-[2rpx] border-solid border-[#F4F6FA]" :class="{'text-primary !border-[var(--primary-color)] !bg-[rgba(239,0,12,0.04)]': currentValue.type == 'second'}" @click="currentValue.type = 'second'">{{dateList.nowDate[1]}}</view>
                </view>
            </view>
            <view class="h-[396rpx]">
                <picker-view  :indicator-style="{height:'70rpx',backgroundColor:'#F4F6FA'}" :value="dateList.curIndex" @change="bindChange" class="px-[60rpx] h-full">
                    <picker-view-column>
                        <view class="text-center leading-[70rpx] !h-[70rpx] text-[28rpx]" v-for="(item,index) in dateList.years" :key="index">{{item}}年</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="text-center leading-[70rpx] !h-[70rpx] text-[28rpx]" v-for="(item,index) in dateList.months" :key="index">{{item}}月</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="text-center leading-[70rpx] !h-[70rpx] text-[28rpx]" v-for="(item,index) in dateList.days" :key="index">{{item}}日</view>
                    </picker-view-column>
                </picker-view>
            </view>
            <view class="px-[30rpx] pb-[30rpx] pt-[20rpx] flex justify-between">
                <button class="w-[330rpx] h-[80rpx] font-500 text-[var(--primary-color)] text-[26rpx] leading-[76rpx] border-[2rpx] border-solid border-[var(--primary-color)] rounded-[100rpx] bg-transparent" @click="reset">重置</button>
                <button class="w-[330rpx] h-[80rpx] font-500 text-[#fff] text-[26rpx] leading-[80rpx] border-[0] rounded-[100rpx] primary-btn-bg" shape="circle" @click="save">确定</button>
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
    let lastMonthDate = new Date(date.getFullYear(),month - 1,date.getDate())
    let lastThreeMonthDate = new Date(date.getFullYear(),month - 3,date.getDate())
    let halfYear = new Date(date.getFullYear(), month - 6, date.getDate())
    let lastYear =new Date(date.getFullYear() - 1, month, date.getDate())
    const formatDate = (dateTime:any) => {
        const yearTime = dateTime.getFullYear()
        const monthTime = dateTime.getMonth() + 1
        const dayTime = dateTime.getDate()
        return `${yearTime}-${monthTime < 10 ? '0' + monthTime : monthTime}-${dayTime < 10 ? '0' + dayTime :dayTime }`
    }
    return {
        years,
        months,
        days,
        curIndex,
        nowDate,
        lastMonth: formatDate(lastMonthDate),
        lastThreeMonth: formatDate(lastThreeMonthDate),
        halfYear: formatDate(halfYear),
        lastYear: formatDate(lastYear)
    }
}
const getDaysInMonth = (year: any, month: any) => {
    let date = new Date(year, month, 0).getDate()
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
    nowDate:[init().nowDate,init().nowDate] //当前选中日期
})
 
const bindChange = (e: any) =>{
    const val = e.detail.value
    let year = dateList.years[val[0]]
    let month= dateList.months[val[1]]
    let day = dateList.days[val[2]]
    // 根据年份,月份判断天数
    dateList.days = getDaysCount(year, month)
    if(currentValue.value.type == 'first'){
        dateList.nowDate[0] = `${year}-${month < 10 ? '0' + month :month }-${day < 10 ? '0' + day :day }`
    }else if(currentValue.value.type == 'second'){
        dateList.nowDate[1] = `${year}-${month < 10 ? '0' + month :month }-${day < 10 ? '0' + day :day }`
    }
}
const curselectDate = reactive([
    {
        time:[init().lastMonth,init().nowDate],
        type:'lastMonth',
        name:'近1个月'
    },
    {
        time:[init().lastThreeMonth,init().nowDate],
        type:'lastThreeMonth',
        name:'近3个月'
    },
    {
        time:[init().halfYear,init().nowDate],
        type:'halfYear',
        name:'近半年'
    },
    {
        time:[init().lastYear,init().nowDate],
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
    dateList.nowDate = [init().nowDate,init().nowDate]
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