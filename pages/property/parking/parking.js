// pages/property/parking/parking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkingSpots: [
      {
        id: '1',
        area: 'A区',
        number: 'A-101',
        status: '可租用',
        price: '300/月',
        type: '标准车位'
      },
      {
        id: '2',
        area: 'A区',
        number: 'A-102',
        status: '已租用',
        price: '300/月',
        type: '标准车位'
      },
      {
        id: '3',
        area: 'B区',
        number: 'B-056',
        status: '可租用',
        price: '350/月',
        type: '大型车位'
      },
      {
        id: '4',
        area: 'B区',
        number: 'B-057',
        status: '可租用',
        price: '350/月',
        type: '大型车位'
      },
      {
        id: '5',
        area: 'C区',
        number: 'C-023',
        status: '维修中',
        price: '280/月',
        type: '标准车位'
      }
    ],
    myParkingSpots: [
      {
        id: '1',
        area: 'A区',
        number: 'A-088',
        expireDate: '2023-12-31',
        type: '标准车位',
        unpaidFee: '150'
      },
      {
        id: '2',
        area: 'B区',
        number: 'B-045',
        expireDate: '2024-03-15',
        type: '充电车位',
        unpaidFee: '200'
      }
    ],
    activeTab: 'available',
    tempParking: [
      {
        id: 'T1',
        plateNumber: '粤B12345',
        entryTime: '2023-11-10 08:30',
        parkingDuration: '2小时30分钟',
        estimatedFee: '15'
      }
    ],
    filterVisible: false,
    filters: {
      area: '',
      type: '',
      status: '可租用'
    },
    areas: ['全部', 'A区', 'B区', 'C区'],
    types: ['全部', '标准车位', '大型车位', '充电车位'],
    statuses: ['全部', '可租用', '已租用', '维修中']
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
   * 显示筛选面板
   */
  showFilter() {
    this.setData({
      filterVisible: true
    });
  },

  /**
   * 隐藏筛选面板
   */
  hideFilter() {
    this.setData({
      filterVisible: false
    });
  },

  /**
   * 缴纳停车费
   */
  payParkingFee(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '缴纳停车费',
      content: '确认缴纳此车位的停车费用吗？',
      success: (res) => {
        if (res.confirm) {
          // 模拟支付过程
          wx.showLoading({
            title: '处理中',
          });
          
          setTimeout(() => {
            wx.hideLoading();
            // 更新车位数据，清除未缴费用
            const myParkingSpots = this.data.myParkingSpots.map(item => {
              if (item.id === id) {
                return {
                  ...item,
                  unpaidFee: ''
                };
              }
              return item;
            });
            
            this.setData({
              myParkingSpots
            });
            
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
   * 查询临时停车
   */
  queryTempParking() {
    wx.showModal({
      title: '查询临时停车',
      content: '请输入车牌号码',
      editable: true,
      placeholderText: '例如：粤B12345',
      success: (res) => {
        if (res.confirm && res.content) {
          // 模拟查询过程
          wx.showLoading({
            title: '查询中',
          });
          
          setTimeout(() => {
            wx.hideLoading();
            wx.navigateTo({
              url: '/pages/property/parking/temp-detail/temp-detail?plateNumber=' + res.content
            });
          }, 1000);
        }
      }
    });
  },

  /**
   * 选择筛选条件
   */
  selectFilter(e) {
    const { type, value } = e.currentTarget.dataset;
    const filters = { ...this.data.filters };
    filters[type] = value === '全部' ? '' : value;
    this.setData({
      filters
    });
  },

  /**
   * 应用筛选条件
   */
  applyFilter() {
    // 实际应用中这里会请求后端API获取筛选后的数据
    // 这里仅做演示，隐藏筛选面板
    this.setData({
      filterVisible: false
    });
    wx.showToast({
      title: '筛选条件已应用',
      icon: 'success'
    });
  },

  /**
   * 重置筛选条件
   */
  resetFilter() {
    this.setData({
      filters: {
        area: '',
        type: '',
        status: '可租用'
      }
    });
  },

  /**
   * 申请租用车位
   */
  applyForParking(e) {
    const id = e.currentTarget.dataset.id;
    const spot = this.data.parkingSpots.find(item => item.id === id);
    
    wx.showModal({
      title: '申请租用',
      content: `确定申请租用 ${spot.area}${spot.number} 车位吗？月租金：${spot.price}`,
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/property/parking/apply/apply?id=' + id
          });
        }
      }
    });
  },

  /**
   * 续租车位
   */
  renewParking(e) {
    const id = e.currentTarget.dataset.id;
    const spot = this.data.myParkingSpots.find(item => item.id === id);
    
    wx.showModal({
      title: '车位续租',
      content: `确定续租 ${spot.area}${spot.number} 车位吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/property/parking/renew/renew?id=' + id
          });
        }
      }
    });
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

  }
})