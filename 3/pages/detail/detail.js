// pages/detail/detail.js
var common = require('../../utils/common.js')

Page({
  data: {
    article: {},
    isAdd: false,
    isLogin: false
  },

  onLoad: function(options) {
    // 检查登录状态
    let loginStatus = common.checkLoginStatus()
    this.setData({
      isLogin: loginStatus.isLogin
    })
    
    let id = options.id
    // 检查是否在收藏夹中
    var newarticle = wx.getStorageSync(id)
    if (newarticle != '') {
      this.setData({
        isAdd: true,
        article: newarticle
      })
    } else {
      let result = common.getNewsDetail(id)
      if (result.code == '200') {
        this.setData({
          article: result.news,
          isAdd: false
        })
      }
    }
  },

  // 添加收藏
  addFavorites: function() {
    // 检查是否登录
    if (!this.data.isLogin) {
      wx.showModal({
        title: '温馨提示',
        content: '请先登录后再收藏文章',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/my'
            })
          }
        }
      })
      return
    }
    
    let article = this.data.article
    wx.setStorageSync(article.id, article)
    this.setData({
      isAdd: true
    })
    wx.showToast({
      title: '❤️ 收藏成功',
      icon: 'success'
    })
  },

  // 取消收藏
  cancelFavorites: function() {
    let article = this.data.article
    wx.removeStorageSync(article.id)
    this.setData({
      isAdd: false
    })
    wx.showToast({
      title: '已取消收藏',
      icon: 'none'
    })
  },

  // 返回首页
  goToIndex: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})