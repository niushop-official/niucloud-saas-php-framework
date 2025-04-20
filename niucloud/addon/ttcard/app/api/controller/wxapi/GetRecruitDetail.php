<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetRecruitDetail extends Base
{
    public function index()
    {
        $id = $this->request->param('id');  
        $source = $this->request->param('source');  
        if(!$id){
            return $this->err('参数不正确');
        }
        
        $res = Db::name('ttcard_recruit')->where('site_id',$this->site_id)->where(['id'=>$id,'status'=>'normal'])->find(); 
        
        if(!$res){
            return $this->err('请求失败');
        }
        
        if(strstr($res['city'],'/') && $source != 'edit'){
            $cityArr = explode('/',$res['city']);
            if(count($cityArr) >2){
                $res['city'] = $cityArr[count($cityArr)-2].'/'.$cityArr[count($cityArr)-1];
            }
        } 
        
        $res['tags'] = $this->checkDouhao($res['tags']); 
 
        if($res['website_id']){
            $res['website'] = Db::name('ttcard_website')->where('site_id',$this->site_id)->where(['id'=>$res['website_id'],'status'=>'normal'])->find();
            if(!$res['website']){
                $res['website'] = '';
            }else{
                $res['website']['logo'] = $res['website']['logo']?$this->cdnurl($res['website']['logo'], true):'';
                
                $findIndustry = Db::name('ttcard_industry')->where('site_id',$this->site_id)->where(['id'=>$res['website']['industry_id'],'status'=>'normal'])->find();
                $res['website']['industry_name'] = $findIndustry ? $findIndustry['name'] : '';
            }
            // 获取当前微官网的认证状态
            $select_authentication = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$res['website']['user_id'],'status'=>'normal','ordertype_id'=>2])->field('ordertype_id,examine_status,id')->order('id desc')->find();
              
            $res['website']['authentication_info'] = $select_authentication ? $select_authentication : '';
        }
         
        $res['authenticationSwitch'] = $this->get_addon_config()['authentication_switch'];
          
        return $this->ok('请求成功',$res); 
    }
}
