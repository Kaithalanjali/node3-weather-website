const path=require('path')
const express= require('express')
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')
const { response } = require('express')
 console.log(__dirname)
//  console.log(path.join(__dirname, '../public'))
 const app= express()
const port=process.env.PORT || 3000
 //Define paths for Express config
const publicDirectoryPath=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//views is the default path for express to have hbs
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
    name:'Anjali kaithal'    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
    name:'Anjali kaithal'    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Anjali kaithal'
    })
})

//app.com



//  app.get('/help',(req,res)=>{
    //these is for static things(html,js object etc)
    //      res.send([{
        //          name:'Anjali',
//          age:21
//      },{
//         name:'Anjali',
//         age:21
//     }])
//  })
//app.com/help

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a address in query'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
          return res.send({error})
        }
        
        // console.log('Error', error)
        // console.log('Data', data)
        forecast(latitude,longitude, (error, forecastdata) => { 
          if(error){  
            return res.send({error})
          }
         res.send({
             forecast: forecastdata,
             location,
             address:req.query.address
         })
        })
      })
    // res.send({
    //     forcast:'Sunny weather',
    // location:'Philodophia',
    // address:req.query.address
    // })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        //we are using return here because then another console code will not run, thus avoiding two console on single time
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)    
    res.send({
        products:[]
    }
    )
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Andrew Mead',
        errorMessage:'Help article page not found'
    })
})
app.get('/about/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Andrew Mead',
        errorMessage:'Help article page not found'
    })
}) 

app.get('*',(req, res)=>{
    //this func descride what to send back
    res.render('404',{
        title:'404',
        name:'Abdrew Mead',
        errorMessage:'Page not found'
    })
}) 
//app.com/weather

 app.listen(port,()=>{
     console.log('Server is on port' + port)
    })
    //hbs(handle behind scene) is used to integrate handle bars with express