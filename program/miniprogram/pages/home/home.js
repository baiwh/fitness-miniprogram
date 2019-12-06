// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    littleFlag: '先定一个小目标~',
    isEdit: false
  },

  // 编辑小目标
  editFlag() {
    this.setData({
      isEdit: true
    })
  },

  // 保存小目标
  saveFlag() {
    this.setData({
      isEdit: false
    })
  },

  // 修改小目标
  editLittleFlag(e) {
    this.setData({
      littleFlag: e.detail.value
    })
  },

  // 跳转到今日数据
  openDataToday() {
    wx.redirectTo({
      url: '/pages/datatoday/datatoday'
    })
  },

  // 跳转到每日运动量
  openFitness() {
    wx.redirectTo({
      url: '/pages/fitness/fitness'
    })
  },

  // 跳转到成果
  openResult() {
    wx.redirectTo({
      url: '/pages/result/result'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  }
})