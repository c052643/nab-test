import dotenv from 'dotenv';
import express from 'express';
import { Kafka } from 'kafkajs';
import fetch from 'node-fetch';
import ZooClient from 'node-zookeeper-client';

const client = ZooClient.createClient('localhost:2181');

client.once('connected', function () {
  console.log('Connected to the server.');
  client.getChildren('/brokers/seqid', function (error, children, stats) {
    if (error) {
      console.log(error);
      return;
    }

    console.log('Children are: ', children);
  });
});

client.connect();
// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: async () => {
//     // Example getting brokers from Confluent REST Proxy
//     const clusterResponse = await fetch(
//       'https://localhost:2181/v3/clusters',
//     ).then((response) => response.json());
//     const clusterUrl = clusterResponse.data[0].links.self;
//     console.log('clusterURL: ', clusterUrl);
//     const brokersResponse = await fetch(`${clusterUrl}/brokers`, {
//       headers: 'application/vnd.api+json',
//     }).then((response) => response.json());

//     const brokers = brokersResponse.data.map((broker) => {
//       const { host, port } = broker.attributes;
//       return `${host}:${port}`;
//     });

//     return brokers;
//   },
// });

// const producer = kafka.producer();

// const consumer = kafka.consumer({ groupId: 'my-group-01' });

// (async () => {
//   try {
//     setTimeout(async () => {
//       await producer.connect();
//       await consumer.connect();
//       await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });
//       await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//           console.log({
//             key: message.key.toString(),
//             value: message.value?.toString(),
//             headers: message.headers,
//           });
//         },
//       });
//     }, 5000);
//   } catch (e) {
//     console.log(e);
//   }
// })();

// dotenv.config();

// const PORT = process.env.PORT || 3000;

// const app = express();

// app.get('/hello', async (req, res) => {
//   await producer.send({
//     topic: 'my-topic',
//     messages: [
//       {
//         // Name of the published package as key, to make sure that we process events in order
//         key: 'my-msg-1',

//         // The message value is just bytes to Kafka, so we need to serialize our JavaScript
//         // object to a JSON string. Other serialization methods like Avro are available.
//         value: JSON.stringify({
//           package: 'my-pkg-01',
//           version: '1.0.0',
//         }),
//       },
//     ],
//   });
//   res.send('Hello');
// });

// app.listen(PORT, () => {
//   console.log(`Server start at port ${PORT}`);
// });
