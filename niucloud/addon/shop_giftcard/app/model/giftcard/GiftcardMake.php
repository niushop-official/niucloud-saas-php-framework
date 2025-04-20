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

namespace addon\shop_giftcard\app\model\giftcard;

use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardMakeDict;
use core\base\BaseModel;

/**
 * 礼品卡实体制作模型
 * Class GiftcardMake
 * @package addon\shop_giftcard\app\model\giftcard
 */
class GiftcardMake extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'make_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_giftcard_make';

    // 设置json类型字段
    protected $json = [ 'balance_json', 'output', 'fail_output' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 获取礼品卡权益类型名称
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getCardRightTypeNameAttr($value, $data)
    {
        return GiftcardDict::getCardRightType($data[ 'card_right_type' ])[ 'name' ] ?? '';
    }

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if (!empty($data[ 'status' ])) {
            return GiftcardMakeDict::getStatusList($data[ 'status' ]) ?? '';
        }
        return '';
    }

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getMakeCardWayNameAttr($value, $data)
    {
        if (!empty($data[ 'make_card_way' ])) {
            return GiftcardMakeDict::getMakeCardWayList($data[ 'make_card_way' ]) ?? '';
        }
        return '';
    }

    /**
     * 搜索器:礼品卡实体制卡记录id
     * @param $value
     * @param $data
     */
    public function searchMakeIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("make_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡活动id
     * @param $value
     * @param $data
     */
    public function searchGiftcardIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("giftcard_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡实体制卡方式 auto：手动，import：导入
     * @param $value
     * @param $data
     */
    public function searchMakeCardWayAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("make_card_way", $value);
        }
    }

}
