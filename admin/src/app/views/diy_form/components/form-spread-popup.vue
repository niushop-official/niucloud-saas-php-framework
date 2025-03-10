<template>
    <div>
        <el-dialog v-model="showDialog" :title="t('formPromotion')" width="500px" :destroy-on-close="true">

            <el-tabs v-model="channel" class="mb-[10px]">
                <el-tab-pane label="H5" name="h5"></el-tab-pane>
                <el-tab-pane label="微信小程序" name="weapp"></el-tab-pane>
            </el-tabs>

            <div class="promote-flex flex" v-if="channel == 'h5'">
                <div class="promote-img flex justify-center items-center bg-[#f8f8f8] w-[150px] h-[150px]">
                    <el-image :src="wapImage" />
                </div>

                <div class="px-[20px] flex-1">
                    <div class="mb-[10px]">{{ t('promoteUrl') }}</div>
                    <el-input class="mb-[10px]" readonly :value="wapPreview">
                        <template #append>
                            <el-button @click="copyEvent(wapPreview)">{{ t('copy') }}</el-button>
                        </template>
                    </el-input>
                    <a class="text-primary" :href="wapImage" download>{{ t('downLoadQRCode') }}</a>
                </div>

            </div>

            <div class="promote-flex flex" v-if="channel == 'weapp'">
                <div class="promote-img flex justify-center items-center bg-[#f8f8f8] w-[150px] h-[150px]">
                    <el-image :src="img(weappData.path)" v-if="weappData.path" class="w-[150px] h-[150px]">
                        <template #error>
                            <div class="w-[150px] h-[150px] text-[14px] text-center leading-[150px]">{{ t('configureFailed') }}</div>
                        </template>
                    </el-image>
                    <div v-else class="w-[150px] h-[150px] text-[14px] text-center leading-[150px]">{{ t('configureFailed') }}</div>
                </div>

                <div class="px-[20px] flex-1">
                    <a class="text-primary" :href="img(weappData.path)" target="_blank" download>{{ t('downLoadQRCode') }}</a>
                </div>

            </div>

        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import QRCode from 'qrcode'
import storage from '@/utils/storage'
import { useClipboard } from '@vueuse/core'
import { getUrl } from '@/app/api/sys'
import { getDiyFormQrcode } from '@/app/api/diy_form'
import { img } from '@/utils/common'

const form: any = reactive({})
const showDialog = ref(false)
const channel = ref('h5')
const wapUrl = ref('')
const wapDomain = ref('')
const wapImage = ref('')
const wapPreview = ref('')
const page = ref('')
const weappData = reactive({
    path: ''
})

getUrl().then((res: any) => {
    wapUrl.value = res.data.wap_url

    // 生产模式禁止
    if (import.meta.env.MODE == 'production') return

    wapDomain.value = res.data.wap_domain

    // env文件配置过wap域名
    if (wapDomain.value) {
        wapUrl.value = wapDomain.value + '/wap'
    }

    const wapDomainStorage = storage.get('wap_domain')
    if (wapDomainStorage) {
        wapUrl.value = wapDomainStorage
    }
})

const loadQrcode = () => {
    wapPreview.value = `${wapUrl.value}${page.value}`
    // errorCorrectionLevel：密度容错率L（低）H(高)
    QRCode.toDataURL(wapPreview.value, { errorCorrectionLevel: 'L', margin: 0, width: 120 }).then(url => {
        wapImage.value = url
    })
}

const show = (data: any) => {
    channel.value = 'h5';
    Object.assign(form, data)
    page.value = `/app/pages/index/diy_form?form_id=${form.form_id}`

    loadQrcode()
    getDiyFormQrcodeFn();
    showDialog.value = true
}

const getDiyFormQrcodeFn = ()=>{
    getDiyFormQrcode({
        form_id:form.form_id
    }).then((res:any)=>{
        if(res.data) {
            weappData.path = res.data.path;
        }
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

defineExpose({
    showDialog,
    show
})
</script>

<style lang="scss" scoped></style>
