<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\shortvideo\app\service\api;

use addon\shortvideo\app\model\Video;
use addon\shortvideo\app\model\Cate;
use addon\shortvideo\app\model\Comment;
use addon\shortvideo\app\model\CommentLike;
use addon\shortvideo\app\model\CommentReply;
use addon\shortvideo\app\model\Config;
use addon\shortvideo\app\model\Like;
use app\model\member\Member;
use think\facade\Db;
use addon\shortvideo\app\service\core\CoreConfigService;
use app\service\core\weapp\CoreWeappService;


use core\base\BaseApiService;
use app\service\core\site\CoreSiteService;

class ShortvideoService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getvideolist(){
        $post = input('');





        $member_id = $post['member_id']??'';
        $mymember_id = $this->member_id;
       if(isset($post['ismyguanzhu'])&&$post['ismyguanzhu']==1){    //我的关注
            $list = $this->get_ismyguanzhu($mymember_id,$member_id,$post);

        }elseif(isset($post['ismylike'])&&$post['ismylike']==1){    //喜欢
            $list = $this->get_ismylike($mymember_id,$post);

        }else if(isset($post['ismypost'])&&$post['ismypost']==1){  //作品
            $list = $this->get_ismypost($mymember_id,$member_id,$post);


       }else if(isset($post['ismyshen'])&&$post['ismyshen']==1){  //审核中
            $list = $this->get_ismyshen($mymember_id,$post);

        }else{
            $where = [];
            $where[] = ['site_id','=',$this->site_id];
            $where[] = ['status','=',1];
            if(input('param.cate_id') && input('param.cate_id')!='all'){
                $where[] = ['cate_id','=',input('param.cate_id')];
            }
           if(input('param.tauid') && input('param.tauid')!=''){
               $where[] = ['member_id','=',input('param.tauid')];
           }
           if(input('param.keyword') && input('param.keyword')!=''){
               $where[] = ['name','like','%'.input('param.keyword').'%'];
           }
           if(input('param.label') && input('param.label')!=''){
               $where[] = Db::raw("FIND_IN_SET(".input('param.label').",label_ids)");
           }



           $orderby = 'RAND()';
           if(isset($post['is_news'])&&$post['is_news']==1){
               $list = (new Video())->field('*,url as src')->where($where)->order('id desc')->limit(10)->select()->toArray();
           }else{
               $list = (new Video())->field('*,url as src')->where($where)->orderRaw($orderby)->limit(10)->select()->toArray();
           }


        }

        $videoList = $this->zhuan_list($list,$mymember_id);


        if(isset($post['id'])&&$post['id']){
            $videoone = (new Video())->where('id',$post['id'])->where('site_id',$this->site_id)->findOrEmpty();
            if(!empty($videoone)){
                $videoList = array_merge([$videoone],$videoList);
            }
        }






        $commentnumList = Db::name('shortvideo_comment')->field('video_id,count(*) as c')->where('site_id',$this->site_id)->group('video_id')->select()->toArray();



        $commentnumArr = [];
        foreach($commentnumList as $k=>$v){
            $commentnumArr[$v['video_id']] = $v['c'];
        }
        $videoList =array_values($videoList);

        $videoList = $this->zhuan_list($videoList,$mymember_id);





