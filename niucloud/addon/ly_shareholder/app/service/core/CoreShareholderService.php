<?php

namespace addon\ly_shareholder\app\service\core;

use addon\ly_shareholder\app\dict\shareholder\ShareholderDict;
use addon\ly_shareholder\app\model\Shareholder;
use addon\ly_shareholder\app\model\ShareholderLevel;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\Order;
use app\model\member\Member;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\Model;
use think\facade\Db;


/**
 * 股东
 */
class CoreShareholderService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Shareholder();
    }

    /**
     * 查询股东(有效的)
     * @param $site_id
     * @param $member_id
     * @return Shareholder|array|mixed|Model
     */
    public function findOfAction($site_id, $member_id)
    {
        return $this->model->where(
            [
                ['site_id', '=', $site_id],
                ['member_id', '=', $member_id],
                ['status', '=', ShareholderDict::NORMAL]
            ]
        )->findOrEmpty();
    }

    /**
     * 添加股东
     * @param $site_id
     * @param $member_id
     * @return true
     */

    public function add($site_id, $member_id, $level_id)
    {

         $level = (new ShareholderLevel())::where(['site_id' => $site_id, 'level_id' => $level_id])->findOrEmpty();

        if ($level->isEmpty()) throw new CommonException('LY_SHAREHOLDER_PLEASE_SELECT_SHAREHOLDER_LEVEL');

        //判断股东是否是否是有效的会员
        $member = (new Member())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->findOrEmpty();
        if($member->isEmpty()) throw new CommonException('LY_SHAREHOLDER_PLEASE_SELECT_MEMBER');

        $shareholder = (new Shareholder())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->findOrEmpty();
        if(!$shareholder->isEmpty()) throw new CommonException('LY_SHAREHOLDER_ALREADY_SHAREHOLDER');
 

        //增加股东
        $insert_data = [
            'site_id' => $site_id,
            'member_id' => $member_id,
            'level_id' => $level_id,
            'shareholder_no' => "NO" . (100000 + $member_id),
            'status' => ShareholderDict::NORMAL,
        ];
        $this->model->create($insert_data);
    }

    /**
     * @param $site_id
     * @param $member_id
     */
    public function find($site_id, $member_id)
    {
        return $this->model->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->findOrEmpty();
    }


    /**
     * 累增股东相关分红数据
     * @param int $site_id
     * @param int $member_id
     * @param int|float $number
     * @param string $type
     * @return true
     */
    public function incFenhong(int $site_id, int $member_id, int|float $number, string $type)
    {
        $data = [];
        switch ($type) {
            case 'shareholder_fenhong':
                $data['amount'] = Db::raw('amount + ' . $number);
                // $data['amount_get'] = Db::raw('amount_get + ?', [$number]);
                break;     
        }
        if (!empty($data)) {
            (new Shareholder())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->update($data);
        }
        return true;
    }

    /**
     * 累减股东相关分红数据
     * @param int $site_id
     * @param int $member_id
     * @param int|float $number
     * @param string $type
     * @return true
     */
    public function minFenhong(int $site_id, int $member_id, int|float $number, string $type){
        
        $data = [];
        switch ($type) {
            case 'shareholder_tixian':
                $data['amount_cash_outing'] = Db::raw('amount_cash_outing - ? $number ' );
                break;
        }
        
        if (!empty($data)) {
            (new Shareholder())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->update($data);
        }
        
        return true;
    }
    

}
