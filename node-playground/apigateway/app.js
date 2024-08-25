const express = require('express')
const app = express();
var cors = require('cors')
const {rabbitInit,rabbitTerminate,publishMessage} = require('./utils/mqutil') 

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

app.use(async (req,res)=>{
    await publishMessage('hi da consumer');
    res.send({'message':'hi'})
})


app.listen('3000',()=>{
    console.log('server running in 3000');
    rabbitInit().then(()=>{
      console.log('rabbit connection initiated');
    }).catch((e)=>{
      console.log('rabbit connection intiation failed',e)
    })
})


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
process.on('unhandledRejection', (reason, p) => {
  console.log("###########################################################");
  console.log("Application Error");
  console.log("###########################################################");
  console.log('Unhandled Rejection at:', p, 'reason:', reason);

});

process.on('uncaughtException',async function (err) {
  console.log("###########################################################");
  console.log("Application Error");
  console.log("###########################################################");
  console.log('uncaughtException :', err);
  //logMaintainanceReason({Time:Date(), Error: `${err}`});
});