        $rdata = [];
        $rdata['status'] = 1;
        $rdata['videoList'] = $videoList;
        return $rdata;
    }




    //将视频数据转换
    public function zhuan_list($list,$myuid)
    {
        $zanArr = Db::name('shortvideo_like')->where('site_id',$this->site_id)->where('member_id',$this->member_id)->column('video_id');

        $site_addon = (new CoreSiteService())->getAddonKeysBySiteId(request()->siteId());



        foreach($list as $k=>&$v){
            if(in_array($v['id'],$zanArr)){
                $list[$k]['is_like'] = true;
            }else{
                $list[$k]['is_like'] = false;
            }
//            $v['cover'] = $v['cover']?explode(',',$v['cover'])[0]:'';
            $v['pingnum'] = Db::name('shortvideo_comment')->where('site_id',$this->site_id)->where('video_id',$v['id'])->count();

            $v['member'] = Db::name('member')->field('member_id,nickname,headimg')->where('site_id',$this->site_id)->where('member_id',$v['member_id'])->findOrEmpty();
            $v['member']=  $this->moren_avatar($v['member']);
            //自己是否关注
            $isfollow = Db::name('shortvideo_follow')->field('id')->where('member_id',$this->member_id)->where('to_member_id',$v['member_id'])->findOrEmpty();
            if(!empty($isfollow)){
                $v["isfollow"] = true;
            }else{
                $v["isfollow"] = false;
            }

            //关联商品
            $v['goods'] = '';
            if (in_array('shop', $site_addon)&&isset($v['goods_ids'])&&$v['goods_ids']){

               $v['goods'] = Db::name('shop_goods')->alias('a')->join('shop_goods_sku b','a.goods_id = b.goods_id')->field('a.goods_id,a.goods_cover,a.goods_name,a.goods_image,b.sale_price')->where('a.site_id',$this->site_id)->where('a.goods_id',$v['goods_ids'])->order('b.sale_price asc')->limit(1)->findOrEmpty();


            };

        }




        return $list;
    }

    public function get_ismypost($mymember_id,$member_id,$post){//作品


        $page = $post['page']?$post['page']:1;
        $limit = $post['limit']?$post['limit']:10;
        $status = $post['status']??'';
        $where = array();
        $db = Db::name('shortvideo_video');


        /**  by 作者:Sen_D QQ:1256610489 承接程序开发 2023/5/26 15:05  **/
        if($member_id==$mymember_id){
            $db->where('member_id', $member_id);//->where('status', 1);

        }else{
            //别人的
            $db->where('member_id', $member_id)->where('status', 1)->where('is_show', 1);

        }
        if(isset($post['cate_id'])&&$post['cate_id']){
            $where['cate_id'] = $post['cate_id'] ;
        }

        $field = '*';


        $list = $db->where($where)->field($field)->order('id desc')->limit(($page - 1) * $limit , $limit)->select()->toArray();


        $list = $this->zhuan_list($list,$mymember_id);
        return $list;

    }
    //审核中
    public function get_ismyshen($mymember_id,$post){
        $page = $post['page']?$post['page']:1;
        $limit = $post['limit']?$post['limit']:10;

        $where = array();
        $db = Db::name('shortvideo_video');
        $db->where('status', '<>', 1);
        $db->where('member_id', $mymember_id);
        $order = 'id desc';
        $field = '*';

        if(isset($post['cate_id'])&&$post['cate_id']){
            $where['cate_id'] = $post['cate_id'] ;
        }

        $list = $db->where($where)->field($field)->order('id desc')->limit(($page - 1) * $limit , $limit)->select()->toArray();
        $list = $this->zhuan_list($list,$mymember_id);
        return $list;
    }
    public function get_ismyguanzhu($mymember_id,$member_id,$post)
    {
        $page = $post['page']?$post['page']:1;
        $limit = $post['limit']?$post['limit']:10;
        $db = Db::name('shortvideo_video');

        $mymember_id = $this->member_id;
        $where = array();
//        if(isset($post['cate_id'])&&$post['cate_id']){
//            $where['cate_id'] = $post['cate_id'] ;
//        }else{
//            $cate_id = Db::name('shortvideo_cate')->where('status',1)->order('sort desc')->value('id');
//            $db->where('cate_id',$cate_id);
//        }
        if(input('param.keyword') && input('param.keyword')!=''){
            $where['a.name'] = ['like','%'.input('param.keyword').'%'];
        }
        if(input('param.label') && input('param.label')!=''){
            $where[] = Db::raw("FIND_IN_SET(".input('param.label').",label_ids)");
        }
        $ids = Db::name('shortvideo_video')->alias('a')->join('shortvideo_follow b','a.member_id = b.to_member_id')->field('a.id')->where('b.member_id',$mymember_id)->order('b.id desc')->column('a.id');
        $db->whereIn('id', $ids)->where('status', 1)->where('is_show', 1);
        $db->orderRaw('rand()');
        $field = '*';

        $list = $db->field($field)->limit(($page - 1) * $limit , $limit)->select()->toArray();
        $list = $this->zhuan_list($list,$mymember_id);
        return $list;
    }

    public function get_ismylike($mymember_id,$post){ //喜欢
        $page = $post['page']?$post['page']:1;
        $limit = $post['limit']?$post['limit']:10;
        /**  作者:haha1256610  2024/2/4 17:49  **/
        $member_id = $post['member_id']??'';
        if($member_id){
            $where['b.member_id'] = $member_id;
        }else{
            $where['b.member_id'] = $mymember_id;
        }

        $where['a.status'] = 1;
        $where['a.is_show'] = 1;
        if(input('param.keyword') && input('param.keyword')!=''){
            $where['a.name'] = ['like','%'.input('param.keyword').'%'];
        }
        if(input('param.label') && input('param.label')!=''){
            $where[] = Db::raw("FIND_IN_SET(".input('param.label').",label_ids)");
        }
        $field = '*';

        $list = Db::name('shortvideo_video')->alias('a')->join('shortvideo_like b','a.id = b.video_id')->field('a.*,b.id as bid')->where($where)->order('b.id desc')->limit(($page - 1) * $limit , $limit)->select()->toArray();


        $list = $this->zhuan_list($list,$mymember_id);
        return $list;
    }




    public function addviews(){
        $post = input('');
        (new Video())->where('site_id',$this->site_id)->where('id',$post['id'])->inc('view_num')->update();
        return [];
    }

    public function getcommentlist(){
        $id = input('param.id/d');
        $pernum = 20;
        $page = input('post.page');
        if(!$page) $page = 1;
        $datalist = Db::name('shortvideo_comment')->where('video_id',$id)->where('status',1)->page($page,$pernum)->order('id desc')->select()->toArray();
        if(!$datalist) $datalist = array();
        foreach($datalist as $k=>&$v){
            $v=  $this->moren_avatar($v);
            $rs = Db::name('shortvideo_comment_like')->where('pid',$v['id'])->where('member_id',$this->member_id)->findOrEmpty();
            if($rs){
                $v['is_like'] = true;
            }else{
                $v['is_like'] = false;
            }
            //回复
            $replylist = Db::name('shortvideo_comment_reply')->field('nickname,headimg,content,adddate')->where('pid',$v['id'])->where('status',1)->order('id desc')->select()->toArray();
            foreach($replylist as $k2=>&$v2){
                $v2=  $this->moren_avatar($v2);
                $v2['adddate'] = $this->timeAgo(strtotime($v2['adddate']));
                $replylist[$k2] = $v2;
            }
            $v['replylist'] = $replylist;
            $v['adddate'] = $this->timeAgo(strtotime($v['adddate']));
            $datalist[$k] = $v;


        }
        return ['status'=>1,'data'=>$datalist];
    }
    //点赞
    public function tolike(){

        $id = input('get.id/d');
        $detail = (new Video())->where('id',$id)->findOrEmpty();
        $like = Db::name('shortvideo_like')->where('video_id',$id)->where('member_id',$this->member_id)->findOrEmpty();
        if($like){
            Db::name('shortvideo_like')->where('video_id',$id)->where('member_id',$this->member_id)->delete();
            $is_like = false;
            (new Video())->where('id',$id)->dec('like_num')->update();
        }else{
            $data = [];
            $data['site_id'] = $this->site_id;
            $data['video_id'] = $id;
            $data['member_id'] = $this->member_id;
            Db::name('shortvideo_like')->insert($data);
            $is_like = true;
            (new Video())->where('id',$id)->inc('like_num')->update();
        }
        $like_num = (new Video())->where('id',$id)->value('like_num');
        return ['status'=>1,'is_like'=>$is_like,'like_num'=>$like_num];
    }

    public function tocomment(){

        $id = input('param.id/d');
        $hfid = input('param.hfid/d');
        $content = trim(input('param.content'));

        if(!$this->member_id){
            return ['status'=>0,'msg'=>'请先登录'];
        }
        $detail = (new Video())->where('id',$id)->where('status',1)->findOrEmpty();
        $member = (new Member())->where('member_id',$this->member_id)->findOrEmpty();

        if($content==''){
            return ['status'=>0,'msg'=>'请输入评论内容'];
        }
        if($hfid==0){
            $data = [];
            $data['site_id'] = $this->site_id;
            $data['member_id'] = $this->member_id;
            $data['video_id'] = $id;
            $data['headimg'] = $member['headimg'];
            $data['nickname'] = $member['nickname'];
            $data['content'] = $content;
            $config = (new CoreConfigService)->getConfig(['site_id'=>$this->site_id]);
            if($config['open_pingshen']==1){
                $data['status'] = 0;
                $msg = '提交成功，请等待审核';
            }else{
                $data['status'] = 1;
                $msg = '发表评论成功';
            }
            Db::name('shortvideo_comment')->insert($data);
        }else{
            $data = [];
            $data['site_id'] = $this->site_id;
            $data['member_id'] = $this->member_id;
            $data['video_id'] = $id;
            $data['pid'] = $hfid;
            $data['headimg'] = $member['headimg'];
            $data['nickname'] = $member['nickname'];
            $data['content'] = $content;


            $config = (new CoreConfigService)->getConfig(['site_id'=>$this->site_id]);
           if($config['open_pingshen']==1){
                $data['status'] = 0;
                $msg = '提交成功，请等待审核';
            }else{
                $data['status'] = 1;
                $msg = '发表评论成功';
            }
            Db::name('shortvideo_comment_reply')->insert($data);
        }
        $commentnum = Db::name('shortvideo_comment')->where('video_id',$id)->where('status',1)->count();
        return ['status'=>1,'msg'=>$msg,'commentnum'=>$commentnum];
    }

    //评论点赞
    public function commentlike(){

        if(!$this->member_id){
            return ['status'=>0,'msg'=>'请先登录'];
        }
        $post = input('');

        $id = $post['id'];
        $pinglun = Db::name('shortvideo_comment')->where('id',$id)->findOrEmpty();


        $like = Db::name('shortvideo_comment_like')->where('pid',$id)->where('member_id',$this->member_id)->findOrEmpty();
        if($like){
            Db::name('shortvideo_comment_like')->where('pid',$id)->where('member_id',$this->member_id)->delete();
            $type = 0;
            Db::name('shortvideo_comment')->where('id',$id)->dec('like_num')->update();
        }else{
            $data = [];
            $data['site_id'] = $this->site_id;
            $data['pid'] = $id;
            $data['member_id'] = $this->member_id;
            Db::name('shortvideo_comment_like')->insert($data);
            $type = 1;
            Db::name('shortvideo_comment')->where('id',$id)->inc('like_num')->update();
        }
        $like_num = Db::name('shortvideo_comment')->where('id',$id)->value('like_num');
        return ['status'=>1,'type'=>$type,'like_num'=>$like_num];
    }

    function timeAgo($timestamp) {
        $currentTime = time();
        $diff = $currentTime - $timestamp;

        if ($diff < 60) {
            return "刚刚";
        } elseif ($diff < 3600) {
            return floor($diff / 60). "分钟前";
        } elseif ($diff < 86400) {
            return floor($diff / 3600). "小时前";
        } elseif ($diff < 2592000) {
            return floor($diff / 86400). "天前";
        } elseif ($diff < 31536000) {
            return floor($diff / 2592000). "个月前";
        } else {
            return floor($diff / 31536000). "年前";
        }
    }


    //发布短视频
    public function toaddvideo(){

       $post = input('');
        $data = [];
        $data['site_id'] = $this->site_id;

        $data['cate_id'] = $post['cate_id']??'';
        $data['member_id'] = $this->member_id;
        $data['name'] = $post['name']??'';;
        $data['desc'] = $post['desc']??'';;
        $data['cover'] = $post['cover']??'';;
        $data['url'] = $post['url']??'';;
        $data['goods_ids'] = $post['goods_ids']??'';;
        $data['label_ids'] = $post['label_ids']??'';;
        $data['status'] = 0;
        $msg = '提交成功，请等待审核';
        $id = (new Video())->insertGetId($data);
        return ['status'=>1,'msg'=>$msg];

    }


    //我的发表记录
    public function myvideo_list(){

        $where[] = ['site_id', '=', $this->site_id];
        $where[] = ['member_id', '=', $this->member_id];
        $st = input('param.st');
        if(!input('?param.st') || input('param.st') === ''){
            $st = 'all';
        }
        if(input('param.keyword')) $where[] = ['name|description', 'like', '%'.input('param.keyword').'%'];

        $countall = (new Video())->where($where)->count();
        $count0 = (new Video())->where(array_merge($where,[['status', '=', 0]]))->count();
        $count1 = (new Video())->where(array_merge($where,[['status', '=', 1]]))->count();

        if($st == 'all'){

        }elseif($st == '0'){
            $where[] = ['status', '=', 0];
        }elseif($st == '1'){
            $where[] = ['status', '=', 1];
        }
        $pernum = 20;
        $page = input('post.page');
        if(!$page) $page = 1;
        $datalist = (new Video())->where($where)->page($page,$pernum)->order('id desc')->select();
        if(!$datalist) $datalist = array();
        if(request()->isAjax()){
            return ['status'=>1,'data'=>$datalist];
        }
        $rdata = [];
        $rdata['countall'] = $countall;
        $rdata['count0'] = $count0;
        $rdata['count1'] = $count1;
        $rdata['datalist'] = $datalist;
        $rdata['st'] = $st;
        return $rdata;
    }

    public function myvideo_status(){

        $st = input('get.is_show/d');
        $id = input('get.id/d');

        (new Video())->where('site_id',$this->site_id)->where('member_id',$this->member_id)->where('id',$id)->update(['is_show'=>$st]);
        return ['status'=>1,'msg'=>'操作成功'];
    }

    public function myvideo_del(){

        $id = input('get.id/d');
        $rs = (new Video())->where('site_id',$this->site_id)->where('member_id',$this->member_id)->where('id',$id)->delete();
        return ['status'=>1,'msg'=>'操作成功'];
    }

    public function getcatelist(){
        $cateModel = new Cate();
        return $cateModel->where([["site_id","=",$this->site_id]])->where('status',1)->select()->toArray();
    }

    public function getuserinfo()
    {
        $post = input('');
        $mymember_id = $this->member_id;
        if($post['member_id']??''){
//            $member = Db::name('member')->where('member_id',$post['member_id'])->findOrEmpty();
        }else{
//            $member = Db::name('member')->where('member_id',$this->member_id)->findOrEmpty();
            $post['member_id'] = $this->member_id;
            $post['member_id'] = $this->member_id;

            Db::name('member')->where('member_id', $this->member_id)->update(['last_visit_time'=>time()]);
        }



        $user = Db::name('member')->field('member_id,nickname,headimg,create_time,last_visit_time')->where('member_id',$post['member_id'])->findOrEmpty();

        $user=  $this->moren_avatar($user);


        $user['last_visit_time'] =  $this->timeAgo($user['last_visit_time']);

        $user['follownum'] = Db::name('shortvideo_follow')->field('id')->where('member_id',$post['member_id'])->count();
        $user['fensinum'] = Db::name('shortvideo_follow')->field('id')->where('to_member_id',$post['member_id'])->count();
        if($post['member_id']!=$mymember_id){
            $user['videonum'] =  Db::name('shortvideo_video')->field('id')->where('member_id',$post['member_id'])->where('status',1)->where('is_show',1)->count();
        }else{
            $user['videonum'] =  Db::name('shortvideo_video')->field('id')->where('member_id',$post['member_id'])->count();

        }
        $user['likenum'] = $list = Db::name('shortvideo_video')->alias('a')->join('shortvideo_like b','a.id = b.video_id')->field('a.id')->where('b.member_id', $post['member_id'])->where('a.status',1)->where('a.is_show',1)->count();

        $user['belikenum'] = $list = Db::name('shortvideo_video')->alias('a')->join('shortvideo_like b','a.id = b.video_id')->field('a.id')->where('a.member_id', $post['member_id'])->where('a.status',1)->where('a.is_show',1)->count();



        $user['shennum'] = Db::name('shortvideo_video')->field('id')->where('member_id',$post['member_id'])->where('status','<>',1)->count();


        $user["ismy"] = $post['member_id'] == $mymember_id?true:false;
        $user["my_id"] = $mymember_id;
        //自己是否关注
        $isfollow = Db::name('shortvideo_follow')->field('id')->where('member_id',$mymember_id)->where('to_member_id',$post['member_id'])->findOrEmpty();
        if(!empty($isfollow)){
            $user["isfollow"] = true;
        }else{
            $user["isfollow"] = false;
        }
        //是否被关注
        $ishufen = Db::name('shortvideo_follow')->field('id')->where('member_id',$post['member_id'])->where('to_member_id', $mymember_id)->findOrEmpty();
        $user["isfensi"] = $ishufen?true:false;

//        $user['phone'] = substr_replace($user['phone'], '****',3, 4);
        $data['userinfo'] = $user;

        return $data;
    }
    //关注用户
    public function tofollowuser()
    {
        $post = input('');

        $follow = Db::name('shortvideo_follow')->where('to_member_id',$post['member_id'])->where('member_id',$this->member_id)->findOrEmpty();
        if(empty($follow)){
            $indata['member_id'] = $this->member_id;
            $indata['to_member_id'] = $post['member_id'];
            $ret = Db::name('shortvideo_follow')->insert($indata);
        }else{
            $ret = Db::name('shortvideo_follow')->where('member_id',$this->member_id)->where('to_member_id',$post['member_id'])->delete();
        }

        return [];
    }




    //关注列表
    public function getfollowlist()
    {
        $post = input('');

        $page = $post['page']?$post['page']:1;
        $limit = $post['limit']?$post['limit']:10;
        $status = $post['status'];

        $mymember_id = $this->member_id;
        if($mymember_id == $post['member_id'] || empty($post['member_id'])){  //我的
            $member_id  = $mymember_id;
            $isme = true;
        }else{
            $member_id = $post['member_id'];  //她的
            $isme = false;
        }

        $where = array();

        $where['member_id'] = $member_id;

        $list = Db::name('shortvideo_follow')->where($where)->order('id asc')->limit(($page - 1) * $limit , $limit)->select()->toArray();
        foreach ($list as $k => $v) {

            //自己是否关注
            $isfollow = Db::name('shortvideo_follow')->field('id')->where('member_id',$mymember_id)->where('to_member_id',$v['to_member_id'])->findOrEmpty();
            if(!empty($isfollow)){
                $list[$k]["isfollow"] = true;
            }else{
                $list[$k]["isfollow"] = false;
            }
            //是否被关注
            $ishufen = Db::name('shortvideo_follow')->field('id')->where('member_id',$v['to_member_id'])->where('to_member_id',$mymember_id)->findOrEmpty();
            $list[$k]["isfensi"] = $ishufen?true:false;


            $list[$k]["user"] = Db::name('member')->field('member_id,nickname,headimg')->where('member_id',$v['to_member_id'])->findOrEmpty();
            if(!$list[$k]["user"]){
                unset($list[$k]);
            }
            $list[$k]["user"]=  $this->moren_avatar($list[$k]["user"]);


        }
        $list = array_values($list);
        return ['list'=>$list,'isme'=>$isme];
    }

    public function moren_avatar($user)
    {
        if(!$user['headimg']){
            $user['headimg'] = 'http://'.$_SERVER['HTTP_HOST'].'/addon/shortvideo/static/img/avatar.png';
        }
        return $user;
    }


    //粉丝列表
    public function getfensilist()
    {
        $post = input('');

        $page = $post['page']?$post['page']:1;
        $limit = $post['limit']?$post['limit']:10;
        $status = $post['status'];

        $mymember_id = $this->member_id;
        if($mymember_id == $post['member_id'] || empty($post['member_id'])){
            $member_id  = $mymember_id;
            $isme = true;
        }else{
            $member_id = $post['member_id'];
            $isme = false;
        }

        $where = array();
        $where['to_member_id'] = $member_id;

        $list = Db::name('shortvideo_follow')->where($where)->order('id asc')->limit(($page - 1) * $limit , $limit)->select()->toArray();
        foreach ($list as $k => $v) {

            $isfollow = Db::name('shortvideo_follow')->field('id')->where('member_id',$mymember_id)->where('to_member_id',$v['member_id'])->findOrEmpty();
            if(!empty($isfollow)){
                $list[$k]["isfollow"] = $isfollow;
            }else{
                $list[$k]["isfollow"] = $isfollow;
            }

            $ishufen = Db::name('shortvideo_follow')->field('id')->where('member_id',$v['member_id'])->where('to_member_id', $mymember_id)->findOrEmpty();
            $list[$k]["isfensi"] = $ishufen?true:false;

            $list[$k]["user"] = Db::name('member')->field('member_id,nickname,headimg')->where('member_id',$v['member_id'])->findOrEmpty();
            $list[$k]["user"]=  $this->moren_avatar($list[$k]["user"]);

        }
        return ['list'=>$list,'isme'=>$isme];
    }


    //获取视频详情
    public function getvideodetail()
    {

        $post = input('');

        $video = Db::name('shortvideo_video')->where('id',$post['id'])->findOrEmpty();
        if(empty($video)){
            return app('json')->fail('视频不存在!');
        }
        $video['banner'] = $video['banner']?explode(',',$video['banner']):[$video['cover']];
        $video['videourl'] = $video['src'];
        return ['list'=>$video];
    }




    public function getposter()
    {
        $post = input('');

        $video = (new Video())->where('id',$post['video_id'])->findOrEmpty()->toArray();


        $member = (new Member())->field('nickname,headimg')->where('member_id',$this->member_id)->findOrEmpty()->toArray();
        if(!$member['headimg']){
            $member['headimg'] = 'http://'.$_SERVER['HTTP_HOST'].'/addon/shortvideo/static/img/avatar.png';
        }


        $data = array_merge($video,$member);
        $data['cover'] = $data['cover']?explode(',',$data['cover'])[0]:'';


        $data['url'] = 'http://'.$_SERVER['HTTP_HOST'].'/wap/'.$this->site_id.'/#/addon/shortvideo/pages/detail/index?id='.$video['id'].'&tauid='.$this->member_id.'&pid='.$this->member_id;

        $data['desc'] = date('m月d日 H:i').' | 精彩视频';

        if($this->channel=='weapp'){
            $data= $this->getmpqrcode($data);
        }


        $data['site_name']= Db::name('site')->where('site_id', $this->site_id)->value('site_name');

        return ['code' => 1, 'msg' => '操作成功','data'=>$data];
    }

    public function getmpqrcode($post)
    {

        $page = 'addon/shortvideo/pages/index';
        $data = [];
        $data[] = ['key'=>'id','value'=>$post['id']];
        $data[] = ['key'=>'pid','value'=>$this->member_id];
        $data[] = ['key'=>'tauid','value'=>$this->member_id];

        $root = $_SERVER['DOCUMENT_ROOT'];

        $qrcodePath = $root . '/upload/shortvideo_poster/'.date('Ymd').'/';

        if (!is_dir($qrcodePath)) {
            dir_mkdir($qrcodePath);
            //@mkdir($qrcodePath, 0700);
        }
        $filename = md5(json_encode($data)) . '.png';
        $filepath = $qrcodePath . $filename;


        return $post;

        $ret = (new CoreWeappService)->qrcode($this->site_id, $page, $data, $filepath, 430);

        if(!empty($ret)){
            $ret = explode('/public/',$ret)[1];
            $ret = 'http://'.$_SERVER['HTTP_HOST'].'/'.$ret;
            $post['mpcode'] = $ret;
        }



        return $post;
    }

    public function config()
    {

        $data['site_id'] = $this->site_id;
        $info = (new CoreConfigService)->getConfig($data);

        return $info;
    }

    public function getGoodsAll()
    {



        $config = $this>config();
        if($config['open_shop']==0){
            return [];
        }
        $info = Db::name('shop_goods')->alias('a')->join('shop_goods_sku b','a.goods_id = b.goods_id')->field('a.goods_id,a.goods_cover,a.goods_name,a.goods_image,b.sale_price')->where('a.site_id',$this->site_id)->order('b.sale_price asc')->select()->toArray();
        return $info;
    }


}
