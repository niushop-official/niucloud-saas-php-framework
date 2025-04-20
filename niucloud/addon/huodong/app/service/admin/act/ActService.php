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

namespace addon\huodong\app\service\admin\act;

use addon\huodong\app\model\act\Act;
use addon\huodong\app\model\cate\Cate;
use addon\huodong\app\model\order\Order;

use core\base\BaseAdminService;
use app\model\diy_form\DiyForm;

/**
 * 活动列服务层
 * Class ActService
 * @package addon\huodong\app\service\admin\act
 */
class ActService extends BaseAdminService
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
        $order = 'id desc';


        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["id","name","cate_id","startime","endtime","status","adddate"], $where)->with(['cate'])->order($order);
        $list = $this->pageQuery($search_model);


        foreach ($list[ 'data' ] as $k => &$v) {

            $v['sales'] = (new Order())->where('act_id', $v['id'])->where('order_status','in','2,3')->count();

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
        $info['usertype'] = $info['usertype']?explode(',',$info['usertype']):[-1];
        foreach ($info['usertype'] as $k => &$v) {
            $v = intval($v);
        }
        $info['hexiao_type'] = $info['hexiao_type']?explode(',',$info['hexiao_type']):[-1];
        foreach ($info['hexiao_type'] as $k => &$v) {
            $v = intval($v);
        }

        $info['sales'] =(new Order())->where('act_id', $info['id'])->where('site_id',$info['id'])->count();

        $info['level_gifts'] = $info['level_gifts']?json_decode($info['level_gifts'],true):[];

        return $info;
    }

    /**
     * 添加活动列
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {

        if(!isset($data['hxstartime'])||!$data['hxstartime']){
            $data['hxstartime'] = date('Y-m-d',strtotime($data['startime']));
        }

        $data['level_gifts'] = $data['level_gifts']?json_encode($data['level_gifts']):'';
        $data['site_id'] = $this->site_id;
        $data['usertype'] = $data['usertype']?implode(',',$data['usertype']):-1;
        $data['hexiao_type'] = $data['hexiao_type']?implode(',',$data['hexiao_type']):1;
        $res = $this->model->create($data);


        //内置活动订单事件监听
        $info = $this->model->where([['id', "=", $res->id]])->findOrEmpty()->toArray();
        event('AfterHuoDongCreate', $info);

        $this->form_add($res->id);

        return $res->id;

    }

    /**
     * 活动列编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        //复制活动


        if(isset($data['optype'])&&$data['optype']=='copy'){
            unset($data['id'],$data['optype']);
            $data['adddate'] = date('Y-m-d H:i:s');;
            return $this->add($data);
        }
        if(isset($data['optype'])){
            unset($data['optype']);
        }


        $data['level_gifts'] = $data['level_gifts']?json_encode($data['level_gifts']):'';

        $data['usertype'] = $data['usertype']?implode(',',$data['usertype']):-1;
        $data['hexiao_type'] = $data['hexiao_type']?implode(',',$data['hexiao_type']):1;

        if(!isset($data['hxstartime'])||!$data['hxstartime']){
            $data['hxstartime'] = date('Y-m-d',strtotime($data['startime']));
        }

        $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->update($data);

        $this->form_add($id);
        return true;
    }

    /**  作者:haha1256610  2025/2/15 上午11:00  **/
    public function form_add($id)
    {
        $data = $this->model->where([['id', "=", $id]])->with(['cate'])->findOrEmpty()->toArray();


        if($data['is_tian']==1&&!$data['form_id']){

            $indata['site_id'] = $data['site_id'];
            $indata['page_title'] = '活动报名登记_'.$data['id'];
            $indata['title'] = '报名登记';
            $indata['type'] = 'DIY_FORM';
            $indata['status'] = 1;
            $indata['template'] = '';
            $indata['value'] = '{"global":{"title":"报名登记","completeLayout":"style-1","completeAlign":"left","borderControl":true,"pageStartBgColor":"","pageEndBgColor":"","pageGradientAngle":"to bottom","bgUrl":"","bgHeightScale":100,"imgWidth":"","imgHeight":"","topStatusBar":{"isShow":true,"bgColor":"#ffffff","rollBgColor":"#ffffff","style":"style-1","styleName":"风格1","textColor":"#333333","rollTextColor":"#333333","textAlign":"center","inputPlaceholder":"请输入搜索关键词","imgUrl":"","link":{"name":""}},"bottomTabBarSwitch":true,"popWindow":{"imgUrl":"","imgWidth":"","imgHeight":"","count":-1,"show":0,"link":{"name":""}},"template":{"textColor":"#303133","pageStartBgColor":"","pageEndBgColor":"","pageGradientAngle":"to bottom","componentBgUrl":"","componentBgAlpha":2,"componentStartBgColor":"","componentEndBgColor":"","componentGradientAngle":"to bottom","topRounded":0,"bottomRounded":0,"elementBgColor":"","topElementRounded":0,"bottomElementRounded":0,"margin":{"top":0,"bottom":0,"both":0},"isHidden":false}},"value":[{"path":"edit-form-input","uses":0,"position":"","componentType":"diy_form","id":"2so6jitytbs0","componentName":"FormInput","componentTitle":"单行文本","ignore":["componentBgUrl"],"field":{"name":"姓名","remark":{"text":"","color":"#999999","fontSize":14},"required":true,"unique":false,"autofill":false,"privacyProtection":false,"default":"","value":""},"placeholder":"请输入姓名","fontSize":14,"fontWeight":"normal","textColor":"#303133","pageStartBgColor":"#FFFFFF","pageEndBgColor":"","pageGradientAngle":"to bottom","componentBgUrl":"","componentBgAlpha":2,"componentStartBgColor":"","componentEndBgColor":"","componentGradientAngle":"to bottom","topRounded":0,"bottomRounded":0,"elementBgColor":"","topElementRounded":0,"bottomElementRounded":0,"margin":{"top":8,"bottom":8,"both":10},"isHidden":false,"pageStyle":"background-color:#FFFFFF;padding-top:16rpx;padding-bottom:16rpx;padding-right:20rpx;padding-left:20rpx;"},{"path":"edit-form-mobile","uses":1,"componentType":"diy_form","id":"e3w780ggkow","componentName":"FormMobile","componentTitle":"手机号","ignore":["componentBgUrl"],"field":{"name":"手机号","remark":{"text":"","color":"#999999","fontSize":14},"required":true,"unique":false,"autofill":false,"privacyProtection":false,"default":"","value":""},"placeholder":"请输入手机号","fontSize":14,"fontWeight":"normal","textColor":"#303133","pageStartBgColor":"#FFFFFF","pageEndBgColor":"","pageGradientAngle":"to bottom","componentBgUrl":"","componentBgAlpha":2,"componentStartBgColor":"","componentEndBgColor":"","componentGradientAngle":"to bottom","topRounded":0,"bottomRounded":0,"elementBgColor":"","topElementRounded":0,"bottomElementRounded":0,"margin":{"top":8,"bottom":8,"both":10},"isHidden":false,"pageStyle":"background-color:#FFFFFF;padding-top:16rpx;padding-bottom:16rpx;padding-right:20rpx;padding-left:20rpx;"},{"path":"edit-form-textarea","uses":0,"componentType":"diy_form","id":"1v12oix5tegw","componentName":"FormTextarea","componentTitle":"多行文本","ignore":["componentBgUrl"],"field":{"name":"备注","remark":{"text":"","color":"#999999","fontSize":14},"required":false,"unique":false,"autofill":false,"privacyProtection":false,"default":"","value":""},"placeholder":"请输入备注(选填)","fontSize":14,"fontWeight":"normal","rowCount":4,"textColor":"#303133","pageStartBgColor":"#FFFFFF","pageEndBgColor":"","pageGradientAngle":"to bottom","componentBgUrl":"","componentBgAlpha":2,"componentStartBgColor":"","componentEndBgColor":"","componentGradientAngle":"to bottom","topRounded":0,"bottomRounded":0,"elementBgColor":"","topElementRounded":0,"bottomElementRounded":0,"margin":{"top":8,"bottom":8,"both":10},"isHidden":false},{"path":"edit-form-submit","uses":1,"position":"bottom_fixed","componentType":"diy_form","id":"60nqt7dnya40","componentName":"FormSubmit","componentTitle":"表单提交","ignore":["componentBgUrl"],"btnPosition":"follow_content","submitBtn":{"text":"提交","color":"#ffffff","bgColor":"#409EFF"},"resetBtn":{"control":true,"text":"重置","color":"","bgColor":""},"textColor":"#303133","pageStartBgColor":"","pageEndBgColor":"","pageGradientAngle":"to bottom","componentBgUrl":"","componentBgAlpha":2,"componentStartBgColor":"","componentEndBgColor":"","componentGradientAngle":"to bottom","topRounded":0,"bottomRounded":0,"elementBgColor":"","topElementRounded":50,"bottomElementRounded":50,"margin":{"top":8,"bottom":0,"both":10},"isHidden":false,"pageStyle":"padding-top:16rpx;padding-bottom:0rpx;padding-right:20rpx;padding-left:20rpx;"}]}';
            $indata['addon'] = '';
            $indata['share'] = '';
            $indata['write_num'] = 0;
            $indata['remark'] = '';
            $indata['create_time'] = time();
            $indata['update_time'] = time();
           $form_id = DiyForm::insertGetId($indata);

            $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->update(['form_id'=>$form_id]);
        }
        


    }


    /**
     * 删除活动列
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        
        $has = (new Order())->where('order_status','in','2,3')->where([['act_id', '=', $id],['site_id', '=', $this->site_id]])->find();
        if(!empty($has)){
            echo json_encode(['code'=>0,'msg'=>'有用户已经报名不能删除']);die;
        }
       (new Order())->where([['act_id', '=', $id],['site_id', '=', $this->site_id]])->delete();



        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();


        return $res;
    }
    
    public function getCateAll(){
       $cateModel = new Cate();
       return $cateModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}
