// pages/community/activity/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityId: '',
    activity: null,
    rating: 0,
    comment: '',
    loading: true,
    submitting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const activityId = options.id;
    if (!activityId) {
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
      return;
    }
    
    this.setData({ activityId });
    this.fetchActivityDetail();
  },

  /**
   * 获取活动详情
   */
  fetchActivityDetail: function() {
    this.setData({ loading: true });
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟活动数据
      const activity = {
        id: '5',
        title: '中秋联欢晚会',
        image: '/static/images/activity-festival.jpg',
        time: '2023-09-29 19:00-21:30',
        location: '小区广场',
        status: '已结束',
        category: 'culture',
        tags: ['节日活动', '免费活动'],
        organizer: '小区居委会',
        description: '中秋佳节，共赏明月。小区居委会组织的联欢晚会，有文艺表演、猜灯谜、品月饼等活动，欢迎各位居民参加。',
        participants: 120,
        maxParticipants: 150,
        myStatus: 'participated' // 已参加
      };
      
      this.setData({
        activity,
        loading: false
      });
    }, 1000);
  },

  /**
   * 设置评分
   */
  setRating: function(e) {
    const rating = e.currentTarget.dataset.rating;
    this.setData({ rating });
  },

  /**
   * 输入评价内容
   */
  inputComment: function(e) {
    this.setData({
      comment: e.detail.value
    });
  },

  /**
   * 提交评价
   */
  submitFeedback: function() {
    const { activityId, rating, comment } = this.data;
    
    if (rating === 0) {
      wx.showToast({
        title: '请先进行评分',
        icon: 'none'
      });
      return;
    }
    
    this.setData({ submitting: true });
    
    // 模拟API请求
    setTimeout(() => {
      this.setData({ submitting: false });
      
      wx.showToast({
        title: '评价成功',
        icon: 'success'
      });
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 1000);
  },

  /**
   * 取消评价
   */
  cancelFeedback: function() {
    wx.navigateBack();
  }
})