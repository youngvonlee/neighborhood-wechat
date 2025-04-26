// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '邻居', // Default user name
    community: '阳光花园', // Default community name
    announcements: [
      { id: '1', title: '小区物业通知：下周二上午10点-12点将进行消防安全检查', date: '2023-04-20' },
      { id: '2', title: '社区活动：周末亲子手工制作活动，欢迎报名参加', date: '2023-04-18' },
    ],
    todayMeals: [
      { id: '1', title: '家常红烧肉', chef: '张阿姨', price: 38 },
      { id: '2', title: '手工水饺', chef: '王大爷', price: 25 },
    ],
    paymentReminders: [
      { id: '1', title: '物业费', amount: 580, dueDate: '2023-04-30', status: '未缴费' },
      { id: '2', title: '水费', amount: 85.5, dueDate: '2023-04-25', status: '未缴费' }
    ],
    visitors: [
      { id: '1', name: '李师傅', purpose: '家电维修', time: '今天 14:30', status: '已通过' },
      { id: '2', name: '王阿姨', purpose: '探访', time: '明天 10:00', status: '待确认' }
    ],
    nearbyShops: [
      { id: '1', name: '鲜果超市', distance: '50m', discount: '满20减5' },
      { id: '2', name: '好邻居药店', distance: '100m', discount: '9折优惠' },
      { id: '3', name: '晨光便利店', distance: '150m', discount: '特价商品' }
    ],
    weather: {
      temperature: '25°C',
      condition: '晴',
      airQuality: '良好'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // In a real app, you might fetch data here
    // For now, we use the mock data defined in data
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
   * 一键缴费
   */
  payFees() {
    wx.showModal({
      title: '缴费确认',
      content: '确定要缴纳所有待缴费用吗？',
      success: (res) => {
        if (res.confirm) {
          // 实际应用中，这里应该调用支付API
          wx.showToast({
            title: '缴费成功',
            icon: 'success'
          });
          
          // 更新缴费状态
          const updatedPayments = this.data.paymentReminders.map(item => {
            return {
              ...item,
              status: '已缴费'
            };
          });
          
          this.setData({
            paymentReminders: updatedPayments
          });
        }
      }
    });
  },

  /**
   * 新增访客
   */
  addVisitor() {
    wx.navigateTo({
      url: '/pages/visitors/add/add'
    });
  },

  /**
   * 查看周边商家详情
   */
  viewShopDetail(e) {
    const id = e.currentTarget.dataset.id;
    const shop = this.data.nearbyShops.find(item => item.id === id);
    
    wx.showModal({
      title: shop.name,
      content: `距离: ${shop.distance}\n优惠: ${shop.discount}`,
      showCancel: false
    });
  }
})