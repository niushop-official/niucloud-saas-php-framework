<?php

namespace addon\qiankun_recharge;


use think\exception\ValidateException;
use think\facade\Log;

/**
 * 插件安装之后单独的插件方法
 */
class Addon
{

    /**
     * 插件安装执行
     */
    public function install()
    {
        $balanceFile = app()->getRootPath() . '../uni-app/src/app/pages/member/balance.vue';
        if (is_file($balanceFile)) {
            $content = file_get_contents($balanceFile);
            file_put_contents($balanceFile . '.install.bak', $content); // 备份文件
            if (!str_contains($content, '<!-- qiankun_recharge_backup_code -->')) {
                $content = str_replace('<block v-if="systemStore.siteAddons.includes(\'recharge\')">', '<!-- qiankun_recharge_backup_code --><block v-if="systemStore.siteAddons.includes(\'qiankun_recharge\') && rechargeConfigObj.open == 1">
                <button class="w-[250rpx] h-[70rpx] rounded-[40rpx] text-[26rpx] font-500 !bg-[#fff] !text-[var(--primary-color)] flex-center !m-0 border-[2rpx] border-[var(--primary-color)] border-solid box-border" hover-class="none" shape="circle" @click="redirect({url: \'/addon/qiankun_recharge/pages/recharge/recharge\'})">立即充值</button>
              </block>
              <block v-else-if="systemStore.siteAddons.includes(\'recharge\')">
              <!-- qiankun_recharge_backup_code_end -->
              <!-- qiankun_recharge_backup <block v-if="systemStore.siteAddons.includes(\'recharge\')"> -->', $content);
                // 替换if(systemStore.siteAddons.includes('recharge')) {
                $content = preg_replace('/if\s?\(systemStore.siteAddons.includes\(\'recharge\'\)\)\s?\{/is', '/** qiankun_recharge_backup_code */if (systemStore.siteAddons.includes(\'qiankun_recharge\')) {
          request.get(`qiankun_recharge/config`).then((res: any) => {
            for (let key in res.data) {
              rechargeConfigObj[key] = res.data[key];
            }
          })
        } else if (systemStore.siteAddons.includes(\'recharge\')) { /** qiankun_recharge_backup_code_end */', $content);
            }
            $content = str_replace('<script setup lang="ts">', '<script setup lang="ts">
  import request from "@/utils/request";', $content);
            $content = str_replace('systemStore.siteAddons.includes(\'recharge\') || ', 'systemStore.siteAddons.includes(\'recharge\') || systemStore.siteAddons.includes(\'qiankun_recharge\') || ', $content);
            file_put_contents($balanceFile, $content);
        }
    }

    /**
     * 插件卸载执行
     */
    public function uninstall()
    {
        $balanceFile = app()->getRootPath() . '../uni-app/src/app/pages/member/balance.vue';
        if (is_file($balanceFile)) {
            $content = file_get_contents($balanceFile);
            file_put_contents($balanceFile . '.uninstall.bak', $content); // 备份文件
            $content = preg_replace('/\/\*\* qiankun_recharge_backup_code \*\/.*?\/\*\* qiankun_recharge_backup_code_end \*\//is', 'if(systemStore.siteAddons.includes(\'recharge\')) {', $content);
            $content = preg_replace('/<!-- qiankun_recharge_backup_code -->.*?<!-- qiankun_recharge_backup_code_end -->/is', '', $content);
            $content = str_replace('import request from "@/utils/request";', '', $content);
            $content = str_replace('<!-- qiankun_recharge_backup <block v-if="systemStore.siteAddons.includes(\'recharge\')"> -->', '<block v-if="systemStore.siteAddons.includes(\'recharge\')">', $content);
            $content = str_replace('systemStore.siteAddons.includes(\'recharge\') || systemStore.siteAddons.includes(\'qiankun_recharge\') || ', 'systemStore.siteAddons.includes(\'recharge\') || ', $content);
            file_put_contents($balanceFile, $content);
        }
    }

    /**
     * 插件升级执行
     */
    public function upgrade()
    {
        return true;
    }

}
