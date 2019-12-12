// pages/datatoday/datatoday.js
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bodyWeight: null,
    openid: null,
    weightId: null,
    time: null
  },

  // 获取体重
  getWeight() {
    db.collection('weight').where({
      _openid: this.data.openid,
      time: _.gt(new Date(new Date().toLocaleDateString()).getTime())
    }).get({
      success: res => {
        console.log('getweight', res)
        if (res.data.length > 0) {
          this.setData({
            bodyWeight: res.data[0].bodyWeight,
            weightId: res.data[0]._id
          })
        }
      },
      fail: err => {
        console.log('getweightErr', err)
      }
    })
  },

  // 体重的输入框
  bodyWeight(e) {
    this.setData({
      bodyWeight: e.detail.value
    })
  },

  // 提交按钮
  submit() {
    if (this.data.bodyWeight) {
      if (this.data.weightId) {
        // 修改
        db.collection('weight').doc(this.data.weightId).update({
          data: {
            bodyWeight: this.data.bodyWeight,
          },
          success: res => {
            console.log('数据提交成功', res)
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: err => {
            wx.showToast({
              title: '数据提交失败',
              icon: 'none',
              duration: 3000
            })
          }
        })
      } else {
        // 新增
        db.collection('weight').add({
          data: {
            bodyWeight: this.data.bodyWeight,
            time: new Date().getTime()
          },
          success: res => {
            console.log('提交成功', res)
            this.setData({
              weightId: res._id
            })
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: err => {
            wx.showToast({
              title: '提交失败',
              icon: 'none',
              duration: 3000
            })
          }
        })
      }
    } else {
      wx.showToast({
        title: '提交数据不能为空哦~',
        icon: 'none',
        duration: 3000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
      this.getWeight()
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