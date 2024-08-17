<template>
    <view :style="themeColor()" >
        <view v-if="agreement && agreement.content" class="py-[var(--top-m)] px-[var(--sidebar-m)]">
            <u-parse :content="agreement.content" :tagStyle="{img: 'vertical-align: top;'}"></u-parse>
        </view>
		
	   <view  v-else-if="!loading" class="min-h-[100vh] bg-[var(--page-bg-color)] overflow-hidden">
		   <view class="empty-page">
			   <image class="img" :src="img('static/resource/images/empty.png')" model="aspectFit" />
			   <view class="desc">暂无协议</view>
		   </view>
	   </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAgreementInfo } from '@/app/api/system'
import { img} from '@/utils/common'

const agreement = ref(null)
const loading = ref(true)
onLoad((option: any)=> {
    getAgreementInfo(option.key).then((res: any) => {
        agreement.value = res.data
		loading.value  = false 
        uni.setNavigationBarTitle({
            title: res.data.agreement_key_name
        })
    }).catch(()=>{
		loading.value  = false 
	})
})
</script>

<style lang="scss"></style>
