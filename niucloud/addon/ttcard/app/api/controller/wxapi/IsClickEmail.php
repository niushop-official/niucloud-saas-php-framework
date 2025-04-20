<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class IsClickEmail extends Base
{
    public function index()
    {
      $card_id = $this->request->param('card_id');  
      if(!$card_id){
        return $this->ok('请求成功'); 
      }
      $map = [
        'type'=>'email',
        'site_id'=>$this->site_id,
        'card_id'=>$card_id,
        'create_time'=>time(), 
      ];
      $monthTotal = @Db::name('ttcard_statistics')->insert($map);
      return $this->ok('请求成功'); 
    }
}
