// pages/index/index.js
var common = require('../../utils/common.js') //引用公共JS文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //幻灯片素材
    swiperImg: [
      {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg'},
      {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage2.jpg'},
      {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage3.jpg'}
    ],
    newsList: [],
    isLoading: true,
    animationClass: ''
  },

  /**
   * 自定义函数--跳转新页面浏览新闻内容
   */
  goToDetail: function(e) {
    //获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    //携带新闻id进行页面跳转
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
      // 页面切换动画由全局配置控制
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadNewsData()
  },

  /**
   * 加载新闻数据
   */
  loadNewsData: function() {
    this.setData({ isLoading: true })
    
    // 模拟网络请求延迟
    setTimeout(() => {
      let list = common.getNewsList()
      // 为每个列表项添加动画延迟
      let animatedList = list.map((item, index) => {
        return {
          ...item,
          animationDelay: (index * 0.05) + 's'
        }
      })
      
      this.setData({
        newsList: animatedList,
        isLoading: false,
        animationClass: 'fade-in'
      })
    }, 300)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 页面显示时重置动画类（触发重新动画）
    this.setData({
      animationClass: ''
    })
    
    // 使用nextTick重新触发动画
    setTimeout(() => {
      this.setData({
        animationClass: 'fade-in'
      })
    }, 50)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 下拉刷新
    this.loadNewsData()
    // 停止下拉刷新动画
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '📰 我的新闻网 - 每日精选资讯',
      desc: '这里有最新、最热的新闻资讯，快来一起看看吧！',
      path: '/pages/index/index',
      imageUrl: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg' // 分享卡片图片
    }
  },
  
  /**
   * 分享到朋友圈
   */
  onShareTimeline: function() {
    return {
      title: '我的新闻网 - 精彩资讯一手掌握',
      query: '',
      imageUrl: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg'
    }
  }
})