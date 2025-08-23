<template>
  <view class="music-container" :class="{ playing: isPlaying }" :style="musicStyle">
    <view class="music-control" :style="defaultStyleCss" @click="togglePlay">
      <view class="music-disc " :class="{ rotate: isPlaying }">
        <image v-if="discImage" class="disc-image" :src="discImage" mode="aspectFill"></image>
        <block v-else>
          <text class="default-style iconfont iconyinfuV6mm" v-if="isPlaying"></text>
          <text class="default-style disable iconfont iconyinfuV6mm" v-else></text>
        </block>
      </view>
      <view class="music-icon">
        <text v-if="isPlaying" class="iconfont icon-pause"></text>
        <text v-else class="iconfont icon-play"></text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue';
import { img } from '@/utils/common';
// 定义组件属性
const props = defineProps({
  // 音乐文件地址
  src: {
    type: String,
    default: ''
  },
  // 是否自动播放
  autoplay: {
    type: Boolean,
    default: true
  },
  // 是否循环播放
  loop: {
    type: Boolean,
    default: true
  },
  // 自定义唱片图片
  discImage: {
    type: String,
    default: ''
  },
  defaultBgColor: {
      type: String,
      default: '#B0B0B0'
  },
  defaultTextColor: {
      type: String,
      default: '#FFFFFF'
  },
  defaultRounded: {
      type: Number,
      default: 20
  }
});

// 默认唱片图片
const defaultDiscImage = img('/addon/seckill/goods/music1.png');
const defaultDiscImage2 = img('/addon/seckill/goods/music2.png');

// 播放状态
const isPlaying = ref(false);
// 音频实例
let audioContext: any = null;

// 创建音频实例
const createAudioContext = () => {
  console.log('创建音频实例，音乐地址:', props.src);
  
  // #ifdef MP-WEIXIN
  audioContext = uni.createInnerAudioContext();
  // #endif
  
  // #ifdef APP-PLUS || H5
  audioContext = uni.createInnerAudioContext();
  // #endif
  
  if (!audioContext) {
    console.error('无法创建音频实例');
    return;
  }
  
  audioContext.src = props.src;
  audioContext.loop = props.loop;
  
  // 监听播放事件
  audioContext.onPlay(() => {
    console.log('音乐开始播放');
    isPlaying.value = true;
  });
  
  // 监听暂停事件
  audioContext.onPause(() => {
    console.log('音乐暂停播放');
    isPlaying.value = false;
  });
  
  // 监听停止事件
  audioContext.onStop(() => {
    console.log('音乐停止播放');
    isPlaying.value = false;
  });
  
  // 监听结束事件
  audioContext.onEnded(() => {
    console.log('音乐播放结束');
    isPlaying.value = false;
  });
  
  // 监听错误事件
  audioContext.onError((res: any) => {
    console.error('音频播放错误:', res.errMsg || res);
    isPlaying.value = false;
  });
  
  // 自动播放
  if (props.autoplay && props.src) {
    // #ifdef H5
    // H5环境下不自动播放
    console.log('H5环境，不自动播放音乐');
    isPlaying.value = false;
    // #endif
    
    // #ifndef H5
    // 非H5环境正常自动播放
    console.log('准备自动播放音乐');
    // 延迟一下确保各平台兼容性
    setTimeout(() => {
      playMusic();
    }, 300);
    // #endif
  }
};
const defaultStyleCss = computed(() => {
  let style = '';
  style += `background:${props.defaultBgColor};`;
  if(props.defaultTextColor){ style += `color:${props.defaultTextColor};`; }
  if(props.defaultRounded){ 
      style += `border-border-top-left-radius:${props.defaultRounded * 2}rpx;`;
      style += `border-border-bottom-left-radius:${props.defaultRounded * 2}rpx;`;
  }
  return style;
});

