const express = require('express')
const app = express();
var cors = require('cors')

var whitelist = ['http://localhost:5173','http://localhost:3000']
var corsOptions = {
  
  origin: function (origin, callback) {
    // console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
      // callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions))

app.use((req,res)=>{
    res.send({'message':'hi'})
})


app.listen('3000',()=>{
    console.log('server running in 3000')
})