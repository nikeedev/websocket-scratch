
let websocket = new WebSocket("wss://clouddata.turbowarp.org/", ["User-Agent"]);

websocket.onerror = (event) => {
    console.log("Websocket error")
    console.log(event);
}


websocket.onopen = (event) => {
    console.log("Connection open");
    console.log(event);

    websocket.send({ "method": "handshake", "user": "nikeedev", "project_id": "777954330" });
    
    websocket.send({ "method": "set", "project_id": "777954330", "user": "nikeedev", "name": "☁ cloud", "value": 5 });

    console.log("Sent the message");

}

websocket.onmessage = (event) => {
    console.log(event);
    console.log("Receiving messages:", event.data);
}

websocket.onclose = (event) => {
    console.log(event);
    console.log("Closed connection")
}
