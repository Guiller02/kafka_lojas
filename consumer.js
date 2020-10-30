const { json } = require('body-parser');

const kafka = require('kafka-node'),
Consumer = kafka.Consumer,
client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'}),
consumer = new Consumer(
    client,
    [
        { topic: 'Estoque'}, { topic: 'Produto' }
    ],
    {
        autoCommit: false
    }
);

consumer.on('message', async function(message) {  
    if(message.topic=='Estoque'){
        console.log('----------------------');
        console.log('Mensagem do topico: '+message.topic);
        console.log(JSON.parse(message.value));
        console.log('----------------------');
        console.log();
    }
    else{
        console.log('----------------------');
        console.log('Mensagem do topico: '+message.topic);
        console.log(JSON.parse(message.value));
        console.log('----------------------');
        console.log();
    }
})
    consumer.on('error', function(err) {
    console.log('error', err);
});
