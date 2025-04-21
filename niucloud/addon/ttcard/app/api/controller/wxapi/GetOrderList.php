<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetOrderList extends BaseAuth
{
    public function index()
    {
		$user_id = $this->_user['id'];

        $pageCur = $this->request->param('pageCur');
		$limit = $this->request->param('limit');  
		$tabCur = $this->request->param('tabCur');  
		$pageCur = $pageCur ? $pageCur : 1;
		$limit = $limit ? $limit : 10;
		
		$map = [];
		if($tabCur != 0){
			$map['pay_status'] = $tabCur;
		}
	
		$res = Db::name('ttcard_order')->where('site_id',$this->site_id)->order('id desc')->where(['user_id'=>$user_id,'status'=>'normal'])->where($map)->limit($limit)->page($pageCur)->select()->toArray();
		
		if(!$res ){
			return $this->ok();
		}
		if(count($res) == 0){
			return $this->ok('请求成功',[]); 
		}
		foreach($res as $k=>&$v){ 
			$find = Db::name('ttcard_product')->where('site_id',$this->site_id)->where('id',$v['product_id'])->find();
			if(!$find){ 
				$v['product'] = [];
			}else{ 
				$img_0 = $this->checkDouhao($find['images'])[0];
				$find['images'] = $img_0?$this->cdnurl($img_0,true):'';
				$v['product'] = $find;
			}
			$v['createtime'] = date('Y-m-d H:i:s',$v['create_time']);
			
			if($v['ordertype_id'] && $v['ordertype_id'] != 0){
				$findOrdertype =  Db::name('ttcard_ordertype')->where('site_id',$this->site_id)->where('real_id',$v['ordertype_id'])->find();
				if($findOrdertype){
					$v['ordertype'] = $findOrdertype;
				}else{
					$v['ordertype'] = [];
				}
			}
		} 
		
		return $this->ok('请求成功',$res); 
    }
}
