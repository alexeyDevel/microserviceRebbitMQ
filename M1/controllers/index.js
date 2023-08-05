const taskService = require('../services');

async function processTask(req, res) {
  const requestData = req.body;

  try {
    // Отправка задания в RabbitMQ
    const result = await taskService.sendTaskToRabbitMQ(requestData);

    // Отправка результата клиенту
    res.status(200).json({ result });
  } catch (err) {
    console.error('Ошибка при отправке задания в RabbitMQ:', err);
    res.status(500).json({ error: 'Произошла ошибка' });
  }
}

module.exports = {
  processTask,
};
