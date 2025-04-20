<?php

include __DIR__ . '/init.php';

if (GRANTTYPE == 'client_credentials') {
    include_once __DIR__ . '/client_mode/callback.php';
}

if (GRANTTYPE == 'authorization_code') {
    include_once __DIR__ . '/authorization_code_mode/callback.php';
}
