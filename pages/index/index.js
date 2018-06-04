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
  },

  onLoad(){
    this.getNow();
  },

  onPullDownRefresh(){
    this.getNow(()=>wx.stopPullDownRefresh());
  },

  getNow(callback){
    const self = this
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
        let temp = result.now.temp
        let weather = result.now.weather
        self.setData({
          nowTemp: temp + '°',
          nowWeather: weatherMap[weather],
          nowWeatherPic:'/images/'+weather+'-bg.png',
          })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather],
        })
      },
      complete: ()=>{callback && callback()}
    })
  }
})