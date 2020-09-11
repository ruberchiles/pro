//https://www.eclipse.org/paho/clients/js/

function LED1_On() {
	
	console.log("Solicita Historial");
        message = new Paho.MQTT.Message("Solicita de historial");
        message.destinationName = "ruberchiles@hotmail.es/test1";
        client.send(message);
}
// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  
  var options = {
   useSSL: false,
    userName: "ruberchiles@hotmail.es",
    password: "Campeones1",
    onSuccess:onConnect,
   
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {    
    console.log("Conectado...");	
    client.subscribe("ruberchiles@hotmail.es/test");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "ruberchiles@hotmail.es/test1";
    client.send(message);
  }
  
  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message1) {
    console.log("Hora:"+message1.payloadString);
    document.getElementById("sensor").innerHTML=message1.payloadString.split("=")[1];
    
  }
  
  
