var comm = {};

//这里为你的域名
var baseUrl = "https://你的域名";
//这里为你的站点id
comm.siteId="你的站点id";

//*****配置结束，以下勿动*****

baseUrl=baseUrl+"/api/ttcard";
comm.cjRequest = (params) => {
    var header = {
      'content-type':'application/x-www-form-urlencoded',
      'Site-Id':comm.siteId
    };
    if (params.token) {
      var userInfo =  wx.getStorageSync("userInfo"); 
      header.token = userInfo.token 
    } 
    return new Promise((resolve, reject) => { 
        wx.request({  
            url: baseUrl + params.url,
            data:params.data, 
            header: header,
            method:'POST',
            success: (result) => { 
              var data = result.data; 
               if(data.code == 1000){
                wx.showToast({
                  title: data.msg,
                  icon:'none'
                }) 
                wx.clearStorage('userInfo');
                setTimeout(function(){
                  wx.navigateTo({
                    url: '/pages/loginwechat/index',
                  })
                },1200)
                return false;
              }else if(data.code == 0){
                data.msg && wx.showToast({
                  title: data.msg,
                  icon:'none'
                })
                reject(data.msg);
              }else{
                resolve(result)
              }
            },
            fail: (err) => {
                reject(err)
            },
            // 不管请求成功还是失败，都会触发
            complete: () => {
              
            }
        }); 
    })
}

comm.goLoginPage = function(msg = '抱歉，请先登录'){
  wx.showToast({
    title: msg,
    icon:'none'
  })
  wx.clearStorage();
  setTimeout(function(){ 
    wx.navigateTo({
      url: '/pages/loginwechat/index',
    })
  },1000)
  
} 

// 从微信选择上传文件 
comm.upload = function(url, filePath,avatar = null) { 
  var userInfo =  wx.getStorageSync("userInfo");
  if(!userInfo){
    setTimeout(function(){ 
      wx.navigateTo({
        url: '/pages/loginwechat/index',
      })
    },1000)
    return false;
  }
  
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: baseUrl + url,
      filePath: filePath,
      name: 'file',
      header: { 
        'content-type': 'application/json', 
        'token':userInfo.token,
        'Site-Id':comm.siteId,
        'avatar':avatar
      },
      success: (res) => { 
        var data = JSON.parse(res.data);
        if(data.code == 1000){
          wx.showToast({
            title: data.msg,
            icon:'none'
          }) 
          wx.clearStorage('userInfo'); 
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/loginwechat/index',
            })
          },1000)
          return false;
        }
        console.log()
        resolve(data);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * 修改字体样式
 * @param html
 * @returns {void|string|*}
 */
comm.formatRichText = function(html){ 
  let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
      match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
      match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
      match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
      return match;
  });
  newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
      match = match
      .replace(/<p>/gi, '<p class="p_class">')
      .replace(/width:[^;]+;/gi, 'max-width:100%;')
      .replace(/width:[^;]+;/gi, 'max-width:100%;');
      return match;
  }); 
  newContent = newContent.replace(/<br[^>]*\/>/gi, "");
  newContent = newContent.replace(/<a>/gi, '<a class="p_class "');
  newContent = newContent.replace(/<li>/gi, '<li class="p_class "');
  newContent = newContent.replace(/\<p/gi, '<p class="p_class "');
  newContent = newContent.replace(/\<span/gi, '<span class="p_class "');
  newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"'); 
  return newContent;
}




export {
  comm
}