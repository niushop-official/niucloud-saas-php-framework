<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class DeleteProduct extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];
		
		$product_id = $this->request->param('product_id'); 
		if(!$product_id){
			return $this->err('参数不正确');
		}
		
		$res = Db::name('ttcard_product')->where('site_id',$this->site_id)->where(['id'=>$product_id,'user_id'=>$user_id])->delete();
		if(!$res){
			return $this->err('删除失败');
		}
		return $this->ok('删除成功'); 
    }
}
