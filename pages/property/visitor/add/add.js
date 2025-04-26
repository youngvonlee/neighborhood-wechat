// pages/property/visitor/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visitorForm: {
      name: '',
      phone: '',
      date: '',
      time: '',
      reason: '',
      relationship: '',
      carNumber: '',
      houseNumber: '',
      remark: ''
    },
    relationshipOptions: ['家人', '朋友', '同事', '快递员', '外卖员', '维修人员', '其他'],
    showRelationshipPicker: false,
    dateStart: '',
    timeStart: '08:00',
    dateEnd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 设置日期选择器的起始日期和结束日期
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    
    this.setData({
      dateStart: this.formatDate(today),
      dateEnd: this.formatDate(nextMonth),
      'visitorForm.date': this.formatDate(today)
    });
  },

  /**
   * 格式化日期为YYYY-MM-DD
   */
  formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    return `${year}-${this.formatNumber(month)}-${this.formatNumber(day)}`;
  },

  /**
   * 格式化数字，小于10前面补0
   */
  formatNumber(n) {
    return n < 10 ? `0${n}` : n;
  },

  /**
   * 输入访客姓名
   */
  inputVisitorName(e) {
    this.setData({
      'visitorForm.name': e.detail.value
    });
  },

  /**
   * 输入联系电话
   */
  inputVisitorPhone(e) {
    this.setData({
      'visitorForm.phone': e.detail.value
    });
  },

  /**
   * 选择日期
   */
  dateChange(e) {
    this.setData({
      'visitorForm.date': e.detail.value
    });
  },

  /**
   * 选择时间
   */
  timeChange(e) {
    this.setData({
      'visitorForm.time': e.detail.value
    });
  },

  /**
   * 输入访问事由
   */
  inputVisitorReason(e) {
    this.setData({
      'visitorForm.reason': e.detail.value
    });
  },

  /**
   * 显示关系选择器
   */
  showRelationshipSelector() {
    this.setData({
      showRelationshipPicker: true
    });
  },

  /**
   * 关系选择器取消
   */
  cancelRelationship() {
    this.setData({
      showRelationshipPicker: false
    });
  },

  /**
   * 选择关系
   */
  selectRelationship(e) {
    const index = e.currentTarget.dataset.index;
    const relationship = this.data.relationshipOptions[index];
    
    this.setData({
      'visitorForm.relationship': relationship,
      showRelationshipPicker: false
    });
  },

  /**
   * 输入车牌号
   */
  inputCarNumber(e) {
    this.setData({
      'visitorForm.carNumber': e.detail.value
    });
  },

  /**
   * 输入访问地点
   */
  inputHouseNumber(e) {
    this.setData({
      'visitorForm.houseNumber': e.detail.value
    });
  },

  /**
   * 输入备注
   */
  inputRemark(e) {
    this.setData({
      'visitorForm.remark': e.detail.value
    });
  },

  /**
   * 提交表单
   */
  submitForm() {
    const form = this.data.visitorForm;
    
    // 表单验证
    if (!form.name) {
      this.showError('请输入访客姓名');
      return;
    }
    
    if (!form.phone) {
      this.showError('请输入联系电话');
      return;
    }
    
    if (!form.date || !form.time) {
      this.showError('请选择到访时间');
      return;
    }
    
    if (!form.reason) {
      this.showError('请输入访问事由');
      return;
    }
    
    if (!form.houseNumber) {
      this.showError('请输入访问地点');
      return;
    }
    
    // 显示加载中
    wx.showLoading({
      title: '提交中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      wx.hideLoading();
      
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      });
      
      // 延迟返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 1500);
  },

  /**
   * 显示错误提示
   */
  showError(message) {
    wx.showToast({
      title: message,
      icon: 'none'
    });
  },

  /**
   * 取消并返回
   */
  cancelForm() {
    wx.navigateBack();
  }
})