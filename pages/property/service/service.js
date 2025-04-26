// pages/property/service/service.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    unpaidCount: 2,
    pendingVisitorCount: 1,
    unreadNoticeCount: 3,
    // 社区公告数据
    announcements: [
      {
        id: 1,
        title: '小区电梯维修通知',
        date: '2023-08-12',
        content: '1号楼电梯将于8月15日进行维修，请提前安排出行。',
        isImportant: true
      },
      {
        id: 2,
        title: '垃圾分类宣传活动',
        date: '2023-08-10',
        content: '本周六上午10点在小区广场举办垃圾分类宣传活动。',
        isImportant: false
      }
    ],
    promotions: [
      {
        id: 1,
        title: '物业费年付9折优惠',
        period: '2023-06-01至2023-12-31',
        tag: '限时优惠',
        image: '/images/promotion1.png'
      },
      {
        id: 2,
        title: '水电费充值满200送20',
        period: '2023-07-01至2023-09-30',
        tag: '充值优惠',
        image: '/images/promotion2.png'
      }
    ],
    coupons: [
      {
        id: 1,
        name: '物业费优惠券',
        amount: 50,
        condition: 500,
        validity: '2023-12-31'
      },
      {
        id: 2,
        name: '停车费优惠券',
        amount: 20,
        condition: 100,
        validity: '2023-10-31'
      }
    ],
    // 社区活动数据
    communityActivities: [
      {
        id: 1,
        title: '社区插花艺术课',
        time: '2023-08-15 14:00',
        location: '小区会所一楼',
        status: '报名中'
      },
      {
        id: 2,
        title: '业主读书会',
        time: '2023-08-20 19:00',
        location: '小区图书室',
        status: '报名中'
      }
    ],
    // 便民服务数据
    convenientServices: [
      {
        id: 1,
        name: '家政服务',
        icon: 'housekeeping-icon'
      },
      {
        id: 2,
        name: '快递代收',
        icon: 'express-icon'
      },
      {
        id: 3,
        name: '社区团购',
        icon: 'groupbuy-icon'
      },
      {
        id: 4,
        name: '维修预约',
        icon: 'maintenance-icon'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 模拟从服务器获取数据
    this.fetchPropertyData();
  },

  /**
   * 模拟从服务器获取物业数据
   */
  fetchPropertyData: function() {
    // 实际应用中，这里应该是调用API获取数据
    console.log('获取物业数据');
    // 模拟异步获取数据
    setTimeout(() => {
      this.setData({
        unpaidCount: 2,
        pendingVisitorCount: 1,
        unreadNoticeCount: 3
      });
    }, 500);
  },

  /**
   * 导航到物业缴费页面
   */
  navigateToPayment: function() {
    wx.navigateTo({
      url: '/pages/property/payment/payment'
    });
  },

  /**
   * 导航到访客登记页面
   */
  navigateToVisitor: function() {
    wx.navigateTo({
      url: '/pages/property/visitor/visitor'
    });
  },

  /**
   * 导航到物业通知页面
   */
  navigateToNotice: function() {
    wx.navigateTo({
      url: '/pages/property/notice/notice'
    });
  },

  /**
   * 导航到缴费记录页面
   */
  navigateToRecords: function() {
    wx.navigateTo({
      url: '/pages/property/payment/records/records'
    });
  },

  /**
   * 查看所有优惠活动
   */
  viewAllPromotions: function() {
    wx.navigateTo({
      url: '/pages/property/promotions/promotions'
    });
  },

  /**
   * 查看优惠活动详情
   */
  viewPromotionDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/property/promotions/detail/detail?id=${id}`
    });
  },

  /**
   * 报修服务
   */
  reportRepair: function() {
    wx.navigateTo({
      url: '/pages/property/repair/repair'
    });
  },

  /**
   * 联系物业
   */
  contactProperty: function() {
    wx.showActionSheet({
      itemList: ['拨打物业电话', '在线客服'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.makePhoneCall({
            phoneNumber: '400-123-4567'
          });
        } else if (res.tapIndex === 1) {
          // 打开在线客服
          wx.navigateTo({
            url: '/pages/property/customer-service/customer-service'
          });
        }
      }
    });
  },

  /**
   * 包裹领取
   */
  packageReceive: function() {
    wx.navigateTo({
      url: '/pages/property/package/package'
    });
  },

  /**
   * 停车服务
   */
  parkingService: function() {
    wx.navigateTo({
      url: '/pages/property/parking/parking'
    });
  },

  /**
   * 缴纳停车费
   */
  payParkingFee: function() {
    wx.showModal({
      title: '停车费缴纳',
      content: '是否缴纳本月停车费？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
          });
          
          // 模拟API请求
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '缴费成功',
              icon: 'success'
            });
          }, 1500);
        }
      }
    });
  },

  /**
   * 查看所有公告
   */
  viewAllAnnouncements: function() {
    wx.navigateTo({
      url: '/pages/property/notice/notice'
    });
  },

  /**
   * 查看公告详情
   */
  viewAnnouncementDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    const announcement = this.data.announcements.find(item => item.id === id);
    
    wx.showModal({
      title: announcement.title,
      content: announcement.content,
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  /**
   * 查看所有优惠券
   */
  viewAllCoupons: function() {
    wx.navigateTo({
      url: '/pages/property/coupons/coupons'
    });
  },

  /**
   * 使用优惠券
   */
  useCoupon: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/property/payment/payment?couponId=${id}`
    });
  },

  /**
   * 获取优惠券
   */
  getCoupons: function() {
    wx.navigateTo({
      url: '/pages/property/coupons/get/get'
    });
  },

  /**
   * 参加社区活动
   */
  joinCommunityActivity: function(e) {
    const id = e.currentTarget.dataset.id;
    const activity = this.data.communityActivities.find(item => item.id === id);
    
    wx.showModal({
      title: '活动报名',
      content: `确定报名参加「${activity.title}」活动吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '报名中',
          });
          
          // 模拟API请求
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '报名成功',
              icon: 'success'
            });
            
            // 更新活动状态
            const updatedActivities = this.data.communityActivities.map(item => {
              if (item.id === id) {
                return {
                  ...item,
                  status: '已报名'
                };
              }
              return item;
            });
            
            this.setData({
              communityActivities: updatedActivities
            });
          }, 1500);
        }
      }
    });
  },

  /**
   * 查看所有社区活动
   */
  viewAllActivities: function() {
    wx.navigateTo({
      url: '/pages/community/activity/activity'
    });
  },

  /**
   * 使用便民服务
   */
  useConvenientService: function(e) {
    const id = e.currentTarget.dataset.id;
    const service = this.data.convenientServices.find(item => item.id === id);
    
    if (service) {
      switch(service.name) {
        case '家政服务':
          wx.navigateTo({ url: '/pages/services/housekeeping/housekeeping' });
          break;
        case '快递代收':
          wx.navigateTo({ url: '/pages/services/express/express' });
          break;
        case '社区团购':
          wx.navigateTo({ url: '/pages/services/groupbuy/groupbuy' });
          break;
        case '维修预约':
          wx.navigateTo({ url: '/pages/property/repair/repair' });
          break;
        default:
          wx.showToast({ title: '服务开发中', icon: 'none' });
      }
    }
  }
})