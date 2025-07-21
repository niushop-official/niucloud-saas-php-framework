<template>
    <!--工具管理-->
    <div class="main-container">
        <el-card class="card !border-none" shadow="never">

            <div class="flex justify-between items-center">
                <span class="text-page-title">工具管理</span>
            </div>

            <div class="flex flex-wrap mt-[20px]">
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/addon')">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">插件开发</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">点击新建插件，生成插件后系统会生成对应插</div>
                    </div>
                    <img src="@/app/assets/images/tools/addon_develop.png" class="w-[256px] h-[128px]" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/code')">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">代码生成</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">代码生成</div>
                    </div>
                    <img src="@/app/assets/images/tools/code.png" class="w-[256px] h-[128px]" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/list')">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">数据字典</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">数据字典</div>
                    </div>
                    <img src="@/app/assets/images/tools/sys_dict_list.png" class="w-[256px] h-[128px]" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/update_cache')">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">更新缓存</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">更新缓存</div>
                    </div>
                    <img src="@/app/assets/images/tools/tools_update_cache.png" class="w-[256px] h-[128px]" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/detection')">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">环境监测</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">环境监测</div>
                    </div>
                    <img src="@/app/assets/images/tools/tools_check_environment.png" class="w-[256px] h-[128px] cursor-pointer" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/schedule')">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">计划任务</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">计划任务</div>
                    </div>
                    <img src="@/app/assets/images/tools/tools_schedule.png" class="w-[256px] h-[128px]" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/authorize')">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">授权信息</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">查看授权信息及重新认证授权</div>
                    </div>
                    <img src="@/app/assets/images/tools/app_auth.png" class="w-[256px] h-[128px]" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/admin_menu')">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">平台菜单</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">平台菜单</div>
                    </div>
                    <img src="@/app/assets/images/tools/official_market.png" class="w-[256px] h-[128px]" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/site_menu')">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">站点菜单</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">站点菜单</div>
                    </div>
                    <img src="@/app/assets/images/tools/official_market.png" class="w-[256px] h-[128px]" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/upgrade')">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">系统更新</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">系统更新</div>
                    </div>
                    <img src="@/app/assets/images/tools/tools_upgrade.png" class="w-[256px] h-[128px]" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/upgrade_records')">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">升级记录</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">升级记录</div>
                    </div>
                    <img src="@/app/assets/images/tools/tools_upgrade_records.png" class="w-[256px] h-[128px]" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/backup_records')">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">备份记录</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">备份记录</div>
                    </div>
                    <img src="@/app/assets/images/tools/tools_backup_records.png" class="w-[256px] h-[128px]" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/cloud_compile')">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">云编译</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">云编译</div>
                    </div>
                    <img src="@/app/assets/images/tools/tools_cloud_compile.png" class="w-[256px] h-[128px]" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="developerDialogVisible = true">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">开发模式</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">开发环境和生产环境说明</div>
                    </div>
                    <img src="@/app/assets/images/tools/developer.png" class="w-[256px] h-[128px]" />
                </div>
                <div class="w-[256px] tools-item-shadow m-[20px] !mr-[0px] !mt-[0px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="goRouter">
                    <div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col bg-[var(--el-bg-color)]">
                        <span class="text-[16px] font-bold">官方市场</span>
                        <div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">官方市场</div>
                    </div>
                    <img src="@/app/assets/images/tools/official_market.png" class="w-[256px] h-[128px]" />
                </div>
            </div>
        </el-card>

        <el-dialog v-model="developerDialogVisible" class="developer-dialog-wrap" title="开发人员模式说明" width="30%">
            <div>
                <p class="text-[16px] mb-[4px]">开发模式</p>
                <div class="text-[14px] indent-[2em]">开发人员模式即软件开发环境，指框架开启了开发模式(DEBUG=TRUE) ，开发模式时会出现开发选项卡，仅用于开发人员使用，包括应用及插件的安装卸载，系统升级等等。本菜单及子项功能均不受系统管理和权限控制</div>
                <p class="text-[16px] mt-[15px] mb-[4px]">生产模式</p>
                <div class="text-[14px] indent-[2em]">生产模式即软件生产环境，指框架关闭了调试开发模式(DEBUG=FALSE) 软件正式部署运营开发选项卡隐藏，一般来说，开发人员开发或者部署好环境后，要关闭开发模式。</div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="developerDialogVisible = false">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useSystemStore from '@/stores/modules/system'

const systemStore = useSystemStore()
systemStore.setHeadMenu('')

const router = useRouter()
const developerDialogVisible = ref(false)

const toLink = (link:any) => {
    router.push(link)
}
const goRouter = () => {
    window.open('https://www.niucloud.com/app')
}
</script>

<style lang="scss" scoped>
    .tools-item-shadow {
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    }

    img {
        opacity: .8;
    }
</style>
