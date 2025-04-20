<?php

namespace app\listener\qrcode;

use app\listener\notice_template\BaseNoticeTemplate;

/**
 * 生成微信公众号二维码
 */
class WechatQrcodeListener extends BaseNoticeTemplate
{

    public function handle(array $params)
    {
        if ('wechat' == $params['channel'] || $params['channel'] == 'h5') {
            $page = $params['page'];
            $url = $params['url'];
            $data = $params['data'];
            $path = $params['filepath'];
            $outfile = $params['outfile'] ?? true;
            if($outfile === false){
                $path = false;
            }
            //生成二维码
            if(!empty($page)){
                $url = $url.'/'.$page;
            }
            if(!empty($data)){
                $scene = [];
                foreach($data as $v){
                    $scene[] = $v['key'].'='.$v['value'];
                }
                $url .= '?'.implode('&', $scene);
            }
            ob_start();//开启缓冲区
            \core\util\QRcode::png($url, $path, QR_ECLEVEL_L, 4, 1);
            if($outfile === false){
                $img = ob_get_contents();//获取缓冲区内容
                $path = 'data:image/png;base64,' . base64_encode($img);//转base64
            }
            ob_end_clean();//清除缓冲区内容
            ob_flush();
            return $path;
        }
    }

}