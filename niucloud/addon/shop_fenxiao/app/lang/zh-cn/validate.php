<?php

return [
    //代理商
    'shop_fenxiao_agent_validate' => [
        'agent_member_require' => '请选择分销商',
        'agent_level_require' => '请选择代理商等级',

        'agent_level_name_require' => '请输入代理商等级名称',
        'agent_level_money_require' => '请输入大于0的代理商等级费用',
        'agent_level_discount_require' => '请输入0-10之间数字的代理商等级折扣',
    ],
    //任务奖励
    'shop_fenxiao_task_validate' => [
        'name_require' => '任务名称不能为空',
        'time_type_require' => '请选择活动时间',
        'start_time_require' => '请选择有效的活动开始时间',
        'end_time_require' => '请选择有效的活动结束时间',
        'rules_require' => '请完善奖励指标和奖励内容',
        'level_type_require' => '请选择活动参与等级',
        'level_require' => '请选择活动参与等级',
        'times_require' => '请输入任务循环次数',

        'send_time_type_require' => '请选择有效的发放时间',
        'send_time_require' => '请选择有效的发放时间',
    ]
];