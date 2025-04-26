// pages/property/payment/records/records.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeOptions: ['全部', '物业费', '水费', '电费', '停车费'],
    typeIndex: 0,
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    records: [],
    showExportModal: false,
    originalRecords: [] // 保存原始记录，用于筛选
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前日期作为结束日期
    const now = new Date();
    const endDate = this.formatDate(now);
    
    // 获取六个月前的日期作为开始日期
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const startDate = this.formatDate(sixMonthsAgo);
    
    this.setData({
      startDate,
      endDate
    });
    
    // 加载缴费记录
    this.loadRecords();
  },

  /**
   * 加载缴费记录
   */
  loadRecords: function() {
    // 模拟API请求
    wx.showLoading({
      title: '加载中',
    });
    
    setTimeout(() => {
      // 模拟数据
      const records = [
        {
          id: '1',
          type: '物业费',
          period: '2023年1-3月',
          amount: '450.00',
          paidDate: '2023-03-25',
          building: '1号楼',
          room: '1单元101',
          payMethod: '微信支付',
          transactionId: '202301888776655'
        },
        {
          id: '2',
          type: '水费',
          period: '2023年4月',
          amount: '78.20',
          paidDate: '2023-05-10',
          building: '1号楼',
          room: '1单元101',
          payMethod: '微信支付',
          transactionId: '202302888776655'
        },
        {
          id: '3',
          type: '电费',
          period: '2023年4月',
          amount: '145.60',
          paidDate: '2023-05-10',
          building: '1号楼',
          room: '1单元101',
          payMethod: '微信支付',
          transactionId: '202303888776655'
        },
        {
          id: '4',
          type: '物业费',
          period: '2022年10-12月',
          amount: '450.00',
          paidDate: '2022-12-20',
          building: '1号楼',
          room: '1单元101',
          payMethod: '微信支付',
          transactionId: '202204888776655'
        },
        {
          id: '5',
          type: '停车费',
          period: '2023年1-6月',
          amount: '600.00',
          paidDate: '2023-01-15',
          building: '1号楼',
          room: '1单元101',
          payMethod: '微信支付',
          transactionId: '202305888776655'
        }
      ];
      
      this.setData({
        records,
        originalRecords: records
      });
      
      wx.hideLoading();
    }, 1000);
  },

  /**
   * 筛选类型变更
   */
  bindTypeChange: function(e) {
    this.setData({
      typeIndex: e.detail.value
    });
  },

  /**
   * 开始日期变更
   */
  bindStartDateChange: function(e) {
    this.setData({
      startDate: e.detail.value
    });
  },

  /**
   * 结束日期变更
   */
  bindEndDateChange: function(e) {
    this.setData({
      endDate: e.detail.value
    });
  },

  /**
   * 查询记录
   */
  searchRecords: function() {
    wx.showLoading({
      title: '查询中',
    });
    
    setTimeout(() => {
      // 筛选记录
      let filteredRecords = this.data.originalRecords;
      
      // 按类型筛选
      if (this.data.typeIndex > 0) {
        const selectedType = this.data.typeOptions[this.data.typeIndex];
        filteredRecords = filteredRecords.filter(record => record.type === selectedType);
      }
      
      // 按日期范围筛选
      filteredRecords = filteredRecords.filter(record => {
        const paidDate = new Date(record.paidDate);
        const startDate = new Date(this.data.startDate);
        const endDate = new Date(this.data.endDate);
        return paidDate >= startDate && paidDate <= endDate;
      });
      
      this.setData({
        records: filteredRecords
      });
      
      wx.hideLoading();
      
      // 显示筛选结果提示
      wx.showToast({
        title: `找到${filteredRecords.length}条记录`,
        icon: 'none'
      });
    }, 500);
  },

  /**
   * 重置筛选条件
   */
  resetFilters: function() {
    // 获取当前日期作为结束日期
    const now = new Date();
    const endDate = this.formatDate(now);
    
    // 获取六个月前的日期作为开始日期
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const startDate = this.formatDate(sixMonthsAgo);
    
    this.setData({
      typeIndex: 0,
      startDate,
      endDate,
      records: this.data.originalRecords
    });
    
    wx.showToast({
      title: '已重置筛选条件',
      icon: 'success'
    });
  },

  /**
   * 查看记录详情
   */
  viewRecordDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    
    // 跳转到账单详情页
    wx.navigateTo({
      url: `/pages/property/payment/detail/detail?id=${id}&isPaid=true`
    });
  },

  /**
   * 显示导出选项
   */
  exportRecords: function() {
    if (this.data.records.length === 0) {
      wx.showToast({
        title: '没有可导出的记录',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      showExportModal: true
    });
  },

  /**
   * 隐藏导出选项
   */
  hideExportModal: function() {
    this.setData({
      showExportModal: false
    });
  },

  /**
   * 导出为PDF
   */
  exportAsPDF: function() {
    wx.showLoading({
      title: '生成PDF中',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showModal({
        title: '导出成功',
        content: '缴费记录已导出为PDF格式，请在"我的-文件管理