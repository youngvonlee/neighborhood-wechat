// pages/property/notice/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: null,
    relatedNotices: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id;
    // 实际应用中应该从服务器获取数据
    // 这里模拟从服务器获取数据
    this.getNoticeDetail(id);
  },

  /**
   * 获取通知详情
   */
  getNoticeDetail(id) {
    // 模拟API请求
    const notices = [
      {
        id: '1',
        title: '小区电梯维修通知',
        brief: '因1号楼电梯需要进行例行维护，将于本周六上午9:00-12:00暂停使用，请各位业主提前安排出行。',
        time: '2023-04-22 10:30',
        type: 'maintenance',
        typeText: '维修',
        isRead: true,
        needConfirm: true,
        isConfirmed: false,
        content: '尊敬的业主：\n\n因1号楼电梯需要进行例行维护，将于本周六（4月25日）上午9:00-12:00暂停使用，请各位业主提前安排出行。\n\n维修期间，请尽量减少出入，如有紧急情况，请联系物业管理处：0123-4567890\n\n感谢您的理解与配合！\n\n阳光花园物业管理处\n2023年4月22日',
        attachments: [
          { name: '维修计划详情.pdf', type: 'pdf', size: '1.2MB', url: '/static/files/maintenance_plan.pdf' },
          { name: '电梯使用注意事项.pdf', type: 'pdf', size: '0.8MB', url: '/static/files/elevator_instructions.pdf' }
        ]
      },
      {
        id: '2',
        title: '2023年第二季度物业费缴纳通知',
        brief: '请各位业主于5月15日前完成2023年第二季度（4-6月）物业费的缴纳，感谢您的配合。',
        time: '2023-04-20 14:15',
        type: 'payment',
        typeText: '缴费',
        isRead: true,
        needConfirm: true,
        isConfirmed: true,
        confirmedTime: '2023-04-20 15:30',
        content: '尊敬的业主：\n\n请于2023年5月15日前完成2023年第二季度（4-6月）物业费的缴纳。\n\n缴费标准：\n住宅：2.5元/平方米/月\n商铺：4.5元/平方米/月\n\n缴费方式：\n1. 物业管理处现场缴纳\n2. 微信小程序在线缴纳\n3. 银行转账（详情请咨询物业）\n\n如有疑问，请联系物业客服：0123-4567890\n\n阳光花园物业管理处\n2023年4月20日',
        attachments: [
          { name: '缴费明细.pdf', type: 'pdf', size: '0.5MB', url: '/static/files/payment_details.pdf' }
        ]
      },
      {
        id: '3',
        title: '小区绿化养护公告',
        brief: '为提升小区环境，物业将于本月25-27日进行绿化带养护工作，期间可能会有噪音，请各位业主谅解。',
        time: '2023-04-18 09:45',
        type: 'notice',
        typeText: '公告',
        isRead: true,
        needConfirm: false,
        isConfirmed: false,
        content: '尊敬的业主：\n\n为提升小区环境，物业将于本月25-27日进行绿化带养护工作，包括修剪、施肥、病虫害防治等。期间可能会有噪音，请各位业主谅解。\n\n养护时间：4月25-27日，上午8:30-11:30，下午14:00-17:00\n\n如有特殊情况需要协调，请提前联系物业管理处。\n\n感谢您的理解与支持！\n\n阳光花园物业管理处\n2023年4月18日',
        attachments: [
          { name: '绿化区域示意图.jpg', type: 'image', size: '1.5MB', url: '/static/files/garden_map.jpg' }
        ]
      },
      {
        id: '4',
        title: '小区夏季亲子活动预告',
        brief: '阳光花园将于6月1日儿童节举办夏季亲子活动，包括游戏、表演、抽奖等环节，欢迎各位业主携孩子参加。',
        time: '2023-04-15 16:20',
        type: 'activity',
        typeText: '活动',
        isRead: true,
        needConfirm: true,
        isConfirmed: false,
        content: '尊敬的业主：\n\n阳光花园将于6月1日儿童节举办夏季亲子活动，诚邀您携孩子共同参与！\n\n活动时间：2023年6月1日 15:00-18:00\n活动地点：小区中央广场\n活动内容：\n1. 亲子游戏（气球大战、袋鼠跳等）\n2. 才艺表演（欢迎小朋友报名参加）\n3. 美食分享\n4. 幸运抽奖\n\n报名方式：\n请于5月25日前通过小程序报名或到物业服务中心登记\n\n期待您的参与！\n\n阳光花园物业管理处\n2023年4月15日',
        attachments: [
          { name: '活动海报.jpg', type: 'image', size: '2.0MB', url: '/static/files/activity_poster.jpg' },
          { name: '报名表.pdf', type: 'pdf', size: '0.3MB', url: '/static/files/registration_form.pdf' }
        ]
      }
    ];
    
    // 查找当前通知
    const notice = notices.find(item => item.id === id);
    
    if (notice) {
      // 查找相关通知（同类型的其他通知）
      const related = notices.filter(item => item.type === notice.type && item.id !== notice.id);
      
      this.setData({
        notice,
        relatedNotices: related
      });
    } else {
      wx.showToast({
        title: '通知不存在',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  /**
   * 确认通知
   */
  confirmNotice() {
    wx.showLoading({
      title: '确认中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      const notice = { ...this.data.notice };
      notice.isConfirmed = true;
      notice.confirmedTime = this.formatTime(new Date());
      
      this.setData({ notice });
      
      wx.hideLoading();
      wx.showToast({
        title: '确认成功',
        icon: 'success'
      });
    }, 1000);
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
   * 预览附件
   */
  previewAttachment(e) {
    const index = e.currentTarget.dataset.index;
    const attachment = this.data.notice.attachments[index];
    
    if (attachment.type === 'image') {
      wx.previewImage({
        current: attachment.url,
        urls: [attachment.url]
      });
    } else {
      // 对于PDF等文件，实际应用中应该下载或打开文件
      wx.showToast({
        title: '暂不支持预览该类型文件',
        icon: 'none'
      });
    }
  },

  /**
   * 联系物业
   */
  contactProperty() {
    wx.makePhoneCall({
      phoneNumber: '0123-4567890',
      success: () => {
        console.log('拨打电话成功');
      },
      fail: (err) => {
        console.error('拨打电话失败', err);
        wx.showToast({
          title: '拨打电话失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 分享通知
   */
  shareNotice() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  /**
   * 问题反馈
   */
  reportIssue() {
    wx.navigateTo({
      url: '/pages/property/feedback/feedback'
    });
  },

  /**
   * 查看相关通知
   */
  viewRelatedNotice(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/property/notice/detail/detail?id=${id}`
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: this.data.notice.title,
      path: `/pages/property/notice/detail/detail?id=${this.data.notice.id}`
    };
  }
})