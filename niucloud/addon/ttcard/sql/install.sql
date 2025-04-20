
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_authentication` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) NOT NULL DEFAULT '0',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `website_id` int(10) DEFAULT NULL COMMENT '微官网ID',
  `ordertype_id` int(10) DEFAULT NULL COMMENT '收费类型ID',
  `ordertype_diyname` enum('person','enterprise','permanentvip') DEFAULT NULL COMMENT '收费类型',
  `name` varchar(10) DEFAULT NULL COMMENT '姓名',
  `idcard_num` varchar(50) DEFAULT NULL COMMENT '身份证号',
  `idcard_z_image` varchar(200) DEFAULT NULL COMMENT '身份证正面',
  `idcard_f_image` varchar(200) DEFAULT NULL COMMENT '身份证反面',
  `businesslicense_image` varchar(200) DEFAULT NULL COMMENT '营业执照',
  `tips` varchar(100) DEFAULT NULL COMMENT '备注',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint(16) DEFAULT NULL COMMENT '更新时间',
  `examine_status` enum('1','2','3','4','5') DEFAULT '4' COMMENT '认证状态',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='认证信息管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_biographical` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) DEFAULT '0',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `name` varchar(20) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '电话',
  `avatar` varchar(200) DEFAULT NULL COMMENT '头像',
  `age` int(10) DEFAULT NULL COMMENT '年龄',
  `gender_status` enum('0','1') DEFAULT NULL COMMENT '性别',
  `email` varchar(20) DEFAULT NULL COMMENT '邮箱',
  `wechat_num` varchar(20) DEFAULT NULL COMMENT '微信号',
  `position` varchar(30) DEFAULT NULL COMMENT '应聘职位',
  `expected` varchar(20) DEFAULT NULL COMMENT '期望工资',
  `working` varchar(20) DEFAULT NULL COMMENT '工作时长',
  `type_status` enum('0','1') DEFAULT '1' COMMENT '应聘类型',
  `education` varchar(20) DEFAULT NULL COMMENT '学历',
  `city` varchar(30) DEFAULT NULL COMMENT '期望工作城市',
  `advantage_content` longtext COMMENT '个人优势',
  `experience_content` longtext COMMENT '工作经历',
  `learning_content` longtext COMMENT '教育经历',
  `certificate_images` varchar(1000) DEFAULT NULL COMMENT '资质证书',
  `unemployed_status` enum('0','1') DEFAULT NULL COMMENT '是否待业',
  `delive_num` int(10) DEFAULT '0' COMMENT '投递次数',
  `view_num` int(10) DEFAULT '0' COMMENT '浏览次数',
  `reporttime` bigint(16) DEFAULT NULL COMMENT '最快到岗时间',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='简历管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_biographicaldelive` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) DEFAULT '0',
  `from_user_id` int(10) DEFAULT NULL COMMENT '发送者用户ID',
  `to_user_id` int(10) DEFAULT NULL COMMENT '接收者用户ID',
  `recruit_id` int(10) DEFAULT NULL COMMENT '招聘ID',
  `biographical_id` int(10) DEFAULT NULL COMMENT '简历ID',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `view_status` enum('0','1') DEFAULT '0' COMMENT '招聘者是否查看',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='简历投递管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_card` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) NOT NULL DEFAULT '0' COMMENT '站点ID',
  `user_id` int(10) DEFAULT '0' COMMENT '用户ID',
  `card_bg_id` int(10) DEFAULT '1' COMMENT '名片背景图ID',
  `industry_id` int(10) DEFAULT '0' COMMENT '行业ID',
  `card_diy_bg` varchar(255) DEFAULT NULL COMMENT '名片自定义背景图',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `name` varchar(20) DEFAULT NULL COMMENT '姓名',
  `gender` enum('0','1') DEFAULT NULL COMMENT '性别',
  `age` varchar(5) DEFAULT NULL COMMENT '年龄',
  `phone` bigint(11) DEFAULT NULL COMMENT '手机号',
  `position` varchar(100) DEFAULT NULL COMMENT '职位',
  `tags` varchar(100) DEFAULT NULL COMMENT '个人技能',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `address` varchar(100) DEFAULT NULL COMMENT '地址',
  `wechat_num` varchar(80) DEFAULT NULL COMMENT '微信号',
  `wechat_code_image` varchar(255) DEFAULT NULL COMMENT '微信二维码',
  `description` longtext COMMENT '个人简介',
  `video` varchar(255) DEFAULT NULL COMMENT '视频介绍',
  `createtime` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `recommend` enum('0','1') DEFAULT '0' COMMENT '是否推荐',
  `default_status` enum('0','1') DEFAULT '0' COMMENT '首页默认展示',
  `connections_status` enum('1','0') DEFAULT '1' COMMENT '推送到人脉',
  `weigh` int(10) DEFAULT '0' COMMENT '权重',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态',
  `auditing_status` enum('0','1','2') DEFAULT '0' COMMENT '审核状态',
  `minicode_image` varchar(255) DEFAULT NULL COMMENT '名片码'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='名片管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_cardbackground` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) NOT NULL DEFAULT '0',
  `title` varchar(30) DEFAULT NULL COMMENT '标题',
  `type` enum('card','minicode') DEFAULT 'card' COMMENT '背景图类型',
  `image` varchar(500) DEFAULT NULL,
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='背景图管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_cardmsg` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID',
  `site_id` int(10) DEFAULT '0',
  `type_status` enum('leavemessage','systemmessages') DEFAULT 'leavemessage' COMMENT '消息类型',
  `form_user_id` int(10) DEFAULT NULL COMMENT '发送者',
  `to_user_id` int(11) DEFAULT NULL COMMENT '接受者',
  `card_id` int(10) DEFAULT NULL COMMENT '名片ID',
  `title` varchar(30) DEFAULT NULL COMMENT '标题',
  `content` varchar(500) DEFAULT '' COMMENT '内容',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `status` enum('normal','hidden') DEFAULT 'hidden' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='消息管理';

CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_cases` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) NOT NULL DEFAULT '0',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `card_id` int(10) DEFAULT NULL COMMENT '绑定名片ID',
  `website_id` int(10) DEFAULT NULL COMMENT '绑定微官网ID',
  `title` varchar(30) DEFAULT NULL COMMENT '标题',
  `video` varchar(255) DEFAULT NULL COMMENT '视频介绍',
  `description` longtext COMMENT '案例描述',
  `images` longtext COMMENT '图片介绍',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='成功案例管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_collect` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) DEFAULT '0',
  `user_id` int(10) DEFAULT NULL,
  `card_id` int(10) DEFAULT NULL COMMENT '名片ID',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='收藏管理';

CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_feedback` (
  `id` int(10) UNSIGNED NOT NULL,
  `site_id` int(10) DEFAULT '0',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `title` varchar(30) DEFAULT NULL COMMENT '标题',
  `content` varchar(2000) DEFAULT '' COMMENT '内容',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='意见反馈管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_help` (
  `id` int(10) UNSIGNED NOT NULL,
  `site_id` int(10) NOT NULL DEFAULT '0',
  `title` varchar(30) DEFAULT NULL COMMENT '标题',
  `content` varchar(2000) DEFAULT '' COMMENT '内容',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='使用帮助管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `site_id` int(10) DEFAULT '0',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `card_id` int(10) DEFAULT NULL COMMENT '绑定名片ID',
  `images` longtext COMMENT '图片',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `status` enum('normal','hidden') NOT NULL DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='相册管理';

CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_impression` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID',
  `site_id` int(10) NOT NULL DEFAULT '0',
  `name` varchar(30) DEFAULT '' COMMENT '类型'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='个人印象管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_impressionlog` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID',
  `site_id` int(10) DEFAULT '0',
  `impression_id` int(11) DEFAULT NULL COMMENT '印象ID',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `card_id` int(10) DEFAULT NULL COMMENT '名片ID',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='个人印象日志管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_industry` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) NOT NULL DEFAULT '0' COMMENT '站点id',
  `name` varchar(30) DEFAULT NULL COMMENT '名称',
  `flag_status` enum('top','hot') DEFAULT NULL COMMENT '标志',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='行业管理';

CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_invite` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) DEFAULT '0',
  `from_user_id` int(10) DEFAULT NULL COMMENT '邀请者ID',
  `from_website_id` int(10) DEFAULT NULL COMMENT '邀请者微官网ID',
  `to_user_id` int(10) DEFAULT NULL COMMENT '被邀请者ID',
  `to_user_card_id` int(10) DEFAULT NULL COMMENT '被邀请者创建的名片ID',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='微官网邀请管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_news` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) NOT NULL DEFAULT '0',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `card_id` int(10) DEFAULT NULL COMMENT '绑定名片ID',
  `website_id` int(10) DEFAULT NULL COMMENT '绑定微官网ID',
  `title` varchar(30) DEFAULT NULL COMMENT '标题',
  `content` longtext COMMENT '内容',
  `image` varchar(255) DEFAULT NULL COMMENT '缩略图',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='资讯管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_order` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) DEFAULT '0',
  `order_num` varchar(50) DEFAULT NULL COMMENT '订单号',
  `price` decimal(8,2) DEFAULT NULL COMMENT '价格',
  `total_price` decimal(8,2) DEFAULT NULL COMMENT '总价',
  `buy_num` int(10) DEFAULT '1' COMMENT '购买数量',
  `address_id` int(10) DEFAULT NULL COMMENT '收货地址',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `authentication_id` int(16) DEFAULT NULL COMMENT '认证ID',
  `product_id` int(10) DEFAULT NULL COMMENT '产品ID',
  `ordertype_id` int(10) DEFAULT '0' COMMENT '收费类型ID',
  `ordertype_viptype` varchar(50) DEFAULT NULL COMMENT '会员类型',
  `order_type_diyname` varchar(20) DEFAULT NULL COMMENT '收费类型',
  `pay_status` enum('1','2','3') DEFAULT '2' COMMENT '支付状态',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `paytime` bigint(16) DEFAULT NULL COMMENT '支付时间',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_ordertype` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) NOT NULL DEFAULT '0',
  `real_id` int(10) NOT NULL COMMENT '标识ID',
  `name` varchar(10) DEFAULT NULL COMMENT '收费名称',
  `diy_name` varchar(20) DEFAULT NULL COMMENT '自定义名',
  `type` varchar(50) DEFAULT NULL COMMENT '类型',
  `duration` int(10) DEFAULT '0' COMMENT '使用时长',
  `tips` varchar(100) DEFAULT NULL COMMENT '会员权益',
  `price` decimal(8,2) DEFAULT NULL COMMENT '优惠价',
  `create_website_num` int(10) DEFAULT NULL COMMENT '允许创建微官网数量',
  `create_card_num` int(10) DEFAULT NULL COMMENT '允许创建名片数量',
  `originalprice` decimal(8,2) DEFAULT NULL COMMENT '市场价',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='会员等级';





CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_product` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) DEFAULT '0',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `card_id` int(10) DEFAULT NULL COMMENT '绑定名片ID',
  `website_id` int(10) DEFAULT NULL COMMENT '绑定微官网ID',
  `title` varchar(30) DEFAULT NULL COMMENT '标题',
  `price` decimal(10,2) DEFAULT NULL COMMENT '优惠价',
  `originalprice` decimal(10,2) DEFAULT NULL COMMENT '市场价',
  `sales_num` int(10) DEFAULT '0' COMMENT '销量',
  `inventory_num` int(10) DEFAULT '0' COMMENT '库存',
  `quota_num` int(10) DEFAULT '0' COMMENT '限购数量',
  `video` varchar(255) DEFAULT NULL COMMENT '视频',
  `images` longtext COMMENT '图片',
  `description` longtext COMMENT '产品描述',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='产品管理';

CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_programme` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) DEFAULT '0',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `website_id` int(10) DEFAULT NULL COMMENT '微官网ID',
  `color_status` enum('deep','light') DEFAULT NULL COMMENT '颜色状态',
  `select_icon` varchar(20) DEFAULT NULL COMMENT '图标文本',
  `icon_color` varchar(20) DEFAULT NULL COMMENT '图标颜色值',
  `title` varchar(20) DEFAULT NULL COMMENT '标题',
  `description` varchar(100) DEFAULT NULL COMMENT '描述',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='解决方案管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_recruit` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) DEFAULT '0',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `website_id` int(10) DEFAULT NULL COMMENT '绑定微官网ID',
  `industry_id` int(10) DEFAULT NULL COMMENT '行业ID',
  `scale` varchar(20) DEFAULT NULL COMMENT '公司规模',
  `title` varchar(30) DEFAULT NULL COMMENT '标题',
  `position` varchar(20) DEFAULT NULL COMMENT '职位',
  `type_status` enum('0','1') DEFAULT '1' COMMENT '招聘类型',
  `education` varchar(20) DEFAULT NULL COMMENT '学历',
  `content` longtext COMMENT '职位描述',
  `city` varchar(50) DEFAULT NULL COMMENT '省市区',
  `address` varchar(30) DEFAULT NULL COMMENT '工作地址',
  `age` varchar(15) DEFAULT NULL COMMENT '年龄范围',
  `month_salary` varchar(10) DEFAULT NULL COMMENT '月薪',
  `tags` varchar(100) DEFAULT NULL COMMENT '标签',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `recruit_status` enum('0','1') DEFAULT '1' COMMENT '招聘状态',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='招聘管理';


CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_statistics` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) NOT NULL DEFAULT '0',
  `type` varchar(30) DEFAULT '' COMMENT '事件',
  `from_user_id` int(10) DEFAULT NULL COMMENT '来自用户ID',
  `user_id` int(10) DEFAULT NULL COMMENT '名片用户ID',
  `card_id` int(10) DEFAULT NULL COMMENT '名片ID',
  `ip` varchar(30) DEFAULT '' COMMENT 'IP',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='数据统计管理';

CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_sys` (
  `id` int(10) NOT NULL,
  `site_id` int(10) NOT NULL,
  `con_json` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='名片配置';




CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_user` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) NOT NULL DEFAULT '0',
  `username` varchar(20) DEFAULT NULL COMMENT '登录账号',
  `password` varchar(50) DEFAULT NULL COMMENT '密码',
  `salt` varchar(5) DEFAULT NULL COMMENT '密码盐',
  `openid` varchar(60) DEFAULT NULL COMMENT 'Openid',
  `avatar` varchar(255) DEFAULT NULL COMMENT '用户头像',
  `nickname` varchar(50) DEFAULT NULL COMMENT '用户昵称',
  `token` varchar(100) DEFAULT NULL COMMENT 'TOKEN',
  `phone` bigint(11) DEFAULT NULL COMMENT '手机号',
  `ordertype_id` int(11) DEFAULT '3' COMMENT '会员等级ID',
  `expirationtime` bigint(16) DEFAULT NULL COMMENT '会员等级过期时间',
  `grade_status` enum('normal','hidden') DEFAULT 'normal' COMMENT '会员等级状态',
  `prelogintime` bigint(16) DEFAULT NULL COMMENT '上次登陆时间',
  `logintime` bigint(16) DEFAULT NULL COMMENT '本次登录时间',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户管理';



CREATE TABLE IF NOT EXISTS `{{prefix}}ttcard_website` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `site_id` int(10) NOT NULL DEFAULT '0',
  `user_id` int(10) DEFAULT NULL COMMENT '用户ID',
  `card_id` int(10) DEFAULT NULL COMMENT '绑定名片ID',
  `team_card_ids` longtext COMMENT '团队成员名片ID',
  `industry_id` int(10) DEFAULT NULL COMMENT '行业ID',
  `swiper_images` longtext COMMENT '轮播图',
  `name` varchar(50) DEFAULT NULL COMMENT '企业名称',
  `phone` varchar(20) DEFAULT NULL COMMENT '企业电话',
  `wechat_num` varchar(20) DEFAULT NULL COMMENT '企业微信号',
  `weixin_image` varchar(100) DEFAULT NULL COMMENT '企业微信二维码',
  `address` varchar(255) DEFAULT NULL COMMENT '企业地址',
  `logo` varchar(500) DEFAULT NULL COMMENT '企业LOGO',
  `description` longtext COMMENT '企业简介',
  `video` varchar(255) DEFAULT NULL COMMENT '企业视频',
  `images` longtext COMMENT '企业图片',
  `minicode_image` varchar(255) DEFAULT NULL COMMENT '微官网邀请码',
  `create_time` bigint(16) DEFAULT NULL COMMENT '创建时间',
  `status` enum('normal','hidden') DEFAULT 'normal' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='微官网管理';

--初始化数据：：开始

INSERT INTO `{{prefix}}ttcard_ordertype` (`id`, `site_id`, `real_id`, `name`, `diy_name`, `type`, `duration`, `tips`, `price`, `create_website_num`, `create_card_num`, `originalprice`, `status`) VALUES
(12, 0, 1, '个人认证', 'person', 'authentication', 0, '个人认证', '0.01', 0, 0, '0.01', 'normal'),
(13, 0, 2, '企业认证', 'enterprise', 'authentication', 0, '企业认证', '0.02', 0, 0, '0.02', 'normal'),
(14, 0, 3, '普通会员', 'permanentvip', 'vip', 7, '默认所有新注册会员都是普通会员', '0.00', 1, 1, '0.00', 'normal'),
(15, 0, 4, 'vip月卡', '', 'vip', 30, '除了创建微官网外，其他功能畅享30天。', '0.01', 3, 3, '0.01', 'normal'),
(16, 0, 5, 'vip季卡', '', 'vip', 90, '除了创建微官网外，其他功能畅享90天。', '0.02', -1, 2, '0.02', 'normal'),
(17, 0, 6, 'vip年卡', '', 'vip', 365, '除了创建微官网外，其他功能畅享365天。', '0.03', 100, 0, '0.03', 'normal'),
(18, 0, 7, 'vip永久', '', 'vip', -1, '无限制畅享系统内所有功能。', '0.04', -1, -1, '0.04', 'normal'),
(19, 0, 8, 'svip月卡', '', 'svip', 30, '畅享全功能30天', '0.05', 3, 3, '0.05', 'normal'),
(20, 0, 9, 'svip季卡', '', 'svip', 90, '畅享全功能90天', '0.06', -1, 2, '0.06', 'normal'),
(21, 0, 10, 'svip年卡', '', 'svip', 365, '畅享全功能365天', '0.07', 100, 100, '0.07', 'normal'),
(22, 0, 11, 'svip永久', '', 'svip', -1, '畅享全功能不限时', '0.08', -1, -1, '0.08', 'normal');

INSERT INTO `{{prefix}}ttcard_sys` (`id`, `site_id`, `con_json`) VALUES
(1, 0, '{\"addCard_switch\":\"1\",\"authentication_switch\":\"1\",\"indexSwiper\":\"\",\"leaveamessage_switch\":\"1\",\"miniappHiddenInformation\":\"0\",\"recruit_switch\":\"1\",\"vip_switch\":\"1\",\"website_switch\":\"0\",\"website_url\":\"\",\"miniappIndexTitle\":\"名片\"}');

INSERT INTO `{{prefix}}sys_dict` (`id`, `name`, `key`, `dictionary`, `memo`, `create_time`, `update_time`) VALUES
(101, '名片审核状态', '名片审核状态', '\"[{\\\"name\\\":\\\"\\u5ba1\\u6838\\u4e2d\\\",\\\"value\\\":\\\"0\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u901a\\u8fc7\\\",\\\"value\\\":\\\"1\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u62d2\\u7edd\\\",\\\"value\\\":\\\"2\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725719876, 1726056907),
(102, '展示状态', '展示状态', '\"[{\\\"name\\\":\\\"\\u6b63\\u5e38\\\",\\\"value\\\":\\\"normal\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u9690\\u85cf\\\",\\\"value\\\":\\\"hidden\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725720386, 1725720408),
(103, '性别', '性别', '\"[{\\\"name\\\":\\\"\\u7537\\\",\\\"value\\\":\\\"0\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u5973\\\",\\\"value\\\":\\\"1\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725720584, 1725720619),
(104, '是否', '是否', '\"[{\\\"name\\\":\\\"\\u662f\\\",\\\"value\\\":\\\"0\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u5426\\\",\\\"value\\\":\\\"1\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725720991, 1726057399),
(105, '标识', '标识置顶热门', '\"[{\\\"name\\\":\\\"\\u7f6e\\u9876\\\",\\\"value\\\":\\\"top\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u70ed\\u95e8\\\",\\\"value\\\":\\\"hot\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725763355, 1725763391),
(106, '背景图类型', '背景图类型', '\"[{\\\"name\\\":\\\"\\u6b63\\u5e38\\\",\\\"value\\\":\\\"card\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u659c\\u8fb9\\\",\\\"value\\\":\\\"minicode\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725764998, 1725765040),
(107, '会员等级类型', '会员等级类型', '\"[{\\\"name\\\":\\\"svip\\\",\\\"value\\\":\\\"svip\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"vip\\\",\\\"value\\\":\\\"vip\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u7ec4\\u7ec7\\u8ba4\\u8bc1\\\",\\\"value\\\":\\\"authentication\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u52a0\\u5165\\u7ec4\\u7ec7\\\",\\\"value\\\":\\\"joinorganization\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725769889, 1725769968),
(108, '会员等级状态', '会员等级状态', '\"[{\\\"name\\\":\\\"\\u6b63\\u5e38\\\",\\\"value\\\":\\\"normal\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u5df2\\u8fc7\\u671f\\\",\\\"value\\\":\\\"hidden\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725770406, 1725770466),
(109, '消息类型', '消息类型', '\"[{\\\"name\\\":\\\"\\u7cfb\\u7edf\\u6d88\\u606f\\\",\\\"value\\\":\\\"systemmessages\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u7528\\u6237\\u7559\\u8a00\\\",\\\"value\\\":\\\"leavemessage\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725938774, 1725938807),
(110, '消息审核状态', '消息审核状态', '\"[{\\\"name\\\":\\\"\\u5df2\\u5ba1\\u6838\\\",\\\"value\\\":\\\"normal\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u672a\\u5ba1\\u6838\\\",\\\"value\\\":\\\"hidden\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725939792, 1725939826),
(111, '日志事件', '日志事件', '\"[{\\\"name\\\":\\\"\\u70b9\\u51fb\\u4e2a\\u4eba\\u5370\\u8c61\\\",\\\"value\\\":\\\"impression\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u8bbf\\u95ee\\u540d\\u7247\\\",\\\"value\\\":\\\"views\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u70b9\\u51fb\\u590d\\u5236\\u90ae\\u7bb1\\\",\\\"value\\\":\\\"email\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u70b9\\u51fb\\u590d\\u5236\\u5fae\\u4fe1\\u53f7\\\",\\\"value\\\":\\\"wechat\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u957f\\u6309\\u5fae\\u4fe1\\u4e8c\\u7ef4\\u7801\\\",\\\"value\\\":\\\"presswechatcode\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u540d\\u7247\\u7559\\u8a00\\\",\\\"value\\\":\\\"message\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u70b9\\u51fb\\u540d\\u7247\\u6253\\u7535\\u8bdd\\\",\\\"value\\\":\\\"phone\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u8f6c\\u53d1\\u540d\\u7247\\\",\\\"value\\\":\\\"share\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725942323, 1725943117),
(112, '认证收费类型', '认证收费类型', '\"[{\\\"name\\\":\\\"\\u4e2a\\u4eba\\u8ba4\\u8bc1\\\",\\\"value\\\":\\\"person\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u4f01\\u4e1a\\u8ba4\\u8bc1\\\",\\\"value\\\":\\\"enterprise\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u666e\\u901a\\u4f1a\\u5458\\\",\\\"value\\\":\\\"permanentvip\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725948426, 1725948572),
(113, '认证审核', '认证审核', '\"[{\\\"name\\\":\\\"\\u5ba1\\u6838\\u901a\\u8fc7\\\",\\\"value\\\":\\\"1\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u5ba1\\u6838\\u5931\\u8d25\\\",\\\"value\\\":\\\"2\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u5ba1\\u6838\\u4e2d\\\",\\\"value\\\":\\\"3\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u5f85\\u652f\\u4ed8\\\",\\\"value\\\":\\\"4\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u5df2\\u64a4\\u56de\\\",\\\"value\\\":\\\"5\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725948688, 1725948720),
(114, '支付状态', '支付状态', '\"[{\\\"name\\\":\\\"\\u652f\\u4ed8\\u6210\\u529f\\\",\\\"value\\\":\\\"1\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u672a\\u652f\\u4ed8\\\",\\\"value\\\":\\\"2\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u5df2\\u5173\\u95ed\\\",\\\"value\\\":\\\"3\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725949486, 1725949511),
(115, '性别', '性别', '\"[{\\\"name\\\":\\\"\\u7537\\\",\\\"value\\\":\\\"0\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u5973\\\",\\\"value\\\":\\\"1\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725951095, 1725951108),
(116, '应聘类型', '应聘类型', '\"[{\\\"name\\\":\\\"\\u517c\\u804c\\\",\\\"value\\\":\\\"0\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u5168\\u804c\\\",\\\"value\\\":\\\"1\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725951182, 1725951203),
(117, '是否待业', '是否待业', '\"[{\\\"name\\\":\\\"\\u5426\\\",\\\"value\\\":\\\"0\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u662f\\\",\\\"value\\\":\\\"1\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725951361, 1725951372),
(118, '招聘者是否查看', '招聘者是否查看', '\"[{\\\"name\\\":\\\"\\u672a\\u67e5\\u9605\\\",\\\"value\\\":\\\"0\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u5df2\\u67e5\\u9605\\\",\\\"value\\\":\\\"1\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725951922, 1725951944),
(119, '招聘状态', '招聘状态', '\"[{\\\"name\\\":\\\"\\u6682\\u505c\\u62db\\u8058\\\",\\\"value\\\":\\\"0\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u62db\\u8058\\u4e2d\\\",\\\"value\\\":\\\"1\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1725952324, 1725952346),
(200, '是1否0', '是1否0', '\"[{\\\"name\\\":\\\"\\u662f\\\",\\\"value\\\":\\\"1\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"},{\\\"name\\\":\\\"\\u5426\\\",\\\"value\\\":\\\"0\\\",\\\"sort\\\":0,\\\"memo\\\":\\\"\\\"}]\"', '', 1726057040, 1726057069);

--隐藏平台默认菜单
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'diy';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'member';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'finance';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'active';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'addon';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'pc_config';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'h5_config';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'channel_wechat';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'aliapp_weapp_access';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'setting_system';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'setting_member';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'setting_notice';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'sms_notice';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'map_setting';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'setting_export';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'printer_management';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'setting_pay_transfer';
UPDATE `{{prefix}}sys_menu` SET `is_show` = '0' WHERE `app_type` = 'site' and `menu_key` = 'cash_out_config';


--初始化数据：：结束

ALTER TABLE `{{prefix}}ttcard_authentication`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_biographical`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `{{prefix}}ttcard_biographicaldelive`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_card`
  ADD PRIMARY KEY (`id`) USING BTREE;

ALTER TABLE `{{prefix}}ttcard_cardbackground`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_cardmsg`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`card_id`),
  ADD KEY `weigh` (`id`),
  ADD KEY `type_2` (`card_id`);


