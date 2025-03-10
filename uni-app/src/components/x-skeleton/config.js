// banner 轮播图
export function bannerConfig(config) {
    return {
        padding: '20rpx',
        gridRows: 1,
        gridColumns: 1,
        gridRowsGap: '40rpx',
        gridColumnsGap: '24rpx',
        itemDirection: 'row',
        itemGap: '30rpx',
        itemAlign: 'center',
        headShow: true,
        headWidth: '100%',
        headHeight: '300rpx',
        headBorderRadius: '20rpx',
        textShow: false,
        textRows: 3,
        textRowsGap: '20rpx',
        textWidth: '100%',
        textHeight: '30rpx',
        textBorderRadius: '6rpx',
        ...config
    }
}

// info 个人信息
export function infoConfig(config) {
    return {
        padding: '20rpx',
        gridRows: 1,
        gridColumns: 1,
        gridRowsGap: '50rpx',
        gridColumnsGap: '24rpx',
        itemDirection: 'row',
        itemGap: '30rpx',
        itemAlign: 'flex-start',
        headShow: true,
        headWidth: '100rpx',
        headHeight: '100rpx',
        headBorderRadius: '50%',
        textShow: true,
        textRows: 4,
        textRowsGap: '30rpx',
        textWidth: ['50%', '100%', '100%', '80%'],
        textHeight: ['40rpx', '24rpx', '24rpx', '24rpx'],
        textBorderRadius: '6rpx',
        ...config
    }
}

// text 段落
export function textConfig(config) {
    return {
        padding: '20rpx',
        gridRows: 1,
        gridColumns: 1,
        gridRowsGap: '50rpx',
        gridColumnsGap: '24rpx',
        itemDirection: 'row',
        itemGap: '30rpx',
        itemAlign: 'flex-start',
        headShow: false,
        headWidth: '100rpx',
        headHeight: '100rpx',
        headBorderRadius: '50%',
        textShow: true,
        textRows: 4,
        textRowsGap: '30rpx',
        textWidth: ['50%', '100%', '100%', '80%'],
        textHeight: '30rpx',
        textBorderRadius: '6rpx',
        ...config
    }
}

// menu 菜单
export function menuConfig(config) {
    return {
        padding: '20rpx',
        gridRows: 2,
        gridColumns: 5,
        gridRowsGap: '40rpx',
        gridColumnsGap: '40rpx',
        itemDirection: 'column',
        itemGap: '16rpx',
        itemAlign: 'center',
        headShow: true,
        headWidth: '100rpx',
        headHeight: '100rpx',
        headBorderRadius: '50%',
        textShow: true,
        textRows: 1,
        textRowsGap: '0rpx',
        textWidth: '100%',
        textHeight: '24rpx',
        textBorderRadius: '6rpx',
        ...config
    }
}

// list 列表
export function listConfig(config) {
    return {
        padding: '20rpx',
        gridRows: 2,
        gridColumns: 1,
        gridRowsGap: '50rpx',
        gridColumnsGap: '24rpx',
        itemDirection: 'row',
        itemGap: '30rpx',
        itemAlign: 'flex-start',
        headShow: true,
        headWidth: '200rpx',
        headHeight: '200rpx',
        headBorderRadius: '16rpx',
        textShow: true,
        textRows: 4,
        textRowsGap: '30rpx',
        textWidth: ['50%', '100%', '100%', '80%'],
        textHeight: ['38rpx', '24rpx', '24rpx', '24rpx'],
        textBorderRadius: '6rpx',
        ...config
    }
}

// waterfall 瀑布流
export function waterfallConfig(config) {
    return {
        padding: '20rpx',
        gridRows: 2,
        gridColumns: 2,
        gridRowsGap: '40rpx',
        gridColumnsGap: '24rpx',
        itemDirection: 'column',
        itemGap: '16rpx',
        itemAlign: 'center',
        headShow: true,
        headWidth: '100%',
        headHeight: '400rpx',
        headBorderRadius: '12rpx',
        textShow: true,
        textRows: 3,
        textRowsGap: '12rpx',
        textWidth: ['40%', '85%', '60%'],
        textHeight: ['30rpx', '20rpx', '20rpx'],
        textBorderRadius: '6rpx',
        ...config
    }
}
