// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  
  // 全局分享配置
  onShareAppMessage() {
    return {
      title: '我的新闻网 - 精彩资讯一手掌握',
      desc: '随时随地看新闻，精彩内容不容错过',
      path: '/pages/index/index'
    }
  }
})