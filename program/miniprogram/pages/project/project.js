// pages/project/project.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'come on练起来~',
    weightUnit: 'kg',
    projectList: [{
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
      {
        id: '4',
        name: 'name4',
        count: 0,
        weight: 120,
        unit: 'kg',
        state: 1
      },
    ],
    // projectList:[],
    newProject: [],
    editProject: false,
    loading: false
  },

  // 接口：新增项目
  addProject(item) {
    db.collection('project').add({
      data: {
        name: item.name,
        state: 1
      },
      success: res => {
        console.log(item.name + '添加成功')
        // this.addProjectInfo(res._id)
      },
      fail: err => {
        wx.showToast({
          title: item.name + '保存失败',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },

  // 新增项目信息
  addProjectInfo(projectId){
    db.collection('projectInfo').add({
      data: {
        projectId: projectId,
        name: item.name,
        state: 1
      },
      success: res => {
        console.log(item.name + '添加成功')
      },
      fail: err => {
        wx.showToast({
          title: item.name + '保存失败',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },

  // 接口：修改
  updateProject(item) {
    // 改名字
    db.collection('project').doc('item._id').update({
      data: {
        weight: item.weight,
      },
      success: res => {
        console.log(name + '重量保存成功')
      },
      fail: err => {
        wx.showToast({
          title: name + '重量保存失败',
          icon: 'none',
          duration: 3000
        })
      }
    })
    // 改重量
    db.collection('projectInfo').doc('item._id').update({
      data: {
        weight: item.weight,
      },
      success: res => {
        console.log(name + '重量保存成功')
      },
      fail: err => {
        wx.showToast({
          title: name + '重量保存失败',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },

  // 获取项目列表
  getProjectList() {

  },

  // 点击项目+1
  projectCountAdd(e) {
    let index = e.target.dataset.index
    let project = this.data.projectList
    project[index].count++
      this.setData({
        projectList: project
      })
    // db.collection('project').update({
    //   data: {},
    //   success: res => {
    //     console.log(name + '保存成功')
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       title: name + '保存失败',
    //       icon: 'none',
    //       duration: 3000
    //     })
    //   }
    // })
  },

  // 修改按钮
  editProjects() {
    this.setData({
      editProject: true
    })
  },

  // 保存修改
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
      project.forEach(item => {
        if (item.id) {
          // 新项目，添加
          this.addProject(item)
        }else{
          // 旧项目，更新
          this.updateProject(item)
        }
      })
    }
  },

  // 编辑项目名称
  projectName(e) {
    let index = e.target.dataset.index
    let value = e.detail.value
    let project = this.data.projectList
    project[index].name = value
    this.setData({
      projectList: project
    })
  },

  // 编辑项目重量
  projectWeight(e) {
    let index = e.target.dataset.index
    let value = e.detail.value
    let project = this.data.projectList
    project[index].weight = value
    this.setData({
      projectList: project
    })
  },

  // 归零
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
          project[index].count = 0
          that.setData({
            projectList: project
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 删除
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
          project.splice(index, 1)
          that.setData({
            projectList: project
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 新增项目
  addNewProject() {
    let project = this.data.projectList
    project.push({
      name: '',
      count: 0,
      weight: 0,
      state: 1
    })
    this.setData({
      projectList: project
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

})