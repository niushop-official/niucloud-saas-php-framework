<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;

class GetConfigSwitch extends Base
{
    public function index()
    {
		$config = $this->get_addon_config();
		$data = [];  
		$indexSwiper = $this->checkDouhao($config['indexSwiper']);
		foreach($indexSwiper as $k => $v){
			$indexSwiper[$k] = $this->cdnurl($v,true);
		}
		$data['indexSwiper'] = $indexSwiper;
		$data['wechat_auditing'] = isset($config['wechat_auditing'])?$config['wechat_auditing']:0;
		$data['dxbLogin_switch'] = $config['dxbLogin_switch']; 
		$data['accountLogin_switch'] = $config['accountLogin_switch'];
		$data['authentication_switch'] = $config['authentication_switch'];
		$data['vip_switch'] = $config['vip_switch'];
		$data['miniappIndexTitle'] = $config['miniappIndexTitle'];
		$data['recruit_switch'] = $config['recruit_switch'];
		$data['addCard_switch'] = $config['addCard_switch'];
		return $this->ok('请求成功',$data);
    }
}
