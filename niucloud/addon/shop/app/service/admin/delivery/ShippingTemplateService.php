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

namespace addon\shop\app\service\admin\delivery;

use addon\shop\app\model\delivery\ShippingTemplate;
use addon\shop\app\model\delivery\ShippingTemplateItem;
use addon\shop\app\model\goods\Goods;
use core\base\BaseAdminService;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 运费模板服务层
 * Class ShippingTemplateService
 * @package addon\shop\app\service\admin\delivery
 */
class ShippingTemplateService extends BaseAdminService
{

    /**
     * 添加运费模板
     * @param array $data
     * @return void
     */
    public function add(array $data)
    {
        Db::startTrans();
        try {
            $create_res = ( new ShippingTemplate() )->create([
                'template_name' => $data[ 'template_name' ],
                'site_id' => $this->site_id,
                'fee_type' => $data[ 'fee_type' ],
                'create_time' => time(),
                'no_delivery' => $data[ 'no_delivery' ],
                'is_free_shipping' => $data[ 'is_free_shipping' ]
            ]);

            $template_item = [];
            foreach ($data[ 'area' ] as $item) {
                $template_item[] = [
                    'template_id' => $create_res->template_id,
                    'site_id' => $this->site_id,
                    'city_id' => $item[ 'city_id' ],
                    'fee_type' => $data[ 'fee_type' ],
                    'snum' => round(floatval($item[ 'snum' ] ?? 0), 2),
                    'sprice' => round(floatval($item[ 'sprice' ] ?? 0), 2),
                    'xnum' => round(floatval($item[ 'xnum' ] ?? 0), 2),
                    'xprice' => round(floatval($item[ 'xprice' ] ?? 0), 2),
                    'fee_area_ids' => $item[ 'fee_area_ids' ] ?? '',
                    'fee_area_names' => $item[ 'fee_area_names' ] ?? '',
                    'no_delivery' => $data[ 'no_delivery' ],
                    'no_delivery_area_ids' => $item[ 'no_delivery_area_ids' ] ?? '',
                    'no_delivery_area_names' => $item[ 'no_delivery_area_names' ] ?? '',
                    'is_free_shipping' => $data[ 'is_free_shipping' ],
                    'free_shipping_area_ids' => $item[ 'free_shipping_area_ids' ] ?? '',
                    'free_shipping_area_names' => $item[ 'free_shipping_area_names' ] ?? '',
                    'free_shipping_price' => $item[ 'free_shipping_price' ] ?? 0,
                    'free_shipping_num' => $item[ 'free_shipping_num' ] ?? 0,
                ];
            }
            ( new ShippingTemplateItem() )->saveAll($template_item);

            Db::commit();
            return $create_res->template_id;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 编辑运费模板
     * @param array $data
     * @return true
     */
    public function edit(int $template_id, array $data)
    {
        Db::startTrans();
        try {
            ( new ShippingTemplate() )->update([
                'template_name' => $data[ 'template_name' ],
                'fee_type' => $data[ 'fee_type' ],
                'update_time' => time(),
                'no_delivery' => $data[ 'no_delivery' ],
                'is_free_shipping' => $data[ 'is_free_shipping' ]
            ], [ 'template_id' => $template_id, 'site_id' => $this->site_id ]);

            ( new ShippingTemplateItem() )->where([ 'template_id' => $template_id, 'site_id' => $this->site_id ])->delete();
            $template_item = [];
            foreach ($data[ 'area' ] as $item) {
                $template_item[] = [
                    'template_id' => $template_id,
                    'site_id' => $this->site_id,
                    'city_id' => $item[ 'city_id' ],
                    'fee_type' => $data[ 'fee_type' ],
                    'snum' => round(floatval($item[ 'snum' ] ?? 0), 2),
                    'sprice' => round(floatval($item[ 'sprice' ] ?? 0), 2),
                    'xnum' => round(floatval($item[ 'xnum' ] ?? 0), 2),
                    'xprice' => round(floatval($item[ 'xprice' ] ?? 0), 2),
                    'fee_area_ids' => $item[ 'fee_area_ids' ] ?? '',
                    'fee_area_names' => $item[ 'fee_area_names' ] ?? '',
                    'no_delivery' => $data[ 'no_delivery' ],
                    'no_delivery_area_ids' => $item[ 'no_delivery_area_ids' ] ?? '',
                    'no_delivery_area_names' => $item[ 'no_delivery_area_names' ] ?? '',
                    'is_free_shipping' => $data[ 'is_free_shipping' ],
                    'free_shipping_area_ids' => $item[ 'free_shipping_area_ids' ] ?? '',
                    'free_shipping_area_names' => $item[ 'free_shipping_area_names' ] ?? '',
                    'free_shipping_price' => $item[ 'free_shipping_price' ] ?? 0,
                    'free_shipping_num' => $item[ 'free_shipping_num' ] ?? 0,
                ];
            }
            ( new ShippingTemplateItem() )->saveAll($template_item);

            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 删除运费模板
     * @param int $template_id
     * @return true
     */
    public function delete(int $template_id)
    {
        if ((new Goods())->where([ ['delivery_template_id', '=', $template_id]])->count()) throw new CommonException('SHIPPING_TEMPLATE_IN_USE');
        ( new ShippingTemplate() )->where([ 'template_id' => $template_id, 'site_id' => $this->site_id ])->delete();
        ( new ShippingTemplateItem() )->where([ 'template_id' => $template_id, 'site_id' => $this->site_id ])->delete();
        return true;
    }

    /**
     * 查询运费模板列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where)
    {
        $field = 'template_id, template_name, fee_type, create_time, no_delivery, is_free_shipping';
        $search_model = ( new ShippingTemplate() )->where([ ['site_id', '=', $this->site_id] ])->withSearch([ 'template_name' ], $where)->field($field)->order('create_time desc')->append([ 'fee_type_name' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取运费模板列表
     * @param array $where
     * @param string $field
     * @return array
     */
    public function getList(array $where = [], $field = 'template_id, template_name, fee_type, create_time, no_delivery, is_free_shipping')
    {
        $order = "create_time desc";
        return ( new ShippingTemplate() )->where([ ['site_id', '=', $this->site_id] ])->withSearch([ "template_name" ], $where)->field($field)->order($order)->select()->toArray();
    }

    /**
     * 查询运费模板详情
     * @return array
     */
    public function getInfo(int $template_id)
    {
        $field = 'template_id, template_name, fee_type, create_time, no_delivery, is_free_shipping';
        $detail = ( new ShippingTemplate() )->where([ [ 'template_id', '=', $template_id ], ['site_id', '=', $this->site_id] ])->field($field)->append([ 'fee_type_name' ])->findOrEmpty()->toArray();
        if (!empty($detail)) {
            $detail[ 'fee_data' ] = ( new ShippingTemplateItem() )->where([ [ 'template_id', '=', $template_id ], [ 'fee_area_ids', '<>', '' ] ])->field('fee_area_ids as area_ids,fee_area_names,snum,sprice,xnum,xprice')->group('fee_area_ids')->select()->toArray();
            $detail[ 'no_delivery_data' ] = ( new ShippingTemplateItem() )->where([ [ 'template_id', '=', $template_id ], [ 'no_delivery_area_ids', '<>', '' ] ])->field('no_delivery_area_ids as area_ids,no_delivery_area_names')->group('no_delivery_area_ids')->select()->toArray();
            $detail[ 'free_shipping_data' ] = ( new ShippingTemplateItem() )->where([ [ 'template_id', '=', $template_id ], [ 'free_shipping_area_ids', '<>', '' ] ])->field('free_shipping_area_ids as area_ids,free_shipping_area_names,free_shipping_price,free_shipping_num')->group('free_shipping_area_ids')->select()->toArray();
        }
        return $detail;
    }
}
