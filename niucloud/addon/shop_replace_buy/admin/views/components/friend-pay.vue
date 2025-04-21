
<template>
    <el-dialog v-model="dialogFriendPayVisible" :title=" friendData.config && friendData.config.pay_type_name ? friendData.config.pay_type_name : t('friendPayTitle')"  width="500px" :close-on-press-escape="false" :close-on-click-modal="false" :before-close="closeFn">
        <div class="min-h-[450px]"  v-loading="loading">
            <div v-if="Object.keys(friendData).length">
                <el-alert type="warning" :closable="false">
                    <template #default>
                        帮付说明
                        <p  class="mb-[5px]" v-for="(item,index) in friendData.config.pay_explain_content.split('\n')" :key="index">{{ item }}</p>
                    </template>
                </el-alert>
                <el-tabs v-model="channel" class="mb-[10px]">
                    <el-tab-pane label="H5" name="h5"></el-tab-pane>
                    <el-tab-pane label="微信小程序" name="weapp"></el-tab-pane>
                </el-tabs>
                <div>
                    <div class="flex justify-center mb-[24px]">
                        <div class="flex flex-col justify-center  items-center bg-[#f8f8f8] p-[10px]">
                            <div class="w-[150px] h-[150px] mb-[10px]">
                                <el-image :src="wapImage" v-if="channel == 'h5'"  class="w-[150px] h-[150px]" />
                               <template v-if="channel == 'weapp'">
                                    <el-image :src="img(friendData.qrcode)"  v-if="friendData.qrcode"  class="w-[150px] h-[150px]">
                                        <template #error>
                                            <div class="w-[150px] h-[150px] text-[12px] text-center leading-[150px]">配置失败</div>
                                        </template>
                                    </el-image>
                                    <div v-else class="w-[150px] h-[150px] text-[12px] text-center leading-[150px]">配置失败</div>
                               </template>
                            </div>
                            <div class="max-w-[170px] using-hidden">帮{{ friendData.member.nickname }}付款</div>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <a class="w-[90px] h-[30px] leading-[30px] bg-primary text-[#fff] text-center box-border mr-[20px] cursor-pointer" @click="downloadPoster">{{ t('downloadPoster') }}</a>
                        <a class="w-[90px] h-[30px] leading-[30px] text-primary border-solid border-[1px] border-primary text-center box-border mr-[20px]" v-if="channel == 'h5'" :href="wapImage" download target="_blank">{{ t('downloadQrcode') }}</a>
                        <a class="w-[90px] h-[30px] leading-[30px] text-primary border-solid border-[1px] border-primary text-center box-border mr-[20px] cursor-pointer" v-else @click="downloadImage">{{ t('downloadQrcode') }}</a>
                        <el-tooltip effect="light" :content="friendData.link" placement="bottom" v-if="channel == 'h5'">
                            <el-button class="w-[90px] h-[30px] leading-[30px] text-[#333] border-solid border-[1px] border-[#999] text-center box-border" @click="copyEvent(friendData.link)">{{ t('copy') }}</el-button>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { getFriendsPay } from '@/app/api/pay'
import { getPosterGenerate } from '@/app/api/poster'
import { replaceBuyCheck } from '@/addon/shop_replace_buy/api/order'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import QRCode from 'qrcode'
import storage from '@/utils/storage'

const router = useRouter()
const dialogFriendPayVisible = ref(false)
const channel = ref('h5')
const tradeType = ref('')
const tradeId = ref(0)
const friendData = ref<any>({})
const posterH5 = ref('')
const posterWeapp = ref('')
const loading = ref(false)
const wapPreview = ref('')
const wapImage = ref('')

const prop = defineProps({
    wapUrl: {
        type: String,
        default: ''
    }
})
const open = (data: any) => {
    tradeType.value = data.trade_type
    tradeId.value = data.order_id
    loading.value = true
    loadQrcode()
    getFriendsPayFn()
    dialogFriendPayVisible.value = true
}

// 生成h5二维码
const loadQrcode = () => {
    wapPreview.value = `${prop.wapUrl}/app/pages/friendspay/money?id=${tradeId.value}&type=${tradeType.value}`
    // errorCorrectionLevel：密度容错率L（低）H(高)
    QRCode.toDataURL(wapPreview.value, { errorCorrectionLevel: 'L', margin: 0, width: 120 }).then(url => {
        wapImage.value = url
    })
}

let replaceBuyCheckInterval: any = null
const getFriendsPayFn = () => {
    getFriendsPay(tradeType.value, tradeId.value, 'weapp').then(res => {
        friendData.value = res.data
        getPosterGenerateFn('h5', (obj: any) => {
            posterH5.value = (obj && img(obj)) || ''
        })
        getPosterGenerateFn('weapp', (obj: any) => {
            posterWeapp.value = (obj && img(obj)) || ''
        })
        // 轮询，查看支付状态
        replaceBuyCheckInterval = setInterval(() => {
            replaceBuyCheckFn()
        }, 3000)
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}

const getPosterGenerateFn = (channel: any, callback: any) => {
    const params = {
        id: friendData.value.trade_id,
        type: friendData.value.trade_type,
        member_id: friendData.value.member.member_id
    }
    const data = {
        id: friendData.value.poster_id,
        type: 'friendspay',
        channel,
        param: params
    }
    getPosterGenerate(data).then(res => {
        if (callback && typeof callback == 'function') callback(res.data)
    })
}
// 下载海报
const downloadPoster = () => {
    if (channel.value == 'h5' && posterH5.value) {
        window.open(posterH5.value, '_blank')
    }
    if (channel.value == 'weapp' && posterH5.value) {
        window.open(posterWeapp.value, '_blank')
    }
}
// 下载二维码
const downloadImage = () => {
    if (channel.value == 'h5') {
        window.open(wapImage.value, '_blank')
    }
    if (channel.value == 'weapp') {
        window.open(img(friendData.value.qrcode), '_blank')
    }
}

// 检测支付状态
const replaceBuyCheckFn = () => {
    const params = {
        trade_id: friendData.value.trade_id,
        trade_type: friendData.value.trade_type
    }
    replaceBuyCheck(params).then(res => {
        if (res.data) {
            clearInterval(replaceBuyCheckInterval)
            replaceBuyCheckInterval = null
            emit('payConfirm');
        }
    }).catch(() => {
        clearInterval(replaceBuyCheckInterval)
        replaceBuyCheckInterval = null
    })
}

// 复制
const { copy, isSupported, copied } = useClipboard()
const copyEvent = (text: string) => {
    if (!isSupported.value) {
        ElMessage({
            message: t('notSupportCopy'),
            type: 'warning'
        })
    }
    copy(text)
}

watch(copied, () => {
    if (copied.value) {
        ElMessage({
            message: t('copySuccess'),
            type: 'success'
        })
    }
})

onUnmounted(() => {
    if (replaceBuyCheckInterval) {
        clearInterval(replaceBuyCheckInterval)
        replaceBuyCheckInterval = null
    }
})

const emit = defineEmits(['payConfirm'])

const closeFn = (done: () => void) => {
    ElMessageBox.confirm(
        '支付过程中，请勿关闭该页面，以免出现支付异常!',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        // 用户确认关闭
        storage.remove('replaceBuyOrderCreateData');
        router.push({ path: '/shop/order/detail', query: { order_id: tradeId.value } });
        done(); // 允许关闭弹窗
    }).catch(() => {

    });
};


defineExpose({
    open
})
</script>

<style lang="scss" scoped>

</style>
