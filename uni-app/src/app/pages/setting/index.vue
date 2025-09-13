<template>
    <view class="w-full h-screen box-border pt-[var(--top-m)] bg-[var(--page-bg-color)] setting-wrap" :style="themeColor()">
        <view class="mb-[var(--top-m)] sidebar-margin card-template !py-[20rpx]">
            <u-cell-group :border="false" class="cell-group">
                <u-cell :title="t('personalSettings')" :is-link="true" url="/app/pages/member/personal"></u-cell>
                <u-cell :title="t('switchLang')" :is-link="true" :value="lang" @click="langSheetShow = true"></u-cell>
                <u-cell :title="t('version')" :value="version"></u-cell>
                <!-- #ifdef APP -->
                <u-cell :title="'检测到新版本' + versionInfo.version_name" :is-link="true" @click="checkUpdate" v-if="versionInfo">
                    <template #value>
                        <text class="u-slot-value flex items-center">立即升级<text class="ml-[5px] w-[10rpx] h-[10rpx] bg-[red] rounded-[10rpx]"></text></text>
                    </template>
                </u-cell>
                <u-cell title="版本更新" :is-link="true" value="检查版本更新" @click="checkUpdate" v-else/>
                <!-- #endif -->
            </u-cell-group>
        </view>
        <view class="mb-[var(--top-m)] sidebar-margin card-template !py-[20rpx]">
            <u-cell-group :border="false" class="cell-group">
                <u-cell :title="t('userAgreement')" :is-link="true" url="/app/pages/auth/agreement?key=service"></u-cell>
                <u-cell :title="t('privacyAgreement')" :is-link="true" url="/app/pages/auth/agreement?key=privacy"></u-cell>
            </u-cell-group>
        </view>

        <view class="h-[88rpx] flex-center bg-[#fff] mx-[var(--sidebar-m)] rounded-[var(--rounded-big)] text-[26rpx]" @click="memberStore.logout(true)">{{ t('logout') }}</view>

        <u-action-sheet :actions="langList" :show="langSheetShow" :closeOnClickOverlay="true"
                        :safeAreaInsetBottom="true"
                        @close="langSheetShow = false" @select="switchLang"></u-action-sheet>
        <!-- 版本更新弹窗 -->
		<!-- #ifdef APP -->
        <!-- <update-version ref="updateVersionRef"></update-version> -->
		<!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import useMemberStore from '@/stores/member'
import { t, language } from '@/locale'
import updateVersion from '@/components/update-version/update-version.vue'
import useSystemStore from '@/stores/system';

const memberStore = useMemberStore()

const systemStore = useSystemStore();
const versionInfo = computed(() => {
    return systemStore.versionInfo
})

const version = ref(import.meta.env.VITE_APP_VERSION)
// #ifdef APP
plus.runtime.getProperty(plus.runtime.appid, (inf) => {
	// 获取版本号
	version.value = inf.version
})
// #endif
// #ifndef APP 
//获取当前app的版本
const systemInfo = uni.getSystemInfoSync();
version.value = systemInfo.appVersion;
// #endif

const updateVersionRef: any = ref(null)

/**
 * 支持的语言列表
 */
const langList = reactive({
    'zh-Hans': { name: '简体中文', fontSize: '14', value: 'zh-Hans' },
    'en': { name: 'English', fontSize: '14', value: 'en' }
})
const langSheetShow = ref(false)

// 当前语言
const lang = computed(() => {
    const lang = uni.getLocale()
    return langList[lang].name
})

/**
 * 切换语言
 */
const switchLang = (lang) => {
    language.loadAllLocaleMessages('app', lang.value)
}

const checkUpdate = ()=>{
	if(versionInfo.value && versionInfo.value.version_name){
        systemStore.showUpdateVersion()
        // uni.$emit('showUpdateVersion',{})
	}else{
		uni.showToast({
			title: '当前版本已是最新版本！',
			icon: 'none'
		});
	}
}
</script>

<style lang="scss" scoped>
page {
    background: var(--page-bg-color);
}

:deep(.cell-group), :deep(.u-cell-group) {
    .u-cell {
        .u-cell__body {
            padding: 0;
            height: 80rpx;
            margin-top: 16rpx;
        }

        &:first-of-type .u-cell__body {
            margin-top: 0;
        }

        .u-cell__title-text {
            font-size: 26rpx;
            line-height: 40rpx;
        }

        .u-icon__icon {
            font-size: 24rpx !important;
        }

        .u-cell__value {
            line-height: 1;
            font-size: 26rpx;
        }

        .u-line {
            display: none;
        }
    }
}

:deep(.u-action-sheet) {
    .u-line {
        margin: 0 30rpx !important;
        width: auto !important;
        border-color: #ddd !important;
    }

    .u-action-sheet__cancel {
        padding: 0;

    }

    .u-action-sheet__item-wrap__item__name {
        font-size: 26rpx !important;
    }
}
</style>
<style>
.setting-wrap .u-cell--clickable {
    background-color: transparent !important;
}
</style>
