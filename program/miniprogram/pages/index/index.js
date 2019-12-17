//index.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    avatarUrl: '',
    userInfo: '',
    getUserInfoBtn: false,
    background: ['../../images/index1.png', '../../images/index2.png','../../images/index3.png'],
  },

  toUse(){
    wx.switchTab({
      url: '/pages/project/project',
    })
  },

  onLoad: function() {
  },

})