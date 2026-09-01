Page({
  data: {
    statusBarHeight: 20,
    levels: [
      'level01.png',
      'level02.png',
      'level03.png',
      'level04.png'
    ],
    levelDescs: [
      'LEVEL 1',
      'LEVEL 2',
      'LEVEL 3',
      'LEVEL 4'
    ]
  },

  onLoad: function() {
    const gameData = wx.getStorageSync('gameData') || {}
    const completedLevels = gameData.completedLevels || []
    this.setData({
      completedLevels: completedLevels,
      // 计算每关是否解锁（第0关默认解锁）
      levelUnlocked: this.data.levels.map((_, index) => {
        if (index === 0) return true
        return completedLevels.includes(index - 1)
      })
    })
  },

  chooseLevel: function(e) {
    let level = e.currentTarget.dataset.level
    wx.navigateTo({
      url: '../game/game?level=' + level
    })
  }
})