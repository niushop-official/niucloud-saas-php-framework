<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\job\schedule;

use core\base\BaseJob;
use think\facade\Log;

/**
 * 队列异步调用定时任务
 */
class AutoClearPosterAndQrcode extends BaseJob
{

    public function doJob()
    {
        Log::write('AutoClearPosterAndQrcode 定时清除 二维码及海报数据开始' . date('Y-m-d H:i:s'));
        try {
            $dirs = [
                'upload/poster',
                'upload/qrcode',
            ];
            foreach ($dirs as $dir) {
                $dir = public_path($dir);
                $res = $this->clearDirectory($dir);
            }
            return true;
        } catch (\Exception $e) {
            Log::write('AutoClearPosterAndQrcode 定时清除异常: ' . $e->getMessage() . ' 位置: ' . $e->getFile() . ':' . $e->getLine() . $e->getTraceAsString());
            return false;
        }
    }

    /**
     * 清空指定目录下一周前的文件和空的子目录
     *
     * @param string $directory 目录路径
     * @param bool $preserveDirectory 是否保留根目录（默认保留）
     * @return bool 是否成功执行
     */
    function clearDirectory(string $directory, bool $preserveDirectory = true): bool
    {
        // 规范化目录路径，统一使用DIRECTORY_SEPARATOR
        $directory = rtrim(realpath($directory), DIRECTORY_SEPARATOR);

        Log::write('AutoClearPosterAndQrcode开始清理目录: ' . $directory);

        // 检查目录是否存在
        if (!is_dir($directory)) {
            Log::write('AutoClearPosterAndQrcode目录不存在或不是有效目录: ' . $directory);
            return false;
        }

        // 计算一周前的时间戳（7天 = 7*24*60*60 = 604800秒）
        $one_week_ago = time() - 604800;

        // 打开目录
        $handle = opendir($directory);
        if (!$handle) {
            Log::write('AutoClearPosterAndQrcode无法打开目录: ' . $directory);
            return false;
        }

        // 遍历目录内容
        while (($entry = readdir($handle)) !== false) {
            // 跳过当前目录和上级目录
            if ($entry === '.' || $entry === '..') {
                continue;
            }

            // 使用DIRECTORY_SEPARATOR确保路径分隔符正确
            $path = $directory . DIRECTORY_SEPARATOR . $entry;

            // 递归处理子目录
            if (is_dir($path)) {
                // 递归清理子目录（只删一周前文件，保留子目录本身）
                if (!$this->clearDirectory($path, true)) {
                    Log::write('AutoClearPosterAndQrcode递归清理子目录失败: ' . $path);
                    closedir($handle);
                    return false;
                }

                // 检查子目录是否为空，若为空则删除（可选逻辑，根据需求调整）
                $isEmpty = true;
                $sub_handle = opendir($path);
                while (($sub_entry = readdir($sub_handle)) !== false) {
                    if ($sub_entry !== '.' && $sub_entry !== '..') {
                        $isEmpty = false;
                        break;
                    }
                }
                closedir($sub_handle);

                if ($isEmpty && !$preserveDirectory) {
                    if (!rmdir($path)) {
                        Log::write('AutoClearPosterAndQrcode删除空目录失败: ' . $path);
                    } else {
                        Log::write('AutoClearPosterAndQrcode已删除空目录: ' . $path);
                    }
                }
            } else {
                // 获取文件的创建/修改时间（优先用修改时间filemtime，更贴合业务）
                $file_time = filemtime($path);

                // 校验：文件时间有效 且 早于一周前
                if ($file_time !== false && $file_time <= $one_week_ago) {
                    // 删除一周前的文件
                    if (!unlink($path)) {
                        Log::write('AutoClearPosterAndQrcode删除文件失败: ' . $path);
                        closedir($handle);
                        return false;
                    }
                    Log::write('AutoClearPosterAndQrcode已删除一周前的文件: ' . $path);
                } else {
                    // 跳过近期文件，记录日志（可选）
                    Log::write('AutoClearPosterAndQrcode跳过近期文件: ' . $path);
                }
            }
        }

        // 关闭目录句柄
        closedir($handle);

        // 根目录是否删除（默认保留，避免目录丢失）
        if (!$preserveDirectory) {
            Log::write('AutoClearPosterAndQrcode准备删除根目录: ' . $directory);
            if (!rmdir($directory)) {
                Log::write('AutoClearPosterAndQrcode删除根目录失败: ' . $directory);
                return false;
            }
            Log::write('AutoClearPosterAndQrcode成功删除根目录: ' . $directory);
        } else {
            Log::write('AutoClearPosterAndQrcode保留根目录: ' . $directory);
        }

        return true;
    }
}