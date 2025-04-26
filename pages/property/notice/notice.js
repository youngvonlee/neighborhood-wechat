// pages/property/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notices: [
      {
        id: '1',
        title: '小区电梯维修通知',
        brief: '因1号楼电梯需要进行例行维护，将于本周六上午9:00-12:00暂停使用，请各位业主提前安排出行。',
        time: '2023-04-22 10:30',
        type: 'maintenance',
        typeText: '维修',
        isRead: false,
        needConfirm: true,
        isConfirmed: false,
        content: '尊敬的业主：\n\n因1号楼电梯需要进行例行维护，将于本周六（4月25日）上午9:00-12:00暂停使用，请各位业主提前安排出行。\n\n维修期间，请尽量减少出入，如有紧急情况，请联系物业管理处：0123-4567890\n\n感谢您的理解与配合！\n\n阳光花园物业管理处\n2023年4月22日'
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
        content: '尊敬的业主：\n\n请于2023年5月15日前完成2023年第二季度（4-6月）物业费的缴纳。\n\n缴费标准：\n住宅：2.5元/平方米/月\n商铺：4.5元/平方米/月\n\n缴费方式：\n1. 物业管理处现场缴纳\n2. 微信小程序在线缴纳\n3. 银行转账（详情请咨询物业）\n\n如有疑问，请联系物业客服：0123-4567890\n\n阳光花园物业管理处\n2023年4月20日'
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
        content: '尊敬的业主：\n\n为提升小区环境，物业将于本月25-27日进行绿化带养护工作，包括修剪、施肥、病虫害防治等。期间可能会有噪音，请各位业主谅解。\n\n养护时间：4月25-27日，上午8:30-11:30，下午14:00-17:00\n\n如有特殊情况需要协调，请提前联系物业管理处。\n\n感谢您的理解与支持！\n\n阳光花园物业管理处\n2023年4月18日'
      },
      {
        id: '4',
        title: '小区夏季亲子活动预告',
        brief: '阳光花园将于6月1日儿童节举办夏季亲子活动，包括游戏、表演、抽奖等环节，欢迎各位业主携孩子参加。',
        time: '2023-04-15 16:20',
        type: 'activity',
        typeText: '活动',
        isRead: false,
        needConfirm: true,
        isConfirmed: false,
        content: '尊敬的业主：\n\n阳光花园将于6月1日儿童节举办夏季亲子活动，诚邀您携孩子共同参与！\n\n活动时间：2023年6月1日 15:00-18:00\n活动地点：小区中央广场\n活动内容：\n1. 亲子游戏（气球大战、袋鼠跳等）\n2. 才艺表演（欢迎小朋友报名参加）\n3. 美食分享\n4. 幸运抽奖\n\n报名方式：\n请于5月25日前通过小程序报名或到物业服务中心登记\n\n期待您的参与！\n\n阳光花园物业管理处\n2023年4月15日'
      }
    ],
    filteredNotices: [],
    showFilter: false,
    selectedType: 'all',
    readStatus: 'all',
    timeRange: 'all'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化筛选后的通知列表
    this.setData({
      filteredNotices: this.data.notices
    });
  },

  /**
   * 查看通知详情
   */
  viewNoticeDetail(e) {
    const id = e.currentTarget.dataset.id;
    // 标记为已读
    const notices = this.data.notices.map(item => {
      if (item.id === id && !item.isRead) {
        return { ...item, isRead: true };
      }
      return item;
    });
    
    this.setData({ notices });
    
    // 跳转到详情页
    wx.navigateTo({
      url: `/pages/property/notice/detail/detail?id=${id}`
    });
  },

  /**
   * 显示筛选选项
   */
  showFilterOptions() {
    this.setData({
      showFilter: true
    });
  },

  /**
   * 隐藏筛选选项
   */
  hideFilterOptions() {
    this.setData({
      showFilter: false
    });
  },

  /**
   * 选择通知类型
   */
  selectType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectedType: type
    });
  },

  /**
   * 选择阅读状态
   */
  selectReadStatus(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      readStatus: status
    });
  },

  /**
   * 选择时间范围
   */
  selectTimeRange(e) {
    const range = e.currentTarget.dataset.range;
    this.setData({
      timeRange: range
    });
  },

  /**
   * 重置筛选条件
   */
  resetFilter() {
    this.setData({
      selectedType: 'all',
      readStatus: 'all',
      timeRange: 'all'
    });
  },

  /**
   * 应用筛选条件
   */
  applyFilter() {
    const { notices, selectedType, readStatus, timeRange } = this.data;
    
    // 筛选通知
    let filteredNotices = [...notices];
    
    // 按类型筛选
    if (selectedType !== 'all') {
      filteredNotices = filteredNotices.filter(item => item.type === selectedType);
    }
    
    // 按阅读状态筛选
    if (readStatus !== 'all') {
      const isRead = readStatus === 'read';
      filteredNotices = filteredNotices.filter(item => item.isRead === isRead);
    }
    
    // 按时间范围筛选
    if (timeRange !== 'all') {
      const now = new Date();
      let startDate;
      
      if (timeRange === 'week') {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (timeRange === 'month') {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      } else if (timeRange === 'quarter') {
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      }
      
      filteredNotices = filteredNotices.filter(item => {
        const noticeDate = new Date(item.time.replace(/-/g, '/'));
        return noticeDate >= startDate;
      });
    }
    
    this.setData({
      filteredNotices,
      showFilter: false
    });
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
    // 模拟刷新数据
    setTimeout(() => {
      this.applyFilter();
      wx.stopPullDownRefresh();
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 可以在这里实现加载更多通知
  }
})