<template>
    <div class="user-info-root">
        <el-dropdown ref="dropdownRef" class="user-info-dropdown" @command="clickEvent" :tabindex="1">
            <div class="userinfo navbar-hit flex h-full items-center">
                <el-avatar :size="25" :icon="UserFilled" :src="info && info.head_img ? img(info.head_img) : ''"/>
                <div class="user-name pl-[8px] text-[#333]">{{ userStore.userInfo.username }}</div>
                <icon name="element ArrowDown" color="#333" class="ml-[5px]" />
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="changeSite">
                        <div class="flex items-center leading-[1] py-[5px]">
                        <span class="iconfont iconqiehuan ml-[4px] !text-[14px] mr-[10px]"></span>
                        <span class="text-[14px]">切换店铺</span>
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item @click="getUserInfoFn">
                        <!-- <router-link to="/user/center"> -->
                        <div class="flex items-center leading-[1] py-[5px]">
                        <span class="iconfont iconshezhi1 ml-[4px] !text-[14px] mr-[10px]"></span>
                        <span class="text-[14px]">账号设置</span>
                        </div>
                        <!-- </router-link> -->
                    </el-dropdown-item>
                    <el-dropdown-item @click="changePasswordDialog=true">
                        <div class="flex items-center leading-[1] py-[5px]">
                        <span class="iconfont iconxiugai ml-[4px] !text-[14px] mr-[10px]"></span>
                        <span class="text-[14px]">修改密码</span>
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item command="logout">
                        <div class="flex items-center leading-[1] py-[2px]">
                        <span class="iconfont icontuichudenglu !text-[21px] mr-[8px]"></span>
                        <span class="text-[14px]">退出登录</span>
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <el-dialog v-model="changePasswordDialog" width="450px" title="修改密码">
            <div>
                <el-form :model="saveInfo" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
                    <el-form-item :label="t('originalPassword')" prop="original_password">
                        <el-input v-model="saveInfo.original_password" type="password" :placeholder="t('originalPasswordPlaceholder')" clearable class="input-width" />
                    </el-form-item>
                    <el-form-item :label="t('newPassword')" prop="password">
                        <el-input v-model="saveInfo.password" type="password" :placeholder="t('passwordPlaceholder')" clearable class="input-width" />
                        <div class="form-tip">{{t('passwordTip')}}</div>
                    </el-form-item>
                    <el-form-item :label="t('passwordCopy')" prop="password_copy">
                        <el-input v-model="saveInfo.password_copy" type="password" :placeholder="t('passwordPlaceholder')" clearable class="input-width" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="changePasswordDialog = false">{{t('cancel')}}</el-button>
                    <el-button type="primary" @click="submitForm(formRef)">{{t('save')}}</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="changeSiteDialog" width="1260px" title="切换店铺" append-to-body>
            <div class="min-h-[540px]">
                <div class="flex flex-wrap" v-loading="site.loading">
                    <div v-for="(item, index) in site.tableData" :key="index" @click="selectSite(item)" :class="['home-item w-[285px] box-border mb-[20px] cursor-pointer',{'mr-[20px]': index ==0 || (index + 1) % 4 != 0,'border-[1px] border-solid border-[var(--el-color-primary)]': siteInfo.site_id == item.site_id}]">
                        <div class="flex items-center px-[24px] pt-[22px] pb-[16px] bg-[#F0F2F4] home-item-head">
                            <img v-if="item.front_end_logo" class="w-[48px] h-[48px] mr-[15px] rounded-[50%] overflow-hidden" :src="img(item.front_end_logo)" />
                            <img v-else class="w-[48px] h-[48px] mr-[15px] rounded-[50%] overflow-hidden" src="@/app/assets/images/site_logo.png" />
                            <div class="flex flex-col flex-1 justify-center">
                                <div class="flex items-center flex-wrap">
                                    <span class="text-[16px] text-[#000] max-w-[145px] font-bold truncate mr-[10px]">{{item.site_name}}</span>
                                    <div class="flex items-center justify-center min-w-[42px] h-[18px] bg-[#FF5500] rounded-tl-md rounded-br-md items-tab" v-if="item.app_name">
                                        <span class="text-[12px] text-[#fff]">{{item.app_name}}</span>
                                    </div>
                                </div>
                                <span class="text-[12px] mt-[3px] text-[#555]" v-if="item.status !== 1">{{item.status_name}}</span>
                            </div>
                        </div>
                        <div class="px-[24px] py-[20px] text-[#6D7278]">
                            <p class="text-[14px]">店铺编号：{{item.site_id}}</p>
                            <p class="text-[14px] mt-[2px]">店铺套餐：{{item.group_name || '--'}}</p>
                        </div>
                    </div>
                    <div v-if="!site.tableData.length && !site.loading" class="m-auto">
                        <img src="@/app/assets/images/site_empty.png"/>
                        <p class="text-center text-gray-400">暂无店铺</p>
                    </div>
                </div>
            </div>
            <div class="mt-[16px] flex justify-end">
                <el-pagination v-model:current-page="site.params.page" v-model:page-size="site.params.limit"
                            layout="total, prev, pager, next, jumper" :total="site.total"
                            @current-change="getHomeSiteFn" :hide-on-single-page="true"/>
            </div>
        </el-dialog>
        <user-info-edit ref="userInfoEditRef" />
    </div>
