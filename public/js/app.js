//console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search=document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e)=>{
    
    e.preventDefault()
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    //default thing , refreshing the page will be prevented
    const location=search.value
    console.log(location)
    fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            const mymessage=data.error
            messageOne.textContent=mymessage
        }
        else{
            console.log(data.location)
            console.log(data.forecast)            
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})
})