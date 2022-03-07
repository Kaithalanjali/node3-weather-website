const request= require('request')

const geocode=(address, callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json.json?access_token=pk.eyJ1IjoiYW5qYWxpa2FpdGhhbCIsImEiOiJja3o4djFlN3Qwenl3MnJuOWFvaTA0dWgwIn0.wZ-NjAv9nhyNvoNvAPX3-w&limit=1'
  
    request({url, json:true},(error,{body}={})=>{
      if(error){
      callback('Unable to connect with server', undefined)
      }
      else if(body.features.length==0){
        callback('Unable to find the location, try another search', undefined)
      }
      else{
        callback(undefined,{
  
          latitude:body.features[0].center[1],
          longitude:body.features[0].center[0],
          location:body.features[0].place_name
        })
      }
    })
  }
  


  module.exports=geocode