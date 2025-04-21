<?php
#######################################################################
# File Name: TurntableValidate.php
# Desc:
# Author: hd
# Created Time: 2024/6/25 11:46
#######################################################################
namespace addon\turntable\app\validate;
use core\base\BaseValidate;

class TurntableValidate extends BaseValidate{
    protected $rule = [
        'game_name'             => 'require|string',
        'level_id'              => 'require|integer',
        'game_id'               => 'require|integer',
        'template_name'         => 'require|string',
        'level_name'            => 'array',
        'points'                => 'require|integer',
        'start_time'            => 'require|string',
        'end_time'              => 'require|string',
        'winning_rate'          => 'require|string',
        'no_winning_desc'       => 'string',
        'no_winning_img'        => 'require|string',
        'is_show_winner'        => 'require|integer',
        'join_type'             => 'require|integer',
        'banner_show'           => 'require',
        'join_frequency'        => 'require|integer',
        'games_award'           => 'array',
        'games_banner'          => 'array'
    ];
    protected $message = [
        'game_name.require'             => ['game_name.require',       [ 'game_name'      ]],
        'level_id.require'              => ['level_id.require',        [ 'level_id'       ]],
        'template_name.require'         => ['template_name.require',   [ 'template_name'  ]],
        'game_id.require'               => ['level_id.require',        [ 'level_id'       ]],
        'level_name'                    => ['level_name',              [ 'level_name'     ]],
        'points.require'                => ['points.require',          [ 'points'         ]],
        'start_time.require'            => ['start_time.require',      [ 'start_time'     ]],
        'end_time.require'              => ['end_time.require',        [ 'end_time'       ]],
        'winning_rate.require'          => ['winning_rate.require',    [ 'winning_rate'   ]],
        'no_winning_desc'               => ['no_winning_desc',         [ 'no_winning_desc']],
        'no_winning_img.require'        => ['no_winning_img.require',  [ 'no_winning_img' ]],
        'is_show_winner.require'        => ['is_show_winner.require',  [ 'is_show_winner' ]],
        'join_type.require'             => ['join_type.require',       [ 'join_type'      ]],
        'banner_show'                   => ['banner_show',             [ 'banner_show'    ]],
        'join_frequency.require'        => ['join_frequency.require',  [ 'join_frequency' ]],
        'games_award.require'           => ['award_data.require',      [ 'award_data'     ]],
        'games_banner'                  => ['games_banner',            [ 'games_banner'   ]],
    ];

    protected $scene = [
        "add" => [
            'game_name',
            'level_id',
            'template_name',
            'level_name',
            'points',
            'start_time',
            'end_time',
            'winning_rate',
            'no_winning_desc',
            'no_winning_img',
            'is_show_winner',
            'join_type',
            'banner_show',
            'join_frequency',
            "games_banner"
        ],
        "edit" => [
            'game_id',
            'game_name',
            'level_id',
            'template_name',
            'level_name',
            'points',
            'start_time',
            'end_time',
            'winning_rate',
            'no_winning_desc',
            'no_winning_img',
            'is_show_winner',
            'join_type',
            'banner_show',
            'join_frequency',
            "games_banner"
        ],
    ];
}