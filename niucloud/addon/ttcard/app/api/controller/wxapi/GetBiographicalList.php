<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;
//我创建的简历
class GetBiographicalList extends Base
{
    public function index()
    {
        $pageCur = $this->request->param('pageCur');
		$limit = $this->request->param('limit');  
		$tabCur = $this->request->param('tabCur');  
		$source = $this->request->param('source');  
		$pageCur = $pageCur ? $pageCur : 1;
		$limit = $limit ? $limit : 10;
		  
		if($source == 'my'){
			$user_id = $this->checkLogin($_SERVER['HTTP_TOKEN']);
			if(!$user_id){
				return $this->err('抱歉，请先登录',[],1000);
			}  
			$field = '*';
		}else{
			$user_id = $this->request->param('user_id'); 
			if(!$user_id){
			 	return $this->err('参数错误');
			}  
			$field = 'id,name,avatar,create_time';
		} 
		
		if($tabCur == 0){
			
			$res = Db::name('ttcard_biographical')->where('site_id',$this->site_id)->order('id desc')->where(['user_id' => $user_id,'status'=>'normal'])->field($field)->limit($limit)->page($pageCur)->select();
			
		}else if($tabCur == 1){ 
			  
			$select = Db::name('ttcard_biographicaldelive')->where('site_id',$this->site_id)->order('id desc')->where(['status'=>'normal','to_user_id' => $user_id])->limit($limit)->page($pageCur)->select();
			
			if(!$select){
				return $this->ok('请求成功',[]); 
			}
			
			$res = [];
			foreach($select as $key => &$value){
				$find = Db::name('ttcard_biographical')->where('site_id',$this->site_id)->where(['id' => $value['biographical_id'],'status'=>'normal'])->find();
				if($find){
					$find['delivetime'] = date('Y-m-d',$value['create_time']);
					$res[] = $find;
				}
			}                
		}else if($tabCur == 2){ 
			
			$select = Db::name('ttcard_biographicaldelive')->where('site_id',$this->site_id)->order('id desc')->where(['status'=>'normal','from_user_id' => $user_id])->limit($limit)->page($pageCur)->select();
			
			if(!$select){
				return $this->ok('请求成功',[]); 
			} 
			$res = [];
			foreach($select as $key => &$v){
				$findRecruit = Db::name('ttcard_recruit')->where('site_id',$this->site_id)->where(['id'=>$v['recruit_id']])->find();
				$findBiographical = Db::name('ttcard_biographical')->where('site_id',$this->site_id)->where(['id'=>$v['biographical_id']])->find();
				if($findRecruit && $findBiographical){
					$findBiographical['avatar'] = $findBiographical['avatar']?$this->cdnurl($findBiographical['avatar'], true):'';  
					$info = [
						'recruit'=>$findRecruit, 
						'biographical'=>$findBiographical,
						'delivetime' => date('Y-m-d',$v['create_time']),
						'view_status'=>$v['view_status']
					];
					$res[] = $info;
				}
			}   
		}
		
		if(!$res){
			return $this->ok('请求成功',[]); 
		} 


		if($tabCur == 0 || $tabCur == 1){
			foreach($res as $k=>&$v){  
				$v['createtime'] = date('Y-m-d',$v['create_time']);
				$v['avatar'] = $this->cdnurl($v['avatar'], true);  
			}  
		}
		
		return $this->ok('请求成功',$res); 
    }
}
