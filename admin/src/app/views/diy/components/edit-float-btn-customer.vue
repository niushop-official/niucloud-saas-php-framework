<template>
    <!-- 内容：客服快捷浮窗（链接固定为系统客服，不可更换；位置固定右侧中部，仅可偏移） -->
    <div class="content-wrap float-btn" v-show="diyStore.editTab == 'content'">

        <div class="edit-attr-item-wrap">
            <h3 class="mb-[10px]">{{ t('floatBtnButton') }}</h3>
            <el-form label-width="80px" class="px-[10px]">
                <el-form-item :label="t('floatBtnOffset')">
                    <el-slider v-model="diyStore.editComponent.offset" show-input size="small" class="ml-[10px] diy-nav-slider" :min="-100" :max="100" />
                </el-form-item>
                <el-form-item :label="t('lateralBtnOffset')">
                    <el-slider v-model="diyStore.editComponent.lateralOffset" show-input size="small" class="ml-[10px] diy-nav-slider" :max="15" :min="-10" />
                </el-form-item>
            </el-form>
        </div>
        <div class="edit-attr-item-wrap">
            <h3 class="mb-[10px]">{{ t('floatBtnImageSet') }}</h3>
            <el-form label-width="80px" class="px-[10px]">
                <el-form-item :label="t('floatBtnImageSize')">
                    <el-slider v-model="diyStore.editComponent.imageSize" show-input size="small" class="ml-[10px] diy-nav-slider" :min="30" :max="100" />
                </el-form-item>

                <div class="text-[12px] text-[#999] mb-[15px] mt-[5px]">{{ t('floatBtnImageCircle') }}</div>
                <div ref="imageBoxRef">
                    <div v-for="(item,index) in diyStore.editComponent.list" :key="item.id || index"
                         class="item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]">
                        <el-form-item :label="t('image')">
                            <upload-image v-model="item.imageUrl" :limit="1" />
                        </el-form-item>

                        <el-form-item :label="t('link')">
                            <el-input :model-value="CUSTOMER_LINK.title" disabled />
                            <div class="text-[12px] text-[#999] mt-[4px]">{{ t('floatBtnCustomerLinkTip') }}</div>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
    </div>

    <!-- 样式 -->
    <div class="style-wrap" v-show="diyStore.editTab == 'style'">
        <slot name="style"></slot>
    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { t } from '@/lang'
import useDiyStore from '@/stores/modules/diy'

/** 系统客服链接（与 LinkDict MEMBER_CONTACT 一致，不可更换） */
const CUSTOMER_LINK = {
    name: 'MEMBER_CONTACT',
    parent: 'MEMBER_LINK',
    title: '客服',
    url: '/app/pages/member/contact',
    action: ''
}

/** 固定右侧中部（黄框区域），不可选四角 */
const FIXED_POSITION = 'middleRight'

const diyStore = useDiyStore()
diyStore.editComponent.ignore = ['pageBgColor', 'marginTop', 'marginBottom', 'marginBoth', 'componentBgUrl']

/** 始终写回固定客服链接与位置，防止历史数据或脏数据被改掉 */
const lockCustomerLink = () => {
    diyStore.editComponent.aroundRadius = 50
    diyStore.editComponent.bottomPosition = FIXED_POSITION
    if (!Array.isArray(diyStore.editComponent.list) || !diyStore.editComponent.list.length) {
        diyStore.editComponent.list = [{
            id: diyStore.generateRandom(),
            imageUrl: '',
            link: { ...CUSTOMER_LINK }
        }]
        return
    }
    // 客服浮窗仅保留一个入口
    diyStore.editComponent.list = diyStore.editComponent.list.slice(0, 1).map((item: any) => ({
        ...item,
        id: item.id || diyStore.generateRandom(),
        link: { ...CUSTOMER_LINK }
    }))
}

lockCustomerLink()

diyStore.editComponent.verify = (index: number) => {
    const res = { code: true, message: '' }
    const list = diyStore.value[index]?.list || []
    // 保存时强制位置
    diyStore.value[index].bottomPosition = FIXED_POSITION
    for (const item of list) {
        if (!item.imageUrl) {
            res.code = false
            res.message = t('imageUrlTip')
            return res
        }
        // 保存前再锁一次链接
        item.link = { ...CUSTOMER_LINK }
    }
    return res
}

const imageBoxRef = ref()

onMounted(() => {
    lockCustomerLink()
})

defineExpose({})
</script>

<style lang="scss" scoped>
</style>
