//require('dotenv').config({ path: '.example.env' });

module.exports = {
    rabbitMQUrl: process.env.RABBITMQ_URL,
    queueName: process.env.QUEUE_NAME,
    resultQueueName: process.env.QUEUE_RESULT_NAME || 'tasksResult'
};
