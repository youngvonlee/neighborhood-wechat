// pages/property/parking/temp-detail/temp-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkingInfo: {
      plateNumber: '',
      entryTime: '',
      exitTime: '',
      parkingDuration: '',
      location: '地下停车场',
      estimatedFee: '0',
      status: ''
    },
    parkingHistory: [
      {
        id: '1',
        date: '2023-11-05',
        duration: '1小时45分钟',
        fee: '15',
        status: '已缴费'
      },
      {
        id: '2',
        date: '2023-10-28',
        duration: '2小时30分钟',
        fee: '20',
        status: '已缴费'
      },
      {
        id: '3',
        date: '2023-10-15',
        duration: '3小时15分钟',
        fee: '25',
        status: '已缴费'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.plateNumber) {
      this.queryParkingInfo(options.plateNumber);
    }
  },

  /**
   * 查询停车信息
   */
  queryParkingInfo(plateNumber) {
    wx.showLoading({
      title: '加载中',
    });

    // 模拟API请求
    setTimeout(() => {
      // 模拟数据
      this.setData({
        'parkingInfo': {
          plateNumber: plateNumber,
          entryTime: '2023-11-10 08:30',
          parkingDuration: '2小时30分钟',
          location: '地下停车场B区',
          estimatedFee: '15',
          status: ''
        }
      });
      wx.hideLoading();
    }, 1000);
  },

  /**
   * 支付停车费
   */
  payParkingFee() {
    wx.showModal({
      title: '缴纳停车费',
      content: `确认支付¥${this.data.parkingInfo.estimatedFee}元停车费吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '支付中',
          });

          // 模拟支付过程
          setTimeout(() => {
            const parkingInfo = this.data.parkingInfo;
            parkingInfo.status = '已缴费';
            parkingInfo.exitTime = this.formatTime(new Date());

            this.setData({
              parkingInfo: parkingInfo
            });

            wx.hideLoading();
            wx.showToast({
              title: '支付成功',
              icon: 'success'
            });
          }, 1500);
        }
      }
    });
  },

  /**
   * 格式化时间
   */
  formatTime(date) {
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
  formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }
})