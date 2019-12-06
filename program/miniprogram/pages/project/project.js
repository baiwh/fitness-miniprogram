// pages/project/project.js
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
    editProject: false,
    loading: false
  },

  // 点击项目+1
  projectCountAdd(e){
    let index = e.target.dataset.index
    let project = this.data.projectList
    project[index].count++
    this.setData({
      projectList: project
    })
  },

  // 长按项目-1
  // projectCountRevoke(e){
  //   let index = e.target.dataset.index
  //   let project = this.data.projectList
  //   project[index].count--
  //   this.setData({
  //     projectList: project
  //   })
  // },

  // 修改按钮
  editProjects() {
    this.setData({
      editProject: true
    })
  },

  // 保存修改
  submitProjects() {
    this.setData({
      editProject: false
    })
    // 数据库保存一下
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
          project[index].count=0
          that.setData({
            projectList:project
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
    let that=this
    wx.showModal({
      title: '提示',
      content: '真的要删掉么？',
      success(res) {
        if (res.confirm) {
          // 确定删除
          project.splice(index,1)
          that.setData({
            projectList:project
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
      id: '',
      name: '',
      count: 0,
      weight: 0,
      unit: 'kg',
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