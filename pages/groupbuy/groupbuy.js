// pages/groupbuy/groupbuy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'ongoing',
    activeCategory: 'all',
    categories: [
      { id: 'all', name: '全部' },
      { id: 'food', name: '食品' },
      { id: 'daily', name: '日用品' },
      { id: 'fresh', name: '生鲜' },
      { id: 'other', name: '其他' }
    ],
    sortOptions: [
      { id: 'default', name: '默认排序' },
      { id: 'price', name: '价格优先' },
      { id: 'hot', name: '热门优先' },
      { id: 'new', name: '最新上架' }
    ],
    currentSort: 'default',
    showSortActionSheet: false,
    ongoingActivities: [
      { 
        id: '1', 
        title: '新鲜水果团购', 
        image: '/static/images/fruits.png',
        endTime: '2023-04-25 20:00',
        currentCount: 15,
        targetCount: 20,
        price: 58,
        originalPrice: 88,
        description: '社区团购优质水果，包含苹果、香蕉、橙子各2斤',
        category: 'fresh',
        isReminded: false
      },
      { 
        id: '2', 
        title: '有机蔬菜套餐', 
        image: '/static/images/vegetables.png',
        endTime: '2023-04-26 18:00',
        currentCount: 8,
        targetCount: 10,
        price: 45,
        originalPrice: 65,
        description: '无农药有机蔬菜，包含10种时令蔬菜',
        category: 'fresh',
        isReminded: false
      },
      { 
        id: '3', 
        title: '进口零食大礼包', 
        image: '/static/images/snacks.png',
        endTime: '2023-04-27 20:00',
        currentCount: 25,
        targetCount: 30,
        price: 99,
        originalPrice: 158,
        description: '进口零食大礼包，包含多种进口零食',
        category: 'food',
        isReminded: false
      },
      { 
        id: '6', 
        title: '家庭清洁套装', 
        image: '/static/images/cleaning.png',
        endTime: '2023-04-28 18:00',
        currentCount: 12,
        targetCount: 20,
        price: 69,
        originalPrice: 99,
        description: '家庭清洁套装，包含多种清洁用品',
        category: 'daily',
        isReminded: false
      },
      { 
        id: '7', 
        title: '儿童益智玩具', 
        image: '/static/images/toys.png',
        endTime: '2023-04-29 20:00',
        currentCount: 5,
        targetCount: 15,
        price: 128,
        originalPrice: 199,
        description: '儿童益智玩具套装，适合3-6岁儿童',
        category: 'other',
        isReminded: false
      }
    ],
    completedActivities: [
      { 
        id: '4', 
        title: '优质大米团购', 
        image: '/static/images/rice.png',
        endTime: '2023-04-18 20:00',
        currentCount: 25,
        targetCount: 20,
        price: 79,
        originalPrice: 109,
        status: '已完成',
        category: 'food'
      },
      { 
        id: '5', 
        title: '家用清洁用品', 
        image: '/static/images/cleaning.png',
        endTime: '2023-04-15 18:00',
        currentCount: 18,
        targetCount: 15,
        price: 65,
        originalPrice: 99,
        status: '已完成',
        category: 'daily'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 可以在这里加载数据
  },

  /**
   * 切换标签页
   */
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  /**
   * 切换分类
   */
  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      activeCategory: category
    });
  },

  /**
   * 显示排序选项
   */
  showSortOptions() {
    this.setData({
      showSortActionSheet: true
    });
  },

  /**
   * 隐藏排序选项
   */
  hideSortOptions() {
    this.setData({
      showSortActionSheet: false
    });
  },

  /**
   * 切换排序方式
   */
  changeSort(e) {
    const sort = e.currentTarget.dataset.sort;
    this.setData({
      currentSort: sort,
      showSortActionSheet: false
    });
    wx.showToast({
      title: '排序方式已更改',
      icon: 'success',
      duration: 1000
    });
  },

  /**
   * 查看团购详情
   */
  viewDetail(e) {
    const id = e.currentTarget.dataset.id;
    const activity = this.data.activeTab === 'ongoing' ?
      this.data.ongoingActivities.find(item => item.id === id) :
      this.data.completedActivities.find(item => item.id === id);
    
    wx.showModal({
      title: activity.title,
      content: activity.description,
      showCancel: false
    });
  },

  /**
   * 参与团购
   */
  joinGroupBuy(e) {
    const id = e.currentTarget.dataset.id;
    const activity = this.data.ongoingActivities.find(item => item.id === id);
    
    wx.showModal({
      title: '参与团购',
      content: `确定要参与"${activity.title}"团购吗？价格：¥${activity.price}`,
      success: (res) => {
        if (res.confirm) {
          // 实际应用中，这里应该调用API处理团购逻辑
          wx.showToast({
            title: '参与成功',
            icon: 'success'
          });
          
          // 更新参与人数
          const updatedActivities = this.data.ongoingActivities.map(item => {
            if (item.id === id) {
              return {
                ...item,
                currentCount: item.currentCount + 1
              };
            }
            return item;
          });
          
          this.setData({
            ongoingActivities: updatedActivities
          });
        }
      }
    });
  },

  /**
   * 发起新团购
   */
  createNewGroupBuy() {
    wx.showModal({
      title: '发起团购',
      content: '请填写团购信息',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '发起成功',
            icon: 'success'
          });
        }
      }
    });
  },

  /**
   * 设置到期提醒
   */
  setReminder(e) {
    const id = e.currentTarget.dataset.id;
    const updatedActivities = this.data.ongoingActivities.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isReminded: !item.isReminded
        };
      }
      return item;
    });
    
    this.setData({
      ongoingActivities: updatedActivities
    });
    
    const activity = updatedActivities.find(item => item.id === id);
    if (activity.isReminded) {
      wx.showToast({
        title: '已设置提醒',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '已取消提醒',
        icon: 'none'
      });
    }
  },

  /**
   * 分享团购
   */
  shareGroupBuy(e) {
    const id = e.currentTarget.dataset.id;
    const activity = this.data.ongoingActivities.find(item => item.id === id);
    
    wx.showActionSheet({
      itemList: ['分享给微信好友', '分享到朋友圈', '生成分享海报'],
      success: (res) => {
        if (res.tapIndex === 0 || res.tapIndex === 1) {
          wx.showToast({
            title: '分享成功',
            icon: 'success'
          });
        } else if (res.tapIndex === 2) {
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
      }
    });
  },

  /**
   * 查看评价
   */
  viewComments(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '用户评价',
      content: '该团购暂无评价',
      showCancel: false
    });
  }
})