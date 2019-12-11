// pages/home/home.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    littleFlag: '先定一个小目标~',
    flagId:null,
    isEdit: false,
    avatarUrl:null,
    userInfo:null
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
    if(this.data.flagId){
      db.collection('flag').doc(this.data.flagId).update({
        data: {
          text: this.data.littleFlag,
        },
        success: res => {
          console.log('小目标保存成功')
        },
        fail: err => {
          wx.showToast({
            title: '小目标保存失败',
            icon: 'none',
            duration: 3000
          })
        }
      })
    }else{
      db.collection('flag').add({
        data: {
          text: this.data.littleFlag
        },
        success: res => {
          console.log('小目标添加成功')
        },
        fail: err => {
          wx.showToast({
            title: '小目标保存失败',
            icon: 'none',
            duration: 3000
          })
        }
      })
    }
  },

  // 修改小目标
  editLittleFlag(e) {
    this.setData({
      littleFlag: e.detail.value
    })
  },

  // 跳转到今日数据
  openDataToday() {
    wx.navigateTo({
      url: '/pages/datatoday/datatoday'
    })
  },

  // 跳转到每日运动量
  openFitness() {
    wx.navigateTo({
      url: '/pages/fitness/fitness'
    })
  },

  // 跳转到成果
  openResult() {
    wx.navigateTo({
      url: '/pages/result/result'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 检查用户是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log('授权过')
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('获取个人信息', res)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        } else {
          console.log('未授权')
          wx.redirectTo({
            url: '/pages/index/index'
          })
        }
      },
      fail: err => {
        wx.redirectTo({
          url: '/pages/index/index'
        })
      }
    })
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