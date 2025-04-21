<template>
  <view>
    <view class="fixed top-0 bg-white z-10 w-[100%]">
      <view class="flex u-flex-items-center border-bottom-f1">
        <view class="flex-1 flex u-flex-items-center m-[10px] bg-[#f1f1f1] rounded-full pl-[5px]">
          <text class="iconfont iconsousuo m-[5px]"></text>
          <input type="text" class="flex-1 text-[14px] h-[40px]" placeholder="输入素材名称" v-model="text">
        </view>
        <view class="m-[10px]" @click="search">搜索</view>
      </view>

      <scroll-view :scroll-x="true" class="scroll-x">
        <view class="item m-[10px]">
          <text class="iconfont iconshangV6xx-1" v-if="showCategoryList" @click="showCategoryList=!showCategoryList"></text>
          <text class="iconfont iconxiaV6xx" v-else @click="showCategoryList=!showCategoryList"></text>
        </view>
        <view class="item m-[10px]" :class="{'font-bold': categoryId == 0}" @click="changeCategory(0)">
          <view>全部</view>
          <view class="line" v-if="categoryId == 0"></view>
        </view>
        <view class="item m-[10px]" :class="{'font-bold': categoryId == item.id}" v-for="(item, index) in categoryList" :key="index" @click="changeCategory(item.id)">
          <view>{{ item.title }}</view>
          <view class="line" v-if="categoryId == item.id"></view>
        </view>
      </scroll-view>

      <view class="category_list" v-if="showCategoryList">
        <view class="rounded-full bg-[#f1f1f1] category-item text-[26rpx]" :class="{'active': categoryId == 0}" @click="changeCategory(0)">全部</view>
        <view class="rounded-full bg-[#f1f1f1] category-item text-[26rpx]" :class="{'active': categoryId == item.id}" v-for="(item, index) in categoryList" :key="index" @click="changeCategory(item.id)">{{ item.title }}</view>
      </view>
    </view>

    <view class="pt-[200rpx]">
      <view class="border-bottom-f1 flex p-[20rpx]" v-for="(item, index) in sourceList" :key="index">
        <image :src="img(item.headimg?item.headimg:'static/resource/images/default_headimg.png')" class="w-[100rpx] h-[100rpx] rounded-[20rpx]"></image>
        <view class="ml-[20rpx] flex-1">
          <view class="text-[#525f89] font-bold mt-[10rpx]">{{ item.username || item.nickname || '官方' }}</view>
          <textarea :value="item.text" :auto-height="true" :disabled="true" class="textarea mt-[20rpx]"></textarea>
          <!--<view class="text-[#525f89] font-bold">全文</view>-->
          <view class="mt-[20rpx]" v-if="item.image.length == 1">
            <image v-for="(image, idx) in item.image" :key="idx" :src="img(image)" class="w-[50%]" mode="widthFix"></image>
          </view>
          <view class="grid mt-[20rpx] w-[90%]" v-else-if="item.image.length > 1">
            <image class="image w-[160rpx] h-[160rpx]" v-for="(image, idx) in item.image" :key="idx" :src="img(image)" mode="aspectFill" @click="previewImage(item.image,idx)"></image>
          </view>
          <view class="grid mt-[20rpx] w-[90%]" v-else-if="item.image.length == 0 && item.video[0]">
            <video :src="img(item.video[0])"></video>
          </view>
          <view class="text-right relative more">
            <text class="diandian" @click="showCurrent(index)">··</text>
            <view class="absolute flex" v-if="item.more">
              <view class="border-right-1f mr-[10rpx] pr-[10rpx]" @click="download(item)">
                <text class="iconfont iconxiazai"></text>
                <text class="ml-[10rpx]">下载</text>
              </view>
              <view class="border-right-1f mr-[10rpx] pr-[10rpx]" @click="shareAppMessage(item)">
                <text class="iconfont iconfenxiang"></text>
                <text class="ml-[10rpx]">分享</text>
              </view>
              <view @click="shareTimeline(item)">
                <text class="iconfont iconpengyouquan"></text>
                <text class="ml-[10rpx]">朋友圈</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {getSourceList, getSourceCategory} from '@/addon/qiankun_source/api/source'
import {onLoad, onReachBottom} from '@dcloudio/uni-app'
import {img} from "@/utils/common";

interface SourceInterface {
  cate_id: number
  cate_id_name: string
  create_time: string
  headimg: string
  id: number
  image: string[]
  nickname: string
  text: string
  user_id: string
  username: string
  video: string[]
}

