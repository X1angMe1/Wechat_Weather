// pages/list/list.js
const weekdayMap = {
  '0': '星期天',
  '1': '星期一',
  '2': '星期二',
  '3': '星期三',
  '4': '星期四',
  '5': '星期五',
  '6': '星期六',
}

Page({
  data: {
    futureInfo: []
  },

  onLoad() {
    this.getFuture();
  },

  onPullDownRefresh() {
    this.getFuture(() => wx.stopPullDownRefresh());
  },

  getFuture(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city: '北京',
        time: new Date().getDate()
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let result = res.data.result
        this.setWeekWeather(result)
        
      },
      
      complete: () => { callback && callback() }
    })
  },

  setWeekWeather(result){
    let today = new Date()
    let day = new Date().getDay()
    let futureInfo = []
    for (let i= 0; i<7; i++)
    {
      futureInfo.push(
        {
          date: today.getFullYear()+'-'+ (today.getMonth() + 1) +'-'+(today.getDate()+i),
          day: weekdayMap[(day+i)%7],
          weather: result[i].weather,
          temp: result[i].minTemp + '° - ' + result[i].maxTemp + '°',
        }
      )
    }
    futureInfo[0].day='今天'
    this.setData({ futureInfo })
  },
})