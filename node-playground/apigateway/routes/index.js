const router = require('express').Router()
const userController = require('../controllers/index')

router.post('/createUser', userController.createUser)

router.post('/seneca',userController.senecaTest)

  router.get('*', (req, res) => {
    res.send('not found')
  })

module.exports = router

