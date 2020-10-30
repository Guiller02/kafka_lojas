const { json } = require('body-parser');

const kafka = require('kafka-node'),
Consumer = kafka.Consumer,
client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'}),
consumer = new Consumer(
    client,
    [
        { topic: 'log_topic'}
    ],
    {
        autoCommit: false
    }
);

consumer.on('message', async function(message) {  
        console.log('----------------------');
        console.log(JSON.parse(message.value));
        console.log('----------------------');
        console.log();
})
    consumer.on('error', function(err) {
    console.log('error', err);
});