interface CategoryInterface {
  create_time: string
  icon: string
  id: number
  sort: string
  status: string
  title: string
}

let sourceList = ref<SourceInterface[]>([]);
let categoryList = ref<CategoryInterface[]>([]);
const showCategoryList = ref(false);
let categoryId = ref(0);
let page = ref(1);
let text = ref('')
onLoad(() => {
  getSourceCategory().then((res) => {
    categoryList.value = res.data.data
  })
  getList()
})

const previewImage = (image: string[], index: number) => {
  for (let i in image) {
    image[i] = img(image[i])
  }
  uni.previewImage({
    urls: image,
    current: index
  })
}

const getList = () => {
  getSourceList({
    page: page.value,
    text: text.value,
    cate_id: categoryId.value
  }).then((res) => {
    page.value++
    sourceList.value = sourceList.value.concat(res.data.data)
  })
}

const changeCategory = (id: number) => {
  categoryId.value = id
  sourceList.value = []
  page.value = 1
  getList()
}

const search = () => {
  sourceList.value = []
  page.value = 1
  getList()
}

const showCurrent = (index: number) => {
  if (sourceList.value[index].more) return sourceList.value[index].more = false
  sourceList.value.map((item, index) => {
    item.more = false
  })
  sourceList.value[index].more = true
}

const download = async (data: SourceInterface) => {
  console.log(data)
  if (data.image.length > 0) {
    // 下载图片
    console.log('下载图片')
    await saveImages(data.image)

    // 复制文本到剪贴板
    uni.setClipboardData({
      data: data.text,
      success: () => {
        uni.showToast({
          title: '复制成功'
        })
      }
    })
  } else if (data.video.length > 0) {
    // 下载视频
    console.log('下载视频')
    uni.downloadFile(
        {
          url: img(data.video[0]),
          success: (res) => {
            console.log(res.tempFilePath)
            uni.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                uni.showToast({
                  title: '保存成功'
                })

                // 复制文本到剪贴板
                uni.setClipboardData({
                  data: data.text,
                  success: () => {
                    uni.showToast({
                      title: '复制成功'
                    })
                  }
                })
              }
            })
          }
        }
    )
  }
}

const saveImages = async (images: string[]) => {
  for (let i in images) {
    await uni.downloadFile({
      url: img(images[i]),
      success: (res) => {
        console.log(res.tempFilePath)
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            uni.showToast({
              title: '保存成功'
            })
          }
        })
      }
    })
  }
}

const shareAppMessage = (data: SourceInterface) => {
  console.log(data)
}
const shareTimeline = (data: SourceInterface) => {
  console.log(data)
}

onReachBottom(() => {
  getList()
})
</script>
<style lang="scss" scoped>
.scroll-x {
  white-space: nowrap;
  width: 100%;

  .item {
    display: inline-block;
  }
}

.textarea {
  line-height: 40rpx;
}

.grid {
  grid-template-columns: repeat(3, 1fr);

  .image {
    margin-bottom: 15rpx;
  }
}

.item {
  position: relative;

  .line {
    position: absolute;
    bottom: -10rpx;
    left: 0;
    right: 0;
    margin: auto;
    width: 50rpx;
    background: #f00;
    border-radius: 20rpx;
    height: 4rpx;
  }
}

.category_list {
  margin-top: 20rpx;
  box-shadow: 0 10rpx 10rpx rgba(0, 0, 0, 0.1);

  .category-item {
    display: inline-block;
    padding: 10rpx 20rpx;
    margin-left: 20rpx;
    margin-bottom: 20rpx;
    border: 2rpx solid #fff;

    &.active {
      background: #fff;
      color: #f00;
      border: 2rpx solid #f00;
    }
  }
}

.diandian {
  text-align: center;
  height: 40rpx;
  line-height: 40rpx;
  width: 58rpx;
  background: #f6f6f6;
  margin-top: 20rpx;
  border-radius: 10rpx;
  font-weight: bold;
  font-size: 40rpx;
  color: #525f89;
  display: inline-block;
}

.more {
  .absolute {
    right: 70rpx;
    top: 10rpx;
    bottom: 0;
    margin: auto;
    height: 60rpx;
    line-height: 60rpx;
    background: #4c4c4c;
    color: #fff;
    padding: 0 20rpx;
    border-radius: 10rpx;
  }
}

.border-bottom-f1 {
  border-bottom: 1rpx solid #f1f1f1;
}

.border-right-1f {
  border-right: 1rpx solid #1f1f1f;
}
</style>
