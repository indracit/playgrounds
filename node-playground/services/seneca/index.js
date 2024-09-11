var seneca = require('seneca')({timeout:50000})

function test(options) {
    this.add('cmd:sum', (msg, reply) => {
    reply(null, { answer: (msg.left + msg.right) });
  });
}


seneca
    .use('transport')
    .use(test)
  .listen({port : '4000' });
