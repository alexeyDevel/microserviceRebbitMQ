//require('dotenv').config({ path: '.example.env' });

module.exports = {
    port: process.env.PORT  || '4000',
    rabbitMQUrl: process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672',
    queueName: process.env.QUEUE_NAME  || 'tasks',
    resultQueueName: process.env.QUEUE_RESULT_NAME || 'tasksResult'
};
  