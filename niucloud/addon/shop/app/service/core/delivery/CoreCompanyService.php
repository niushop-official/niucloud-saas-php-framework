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

namespace addon\shop\app\service\core\delivery;

use addon\shop\app\model\delivery\Company;
use core\base\BaseCoreService;

/**
 * 物流公司相关接口
 */
class CoreCompanyService extends BaseCoreService
{
    /**
     * 添加物流公司
     * @param $site_id
     * @param $data
     * @return bool
     */
    public function add($site_id, $data)
    {
        $data[ 'site_id' ] = $site_id;
        ( new Company() )->create($data);
        return true;
    }

    /**
     * 批量添加物流公司
     * @param $data
     * @return bool
     */
    public function addAll($data)
    {
        ( new Company() )->insertAll($data);
        return true;
    }

    /**
     * 获取物流公司信息
     * @param array $condition
     * @param string $field
     * @return mixed
     */
    public function getInfo(array $condition, $field = 'company_id,company_name,logo,url,express_no,express_no_electronic_sheet,electronic_sheet_switch,print_style,exp_type')
    {
        $info = ( new Company() )->field($field)->where($condition)->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 获取物流公司列表
     * @param array $condition
     * @param string $field
     * @return array
     */
    public function getList(array $condition = [], $field = 'company_id,company_name,logo,url,express_no,express_no_electronic_sheet,electronic_sheet_switch,print_style,exp_type')
    {
        $order = 'create_time desc';
        return ( new Company() )->where($condition)->field($field)->order($order)->select()->toArray();
    }

}
