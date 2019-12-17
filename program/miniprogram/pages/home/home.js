// pages/home/home.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    littleFlag: '',
    flagId: null,
    isEdit: false,
    avatarUrl: null,
    userInfo: null,
    openid: null
  },

  // 获取小目标
  getLittleFlag() {
    db.collection('flag').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        if (res.data.length > 0) {
          this.setData({
            littleFlag: res.data[0].text,
            flagId: res.data[0]._id
          })
        } else {
          this.setData({
            littleFlag: '先定一个小目标~'
          })
        }
      },
      fail: err => {
        console.log('getflagErr', err)
      }
    })
  },

  // 编辑小目标
  editFlag() {
    this.setData({
      isEdit: true
    })
  },

  // 保存小目标
  saveFlag() {
    if (this.data.littleFlag) {
      this.setData({
        isEdit: false
      })
      if (this.data.flagId) {
        // 修改
        db.collection('flag').doc(this.data.flagId).update({
          data: {
            text: this.data.littleFlag,
          },
          success: res => {
            console.log('小目标保存成功', res)
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: err => {
            wx.showToast({
              title: '小目标保存失败',
              icon: 'none',
              duration: 3000
            })
          }
        })
      } else {
        // 新增
        db.collection('flag').add({
          data: {
            text: this.data.littleFlag
          },
          success: res => {
            console.log('保存成功')
            this.setData({
              flagId: res._id
            })
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: err => {
            wx.showToast({
              title: '保存失败',
              icon: 'none',
              duration: 3000
            })
          }
        })
      }
    } else {
      wx.showToast({
        title: '小目标不能为空哦~',
        icon: 'none',
        duration: 3000
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

  // 我想看看都谁用我小程序了。。
  addUserInfo(userInfo) {
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
  getUserInfoRes(e) {
    console.log('getUserInfoRes', e)
    if (e.detail.errMsg === "getUserInfo:ok") {
      this.addUserInfo(e.detail.userInfo)
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    } else {
      wx.showToast({
        title: '请允许获取个人信息哦~',
        icon: 'none',
        duration: 2000
      })
    }
  },

  // 检查用户是否授权
  getUserSetting() {
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
            }
          })
        } else {
          console.log('未授权')
        }
      },
      fail: err => {
        console.log('err', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
      this.getLittleFlag()
      this.getUserSetting()
    } else {
      wx.switchTab({
        url: '/pages/project/project'
      })
    }
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

})