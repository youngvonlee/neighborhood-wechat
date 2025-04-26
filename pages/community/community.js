// pages/community/community.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    announcements: [
      { id: '1', title: '小区物业通知：下周二上午10点-12点将进行消防安全检查', date: '2023-04-20', content: '为确保小区消防设施正常运行，物业将于下周二上午10点-12点进行消防安全检查，请各位业主配合。' },
      { id: '2', title: '社区活动：周末亲子手工制作活动，欢迎报名参加', date: '2023-04-18', content: '本周六下午2点-4点，小区会所将举办亲子手工制作活动，欢迎家长带孩子参加，报名请联系物业。' },
      { id: '3', title: '电梯维修通知：1号楼电梯将于本周四进行维修', date: '2023-04-15', content: '1号楼电梯将于本周四上午9点-下午3点进行维修，请居民做好准备，不便之处敬请谅解。' }
    ],
    activities: [
      { id: '1', title: '亲子手工制作', date: '2023-04-22 14:00-16:00', location: '小区会所', status: '报名中' },
      { id: '2', title: '老年人健康讲座', date: '2023-04-25 10:00-11:30', location: '小区活动室', status: '报名中' },
      { id: '3', title: '业主委员会选举', date: '2023-04-30 19:00-21:00', location: '小区大厅', status: '即将开始' }
    ],
    forums: [
      { id: '1', title: '有没有推荐的家政服务？', author: '张先生', replies: 8, time: '2小时前' },
      { id: '2', title: '小区健身房什么时候开放？', author: '李女士', replies: 5, time: '3小时前' },
      { id: '3', title: '有人知道附近哪里有好的幼儿园吗？', author: '王先生', replies: 12, time: '昨天' }
    ],
    activeTab: 'announcements'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 切换标签页
   */
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  /**
   * 查看公告详情
   */
  viewAnnouncementDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '公告详情',
      content: this.data.announcements.find(item => item.id === id).content,
      showCancel: false
    });
  },

  /**
   * 参加活动
   */
  joinActivity(e) {
    const id = e.currentTarget.dataset.id;
    const activity = this.data.activities.find(item => item.id === id);
    wx.showModal({
      title: '报名确认',
      content: `您确定要报名参加${activity.title}活动吗？`,