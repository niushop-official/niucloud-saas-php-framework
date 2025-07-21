<template>
    <el-popover class="box-item" :width="322">
        <template #reference>
            <div class="relative">
                <icon name="iconfont iconFramec-1" />
                <span v-if="showRedDot" class="absolute top-[-3px] right-[-5px] w-[12px] h-[12px] rounded-full bg-[#DA203E] text-white text-[12px] flex justify-center items-center">1</span>
            </div>
        </template>
        <div class="flex items-center bg-[#F8FAFF] p-[10px] rounded-[8px]" v-if="showRedDot">
            <div class="w-[36px] h-[36px] rounded-full flex justify-center items-center">
                <img src="@/app/assets/images/index/cloud.png" alt="" class="w-[36px] h-[36px]" />
            </div>
            <div class="py-[3px] ml-[5px] flex-1">
                <div class="text-[16px] font-bold text-[#1D1F3A] mb-[5px]">云编译</div>
                <div class="text-[12px] text-[#4F516D] flex justify-between items-center">
                    <span>有正在执行的编译任务</span>
                    <span class="text-primary cursor-pointer ml-auto" @click="cloudBuildRef?.elNotificationClick()">点击查看</span>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-center" v-else>
            <img src="@/app/assets/images/index/message_empty.png" alt="">
        </div>
      </el-popover>
      <!-- <i class="iconfont iconFramec-1 cursor-pointer" title="消息" v-else></i> -->
      <cloud-build ref="cloudBuildRef"/>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CloudBuild from "@/app/components/cloud-build/index.vue"

const cloudBuildRef = ref<any>(null)

const showRedDot = ref(false)
let pollTimer: ReturnType<typeof setInterval> | null = null

const startPolling = () => {
    if (pollTimer) return
    cloudBuildRef.value?.getCloudBuildTaskFn()

    pollTimer = setInterval(() => {
        const startTime = localStorage.getItem('cloud_build_task')
        showRedDot.value = !!startTime
        if (!startTime) {
            stopPolling()
        }
    }, 1000)
}

const stopPolling = () => {
    if (pollTimer) {
        clearInterval(pollTimer)
        pollTimer = null
    }
}
startPolling()
</script>

<style lang="scss" scoped>
:deep(.box-item .el-popover.el-popper){
    padding: 13px 16px !important;
}
</style>
