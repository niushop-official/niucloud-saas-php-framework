<?php
#######################################################################
# File Name: Utils.php
# Desc:
# Author: hd
# Created Time: 2024/6/28 11:11
#######################################################################
namespace addon\turntable\utils;
use Carbon\Carbon;

class Utils{

    public static function  hasDuplicateValues(array $array, string $key): bool{
        $values = [];

        // 提取特定键的所有值
        foreach ($array as $item) {
            if (isset($item[$key])) {
                $values[] = $item[$key];
            }
        }

        // 统计每个值的出现次数
        $valueCounts = array_count_values($values);

        // 检查是否有值出现多于一次
        foreach ($valueCounts as $count) {
            if ($count > 1) {
                return true;
            }
        }

        return false;
    }
    public static function getTodayStartEnd(){
        return [
            'todayStart'=>Carbon::now()->startOfDay()->toDateTimeString(),
            'todayEnd'  =>Carbon::now()->endOfDay()->toDateTimeString()
        ];
    }
    public static function getWeightedRandom($weights): int{
        $totalWeight = array_sum($weights);
        $rand = random_int(1, $totalWeight);

        $left = 0;
        $right = count($weights) - 1;

        while ($left < $right) {
            $mid = (int) (($left + $right) / 2);
            if ($rand <= array_sum(array_slice($weights, 0, $mid + 1))) {
                $right = $mid;
            } else {
                $left = $mid + 1;
            }
        }

        return $left;
    }
}