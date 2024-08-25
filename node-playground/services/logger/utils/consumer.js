const amqp 	= require('amqplib');

const URL = 'amqp://guest:guest@127.0.0.1:5672/indracit';
const QUEUENAME = 'LOGQ';


 exports.initConsumer = async () => {
    var connection = await amqp.connect(URL);
	var RabbitChannel = await connection.createChannel();

	await RabbitChannel.assertQueue(QUEUENAME, { durable: true });

	console.log(`Waiting for messages in queue: ${QUEUENAME}`);

	RabbitChannel.consume(QUEUENAME, async (msg) => {
        if (msg !== null) {
          try {
            console.log(msg.content.toString());
            RabbitChannel.ack(msg);
          } catch (error) {
            console.error('Error processing message:', error);
            RabbitChannel.nack(msg, false, true);
          }
        } else {
          console.log('Consumer cancelled by server');
          reject(new Error('Consumer cancelled by server'));
        }
      }, { noAck: false })
}



exports.rabbitTerminate = async () => {
    await RabbitChannel.close();
	await connection.close();
}







