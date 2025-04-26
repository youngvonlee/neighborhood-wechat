// pages/groupbuy/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: null,
    comments: [
      { id: '1', user: '张先生', avatar: '/static/images/avatar1.png', content: '水果很新鲜，价格也实惠，下次还会参加！', time: '2023-04-20', rating: 5 },
      { id: '2', user: '李女士', avatar: '/static/images/avatar2.png', content: '送货速度很快，服务态度好。', time: '2023-04-19', rating: 4 },
      { id: '3', user: '王先生', avatar: '/static/images/avatar3.png', content: '质量不错，但是包装可以再改进一下。', time: '2023-04-18', rating: 3 }
    ],
    relatedActivities: [
      { id: '2', title: '有机蔬菜套餐', image: '/static/images/vegetables.png', price: 45 },
      { id: '3', title: '进口零食大礼包', image: '/static/images/snacks.png', price: 99 }
    ],
    isCollected: false,
    showAllComments: false,
    showShareOptions: false,
    deliveryInfo: {
      address: '阳光花园3号楼2单元101',
      contact: '张三',
      phone: '13812345678',
      time: '每周一、三、五配送'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id;
    // 实际应用中应该从服务器获取数据
    // 这里模拟从服务器获取数据
    this.setData({
      activity: {
        id: '1',
        title: '新鲜水果团购',
        image: '/static/images/fruits.png',
        endTime: '2023-04-25 20:00',
        currentCount: 15,
        targetCount: 20,
        price: 58,
        originalPrice: 88,
        description: '社区团购优质水果，包含苹果、香蕉、橙子各2斤，由专业果农直供，保证新鲜度。每人限购1份，送货上门。',
        category: 'fresh',
        organizer: '小区生活服务中心',
        rules: '1. 每人限购1份\n2. 团购成功后3天内送货上门\n3. 如遇特殊情况可申请退款',
        images: [
          '/static/images/fruits.png',
          '/static/images/fruits_detail1.png',
          '/static/images/fruits_detail2.png'
        ]
      }
    });
  },

  /**
   * 收藏/取消收藏
   */
  toggleCollect() {
    this.setData({
      isCollected: !this.data.isCollected
    });
    
    wx.showToast({
      title: this.data.isCollected ? '已收藏' : '已取消收藏',
      icon: 'success'
    });
  },

  /**
   * 参与团购
   */
  joinGroupBuy() {
    wx.showModal({
      title: '参与团购',
      content: `确定要参与"${this.data.activity.title}"团购吗？价格：¥${this.data.activity.price}`,
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/groupbuy/order/order?id=' + this.data.activity.id
          });
        }
      }
    });
  },

  /**
   * 显示/隐藏全部评论
   */
  toggleComments() {
    this.setData({
      showAllComments: !this.data.showAllComments
    });
  },

  /**
   * 分享团购
   */
  shareGroupBuy() {
    this.setData({
      showShareOptions: true
    });
  },

  /**
   * 关闭分享选项
   */
  closeShareOptions() {
    this.setData({
      showShareOptions: false
    });
  },

  /**
   * 选择分享方式
   */
  selectShareOption(e) {
    const option = e.currentTarget.dataset.option;
    
    if (option === 'wechat') {
      wx.showToast({
        title: '分享给微信好友',
        icon: 'success'
      });
    } else if (option === 'moments') {
      wx.showToast({
        title: '分享到朋友圈',
        icon: 'success'
      });
    } else if (option === 'poster') {
      wx.showLoading({
        title: '生成海报中',
      });
      
      setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
          title: '海报已保存',
          icon: 'success'
        });
      }, 1500);
    }
    
    this.closeShareOptions();
  },

  /**
   * 查看配送信息
   */
  viewDeliveryInfo() {
    wx.showModal({
      title: '配送信息',
      content: `配送地址：${this.data.deliveryInfo.address}\n联系人：${this.data.deliveryInfo.contact}\n联系电话：${this.data.deliveryInfo.phone}\n配送时间：${this.data.deliveryInfo.time}`,
      showCancel: false
    });
  },

  /**
   * 联系团长
   */
  contactOrganizer() {
    wx.makePhoneCall({
      phoneNumber: '13800138000',
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
   * 预览图片
   */
  previewImage(e) {
    const current = e.currentTarget.dataset.src;
    wx.previewImage({
      current,
      urls: this.data.activity.images
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: this.data.activity.title,
      path: '/pages/groupbuy/detail/detail?id=' + this.data.activity.id,
      imageUrl: this.data.activity.image
    };
  }
})