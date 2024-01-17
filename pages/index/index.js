// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    touchS: [0, 0],
    touchE: [0, 0],
    touches: [{
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 0
    }],
    lastX: 0,
    lastY: 0,
    showCircle: false,
    r: 0,
    imagewidth: 0,
    moveX1: 0,
    moveY1: 0,
    moveX: 0,
    moveY: 0,
    showCircle1: false,
    choose: 0,
    device: false,
    position: true
  },
  finger() {
    this.setData({
      choose: 1
    })
  },
  virtual() {
    this.setData({
      choose: 0
    })
  },
  // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad() {
    let that = this
    wx.getSystemInfo({
      success(res) {
        // console.log(res.model)
        if (res.model.indexOf("iPad") != -1) {
          that.setData({
            device: true
          })
        }
      }
    })
  },

  touchStart: function (e) {
    if (e.touches.length == 3) {
      console.log(e.touches)
      this.setData({
        position: true,
        showCircle: true        
      })
      this.draw(e)
    }
    if (e.touches.length == 1) {
      this.setData({
        // touchS: [e.touches[0].pageX, e.touches[0].pageY],
        position: false
      })
    }
  },
  touchmove: function (e) {
    if (e.touches.length == 3) {
      console.log("moving:", e.touches)
      this.setData({
        position: true,
        // showCircle: true
      })
      this.draw(e)
    }
    if (e.touches.length == 1) {
      this.setData({
        // touchS: [e.touches[0].pageX, e.touches[0].pageY],
        position: false
      })
    }
  },
  touchend: function (e) {
    if (e.touches.length == 3) {
      this.setData({
        position: false
      })
    }
    if (e.touches.length == 1) {
      this.setData({
        position: false
      })
    }
  },

  draw: function (e) {
    let x1 = e.touches[0].pageX
    let x2 = e.touches[1].pageX
    let x3 = e.touches[2].pageX
    let y1 = e.touches[0].pageY
    let y2 = e.touches[1].pageY
    let y3 = e.touches[2].pageY
    var a, b;
    a = (y2 - y1) / (x2 - x1);
    b = y1 - a * x1;
    var xMiddle = (x1 + x2) / 2;
    var yMiddle = (y1 + y2) / 2;
    var c, lastX, lastY;
    if (a != 0) {
      c = yMiddle - (-1 / a) * xMiddle;
      lastX = (Math.pow(x1, 2) + Math.pow(y1, 2) - Math.pow(x3, 2) - Math.pow(y3, 2) - 2 * c * y1 + 2 * c * y3) / (2 * ((x1 - x3) - (1 / a) * (y1 - y3)));
      lastY = (-1 / a) * lastX + c;
    } else {
      lastX = c = xMiddle;
      lastY = (Math.pow(x1, 2) + Math.pow(y1, 2) - Math.pow(x3, 2) - Math.pow(y3, 2) + 2 * lastX * (x3 - x1)) / (2 * (y1 - y3));
    }
    // console.log("定位点X坐标: " + lastX);
    // console.log("定位点Y坐标: " + lastY);
    let a1 = lastX - x1;
    let b1 = lastY - y1;
    let r = Math.sqrt(a1 * a1 + b1 * b1);

    const scrvId = "#scrv"
    const query = wx.createSelectorQuery().in(this)
    query.select(scrvId).scrollOffset()
    let that = this
    query.exec(function (res) {
      // console.log(res)
      res[0].scrollTop // scroll-view的竖直滚动位置
      that.setData({
        moveX: res[0].scrollLeft,
        moveY: res[0].scrollTop
      })
      that.setData({
        lastX: lastX + that.data.moveX,
        lastY: lastY + that.data.moveY,
        r: r,
        // position: 'fixed'
      })
    })

  },
})