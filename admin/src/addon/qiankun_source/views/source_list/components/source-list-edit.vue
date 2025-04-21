<template>
  <el-dialog v-model="showDialog" :title="formData.id ? t('updateSourceList') : t('addSourceList')" width="50%" class="diy-dialog-wrap" :destroy-on-close="true">
    <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
      <el-form-item :label="t('cateId')">
        <el-select class="input-width" v-model="formData.cate_id" clearable :placeholder="t('cateIdPlaceholder')">
          <el-option label="请选择" value=""></el-option>
          <el-option
              v-for="(item, index) in cateIdList"
              :key="index"
              :label="item['title']"
              :value="item['id']"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="t('text')">
        <el-input v-model="formData.text" type="textarea" rows="4" clearable :placeholder="t('textPlaceholder')" class="input-width"/>
      </el-form-item>
      <el-form-item :label="t('image')">
        <view>
          <view class="grid">
            <view v-for="(item, index) in formData.image" :key="index" class="relative">
              <view class="del" @click="delImg(index)">删除</view>
              <el-image class="grid-item" :hide-on-click-modal="true" :preview-src-list="[img(item)]" :src="img(item)" fit="cover"/>
            </view>
          </view>
          <el-upload
              v-if="formData.image.length < 9"
              v-model:file-list="image"
              :action="baseUrl+'sys/image'"
              :headers="headers"
              :show-file-list="false"
              multiple
              :on-success="onImgSuccess"
              accept="image/png, image/jpeg"
          >
            <el-button type="primary">选择图片</el-button>
            <template #tip>
              <div class="el-upload__tip">
                图片格式：.jpg/.png
              </div>
            </template>
          </el-upload>
        </view>
      </el-form-item>
      <el-form-item :label="t('video')">
        <view>
          <video v-if="formData.video[0]" :src="img(formData.video[0])" controls class="video"></video>
          <span class="del_video" @click="delVideo()">删除</span>
          <el-upload
              style="margin-top: 20px;"
              v-model:file-list="video"
              :action="baseUrl+'sys/video'"
              :headers="headers"
              :show-file-list="false"
              :on-success="onVideoSuccess"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              accept=".mp4"
          >
            <el-button type="primary">选择视频</el-button>
            <template #tip>
              <div class="el-upload__tip">
                视频格式：.mp4
              </div>
            </template>
          </el-upload>
        </view>
      </el-form-item>

    </el-form>

    <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{
                    t('confirm')
                  }}</el-button>
            </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {ref, reactive, computed, watch} from 'vue'
import {useDictionary} from '@/app/api/dict'
import {t} from '@/lang'
import type {FormInstance} from 'element-plus'
import {addSourceList, editSourceList, getSourceListInfo, getWithCategoryList} from '@/addon/qiankun_source/api/source_list'
import {getToken, img} from "@/utils/common";
import storage from "@/utils/storage";

let showDialog = ref(false)
const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
  id: '',
  cate_id: '',
  text: '',
  image: [],
  video: [],
}
const formData: Record<string, any> = reactive({...initialFormData})
const image = ref<string[]>([])
const video = ref<string[]>([])

const formRef = ref<FormInstance>()
const baseUrl = import.meta.env.VITE_APP_BASE_URL.substr(-1) == '/' ? import.meta.env.VITE_APP_BASE_URL : `${import.meta.env.VITE_APP_BASE_URL}/`
const headers = ref({})

if (getToken()) {
  headers.value[import.meta.env.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken()
}
headers.value[import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY] = storage.get('siteId') || 0

// 表单验证规则
const formRules = computed(() => {
  return {
    cate_id: [
      {required: true, message: t('cateIdPlaceholder'), trigger: 'blur'},

    ],
    text: [
      {required: true, message: t('textPlaceholder'), trigger: 'blur'},

    ]

  }
})

const onImgSuccess = (e) => {
  if (e.code == 1) {
    formData.image.push(e.data.url)
  } else {
    ElMessage({
      message: e.msg,
      type: 'error'
    })
  }
}

const onVideoSuccess = (e) => {
  if (e.code == 1) {
    formData.video = [e.data.url]
  } else {
    ElMessage({
      message: e.msg,
      type: 'error'
    })
  }
}

const delImg = (index: number) => {
  formData.image.splice(index, 1)
}

const delVideo = () => {
  formData.video = []
}

const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
  if (loading.value || !formEl) return
  let save = formData.id ? editSourceList : addSourceList

  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true

      let data = formData

      save(data).then(res => {
        loading.value = false
        showDialog.value = false
        emit('complete')
      }).catch(err => {
        loading.value = false
      })
    }
  })
}

// 获取字典数据


const cateIdList = ref([] as any[])
const setCateIdList = async () => {
  cateIdList.value = await (await getWithCategoryList({})).data
}
setCateIdList()
const setFormData = async (row: any = null) => {
  Object.assign(formData, {
    id: '',
    cate_id: '',
    text: '',
    image: [],
    video: [],
  })
  loading.value = true
  if (row) {
    const data = await (await getSourceListInfo(row.id)).data
    if (data) Object.keys(formData).forEach((key: string) => {
      if (data[key] != undefined) formData[key] = data[key]
    })
  }
  loading.value = false
}

// 验证手机号格式
const mobileVerify = (rule: any, value: any, callback: any) => {
  if (value && !/^1[3-9]\d{9}$/.test(value)) {
    callback(new Error(t('generateMobile')))
  } else {
    callback()
  }
}

// 验证身份证号
const idCardVerify = (rule: any, value: any, callback: any) => {
  if (value && !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
    callback(new Error(t('generateIdCard')))
  } else {
    callback()
  }
}

// 验证邮箱号
const emailVerify = (rule: any, value: any, callback: any) => {
  if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
    callback(new Error(t('generateEmail')))
  } else {
    callback()
  }
}

// 验证请输入整数
const numberVerify = (rule: any, value: any, callback: any) => {
  if (!Number.isInteger(value)) {
    callback(new Error(t('generateNumber')))
  } else {
    callback()
  }
}

defineExpose({
  showDialog,
  setFormData
})
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-item {
    width: 100px;
    height: 100px;
  }
}

.relative {
  position: relative;
  overflow: hidden;

  .del {
    position: absolute;
    height: 30px;
    line-height: 30px;
    width: 100px;
    text-align: center;
    top: 10px;
    right: -25px;
    cursor: pointer;
    color: #fff;
    background: #f00;
    // 旋转45度
    transform: rotate(45deg);
    z-index: 9;
  }
}

.del_video {
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: #f00;
  padding: 5px 10px;
  cursor: pointer;
}

.video {
  max-width: 50%;
  max-height: 300px;
  margin-bottom: 10px;
}

.diy-dialog-wrap .el-form-item__label {
  height: auto !important;
}
</style>
