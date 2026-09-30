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

namespace app\service\core\sys;

use app\dict\sys\StorageDict;
use app\model\sys\SysAttachment;
use app\service\core\upload\CoreFileService;
use app\service\core\upload\CoreStorageService;
use core\base\BaseCoreService;
use core\exception\AdminException;
use core\exception\UploadFileException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 素材管理服务层
 * Class CoreAttachmentService
 * @package app\service\core\sys
 */
class CoreAttachmentService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysAttachment();
    }

    /**
     * 新增素材
     * @param int $site_id
     * @param array $data
     * @return mixed
     */
    public function add(int $site_id, array $data){
        $data['site_id'] = $site_id;
        $attachment = $this->model->create($data);
        if(!$attachment->att_id)
            throw new AdminException('ADD_FAIL');//创建失败
        return $attachment->att_id;
    }

    /**
     * 素材库模型对象
     * @param int $site_id
     * @param int $att_id
     * @return mixed
     */
    public function find(int $site_id, int $att_id){
        $where = array(
            ['site_id', '=', $site_id],
            ['att_id', '=', $att_id]
        );
        $user = $this->model->where($where)->findOrEmpty();
        if ($user->isEmpty())
            throw new AdminException('ATTACHMENT_NOE_EXIST');
        return $user;
    }

    /**
     * 图片列表
     * @param int $site_id
     * @param array|null $data
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getList(int $site_id, ?array $data = []){
        $where = array(
            ['site_id', '=', $site_id]
        );
        $att_ids = $data['att_ids'] ?? [];
        if(!empty($att_ids)){
            $where[] = ['att_id', 'in', $att_ids];
        }
        return $this->model->where($where)->select()->toArray();
    }

    /**
     * 编辑素材
     * @param int $site_id
     * @param int $att_id
     * @param array $data
     * @return SysAttachment
     */
    public function edit(int $site_id, int $att_id, array $data){
        $where = array(
            ['site_id', '=', $site_id],
            ['att_id', '=', $att_id]
        );
        return $this->model->update($data, $where);
    }

    /**
     * 删除素材
     * @param int $site_id
     * @param int $att_id
     * @return mixed
     */
    public function del(int $site_id, int $att_id){
        //查询是否有下级菜单或按钮
        $menu = $this->find($site_id, $att_id);
        return $menu->delete();

    }


    /**
     * 删除附件库中的文件
     * @param int $site_id
     * @param array $att_ids
     * @return true
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function delAll(int $site_id, array $att_ids){
        $core_attachment_service = new CoreAttachmentService();
        $list = $core_attachment_service->getList($site_id, compact('att_ids'));
        if(empty($list))
            throw new UploadFileException('PLEASE_SELECT_IMAGE');

        $del_success_ids = [];
        foreach($list as $v){
            try {
                $file_driver = $this->getAttachmentDriver($site_id, $v);
                //读取上传附件的信息用于后续得校验和数据写入,删除失败直接通过
                $file_driver->delete($v['path']);
            } catch (\Exception $e) {
                // 如果附件在云存储中删除失败后 尝试该资源是否是在平台云存储中
                if ($v['storage_type'] != StorageDict::LOCAL) {
                    try {
                        $file_driver = $this->getAttachmentDriver(0, $v);
                        $file_driver->delete($v['path']);
                    } catch (\Exception $e) {
                        if (!empty($del_success_ids)) {
                            $this->model->destroy($del_success_ids);
                        }
                        throw new UploadFileException($e->getMessage());
                    }
                }
            }
            $del_success_ids[] = $v['att_id'];
        }
        $this->model->destroy($del_success_ids);
        return true;
    }

    /**
     * 获取附件对应的存储驱动
     * 同一存储方式存在多套配置时，优先按附件地址域名精确匹配到具体配置，匹配不到再按存储方式取
     * @param int $site_id
     * @param array $attachment
     * @return mixed
     */
    private function getAttachmentDriver(int $site_id, array $attachment)
    {
        $storage_type = $attachment['storage_type'] ?? '';
        $url = $attachment['url'] ?? '';
        $core_file_service = new CoreFileService();
        if (!empty($url)) {
            $scheme = parse_url($url, PHP_URL_SCHEME);
            $host = parse_url($url, PHP_URL_HOST);
            $url_domain = (!empty($scheme) && !empty($host)) ? $scheme . '://' . $host : '';
            if (!empty($url_domain)) {
                foreach ((new CoreStorageService())->getStorageConfigList($site_id) as $item) {
                    if ($item['storage_type'] != $storage_type) continue;
                    $item_domain = $item['params']['domain'] ?? '';
                    if (!empty($item_domain) && rtrim($item_domain, '/') == rtrim($url_domain, '/')) {
                        $driver_config = $item['params'];
                        $driver_config['storage_type'] = $item['storage_type'];
                        return $core_file_service->driverByConfig($driver_config);
                    }
                }
            }
        }
        return $core_file_service->driver($site_id, $storage_type);
    }
}
