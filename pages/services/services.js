// pages/services/services.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    services: [
      {
        id: '1',
        title: '物业报修',
        icon: '/static/icons/tool.svg',
        description: '水电维修、设备故障等',
        path: '/pages/services/repair/repair'
      },
      {
        id: '2',
        title: '家政服务',
        icon: '/static/icons/home.svg',
        description: '保洁、搬家、家电清洗等',
        path: '/pages/services/housekeeping/housekeeping'
      },
      {
        id: '3',
        title: '快递代收',
        icon: '/static/icons/package.svg',
        description: '小区统一代收快递服务',
        path: '/pages/services/express/express'
      },
      {
        id: '4',
        title: '二手交易',
        icon: '/static/icons/shopping-bag.svg',
        description: '闲置物品交易平台',
        path: '/pages/services/secondhand/secondhand'
      },
      {
        id: '5',
        title: '车位租赁',
        icon: '/static/icons/car.svg',
        description: '小区车位出租与求租',
        path: '/pages/services/parking/parking'
      },
      {
        id: '6',
        title: '社区医疗',
        icon: '/static/icons/activity.svg',
        description: '健康咨询、上门诊疗',
        path: '/pages/services/medical/medical'
      }
    ],
    recentOrders: [
      {
        id: '1',
        serviceType: '物业报修',
        description: '厨房水管漏水',
        status: '处理中',
        date: '2023-04-19'
      },
      {
        id: '2',
        serviceType: '快递代收',
        description: '顺丰快递 (SF1234567890)',
        status: '待取件',
        date: '2023-04-20'
      }
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
   * 拨打物业电话
   */
  callProperty() {
    wx.makePhoneCall({
      phoneNumber: '400-123-4567',
      success: () => {
        console.log('拨打物业电话成功');
      },
      fail: (err) => {
        console.error('拨打物业电话失败', err);
        wx.showToast({
          title: '拨打电话失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 拨打紧急电话
   */
  callEmergency() {
    wx.showActionSheet({
      itemList: ['拨打120(医疗救援)', '拨打110(警察)', '拨打119(消防)'],
      success: (res) => {
        const phoneNumbers = ['120', '110', '119'];
        const selectedPhoneNumber = phoneNumbers[res.tapIndex];
        
        wx.makePhoneCall({
          phoneNumber: selectedPhoneNumber,
          fail: (err) => {
            console.error('拨打紧急电话失败', err);
            wx.showToast({
              title: '拨打电话失败',
              icon: 'none'
            });
          }
        });
      }
    });
  }
})