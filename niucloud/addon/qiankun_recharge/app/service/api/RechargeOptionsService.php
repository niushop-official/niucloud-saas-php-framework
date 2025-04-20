<?php

namespace addon\qiankun_recharge\app\service\api;

use addon\qiankun_recharge\app\model\options\Options;
use addon\shop\app\model\coupon\Coupon;
use app\model\member\MemberLevel;
use core\base\BaseApiService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

class RechargeOptionsService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Options();
    }

    /**
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getPackageList(): array
    {
        return $this->model->where([
            ['site_id', '=', $this->site_id],
        ])
            ->order('sort desc, id desc')
            ->select()
            ->each(function ($item) {
                $giveCouponIds = $item['give_coupon'] ? explode(',', $item['give_coupon']) : [];
                $item['coupon_id'] = $giveCouponIds;
                $item['give_coupon'] = (new Coupon())->where('id', 'in', $giveCouponIds)->select()->toArray();
                $item['give_level_info'] = (new MemberLevel())->findOrEmpty($item['give_level'])->toArray();
                return $item;
            })
            ->toArray();
    }
}