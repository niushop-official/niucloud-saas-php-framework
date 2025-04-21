<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetWebsiteTeamList extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
      $website_id = $this->request->param('website_id');
      $pageCur = $this->request->param('pageCur');
      $limit = $this->request->param('limit');
      $pageCur = $pageCur ?$pageCur :1;
      $limit = $limit ? $limit : 10;
      
      if(!$website_id){
        return $this->err('参数不正确');
      }
      $findWebsite = DB::name('ttcard_website')->where('site_id',$this->site_id)->where(['id'=>$website_id,'status'=>'normal'])->find();
      if(!$findWebsite){
        return $this->err('查询微官网信息失败');
      }
      
      $res = Db::name('ttcard_invite')->where('site_id',$this->site_id)->order('id desc')->where(['from_website_id'=>$website_id,'status'=>'normal'])->limit($limit)->page($pageCur)->select();
      
      if(!$res){
        return $this->err('请求失败');
      } 
      
      $userList = [];
      foreach($res as $k=>$v){ 
        $findCard = Db::name('ttcard_card')->where('site_id',$this->site_id)->where(['id'=>$v['to_user_card_id'],'status'=>'normal'])->field('id')->find(); 
        $findUser = Db::name('ttcard_user')->where('site_id',$this->site_id)->where(['id'=>$v['to_user_id'],'status'=>'normal'])->field('id,nickname,avatar')->find(); 
        if(!$findCard || !$findUser){
          continue;
        }
        $findUser['invite_id'] = $v['id'];
        $findUser['avatar'] = $findUser['avatar']?$this->cdnurl($findUser['avatar'],true):'';
        $findUser['card_info'] = $findCard;
        $findUser['website_info'] = $findWebsite;
        array_push($userList,$findUser); 
      }
      return $this->ok('请求成功',$userList); 
    }
}
