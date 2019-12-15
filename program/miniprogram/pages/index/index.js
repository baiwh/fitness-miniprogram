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

  onLoad: function() {
    // 检查用户是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log('授权过')
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              this.onGetOpenid(res.userInfo)
              this.addUserInfo(res.userInfo)
            }
          })
        } else {
          console.log('未授权')
          this.setData({
            getUserInfoBtn: true
          })
        }
      },
      fail: err => {
        console.log('err', err)
      }
    })
  },

  // 我想看看都谁用我小程序了。。
  addUserInfo(userInfo){
    db.collection('userInfo').add({
      data: {
        userInfo: userInfo
      },
      success: res => {
        console.log('userInfo保存成功')
      },
      fail: err => {
        console.log('userInfo保存失败')
      }
    })
  },
  
  // 获取授权回调
  getUserInfoRes(e){
    console.log('getUserInfoRes',e)
    if (e.detail.errMsg==="getUserInfo:ok"){
      this.onGetOpenid(e.detail.userInfo)
    }else{
      wx.showToast({
        title: '请允许获取个人信息哦~',
        icon: 'none',
        duration: 2000
      })
    }
  
  },

  onGetOpenid(userInfo) {
    app.globalData.userInfo = userInfo
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        console.log(app.globalData)
        // 全部成功，可以正常使用
        wx.switchTab({
          url: '/pages/project/project'
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
})