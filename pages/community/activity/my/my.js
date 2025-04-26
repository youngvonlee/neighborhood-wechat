// pages/community/activity/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['已报名', '已参加', '已收藏'],
    currentTab: 0,
    activities: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchActivities();
  },

  /**
   * 切换标签页
   */
  switchTab: function(e) {
    const index = e.currentTarget.dataset.index;
    
    this.setData({
      currentTab: index
    });
    
    this.fetchActivities();
  },

  /**
   * 获取活动列表
   */
  fetchActivities: function() {
    this.setData({ loading: true });
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟活动数据
      let activities = [];
      
      if (this.data.currentTab === 0) { // 已报名
        activities = [
          {
            id: '2',
            title: '瑜伽健身课',
            image: '/static/images/activity-yoga.jpg',
            time: '2023-11-18 10:00-11:30',
            location: '小区健身中心',
            status: '报名中',
            category: 'sports',
            tags: ['瑜伽', '健身']
          },
          {
            id: '5',
            title: '中秋联欢晚会',
            image: '/static/images/activity-festival.jpg',
            time: '2023-09-29 19:00-21:30',
            location: '小区广场',
            status: '已结束',
            category: 'culture',
            tags: ['节日活动', '免费活动']
          }
        ];
      } else if (this.data.currentTab === 1) { // 已参加
        activities = [
          {
            id: '5',
            title: '中秋联欢晚会',
            image: '/static/images/activity-festival.jpg',
            time: '2023-09-29 19:00-21:30',
            location: '小区广场',
            status: '已结束',
            category: 'culture',
            tags: ['节日活动', '免费活动']
          }
        ];
      } else { // 已收藏
        activities = [
          {
            id: '1',
            title: '社区读书会',
            image: '/static/images/activity-reading.jpg',
            time: '2023-11-15 19:00-21:00',
            location: '小区会所二楼',
            status: '报名中',
            category: 'culture',
            tags: ['读书会', '免费活动']
          },
          {
            id: '3',
            title: '社区环保日',
            image: '/static/images/activity-environment.jpg',
            time: '2023-11-25 09:00-12:00',
            location: '小区中央公园',
            status: '报名中',
            category: 'charity',
            tags: ['环保', '公益', '免费活动']
          }
        ];
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
            // 从列表中移除该活动
            const activities = this.data.activities.filter(item => item.id !== id);
            
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
    
    // 获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        // 实际应用中应该将位置信息发送到服务器进行验证
        // 这里简化处理，直接显示签到成功
        wx.showLoading({
          title: '签到中',
        });
        
        setTimeout(() => {
          wx.hideLoading();
          wx.showToast({
            title: '签到成功',
            icon: 'success'
          });
        }, 1000);
      },
      fail: () => {
        wx.showToast({
          title: '获取位置失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 取消收藏
   */
  cancelFavorite: function(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '取消收藏',
      content: '确定要取消收藏该活动吗？',
      success: (res) => {
        if (res.confirm) {
          // 从列表中移除该活动
          const activities = this.data.activities.filter(item => item.id !== id);
          
          this.setData({
            activities
          });
          
          wx.showToast({
            title: '已取消收藏',
            icon: 'success'
          });
        }
      }
    });
  },

  /**
   * 添加日历提醒
   */
  addCalendarReminder: function(e) {
    const id = e.currentTarget.dataset.id;
    const activity = this.data.activities.find(item => item.id === id);
    
    wx.showLoading({
      title: '添加中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '已添加日历提醒',
        icon: 'success'
      });
      
      // 调用系统日历（实际应用中需要使用原生接口）
      wx.showModal({
        title: '提醒设置成功',
        content: `已为您设置活动「${activity.title}」的提醒，将在活动开始前2小时通知您`,
        showCancel: false
      });
    }, 1000);
  },

  /**
   * 分享活动
   */
  shareActivity: function(e) {
    const id = e.currentTarget.dataset.id;
    const activity = this.data.activities.find(item => item.id === id);
    
    // 调用微信分享接口
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    
    wx.showToast({
      title: '请点击右上角分享',
      icon: 'none'
    });
  },
  
  /**
   * 评价活动
   */
  rateActivity: function(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '活动评价',
      content: '请为本次活动打分（1-5星）',
      editable: true,
      placeholderText: '请输入您的评价内容',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '提交中',
          });
          
          // 模拟API请求
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '评价成功',
              icon: 'success'
            });
          }, 1000);
        }
      }
    });
  },
  
  /**
   * 报名活动
   */
  enrollActivity: function(e) {
    const id = e.currentTarget.dataset.id;
    const activity = this.data.activities.find(item => item.id === id);
    
    wx.showLoading({
      title: '报名中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      // 从收藏列表中移除该活动，并添加到已报名列表
      const activities = this.data.activities.filter(item => item.id !== id);
      
      this.setData({
        activities
      });
      
      wx.hideLoading();
      wx.showToast({
        title: '报名成功',
        icon: 'success'
      });
      
      // 切换到已报名标签
      this.setData({
        currentTab: 0
      });
      
      // 重新获取活动列表
      setTimeout(() => {
        this.fetchActivities();
      }, 500);
    }, 1000);
  },
  
  /**
   * 阻止事件冒泡
   */
  stopPropagation: function(e) {
    // 阻止事件冒泡
    return false;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.fetchActivities();
    wx.stopPullDownRefresh();
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      const id = res.target.dataset.id;
      const activity = this.data.activities.find(item => item.id === id) || {};
      
      return {
        title: activity.title || '社区活动分享',
        path: `/pages/community/activity/detail/detail?id=${id}`,
        imageUrl: activity.image
      };
    }
    
    return {
      title: '社区活动',
      path: '/pages/community/activity/activity'
    };
  }
})