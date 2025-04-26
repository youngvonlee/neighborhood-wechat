// pages/property/payment/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bill: {},
    billDetails: [],
    showShareMenu: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实际应用中应该通过API获取账单详情
    // 这里模拟从上一页传递的账单ID获取详情
    const billId = options.id;
    const isPaid = options.isPaid === 'true';
    
    // 模拟获取账单数据
    this.getBillDetail(billId, isPaid);
  },

  /**
   * 获取账单详情
   */
  getBillDetail: function(id, isPaid) {
    // 模拟API请求
    wx.showLoading({
      title: '加载中',
    });
    
    setTimeout(() => {
      // 模拟数据
      let bill;
      if (isPaid) {
        bill = {
          id: id,
          type: '物业费',
          period: '2023年1-3月',
          amount: '450.00',
          paidDate: '2023-03-25',
          status: '已缴费',
          building: '1号楼',
          room: '1单元101',
          payMethod: '微信支付',
          transactionId: '2023' + id + '88776655',
          remarks: '按时缴费，谢谢配合'
        };
      } else {
        bill = {
          id: id,
          type: id === '1' ? '物业费' : (id === '2' ? '水费' : '电费'),
          period: id === '1' ? '2023年4-6月' : '2023年5月',
          amount: id === '1' ? '450.00' : (id === '2' ? '85.50' : '132.75'),
          dueDate: id === '1' ? '2023-06-30' : '2023-06-15',
          status: '未缴费',
          building: '1号楼',
          room: '1单元101',
          remarks: '请按时缴费，谢谢配合'
        };
      }
      
      // 生成费用明细
      let billDetails = [];
      if (bill.type === '物业费') {
        billDetails = [
          { name: '基础物业服务费', value: '400.00' },
          { name: '公共设施维护费', value: '50.00' }
        ];
      } else if (bill.type === '水费') {
        billDetails = [
          { name: '用水量', value: '17.1吨' },
          { name: '单价', value: '5.00元/吨' }
        ];
      } else if (bill.type === '电费') {
        billDetails = [
          { name: '用电量', value: '88.5度' },
          { name: '单价', value: '1.50元/度' }
        ];
      }
      
      this.setData({
        bill,
        billDetails
      });
      
      wx.hideLoading();
    }, 1000);
  },

  /**
   * 支付账单
   */
  payBill: function() {
    wx.showModal({
      title: '确认支付',
      content: `确定支付${this.data.bill.type} ${this.data.bill.amount}元吗？`,
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
            const bill = this.data.bill;
            bill.status = '已缴费';
            bill.paidDate = this.formatDate(new Date());
            bill.payMethod = '微信支付';
            bill.transactionId = '2023' + bill.id + '88776655';
            
            this.setData({
              bill
            });
            
            // 返回上一页并刷新
            setTimeout(() => {
              const pages = getCurrentPages();
              const prevPage = pages[pages.length - 2];
              prevPage.refreshBills && prevPage.refreshBills(bill.id);
              wx.navigateBack();
            }, 1500);
          }, 1500);
        }
      }
    });
  },

  /**
   * 下载电子收据
   */
  downloadReceipt: function() {
    wx.showLoading({
      title: '生成收据中',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        showShareMenu: true
      });
      wx.showToast({
        title: '收据已生成',
        icon: 'success'
      });
    }, 1500);
  },

  /**
   * 报告问题
   */
  reportIssue: function() {
    wx.showModal({
      title: '联系物业',
      content: '您可以拨打物业服务热线：400-123-4567，或前往物业服务中心咨询。',
      showCancel: false
    });
  },

  /**
   * 联系物业
   */
  contactProperty: function() {
    wx.showActionSheet({
      itemList: ['拨打物业电话', '在线客服', '前往物业服务中心'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.makePhoneCall({
            phoneNumber: '400-123-4567'
          });
        } else if (res.tapIndex === 1) {
          wx.showToast({
            title: '正在连接客服...',
            icon: 'loading',
            duration: 2000
          });
        }
      }
    });
  },

  /**
   * 格式化日期
   */
  formatDate: function(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '物业费电子收据',
      path: '/pages/property/payment/detail/detail?id=' + this.data.bill.id + '&isPaid=true'
    }
  }
})