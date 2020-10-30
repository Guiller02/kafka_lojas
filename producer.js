const express = require("express");
const kafka = require("kafka-node");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

(Producer = kafka.Producer),
  (client = new kafka.KafkaClient({ kafkaHost: "192.168.1.56:9092" })),
  (producer = new Producer(client));

producer.on("ready", function () {
  console.log("Producer is ready");
});

producer.on("error", function (err) {
  console.log("Producer is in error state");
  console.log(err);
});

app.listen(3000, function () {
  console.log("Kafka producer running at 3000");
});

app.post("/sendMsg", async function (req, res) {
  const sentMessage = req.body.message;

  const sentMessageLog = {};
  sentMessageLog.topico = req.body.topic;
  sentMessageLog.DTMensagem = new Date();
  sentMessageLog.StatusMensagem = 0;
  sentMessageLog.mensagem = sentMessage;

  payloads = [{ topic: req.body.topic, messages: JSON.stringify(sentMessage) }];

  logPayloads = [
    { topic: "log_topic", messages: JSON.stringify(sentMessageLog) },
  ];

  await producer.send(payloads, function (err, data) {
    if (err) {
      console.log(err);
    }
    console.log("foi o primeiro:");
    console.log(data);
    console.log("--------------------");
  });

  await producer.send(logPayloads, function (err, data) {
    if (err) {
      console.log(err);
    }
    console.log("foi o segundo");
    console.log(data);
    console.log("--------------------");
  });
  console.log("terminou");
  res.send("Foi escrito no topico: " + req.body.topic);
});
