// pages/community/activity/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      title: '',
      time: '',
      endTime: '',
      location: '',
      maxParticipants: '',
      fee: '0',
      description: '',
      category: 'culture',
      tags: []
    },
    categories: [
      { id: 'culture', name: '文化活动' },
      { id: 'sports', name: '体育健身' },
      { id: 'charity', name: '公益活动' },
      { id: 'family', name: '亲子活动' }
    ],
    allTags: [
      '读书会', '瑜伽', '健身', '环保', '公益', '免费活动', 
      '儿童', '绘画', '比赛', '节日活动', '讲座', '培训',
      '音乐', '舞蹈', '手工', '棋牌', '球类', '跑步',
      '志愿者', '社区服务', '邻里互助'
    ],
    selectedTags: [],
    showTagSelector: false,
    currentDate: '',
    isSubmitting: false,
    uploadedImages: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前日期
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
    
    this.setData({
      currentDate: currentDate
    });
  },

  /**
   * 输入框内容变化处理
   */
  onInputChange: function(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    
    this.setData({
      [`formData.${field}`]: value
    });
  },

  /**
   * 选择活动分类
   */
  onCategoryChange: function(e) {
    this.setData({
      'formData.category': e.detail.value
    });
  },

  /**
   * 显示标签选择器
   */
  showTagSelector: function() {
    this.setData({
      showTagSelector: true
    });
  },

  /**
   * 关闭标签选择器
   */
  closeTagSelector: function() {
    this.setData({
      showTagSelector: false
    });
  },

  /**
   * 选择/取消选择标签
   */
  toggleTag: function(e) {
    const tag = e.currentTarget.dataset.tag;
    const selectedTags = [...this.data.formData.tags];
    
    const index = selectedTags.indexOf(tag);
    if (index > -1) {
      selectedTags.splice(index, 1);
    } else {
      if (selectedTags.length < 3) {
        selectedTags.push(tag);
      } else {
        wx.showToast({
          title: '最多选择3个标签',
          icon: 'none'
        });
        return;
      }
    }
    
    this.setData({
      'formData.tags': selectedTags
    });
  },

  /**
   * 确认选择的标签
   */
  confirmTags: function() {
    this.setData({
      showTagSelector: false
    });
  },

  /**
   * 上传活动图片
   */
  uploadImage: function() {
    if (this.data.uploadedImages.length >= 3) {
      wx.showToast({
        title: '最多上传3张图片',
        icon: 'none'
      });
      return;
    }
    
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 模拟上传过程
        wx.showLoading({
          title: '上传中',
        });
        
        setTimeout(() => {
          const uploadedImages = [...this.data.uploadedImages, {
            url: res.tempFilePaths[0],
            id: Date.now().toString()
          }];
          
          this.setData({
            uploadedImages
          });
          
          wx.hideLoading();
        }, 1000);
      }
    });
  },

  /**
   * 删除已上传图片
   */
  deleteImage: function(e) {
    const id = e.currentTarget.dataset.id;
    const uploadedImages = this.data.uploadedImages.filter(img => img.id !== id);
    
    this.setData({
      uploadedImages
    });
  },

  /**
   * 预览图片
   */
  previewImage: function(e) {
    const url = e.currentTarget.dataset.url;
    const urls = this.data.uploadedImages.map(img => img.url);
    
    wx.previewImage({
      current: url,
      urls: urls
    });
  },

  /**
   * 表单提交
   */
  submitForm: function() {
    // 表单验证
    const { title, time, location, maxParticipants, description, category } = this.data.formData;
    
    if (!title) {
      this.showError('请输入活动标题');
      return;
    }
    
    if (!time) {
      this.showError('请选择活动时间');
      return;
    }
    
    if (!location) {
      this.showError('请输入活动地点');
      return;
    }
    
    if (!maxParticipants) {
      this.showError('请输入参与人数上限');
      return;
    }
    
    if (!description) {
      this.showError('请输入活动描述');
      return;
    }
    
    if (this.data.uploadedImages.length === 0) {
      this.showError('请上传至少一张活动图片');
      return;
    }
    
    // 防止重复提交
    if (this.data.isSubmitting) {
      return;
    }
    
    this.setData({
      isSubmitting: true
    });
    
    wx.showLoading({
      title: '提交中',
    });
    
    // 模拟API请求
    setTimeout(() => {
      wx.hideLoading();
      
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          // 延迟返回，让用户看到提示
          setTimeout(() => {
            wx.navigateBack();
          }, 2000);
        }
      });
      
      this.setData({
        isSubmitting: false
      });
    }, 1500);
  },

  /**
   * 显示错误提示
   */
  showError: function(message) {
    wx.showToast({
      title: message,
      icon: 'none'
    });
  },

  /**
   * 选择位置
   */
  chooseLocation: function() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          'formData.location': res.name || res.address
        });
      }
    });
  }
})