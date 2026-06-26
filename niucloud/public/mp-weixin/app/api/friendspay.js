"use strict";const e=require("../../utils/request.js");exports.getFriendspayInfo=function(r,s){return e.request.get(`pay/friendspay/info/${r}/${s}`,{},{showErrorMessage:!0})};
