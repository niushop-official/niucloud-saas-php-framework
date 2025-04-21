<?php

namespace addon\tk_vip\app\dict\real;


/**
 *审核状态枚举类
 */
class RealDict
{
    //等待审核
    const WAIT_AUDIT = 0;
    //审核成功
    const AUDIT_SUCCESS = 1;
    //审核失败
    const AUDIT_FATL = 2;


    public static function getRealStatus($status='')
    {
        $data= [
            self::WAIT_AUDIT =>[
                'name' => '待审核',
                'status' => self::WAIT_AUDIT,
            ],
            self::AUDIT_SUCCESS =>[
                'name' => '认证成功',
                'status' => self::AUDIT_SUCCESS,
            ],
            self::AUDIT_FATL =>[
                'name' => '认证失败',
                'status' => self::AUDIT_FATL,
            ],
        ];
        if($status!=''){
            return $data[$status];
        }else{
            return $data;
        }
    }
}