// pages/property/package/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    packageInfo: {},
    trackingInfo: [],
    similarPackages: [],
    showReminderModal: false,
    selectedReminder: '30',
    customTime: '12:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.fetchPackageDetail(options.id);
    }
  },

  /**
   * 获取包裹详情
   */
  fetchPackageDetail: function(id) {
    wx.showLoading({
      title: '加载中',
    });

    // 模拟API请求
    setTimeout(() => {
      // 模拟包裹详情数据
      const packageInfo = {
        id: id,
        courier: '顺丰速运',
        trackingNumber: 'SF1234567890',
        arrivalTime: '2023-08-10 14:30',
        location: '小区物业服务中心',
        status: '待领取',
        expiryDate: '2023-08-17',
        remark: '易碎物品，请小心轻放'
      };

      // 模拟物流跟踪数据
      const trackingInfo = [
        {
          time: '2023-08-10 14:30',
          status: '包裹已到达',
          location: '小区物业服务中心'
        },
        {
          time: '2023-08-10 11:15',
          status: '派送中',
          location: '广州市天河区配送中心'
        },
        {
          time: '2023-08-10 08:30',
          status: '运输中',
          location: '广州市白云区转运中心'
        },
        {
          time: '2023-08-09 20:45',
          status: '已发货',
          location: '深圳市南山区仓库'
        },
        {
          time: '2023-08-09 16:20',
          status: '已下单'
        }
      ];

      // 模拟相似包裹数据
      const similarPackages = [
        {
          id: '2',
          courier: '京东快递',
          arrivalTime: '2023-08-11 09:15',
          status: '待领取'
        },
        {
          id: '5',
          courier: '申通快递',
          arrivalTime: '2023-08-07 10:00',
          status: '已领取'
        }
      ];

      this.setData({
        packageInfo,
        trackingInfo,
        similarPackages
      });

      wx.hideLoading();
    }, 1000);
  },

  /**
   * 复制快递单号
   */
  copyTrackingNumber: function() {
    wx.setClipboardData({
      data: this.data.packageInfo.trackingNumber,
      success: () => {
        wx.showToast({
          title: '已复制单号',
          icon: 'success'
        });
      }
    });
  },

  /**
   * 确认领取包裹
   */
  confirmPickup: function() {
    wx.showModal({
      title: '确认领取',
      content: '确认已领取该包裹吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
          });

          // 模拟API请求
          setTimeout(() => {
            const packageInfo = this.data.packageInfo;
            packageInfo.status = '已领取';
            packageInfo.pickupTime = this.formatTime(new Date());

            this.setData({
              packageInfo
            });

            wx.hideLoading();
            wx.showToast({
              title: '已确认领取',
              icon: 'success'
            });
          }, 1000);
        }
      }
    });
  },

  /**
   * 联系快递
   */
  contactCourier: function() {
    const courierPhones = {
      '顺丰速运': '95338',
      '京东快递': '950616',
      '中通快递': '95311',
      '圆通快递': '95554',
      '申通快递': '95543',
      '韵达快递': '95546',
      '百世快递': '95320',
      '邮政快递': '11183'
    };

    const phone = courierPhones[this.data.packageInfo.courier] || '10086';

    wx.showActionSheet({
      itemList: ['拨打客服电话', '查看物流详情'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.makePhoneCall({
            phoneNumber: phone
          });
        } else if (res.tapIndex === 1) {
          // 跳转到物流详情页或打开小程序
          wx.showToast({
            title: '查看物流详情',
            icon: 'none'
          });
        }
      }
    });
  },

  /**
   * 查看包裹详情
   */
  viewPackageDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: `/pages/property/package/detail/detail?id=${id}`
    });
  },

  /**
   * 设置提醒
   */
  setReminder: function() {
    this.setData({
      showReminderModal: true
    });
  },

  /**
   * 隐藏提醒弹窗
   */
  hideReminderModal: function() {
    this.setData({
      showReminderModal: false
    });
  },

  /**
   * 选择提醒时间
   */
  selectReminder: function(e) {
    const time = e.currentTarget.dataset.time;
    this.setData({
      selectedReminder: time
    });
  },

  /**
   * 设置自定义时间
   */
  setCustomTime: function(e) {
    this.setData({
      customTime: e.detail.value
    });
  },

  /**
   * 保存提醒设置
   */
  saveReminder: function() {
    let reminderText = '';
    if (this.data.selectedReminder === 'custom') {
      reminderText = `将在 ${this.data.customTime} 提醒您领取包裹`;
    } else {
      const minutes = parseInt(this.data.selectedReminder);
      reminderText = `将在领取前 ${minutes} 分钟提醒您`;
    }

    wx.showToast({
      title: '提醒已设置',
      icon: 'success'
    });

    this.hideReminderModal();
  },

  /**
   * 格式化时间
   */
  formatTime: function(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return [
      year, month, day
    ].map(this.formatNumber).join('-') + ' ' + [
      hour, minute
    ].map(this.formatNumber).join(':');
  },

  /**
   * 格式化数字
   */
  formatNumber: function(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }
})