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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        userInfo: app.globalData.userInfo
      })
      this.getLittleFlag()
    } else {
      wx.redirectTo({
        url: '/pages/index/index'
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