</template>

<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
import { reactive, ref, computed } from 'vue'
import { img } from '@/utils/common'
import { RouteLocationRaw, useRouter } from 'vue-router'
import { FormInstance, FormRules, ElNotification } from 'element-plus'
import userInfoEdit from '@/app/components/user-info-edit/index.vue'
import useUserStore from '@/stores/modules/user'
import { setUserInfo } from '@/app/api/personal'
import { getHomeSite } from '@/app/api/home'
import { t } from '@/lang'
import storage from '@/utils/storage'
const userStore = useUserStore()
const dropdownRef = ref()
const open = () => {
    dropdownRef.value?.handleOpen()
}
defineExpose({ open })

const siteInfo = userStore.siteInfo
const router = useRouter()

const clickEvent = (command: string) => {
    switch (command) {
        case 'logout':
            userStore.logout()
            break
    }
}

const userInfoEditRef = ref(null)
const getUserInfoFn = () => {
    userInfoEditRef.value?.open()
}

const info = computed(() => {
    return userInfoEditRef.value?.saveInfo
})

// 修改密码 --- start
const changePasswordDialog = ref(false)
const formRef = ref<FormInstance>()
// 提交信息
const saveInfo = reactive({
    original_password: '',
    password: '',
    password_copy: ''
})
// 表单验证规则
const formRules = reactive<FormRules>({
    original_password: [
        { required: true, message: t('originalPasswordPlaceholder'), trigger: 'blur' }
    ],
    password: [
        { required: true, message: t('passwordPlaceholder'), trigger: 'blur' }
    ],
    password_copy: [
        { required: true, message: t('passwordPlaceholder'), trigger: 'blur' }
    ]
})
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            let msg = ''
            if (saveInfo.password && !saveInfo.original_password) msg = t('originalPasswordHint')
            if (saveInfo.password && saveInfo.original_password && !saveInfo.password_copy) msg = t('newPasswordHint')
            if (saveInfo.password && saveInfo.original_password && saveInfo.password_copy && saveInfo.password != saveInfo.password_copy) msg = t('doubleCipherHint')
            if (msg) {
                ElNotification({
                    type: 'error',
                    message: msg
                })
                return
            }

            setUserInfo(saveInfo).then((res: any) => {
                changePasswordDialog.value = false
            })
        } else {
            return false
        }
    })
}
// 修改密码 --- end
// 切换店铺
const changeSiteDialog = ref(false)
const site = reactive({
    params: {
        page: 1,
        limit: 12
    },
    loading: false,
    tableData: [],
    total: 0
})
const getHomeSiteFn = (page: number = 1) => {
    site.params.page = page
    site.loading = true
    getHomeSite(site.params).then(res => {
        site.tableData = res.data.data
        site.total = res.data.total
        site.loading = false
    }).catch(() => {
        site.loading = false
    })
}
const changeSite = () => {
    getHomeSiteFn()
    changeSiteDialog.value = true
}
const selectSite = (site: any) => {
    storage.set({ key: 'siteId', data: site.site_id })
    storage.set({ key: 'siteInfo', data: site })
    storage.set({ key: 'comparisonSiteIdStorage', data: site.site_id })
    useUserStore().$patch((site) => {
        site.siteInfo = site
    })
    location.href = `${location.origin}/site/`
}
</script>

<style lang="scss" scoped>
.el-popper .el-dropdown-menu{
  width: 150px;
}
.home-item{
  box-shadow: 0 2px 4px 0 rgba(161,167,183,0.18);
  .items-tab span{
    transform: scale(0.9);
  }
}
.home-item:hover {
  border-color: var(--el-color-primary);
  .title {
    color: var(--el-color-primary);
  }
  .home-item-head{
    background-color: #A1A7B7;
    span{
      color: #fff !important;
    }
  }
}
</style>
