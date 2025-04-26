// pages/property/payment/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'unpaid',
    bills: [
      {
        id: '1',
        type: '物业费',
        period: '2023年4-6月',
        amount: '450.00',
        dueDate: '2023-06-30',
        status: '未缴费',
        building: '1号楼',
        room: '1单元101'
      },
      {
        id: '2',
        type: '水费',
        period: '2023年5月',
        amount: '85.50',
        dueDate: '2023-06-15',
        status: '未缴费',
        building: '1号楼',
        room: '1单元101'
      },
      {
        id: '3',
        type: '电费',
        period: '2023年5月',
        amount: '132.75',
        dueDate: '2023-06-15',
        status: '未缴费',
        building: '1号楼',
        room: '1单元101'
      }
    ],
    paidBills: [
      {
        id: '4',
        type: '物业费',
        period: '2023年1-3月',
        amount: '450.00',
        paidDate: '2023-03-25',
        status: '已缴费',
        building: '1号楼',
        room: '1单元101'
      },
      {
        id: '5',
        type: '水费',
        period: '2023年4月',
        amount: '78.20',
        paidDate: '2023-05-10',
        status: '已缴费',
        building: '1号楼',
        room: '1单元101'
      },
      {
        id: '6',
        type: '电费',
        period: '2023年4月',
        amount: '145.60',
        paidDate: '2023-05-10',
        status: '已缴费',
        building: '1号楼',
        room: '1单元101'
      }
    ],
    totalUnpaid: '668.25'
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
   * 支付账单
   */
  payBill(e) {
    const id = e.currentTarget.dataset.id;
    const bill = this.data.bills.find(item => item.id === id);
    
    wx.showModal({
      title: '确认支付',
      content: `确定支付${bill.type} ${bill.amount}元吗？`,
      success: (res) => {
        if (res.confirm) {
          // 实际应用中这里会调用支付接口
          wx.showLoading({
            title: '支付处理中',
          });
          
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '支付成功',
              icon: 'success'
            });
            
            // 更新账单状态
            const bills = this.data.bills.filter(item => item.id !== id);
            const paidBill = {...bill, status: '已缴费', paidDate: this.formatDate(new Date())};
            const paidBills = [paidBill, ...this.data.paidBills];
            
            // 重新计算未缴总额
            const totalUnpaid = bills.reduce((sum, item) => {
              return (parseFloat(sum) + parseFloat(item.amount)).toFixed(2);
            }, 0);
            
            this.setData({
              bills,
              paidBills,
              totalUnpaid
            });
          }, 1500);
        }
      }
    });
  },

  /**
   * 批量支付
   */
  payAll() {
    if (this.data.bills.length === 0) {
      wx.showToast({
        title: '没有待缴费账单',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '批量支付',
      content: `确定支付所有账单，共${this.data.totalUnpaid}元吗？`,
      success: (res) => {
        if (res.confirm) {
          // 实际应用中这里会调用支付接口
          wx.showLoading({
            title: '支付处理中',
          });
          
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '支付成功',
              icon: 'success'
            });
            
            // 更新账单状态
            const currentDate = this.formatDate(new Date());
            const paidBills = [...this.data.bills.map(bill => {
              return {...bill, status: '已缴费', paidDate: currentDate};
            }), ...this.data.paidBills];
            
            this.setData({
              bills: [],
              paidBills,
              totalUnpaid: '0.00'
            });
          }, 1500);
        }
      }
    });
  },

  /**
   * 查看账单详情
   */
  viewBillDetail(e) {
    const id = e.currentTarget.dataset.id;
    const isPaid = e.currentTarget.dataset.paid === 'true';
    
    // 跳转到账单详情页
    wx.navigateTo({
      url: `/pages/property/payment/detail/detail?id=${id}&isPaid=${isPaid}`
    });
  },
  
  /**
   * 刷新账单列表（从详情页返回时调用）
   */
  refreshBills(paidBillId) {
    if (!paidBillId) return;
    
    // 找到已支付的账单并从未支付列表移除，添加到已支付列表
    const bill = this.data.bills.find(item => item.id === paidBillId);
    if (bill) {
      const bills = this.data.bills.filter(item => item.id !== paidBillId);
      const paidBill = {...bill, status: '已缴费', paidDate: this.formatDate(new Date())};
      const paidBills = [paidBill, ...this.data.paidBills];
      
      // 重新计算未缴总额
      const totalUnpaid = bills.reduce((sum, item) => {
        return (parseFloat(sum) + parseFloat(item.amount)).toFixed(2);
      }, 0);
      
      this.setData({
        bills,
        paidBills,
        totalUnpaid: totalUnpaid || '0.00'
      });
    }
  },

  /**
   * 格式化日期
   */
  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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