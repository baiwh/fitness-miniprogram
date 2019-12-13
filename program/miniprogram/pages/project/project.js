// pages/project/project.js
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
const $ = db.command.aggregate
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'come on练起来~',
    weightUnit: 'kg',
    projectList: [],
    newProject: [],
    editProject: false,
    loading: false,
    openid: null,
    pickerIndex: 0,
    array: ['kg', 'bl'],
    objectArray: [{
        id: 0,
        name: 'kg'
      },
      {
        id: 1,
        name: 'bl'
      }
    ],
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickerIndex: e.detail.value,
      weightUnit: this.data.array[e.detail.value]
    })
  },

  // 按钮：保存修改 
  submitProjects() {
    // 判空
    let isUndefined = false
    let project = this.data.projectList
    project.forEach(item => {
      if (item.name === '' || item.weight === 0) {
        isUndefined = true
      }
    })
    if (isUndefined) {
      // 有某一项为空
      wx.showToast({
        title: '亲，项目名称和重量不能为空哦~',
        icon: 'none',
        duration: 3000
      })
    } else {
      // 不空可以保存了
      this.setData({
        editProject: false
      })
      project.forEach((item, index) => {
        if (item.projectId) {
          // 旧项目，更新
          this.updateProject(item, index)
        } else {
          // 新项目，添加
          this.addProject(item, index)
        }
      })
    }
  },

  // 数据库：新增项目
  addProject(item, index) {
    db.collection('project').add({
      data: {
        name: item.name,
        state: 1,
        weightUnit: this.data.pickerIndex
      },
      success: res => {
        console.log(item.name + '添加成功')
        console.log(res)
        this.addProjectInfo(res._id, item, index)
        // 回填projectId=_id
        let project = this.data.projectList
        project[index].projectId = res._id
        this.setData({
          projectList: project
        })
      },
      fail: err => {
        console.log(item.name + '添加失败')
        // wx.showToast({
        //   title: item.name + '保存失败',
        //   icon: 'none',
        //   duration: 3000
        // })
      }
    })
  },

  // 数据库：新增项目信息
  addProjectInfo(projectId, item, index) {
    db.collection('projectInfo').add({
      data: {
        projectId: projectId,
        weight: item.weight,
        count: item.count,
        time: new Date().getTime()
      },
      success: res => {
        console.log(item.name + 'Info添加成功')
        // 回填prijectInfoId=_id
        let project = this.data.projectList
        project[index].prijectInfoId = res._id
        this.setData({
          projectList: project
        })
      },
      fail: err => {
        console.log(item.name + 'Info添加失败')
        // wx.showToast({
        //   title: item.name + '保存失败',
        //   icon: 'none',
        //   duration: 3000
        // })
      }
    })
  },

  // 数据库：更新项目
  updateProject(item, index) {
    console.log(item.projectId, 'item.projectId')
    db.collection('project').doc(item.projectId).update({
      data: {
        name: item.name,
        weightUnit: this.data.pickerIndex
      },
      success: res => {
        console.log(item.name + '更新成功')
        console.log(item.projectInfoId, 'item.projectInfoId')
        // 看看有没有projectInfoId
        if (item.projectInfoId) {
          // 有就是修改
          this.updateProjectInfo(item, index)
        } else {
          // 没有就是新的一天要新增
          this.addProjectInfo(item.projectId, item)
        }
      },
      fail: err => {
        console.log(item.name + '更新失败')
        // wx.showToast({
        //   title: name + '更新失败',
        //   icon: 'none',
        //   duration: 3000
        // })
      }
    })
  },

  // 数据库：更新项目信息
  updateProjectInfo(item, index) {
    db.collection('projectInfo').doc(item.projectInfoId).update({
      data: {
        weight: item.weight,
      },
      success: res => {
        console.log(item.name + '重量更新成功')
      },
      fail: err => {
        console.log(item.name + '重量更新失败')
        // wx.showToast({
        //   title: name + '重量更新失败',
        //   icon: 'none',
        //   duration: 3000
        // })
      }
    })
  },

  // 获取：项目列表
  getProjectList() {
    db.collection('project').where({
      _openid: this.data.openid,
      state: 1
    }).get({
      success: res => {
        console.log(res)
        if (res.data.length > 0) {
          let project = res.data
          // 有项目，来一个一个查信息吧
          this.setData({
            pickerIndex: project[0].weightUnit,
            weightUnit: this.data.array[project[0].weightUnit]
          })
          project.forEach(item => {
            this.getProjectInfoList(item)
          })
        } else {
          // 新用户或者没项目，加个假的给他
          this.setData({
            projectList: [{
              name: '项目名称',
              count: 0,
              weight: 100,
              projectId: null,
              projectInfoId: null,
            }]
          })
        }
      },
      fail: err => {
        console.log('getProjectErr', err)
      }
    })
  },

  // 获取：当天项目信息列表
  getProjectInfoList(item) {
    db.collection('projectInfo').where({
      projectId: item._id,
      time: _.gt(new Date(new Date().toLocaleDateString()).getTime())
    }).get({
      success: res => {
        if (res.data.length > 0) {
          let projectInfo = res.data[0]
          // 有当天的数据，正常插入
          let project = this.data.projectList
          project.push({
            name: item.name,
            projectId: item._id,
            count: projectInfo.count,
            weight: projectInfo.weight,
            projectInfoId: projectInfo._id,
          })
          this.setData({
            projectList: project
          })
        } else {
          // 没有当天的数据，那就给他个没projectInfoId和count的，但是要先拿到最后一条数据的weigh
          db.collection('projectInfo').where({
            projectId: item._id
          }).orderBy('time', 'desc').get({
            success: res => {
              console.log('orderby', res)
              let project = this.data.projectList
              project.push({
                name: item.name,
                projectId: item._id,
                count: 0,
                weight: res.data[0].weight,
                projectInfoId: null,
              })
              this.setData({
                projectList: project
              })
            },
            fail: err => {
              console.log('orderby', err)
            }
          })

        }
      },
      fail: err => {
        console.log('getProjectInfoErr', err)
      }
    })
  },

  // 点击项目+1
  projectCountAdd(e) {
    let index = e.target.dataset.index
    let project = this.data.projectList
    console.log(project[index])
    project[index].count++
      this.setData({
        projectList: project
      })
    // 要看是不是新的一天
    if (project[index].projectInfoId) {
      db.collection('projectInfo').doc(project[index].projectInfoId).update({
        data: {
          count: project[index].count,
        },
        success: res => {
          console.log(project[index].name + '成功点了一下')
        },
        fail: err => {
          console.log(project[index].name + '没点成')
        }
      })
    } else {
      // 新的一天啦
      this.addProjectInfo(project[index].projectId, project[index], index)
    }
  },

  // 按钮：归零
  refreshProject(e) {
    let index = e.target.dataset.index
    let project = this.data.projectList
    let that = this
    wx.showModal({
      title: '提示',
      content: '真的要清零么？',
      success(res) {
        if (res.confirm) {
          // 确定清零
          // 数据库：更新归零
          db.collection('projectInfo').doc(project[index].projectInfoId).update({
            data: {
              count: 0,
            },
            success: res => {
              project[index].count = 0
              that.setData({
                projectList: project
              })
              console.log(project[index].name + '成功归零')
            },
            fail: err => {
              console.log(project[index].name + '没归零')
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 按钮：删除
  deletProject(e) {
    let index = e.target.dataset.index
    let project = this.data.projectList
    let that = this
    wx.showModal({
      title: '提示',
      content: '真的要删掉么？',
      success(res) {
        if (res.confirm) {
          // 确定删除
          db.collection('project').doc(project[index].projectId).update({
            data: {
              state: 0,
            },
            success: res => {
              project.splice(index, 1)
              that.setData({
                projectList: project
              })
              console.log(project[index].name + '成功删除')
            },
            fail: err => {
              console.log(project[index].name + '没删除')
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 按钮：新增项目
  addNewProject() {
    let project = this.data.projectList
    project.push({
      name: '',
      count: 0,
      weight: 0,
      projectId: null,
      projectInfoId: null,
    })
    this.setData({
      projectList: project
    })
  },

  // 按钮：打开编辑功能
  editProjects() {
    this.setData({
      editProject: true
    })
  },

  // input：编辑项目名称
  projectName(e) {
    let index = e.target.dataset.index
    let value = e.detail.value
    let project = this.data.projectList
    project[index].name = value
    this.setData({
      projectList: project
    })
  },

  // input：编辑项目重量
  projectWeight(e) {
    let index = e.target.dataset.index
    let value = e.detail.value
    let project = this.data.projectList
    project[index].weight = value
    this.setData({
      projectList: project
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // openid必须有啊
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
      this.getProjectList()
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

})