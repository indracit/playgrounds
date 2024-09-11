const User = require('../models/index')
const userController = {}
const seneca = require('../utils/senecautil')

userController.createUser = async (req,res)=>{
    const {username,password} = req.body;
    const user = new User({ username,password });
    await user.save();
    res.send('created')
}

userController.senecaTest = async (req,res) => {
    
    seneca.act(req.body,(err, reply)=>{
        ///console.log(err, reply)
        res.status(200).send(reply)
      })

}

module.exports = userController;


