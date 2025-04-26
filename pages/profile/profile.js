// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: '/static/images/default-avatar.png',
      nickName: '邻居',
      phone: '138****1234',
      building: '2号楼',
      room: '303'
    },
    menuList: [
      { id: '1', title: '我的订单', icon: '/static/icons/shopping-bag.svg', path: '/pages/profile/orders/orders' },
      { id: '2', title: '我的活动', icon: '/static/icons/calendar.svg', path: '/pages/profile/activities/activities' },
      { id: '3', title: '我的帖子', icon: '/static/icons/message-square.svg', path: '/pages/profile/posts/posts' },
      { id: '4', title: '我的房屋', icon: '/static/icons/home.svg', path: '/pages/profile/house/house' },
      { id: '5', title: '缴费记录', icon: '/static/icons/credit-card.svg', path: '/pages/profile/payments/payments' },
      { id: '6', title: '访客记录', icon: '/static/icons/users.svg', path: '/pages/profile/visitors/visitors' }
    ],
    settingsList: [
      { id: '1', title: '账号与安全', icon: '/static/icons/shield.svg', path: '/pages/profile/security/security' },
      { id: '2', title: '通知设置', icon: '/static/icons/bell.svg', path: '/pages/profile/notifications/notifications' },
      { id: '3', title: '关于我们', icon: '/static/icons/info.svg', path: '/pages/profile/about/about' },
      { id: '4', title: '帮助与反馈', icon: '/static/icons/help-circle.svg', path: '/pages/profile/help/help' }
    ]
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
   * 编辑个人资料
   */
  editProfile() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  /**
   * 退出登录
   */
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 实际应用中，这里应该清除登录状态和缓存
          wx.showToast({
            title: '已退出登录',
            icon: 'success',
            success: () => {
              setTimeout(() => {
                // 返回到登录页
                wx.reLaunch({
                  url: '/pages/login/login'
                });
              }, 1500);
            }
          });
        }
      }
    });
  }
})