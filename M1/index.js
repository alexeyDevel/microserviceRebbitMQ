const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const { consumeResultFromRabbitMQ, createRabbitMQConnection } = require('./services/rabbitMQService');
const app = express();

app.use(bodyParser.json());

createRabbitMQConnection()
  .then(() => {
    consumeResultFromRabbitMQ();
    
    const routes = require('./routes');
    app.use(routes);

    app.listen(config.port, () => {
      console.log(`Сервер M1 запущен на порту ${config.port}`);
    });

    process.on('SIGINT', async () => {
      const { getRabbitMQChannel, getRabbitMQConnection } = require('./services/rabbitMQService');
      const channel = getRabbitMQChannel();
      const connection = getRabbitMQConnection();
      if (channel) {
        await channel.close();
      }
      if (connection) {
        await connection.close();
      }
      console.log('Сервер M1 завершает работу');
      process.exit();
    });
  })
  .catch((err) => {
    console.error('Ошибка при создании соединения и канала:', err);
  });
