const express = require('express')
const app = express();
var cors = require('cors')
const {rabbitInit,rabbitTerminate,publishMessage} = require('./utils/mqutil') 
const route = require('./routes/index')
const mongoose = require('mongoose');

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
app.use(express.json())
app.use((req,res,next)=>{
  publishMessage(JSON.stringify({payload:req.body,url:req.origin}));
  next();
})

app.use(route)

app.listen('3000',()=>{
    console.log('server running in 3000');
    mongoose.connect('mongodb://localhost:27017/playground', {
      authSource: "admin",
      user: "admin",
      pass: "admin"})
    .catch(error => console.log(error));
    rabbitInit().then(()=>{
      console.log('rabbit connection initiated');
    }).catch((e)=>{
      console.log('rabbit connection intiation failed',e)
    })
})

mongoose.connection.on('connected', () => console.log('mongodb connected'));
mongoose.connection.on('open', () => console.log('mongodb  connection opened'));
mongoose.connection.on('disconnected', () => console.log('mongodb disconnected'));
mongoose.connection.on('reconnected', () => console.log('mongodb reconnected'));
mongoose.connection.on('disconnecting', () => console.log('mongodb disconnecting'));
mongoose.connection.on('close', () => console.log('mongodb connection closed'));

process.on('SIGINT',async function () {
  // shut down the mongoose connections
  try {
      console.log('Received Signal To Shutdown Server...Wait For Sometime....');
      await rabbitTerminate()
      setTimeout(() => { console.log('Closed all connections') }, 500);
      process.exit(0);
  } catch (err) {
      console.log('error while operating with RabbitMQ' + err)
      console.log(err);
      process.exit(0);
  }
});
// process.on('unhandledRejection', (reason, p) => {
//   console.log("###########################################################");
//   console.log("Application Error");
//   console.log("###########################################################");
//   console.log('Unhandled Rejection at:', p, 'reason:', reason);

// });

// process.on('uncaughtException',async function (err) {
//   console.log("###########################################################");
//   console.log("Application Error");
//   console.log("###########################################################");
//   console.log('uncaughtException :', err);
//   //logMaintainanceReason({Time:Date(), Error: `${err}`});
// });
