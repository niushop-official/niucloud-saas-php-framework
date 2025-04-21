<template>
    <u-count-down :time="prop.time" format="DD:HH:mm:ss" autoStart millisecond @change="onChange">
        <view class="time">
            <text class="time__days">{{ timeData.days }}&nbsp;天</text>
            <text class="time__hours">{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}&nbsp;时</text>
            <text class="time__minutes">{{ timeData.minutes > 10 ? timeData.minutes : '0' + timeData.minutes  }}&nbsp;分</text>
            <text class="time__seconds">{{ timeData.seconds > 10 ? timeData.seconds : '0' + timeData.seconds  }}&nbsp;</text>
        </view>
    </u-count-down>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'

const prop = defineProps({
    time: {
        type: String,
        default: ''
    }
})
const timeData: Record<string, any> = ref({})
const onChange = (e: any) => {
    timeData.value = e
}
</script>
<style lang="scss" scoped></style>