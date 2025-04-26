// pages/community/activity/notification/notification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notifications: [],
    loading: true,
    tabs: ['全部', '活动通知', '物业通知', '待处理'],
    currentTab: 0,
    notificationTypes: {
      // 活动通知类型
      'activity_reminder': '活动提醒',
      'activity_update': '活动更新',
      'activity_cancel': '活动取消',
      'activity_start': '活动开始',
      'activity_checkin': '签到提醒',
      'activity_feedback': '评价提醒',
      // 物业通知类型
      'property_notice': '物业公告',
      'property_maintenance': '维修通知',
      'property_payment': '缴费提醒',
      'property_delivery': '包裹通知',
      'property_visitor': '访客通知'
    },
    // 社区日历数据
    communityCalendar: [],
    // 活动评分数据
    activityRatings: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchNotifications();
    this.fetchCommunityCalendar();
    this.fetchActivityRatings();
  },

  /**
   * 切换标签页
   */
  switchTab: function(e) {
    const index = e.currentTarget.dataset.index;
    
    this.setData({
      currentTab: index
    });
    
    this.fetchNotifications();
  },

  /**
   * 获取通知列表
   */
  fetchNotifications: function() {
    this.setData({ loading: true });
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟通知数据
      let notifications = [
        {
          id: '1',
          type: 'activity_reminder',
          title: '活动即将开始',
          content: '您报名的「瑜伽健身课」将于明天上午10:00开始，请准时参加。',
          activityId: '2',
          time: '2023-11-17 10:00',
          isRead: false,
          createTime: '2023-11-16 10:00',
          category: 'activity'
        },
        {
          id: '2',
          type: 'activity_update',
          title: '活动信息更新',
          content: '您报名的「社区环保日」活动地点已更新为「小区中央公园南门」，请知悉。',
          activityId: '3',
          time: '2023-11-25 09:00',
          isRead: true,
          createTime: '2023-11-15 14:30',
          category: 'activity'
        },
        {
          id: '3',
          type: 'activity_feedback',
          title: '活动评价提醒',
          content: '您参加的「中秋联欢晚会」已结束，欢迎您对活动进行评价。',
          activityId: '5',
          time: '2023-09-29 19:00',
          isRead: false,
          createTime: '2023-09-30 09:00',
          category: 'activity',
          needAction: true
        },
        {
          id: '4',
          type: 'activity_checkin',
          title: '活动签到提醒',
          content: '您报名的「瑜伽健身课」已开始，请尽快前往活动地点签到。',
          activityId: '2',
          time: '2023-11-18 10:00',
          isRead: true,
          createTime: '2023-11-18 09:50',
          category: 'activity'
        },
        {
          id: '5',
          type: 'activity_cancel',
          title: '活动已取消',
          content: '很抱歉，您报名的「儿童绘画比赛」因故取消，相关费用将原路退回。',
          activityId: '4',
          time: '2023-11-19 14:00',
          isRead: false,
          createTime: '2023-11-16 18:00',
          category: 'activity'
        },
        {
          id: '6',
          type: 'property_notice',
          title: '小区绿化养护公告',
          content: '为提升小区环境，物业将于本月25-27日进行绿化带养护工作，期间可能会有噪音，请各位业主谅解。',
          propertyNoticeId: '3',
          time: '2023-04-18 09:45',
          isRead: true,
          createTime: '2023-04-18 09:45',
          category: 'property'
        },
        {
          id: '7',
          type: 'property_maintenance',
          title: '小区电梯维修通知',
          content: '因1号楼电梯需要进行例行维护，将于本周六上午9:00-12:00暂停使用，请各位业主提前安排出行。',
          propertyNoticeId: '1',
          time: '2023-04-22 10:30',
          isRead: false,
          createTime: '2023-04-22 10:30',
          category: 'property'
        },
        {
          id: '8',
          type: 'property_payment',
          title: '2023年第二季度物业费缴纳通知',
          content: '请各位业主于5月15日前完成2023年第二季度（4-6月）物业费的缴纳，感谢您的配合。',
          propertyNoticeId: '2',
          time: '2023-04-20 14:15',
          isRead: false,
          createTime: '2023-04-20 14:15',
          category: 'property',
          needAction: true
        },
        {
          id: '9',
          type: 'property_delivery',
          title: '您有一个包裹已送达',
          content: '您的包裹已送达小区快递柜，取件码：8888，请及时取件。',
          deliveryId: '1001',
          time: '2023-11-20 15:30',
          isRead: false,
          createTime: '2023-11-20 15:30',
          category: 'property'
        },
        {
          id: '10',
          type: 'property_visitor',
          title: '访客到访通知',
          content: '您有访客「张先生」正在等待您的确认，请及时处理。',
          visitorId: '2001',
          time: '2023-11-21 10:00',
          isRead: false,
          createTime: '2023-11-21 10:00',
          category: 'property',
          needAction: true
        }
      ];
      
      // 根据当前标签筛选通知
      if (this.data.currentTab === 1) { // 活动通知
        notifications = notifications.filter(item => item.category === 'activity');
      } else if (this.data.currentTab === 2) { // 物业通知
        notifications = notifications.filter(item => item.category === 'property');
      } else if (this.data.currentTab === 3) { // 待处理
        notifications = notifications.filter(item => item.needAction === true);
      }
      
      this.setData({
        notifications,
        loading: false
      });
    }, 1000);
  },

  /**
   * 查看通知详情
   */
  viewNotificationDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    const notification = this.data.notifications.find(item => item.id === id);
    
    if (!notification) return;
    
    // 标记为已读
    if (!notification.isRead) {
      this.markAsRead(id);
    }
    
    // 根据通知类型和ID跳转到相应页面
    if (notification.category === 'activity' && notification.activityId) {
      // 活动通知跳转到活动详情
      wx.navigateTo({
        url: `/pages/community/activity/detail/detail?id=${notification.activityId}`
      });
    } else if (notification.category === 'property' && notification.propertyNoticeId) {
      // 物业通知跳转到物业通知详情
      wx.navigateTo({
        url: `/pages/property/notice/detail/detail?id=${notification.propertyNoticeId}`
      });
    } else if (notification.type === 'property_delivery' && notification.deliveryId) {
      // 包裹通知跳转到包裹详情
      wx.navigateTo({
        url: `/pages/property/delivery/detail?id=${notification.deliveryId}`
      });
    } else if (notification.type === 'property_visitor' && notification.visitorId) {
      // 访客通知跳转到访客确认页面
      wx.navigateTo({
        url: `/pages/property/visitor/confirm?id=${notification.visitorId}`
      });
    } else if (notification.type === 'activity_feedback' && notification.activityId) {
      // 活动评价提醒跳转到评价页面
      wx.navigateTo({
        url: `/pages/community/activity/feedback/feedback?id=${notification.activityId}`
      });
    }
  },

  /**
   * 标记通知为已读
   */
  markAsRead: function(id) {
    // 模拟API请求
    const notifications = this.data.notifications.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isRead: true
        };
      }
      return item;
    });
    
    this.setData({
      notifications
    });
  },

  /**
   * 标记所有通知为已读
   */
  markAllAsRead: function() {
    // 检查是否有未读通知
    const hasUnread = this.data.notifications.some(item => !item.isRead);
    
    if (!hasUnread) {
      wx.showToast({
        title: '没有未读通知',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '处理中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      const notifications = this.data.notifications.map(item => ({
        ...item,
        isRead: true
      }));
      
      this.setData({
        notifications
      });
      
      wx.hideLoading();
      wx.showToast({
        title: '已全部标为已读',
        icon: 'success'
      });
    }, 1000);
  },

  /**
   * 删除通知
   */
  deleteNotification: function(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '删除通知',
      content: '确定要删除这条通知吗？',
      success: (res) => {
        if (res.confirm) {
          // 模拟API请求
          const notifications = this.data.notifications.filter(item => item.id !== id);
          
          this.setData({
            notifications
          });
          
          wx.showToast({
            title: '已删除',
            icon: 'success'
          });
        }
      }
    });
  },

  /**
   * 清空所有通知
   */
  clearAllNotifications: function() {
    if (this.data.notifications.length === 0) {
      wx.showToast({
        title: '没有可清空的通知',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '清空通知',
      content: '确定要清空所有通知吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
          });
          
          // 模拟API请求
          setTimeout(() => {
            this.setData({
              notifications: []
            });
            
            wx.hideLoading();
            wx.showToast({
              title: '已清空所有通知',
              icon: 'success'
            });
          }, 1000);
        }
      }
    });
  },

  /**
   * 设置通知提醒方式
   */
  setNotificationSettings: function() {
    wx.showActionSheet({
      itemList: ['接收所有通知', '只接收重要通知', '关闭通知'],
      success: (res) => {
        let message = '';
        switch (res.tapIndex) {
          case 0:
            message = '已设置接收所有通知';
            break;
          case 1:
            message = '已设置只接收重要通知';
            break;
          case 2:
            message = '已关闭通知';
            break;
        }
        
        wx.showToast({
          title: message,
          icon: 'success'
        });
      }
    });
  },

  /**
   * 获取社区日历数据
   */
  fetchCommunityCalendar: function() {
    // 模拟API请求获取社区日历数据
    setTimeout(() => {
      const communityCalendar = [
        {
          id: '1',
          title: '瑜伽健身课',
          startTime: '2023-11-18 10:00',
          endTime: '2023-11-18 11:30',
          location: '小区健身中心',
          type: 'activity',
          color: '#1890ff'
        },
        {
          id: '2',
          title: '社区环保日',
          startTime: '2023-11-25 09:00',
          endTime: '2023-11-25 12:00',
          location: '小区中央公园南门',
          type: 'activity',
          color: '#52c41a'
        },
        {
          id: '3',
          title: '小区电梯维修',
          startTime: '2023-11-26 09:00',
          endTime: '2023-11-26 12:00',
          location: '1号楼',
          type: 'maintenance',
          color: '#ff4d4f'
        },
        {
          id: '4',
          title: '业主委员会会议',
          startTime: '2023-11-30 19:00',
          endTime: '2023-11-30 21:00',
          location: '小区会所',
          type: 'meeting',
          color: '#722ed1'
        }
      ];
      
      this.setData({
        communityCalendar
      });
    }, 1500);
  },

  /**
   * 获取活动评分数据
   */
  fetchActivityRatings: function() {
    // 模拟API请求获取活动评分数据
    setTimeout(() => {
      const activityRatings = {
        '5': { // 活动ID
          averageRating: 4.5,
          totalRatings: 12,
          myRating: 0, // 0表示未评分
          comments: [
            {
              userId: '101',
              userName: '张三',
              avatar: '/static/images/avatar1.png',
              rating: 5,
              comment: '活动组织得非常好，气氛热烈，希望以后多举办类似活动！',
              time: '2023-09-30 10:15'
            },
            {
              userId: '102',
              userName: '李四',
              avatar: '/static/images/avatar2.png',
              rating: 4,
              comment: '整体不错，就是场地有点小，人太多了。',
              time: '2023-09-30 11:30'
            }
          ]
        }
      };
      
      this.setData({
        activityRatings
      });
    }, 1500);
  },

  /**
   * 提交活动评价
   */
  submitActivityRating: function(e) {
    const { activityId, rating, comment } = e.detail;
    
    wx.showLoading({
      title: '提交中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      // 更新本地数据
      const activityRatings = { ...this.data.activityRatings };
      
      if (activityRatings[activityId]) {
        activityRatings[activityId].myRating = rating;
        activityRatings[activityId].comments.unshift({
          userId: 'current_user',
          userName: '我',
          avatar: '/static/images/my-avatar.png',
          rating,
          comment,
          time: this.formatTime(new Date())
        });
        
        // 重新计算平均分
        const totalRating = activityRatings[activityId].comments.reduce((sum, item) => sum + item.rating, 0);
        activityRatings[activityId].averageRating = (totalRating / activityRatings[activityId].comments.length).toFixed(1);
        activityRatings[activityId].totalRatings = activityRatings[activityId].comments.length;
      }
      
      this.setData({ activityRatings });
      
      // 更新通知状态
      const notifications = this.data.notifications.map(item => {
        if (item.type === 'activity_feedback' && item.activityId === activityId) {
          return {
            ...item,
            needAction: false
          };
        }
        return item;
      });
      
      this.setData({ notifications });
      
      wx.hideLoading();
      wx.showToast({
        title: '评价成功',
        icon: 'success'
      });
    }, 1000);
  },

  /**
   * 设置日历提醒
   */
  setCalendarReminder: function(e) {
    const { eventId, remind } = e.detail;
    
    wx.showLoading({
      title: '设置中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: remind ? '已设置提醒' : '已取消提醒',
        icon: 'success'
      });
    }, 1000);
  },

  /**
   * 格式化时间
   */
  formatTime: function(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    return `${year}-${this.formatNumber(month)}-${this.formatNumber(day)} ${this.formatNumber(hour)}:${this.formatNumber(minute)}`;
  },

  formatNumber: function(n) {
    return n < 10 ? `0${n}` : n;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.fetchNotifications();
    this.fetchCommunityCalendar();
    this.fetchActivityRatings();
    wx.stopPullDownRefresh();
  }
})