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

namespace addon\shop\app\model\goods;

use app\dict\sys\FileDict;
use core\base\BaseModel;

/**
 * 商品数据统计模型
 * Class Label
 * @package addon\shop\app\model\Stat
 */
class Stat extends BaseModel
{
    protected $autoWriteTimestamp = false;

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_goods_stat';

    //类型
    protected $type = [
        'date_time' => 'timestamp',
    ];

    /**
     * 关联默认商品
     * @return \think\model\relation\HasOne
     */
    public function goods()
    {
        return $this->hasOne(Goods::class, 'goods_id', 'goods_id');
    }

    /**
     * 获取封面缩略图（小）
     */
    public function getGoodsCoverThumbSmallAttr($value, $data)
    {
        if (isset($data[ 'goods_cover' ]) && $data[ 'goods_cover' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'goods_cover' ], FileDict::SMALL);
        }
        return [];
    }

}
