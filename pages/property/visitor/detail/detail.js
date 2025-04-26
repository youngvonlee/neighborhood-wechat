// pages/property/visitor/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visitor: null,
    qrCodeVisible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id;
    // 实际应用中应该从服务器获取数据
    // 这里模拟从服务器获取数据
    this.getVisitorDetail(id);
  },

  /**
   * 获取访客详情
   */
  getVisitorDetail(id) {
    // 模拟API请求
    const visitors = [
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
        qrCode: '/static/images/qrcode_sample.png',
        visitorPhoto: '/static/images/avatar_sample.png',
        approvedBy: '李物业',
        approvedTime: '2023-04-30 10:15',
        securityCheckIn: '2023-05-01 14:05',
        securityCheckOut: '2023-05-01 15:58'
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
        qrCode: '/static/images/qrcode_sample.png',
        visitorPhoto: '/static/images/avatar_sample.png',
        approvedBy: '王物业',
        approvedTime: '2023-05-04 16:30',
        securityCheckIn: '2023-05-05 10:03',
        securityCheckOut: '2023-05-05 11:25'
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
        qrCode: '/static/images/qrcode_sample.png',
        visitorPhoto: '/static/images/avatar_sample.png',
        approvedBy: '赵物业',
        approvedTime: '2023-05-09 09:45',
        securityCheckIn: '',
        securityCheckOut: ''
      }
    ];
    
    // 查找当前访客
    const visitor = visitors.find(item => item.id === id);
    
    if (visitor) {
      this.setData({ visitor });
    } else {
      wx.showToast({
        title: '访客信息不存在',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  /**
   * 显示二维码
   */
  showQRCode() {
    this.setData({
      qrCodeVisible: true
    });
  },

  /**
   * 隐藏二维码
   */
  hideQRCode() {
    this.setData({
      qrCodeVisible: false
    });
  },

  /**
   * 保存二维码到相册
   */
  saveQRCode() {
    const qrCodeUrl = this.data.visitor.qrCode;
    wx.showLoading({
      title: '保存中',
    });
    
    wx.downloadFile({
      url: qrCodeUrl,
      success: (res) => {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              wx.hideLoading();
              wx.showToast({
                title: '保存成功',
                icon: 'success'
              });
            },
            fail: (err) => {
              wx.hideLoading();
              console.error('保存失败', err);
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              });
            }
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '下载失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('下载失败', err);
        wx.showToast({
          title: '下载失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 拨打访客电话
   */
  callVisitor() {
    const phone = this.data.visitor.phone;
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
   * 编辑访客信息
   */
  editVisitor() {
    const id = this.data.visitor.id;
    wx.navigateTo({
      url: `/pages/property/visitor/edit/edit?id=${id}`
    });
  },

  /**
   * 取消访客预约
   */
  cancelVisitor() {
    const visitor = this.data.visitor;
    
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
            const updatedVisitor = { ...visitor, status: 'cancelled', statusText: '已取消' };
            
            this.setData({ visitor: updatedVisitor });
            
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
   * 延长访问时间
   */
  extendVisitTime() {
    wx.showActionSheet({
      itemList: ['延长1小时', '延长2小时', '延长3小时'],
      success: (res) => {
        const hours = res.tapIndex + 1;
        
        wx.showLoading({
          title: '处理中',
        });
        
        // 模拟API请求
        setTimeout(() => {
          const visitor = { ...this.data.visitor };
          // 解析原来的离开时间
          const originalLeaveTime = new Date(visitor.leaveTime.replace(/-/g, '/'));
          // 增加小时数
          originalLeaveTime.setHours(originalLeaveTime.getHours() + hours);
          // 格式化新的离开时间
          const newLeaveTime = this.formatTime(originalLeaveTime);
          
          visitor.leaveTime = newLeaveTime;
          
          this.setData({ visitor });
          
          wx.hideLoading();
          wx.showToast({
            title: '延长成功',
            icon: 'success'
          });
        }, 1000);
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
    
    return `${year}-${this.formatNumber(month)}-${this.formatNumber(day)} ${this.formatNumber(hour)}:${this.formatNumber(minute)}`;
  },

  formatNumber(n) {
    return n < 10 ? `0${n}` : n;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    const visitor = this.data.visitor;
    return {
      title: `${visitor.name}的访客通行证`,
      path: `/pages/property/visitor/detail/detail?id=${visitor.id}&share=true`,
      imageUrl: visitor.qrCode
    };
  }
})