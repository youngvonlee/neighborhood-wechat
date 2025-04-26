// pages/community/vote/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vote: null,
    comments: [],
    loading: true,
    selectedOption: null,
    newComment: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id, action } = options;
    this.voteId = id;
    this.action = action; // 如果是从投票列表页的"立即投票"按钮进入
    
    this.fetchVoteDetail();
    this.fetchComments();
  },

  /**
   * 获取投票详情
   */
  fetchVoteDetail: function() {
    this.setData({ loading: true });
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟投票数据
      const voteData = {
        id: this.voteId,
        title: '小区健身设施更新投票',
        description: '针对小区健身设施更新，请选择您最希望增加的设施类型。我们将根据投票结果在下个季度进行设施更新，感谢您的参与！',
        initiator: '物业管理处',
        startTime: '2023-11-10 08:00',
        endTime: '2023-11-25 20:00',
        status: '进行中',
        options: [
          { id: '1', text: '跑步机', count: 45 },
          { id: '2', text: '力量训练区', count: 38 },
          { id: '3', text: '瑜伽区', count: 62 },
          { id: '4', text: '乒乓球台', count: 29 }
        ],
        participantCount: 174,
        hasVoted: false
      };
      
      // 计算总票数
      const totalVotes = voteData.options.reduce((sum, option) => sum + option.count, 0);
      voteData.totalVotes = totalVotes;
      
      this.setData({
        vote: voteData,
        loading: false
      });
      
      // 如果是从"立即投票"按钮进入，自动滚动到投票选项区域
      if (this.action === 'vote') {
        wx.createSelectorQuery()
          .select('.vote-options')
          .boundingClientRect(rect => {
            wx.pageScrollTo({
              scrollTop: rect.top,
              duration: 300
            });
          })
          .exec();
      }
    }, 1000);
  },

  /**
   * 获取评论列表
   */
  fetchComments: function() {
    // 模拟API请求
    setTimeout(() => {
      // 模拟评论数据
      const comments = [
        {
          id: '1',
          user: {
            nickname: '张小明',
            avatar: '/static/images/avatar1.png'
          },
          content: '我支持增加瑜伽区，现在小区里很多人都喜欢瑜伽运动。',
          time: '2023-11-15 10:23',
          likes: 12
        },
        {
          id: '2',
          user: {
            nickname: '李华',
            avatar: '/static/images/avatar2.png'
          },
          content: '希望能增加跑步机，冬天在室内跑步很方便。',
          time: '2023-11-15 14:05',
          likes: 8
        },
        {
          id: '3',
          user: {
            nickname: '王丽',
            avatar: '/static/images/avatar3.png'
          },
          content: '我们家孩子很喜欢打乒乓球，希望能增加乒乓球台。',
          time: '2023-11-16 09:30',
          likes: 5
        }
      ];
      
      this.setData({ comments });
    }, 1500);
  },

  /**
   * 选择投票选项
   */
  selectOption: function(e) {
    // 如果已投票或投票已结束，不允许选择
    if (this.data.vote.hasVoted || this.data.vote.status === '已结束') {
      return;
    }
    
    const optionId = e.currentTarget.dataset.id;
    this.setData({ selectedOption: optionId });
  },

  /**
   * 提交投票
   */
  submitVote: function() {
    if (!this.data.selectedOption) {
      wx.showToast({
        title: '请选择一个选项',
        icon: 'none'
      });
      return;
    }
    
    // 显示加载中
    wx.showLoading({
      title: '提交中...',
      mask: true
    });
    
    // 模拟API请求
    setTimeout(() => {
      // 更新选项票数
      const vote = {...this.data.vote};
      const optionIndex = vote.options.findIndex(option => option.id === this.data.selectedOption);
      
      if (optionIndex !== -1) {
        vote.options[optionIndex].count += 1;
        vote.participantCount += 1;
        vote.totalVotes += 1;
        vote.hasVoted = true;
      }
      
      this.setData({
        vote,
        selectedOption: null
      });
      
      wx.hideLoading();
      
      wx.showToast({
        title: '投票成功',
        icon: 'success'
      });
    }, 1500);
  },

  /**
   * 输入评论
   */
  inputComment: function(e) {
    this.setData({ newComment: e.detail.value });
  },

  /**
   * 提交评论
   */
  submitComment: function() {
    if (!this.data.newComment.trim()) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      });
      return;
    }
    
    // 显示加载中
    wx.showLoading({
      title: '提交中...',
      mask: true
    });
    
    // 模拟API请求
    setTimeout(() => {
      // 创建新评论
      const newComment = {
        id: `temp_${Date.now()}`,
        user: {
          nickname: '我',
          avatar: '/static/images/avatar_default.png'
        },
        content: this.data.newComment,
        time: '刚刚',
        likes: 0
      };
      
      // 添加到评论列表开头
      const comments = [newComment, ...this.data.comments];
      
      this.setData({
        comments,
        newComment: ''
      });
      
      wx.hideLoading();
    }, 1000);
  },

  /**
   * 点赞评论
   */
  likeComment: function(e) {
    const commentId = e.currentTarget.dataset.id;
    const comments = [...this.data.comments];
    const commentIndex = comments.findIndex(comment => comment.id === commentId);
    
    if (commentIndex !== -1) {
      comments[commentIndex].likes += 1;
      this.setData({ comments });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.fetchVoteDetail();
    this.fetchComments();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 可以在这里实现加载更多评论
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.vote ? this.data.vote.title : '小区投票',
      path: `/pages/community/vote/detail/detail?id=${this.voteId}`
    };
  }
})