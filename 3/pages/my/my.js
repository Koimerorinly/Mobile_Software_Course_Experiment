// pages/my/my.js
var common = require('../../utils/common.js')

Page({
  data: {
    isLogin: false,
    src: '/images/default-avatar.png',
    nickName: '未登录',
    userInfo: null,
    newsList: [],
    number: 0,
    showLoginModal: false
  },

  onLoad: function(options) {
    // 检查登录状态
    this.checkLoginStatus()
  },

  onShow: function () {
    console.log('个人中心显示')
    this.checkLoginStatus()
    if (this.data.isLogin) {
      this.getMyFavorites()
    }
  },

  checkLoginStatus: function() {
    let result = common.checkLoginStatus()
    console.log('登录状态检查:', result)
    
    if (result.isLogin) {
      this.setData({
        isLogin: true,
        userInfo: result.userInfo,
        src: result.userInfo.avatarUrl || '/images/default-avatar.png',
        nickName: result.userInfo.nickName || '微信用户'
      })
      this.getMyFavorites()
    } else {
      this.setData({
        isLogin: false,
        src: '/images/default-avatar.png',
        nickName: '未登录',
        userInfo: null
      })
    }
  },

  // 微信登录 - 修复版本
  handleLogin: function() {
    console.log('点击登录按钮')
    let that = this
    
    // 显示加载提示
    wx.showLoading({
      title: '正在获取授权...',
      mask: true
    })
    
    // 直接调用 wx.getUserProfile
    wx.getUserProfile({
      desc: '用于完善个人资料',
      success: function(res) {
        console.log('获取用户信息成功:', res)
        wx.hideLoading()
        
        let userInfo = res.userInfo
        // 保存用户信息
        common.saveUserInfo(userInfo)
        
        // 更新页面数据
        that.setData({
          isLogin: true,
          userInfo: userInfo,
          src: userInfo.avatarUrl || '/images/default-avatar.png',
          nickName: userInfo.nickName || '微信用户'
        })
        
        // 获取收藏列表
        that.getMyFavorites()
        
        wx.showToast({
          title: '登录成功 🎉',
          icon: 'success',
          duration: 1500
        })
      },
      fail: function(err) {
        console.error('获取用户信息失败:', err)
        wx.hideLoading()
        
        // 用户拒绝授权
        if (err.errMsg && err.errMsg.includes('deny')) {
          wx.showModal({
            title: '温馨提示',
            content: '需要获取您的微信头像和昵称信息，请允许授权',
            confirmText: '重新授权',
            cancelText: '取消',
            success: function(modalRes) {
              if (modalRes.confirm) {
                // 重新发起登录
                that.handleLogin()
              }
            }
          })
        } else {
          wx.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          })
        }
      }
    })
  },

  // 退出登录
  handleLogout: function() {
    let that = this
    
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          common.logout()
          that.setData({
            isLogin: false,
            src: '/images/default-avatar.png',
            nickName: '未登录',
            userInfo: null,
            newsList: [],
            number: 0
          })
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          })
        }
      }
    })
  },

  getMyFavorites: function() {
    try {
      let info = wx.getStorageInfoSync()
      let keys = info.keys
      
      let myList = []
      for (var i = 0; i < keys.length; i++) {
        let obj = wx.getStorageSync(keys[i])
        if (obj && obj.id && obj.title) {
          myList.push(obj)
        }
      }
      
      console.log('收藏列表数量:', myList.length)
      
      this.setData({
        newsList: myList,
        number: myList.length
      })
    } catch (error) {
      console.error('获取收藏列表失败:', error)
    }
  },

  goToDetail: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },

  clearAllFavorites: function() {
    let that = this
    
    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有收藏吗？',
      success: function(res) {
        if (res.confirm) {
          try {
            let info = wx.getStorageInfoSync()
            let keys = info.keys
            for (var i = 0; i < keys.length; i++) {
              wx.removeStorageSync(keys[i])
            }
            
            that.setData({
              newsList: [],
              number: 0
            })
            
            wx.showToast({
              title: '已清除所有收藏',
              icon: 'success'
            })
          } catch (error) {
            console.error('清除收藏失败:', error)
            wx.showToast({
              title: '清除失败',
              icon: 'none'
            })
          }
        }
      }
    })
  },

  onShareAppMessage: function() {
    return {
      title: '我的新闻网 - 个人中心',
      path: '/pages/my/my'
    }
  }
})