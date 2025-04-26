// pages/community/activity/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    activity: null,
    loading: true,
    isEnrolled: false,
    comments: [],
    newComment: '',
    showShareMenu: false,
    hasReminder: false,
    showRatingModal: false,
    userRating: 0,
    userReview: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: options.id
      });
      this.fetchActivityDetail(options.id);
      this.fetchComments(options.id);
    } else {
      wx.showToast({
        title: '活动ID无效',
        icon: 'error'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  /**
   * 获取活动详情
   */
  fetchActivityDetail: function(id) {
    this.setData({ loading: true });
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟活动详情数据
      const activity = {
        id: id,
        title: id === '1' ? '社区读书会' : 
               id === '2' ? '瑜伽健身课' : 
               id === '3' ? '社区环保日' : 
               id === '4' ? '儿童绘画比赛' : '中秋联欢晚会',
        image: id === '1' ? '/static/images/activity-reading.jpg' : 
                id === '2' ? '/static/images/activity-yoga.jpg' : 
                id === '3' ? '/static/images/activity-environment.jpg' : 
                id === '4' ? '/static/images/activity-painting.jpg' : '/static/images/activity-festival.jpg',
        time: id === '1' ? '2023-11-15 19:00-21:00' : 
               id === '2' ? '2023-11-18 10:00-11:30' : 
               id === '3' ? '2023-11-25 09:00-12:00' : 
               id === '4' ? '2023-11-19 14:00-16:00' : '2023-09-29 19:00-21:30',
        location: id === '1' ? '小区会所二楼' : 
                   id === '2' ? '小区健身中心' : 
                   id === '3' ? '小区中央公园' : 
                   id === '4' ? '小区儿童活动中心' : '小区广场',
        status: id === '5' ? '已结束' : '报名中',
        participantsCount: id === '1' ? 12 : 
                           id === '2' ? 8 : 
                           id === '3' ? 25 : 
                           id === '4' ? 15 : 120,
        maxParticipants: id === '1' ? 20 : 
                         id === '2' ? 15 : 
                         id === '3' ? 50 : 
                         id === '4' ? 30 : 150,
        fee: id === '2' ? 30 : id === '4' ? 10 : 0,
        description: id === '1' ? '本期读书会主题：《人类简史》，欢迎社区居民参与讨论交流。我们将深入探讨书中关于人类历史的观点，分享阅读心得。请参与者提前阅读相关章节，活动现场将提供茶点。' : 
                     id === '2' ? '专业瑜伽老师指导，适合初学者和有经验的瑜伽爱好者。本次课程将专注于基础姿势和呼吸技巧，帮助参与者放松身心，增强体质。请穿着舒适的运动服装，自带瑜伽垫。' : 
                     id === '3' ? '一起参与社区环境清洁，增强环保意识，建设美丽家园。活动将组织居民清理小区公共区域，并进行垃圾分类宣传。我们将提供必要的清洁工具，请参与者做好防晒准备。' : 
                     id === '4' ? '主题：美丽的家园。欢迎3-12岁儿童参与，将提供绘画材料。孩子们可以通过绘画表达对家园的理解和热爱，优秀作品将在小区展示。家长可陪同参与，共同度过创意时光。' : '庆祝中秋佳节，社区居民共聚一堂，共度美好时光。活动包括文艺表演、猜灯谜、品尝月饼等环节，欢迎居民踊跃参与，共庆团圆佳节。',
        category: id === '1' || id === '5' ? 'culture' : 
                  id === '2' ? 'sports' : 
                  id === '3' ? 'charity' : 'family',
        tags: id === '1' ? ['读书会', '免费活动'] : 
               id === '2' ? ['瑜伽', '健身'] : 
               id === '3' ? ['环保', '公益', '免费活动'] : 
               id === '4' ? ['儿童', '绘画', '比赛'] : ['节日活动', '免费活动'],
        isEnrolled: id === '2' || id === '5',
        organizer: '小区居委会',
        contactPerson: '李老师',
        contactPhone: '138****1234',
        participants: [
          { id: '1', avatar: '/static/images/avatar1.png', nickname: '社区居民1' },
          { id: '2', avatar: '/static/images/avatar2.png', nickname: '社区居民2' },
          { id: '3', avatar: '/static/images/avatar3.png', nickname: '社区居民3' },
        ],
        materials: id === '1' ? '请携带《人类简史》一书' : 
                   id === '2' ? '瑜伽垫、运动服、毛巾' : 
                   id === '3' ? '劳动手套（可选）' : 
                   id === '4' ? '无需携带，现场提供绘画材料' : '无需携带物品',
        notice: '请准时参加，活动开始前15分钟签到'
      };
      
      this.setData({
        activity,
        isEnrolled: activity.isEnrolled,
        loading: false
      });
    }, 1000);
  },

  /**
   * 获取活动评论
   */
  fetchComments: function(id) {
    // 模拟API请求
    setTimeout(() => {
      // 模拟评论数据
      const comments = [
        {
          id: '1',
          user: { id: '1', avatar: '/static/images/avatar1.png', nickname: '居民甲' },
          content: '上次参加这个活动收获很多，期待这次活动！',
          time: '2023-11-10 14:23',
          likes: 5
        },
        {
          id: '2',
          user: { id: '2', avatar: '/static/images/avatar2.png', nickname: '居民乙' },
          content: '请问有年龄限制吗？',
          time: '2023-11-11 09:45',
          likes: 0
        },
        {
          id: '3',
          user: { id: '3', avatar: '/static/images/avatar3.png', nickname: '活动组织者' },
          content: '回复@居民乙：本活动不限年龄，欢迎所有居民参与！',
          time: '2023-11-11 10:30',
          likes: 2
        }
      ];
      
      this.setData({
        comments
      });
    }, 1200);
  },

  /**
   * 报名活动
   */
  enrollActivity: function() {
    const activity = this.data.activity;
    
    if (activity.fee > 0) {
      wx.showModal({
        title: '活动报名',
        content: `该活动需支付${activity.fee}元费用，是否继续报名？`,
        success: (res) => {
          if (res.confirm) {
            this.processEnrollment();
          }
        }
      });
    } else {
      this.processEnrollment();
    }
  },

  /**
   * 处理报名流程
   */
  processEnrollment: function() {
    wx.showLoading({
      title: '报名中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      // 更新活动状态
      const activity = this.data.activity;
      activity.participantsCount += 1;
      activity.isEnrolled = true;
      
      this.setData({
        activity,
        isEnrolled: true
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
  cancelEnroll: function() {
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
            const activity = this.data.activity;
            activity.participantsCount = Math.max(0, activity.participantsCount - 1);
            activity.isEnrolled = false;
            
            this.setData({
              activity,
              isEnrolled: false
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
  checkInActivity: function() {
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
   * 提交评论
   */
  submitComment: function() {
    if (!this.data.newComment.trim()) {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '提交中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      // 添加新评论
      const newComment = {
        id: String(this.data.comments.length + 1),
        user: { id: 'current', avatar: '/static/images/avatar-default.png', nickname: '我' },
        content: this.data.newComment,
        time: '刚刚',
        likes: 0
      };
      
      const comments = [newComment, ...this.data.comments];
      
      this.setData({
        comments,
        newComment: ''
      });
      
      wx.hideLoading();
      wx.showToast({
        title: '评论成功',
        icon: 'success'
      });
    }, 1000);
  },

  /**
   * 输入评论内容
   */
  inputComment: function(e) {
    this.setData({
      newComment: e.detail.value
    });
  },

  /**
   * 点赞评论
   */
  likeComment: function(e) {
    const id = e.currentTarget.dataset.id;
    const comments = this.data.comments.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.likes + 1
        };
      }
      return item;
    });
    
    this.setData({
      comments
    });
    
    wx.showToast({
      title: '点赞成功',
      icon: 'success'
    });
  },

  /**
   * 显示/隐藏分享菜单
   */
  toggleShareMenu: function() {
    this.setData({
      showShareMenu: !this.data.showShareMenu
    });
  },

  /**
   * 分享到朋友圈
   */
  shareToMoments: function() {
    this.setData({
      showShareMenu: false
    });
    
    wx.showToast({
      title: '分享到朋友圈',
      icon: 'success'
    });
  },

  /**
   * 生成分享海报
   */
  generatePoster: function() {
    this.setData({
      showShareMenu: false
    });
    
    wx.showLoading({
      title: '生成海报中',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '海报已保存相册',
        icon: 'success'
      });
    }, 1500);
  },

  /**
   * 设置活动提醒
   */
  setActivityReminder: function() {
    if (this.data.hasReminder) {
      wx.showModal({
        title: '取消提醒',
        content: '确定要取消此活动的提醒吗？',
        success: (res) => {
          if (res.confirm) {
            this.cancelReminder();
          }
        }
      });
    } else {
      wx.showActionSheet({
        itemList: ['提前30分钟', '提前1小时', '提前1天'],
        success: (res) => {
          let reminderTime;
          const activityTime = new Date(this.data.activity.time.split('-')[0].trim());
          
          switch(res.tapIndex) {
            case 0: // 30分钟
              reminderTime = new Date(activityTime.getTime() - 30 * 60 * 1000);
              break;
            case 1: // 1小时
              reminderTime = new Date(activityTime.getTime() - 60 * 60 * 1000);
              break;
            case 2: // 1天
              reminderTime = new Date(activityTime.getTime() - 24 * 60 * 60 * 1000);
              break;
          }
          
          this.saveReminder(reminderTime);
        }
      });
    }
  },
  
  /**
   * 保存提醒设置
   */
  saveReminder: function(reminderTime) {
    wx.showLoading({
      title: '设置提醒中',
    });
    
    // 模拟API请求，实际应用中应该将提醒信息保存到服务器
    setTimeout(() => {
      this.setData({
        hasReminder: true
      });
      
      wx.hideLoading();
      wx.showToast({
        title: '提醒设置成功',
        icon: 'success'
      });
      
      // 实际应用中，可以使用微信小程序的订阅消息功能实现提醒
      wx.requestSubscribeMessage({
        tmplIds: ['活动提醒模板ID'], // 需要替换为实际的模板ID
        success: (res) => {
          console.log('订阅消息成功', res);
        },
        fail: (err) => {
          console.error('订阅消息失败', err);
        }
      });
    }, 1000);
  },
  
  /**
   * 取消提醒
   */
  cancelReminder: function() {
    wx.showLoading({
      title: '取消提醒中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      this.setData({
        hasReminder: false
      });
      
      wx.hideLoading();
      wx.showToast({
        title: '已取消提醒',
        icon: 'success'
      });
    }, 1000);
  },

  /**
   * 拨打联系电话
   */
  callOrganizer: function() {
    const phone = this.data.activity.contactPhone.replace(/\*/g, '0');
    wx.makePhoneCall({
      phoneNumber: phone,
      fail: () => {
        wx.showToast({
          title: '拨打电话失败',
          icon: 'none'
        });
      }
    });
  },
  
  /**
   * 打开评价弹窗
   */
  openRatingModal: function() {
    // 只有已参加的活动才能评价
    if (this.data.activity.status === '已结束' && this.data.isEnrolled) {
      this.setData({
        showRatingModal: true
      });
    } else {
      wx.showToast({
        title: '只能评价已参加的活动',
        icon: 'none'
      });
    }
  },
  
  /**
   * 关闭评价弹窗
   */
  closeRatingModal: function() {
    this.setData({
      showRatingModal: false
    });
  },
  
  /**
   * 设置评分
   */
  setRating: function(e) {
    const rating = e.currentTarget.dataset.rating;
    this.setData({
      userRating: rating
    });
  },
  
  /**
   * 输入评价内容
   */
  inputReview: function(e) {
    this.setData({
      userReview: e.detail.value
    });
  },
  
  /**
   * 提交评价
   */
  submitRating: function() {
    if (this.data.userRating === 0) {
      wx.showToast({
        title: '请选择评分',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '提交评价中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        showRatingModal: false
      });
      
      wx.showToast({
        title: '评价提交成功',
        icon: 'success'
      });
      
      // 添加评价到评论列表
      if (this.data.userReview.trim()) {
        const newComment = {
          id: String(this.data.comments.length + 1),
          user: { id: 'current', avatar: '/static/images/avatar-default.png', nickname: '我' },
          content: `评分：${this.data.userRating}星 - ${this.data.userReview}`,
          time: '刚刚',
          likes: 0
        };
        
        const comments = [newComment, ...this.data.comments];
        
        this.setData({
          comments,
          userRating: 0,
          userReview: ''
        });
      }
    }, 1500);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const activity = this.data.activity;
    return {
      title: activity.title,
      path: `/pages/community/activity/detail/detail?id=${activity.id}`,
      imageUrl: activity.image
    };
  }
})