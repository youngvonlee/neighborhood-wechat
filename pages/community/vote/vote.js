// pages/community/vote/vote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'all',
    votes: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchVotes();
  },

  /**
   * 切换标签页
   */
  switchTab: function(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
    this.fetchVotes(tab);
  },

  /**
   * 获取投票列表
   */
  fetchVotes: function(tabType = 'all') {
    this.setData({ loading: true });
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟投票数据
      const votes = [
        {
          id: '1',
          title: '小区健身设施更新投票',
          description: '针对小区健身设施更新，请选择您最希望增加的设施类型。',
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
          progressPercentage: 65,
          hasVoted: false
        },
        {
          id: '2',
          title: '小区绿化改造方案投票',
          description: '关于小区中央花园绿化改造方案的投票，请选择您喜欢的设计方案。',
          initiator: '业主委员会',
          startTime: '2023-11-05 09:00',
          endTime: '2023-11-20 18:00',
          status: '进行中',
          options: [
            { id: '1', text: '方案A：日式风格', count: 87 },
            { id: '2', text: '方案B：欧式风格', count: 65 },
            { id: '3', text: '方案C：现代简约风格', count: 103 }
          ],
          participantCount: 255,
          progressPercentage: 85,
          hasVoted: true
        },
        {
          id: '3',
          title: '小区安保系统升级投票',
          description: '关于小区安保系统升级的投票，请选择您认为最需要改进的安保措施。',
          initiator: '物业管理处',
          startTime: '2023-10-20 10:00',
          endTime: '2023-11-05 20:00',
          status: '已结束',
          options: [
            { id: '1', text: '增加监控摄像头', count: 156 },
            { id: '2', text: '升级门禁系统', count: 189 },
            { id: '3', text: '增加保安巡逻频次', count: 78 },
            { id: '4', text: '安装智能报警系统', count: 134 }
          ],
          participantCount: 320,
          progressPercentage: 100,
          hasVoted: true
        },
        {
          id: '4',
          title: '小区公共活动室使用规则投票',
          description: '关于小区公共活动室使用规则的投票，请选择您支持的使用方式。',
          initiator: '业主委员会',
          startTime: '2023-11-12 08:00',
          endTime: '2023-11-30 20:00',
          status: '进行中',
          options: [
            { id: '1', text: '免费预约制', count: 112 },
            { id: '2', text: '按时段收费制', count: 45 },
            { id: '3', text: '会员制', count: 28 }
          ],
          participantCount: 185,
          progressPercentage: 40,
          hasVoted: false
        },
        {
          id: '5',
          title: '小区停车位分配方案投票',
          description: '关于小区新增停车位分配方案的投票，请选择您支持的分配方式。',
          initiator: '物业管理处',
          startTime: '2023-10-15 09:00',
          endTime: '2023-10-30 18:00',
          status: '已结束',
          options: [
            { id: '1', text: '先到先得', count: 76 },
            { id: '2', text: '摇号分配', count: 143 },
            { id: '3', text: '竞价购买', count: 52 }
          ],
          participantCount: 271,
          progressPercentage: 100,
          hasVoted: false
        }
      ];
      
      // 根据标签筛选数据
      let filteredVotes = [];
      switch(tabType) {
        case 'ongoing':
          filteredVotes = votes.filter(vote => vote.status === '进行中');
          break;
        case 'ended':
          filteredVotes = votes.filter(vote => vote.status === '已结束');
          break;
        case 'my':
          filteredVotes = votes.filter(vote => vote.hasVoted);
          break;
        default:
          filteredVotes = votes;
      }
      
      this.setData({
        votes: filteredVotes,
        loading: false
      });
    }, 1000);
  },

  /**
   * 跳转到投票详情页
   */
  navigateToVoteDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/community/vote/detail/detail?id=${id}`
    });
  },

  /**
   * 跳转到创建投票页
   */
  navigateToCreateVote: function() {
    wx.navigateTo({
      url: '/pages/community/vote/create/create'
    });
  },

  /**
   * 立即投票
   */
  voteNow: function(e) {
    const id = e.currentTarget.dataset.id;
    // 阻止事件冒泡，避免触发navigateToVoteDetail
    e.stopPropagation();
    
    // 直接跳转到投票详情页
    wx.navigateTo({
      url: `/pages/community/vote/detail/detail?id=${id}&action=vote`
    });
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
    this.fetchVotes(this.data.activeTab);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 可以在这里实现加载更多
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '小区投票 - 参与小区事务决策',
      path: '/pages/community/vote/vote'
    };
  }
})