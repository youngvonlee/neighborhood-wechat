// pages/property/visitor/visitor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visitors: [
      {
        id: '1',
        name: '张三',
        phone: '13800138001',
        visitTime: '2023-05-01 14:00',
        leaveTime: '2023-05-01 16:00',
        status: 'completed',
        statusText: '已完成',
        reason: '探亲',
        carNumber: '京A12345',
        relationship: '朋友',
        houseNumber: '1栋2单元303',
        remark: '带了礼物',
        qrCode: '/static/images/qrcode_sample.png'
      },
      {
        id: '2',
        name: '李四',
        phone: '13900139002',
        visitTime: '2023-05-05 10:00',
        leaveTime: '2023-05-05 11:30',
        status: 'completed',
        statusText: '已完成',
        reason: '送货',
        carNumber: '',
        relationship: '快递员',
        houseNumber: '2栋1单元101',
        remark: '大件物品',
        qrCode: '/static/images/qrcode_sample.png'
      },
      {
        id: '3',
        name: '王五',
        phone: '13700137003',
        visitTime: '2023-05-10 18:00',
        leaveTime: '2023-05-10 20:00',
        status: 'upcoming',
        statusText: '即将到访',
        reason: '聚餐',
        carNumber: '京B54321',
        relationship: '同事',
        houseNumber: '3栋3单元502',
        remark: '',
        qrCode: '/static/images/qrcode_sample.png'
      }
    ],
    activeTab: 'upcoming',
    filteredVisitors: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.filterVisitors();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时刷新访客列表
    this.filterVisitors();
  },

  /**
   * 切换标签页
   */
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
    this.filterVisitors();
  },

  /**
   * 根据当前标签筛选访客
   */
  filterVisitors() {
    const { visitors, activeTab } = this.data;
    let filtered = [];
    
    if (activeTab === 'all') {
      filtered = [...visitors];
    } else {
      filtered = visitors.filter(item => item.status === activeTab);
    }
    
    this.setData({
      filteredVisitors: filtered
    });
  },

  /**
   * 查看访客详情
   */
  viewVisitorDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/property/visitor/detail/detail?id=${id}`
    });
  },

  /**
   * 添加访客
   */
  addVisitor() {
    wx.navigateTo({
      url: '/pages/property/visitor/add/add'
    });
  },

  /**
   * 分享访客二维码
   */
  shareVisitorQRCode(e) {
    const id = e.currentTarget.dataset.id;
    const visitor = this.data.visitors.find(item => item.id === id);
    
    if (visitor && visitor.qrCode) {
      wx.previewImage({
        current: visitor.qrCode,
        urls: [visitor.qrCode]
      });
    }
  },

  /**
   * 取消访客预约
   */
  cancelVisitor(e) {
    const id = e.currentTarget.dataset.id;
    const visitor = this.data.visitors.find(item => item.id === id);
    
    if (!visitor) return;
    
    wx.showModal({
      title: '取消预约',
      content: `确定要取消${visitor.name}的访问预约吗？`,
      success: (res) => {
        if (res.confirm) {
          // 模拟API请求
          wx.showLoading({
            title: '取消中',
          });
          
          setTimeout(() => {
            // 更新本地数据
            const visitors = this.data.visitors.map(item => {
              if (item.id === id) {
                return { ...item, status: 'cancelled', statusText: '已取消' };
              }
              return item;
            });
            
            this.setData({ visitors }, () => {
              this.filterVisitors();
            });
            
            wx.hideLoading();
            wx.showToast({
              title: '取消成功',
              icon: 'success'
            });
          }, 1000);
        }
      }
    });
  },

  /**
   * 编辑访客信息
   */
  editVisitor(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/property/visitor/edit/edit?id=${id}`
    });
  },

  /**
   * 拨打访客电话
   */
  callVisitor(e) {
    const phone = e.currentTarget.dataset.phone;
    
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone,
        fail: (err) => {
          console.error('拨打电话失败', err);
          wx.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '访客管理',
      path: '/pages/property/visitor/visitor'
    };
  }
})