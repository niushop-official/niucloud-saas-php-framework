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

namespace app\service\api\member;

use app\job\member\MemberGiftGrantJob;
use app\model\member\MemberSign;
use app\service\core\member\CoreMemberService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseApiService;
use core\exception\CommonException;
use think\db\exception\DbException;
use think\facade\Db;
use DateInterval;
use DateTime;
use DatePeriod;

/**
 * 会员签到服务层
 * Class BaseService
 * @package app\service
 */
class MemberSignService extends BaseApiService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberSign();
    }

    /**
     * 会员签到记录
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $where['member_id'] = $this->member_id;
        $where['site_id'] = $this->site_id;
        $field = 'sign_id, site_id, member_id, days, day_award, continue_award, continue_tag, create_time, is_sign';
        $search_model = $this->model->where($where)->field($field)->append(['is_sign_name'])->order('create_time desc');
        return $this->pageQuery($search_model);
    }

    /**
     * 会员签到详情
     * @param int $sign_id
     * @return array
     */
    public function getInfo(int $sign_id)
    {
        $field = 'sign_id, site_id, member_id, days, day_award, continue_award, continue_tag, create_time, is_sign';
        return $this->model->where([['sign_id', '=', $sign_id], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->field($field)->append(['is_sign_name'])->findOrEmpty()->toArray();
    }

    /**
     * 签到
     * @return array
     */
    public function sign()
    {

        $sign_config = $this->getSign();
        if (!$sign_config['is_use']) throw new CommonException('SIGN_NOT_USE');
        if (empty($sign_config['sign_period']) || empty($sign_config['day_award'])) throw new CommonException('SIGN_NOT_SET');
        $sign_period = $sign_config['sign_period'];//签到周期
        $today = $this->model->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->whereDay('create_time')->findOrEmpty()->toArray();
        if (!empty($today)) throw new CommonException('SIGNED_TODAY');
        Db::startTrans();

        try {
            $yesterday = $this->model->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->whereDay('create_time', 'yesterday')->findOrEmpty()->toArray();
            if ($yesterday) {
                $days = $yesterday['days'];
                $days++;
                if ($days > $sign_period) { //连签天数大于签到周期，连签天数重置为1
                    $days = 1;
                    $data['start_time'] = time();
                }
                if (!empty($sign_config['continue_award'])) {
                    $continue_signs = array_column($sign_config['continue_award'], 'continue_sign');
                    //获取连签奖励最大天数
                    $max_continue_sign = max($continue_signs);
                    if ($max_continue_sign < $sign_period && $days > $max_continue_sign) { //连签奖励最大天数 小于 签到周期 并且 连签天数 大于 连签奖励最大天数 连签天数重置为1
                        $days = 1;
                    }
                }
            } else { //断签，连签天数重置为1
                $days = 1;
                $data['start_time'] = time();
            }

            $awards = [];        //奖励数组
            $continue_text = ''; //连签提示

            //添加签到记录
            $data['site_id'] = $this->site_id;
            $data['member_id'] = $this->member_id;
            $data['days'] = $days;
            $data['day_award'] = $sign_config['day_award'];
            $data['is_sign'] = 1;
            $data['create_time'] = time();
            $res = $this->model->create($data);
            if ($res) {
                //日签奖励发放
                MemberGiftGrantJob::dispatch([
                    'site_id' => $this->site_id,
                    'member_id' => $this->member_id,
                    'gift' => $sign_config['day_award'],
                    'param' => [
                        'from_type' => 'day_sign_award',
                        'memo' => '日签奖励'
                    ]
                ]);
                $awards['day_award'] = $sign_config['day_award'];

                //签到成功后判断连签天数是否满足连签奖励发放条件
                if (!empty($sign_config['continue_award'])) {
                    foreach ($sign_config['continue_award'] as $key => $value) {
                        $continue_sign = intval($value['continue_sign']);//连续签到天数要求
                        //如果连签天数满足配置条件，发放连签奖励
                        if ($res->days == $continue_sign) {
                            $gifts = $value;
                            unset($gifts['continue_sign'], $gifts['continue_tag'], $gifts['receive_limit'], $gifts['receive_num']);

                            $continue_data['continue_award'] = $value;
                            $continue_data['continue_tag'] = $value['continue_tag'];//连签奖励标识
                            if ($value['receive_limit'] == 2) {//receive_limit (1.不限制 2.每人限领 receive_num 次)
                                //周期开始时间
                                $period_start_time = $this->model->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id], ['days', '=', 1], ['start_time', '>', 0]])->order('sign_id desc')->field('start_time')->limit(1)->value('start_time');
                                //周期结束时间
                                $period_end_time = strtotime("+$sign_period day", $period_start_time);
                                //查询领取次数
                                $receive_count = $this->model
                                    ->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id], ['continue_tag', '=', $value['continue_tag']]])
                                    ->whereBetweenTime('create_time', $period_start_time, $period_end_time)->count('sign_id');
                                if ($receive_count < $value['receive_num']) {
                                    //连签奖励发放
                                    MemberGiftGrantJob::dispatch([
                                        'site_id' => $this->site_id,
                                        'member_id' => $this->member_id,
                                        'gift' => $gifts,
                                        'param' => [
                                            'from_type' => 'continue_sign_award',
                                            'memo' => '连签奖励'
                                        ]
                                    ]);
                                    $awards['continue_award'] = $gifts;
                                    $continue_text = get_lang('CONTINUE_SIGN').$res->days.get_lang('DAYS');
                                    //更新连签发放记录
                                    $this->model->where([['sign_id', '=', $res->sign_id]])->update($continue_data);
                                }
                            } else { //不限制
                                //连签奖励发放
                                MemberGiftGrantJob::dispatch([
                                    'site_id' => $this->site_id,
                                    'member_id' => $this->member_id,
                                    'gift' => $gifts,
                                    'param' => [
                                        'from_type' => 'continue_sign_award',
                                        'memo' => '连签奖励'
                                    ]
                                ]);
                                $awards['continue_award'] = $gifts;
                                $continue_text = get_lang('CONTINUE_SIGN').$res->days.get_lang('DAYS');
                                //更新连签发放记录
                                $this->model->where([['sign_id', '=', $res->sign_id]])->update($continue_data);
                            }
                        }
                    }
                }
            }
            Db::commit();
            $awards_total = $this->getTotalAward($awards);
            $result['title'] = get_lang('SIGN_SUCCESS');
            $result['info'] = $continue_text.get_lang('GET_AWARD');
            $result['awards'] = $awards_total;
            if ($awards_total) {
                return $result;
            } else {
                return [
                    'title' => '',
                    'info' => '',
                    'awards' => [],
                ];
            }

        } catch (DbException $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }

    }

    /**
     * 获取月签到数据
     * @param int $year
     * @param int $month
     * @return array
     */
    public function getSignInfo(int $year, int $month)
    {
        $data = [];
        $info = $this->getSign();
        if ($info['is_use'] == 1) {//判断签到是否开启
            $model_result = $this->model->field('create_time')->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->whereMonth('create_time', $year . '-' . sprintf("%02d", $month))->select();
            $days = [];
            foreach ($model_result as $key => $value) {
                $day = date('d', strtotime($value['create_time']));
                array_push($days, $day);
            }
            $data['days'] = $days;
            if (!empty($info['sign_period']) && !empty($info['continue_award'])) {//判断签到周期和连签奖励是否设置
                $sign_period = $info['sign_period'];//签到周期

                $continue_signs = array_column($info['continue_award'], 'continue_sign');
                //获取连签奖励最大天数
                $max_continue_sign = max($continue_signs);
                //周期开始时间
                $period_start_time = $this->model->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id], ['days', '=', 1], ['start_time', '>', 0]])->order('sign_id desc')->field('start_time')->limit(1)->value('start_time');
                if (!empty($period_start_time)) {
                    //周期结束时间
                    $period_end_time = strtotime("+$sign_period day", $period_start_time);
                    //获取两个时间戳之间的天数组
                    $days_array = $this->getDaysArray($period_start_time, $period_end_time);
                    foreach ($days_array as $key => $value) {
                        $day = $key + 1;
                        foreach ($info['continue_award'] as $k => $v) {
                            if ($v['receive_limit'] == 1) {//不限制次数奖励添加
                                $period_num = intdiv($sign_period, $max_continue_sign);//周期内可循环轮次
                                for ($i = 0; $i < $period_num; $i++) {
                                    if ($max_continue_sign * $i + $v['continue_sign'] == $day) {
                                        $data['period'][$key]['award'] = true;
                                    }
                                }
                            } else {//限制次数奖励添加
                                for ($i = 0; $i < $v['receive_num']; $i++) {
                                    if ($max_continue_sign * $i + $v['continue_sign'] == $day) {
                                        $data['period'][$key]['award'] = true;
                                    }
                                }
                            }
                        }
                        $data['period'][$key]['day'] = $value;
                    }
                } else {
                    $data['period'] = [];
                }
            } else {
                $data['period'] = [];
            }
        }
        return $data;
    }

    /**
     * 获取日签到奖励
     * @param int $year
     * @param int $month
     * @param int $day
     * @return array
     */
    public function getDayAward(int $year, int $month, int $day)
    {
        $max_continue_sign = 1;//连签奖励最大天数
        $continue_sign_day = 0;//连签奖励天数

        $time = $year.'-'.sprintf("%02d", $month).'-'.sprintf("%02d", $day);
        $info = $this->getSign();
        if (!$info['is_use']) throw new CommonException('SIGN_NOT_USE');
        if (empty($info['sign_period']) || empty($info['day_award'])) throw new CommonException('SIGN_NOT_SET');
        $sign_period = $info['sign_period'];//签到周期
        if (!empty($info['continue_award'])) {
            $continue_signs = array_column($info['continue_award'], 'continue_sign');
            //获取连签奖励最大天数
            $max_continue_sign = max($continue_signs);
        }
        //周期开始时间
        $period_start_time = $this->model->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id], ['days', '=', 1], ['start_time', '>', 0]])->order('sign_id desc')->field('start_time')->limit(1)->value('start_time');
        //周期结束时间
        $period_end_time = strtotime("+$sign_period day", $period_start_time);
        //获取两个时间戳之间的天数组
        $days_array = $this->getDaysArray($period_start_time, $period_end_time);
        $award = [];//当日奖励
        //判断查询日期是否在签到周期内
        if (in_array($time, $days_array)) {
            $counter = 0;//计数器
            foreach ($days_array as $key => $value) {
                $counter++;
                if ($value == $time) {

                    $continue_sign_day = $counter;
                    $award['day_award'] = $info['day_award'];

                    if (!empty($info['continue_award'])) {
                        $days = $key + 1;
                        foreach ($info['continue_award'] as $k => $v) {
                            $gift = $v;
                            unset($gift['continue_sign'], $gift['continue_tag'], $gift['receive_limit'], $gift['receive_num']);
                            if ($v['receive_limit'] == 1) {//不限制次数奖励添加
                                $period_num = intdiv($sign_period, $max_continue_sign);//周期内可循环轮次
                                for ($i = 0; $i < $period_num; $i++) {
                                    if ($max_continue_sign * $i + $v['continue_sign'] == $days) {
                                        $award['continue_award'] = $gift;
                                    }
                                }
                            } else {//限制次数奖励添加
                                for ($i = 0; $i < $v['receive_num']; $i++) {
                                    if ($max_continue_sign * $i + $v['continue_sign'] == $days) {
                                        $award['continue_award'] = $gift;
                                    }
                                }
                            }
                        }
                    }

                }
                if (!empty($info['continue_award'])) {
                    if ($counter % $max_continue_sign == 0) {
                        $counter = 0;
                    }
                } else {
                    if ($counter % $sign_period == 0) {
                        $counter = 0;
                    }
                }
            }
        } else {
            $day_result = $this->model->field('create_time')->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->whereDay('create_time', $time)->findOrEmpty()->toArray();
            if (!empty($day_result)) {
                $award['day_award'] = $day_result['day_award'];
                $continue_award = $day_result['continue_award'];
                if (!empty($continue_award)) {
                    unset($continue_award['continue_sign'], $continue_award['continue_tag'], $continue_award['receive_limit'], $continue_award['receive_num']);
                    $award['continue_award'] = $continue_award;
                }
            }
        }
        $awards_total = $this->getTotalAward($award);
        $continue_text = $continue_sign_day > 0 ? get_lang('CONTINUE_SIGN').$continue_sign_day.get_lang('DAYS') : '';
        $result['title'] = get_lang('SIGN_AWARD');
        $result['info'] = $continue_text.get_lang('WILL_GET_AWARD');
        $result['awards'] = $awards_total;
        if ($awards_total) {
            return $result;
        } else {
            return [
                'title' => '',
                'info' => '',
                'awards' => [],
            ];
        }
    }

    /**
     * 获取合并奖励数据
     * @param $awards
     * @return array|null
     */
    private function getTotalAward($awards)
    {
        $total_point = 0;
        $total_balance = 0;
        $coupon_id = [];
        $coupon_list = [];

        $is_use_point_day = false;
        $is_use_point_continue = false;

        $is_use_balance_day = false;
        $is_use_balance_continue = false;

        $is_use_coupon_day = false;
        $is_use_coupon_continue = false;

        if (!empty($awards['day_award']['point'])) {
            if ($awards['day_award']['point']['is_use'] == 1) {
                $is_use_point_day = true;
                $total_point += intval($awards['day_award']['point']['num']);
            }
        }
        if (!empty($awards['day_award']['balance'])) {
            if ($awards['day_award']['balance']['is_use'] == 1) {
                $is_use_balance_day = true;
                $total_balance += floatval($awards['day_award']['balance']['money']);
            }
        }
        if (!empty($awards['day_award']['shop_coupon'])) {
            if ($awards['day_award']['shop_coupon']['is_use'] == 1) {
                $is_use_coupon_day = true;
                $coupon_id = array_merge($coupon_id, $awards['day_award']['shop_coupon']['coupon_id']);
                $coupon_list = $this->getArrayMerge($coupon_list, $awards['day_award']['shop_coupon']['coupon_list']);
            }
        }
        if (!empty($awards['continue_award'])) {
            if (!empty($awards['continue_award']['point'])) {
                if ($awards['continue_award']['point']['is_use'] == 1) {
                    $is_use_point_continue = true;
                    $total_point += intval($awards['continue_award']['point']['num']);
                }
            }
            if (!empty($awards['continue_award']['balance'])) {
                if ($awards['continue_award']['balance']['is_use'] == 1) {
                    $is_use_balance_continue = true;
                    $total_balance += floatval($awards['continue_award']['balance']['money']);
                }
            }
            if (!empty($awards['continue_award']['shop_coupon'])) {
                if ($awards['continue_award']['shop_coupon']['is_use'] == 1) {
                    $is_use_coupon_continue = true;
                    $coupon_id = array_merge($coupon_id, $awards['continue_award']['shop_coupon']['coupon_id']);
                    $coupon_list = $this->getArrayMerge($coupon_list, $awards['continue_award']['shop_coupon']['coupon_list']);
                }
            }
        }
        $coupon_id = array_unique($coupon_id);
        $is_use_point = ($is_use_point_day || $is_use_point_continue) ? 1 : 0;
        $is_use_balance = ($is_use_balance_day || $is_use_balance_continue) ? 1 : 0;
        $is_use_coupon = ($is_use_coupon_day || $is_use_coupon_continue) ? 1 : 0;
        $coupon_check_data = array_filter(event('CouponCheck', ['site_id' => $this->site_id, 'is_use_coupon' => $is_use_coupon, 'coupon_id' => $coupon_id, 'coupon_list' => $coupon_list]))[0] ?? [];
        if (empty($coupon_check_data)) {
            $is_use_coupon = false;
            $coupon_check_data = [
                'coupon_id' => [],
                'coupon_list' => []
            ];
        }
        $is_use_coupon = empty($coupon_check_data['coupon_id']) ? false : $is_use_coupon;
        //相同奖励合并
        $awards_total = [
            'point' => [
                'is_use' => $is_use_point,
                'num' => $total_point,
            ],
            'balance' => [
                'is_use' => $is_use_balance,
                'money' => $total_balance,
            ],
            'shop_coupon' => [
                'is_use' => $is_use_coupon,
                'coupon_id' => $coupon_check_data['coupon_id'],
                'coupon_list' => $coupon_check_data['coupon_list'],
            ]
        ];
        return (new CoreMemberService())->getGiftContent($this->site_id, $awards_total, 'member_sign');
    }

    /**
     * 获取用户签到设置
     * @return array
     */
    public function getSignConfig()
    {
        $info = $this->getSign();
        $today = $this->model->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->whereDay('create_time')->findOrEmpty()->toArray();
        $yesterday = $this->model->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->whereDay('create_time', 'yesterday')->findOrEmpty()->toArray();
        if (!empty($info['day_award'])) {
            $day_award = (new CoreMemberService())->getGiftContent($this->site_id, $info['day_award'],'member_sign');
            $info['day_award'] = $day_award;
        }
        if (!empty($info['continue_award'])) {
            foreach ($info['continue_award'] as $key => $value) {
                $gift = $value;
                unset($gift['continue_sign'], $gift['continue_tag'], $gift['receive_limit'], $gift['receive_num']);
                $gift_content = (new CoreMemberService())->getGiftContent($this->site_id, $gift, 'member_sign_continue');
                $gift_count = 0;
                $content_text = '';
                $content_icon = '';
                foreach ($gift_content as $vv) {
                    if ($vv['is_use'] == 1) {
                        foreach ($vv['content'] as $v) {
                            $content_text = $content_text . ($gift_count == 0 ? '' : '+') . $v['text'];
                            $content_icon = $v['icon'];
                            $gift_count++;
                        }
                    }
                }
                if ($gift_count > 1) {
                    $continue_award['gift'] = ['total' => ['text' => $content_text, 'icon' => '/static/resource/images/member/sign/pack01.png']];
                } else if($gift_count == 1) {
                    $continue_award['gift'] = ['total' => ['text' => $content_text, 'icon' => $content_icon]];
                } else {
                    $continue_award['gift'] = [];
                }

                $continue_award['continue_sign'] = $value['continue_sign'];
                $info['continue_award'][$key] = $continue_award;
            }
        }
        $info['is_sign'] = empty($today) ? false : true;//是否签到
        if (empty($today)) {
            $info['days'] = empty($yesterday) ? 0 : $yesterday['days'];//连签天数
        } else {
            $info['days'] = $today['days'];//连签天数
        }
        return $info;
    }

    /**
     * 获取站点签到设置
     */
    public function getSign()
    {
        $info = ( new CoreConfigService() )->getConfig($this->site_id, 'SIGN_CONFIG');
        if (empty($info)) {
            $info = [];
            $info[ 'value' ] = [
                'is_use' => 0,
                'sign_period' => '',
                'day_award' => '',
                'continue_award' => [],
                'rule_explain' => ''
            ];
        }
        return $info[ 'value' ];
    }

    /**
     * 获取两个时间戳之间的天数组
     * @param $start_timestamp
     * @param $end_timestamp
     * @return array
     */
    private function getDaysArray($start_timestamp, $end_timestamp) {
        $start = new DateTime("@$start_timestamp"); // 使用时间戳创建DateTime对象
        $end = new DateTime("@$end_timestamp"); // 同上
        $interval = new DateInterval('P1D'); // 每天的周期
        $period = new DatePeriod($start, $interval, $end); // 创建周期范围

        $days_array = [];
        foreach ($period as $day) {
            $days_array[] = $day->format('Y-m-d'); // 格式化日期并添加到数组
        }
        return $days_array;
    }

    /**
     * 合并数据，如果键值相等其值相加
     * @param $desc
     * @param $json_wares
     * @return array|false
     */
    private static function getArrayMerge($desc, $json_wares)
    {
        if (is_array($desc) && is_array($json_wares)) {
            $arrayMerge = array();
            foreach ($json_wares as $key=>$value) {
                if (array_key_exists($key, $desc)) {
                    $arrayMerge[$key] = $value + $desc[$key];
                    unset($desc[$key]);
                } else {
                    $arrayMerge[$key] = $value;
                }
            }
            return $arrayMerge+$desc;
        } else {
            return false;
        }
    }

}