async function processTask(taskData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = { task: taskData, processed: true };
            resolve(result);
        }, 2000); // Задержка в 2 секунды для демонстрации
    });
}

module.exports = {
    processTask,
};
