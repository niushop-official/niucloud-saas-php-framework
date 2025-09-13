<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\dict\channel;

class AppDict
{
    // ********** 平台类型  **************
    const ANDROID = 'android';

    const IOS = 'ios';

    public static function getAppPlatform() {
        return [
            self::ANDROID => 'Android',
//            self::IOS => 'ios'
        ];
    }

    public static function getAppPlatformName($platform) {
        $app_platform = self::getAppPlatform();
        return $app_platform[$platform] ?? '';
    }

    // ********** 版本状态  **************

    const STATUS_UPLOAD_SUCCESS = 'upload_success';

    const STATUS_CREATE_FAIL = 'create_fail';

    const STATUS_PUBLISHED = 'published';

    const STATUS_CREATING = 'creating';

    public static function getStatus() {
        return [
            self::STATUS_UPLOAD_SUCCESS => '上传成功',
            self::STATUS_CREATE_FAIL => '创建失败',
            self::STATUS_PUBLISHED => '已发布',
            self::STATUS_CREATING => '创建中'
        ];
    }

    public static function getStatusName($status) {
        return self::getStatus()[$status] ?? '';
    }

}
