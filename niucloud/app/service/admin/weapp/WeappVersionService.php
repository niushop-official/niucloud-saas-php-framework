<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\admin\weapp;

use app\dict\sys\CloudDict;
use app\dict\sys\TaskDict;
use app\service\core\site\CoreSiteService;
use app\service\core\weapp\CoreWeappCloudService;
use app\service\core\weapp\CoreWeappConfigService;
use app\service\core\weapp\CoreWeappService;
use core\base\BaseAdminService;
use app\model\weapp\WeappVersion;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 小程序包版本发布
 */
class WeappVersionService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new WeappVersion();
    }

    /**
     * 添加小程序版本
     * @param array $data
     */
    public function add(array $data)
    {
        $uploading = $this->model->where([['site_id', '=', $this->site_id], ['status', '=', 0]])->field('id')->findOrEmpty();
        if (!$uploading->isEmpty()) throw new CommonException('WEAPP_UPLOADING');
        if (empty($data['version'])) {
            $version_no = $this->model->where([['site_id', '=', $this->site_id]])->order('version_no desc')->field('version_no')->findOrEmpty()->toArray()['version_no'] ?? 0;
            $version_no += 1;
            $version = "1.0.{$version_no}";
        }else{
            $version_no = 0;//自定义的version_no标记为0 不因自定义版本打断默认的连续性
            $version = $data['version'];
        }
        $upload_res = (new CoreWeappCloudService())->setConfig(function () {
            $config = (new CoreWeappConfigService())->getWeappConfig($this->site_id);
            return [
                'app_id' => $config['app_id'],
                'upload_private_key' => $config['upload_private_key'],
                'addon' => (new CoreSiteService())->getAddonKeysBySiteId($this->site_id)
            ];
        })->uploadWeapp([
            'site_id' => $this->site_id,
            'version' => $version,
            'desc' => $data['desc'] ?? ''
        ]);

        $res = $this->model->create([
            'site_id' => $this->site_id,
            'version' => $version,
            'version_no' => $version_no,
            'desc' => $data['desc'] ?? '',
            'create_time' => time(),
            'task_key' => $upload_res['key']
        ]);
        return $res->id;
    }

    public function getPreviewImage()
    {
        try {
            $version = $this->model->where([['site_id', '=', $this->site_id]])->order('id desc')->findOrEmpty();
            if (!$version->isEmpty() || in_array($version['status'], [CloudDict::APPLET_UPLOAD_SUCCESS, CloudDict::APPLET_AUDITING])) {
                if ($version['from_type'] == 'cloud_build') {
                    return (new CoreWeappCloudService())->getWeappPreviewImage((string) ($version['task_key'] ?? ''));
                } else {
                    return image_to_base64((new CoreWeappService())->getWeappPreviewImage($this->site_id), true);
                }
            }
        } catch (\Exception $e) {
            return '';
        }
    }

    /**
     * 获取小程序版本列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id, version, version_no, desc, create_time, status, fail_reason, task_key, source_zip';
        $order = 'create_time desc';
        $where[] = ['site_id', '=', $this->site_id];
        $search_model = $this->model->where($where)->field($field)->order($order)->append(['status_name']);
        $list = $this->pageQuery($search_model);
        $list['version_info'] = (new CoreWeappService())->getWeappVersion($this->site_id);

        // 补齐每条记录对应的「发布任务标识」：上传失败时页面据此打开任务详情查看完整日志
        $list['data'] = $this->appendUploadTaskKey($list['data']);

        return $list;
    }

    /**
     * 补齐发布任务标识
     *
     * 版本记录的 task_key 在上传成功后会被回写为「云端编译标识」（删除记录时要用它停止云端上传），
     * 因此不能直接拿它定位任务。这里按任务入参中的 version_id 反查本站点的小程序发布任务。
     *
     * 查不到（任务记录已被清理 / 改造前创建的历史记录）时返回空串，前端回退为「失败原因」弹窗。
     *
     * @param array $rows 版本记录
     * @return array
     */
    protected function appendUploadTaskKey(array $rows): array
    {
        if (empty($rows)) return $rows;

        $map = [];
        try {
            $tasks = Db::name('sys_task')
                ->where([ [ 'task_type', '=', TaskDict::TYPE_WEAPP_UPLOAD ], [ 'site_id', '=', $this->site_id ] ])
                ->field('task_key, params')
                ->order('id desc')
                ->limit(200)
                ->select()->toArray();

            foreach ($tasks as $task) {
                $params    = json_decode((string) ( $task[ 'params' ] ?? '' ), true);
                $versionId = (int) ( $params[ 'version_id' ] ?? 0 );

                // 同一版本可能重试过多次，取最新的一条任务
                if ($versionId > 0 && !isset($map[ $versionId ])) $map[ $versionId ] = (string) ( $task[ 'task_key' ] ?? '' );
            }
        } catch (\Throwable $e) {
            return $rows;
        }

        foreach ($rows as &$row) {
            $row[ 'upload_task_key' ] = $map[ (int) ( $row[ 'id' ] ?? 0 ) ] ?? '';
        }
        unset($row);

        return $rows;
    }

    /**
     * 编辑
     * @param int $id
     * @param array $data
     * @return true
     */
    public function edit(int $id, array $data)
    {
        $data['status'] = 0;
        $data['update_time'] = time();
        $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->create($data);
        return true;
    }

    /**
     * 删除
     * @param int $id
     * @return true
     */
    public function del(int $id)
    {
        $info = $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->findOrEmpty();
        if ($info->isEmpty()) throw new CommonException('WEAPP_VERSION_NOT_EXIST');
        if ($info['from_type'] == 'cloud_build') {
            try{
                $this->stopUpload($info['task_key']);
            }catch(\Throwable $e){
                \think\facade\Log::write("停止小程序版本上传捕获错误：".$e->getMessage());
            }
        }
        // 同步删除该版本保留的源码包（回退用的包），避免磁盘残留
        $this->deleteSourceZip((string) ($info['source_zip'] ?? ''));

        $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->delete();
        return true;
    }

    /**
     * 删除版本保留的源码包
     *
     * 只允许删除 runtime/backup/weapp/ 下的文件：路径来自数据库登记，
     * 仍需做目录校验，避免传入任意文件被误删。
     *
     * @param string $zip
     * @return void
     */
    protected function deleteSourceZip(string $zip): void
    {
        if ($zip === '') return;

        try {
            $root = realpath(task_runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'weapp');
            $real = realpath($zip);

            if ($root === false || $real === false) return;
            if (strpos($real, $root . DIRECTORY_SEPARATOR) !== 0) return;
            if (!is_file($real)) return;

            @unlink($real);

            // 所在目录只存放本次上传的源码包，空了就一并清理
            $dir = dirname($real);
            if (is_dir($dir) && count(@scandir($dir) ?: []) <= 2) @rmdir($dir);
        } catch (\Throwable $e) {
            // 清理失败不影响记录删除
        }
    }

    /**
     * 获取小程序上传日志（并据编译状态回写版本状态）
     * @param string $key 云端编译任务标识
     * @return mixed
     */
    public function getUploadLog(string $key)
    {
        $build_log = (new CoreWeappCloudService())->getWeappCompileLog($key);
        $status = (new CoreWeappCloudService())->getWeappCompileStatus($key);

        file_put_contents(runtime_path() . 'debug_log.txt',
            date('Y-m-d H:i:s') . " | key: $key | pending: {$status['pending']} | failed: {$status['failed']} | percent: {$status['percent']} | message: {$status['message']}\n",
            FILE_APPEND);

        if ($status['failed']) {
            $res = (new WeappVersion())->where(['task_key' => $key])->update([
                'status'      => CloudDict::APPLET_UPLOAD_FAIL,
                'fail_reason' => $status['message'] ?? '',
                'update_time' => time()
            ]);
            file_put_contents(runtime_path() . 'debug_log.txt', date('Y-m-d H:i:s') . " | fail update result: $res\n", FILE_APPEND);
        } elseif (!$status['pending'] && $status['percent'] >= 100) {
            $res = (new WeappVersion())->where(['task_key' => $key])->update([
                'status'      => CloudDict::APPLET_UPLOAD_SUCCESS,
                'update_time' => time()
            ]);
            file_put_contents(runtime_path() . 'debug_log.txt', date('Y-m-d H:i:s') . " | success update result: $res\n", FILE_APPEND);
        }

        return $build_log;
    }

    /**
     * 直接获取小程序上传日志（不更新状态）
     * @param string $key
     * @return null
     */
    public function getUploadLogOnly(string $key)
    {
        return (new CoreWeappCloudService())->getWeappCompileLog($key);
    }

    /**
     * 获取小程序上传日志
     * @param string $key
     * @return null
     */
    public function stopUpload(string $key)
    {
        return  (new CoreWeappCloudService())->stopUploadAndClearLogs($key);

    }
}
