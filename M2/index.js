const amqp = require('amqplib');
const config = require('./config');
const worker = require('./workers');

const start = async () => {
  try {
    const connection = await amqp.connect(config.rabbitMQUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(config.queueName);
    await channel.assertQueue(config.resultQueueName);

    channel.consume(config.queueName, (message) => {
      const taskData = JSON.parse(message.content.toString());
      console.log('Получено задание от RabbitMQ:', taskData);

      worker.processTask(taskData)
          .then((result) => {
            channel.sendToQueue(config.resultQueueName, Buffer.from(JSON.stringify(result)));
            console.log('Результат отправлен в RabbitMQ:', result);
          })
          .catch((error) => {
            console.error('Задача обработки ошибок:', error);
          });

      channel.ack(message);
    });

    console.log('Worker в работе');
  } catch (err) {
    console.error('Ошибка запуска worker:', err);
    process.exit(1);
  }
};

start();