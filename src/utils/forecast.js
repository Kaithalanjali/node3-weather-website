const request=require('request')

const forecast=(latitude,longitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=e7a533636802ad59f96c507cea9f913a&query='+latitude+','+ longitude + '&units=f'
    request( {url, json:true},(error, {body}={})=>{
      if(error){
    callback('Unable to connect with server', undefined)
  }
  else if(body.error){
    callback('Unable to find location', undefined)
  }
  else{
    callback(undefined,body.current.temperature +'  is current temperature and weather of today is '+ body.current.weather_descriptions 
    )
    }
  })
  }

  module.exports=forecast