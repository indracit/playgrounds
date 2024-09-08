const User = require('../models/index')
const userController = {}

userController.createUser = async (req,res)=>{
    const {username,password} = req.body;
    const user = new User({ username,password });
    await user.save();
    res.send('created')
}

module.exports = userController;


