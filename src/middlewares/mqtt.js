const mqtt = require('mqtt');
const mongoose = require('mongoose');
const Data = require('../models/Datos'); // Asegúrate de que la ruta al modelo sea correcta
const Node = require('../models/Node'); // Asegúrate de que la ruta al modelo sea correcta
const dataController = require('../controllers/datosController');
// Configurar el cliente MQTT

//const mqttBrokerUrl = 'http://mqtt-broker.greencoast-d0c064cb.centralus.azurecontainerapps.io:1883';
const mqttBrokerUrl = 'mqtt://172.168.129.50';

const topicDatos = 'datos/POST';
const topicConf = 'conf/POST';

const mqttClient = mqtt.connect(mqttBrokerUrl);

// Conectar y suscribirse al canal
mqttClient.on('connect', () => {
  console.log('Conectado al broker MQTT');
  mqttClient.subscribe(topicDatos, (err) => {
    if (err) {
      console.error('Error al suscribirse al canal:', err);
    } else {
      console.log(`Suscrito al canal: ${topicDatos}`);
    }
  });
  mqttClient.subscribe(topicConf, (err) => {
    if (err) {
      console.error('Error al suscribirse al canal:', err);
    } else {
      console.log(`Suscrito al canal: ${topicConf}`);
    }
  });
});

// Manejar los mensajes recibidos
mqttClient.on('message', async (topic, message) => {
  console.log(`Mensaje recibido en el canal ${topic}: ${message.toString()}`);

  try {
    const data = JSON.parse(message.toString());
    if (topic === topicDatos) {
      // Guardar los datos recibidos en la base de datos
      const result = await dataController.createData(data);
      console.log('Datos guardados exitosamente:', result);
    } else if (topic === topicConf) {
      // Actualizar la IP del nodo en la base de datos
      const { nodeId, ip } = data;
      const result = await Node.findByIdAndUpdate(nodeId, { ip }, { new: true });
      console.log('IP del nodo actualizada correctamente:', result);
    }

  } catch (error) {
    console.error('Error al procesar o guardar el mensaje:', error.message);
  }
});
