<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class AddBiographical extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];
		
		$id = $this->request->param('id'); 
		$avatar = $this->request->param('avatar'); 
		$name = $this->request->param('name'); 
		$age = $this->request->param('age');  
		$gender_status = $this->request->param('gender_status'); 
		$phone= $this->request->param('phone');   
		$working = $this->request->param('working');   
		$position = $this->request->param('position');   
		$type_status = $this->request->param('type_status');
		$education = $this->request->param('education');
		$unemployed_status = $this->request->param('unemployed_status');
		$reporttime = $this->request->param('reporttime');
		$advantage_content = $_POST['advantage_content'];
		$experience_content = $_POST['experience_content'];
		$learning_content = $_POST['learning_content'];
		
		$city = $this->request->param('city'); 
		$certificate_images = $this->request->param('images');
		$email = $this->request->param('email');
		$wechat_num = $this->request->param('wechat_num');
		$expected = $this->request->param('expected');
		$reporttime = $this->request->param('reporttime');
		
		$subtype = $this->request->param('subtype'); 
		if(!$subtype){
		 	return $this->err('参数错误');
		} 
		 
		if(!$name){
		 	return $this->err('请输入姓名');
		} 
		if(!$age){
		 	return $this->err('请输入年龄');
		} 
		if(!$gender_status && $gender_status != 0){
		 	return $this->err('请选择性别');
		}  
		if(!$age){
		 	return $this->err('请输入年龄范围');
		}  
		if(!$phone){
		 	return $this->err('请输入手机号');
		}  
		if(!$working){
		 	return $this->err('请输入工作经验时长');
		} 
		if(!$position){
		 	return $this->err('请输入应聘岗位');
		} 
		if(!$type_status){
		 	return $this->err('请输入应聘类型');
		} 
		if(!$education){
		 	return $this->err('请输入学历');
		}  
		if(!$unemployed_status && $unemployed_status != 0){
		 	return $this->err('请选择是否待业');
		} 
		if(strlen(strip_tags($advantage_content))<50 || strlen(strip_tags($advantage_content)) > 1000){
		 	return $this->err('个人优势内容长度应在50-1000个字符');
		}
		if(strlen(strip_tags($experience_content))<50 || strlen(strip_tags($experience_content)) >1000){
		 	return $this->err('工作经历内容长度应在50-1000个字符');
		}  
		if(strlen(strip_tags($learning_content))<50 || strlen(strip_tags($learning_content)) >1000){
		 	return $this->err('教育经历内容长度应在50-1000个字符');
		} 
		  
		$map = [];
		$map['site_id'] = $this->site_id; 
		$map['user_id'] = $user_id;
		$map['avatar'] = $avatar;
		$map['name'] = $name;
		$map['age'] = $age;  
		$map['gender_status'] = $gender_status; 
		$map['phone'] = $phone;   
		$map['working'] = $working; 
		$map['position'] = $position;
		$map['type_status'] = $type_status;  
		$map['education'] = $education;  
		$map['unemployed_status'] = $unemployed_status;   
		$map['advantage_content'] = $advantage_content; 
		$map['experience_content'] = $experience_content; 
		$map['learning_content'] = $learning_content; 
		
		
		$map['city'] = $city ? $city :'';   
		$map['certificate_images'] = $certificate_images?$certificate_images:''; 
		$map['email'] = $email?$email:'';
		$map['wechat_num'] = $wechat_num?$wechat_num:'';
		$map['expected'] = $expected?$expected:'';
		$map['reporttime'] = $reporttime?strtotime($reporttime):'';
		  
		 
		if($subtype == 'edit'){
			if(!$id){
				return $this->err('参数不正确');
			}
			$res = Db::name('ttcard_biographical')->where('site_id',$this->site_id)->where(['id'=>$id,'user_id'=>$user_id])->update($map);
			if($res ===false){
				return $this->err('网络错误');
			}
			if($res == 0){
				return $this->err('没有更新项');
			}
			return $this->ok('更新成功'); 
		}else{ 
		    $map['create_time'] = time();  
			$res = @Db::name('ttcard_biographical')->insert($map);
			if(!$res){
				return $this->err('添加失败');
			}	
			return $this->ok('添加成功'); 
		}
    }
}
