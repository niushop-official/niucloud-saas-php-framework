<?php

use think\facade\Route;

Route::rule('cashier', function () {
    return view(template: app()->getRootPath() . 'public/cashier/index.html');
})->pattern(['any' => '\w+']);