var data = require('../../utils/data.js')

var map = []
var box = []
var w = 40
var row = 0
var col = 0

// 历史记录：存储每一步的状态
var history = []
var steps = 0
var undoCount = 5

Page({

  data: {
    level: 0,
    statusBarHeight: 20,
    levelNames: ['初级挑战', '进阶之路', '高手试炼', '大师关卡'],
    steps: 0,
    undoCount: 5
  },

  onLoad: function(options) {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight || 20
    })

    let level = parseInt(options.level) || 0
    this.setData({
      level: level
    })
    this.ctx = wx.createCanvasContext('myCanvas')
    this.initMap(level)
    
    const query = wx.createSelectorQuery()
    query.select('#myCanvas').boundingClientRect()
    query.exec((res) => {
      if (res[0]) {
        let size = Math.min(res[0].width, res[0].height)
        w = size / 8
        console.log('格子大小 w =', w)
        this.drawCanvas()
      } else {
        w = 80
        this.drawCanvas()
      }
    })
  },

  goBack: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  initMap: function(level) {
    let mapData = data.maps[level]
    map = []
    box = []
    history = []          // 清空历史
    steps = 0             // 重置步数
    undoCount = 5         // 重置撤回次数
    
    this.setData({
      steps: 0,
      undoCount: 5
    })
    
    for (var i = 0; i < 8; i++) {
      map[i] = []
      box[i] = []
      for (var j = 0; j < 8; j++) {
        box[i][j] = 0
        map[i][j] = mapData[i][j]
        if (mapData[i][j] == 4) {
          box[i][j] = 4
          map[i][j] = 2
        } else if (mapData[i][j] == 5) {
          map[i][j] = 2
          row = i
          col = j
        }
      }
    }
    // 保存初始状态到历史记录（此时 steps 已经重置为 0）
    this.saveHistory()
  },

  // 保存当前状态到历史记录
  saveHistory: function() {
    var state = {
      row: row,
      col: col,
      box: box.map(function(arr) {
        return arr.slice()
      }),
      steps: steps
    }
    history.push(state)
    console.log('保存历史:', history.length, '步数:', steps)
    // 如果历史记录太长，只保留最近的20步
    if (history.length > 20) {
      history.shift()
    }
  },

  drawCanvas: function() {
    let ctx = this.ctx
    let canvasSize = w * 8
    ctx.clearRect(0, 0, canvasSize, canvasSize)
    
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        let img = 'ice'
        if (map[i][j] == 1) {
          img = 'stone'
        } else if (map[i][j] == 3) {
          img = 'pig'
        }
        ctx.drawImage('/images/icons/' + img + '.png', j * w, i * w, w, w)
        if (box[i][j] == 4) {
          ctx.drawImage('/images/icons/box.png', j * w, i * w, w, w)
        }
      }
    }
    ctx.drawImage('/images/icons/bird.png', col * w, row * w, w, w)
    ctx.draw()
  },

  isWin: function() {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (box[i][j] == 4 && map[i][j] != 3) {
          return false
        }
      }
    }
    return true
  },

  checkWin: function() {
    if (this.isWin()) {
      wx.showModal({
        title: '🎉 恭喜过关！',
        content: '你用了' + steps + '步完成！太棒了！继续挑战下一关吧！',
        showCancel: false,
        confirmText: '太棒了'
      })
    }
  },

  // 撤回一步
  undoMove: function() {
    console.log('撤回前历史长度:', history.length, '撤回次数:', undoCount)
    
    if (undoCount <= 0) {
      wx.showToast({
        title: '已经没有撤回机会了！',
        icon: 'none'
      })
      return
    }
    
    if (history.length <= 1) {
      wx.showToast({
        title: '没有可以撤回的步骤',
        icon: 'none'
      })
      return
    }
    
    // 移除当前状态
    history.pop()
    // 获取上一步状态
    var lastState = history[history.length - 1]
    
    console.log('撤回后历史长度:', history.length, '上一步步数:', lastState.steps)
    
    // 恢复状态
    row = lastState.row
    col = lastState.col
    steps = lastState.steps
    
    // 恢复箱子位置
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        box[i][j] = lastState.box[i][j]
      }
    }
    
    undoCount--
    this.setData({
      steps: steps,
      undoCount: undoCount
    })
    
    this.drawCanvas()
    
    wx.showToast({
      title: '已撤回！还剩' + undoCount + '次',
      icon: 'success',
      duration: 1500
    })
  },

  up: function() {
    if (row > 0) {
      var moved = false
      if (map[row - 1][col] != 1 && box[row - 1][col] != 4) {
        row = row - 1
        moved = true
      } else if (box[row - 1][col] == 4) {
        if (row - 1 > 0) {
          if (map[row - 2][col] != 1 && box[row - 2][col] != 4) {
            box[row - 2][col] = 4
            box[row - 1][col] = 0
            row = row - 1
            moved = true
          }
        }
      }
      if (moved) {
        steps++
        this.setData({
          steps: steps
        })
        this.saveHistory()
        this.drawCanvas()
        this.checkWin()
      }
    }
  },

  down: function() {
    if (row < 7) {
      var moved = false
      if (map[row + 1][col] != 1 && box[row + 1][col] != 4) {
        row = row + 1
        moved = true
      } else if (box[row + 1][col] == 4) {
        if (row + 1 < 7) {
          if (map[row + 2][col] != 1 && box[row + 2][col] != 4) {
            box[row + 2][col] = 4
            box[row + 1][col] = 0
            row = row + 1
            moved = true
          }
        }
      }
      if (moved) {
        steps++
        this.setData({
          steps: steps
        })
        this.saveHistory()
        this.drawCanvas()
        this.checkWin()
      }
    }
  },

  left: function() {
    if (col > 0) {
      var moved = false
      if (map[row][col - 1] != 1 && box[row][col - 1] != 4) {
        col = col - 1
        moved = true
      } else if (box[row][col - 1] == 4) {
        if (col - 1 > 0) {
          if (map[row][col - 2] != 1 && box[row][col - 2] != 4) {
            box[row][col - 2] = 4
            box[row][col - 1] = 0
            col = col - 1
            moved = true
          }
        }
      }
      if (moved) {
        steps++
        this.setData({
          steps: steps
        })
        this.saveHistory()
        this.drawCanvas()
        this.checkWin()
      }
    }
  },

  right: function() {
    if (col < 7) {
      var moved = false
      if (map[row][col + 1] != 1 && box[row][col + 1] != 4) {
        col = col + 1
        moved = true
      } else if (box[row][col + 1] == 4) {
        if (col + 1 < 7) {
          if (map[row][col + 2] != 1 && box[row][col + 2] != 4) {
            box[row][col + 2] = 4
            box[row][col + 1] = 0
            col = col + 1
            moved = true
          }
        }
      }
      if (moved) {
        steps++
        this.setData({
          steps: steps
        })
        this.saveHistory()
        this.drawCanvas()
        this.checkWin()
      }
    }
  },

  restartGame: function() {
    this.initMap(this.data.level)
    this.drawCanvas()
    wx.showToast({
      title: '已重新开始',
      icon: 'success'
    })
  }
})