// pages/community/activity/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: ['全部', '文化活动', '体育健身', '公益活动', '亲子活动'],
    currentCategory: 0,
    activeCategory: 'all',
    categoryNames: {
      'all': '全部',
      'culture': '文化活动',
      'sports': '体育健身',
      'charity': '公益活动',
      'family': '亲子活动'
    },
    activities: [],
    isAdmin: false,
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchActivities();
    
    // 检查用户是否为管理员
    this.checkAdminStatus();
  },

  /**
   * 切换活动分类
   */
  switchCategory: function(e) {
    const index = e.currentTarget.dataset.index;
    const category = e.currentTarget.dataset.category || 'all';
    
    this.setData({
      currentCategory: index,
      activeCategory: category
    });
    
    this.fetchActivities(category);
  },

  /**
   * 获取活动列表
   */
  fetchActivities: function(category = 'all') {
    this.setData({ loading: true });
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟活动数据
      const allActivities = [
        {
          id: '1',
          title: '社区读书会',
          image: '/static/images/activity-reading.jpg',
          time: '2023-11-15 19:00-21:00',
          location: '小区会所二楼',
          status: '报名中',
          participantsCount: 12,
          maxParticipants: 20,
          fee: 0,
          description: '本期读书会主题：《人类简史》，欢迎社区居民参与讨论交流。',
          category: 'culture',
          tags: ['读书会', '免费活动'],
          isEnrolled: false
        },
        {
          id: '2',
          title: '瑜伽健身课',
          image: '/static/images/activity-yoga.jpg',
          time: '2023-11-18 10:00-11:30',
          location: '小区健身中心',
          status: '报名中',
          participantsCount: 8,
          maxParticipants: 15,
          fee: 30,
          description: '专业瑜伽老师指导，适合初学者和有经验的瑜伽爱好者。',
          category: 'sports',
          tags: ['瑜伽', '健身'],
          isEnrolled: true
        },
        {
          id: '3',
          title: '社区环保日',
          image: '/static/images/activity-environment.jpg',
          time: '2023-11-25 09:00-12:00',
          location: '小区中央公园',
          status: '报名中',
          participantsCount: 25,
          maxParticipants: 50,
          fee: 0,
          description: '一起参与社区环境清洁，增强环保意识，建设美丽家园。',
          category: 'charity',
          tags: ['环保', '公益', '免费活动'],
          isEnrolled: false
        },
        {
          id: '4',
          title: '儿童绘画比赛',
          image: '/static/images/activity-painting.jpg',
          time: '2023-11-19 14:00-16:00',
          location: '小区儿童活动中心',
          status: '报名中',
          participantsCount: 15,
          maxParticipants: 30,
          fee: 10,
          description: '主题：美丽的家园。欢迎3-12岁儿童参与，将提供绘画材料。',
          category: 'family',
          tags: ['儿童', '绘画', '比赛'],
          isEnrolled: false
        },
        {
          id: '5',
          title: '中秋联欢晚会',
          image: '/static/images/activity-festival.jpg',
          time: '2023-09-29 19:00-21:30',
          location: '小区广场',
          status: '已结束',
          participantsCount: 120,
          maxParticipants: 150,
          fee: 0,
          description: '庆祝中秋佳节，社区居民共聚一堂，共度美好时光。',
          category: 'culture',
          tags: ['节日活动', '免费活动'],
          isEnrolled: true
        }
      ];
      
      // 根据分类筛选活动
      let activities = allActivities;
      if (category !== 'all') {
        activities = allActivities.filter(item => item.category === category);
      }
      
      this.setData({
        activities,
        loading: false
      });
    }, 1000);
  },

  /**
   * 查看活动详情
   */
  viewActivityDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/community/activity/detail/detail?id=${id}`
    });
  },

  /**
   * 报名活动
   */
  enrollActivity: function(e) {
    const id = e.currentTarget.dataset.id;
    const activity = this.data.activities.find(item => item.id === id);
    
    if (activity.fee > 0) {
      wx.showModal({
        title: '活动报名',
        content: `该活动需支付${activity.fee}元费用，是否继续报名？`,
        success: (res) => {
          if (res.confirm) {
            this.processEnrollment(id);
          }
        }
      });
    } else {
      this.processEnrollment(id);
    }
  },

  /**
   * 处理报名流程
   */
  processEnrollment: function(id) {
    wx.showLoading({
      title: '报名中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      // 更新活动状态
      const activities = this.data.activities.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isEnrolled: true,
            participantsCount: item.participantsCount + 1
          };
        }
        return item;
      });
      
      this.setData({
        activities
      });
      
      wx.hideLoading();
      wx.showToast({
        title: '报名成功',
        icon: 'success'
      });
    }, 1500);
  },

  /**
   * 取消报名
   */
  cancelEnroll: function(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '取消报名',
      content: '确定要取消报名该活动吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
          });
          
          // 模拟API请求
          setTimeout(() => {
            // 更新活动状态
            const activities = this.data.activities.map(item => {
              if (item.id === id) {
                return {
                  ...item,
                  isEnrolled: false,
                  participantsCount: Math.max(0, item.participantsCount - 1)
                };
              }
              return item;
            });
            
            this.setData({
              activities
            });
            
            wx.hideLoading();
            wx.showToast({
              title: '已取消报名',
              icon: 'success'
            });
          }, 1500);
        }
      }
    });
  },

  /**
   * 活动签到
   */
  checkInActivity: function(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showLoading({
      title: '签到中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '签到成功',
        icon: 'success'
      });
    }, 1000);
  },

  /**
   * 查看我的活动
   */
  viewMyActivities: function() {
    wx.navigateTo({
      url: '/pages/community/activity/my/my'
    });
  },

  /**
   * 发布活动
   */
  publishActivity: function() {
    wx.navigateTo({
      url: '/pages/community/activity/publish/publish'
    });
  },

  /**
   * 检查用户是否为管理员
   */
  checkAdminStatus: function() {
    // 模拟检查用户权限
    // 实际应用中应该从服务器获取用户权限信息
    setTimeout(() => {
      this.setData({
        isAdmin: true // 为了演示，这里默认设置为管理员
      });
    }, 500);
  },

  /**
   * 发布新活动
   */
  publishActivity: function() {
    wx.navigateTo({
      url: '/pages/community/activity/publish/publish'
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.fetchActivities(this.data.activeCategory);
    wx.stopPullDownRefresh();
  }
})