// 播放音乐
const playMusic = () => {
  if (!audioContext || !props.src) {
    console.error('无法播放音乐，audioContext或src为空');
    return;
  }
  
  console.log('尝试播放音乐:', props.src);
  
  // 尝试播放音乐
  audioContext.play();
  
  // 强制设置播放状态
  isPlaying.value = true;
  
  // 微信小程序环境特殊处理
  // #ifdef MP-WEIXIN
  try {
    const systemInfo = uni.getSystemInfoSync();
    if (systemInfo.platform === 'ios') {
      // iOS端需要特殊处理微信小程序音频播放
      uni.showToast({
        title: '音乐播放中...',
        icon: 'none',
        duration: 1000
      });
    }
  } catch (error) {
    console.error('获取系统信息失败:', error);
  }
  // #endif
};

// 暂停音乐
const pauseMusic = () => {
  if (!audioContext) return;
  console.log('暂停音乐');
  audioContext.pause();
  isPlaying.value = false;
};

// 切换播放状态
const togglePlay = () => {
  console.log('切换播放状态，当前状态:', isPlaying.value);
  if (isPlaying.value) {
    pauseMusic();
  } else {
    playMusic();
  }
};

// 监听音乐地址变化
watch(() => props.src, (newSrc) => {
  console.log('音乐地址变化:', newSrc);
  if (!audioContext) return;
  
  const wasPlaying = isPlaying.value;
  
  // 更新音乐地址
  audioContext.src = newSrc;
  
  // 如果之前正在播放，则继续播放新音乐
  if (wasPlaying && newSrc) {
    playMusic();
  }
});

// 监听自动播放状态变化
watch(() => props.autoplay, (newAutoplay) => {
  console.log('自动播放状态变化:', newAutoplay);
  if (newAutoplay && audioContext && !isPlaying.value && props.src) {
    playMusic();
  }
});

// 组件挂载时创建音频实例
onMounted(() => {
  console.log('音乐组件挂载，初始化音频');
  createAudioContext();
});

// 组件卸载前释放资源
onBeforeUnmount(() => {
  console.log('音乐组件卸载，释放资源');
  if (audioContext) {
    // 停止播放
    if (isPlaying.value) {
      audioContext.stop();
    }
    
    // 释放资源
    audioContext.destroy();
    audioContext = null;
  }
});

const musicStyle = computed(() => {
  return {
    '--color': `${props.defaultTextColor}`
  }
})

// 暴露方法给父组件使用
defineExpose({
  play: playMusic,
  pause: pauseMusic,
  toggle: togglePlay,
  isPlaying: () => isPlaying.value
});
</script>

<style lang="scss" scoped>
.music-container {
  position: fixed;
  right: 0;
  top: calc(120rpx + var(--status-bar-height));
  z-index: 999;
  
  .music-control {
    width: 80rpx;
    height: 80rpx;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-top-left-radius: 20rpx;
    border-bottom-left-radius: 20rpx;
  }
  
  .music-disc {
    transition: all 0.3s;
    
    &.rotate {
      animation: rotate 5s linear infinite;
      animation-play-state: running;
    }
    
    .disc-image {
      width: 60rpx;
      height: 60rpx;
      // background-color: #ffffff;
    }
  }
  
  .music-icon {
    position: absolute;
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .iconfont {
      font-size: 40rpx;
      color: #ffffff;
      text-shadow: 0 0 5rpx rgba(0, 0, 0, 0.5);
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 适配不同平台 */
/* #ifdef MP-WEIXIN */
.music-container {
  z-index: 900;
}
/* #endif */

/* #ifdef APP-PLUS */
.music-container {
  z-index: 999;
}
/* #endif */

/* #ifdef H5 */
.music-container {
  position: fixed;
  z-index: 999;
}
/* #endif */
.default-style{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 60rpx;
  font-size: 34rpx;
  box-sizing: border-box;
  &.disable:after{
    content: '';
    position: absolute;
    left: 0;
    height: 50rpx;
    width: 2rpx;
    background: var(--color);
    left: 50%;
    transform: translateX(-50%) rotate(-45deg);
  }
}
</style>
