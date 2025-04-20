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

namespace addon\huodong\app\service\api;

use addon\huodong\app\model\act\Act;
use addon\huodong\app\model\cate\Cate;
use addon\huodong\app\model\order\Order;
use addon\huodong\app\service\core\CoreOrderService;
use addon\huodong\app\service\api\ActService;
use app\model\member\Member;
use addon\huodong\app\dict\order\OrderDict;
use core\base\BaseApiService;
use addon\huodong\app\service\core\ConfigService;


class OrderService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    public function create(array $data)
    {
        $data[ 'order_from' ] = $this->channel;
        $data[ 'member_id' ] = $this->member_id;
        $data[ 'site_id' ] = $this->site_id;

        return ( new CoreOrderService() )->create($data);
    }


    /**
     * 订单分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where)
    {
        $order = 'order_id desc';
        $where[ 'order_type' ] = 'huodong';

        $where2 = [];
        $post = input('');
        if(isset($post['act_id'])&&$post['act_id']){
            $where2[ 'act_id' ] = $post['act_id'];
        }

        if(isset($post['is_admin'])&&$post['is_admin']){

        }else{
            $where2[ 'member_id' ] = $this->member_id;
        }



        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'order_status' ], $where)->with(['act'])->where($where2)->order($order)->append([ 'order_from_name' ]);
        $list = $this->pageQuery($search_model);


        foreach ($list[ 'data' ] as $k => &$v) {

            $v = $this->getdata($v);


        }
        return $list;
    }

    /**
     * 订单详情
     * @param int $order_id
     * @return array
     */
    public function getDetail(int $order_id)
    {

        $detail = $this->model->where([['order_id', "=", $order_id]])->with(['member'])->findOrEmpty()->toArray();
        if(empty($detail)){
            return '';
        }
        $detail = $this->getdata($detail);
//        $order_status = OrderDict::getStatus();
//        $detail[ 'order_status_info' ] = $order_status[ $detail[ 'order_status' ] ] ?? [];
//
//        $detail['act'] = (new ActService)->getInfo( $detail['act_id']);
//        $detail['hx_time'] = $detail['hx_time']?date('Y-m-d H:i:s',$detail['hx_time']):'';
//
//        $detail['hx_member_name'] = (new Member())->where([['member_id', "=", $detail['hx_member_id']]])->value('nickname');
//
//        if(!empty($detail[ 'order_status_info' ]['member_action'])){
//            foreach ($detail[ 'order_status_info' ]['member_action'] as $k2 => &$v2) {
//                if(!empty($act)&&$v2['op']=='cancel'&&time()>strtotime($act['startime'])){
//                    unset($v[ 'order_status_info' ]['member_action'][$k2]);
//                }
//                if(!empty($act)&&$v2['op']=='hexiao'&&time()>strtotime($act['endtime'])){
//                    unset($v[ 'order_status_info' ]['member_action'][$k2]);
//                }
//            }
//        }
        return $detail;
    }

    public function getdata($v)
    {
        $order_status = OrderDict::getStatus();
        
        $act = (new ActService)->getInfo( $v['act_id']);

        if(!in_array($v['order_status'],[2,3])){
            unset($act['hidecontent']);
        }

        $v[ 'act' ] = $act ?? [];


        $v[ 'order_status_info' ] = $order_status[ $v[ 'order_status' ] ] ?? [];


        
        $config = (new ConfigService())->getConfig($v['site_id']);
        
        if(!empty($v[ 'order_status_info' ]['member_action'])){
            foreach ($v[ 'order_status_info' ]['member_action'] as $k2 => &$v2) {
                /** 增加系统设置判断 作者:haha1256610  2025/2/8 下午8:36  **/
                if(!empty($act)&&$v2['op']=='cancel'&&time()>strtotime($act['startime'])&& $config['is_allow_cancel']==1){
                    unset($v[ 'order_status_info' ]['member_action'][$k2]);
                }
                if(!empty($act)&&$v2['op']=='hexiao'&&time()>strtotime($act['endtime'])){

                    unset($v[ 'order_status_info' ]['member_action'][$k2]);
                }
            }
        }

        $v[ 'is_jinri' ] = 0;
        if(!empty($act)&&date('Y-m-d')==date('Y-m-d',strtotime($act['startime']))){
            $v[ 'is_jinri' ] = 1;
        }

        // $v[ 'hexiao_url' ] = '';// $v[ 'order_id' ];

        //兼容没有没有核销数据的
        if(!$v['hexiao_url']){
            $v[ 'hexiao_url' ] =  ( new CoreOrderService() )->create_verify($v);
        }

        $v['hx_time'] = $v['hx_time']?date('Y-m-d H:i:s',$v['hx_time']):'';

        $v['hx_member_name'] = (new Member())->where([['member_id', "=", $v['hx_member_id']]])->value('nickname');

        $v['member'] = (new Member())->field('nickname,headimg,mobile')->where([['member_id', "=", $v['member_id']]])->findOrEmpty()->toArray();

//            $list[ 'data' ][ $k ][ 'hexiao_url' ] = $list[ 'data' ][ $k ][ 'order_id' ];
        //'http://'.$_SERVER['HTTP_HOST'].'/wap/'.$this->site_id.'/addon/huodong/pages/order/hexiao?id='.$list[ 'data' ][ $k ][ 'order_id' ];


        return $v;

    }


    public function hexiao( $order_no)
    {

      /*  $data['site_id'] = $this->site_id;
        $data['member_id'] = $this->member_id;*/
        return ( new CoreOrderService() )->hexiao($order_no);
    }
    public function urlhexiao()
    {
        $data['site_id'] = $this->site_id;
      ( new CoreOrderService() )->urlhexiao($data);

    }
    /**
     * 订单状态
     * @return array|array[]|string
     */
    public function getStatus()
    {
        return OrderDict::getStatus();
    }
    public function close(int $order_id)
    {
        return ( new CoreOrderService() )->close($order_id);
    }
}
