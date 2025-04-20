<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetMyCollect extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];
		 
		$pageCur = $this->request->param('pageCur');
		$limit = $this->request->param('limit'); 
		$searchValue = $this->request->param('searchValue');  
		$pageCur = $pageCur ? $pageCur : 1; 
		$limit = $limit ? $limit : 10; 
		 
		$res = Db::name('ttcard_collect')->where('site_id',$this->site_id)->order('id desc')->where(['user_id'=>$user_id])->limit($limit)->page($pageCur)->select()->toArray();
		if(!$res){
			return $this->err('请求失败');
		}
		if(count($res) == 0){
			return $this->ok('请求成功',[]); 
		}
		$new_arr = [];
		foreach($res as $k=>&$v){
			$find = Db::name('ttcard_card')->where('site_id',$this->site_id)->where(['id'=>$v['card_id'],'status'=>'normal','auditing_status'=>1])->find();
			if($find){
				$find['tags'] = $this->checkDouhao($find['tags']);
				$find['avatar'] = $find['avatar']?$this->cdnurl($find['avatar'], true):''; 
				
				$find['description'] = mb_substr(strip_tags($find['description']), 0, 50, "UTF-8");
				        
				if($find['industry_id']){
				    $findIndustry = Db::name('ttcard_industry')
									->where('site_id',$this->site_id)
									->where(['status'=>'normal','id'=>$find['industry_id']])
									->find();
					if($findIndustry){
						$find['industry_name'] = $findIndustry['name'];
					}else{
						$find['industry_name'] = '';
					}
				}
				// 获取当前名片的认证状态
				$select_authentication = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$find['user_id'],'status'=>'normal'])->field('ordertype_id,examine_status,id')->order('id desc')->select();
				
				$find['authentication_info'] = count($select_authentication) > 0 ? $select_authentication : [];
				$new_arr[] = $find;
			}  

			
		} 
		return $this->ok('请求成功',$new_arr);
    }
}
