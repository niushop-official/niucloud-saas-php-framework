<template>
    <!-- 内容 -->
    <div class="content-wrap" v-show="diyStore.editTab == 'content'">
        <!--		<div class="edit-attr-item-wrap">-->
        <!--			<h3 class="mb-[10px]">{{ t('selectStyle') }}</h3>-->
        <!--			<div class="flex items-center mb-[18px] rounded overflow-hidden">-->
        <!--				<span-->
        <!--					class="iconfont iconshangxiatuwenpc border-[1px] border-solid border-[#eee] cursor-pointer flex-1 flex items-center justify-center py-[5px]"-->
        <!--					:class="{ 'border-[var(&#45;&#45;el-color-primary)] text-[var(&#45;&#45;el-color-primary)]': diyStore.editComponent.style == 'style-1' }"-->
        <!--					@click="diyStore.editComponent.style = 'style-1'"></span>-->
        <!--			</div>-->
        <!--		</div>-->
        <div class="edit-attr-item-wrap">
            <h3 class="mb-[10px]">{{ t("selectSource") }}</h3>
            <el-form label-width="90px" class="px-[10px]">
                <el-form-item :label="t('sortWay')">
                    <el-radio-group v-model="diyStore.editComponent.sortWay">
                        <el-radio label="default">{{ t('default') }}</el-radio>
                        <el-radio label="sale_num">{{ t('sales') }}</el-radio>
                        <el-radio label="price">{{ t('price') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('giftcardSource')">
                    <el-radio-group v-model="diyStore.editComponent.source">
                        <el-radio label="all">{{ t('giftcardSelectPopupAllGiftcard') }}</el-radio>
                        <el-radio label="category">{{ t('selectCardCategory') }}</el-radio>
                        <el-radio label="custom">{{ t('manualSelectionSources') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('selectCardCategory')" v-if="diyStore.editComponent.source == 'category'">
                    <el-select v-model="diyStore.editComponent.category_id" :placeholder="t('selectCategory')" clearable @change="changeCategory">
                        <el-option v-for="item in categoryOptions" :key="item.category_id" :label="item.category_name" :value="item.category_id" />
                    </el-select>
                    <div class="ml-[10px]">
                        <span class="cursor-pointer text-primary mr-[10px]" @click="refreshCategory(true)">{{ t('refresh') }}</span>
                        <span class="cursor-pointer text-primary" @click="toCategoryEvent">{{ t('addCategory') }}</span>
                    </div>
                </el-form-item>

                <el-form-item :label="t('giftcardNum')" v-if="diyStore.editComponent.source == 'all' || diyStore.editComponent.source == 'category'">
                    <el-slider class="diy-nav-slider" v-model="diyStore.editComponent.num" :min="1" max="20" size="small" show-input />
                </el-form-item>
                <el-form-item :label="t('customGiftcard')" v-if="diyStore.editComponent.source == 'custom'">
                    <giftcard-select-popup ref="giftcardSelectPopupRef" v-model="diyStore.editComponent.giftcard_ids" :min="1" :max="99" />
                </el-form-item>
            </el-form>

        </div>
    </div>

    <!-- 样式 -->
    <div class="style-wrap" v-show="diyStore.editTab == 'style'">
        <div class="edit-attr-item-wrap">
            <h3 class="mb-[10px]">{{ t('giftcardStyle') }}</h3>
            <el-form label-width="90px" class="px-[10px]">
                <el-form-item :label="t('giftcardBgColor')">
                    <el-color-picker v-model="diyStore.editComponent.elementBgColor" show-alpha :predefine="diyStore.predefineColors" />
                </el-form-item>
                <el-form-item :label="t('giftcardNameColor')">
                    <el-color-picker v-model="diyStore.editComponent.cardNameStyle.color" show-alpha :predefine="diyStore.predefineColors" />
                    <div class="mr-[20px]"></div>
                    <el-radio-group v-model="diyStore.editComponent.cardNameStyle.fontWeight">
                        <el-radio :label="'normal'">{{ t('fontWeightNormal') }}</el-radio>
                        <el-radio :label="'bold'">{{ t('fontWeightBold') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('topRounded')">
                    <el-slider v-model="diyStore.editComponent.topElementRounded" show-input size="small" class="ml-[10px] diy-nav-slider" :max="50" />
                </el-form-item>
                <el-form-item :label="t('bottomRounded')">
                    <el-slider v-model="diyStore.editComponent.bottomElementRounded" show-input size="small" class="ml-[10px] diy-nav-slider" :max="50" />
                </el-form-item>
            </el-form>
        </div>

        <!-- 组件样式 -->
        <slot name="style"></slot>
    </div>
</template>

<script lang="ts" setup>
import { getCategoryList } from '@/addon/shop_giftcard/api/category'
import { t } from '@/lang'
import useDiyStore from '@/stores/modules/diy'
import { ref, reactive, onMounted } from 'vue'
import { ElTable, ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import giftcardSelectPopup from '@/addon/shop_giftcard/views/giftcard/components/giftcard-select-popup.vue'

const router = useRouter()

const diyStore: any = useDiyStore()
diyStore.editComponent.ignore = [] // 忽略公共属性

// 组件验证
diyStore.editComponent.verify = (index: number) => {
    const res = { code: true, message: '' }

    if (diyStore.value[index].source == 'category') {
        if (diyStore.value[index].category_id == '') {
            res.code = false
            res.message = t('giftcardCategoryPlaceholder')
        }
    } else if (diyStore.value[index].source == 'custom') {
        if (diyStore.value[index].giftcard_ids.length == 0) {
            res.code = false
            res.message = t('giftcardPlaceholder')
        }
    }

    return res
}

// 礼品卡分类
const categoryOptions: any = reactive([])

// 跳转到礼品卡分类，添加分类
const toCategoryEvent = () => {
    const url = router.resolve({
        path: '/shop_giftcard/category'
    })
    window.open(url.href)
}

// 刷新礼品卡分类
const refreshCategory = (bool = false) => {
    getCategoryList({}).then((res) => {
        const data = res.data
        if (data) {
            categoryOptions.splice(0, categoryOptions.length, ...data)
            if (bool) {
                ElMessage({
                    message: t('refreshSuccess'),
                    type: 'success'
                })
            }
        }
    })
}

onMounted(() => {
    refreshCategory()
})

// 切换礼品卡分类，保存名称
const changeCategory = (category_id: any) => {
    for (let i = 0; i < categoryOptions.length; i++) {
        if (categoryOptions[i].category_id == category_id) {
            diyStore.editComponent.category_name = categoryOptions[i].category_name
            break;
        }
    }
}

defineExpose({})

</script>

<style lang="scss" scoped></style>
