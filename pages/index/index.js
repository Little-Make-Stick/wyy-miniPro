//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://t2.ossjk.com/api/getRotation',
      success:function(data){
        console.log(data);
        that.setData({
          imgsurl: data.data
        });
      }
    });

    wx.request({
      url: 'http://t2.ossjk.com/api/getMusic',
      success: function (data) {
        console.log(data);
        that.setData({
          musics: data.data
        });
        //wx.setStorageSync('ids', idsMap);//
        wx.setStorageSync("music", data.data);//
      }
    });
  },
  play:function(e){
    var musicId = e.currentTarget.dataset.id;
    console.log(musicId);
    wx.navigateTo({
      url: '../play/play?id=' + musicId,
    });
  }
})
