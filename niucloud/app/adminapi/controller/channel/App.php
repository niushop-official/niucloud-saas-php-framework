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

namespace app\adminapi\controller\channel;

use app\dict\channel\AppDict;
use app\service\admin\channel\AppService;
use app\service\admin\channel\H5Service;
use core\base\BaseAdminController;
use think\Response;

/**
 * app端配置
 * Class H5
 * @package app\adminapi\controller\channel
 */
class App extends BaseAdminController
{
    /**
     * 获取APP配置信息
     * @description 获取APP配置信息
     * @return Response
     */
    public function get()
    {
        return success((new AppService())->getConfig());
    }

    /**
     * 设置APP配置信息
     * @description 设置APP配置信息
     * @return Response
     */
    public function set()
    {
        $data = $this->request->params([
            ['wechat_app_id', ""],
            ['wechat_app_secret', ""],
            ['android_app_key', ''],
            ['application_id', ''],
            ['uni_app_id', ''],
            ['app_name', '']
        ]);
        (new AppService())->setConfig($data);
        return success('SET_SUCCESS');
    }

    public function versionList() {
        $data = $this->request->params([
            ["platform",""],
        ]);
        return success((new AppService())->getVersionPage($data));
    }

    public function versionInfo($id) {
        return success((new AppService())->getVersionInfo($id));
    }

    /**
     * 添加app版本
     * @description 添加app版本
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
            ["version_code",""],
            ["version_name",""],
            ["version_desc",""],
            ["platform",""],
            ["is_forced_upgrade",0],
            ["package_path", ""],
            ["package_type", ""],
            ["build", []],
            ["cert", []],
            ["upgrade_type", ""],
        ]);
        $id = (new AppService())->addVersion($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * app版本管理编辑
     * @description 编辑app版本
     * @param $id  app版本id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
            ["version_code",""],
            ["version_name",""],
            ["version_desc",""],
            ["platform",""],
            ["is_forced_upgrade",0],
            ["package_path", ""],
            ["package_type", ""],
            ["build", []],
            ["cert", []],
            ["upgrade_type", ""],
        ]);
        (new AppService())->editVersion($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * app版本管理删除
     * @description 删除app版本
     * @param $id  app版本id
     * @return \think\Response
     */
    public function del(int $id){
        (new AppService())->delVersion($id);
        return success('DELETE_SUCCESS');
    }

    public function appPlatform() {
        return success(AppDict::getAppPlatform());
    }

    /**
     * 获取app生成日志
     */
    public function buildLog(string $key) {
        return success((new AppService())->getBuildLog($key));
    }

    /**
     * 发布
     * @description 发布
     * @param $id  app版本id
     * @return \think\Response
     */
    public function release(int $id) {
        (new AppService())->release($id);
        return success('RELEASE_SUCCESS');
    }

    public function generateSingCert() {
        $data = $this->request->params([
            ['key_alias', ''],
            ['key_password', ''],
            ['store_password', ''],
            ['limit', 30],
            ['cn', ''],
            ['o', ''],
            ['ou', ''],
            ['c', ''],
            ['st', ''],
            ['l', ''],
        ]);
        return success(data:(new AppService())->generateSingCert($data));
    }
}
