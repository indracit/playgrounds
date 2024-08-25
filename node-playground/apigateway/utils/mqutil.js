const amqp 	= require('amqplib');

const URL = 'amqp://guest:guest@127.0.0.1:5672/indracit';
const EXCHANGE 	 = 'LOGX';
const ROUTING_KEY	 = 'LOG';
const QUEUENAME = 'LOGQ';

var conn,channel;
 exports.rabbitInit = async () => {
    conn = await amqp.connect(URL);
	channel = await conn.createChannel();
}


exports.publishMessage = async (message) => {
    try {

    await channel.assertExchange(EXCHANGE, 'direct', {durable: true});
	await channel.assertQueue(QUEUENAME, { durable: true });
	await channel.bindQueue(QUEUENAME, EXCHANGE, ROUTING_KEY);
	await channel.publish(EXCHANGE, ROUTING_KEY, new Buffer.from(message));

    }
    catch(e){
        console.log(e);
    }
}

exports.rabbitTerminate = async () => {
    await channel.close();
	await conn.close();
}







