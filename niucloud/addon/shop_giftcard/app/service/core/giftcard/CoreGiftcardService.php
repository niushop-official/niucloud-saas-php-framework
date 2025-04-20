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

namespace addon\shop_giftcard\app\service\core\giftcard;

use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\model\giftcard\Giftcard;
use core\base\BaseCoreService;
use core\exception\CommonException;

/**
 * 礼品卡活动服务层
 * Class CoreGiftcardService
 * @package addon\shop_giftcard\app\service\core\giftcard
 */
class CoreGiftcardService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Giftcard();
    }

    /**
     * 礼品卡制卡数量统计更新
     * @param int $giftcard_id
     * @param int $site_id
     * @param int $num
     * @return bool
     */
    public function updateMakeCardCount($site_id, $giftcard_id, $num)
    {
        $condition = [
            [ 'giftcard_id', "=", $giftcard_id ], [ 'site_id', '=', $site_id ]
        ];
        $count = $this->model->where($condition)->count();
        if ($count == 0) throw new CommonException('', 'GIFTCARD_NOT_FOUND');
        $this->model->where($condition)->inc('make_card_count', $num)->update();

        return true;
    }

    /**
     * 礼品卡制卡数量累减
     * @param int $giftcard_id
     * @param int $site_id
     * @param int $num
     * @return bool
     */
    public function decMakeCardCount($site_id, $giftcard_id, $num)
    {
        $condition = [
            [ 'giftcard_id', "=", $giftcard_id ], [ 'site_id', '=', $site_id ]
        ];
        $giftcard_info = $this->model->field('make_card_count')->where($condition)->findOrEmpty()->toArray();
        if (empty($giftcard_info)) throw new CommonException('', 'GIFTCARD_NOT_FOUND');
        $num = $giftcard_info[ 'make_card_count' ] - $num >= 0 ? $num : 0;
        $this->model->where($condition)->dec('make_card_count', $num)->update();
        return true;
    }

    /**
     * 礼品卡销量更新
     * @param int $giftcard_id
     * @param int $site_id
     * @param int $num
     * @return bool
     */
    public function updateSaleCount($site_id, $giftcard_id, $num)
    {
        $condition = [
            [ 'giftcard_id', "=", $giftcard_id ], [ 'site_id', '=', $site_id ]
        ];
        $count = $this->model->where($condition)->count();
        if ($count == 0) throw new CommonException('', 'GIFTCARD_NOT_FOUND');
        $this->model->where($condition)->inc('sale_count', $num)->update();

        return true;
    }

    /**
     * 礼品卡激活数量更新
     * @param int $giftcard_id
     * @param int $site_id
     * @param int $num
     * @return bool
     */
    public function updateActivateCount($site_id, $giftcard_id, $num)
    {
        $condition = [
            [ 'giftcard_id', "=", $giftcard_id ], [ 'site_id', '=', $site_id ]
        ];
        $count = $this->model->where($condition)->count();
        if ($count == 0) throw new CommonException('', 'GIFTCARD_NOT_FOUND');
        $this->model->where($condition)->inc('activate_count', $num)->update();

        return true;
    }

    /**
     * 礼品卡使用数量更新
     * @param int $giftcard_id
     * @param int $site_id
     * @param int $num
     * @return bool
     */
    public function updateUseCount($site_id, $giftcard_id, $num)
    {
        $condition = [
            [ 'giftcard_id', "=", $giftcard_id ], [ 'site_id', '=', $site_id ]
        ];
        $count = $this->model->where($condition)->count();
        if ($count == 0) throw new CommonException('', 'GIFTCARD_NOT_FOUND');
        $this->model->where($condition)->inc('use_count', $num)->update();

        return true;
    }

    /**
     * 礼品卡使用数量累减
     * @param int $giftcard_id
     * @param int $site_id
     * @param int $num
     * @return bool
     */
    public function decUseCount($site_id, $giftcard_id, $num)
    {
        $condition = [
            [ 'giftcard_id', "=", $giftcard_id ], [ 'site_id', '=', $site_id ]
        ];
        $count = $this->model->where($condition)->count();
        if ($count == 0) throw new CommonException('', 'GIFTCARD_NOT_FOUND');
        $this->model->where($condition)->dec('use_count', $num)->update();

        return true;
    }

    /**
     * 礼品卡作废数量更新
     * @param int $site_id
     * @param int $giftcard_id
     * @param int $num
     * @return bool
     */
    public function updateInvalidCount($site_id, $giftcard_id, $num)
    {
        $condition = [
            [ 'giftcard_id', "=", $giftcard_id ], [ 'site_id', '=', $site_id ]
        ];
        $count = $this->model->where($condition)->count();
        if ($count == 0) throw new CommonException('', 'GIFTCARD_NOT_FOUND');
        $this->model->where($condition)->inc('invalid_count', $num)->update();

        return true;
    }

    /**
     * 获取礼品卡类型
     * @param $type
     * @return array|mixed|string
     */
    public function getType($type)
    {
        return GiftcardDict::getType($type);
    }

    /**
     * 获取礼品卡权益类型
     * @param $type
     * @return array|mixed|string
     */
    public function getCardRightType($type)
    {
        return GiftcardDict::getCardRightType($type);
    }

}
