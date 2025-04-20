<template>
    <div class="flex w-screen h-screen flex-col items-center justify-center" v-loading="loading">
        <template v-if="!loading">
            <template v-if="authResult.result == 'success'">
                <icon name="element CircleCheckFilled" size="50px" color="#0eb118"/>
                <h3 class="text-xl mt-[20px]">授权绑定成功</h3>
            </template>
            <template v-else>
                <icon name="element CircleCloseFilled" size="50px" color="#e70000"/>
                <h3 class="text-xl mt-[20px]">抱歉，授权绑定失败</h3>
            </template>
            <p class="text-secondary mt-[5px]" v-if="authResult.result == 'fail'">
                {{ authResult.msg }}
                <el-button type="primary" link @click="authBindWechat">重新授权</el-button>
            </p>
            <el-button type="primary" class="mt-[20px] w-[150px]" @click="confirm">确认</el-button>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getAuthorizationUrl, getAuthorizationResult } from '@/app/api/wxoplatform'

const route = useRoute()
const loading = ref(true)
const authResult = ref({
    result: 'fail',
    msg: ''
})

getAuthorizationResult(route.query).then(({ data }) => {
    authResult.value.result = 'success'
    loading.value = false
}).catch((e) => {
    authResult.value.msg = e.toString()
    loading.value = false
})

const authBindWechat = () => {
    getAuthorizationUrl().then(({ data }) => {
        location.href = data
    })
}

const confirm = () => {
    window.close()
}
</script>

<style lang="scss" scoped>
</style>
