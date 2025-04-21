<template>
  <div class="con">
    <div class="bg"></div>
    <div class="box">
      <el-card class="card">
        <div class="lgoin_header text-center text-2xl">欢迎登陆</div>

        <el-input v-model="username" placeholder="请输入用户名" class="mt-[50px] h-[40px]" @keyup="keyup">
          <template #prefix>
            <el-icon>
              <User />
            </el-icon>
          </template>
        </el-input>
        <el-input v-model="password" type="password" placeholder="请输入密码" class="mt-[20px] h-[40px]" @keyup="keyup">
          <template #prefix>
            <el-icon>
              <Lock />
            </el-icon>
          </template>
        </el-input>

        <el-button type="primary" class="mt-[20px] login_button" @click="login">登录</el-button>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { setWindowTitle } from '@/utils/common';
import request from '@/utils/request';
import storage from '@/utils/storage';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue'
import router from "@/router";

const username = ref('')
const password = ref('')

const login = () => {
  request.post('/qiankun_cashier/auth/login', {
    username: username.value,
    password: password.value
  }).then((res: any) => {
    console.log(res)
    ElMessage.success(res.msg)
    storage.set({ key: 'token', data: res.data.token })
    storage.set({ key: 'userinfo', data: res.data.params })
    router.push('/')
  }).catch(err => {
    console.error(err)
  })
}

onMounted(() => {
  let siteInfo = storage.get('siteInfo')
  setWindowTitle(siteInfo.site_name + ' - 登录')

  if (storage.get('token')) {
    router.push('/')
  }
})

const keyup = (e: any) => {
  if (e.keyCode == 13) {
    login()
  }
}
</script>

<style scoped lang="scss">
.con {
  width: 100%;
  height: 100%;
  position: relative;

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('@/assets/images/bg.png');
  }

  .box {
    position: relative;

    .card {
      width: 400px;
      height: 350px;
      position: fixed;
      inset: 0;
      margin: auto;
      border-radius: 30px;

      .login_button {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
