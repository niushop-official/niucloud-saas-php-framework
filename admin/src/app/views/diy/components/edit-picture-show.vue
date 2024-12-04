<template>
	<!-- 内容 -->
	<div class="content-wrap" v-show="diyStore.editTab == 'content'">

		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('pictureShowBlockOne') }}</h3>
			<el-form label-width="80px" class="px-[10px]">
				 <el-form-item :label="t('image')">
                    <upload-image v-model="diyStore.editComponent.moduleOne.head.textImg" :limit="1"/>
                </el-form-item>

                <el-form-item :label="t('subTitle')">
                    <el-input v-model.trim="diyStore.editComponent.moduleOne.head.subText" :placeholder="t('subTitlePlaceholder')" clearable maxlength="8" show-word-limit />
                </el-form-item>

                <el-form-item :label="t('subTitleTextColor')">
                    <el-color-picker v-model="diyStore.editComponent.moduleOne.head.subTextColor" show-alpha  />
                </el-form-item>

                <el-form-item :label="t('pictureShowBgColor')">
                    <el-color-picker v-model="diyStore.editComponent.moduleOne.listFrame.startColor" show-alpha  />
                    <icon name="iconfont iconmap-connect" size="20px" class="block !text-gray-400 mx-[5px]"/>
                    <el-color-picker v-model="diyStore.editComponent.moduleOne.listFrame.endColor" show-alpha />
                </el-form-item>

                <div  v-for="(item,index) in diyStore.editComponent.moduleOne.list" :key="item.id" class="item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]">
                    <el-form-item :label="t('image')">
                        <upload-image v-model="item.imageUrl" :limit="1"/>
                    </el-form-item>

                    <el-form-item :label="t('pictureShowBtnText')">
                        <el-input v-model.trim="item.btnTitle.text" :placeholder="t('activeCubeTitlePlaceholder')" clearable maxlength="4" show-word-limit/>
                    </el-form-item>

                    <el-form-item :label="t('pictureShowBtnColor')">
                        <el-color-picker v-model="item.btnTitle.color" show-alpha  />
                    </el-form-item>

                    <el-form-item :label="t('pictureShowBtnBgColor')">
                        <el-color-picker v-model="item.btnTitle.startColor" show-alpha  />
                        <icon name="iconfont iconmap-connect" size="20px" class="block !text-gray-400 mx-[5px]"/>
                        <el-color-picker v-model="item.btnTitle.endColor" show-alpha />
                    </el-form-item>

                    <el-form-item :label="t('link')">
                        <diy-link v-model="item.link"/>
                    </el-form-item>
                </div>
			</el-form>
		</div>

		<div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('pictureShowBlockTwo') }}</h3>
			<el-form label-width="90px" class="px-[10px]">
                <el-form-item :label="t('image')">
                    <upload-image v-model="diyStore.editComponent.moduleTwo.head.textImg" :limit="1"/>
                </el-form-item>
                <el-form-item :label="t('subTitle')">
                    <el-input v-model.trim="diyStore.editComponent.moduleTwo.head.subText" :placeholder="t('subTitlePlaceholder')" clearable maxlength="8" show-word-limit />
                </el-form-item>

                <el-form-item :label="t('subTitleTextColor')">
                    <el-color-picker v-model="diyStore.editComponent.moduleTwo.head.subTextColor" show-alpha  />
                </el-form-item>

                <el-form-item :label="t('pictureShowBgColor')">
                    <el-color-picker v-model="diyStore.editComponent.moduleTwo.listFrame.startColor" show-alpha  />
                    <icon name="iconfont iconmap-connect" size="20px" class="block !text-gray-400 mx-[5px]"/>
                    <el-color-picker v-model="diyStore.editComponent.moduleTwo.listFrame.endColor" show-alpha />
                </el-form-item>

                <div  v-for="(item,index) in diyStore.editComponent.moduleTwo.list" :key="item.id" class="item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]">
                    <el-form-item :label="t('image')">
                        <upload-image v-model="item.imageUrl" :limit="1"/>
                    </el-form-item>

                    <el-form-item :label="t('pictureShowBtnText')">
                        <el-input v-model.trim="item.btnTitle.text" :placeholder="t('activeCubeTitlePlaceholder')" clearable maxlength="4" show-word-limit/>
                    </el-form-item>

                    <el-form-item :label="t('pictureShowBtnColor')">
                        <el-color-picker v-model="item.btnTitle.color" show-alpha  />
                    </el-form-item>

                    <el-form-item :label="t('pictureShowBtnBgColor')">
                        <el-color-picker v-model="item.btnTitle.startColor" show-alpha  />
                        <icon name="iconfont iconmap-connect" size="20px" class="block !text-gray-400 mx-[5px]"/>
                        <el-color-picker v-model="item.btnTitle.endColor" show-alpha />
                    </el-form-item>

                    <el-form-item :label="t('link')">
                        <diy-link v-model="item.link"/>
                    </el-form-item>
                </div>

			</el-form>
		</div>

	</div>

	<!-- 样式 -->
	<div class="style-wrap" v-show="diyStore.editTab == 'style'">
        <div class="edit-attr-item-wrap">
			<h3 class="mb-[10px]">{{ t('pictureShowBlockStyle') }}</h3>
			<el-form label-width="90px" class="px-[10px]">
				<el-form-item :label="t('topRounded')">
                    <el-slider v-model="diyStore.editComponent.moduleRounded.topRounded" show-input size="small" class="ml-[10px] diy-nav-slider" :max="100"/>
                </el-form-item>
                <el-form-item :label="t('bottomRounded')">
                    <el-slider v-model="diyStore.editComponent.moduleRounded.bottomRounded" show-input size="small" class="ml-[10px] diy-nav-slider" :max="100"/>
                </el-form-item>
			</el-form>
		</div>

		<!-- 组件样式 -->
		<slot name="style"></slot>
	</div>

</template>

<script lang="ts" setup>
import { t } from '@/lang'
import useDiyStore from '@/stores/modules/diy'
import { img } from '@/utils/common'
import { ref, reactive } from 'vue'

const diyStore = useDiyStore()
diyStore.editComponent.ignore = ['componentBgUrl'] // 忽略公共属性

// 组件验证
diyStore.editComponent.verify = (index: number) => {
    const res = { code: true, message: '' }
    diyStore.value[index].moduleOne.list.forEach((item: any) => {
        if (item.imageUrl === '') {
            res.code = false
            res.message = t('imageUrlTip')
            return res
        }
    })

    diyStore.value[index].moduleTwo.list.forEach((item: any) => {
        if (item.imageUrl === '') {
            res.code = false
            res.message = t('imageUrlTip')
            return res
        }
    })
    return res
}

defineExpose({})

</script>

<style lang="scss" scoped>
</style>
