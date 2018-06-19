const weatherMap = {
  'sunny':'晴天',
  'cloudy':'多云',
  'overcast':'阴',
  'lightrain':'小雨',
  'heavyrain':'大雨',
  'snow':'雪',
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data: {
    nowTemp: '',
    nowWeather: '',
    nowWeatherPic:'',
    nowNavigationBar:'',
    hourlyTime: [],
    today:'',
    todayTemp:''
  },

  onLoad(){
    this.getNow();
  },

  onPullDownRefresh(){
    this.getNow(()=>wx.stopPullDownRefresh());
  },

  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '北京'
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        this.setNow(result)
        this.setForecast(result)
        this.setToday(result)
      },
      complete: ()=>{callback && callback()}
    })
  },

  setNow(result){
    let temp = result.now.temp
    let weather = result.now.weather
    this.setData({
      nowTemp: temp + '°',
      nowWeather: weatherMap[weather],
      nowWeatherPic: '/images/' + weather + '-bg.png',
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weather],
    })
  },

  setForecast(result){
    let forecast = result.forecast
    let nowHour = new Date().getHours()
    let hourlyTime = []
    for (let i = 0; i < 8; i++) {
      hourlyTime.push({
        time: (nowHour + i*3) % 24 + '时',
        weather: '/images/' + forecast[i].weather + '-icon.png',
        temp: forecast[i].temp + '°'
      })
      hourlyTime[0].time='现在'
    }
    this.setData({ hourlyTime })
  },

  setToday(result){
    let today = new Date()
    console.log(today)
    this.setData({
      today: today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay() + ' 今天',
      todayTemp: result.today.minTemp + '° - ' + result.today.maxTemp + '°'
    })
  },

  showToast(){
    wx.navigateTo({
      url: '/pages/list/list',
    })
  }
})