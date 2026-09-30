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

namespace app\service\admin\addon;

use app\model\sys\FrameworkPatch;
use app\service\core\niucloud\CoreFrameworkPatchService;
use core\base\BaseAdminService;

/**
 * 框架补丁管理（平台端）
 *
 * 列表 / 标记已解决 / 手动同步，均与云端 patch 接口的拉取解耦，
 * 具体拉取与入库逻辑在 CoreFrameworkPatchService。
 */
class FrameworkPatchService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new FrameworkPatch();
    }

    /**
     * 补丁列表
     * @param array $where title / is_resolved
     * @return array
     */
    public function getPage(array $where = []): array
    {
        $field = 'id, patch_id, patch_no, app_key, app_id, app_version, title, description, attach_url, attach_name, attach_size, release_time, framework_version_no, product_key, status, is_push, is_resolved, resolved_time, cloud_resolved, create_time, update_time';

        $model = $this->model->field($field)->order('create_time desc')->append([ 'resolve_name' ]);

        $title = trim((string) ( $where[ 'title' ] ?? '' ));
        if ($title !== '') $model = $model->whereLike('title', '%' . $title . '%');

        // 空字符串表示「全部」，0 / 1 才作为筛选条件
        $resolved = $where[ 'is_resolved' ] ?? '';
        if ($resolved !== '' && $resolved !== null) $model = $model->where('is_resolved', (int) $resolved);

        return $this->pageQuery($model);
    }

    /**
     * 补丁详情
     * @param int $id
     * @return array
     */
    public function getInfo(int $id): array
    {
        $info = $this->model->where([ [ 'id', '=', $id ] ])->append([ 'resolve_name' ])->findOrEmpty();

        return $info->isEmpty() ? [] : $info->toArray();
    }

    /**
     * 标记 / 取消标记「已解决」
     *
     * 只作标记，不影响补丁的推送与列表展示：用户自行记录「是否处理过」。
     *
     * @param int $id
     * @param int $resolved 1 已解决 / 0 未解决
     * @return void
     */
    public function resolve(int $id, int $resolved): void
    {
        ( new CoreFrameworkPatchService() )->resolve($id, $resolved);
    }

    /**
     * 手动同步云端补丁
     * @return array [ total, new ]
     */
    public function sync(): array
    {
        return ( new CoreFrameworkPatchService() )->sync();
    }
}
