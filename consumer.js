const Estoque = require('./database/model/estoque');
const Loja = require('./database/model/loja');
const Produto = require('./database/model/produto');
const kafka = require('kafka-node'),

Consumer = kafka.Consumer,
client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'}),
consumer = new Consumer(
    client,
    [
        {topic: 'Estoque'}, { topic: 'Produto' },{ topic: 'Loja' }
    ],
    [{
        fromOffset: 'latest',
        autoCommit: false
    }]
);

function printarMensagem(message){
    console.log('----------------------');
    console.log('Mensagem do topico: '+message.topic);
    console.log(JSON.parse(message.value));
    console.log('----------------------');
    console.log();
}

consumer.on('message', async function(message) {  
    messageValue = JSON.parse(message.value)

    switch (message.topic) {
        case 'Estoque':
            await Estoque.create({
                IdProduto:messageValue.IdProduto,
                QTDBaixada:messageValue.QTDBaixada,
                QdMovimento:messageValue.QdMovimento,
                TpMovimento:messageValue.TpMovimento,
                IdLoja:messageValue.IdLoja,
                TsMovimento:messageValue.TsMovimento
            });

            printarMensagem(message)
            break;

        case 'Loja':
            await Loja.create({
                IdLoja:messageValue.IdLoja,
                NmLoja:messageValue.NmLoja,
                DsEndereco:messageValue.DsEndereco,
                DsCidade:messageValue.DsCidade,
                DsUf:messageValue.DsUf,
                FlFechado:messageValue.FlFechado
            });

            printarMensagem(message)
            break;
    
        case 'Produto':
            await Produto.create({
                id_produto:messageValue.id_produto,
                dsProduto:messageValue.dsProduto,
                txProduto:messageValue.txProduto,
                vlProduto:messageValue.vlProduto,
                flBloqueado:messageValue.flBloqueado,
                QdEstoque:messageValue.QdEstoque
            });
            printarMensagem(message)
            break;
            
    }
})
    consumer.on('error', function(err) {
    console.log('error', err);
});
