const amqp = require('amqplib');
const config = require('../config');

let connection = null;
let channel = null;

async function createRabbitMQConnection() {
  try {
    connection = await amqp.connect(config.rabbitMQUrl);
    channel = await connection.createChannel();
    await channel.assertQueue(config.queueName);
    await channel.assertQueue(config.resultQueueName);
  } catch (err) {
    console.error('Ошибка при создании соединения и канала:', err);
    throw err;
  }
}

function getRabbitMQConnection() {
  return connection;
}

function getRabbitMQChannel() {
  return channel;
}

async function sendTaskToRabbitMQ(requestData) {
  try {
    await channel.assertQueue(config.queueName);

    channel.sendToQueue(config.queueName, Buffer.from(JSON.stringify(requestData)));

    console.log('Задание успешно отправлено в RabbitMQ');

    return 'Задание успешно отправлено в RabbitMQ';
  } catch (err) {
    console.error('Ошибка при отправке задания в RabbitMQ:', err);
    throw err;
  }
}

async function consumeResultFromRabbitMQ() {
  try {
    const queue = config.resultQueueName;
    await channel.assertQueue(queue);

    channel.consume(
      queue,
      (msg) => {
        if (msg.content) {
          const result = JSON.parse(msg.content.toString());
          console.log('Результат выполнения задания:', result);
        }
      },
      { noAck: true }
    );

    console.log('Ожидание результатов заданий...');
  } catch (err) {
    console.error('Ошибка при подписке на результаты заданий:', err);
  }
}

module.exports = {
  sendTaskToRabbitMQ,
  consumeResultFromRabbitMQ,
  createRabbitMQConnection,
  getRabbitMQConnection,
  getRabbitMQChannel,
};
