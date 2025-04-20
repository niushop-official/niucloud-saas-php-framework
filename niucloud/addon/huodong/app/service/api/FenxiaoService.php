<?php

namespace addon\huodong\app\service\api;

use addon\huodong\app\model\banner\Banner;
use addon\huodong\app\model\fxuser\Fxuser;
use addon\huodong\app\model\order\Order;
use addon\huodong\app\service\core\ConfigService;
use app\model\member\Member;

use core\base\BaseApiService;
use PhpOffice\PhpSpreadsheet\Calculation\Statistical\Distributions\F;
use think\facade\Db;
use addon\huodong\app\model\relation\Relation;

class FenxiaoService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getmyfxuser()
    {
        $FxuserModel = new Fxuser();
        return $FxuserModel->where([["site_id", "=", $this->site_id], ["member_id", "=", $this->member_id]])->findOrEmpty()->toArray();
    }

    public function apply()
    {
        $post = input('');

        $FxuserModel = new Fxuser();
        $fxuser =  $FxuserModel->where([["site_id", "=", $this->site_id], ["member_id", "=", $this->member_id]])->findOrEmpty()->toArray();

        $updata['type'] = $post['type'];
        $updata['member_id'] = $this->member_id;
        $updata['site_id'] = $this->site_id;
        $updata['mobile'] = $post['mobile'];
        $updata['name'] = $post['name'];
        $updata['ying_image'] = $post['ying_image']??'';
        $updata['status'] = 1;
        $updata['fail_msg'] = '';
        if(!empty($fxuser)){
            $FxuserModel->where('id', $fxuser['id'])->strict(false)->update($updata);
        }else{
            $FxuserModel->strict(false)->insertGetId($updata);
        }

        return $fxuser;
    }

    public function teamlist()
    {
        $post = input('');
        $page = empty(input('page'))?1:input('page');
        $psize = empty(input('rows'))?10:input('rows');
        $qishi = ($page - 1) * $psize;

        $where = array();
        if(isset($post['keyword'])&&$post['keyword']!=''){
            $where[] =['b.nickname','like','%'.$post['keyword'].'%'];
        }
        $where[] =['b.site_id','=',$this->site_id];
        // $FxuserModel = new Fxuser();
        // $fxuser =  $FxuserModel->where([["site_id", "=", $this->site_id], ["member_id", "=", $this->member_id]])->findOrEmpty()->toArray();


        if($post['level']==1){
            $where[] = ['a.pid','=',$this->member_id];
        }else  if($post['level']==2){
            $where[] = ['a.pid2','=',$this->member_id];

        }


        $total = Db::name('huodong_relation')->alias('a')->join('member b','a.member_id = b.member_id')->count();
        $list = Db::name('huodong_relation')->alias('a')->join('member b','a.member_id = b.member_id')->field('a.*,b.nickname,b.headimg,b.mobile')->where($where)->limit($qishi,$psize)->order('id desc')->select();
        foreach ($list as $k => &$v) {

        }


        return ['data'=>$list,'total'=>$total];
    }

}
