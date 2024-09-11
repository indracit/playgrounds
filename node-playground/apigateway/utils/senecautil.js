var seneca = require('seneca')().use('transport').client({port: 4000, pin: 'cmd:sum',timeout: 50000})


module.exports = seneca;