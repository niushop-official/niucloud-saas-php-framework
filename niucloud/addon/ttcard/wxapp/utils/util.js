var util = {};


// 封装下载图片的方法 

util. downloadImagesFromUrls = function(imageUrls) {  
  // 创建一个 Promise 数组来存储所有的下载操作  
  let downloadPromises = [];  

  // 遍历 imageUrls 对象，并为每个 URL 创建一个 Promise  
  for (let key in imageUrls) {  
    let url = imageUrls[key];  
    downloadPromises.push(new Promise((resolve, reject) => {  
      wx.downloadFile({  
        url: url,  
        success: (res) => {  
          // 临时文件路径  
          let tempFilePath = res.tempFilePath;  
          resolve({ key, tempFilePath }); // 解析时包含键和路径  
        },  
        fail: (err) => {  
          reject(err); // 下载失败时拒绝 Promise  
        }  
      });  
    }));  
  }  

  // 使用 Promise.all 等待所有下载完成  
  return Promise.all(downloadPromises)  
    .then(results => {  
      // 创建一个新的对象来存储临时图片路径  
      let imgsUrl = {};  
      results.forEach(result => {  
        imgsUrl[result.key] = result.tempFilePath;  
      });  
      return imgsUrl; // 返回包含临时图片路径的对象  
    });  
}  

module.exports = {
  util
}
