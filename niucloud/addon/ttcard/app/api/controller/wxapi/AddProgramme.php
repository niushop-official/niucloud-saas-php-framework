<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class AddProgramme extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];

		$find_website = Db::name('ttcard_website')->where('site_id',$this->site_id)->where(['user_id'=>$user_id])->find();
		if(!$find_website){
		 	return $this->err('请先创建微官网');
		} 
		
		
		$subtype = $this->request->param('subtype');
		$website_id = $this->request->param('website_id');
		$programme_id = $this->request->param('id');
		$select_icon = $this->request->param('select_icon'); 
		$icon_color = $this->request->param('icon_color'); 
		$color_status = $this->request->param('color_status'); 
		$title = $this->request->param('title');   
		$description = $this->request->param('description'); 
   
		if(!$select_icon){
			return $this->err('请选择方案图标');
		}
		if(!$website_id){
			return $this->err('请先绑定微官网');
		}
		if(!$icon_color){
			return $this->err('请选择方案图标颜色');
		}
		if(!$title){
			return $this->err('请输入方案标题');
		}
		if(!$description){
			return $this->err('请输入方案描述');
		}
		
		$map = [];
		$map['site_id'] = $this->site_id; 
		$map['select_icon'] = $select_icon;
		$map['icon_color'] = $icon_color; 
		$map['color_status'] = $color_status; 
		$map['title'] = $title;
		$map['description'] = $description; 
		$map['website_id'] = $website_id; 
		
		if($subtype == 'editProgramme'){ 
			if(!$programme_id){
				return $this->err('参数不正确');
			}
			$res = Db::name('ttcard_programme')->where('site_id',$this->site_id)->where(['id'=>$programme_id,'user_id'=>$user_id])->update($map);
			if($res ===false){
				return $this->err('网络错误');
			}
			if($res == 0){
				return $this->err('没有更新项');
			}
			return $this->ok('更新方案成功'); 
		}else{ 
			$map['user_id'] = $user_id;
			$map['create_time'] = time(); 
			$res = @Db::name('ttcard_programme')->insert($map);
			if(!$res){
				return $this->err('添加方案失败');
			}	
			return $this->ok('添加方案成功'); 
		}
    }
}
