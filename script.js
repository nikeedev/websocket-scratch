
let websocket = new WebSocket("wss://clouddata.turbowarp.org/", ["User-Agent"]);

websocket.onerror = (event) => {
    console.log("Websocket error");
    console.log(event);
}


websocket.onopen = (event) => {
    console.log("Connection open");
    console.log(event);

    websocket.send(JSON.stringify({ "method": "handshake", "user": "nikeedev", "project_id": "turbowarp.org/777954330" }));

    setTimeout(function() {
        websocket.send(JSON.stringify({ "method": "set", "project_id": "turbowarp.org/777954330", "user": "nikeedev", "name": "☁cloud", "value": 5 }));
    }, 500);

    console.log("Sent the message");

}

websocket.onmessage = (event) => {
    console.log(event);
    
    setInterval(() => {
        console.log("Receiving messages:", event.data);
    }, 1000);
}

websocket.onclose = (event) => {
    console.log(event);
    console.log("Closed connection")
}
