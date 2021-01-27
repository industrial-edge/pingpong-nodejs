
/*
Copyright 2020 Siemens AG
This file is subject to the terms and conditions of the MIT License.  
See LICENSE file in the top-level directory
*/

var mqtt = require('mqtt')


/* Init Env Variables */
var MQTT_TOPIC1 = process.env.TOPIC_1;
var MQTT_TOPIC2 = process.env.TOPIC_2 ;
var MQTT_USER = process.env.MQTT_USER ;
var MQTT_PASSWORD = process.env.MQTT_PASSWORD;
var MQTT_IP = process.env.MQTT_IP;

try {

var params = require('/cfg-data/mqtt-config.json')

/* Init Env Variables */
var MQTT_TOPIC1 = params.TOPIC_1;
var MQTT_TOPIC2 = params.TOPIC_2;
var MQTT_USER = params.MQTT_USER ;
var MQTT_PASSWORD = params.MQTT_PASSWORD ;
var MQTT_IP = params.MQTT_IP;


}
catch (error){
}



/* MQTT Connection Option */
const options = {
    'clientId': 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    'protocolId': 'MQTT',
    'username': MQTT_USER,
    'password': MQTT_PASSWORD
}

/* Connect MQTT-Client to Databus (MQTT-Brocker) */
var client = mqtt.connect('mqtt://' + MQTT_IP, options);

/* Subscribe to Topic after connection is established */
client.on('connect', () => {
    console.log('Connected to ' + MQTT_IP);
    client.subscribe(MQTT_TOPIC1, () =>  {
        console.log('Subscribed to ' + MQTT_TOPIC1);
    });
});

/* Publish response after recieved message*/
client.on('message', function (topic, message) {
    msg = message.toString()
    console.log(`Recieved message ${msg} on MQTT-Topic ${MQTT_TOPIC1} responding with corresponding answer`)
    if (msg == 'Ping') {
        client.publish(MQTT_TOPIC2, 'Pong');
    } else if (msg == 'Pong') {
        client.publish(MQTT_TOPIC2, 'Ping');
    } else {
        client.publish(MQTT_TOPIC2, 'I only answer to Ping or Pong');
    }
});
