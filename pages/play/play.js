// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.audioCtx = wx.createAudioContext('myAudio');
    //options:就是首页传递的数据，id
    this.reload(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //根据id获取歌曲信息
  getMusic: function(id) {
    //所有歌曲的信息
    var music = wx.getStorageSync('music');
    console.log(music)
    //只要一首歌曲信息就可以了
    for (var i = 0; i < music.length; i++) {
      if (music[i].id == id) {
        return music[i];
      }
    }
  },
  //重新加载歌曲信息
  reload: function(id) {
    this.setData({
      per: 0, //滚动条进度
      deg: 0, //碟盘角度
      timeText: '00:00', //播放音乐当前时间
      durationText: '', //音乐总时长
      currentId: id, //当前音乐id
      now: this.getMusic(id), //当前音乐信息
      mode: this.data.mode || "loop",
      fav: "liked",
    });
    this.setData({
      status: 'play'
    });
    this.audioCtx.play();
  },
  timeupdateEvent: function(e) {
    //当播放进度改变时触发
    //歌曲当前时间
    var t = e.detail.currentTime,
      //歌曲总长
      d = e.detail.duration;

    //碟盘的转动
    //进度条的显示
    //19.655845
    console.log(t);
    //216.032653
    console.log(d);
    var time = (t / d) * 100;
    console.log(time);
    this.setData({
      deg: this.data.deg + 1, //设置碟盘转的角度
      time: time,
      timeText: this.formatTime(t), //播放时长
      durationText: this.formatTime(d) //总时长
    });
    //歌曲当前的播放时间
  },
  //格式化时间//mm:ss
  formatTime: function(time) {
    time = Math.floor(time);
    var m = Math.floor(time / 60).toString();
    m = m.length < 2 ? '0' + m : m;

    var s = (time - parseInt(m) * 60).toString();
    s = s.length < 2 ? '0' + s : s;

    return m + ':' + s;
  },
})