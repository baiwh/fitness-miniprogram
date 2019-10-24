// pages/project/project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '我是一段提示语~',
    weightUnit: 'kg',
    projectList: [
      {
        id: '1',
        name: 'name1',
        count: 1,
        weight: 110,
        unit: 'kg',
        state: 1
      },
      {
        id: '2',
        name: 'name2',
        count: 2,
        weight: 120,
        unit: 'kg',
        state: 1
      },
      {
        id: '3',
        name: 'name3',
        count: 3,
        weight: 120,
        unit: 'kg',
        state: 1
      },
    ],
    editProject:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})