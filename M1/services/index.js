const rabbitMQService = require('./rabbitMQService');

module.exports = {
  sendTaskToRabbitMQ: rabbitMQService.sendTaskToRabbitMQ,
};
