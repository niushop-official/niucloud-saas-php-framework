<template>
    <!-- 内容 -->
    <div class="content-wrap" v-show="diyStore.editTab == 'content'">

        <!-- 表单组件 字段内容设置 -->
        <slot name="field"></slot>
        <el-form label-width="100px" class="px-[10px]" @submit.prevent>
            <el-form-item :label="t('formPlaceholder')">
                <el-input v-model.trim="diyStore.editComponent.placeholder" :placeholder="t('formPlaceholderTips')" clearable maxlength="15" show-word-limit />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <div class="flex items-center">
                        <span class="mr-[3px]">{{ t('defaultValue') }}</span>
                        <el-tooltip effect="light" :content="t('defaultValueTips')" placement="top">
                            <el-icon>
                                <QuestionFilled color="#999999" />
                            </el-icon>
                        </el-tooltip>
                    </div>
                </template>
                <el-input v-model.trim="diyStore.editComponent.field.default" :placeholder="t('defaultValuePlaceholder')" clearable maxlength="18" show-word-limit />
            </el-form-item>
        </el-form>

        <!-- 表单组件 其他设置 -->
        <slot name="other"></slot>
        <el-form label-width="100px" class="px-[10px]">
            <el-form-item>
                <template #label>
                    <div class="flex items-center">
                        <span class="mr-[3px]">{{ t('preventDuplication') }}</span>
                        <el-tooltip effect="light" placement="top">
                            <template #content>
                                <p>{{ t('preventDuplicationTipsOne') }}</p>
                                <p>{{ t('preventDuplicationTipsTwo') }}</p>
                            </template>
                            <el-icon>
                                <QuestionFilled color="#999999" />
                            </el-icon>
                        </el-tooltip>
                    </div>
                </template>
                <el-switch v-model="diyStore.editComponent.field.unique" />
            </el-form-item>
            <!--			<el-form-item class="display-block">-->
            <!--				<template #label>-->
            <!--					<div class="flex items-center">-->
            <!--						<span class="mr-[3px]">{{ t('隐私保护') }}</span>-->
            <!--						<el-tooltip effect="light" placement="top">-->
            <!--							<template #content>-->
            <!--								<p>会自动将提交的个人信息做加密展示。</p>-->
            <!--								<p>适用于公开展示收集的数据且不暴露用户隐私。</p>-->
            <!--							</template>-->
            <!--							<el-icon>-->
            <!--								<QuestionFilled color="#999999" />-->
            <!--							</el-icon>-->
            <!--						</el-tooltip>-->
            <!--					</div>-->
            <!--				</template>-->
            <!--				<el-switch v-model="diyStore.editComponent.field.privacyProtection" />-->
            <!--				<div class="text-sm text-gray-400">{{ t('提交后自动隐藏文本，仅管理员可查看') }}</div>-->
            <!--			</el-form-item>-->
        </el-form>

    </div>

    <!-- 样式 -->
    <div class="style-wrap" v-show="diyStore.editTab == 'style'">

        <!-- 表单组件 字段样式 -->
        <slot name="style-field"></slot>

        <!-- 组件样式 -->
        <slot name="style"></slot>

    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { ref } from 'vue'
import useDiyStore from '@/stores/modules/diy'

const diyStore = useDiyStore()
diyStore.editComponent.ignore = ['componentBgUrl'] // 忽略公共属性

// 组件验证
diyStore.editComponent.verify = (index: number) => {
    const res = { code: true, message: '' }
    // todo 只需要考虑该组件自身的验证
    return res
}

defineExpose({})

</script>

<style lang="scss" scoped></style>
