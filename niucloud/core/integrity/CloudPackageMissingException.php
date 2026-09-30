<?php
declare(strict_types=1);

namespace core\integrity;

use core\exception\CommonException;

/**
 * 云端媒体库里没有该目标的包体
 *
 * 触发场景（服务端只回一句「内容目录不存在: /media-…/{目录名}/{版本}/{目录名}」）：
 *   - 该版本没发布到云端媒体库；
 *   - 发布到了别的产品库（SINGLE / SAAS / B2B2C …），而本次按另一个产品去找；
 *   - 发布时压缩包内根目录名不等于应用标识，解压后缺了那一层。
 *
 * ★ 单独建一个类型，是因为它和「请求失败」不是一回事：
 *   这属于「该目标本来就检测不了」，调用方应该**跳过该目标并给出告警**，
 *   而不是把一个绝对路径当异常甩到界面上（检测流程见 IntegrityService::check()）。
 *
 * @package core\integrity
 */
class CloudPackageMissingException extends CommonException
{
}
