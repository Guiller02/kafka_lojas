const { json } = require("body-parser");

<<<<<<< HEAD
const kafka = require('kafka-node'),
Consumer = kafka.Consumer,
client = new kafka.KafkaClient({kafkaHost: '192.168.1.56:9092'}),
consumer = new Consumer(
=======
const kafka = require("kafka-node"),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient({ kafkaHost: "192.168.1.56:9092" }),
  consumer = new Consumer(
>>>>>>> cdc3aa84e6c9062497b02a2d133b02d8fa12f6a1
    client,
    [{ topic: "log_topic" }],
    [
      {
        autoCommit: false,
        fromOffset: "latest",
      },
    ]
  );

consumer.on("message", async function (message) {
  console.log("----------------------");
  console.log(JSON.parse(message.value));
  console.log("----------------------");
  console.log();
});
consumer.on("error", function (err) {
  console.log("error", err);
});
