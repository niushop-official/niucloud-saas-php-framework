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

use addon\huodong\app\model\user\User;
use core\base\BaseApiService;
use app\model\member\Member;
use think\facade\Db;
use app\model\verify\Verifier;
use addon\huodong\app\service\core\ConfigService;


/**
 * 活动列服务层
 * Class ActService
 * @package addon\huodong\app\service\api\act
 */
class ActService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Act();
    }

    /**
     * 获取活动列列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

//        $this->model->where('status', 1)->where('site_id',$this->site_id)->where('endtime','< time',date('Y-m-d H:i:s'))->strict(false)->update(['status'=>-2]);
        $statusids = [1,-2];
//        $where['status'] = array('in', implode(',',$statusids));

        $order = 'sort desc,startime asc';

        $where['site_id'] = $this->site_id;
        $search_model = $this->model->withSearch(["id","name","cate_id","startime","endtime","adddate",'site_id'], $where)->with(['cate'])->where('status','in','1,-2')->orderRaw('FIELD(status,'.implode(',',$statusids).')')->order($order);
        $list = $this->pageQuery($search_model);

        foreach ($list[ 'data' ] as $k => &$v) {

            $isbaoming = Order::where(['member_id'=>$this->member_id,'act_id'=>$v['id'],"site_id"=>$this->site_id])->where('order_status','>',0)->findOrEmpty()->toArray();
            $v['isbaoming'] = !empty($isbaoming) ? 1 : 0;

            $v['opstatus'] = 1;
            $v['optext'] = '进行中';
            if( $v['isbaoming'] ==1){
                $info['opstatus'] = -1;
                $info['optext'] = '已报名';
            }
            if(time()>strtotime($v['endtime'])){
                $v['opstatus'] = -2;
                $v['optext'] = '已过期';
              /*  $this->model->where('status', 1)->where('id', $v['id'])->where('site_id',$this->site_id)->where('endtime','< time',date('Y-m-d H:i:s'))->strict(false)->update(['status'=>-2]);*/
            }
            $v['sales'] = (new Order())->where('act_id', $v['id'])->where('order_status','in','2,3')->count();

            $v['startime2'] = $this->format_time(strtotime($v['startime']));
            $v['endtime2'] = $this->format_time(strtotime($v['endtime']));

        }


        return $list;
    }

    /**
     * 获取活动列信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {

        $info = $this->model->where([['id', "=", $id]])->with(['cate'])->findOrEmpty()->toArray();
        if(empty($info)){
            return [];
        }
//        $info['usertype'] = '1';
        $info['usertype'] = explode(',',$info['usertype']);
         $info['sales'] = (new Order())->where('act_id', $info['id'])->where('order_status','in','2,3')->count();



        foreach ($info['usertype'] as $k => &$v) {
            $v = intval($v);
        }
        $usertype_name = Db::name('member_level')->where('level_id', 'in',implode(',',$info['usertype']))->column('level_name');
        if(in_array(0,$info['usertype'])){
            $usertype_name[] = '普通用户';
        }
        $usertype_name = implode('、',$usertype_name);
        $info['usertype_name'] = $usertype_name;

        if(in_array(-1,$info['usertype'])){
            $info['usertype_name'] = '所有人';
        }

        $info['opstatus'] = 1;


        $has_num = Order::where(['act_id'=>$info['id'],"site_id"=>$this->site_id])->where('order_status','>=',0)->count();
        $info['has_num'] = $has_num;
        $info['is_man'] = 0;
        if(intval($info['num'])>0&&$info['has_num']>=$info['num']&&$info['opstatus']>0){
            $info['is_man'] = 1;
            $info['opstatus'] = -4;
            $info['optext'] = '已满人';
        }
        if(time()>strtotime($info['endtime'])&&$info['opstatus']>0){
            $info['opstatus'] = -2;
            $info['optext'] = '已过期';
        }



        $info['isbaoming'] = 0;
        if($this->member_id){
            $isbaoming = Order::where(['member_id'=>$this->member_id,'act_id'=>$info['id'],"site_id"=>$this->site_id])->where('order_status','in','1,2')->findOrEmpty()->toArray();
            $info['isbaoming'] = !empty($isbaoming) ? 1 : 0;
            if( $info['isbaoming'] ==1&&$info['opstatus']>0){
                $info['opstatus'] = -1;
                $info['optext'] = '已报名';
            }

            $waitpay = Order::where(['member_id'=>$this->member_id,'act_id'=>$info['id'],"site_id"=>$this->site_id])->where('order_status','=',1)->findOrEmpty()->toArray();
            $info['waitpay'] = !empty($waitpay) ? 1 : 0;
            if( $info['waitpay'] ==1&& $info['isbaoming']==1){
                $info['order_id'] = $waitpay['order_id'];
                $info['opstatus'] = 2;
                $info['optext'] = '等待支付';
            }

           /* $member = (new Member())->where('member_id', $this->member_id)->find();
            if($info['usertype']==1&&$member['member_level']==0){
                $info['opstatus'] = -3;
                $info['optext'] = '仅限会员参与';
            }
            if($info['usertype']==2&&$member['member_level']>0){
                $info['opstatus'] = -3;
                $info['optext'] = '仅限普通用户参与';
            }*/

            $member = (new Member())->where('member_id',$this->member_id)->findOrEmpty()->toArray();

            if(!in_array(-1,$info['usertype'])){

                if($member['member_level']==0&&!in_array(0,$info['usertype'])&&$info['opstatus']>0){
                    $info['opstatus'] = -3;
                    $info['optext'] = '仅限会员参与';
                }
                if($member['member_level']>0&&!in_array($member['member_level'],$info['usertype'])&&$info['opstatus']>0){

                    $my_level_name = Db::name('member_level')->where('level_id', $member['member_level'])->value('level_name');
                    $info['opstatus'] = -3;
                    $info['optext'] = '当前等级['.$my_level_name.']不符合报名要求';
                }
            }


            $Verifier = (new Verifier())->where( 'member_id',$this->member_id)->where('site_id',$info['site_id'])->findOrEmpty()->toArray();
            $info['is_verifier'] = !empty($Verifier)?1:0;

            /**  作者:haha1256610  2024/12/11 上午10:01  **/
            if(isset($info['vip_mianfei'])&&$info['vip_mianfei']==1&&$member['member_level']>0){
                $info['is_pay'] = 0;
                $info['price'] = 0;
            }

            $info['my_member'] = $member;
            $info['my_member_id'] = $this->member_id;


            /** 是否填写过报名信息 作者:haha1256610  2025/3/20 下午8:19  **/
            $user = (new User())->where('member_id', $this->member_id)->findOrEmpty()->toArray();
            $config = (new ConfigService())->getConfig($info['site_id']);
            if($config['one_tianbiao']==1&&!empty($user)){
                $info['is_tian'] = 0;
                $info['form_id'] = '';

            }


        }
        if($info['isbaoming']==0){
            unset($info['hidecontent']);
        }


        $info['baolist'] = Db::name('member')->alias('a')->join('huodong_order b','a.member_id = b.member_id')->field('a.headimg,a.nickname,b.create_time')->where('b.order_status','>=',0)->where('b.act_id', $id)->where("b.site_id",$this->site_id)->order('b.order_id desc')->select()->toArray();

 


        $info['images'] = empty($info['images'])? '': explode(',',$info['images']);
        if(!$info['images']&&$info['image']){
            $info['images'] = [$info['image']];
        }
        $this->model->where([ [ 'id', '=', $info[ 'id' ] ] ])->inc('views',1)->update();




         $info['startime2'] = $this->format_time(strtotime($info['startime']));
        $info['endtime2'] = $this->format_time(strtotime($info['endtime']));


        return $info;
    }

 
    public function getCateAll(){
        $cateModel = new Cate();
        return $cateModel->where([["site_id","=",$this->site_id]])->where('status',1)->select()->toArray();
    }


     public  function format_time($timestamp){
        $weekarray = array("","一","二","三","四","五","六","日");
        $date = date('m月d日 H:i 星期', $timestamp);
        $weekday = date('N', $timestamp); //获取星期几
        return $date . $weekarray[$weekday]; //输出形如2022年01月14日 星期五
    }

}