ALTER TABLE `{{prefix}}ttcard_cases`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_collect`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`title`),
  ADD KEY `weigh` (`id`),
  ADD KEY `type_2` (`title`);

ALTER TABLE `{{prefix}}ttcard_help`
  ADD PRIMARY KEY (`id`),
  ADD KEY `weigh` (`id`);

ALTER TABLE `{{prefix}}ttcard_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `weigh` (`id`);

ALTER TABLE `{{prefix}}ttcard_impression`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_impressionlog`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_industry`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_invite`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_news`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_order`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_ordertype`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_product`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_programme`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_recruit`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_statistics`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_sys`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `site_id` (`site_id`);

ALTER TABLE `{{prefix}}ttcard_user`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_website`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `{{prefix}}ttcard_authentication`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_biographical`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_biographicaldelive`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_card`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_cardbackground`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_cardmsg`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_cases`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_collect`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_feedback`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `{{prefix}}ttcard_help`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `{{prefix}}ttcard_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `{{prefix}}ttcard_impression`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_impressionlog`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_industry`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_invite`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_news`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_order`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_ordertype`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=23;

ALTER TABLE `{{prefix}}ttcard_product`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_programme`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_recruit`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_statistics`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_sys`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `{{prefix}}ttcard_user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';

ALTER TABLE `{{prefix}}ttcard_website`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID';
COMMIT;
