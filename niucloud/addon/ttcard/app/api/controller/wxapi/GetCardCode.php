<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetCardCode extends Base
{
    public function index()
    {
      $card_id = $this->request->param('card_id');
      if(!$card_id){
        return $this->err('参数错误');
      }
              
      $findCard = Db::name('ttcard_card')->where('site_id',$this->site_id)->where(['id'=>$card_id,'status'=>'normal'])->find();
      if(!$findCard){
        return $this->err('查询名片信息失败');
      }

      if(trim($findCard['minicode_image'])){
        return $this->ok('请求成功',['minicode_image'=>$this->cdnurl($findCard['minicode_image'],true)]);
      }
      
      $code = $this->getMiniAppCode('ttcard_card',$card_id,'pages/card/index');
      if(!$code){
        return $this->err('生成名片码失败');
      }
      return $this->ok('请求成功',['minicode_image'=>$code]);
    }


}
