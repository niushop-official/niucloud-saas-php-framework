<template>
    <el-dialog v-model="dialogMemberVisible" title="地址列表"  width="810px">
        <div class="min-h-[150px] max-h-[300px] overflow-auto" v-loading="loading">
            <div class="flex flex-wrap" v-if="list.length">
                <div v-for="(item,index) in list" :key="index" @click="selectAddress(item,index)" :class="{'border-[var(--el-color-primary)]': curAddressId == item.id }" class="mb-[15px] mx-[7px] address-temp overflow-hidden relative flex flex-col w-[240px] px-[12px] py-[15px] border-[1px] border-[#eee] border-solid rounded-[5px] cursor-pointer" >
                    <span class="text-[15px] leading-[1] truncate max-w-[150px]">{{item.name}}</span>
                    <span class="text-[15px] leading-[1]  mt-[5px]">{{item.mobile}}</span>
                    <el-tooltip class="box-item" effect="dark" :content="item.full_address" placement="bottom">
                        <span class="truncate text-[13px] leading-[1] mt-[5px]">{{item.full_address}}</span>
                    </el-tooltip>
                </div>
            </div>
            <div v-else class="flex items-center justify-center w-[100%] min-h-[150px] text-[16px]">暂无收货地址</div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogMemberVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmFn(formRef)">保存</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@/lang'
import { getMemberAddress } from '@/app/api/member'

const dialogMemberVisible = ref(false)
const loading = ref(true)
const curAddressId = ref('')

const open = (id:any, data: any) => {
    loading.value = true
    curAddressId.value = data
    getMemberAddressFn(id)
    dialogMemberVisible.value = true
}

// 获取地址信息
const list = ref<any>([])
const currIndex = ref(-1)
const getMemberAddressFn = (id:any) => {
    getMemberAddress({ member_id: id }).then((res: any) => {
        list.value = res.data || []
        loading.value = false
    })
}

const selectAddress = (data: any, index: number) => {
    curAddressId.value = data.id
    currIndex.value = index
}

const confirmFn = () => {
    const data = list.value[currIndex.value]
    emit('confirm', data)
    dialogMemberVisible.value = false
}

const emit = defineEmits(['confirm'])
defineExpose({
    dialogMemberVisible,
    open
})
</script>

<style lang="scss" scoped>

</style>
