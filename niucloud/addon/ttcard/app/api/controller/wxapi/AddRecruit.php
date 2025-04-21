<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class AddRecruit extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];
	
		$recruit_id = $this->request->param('recruit_id'); 
		$title = $this->request->param('title'); 
		$position = $this->request->param('position'); 
		$website_id= $this->request->param('website_id');  
		$type_status = $this->request->param('type_status'); 
		$month_salary = $this->request->param('month_salary');   
		$age = $this->request->param('age');   
		$education = $this->request->param('education');
		$city = $this->request->param('city');
		$address = $this->request->param('address');
		$scale = $this->request->param('scale');
		$tags = $this->request->param('tags');
		$content = $_POST['content'];
		
		
		$recruit_status = $this->request->param('recruit_status');
		$subtype = $this->request->param('subtype');  
		
		if(!$subtype){
		 	return $this->err('参数错误');
		} 
	  
		if(!$title){
		 	return $this->err('请输入标题');
		} 
		if(!$position){
		 	return $this->err('请输入招聘岗位');
		} 
		 
		if(!$age){
		 	return $this->err('请输入年龄范围');
		}  
		if(!$month_salary){
		 	return $this->err('请输入月薪');
		}  
		if(!$city){
		 	return $this->err('请选择工作城市');
		} 
		if(!$address){
		 	return $this->err('请输入工作详细地址');
		} 
		if(!$scale){
		 	return $this->err('请输入公司规模');
		} 
		if(!$tags){
		 	return $this->err('请至少输入一个标签');
		}  
		if(!$content){
		 	return $this->err('请输入职位详细描述');
		} 
		 
		$map = [];
		$map['site_id'] = $this->site_id; 
		$map['user_id'] = $user_id;
		$map['title'] = $title;
		$map['position'] = $position;  
		$map['website_id'] = $website_id; 
		$map['type_status'] = $type_status; 
		$map['age'] = $age;  
		$map['month_salary'] = $month_salary;  
		$map['education'] = $education;  
		$map['city'] = $city;  
		$map['address'] = $address;  
		$map['scale'] = $scale;  
		$map['tags'] = $tags;    
		$map['content'] = $content; 
		$map['recruit_status'] = $recruit_status; 
		
		$find_website = Db::name('ttcard_website')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'status'=>'normal'])->find();
		if($find_website){
			$map['industry_id'] = $find_website['industry_id'];
		}
		
		if($subtype == 'edit'){
			if(!$recruit_id){
				return $this->err('参数不正确');
			}
			$res = Db::name('ttcard_recruit')->where('site_id',$this->site_id)->where(['id'=>$recruit_id,'user_id'=>$user_id])->update($map);
			if($res ===false){
				return $this->err('网络错误');
			}
			if($res == 0){
				return $this->err('没有更新项');
			}
			return $this->ok('更新成功'); 
		}else{ 
		    $map['create_time'] = time();  
			$res = @Db::name('ttcard_recruit')->insert($map);
			if(!$res){
				return $this->err('添加失败');
			}	
			return $this->ok('添加成功'); 
		}
    }
}
