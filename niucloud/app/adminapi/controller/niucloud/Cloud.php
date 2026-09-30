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

namespace app\adminapi\controller\niucloud;

use app\dict\sys\CloudBuildDict;
use app\service\admin\niucloud\BuildVersionService;
use app\service\admin\niucloud\NiucloudService;
use app\service\core\niucloud\CoreCloudBuildService;
use core\base\BaseAdminController;
use core\util\niucloud\CloudService;

/**
 * 云编译
 * Class Cloud
 * @description 云编译
 * @package app\adminapi\controller\niucloud
 */
class Cloud extends BaseAdminController
{
    /**
     * 云编译
     * @description 云编译
     * @return \think\Response
     */
    public function build() {
        $data = $this->request->params([
            [ 'scope', 'all' ],
            [ 'port', [] ],
            [ 'addon', [] ]
        ]);
        return success(data:(new CoreCloudBuildService())->cloudBuild($data));
    }

    /**
     * 获取云编译日志
     * @description 获取云编译日志
     * @return \think\Response
     */
    public function getBuildLog() {
        return success(data:(new CoreCloudBuildService())->getBuildLog());
    }

    /**
     * 获取云编译任务
     * @description 获取云编译任务
     * @return \think\Response
     */
    public function getBuildTask() {
        return success(data:(new CoreCloudBuildService())->getBuildTask());
    }

    /**
     * 清除云编译任务
     * @description 清除云编译任务
     * @return \think\Response
     */
    public function clearBuildTask() {
        $type = request()->param('type', 'cancel');
        $service = new CoreCloudBuildService();
        // 任务完成后清除：记录明确的「完成」步骤；否则按用户取消处理
        if ($type === 'finish') {
            return success(data: $service->finishCloudBuild());
        }
        return success(data: $service->cancelCloudBuild());
    }

    // 编译前环境检测已统一到通用校验（sys/check?scene=cloud_build）
    // CoreCloudBuildService::buildPreCheck() 仍保留，由通用校验服务复用

    /**
     * 获取编译命令配置（编译范围 / 编译端口 / 编译命令）
     * @description 获取编译命令配置
     * @return \think\Response
     */
    public function buildCommand() {
        $config = CloudBuildDict::getBuildConfig();
        $root = rtrim(str_replace('\\', '/', dirname(root_path())), '/');
        $custom_ports = ( new CoreCloudBuildService() )->getCustomPorts();
        foreach ($custom_ports as &$port) {
            $port[ 'command' ] = str_replace('{root}', $root, $port[ 'command' ] ?? '');
        }
        unset($port);
        $config[ 'customPortOptions' ] = $custom_ports;
        return success('SUCCESS', $config);
    }

    /**
     * 编译端口列表（含端口说明与最近一次发版记录）
     * @description 获取编译端口列表
     * @return \think\Response
     */
    public function getBuildPorts() {
        return success(data:( new BuildVersionService() )->getPorts());
    }

    /**
     * 发版记录分页
     * @description 获取发版记录列表
     * @return \think\Response
     */
    public function getVersionList() {
        $data = $this->request->params([
            [ 'port_key', '' ],
            [ 'version', '' ],
            [ 'release_status', '' ],
            [ 'page', 1 ],
            [ 'limit', 10 ],
        ]);
        return success(data:( new BuildVersionService() )->getPage($data));
    }

    /**
     * 切换版本发布状态
     * @description 发布 / 取消发布版本
     * @return \think\Response
     */
    public function setVersionRelease() {
        $data = $this->request->params([
            [ 'id', 0 ],
            [ 'release_status', 0 ],
        ]);
        ( new BuildVersionService() )->setRelease((int) $data[ 'id' ], (int) $data[ 'release_status' ]);
        return success('SET_SUCCESS');
    }

    /**
     * 删除版本记录
     * @description 删除发版记录
     * @return \think\Response
     */
    public function delVersion() {
        $data = $this->request->params([
            [ 'ids', '' ],
        ]);
        ( new BuildVersionService() )->del($data[ 'ids' ]);
        return success('DELETE_SUCCESS');
    }

    /**
     * 连通测试
     * @description 连通测试
     * @return \think\Response
     */
    public function connectTest()
    {
        $data = $this->request->params([
            [ 'url', '' ],
        ]);
        $is_connected = (new CloudService(true, $data['url']))->is_connected;
        return success('SUCCESS',$is_connected);
    }

    /**
     * 设置本地地址
     * @description 连通测试
     * @return \think\Response
     */
    public function setLocalCloudCompileConfig()
    {
        $data = $this->request->params([
            [ 'is_open', 0],
            [ 'url', '' ],
        ]);
        return success('SUCCESS',(new NiucloudService())->setLocalCloudCompileConfig($data));
    }

    /**
     * 获取本地地址
     * @description 连通测试
     * @return \think\Response
     */
    public function getLocalCloudCompileConfig()
    {
        return success('SUCCESS',(new NiucloudService())->getLocalCloudCompileConfig());
    }

}
