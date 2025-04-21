<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetBiographicalDetail extends Base
{
    public function index()
    {
        $id = $this->request->param('biographical_id');
		$tabCur = $this->request->param('tabCur');
		if(!$id){
			return $this->err('参数不正确');
		}
		$res = Db::name('ttcard_biographical')->where('site_id',$this->site_id)->where(['id'=>$id,'status'=>'normal'])->find(); 
		
		if(!$res){
			return $this->err('请求失败');
		}
		if($tabCur == 1){
			@Db::name('ttcard_biographicaldelive')->where('site_id',$this->site_id)->where(['from_user_id'=>$res['user_id'],'biographical_id' => $id])->update(['view_status'=>1]);
			@Db::name('ttcard_biographical')->where('site_id',$this->site_id)->where(['id' => $id])->setInc('view_num');
			
		}
		if($tabCur == 2){
			$res['recruit'] = Db::name('ttcard_recruit')->where('site_id',$this->site_id)->where(['id'=>$id,'status'=>'normal'])->field('id,title,position')->find();
			if(!$res['recruit']){
				$res['recruit'] = '';
			}
		}
		$res['avatar'] = $res['avatar']?$this->cdnurl($res['avatar'], true):'';
		$res['reporttime'] = date('Y-m-d',$res['reporttime']);
		$res['certificate_images'] = $this->checkDouhao($res['certificate_images']);
		if(count($res['certificate_images']) > 0){
			foreach($res['certificate_images'] as $key => &$value){
				$value = $value? $this->cdnurl($value, true):'';
			}
		}
		 
		return $this->ok('请求成功',$res); 
    }
}
