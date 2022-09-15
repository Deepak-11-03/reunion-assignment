const express =require('express')
const mongoose =require('mongoose')
const route =require('./routes/route.js')
const app = express()


app.use(express.json())

app.use('/', route)



mongoose.connect('mongodb+srv://testing:TXPxQZxsp8BSnQb9@cluster0.jhebhrt.mongodb.net/reunion').then(()=>{
    console.log('Connected')
})
.catch(err=>{
    console.log(err)
})

app.listen( process.env.Port || 3000 ,function(){
    console.log('App running on port ' + (process.env.PORT || 3000))
});