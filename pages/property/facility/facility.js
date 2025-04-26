// pages/property/facility/facility.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeType: 'all',
    facilityTypes: [
      { id: 'all', name: '全部' },
      { id: 'sport', name: '运动健身' },
      { id: 'entertainment', name: '文娱活动' },
      { id: 'meeting', name: '会议室' },
      { id: 'other', name: '其他' }
    ],
    facilities: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchFacilities();
  },

  /**
   * 切换设施类型
   */
  switchFacilityType: function(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ activeType: type });
    this.fetchFacilities(type);
  },

  /**
   * 获取设施列表
   */
  fetchFacilities: function(type = 'all') {
    this.setData({ loading: true });
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟设施数据
      const facilities = [
        {
          id: '1',
          name: '小区健身房',
          type: 'sport',
          location: '小区会所一楼',
          openTime: '06:00',
          closeTime: '22:00',
          status: '可预约',
          image: '/static/images/gym.jpg'
        },
        {
          id: '2',
          name: '羽毛球场',
          type: 'sport',
          location: '小区会所二楼',
          openTime: '08:00',
          closeTime: '21:00',
          status: '可预约',
          image: '/static/images/badminton.jpg'
        },
        {
          id: '3',
          name: '乒乓球室',
          type: 'sport',
          location: '小区会所二楼',
          openTime: '08:00',
          closeTime: '21:00',
          status: '可预约',
          image: '/static/images/pingpong.jpg'
        },
        {
          id: '4',
          name: '多功能会议室',
          type: 'meeting',
          location: '小区会所三楼',
          openTime: '09:00',
          closeTime: '20:00',
          status: '可预约',
          image: '/static/images/meeting_room.jpg'
        },
        {
          id: '5',
          name: '棋牌室',
          type: 'entertainment',
          location: '小区会所一楼',
          openTime: '10:00',
          closeTime: '22:00',
          status: '可预约',
          image: '/static/images/chess_room.jpg'
        },
        {
          id: '6',
          name: '图书阅览室',
          type: 'entertainment',
          location: '小区会所四楼',
          openTime: '09:00',
          closeTime: '21:00',
          status: '可预约',
          image: '/static/images/library.jpg'
        },
        {
          id: '7',
          name: '儿童游乐室',
          type: 'entertainment',
          location: '小区会所一楼',
          openTime: '09:00',
          closeTime: '20:00',
          status: '维护中',
          image: '/static/images/kids_room.jpg'
        },
        {
          id: '8',
          name: '瑜伽室',
          type: 'sport',
          location: '小区会所三楼',
          openTime: '08:00',
          closeTime: '21:00',
          status: '可预约',
          image: '/static/images/yoga_room.jpg'
        }
      ];
      
      // 根据类型筛选
      let filteredFacilities = [];
      if (type === 'all') {
        filteredFacilities = facilities;
      } else {
        filteredFacilities = facilities.filter(facility => facility.type === type);
      }
      
      this.setData({
        facilities: filteredFacilities,
        loading: false
      });
    }, 1000);
  },

  /**
   * 跳转到预约页面
   */
  navigateToBooking: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/property/facility/booking/booking?id=${id}`
    });
  },

  /**
   * 跳转到我的预约页面
   */
  navigateToMyBookings: function() {
    wx.navigateTo({
      url: '/pages/property/facility/my-bookings/my-bookings'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 页面显示时刷新数据，以便在预约后返回能看到最新状态
    this.fetchFacilities(this.data.activeType);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.fetchFacilities(this.data.activeType);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 可以在这里实现加载更多
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '小区公共设施预约',
      path: '/pages/property/facility/facility'
    };
  }
})