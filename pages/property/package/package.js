// pages/property/package/package.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    packages: [],
    tabs: ['待领取', '已领取', '已过期'],
    activeTab: 0,
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchPackages();
  },

  /**
   * 切换标签页
   */
  switchTab: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeTab: index
    });
    this.fetchPackages();
  },

  /**
   * 获取包裹数据
   */
  fetchPackages: function() {
    this.setData({ loading: true });
    
    // 模拟API请求
    setTimeout(() => {
      let packages = [];
      
      // 根据当前标签页生成不同状态的包裹数据
      if (this.data.activeTab === 0) { // 待领取
        packages = [
          {
            id: '1',
            courier: '顺丰速运',
            trackingNumber: 'SF1234567890',
            arrivalTime: '2023-08-10 14:30',
            location: '小区物业服务中心',
            status: '待领取',
            expiryDate: '2023-08-17'
          },
          {
            id: '2',
            courier: '京东快递',
            trackingNumber: 'JD9876543210',
            arrivalTime: '2023-08-11 09:15',
            location: '小区物业服务中心',
            status: '待领取',
            expiryDate: '2023-08-18'
          },
          {
            id: '3',
            courier: '中通快递',
            trackingNumber: 'ZT5678901234',
            arrivalTime: '2023-08-11 16:45',
            location: '小区智能快递柜A区',
            status: '待领取',
            expiryDate: '2023-08-18',
            cabinetNumber: 'A-108',
            pickupCode: '8642'
          }
        ];
      } else if (this.data.activeTab === 1) { // 已领取
        packages = [
          {
            id: '4',
            courier: '圆通快递',
            trackingNumber: 'YT2468013579',
            arrivalTime: '2023-08-05 11:20',
            location: '小区物业服务中心',
            status: '已领取',
            pickupTime: '2023-08-05 18:30'
          },
          {
            id: '5',
            courier: '申通快递',
            trackingNumber: 'ST1357924680',
            arrivalTime: '2023-08-07 10:00',
            location: '小区智能快递柜B区',
            status: '已领取',
            pickupTime: '2023-08-07 17:15',
            cabinetNumber: 'B-056'
          }
        ];
      } else { // 已过期
        packages = [
          {
            id: '6',
            courier: '韵达快递',
            trackingNumber: 'YD9753108642',
            arrivalTime: '2023-07-25 09:30',
            location: '小区物业服务中心',
            status: '已过期',
            expiryDate: '2023-08-01',
            remark: '已退回寄件人'
          }
        ];
      }
      
      this.setData({
        packages,
        loading: false
      });
    }, 1000);
  },

  /**
   * 查看包裹详情
   */
  viewPackageDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/property/package/detail/detail?id=${id}`
    });
  },

  /**
   * 确认领取包裹
   */
  confirmPickup: function(e) {
    const id = e.currentTarget.dataset.id;
    const packageItem = this.data.packages.find(item => item.id === id);
    
    wx.showModal({
      title: '确认领取',
      content: `确认领取来自${packageItem.courier}的包裹？`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
          });
          
          // 模拟API请求
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '领取成功',
              icon: 'success'
            });
            
            // 刷新包裹列表
            this.fetchPackages();
          }, 1500);
        }
      }
    });
  },

  /**
   * 联系快递员
   */
  contactCourier: function(e) {
    const id = e.currentTarget.dataset.id;
    const packageItem = this.data.packages.find(item => item.id === id);
    
    wx.showActionSheet({
      itemList: ['拨打快递员电话', '查看物流详情'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 实际应用中应该从服务器获取快递员电话
          wx.makePhoneCall({
            phoneNumber: '13800138000',
            fail: () => {
              wx.showToast({
                title: '拨打电话失败',
                icon: 'none'
              });
            }
          });
        } else if (res.tapIndex === 1) {
          // 查看物流详情
          wx.navigateTo({
            url: `/pages/property/package/tracking/tracking?number=${packageItem.trackingNumber}&courier=${packageItem.courier}`
          });
        }
      }
    });
  },

  /**
   * 刷新页面
   */
  onPullDownRefresh: function() {
    this.fetchPackages();
    wx.stopPullDownRefresh();
  }
})