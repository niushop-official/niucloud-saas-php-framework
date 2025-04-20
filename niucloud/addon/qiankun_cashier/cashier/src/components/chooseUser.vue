<template>
    <el-dialog v-model="dialogVisible" title="选择用户" class="w-[60%] max-w-[800px]" @close="handleClose">
        <div class="flex flex-col h-500px">
            <div class="flex text-sm ml-[10px] w-450px pb-20px">
                <input type="text"
                    class="flex-1 border-t border-l border-b border-[#f1f1f1] input h-[40px] pl-[20px] rounded-tl-50px rounded-bl-50px outline-none"
                    placeholder="搜索昵称、手机号" v-model="keyword">
                <div class="bg-[#4781fc] text-[#fff] search w-[60px] text-center leading-[40px] rounded-tr-50px rounded-br-50px cursor-pointer"
                    @click="getUserList(1)">
                    搜索</div>
            </div>
            <el-scrollbar class="flex-1 relative">
                <div class="absolute left-0 top-0 w-full h-full" v-if="loading" v-loading="loading"
                    element-loading-text="加载中..."></div>
                <div class="grid3 m-10px" v-infinite-scroll="getUserList">
                    <div class="flex bg-[#f3f8ff] p-20px rounded-10px cursor-pointer" v-for="(item, index) in userList"
                        :key="index" @click="handleConfirm(item)">
                        <el-image :src="item.headimg ? img(item.headimg) : assetImg('/assets/images/member_head.png')"
                            class="w-50px h-50px rounded-full">
                            <template #error>
                                <img :src="assetImg('/assets/images/member_head.png')"
                                    class="w-50px h-50px rounded-full">
                            </template>
                        </el-image>
                        <div class="flex-1 ml-10px flex flex-col justify-between">
                            <div class="font-bold text-[#000] text-lg">{{ item.nickname }}</div>
                            <div class="text-sm">ID:{{ item.member_id }}</div>
                            <div class="text-sm">手机号:{{ item.mobile }}</div>
                            <div class="text-sm">余额:{{ item.balance }}</div>
                            <div class="text-sm">积分:{{ item.point }}</div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </div>

        <!-- <template #footer>
            <div class="lc-btn-group mt-20px mini">
                <div class="lc-btn normal" @click="handleClose">取消</div>
                <div class="lc-btn" @click="handleConfirm">确定</div>
            </div>
        </template> -->
    </el-dialog>
</template>

<script setup lang="ts">
import { UserInfoInterface } from '@/interface/UserInfoInterface';
import { assetImg, img } from '@/utils/common';
import request from '@/utils/request';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    }
});

const emit = defineEmits(['update:show', 'selected'])

const dialogVisible = computed({
    get() {
        return props.show;
    },
    set(value) {
        emit('update:show', value);
    },
});

const handleClose = () => {
    dialogVisible.value = false;
};
const handleConfirm = (item: UserInfoInterface) => {
    dialogVisible.value = false;
    emit('selected', item);
}


onMounted(() => {
    getUserList()
})

const loading = ref(false)
const page = ref(1)
const keyword = ref('')
const userList = ref<UserInfoInterface[]>([])
const getUserList = (isNew = 0) => {
    if (loading.value) return
    loading.value = true
    if (isNew) {
        page.value = 1
        userList.value = []
    }
    let params = {
        page: page.value,
        keyword: keyword.value,
    }
    request.get('qiankun_cashier/user/list', { params }).then((res) => {
        loading.value = false
        page.value++
        userList.value = userList.value.concat(res.data.data)
    }).catch(() => {
        loading.value = false
    })
}
</script>
