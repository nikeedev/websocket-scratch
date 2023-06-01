// Write the alphabet from lower to upper case
// let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
// let alphabet_len = alphabet.length;
// let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
// let alphabet_len = alphabet.length;

let input_data = document.getElementById("input-data"), send_button = document.getElementById("send-button"), project_id_used = document.getElementById("project-id-used");

const project_id = 859836142;

let wss = new WebSocket("wss://clouddata.scratch.mit.edu");

console.log()

wss.onerror = (event) => {
    console.log("Websocket error");
    console.log(event);
}

const variable_name = "message";

wss.onopen = async (event) => {
    console.log("Connection open");
    console.log(event);

    project_id_used.innerHTML += `<a style="text-decoration: none;" href="https://scratch.mit.edu/projects/${project_id}" target="_blank"><code id="project-id" style="background-color:rgb(224, 224, 224); color: rgb(31, 18, 18);">scratch.mit.edu/projects/${project_id}</code></a>`;

    /// Handshake request \
    await wss.send(JSON.stringify({ "method": "handshake", "user": "nikeedev", "project_id": project_id }));
    /// Handshake request /


    setTimeout(async () => {
        await wss.send(JSON.stringify({ "method": "set", "project_id": project_id, "user": "nikeedev", "name": "☁ " + variable_name, "value": 7 }));
    }, 500);

    
    setInterval(() => {
        send_button.onclick = async (event) => {
            await wss.send(JSON.stringify({ "method": "set", "project_id": project_id, "user": "nikeedev", "name": "☁ " + variable_name, "value": input_data.value }));
            console.log("Value " + input_data.value + " sent");
        }
    }, 1000);
    

    console.log("Sent the message");

}

wss.onmessage = (event) => {
    console.log(event);
    
    setInterval(() => {
        console.log("Receiving messages:", event.data);
    }, 500);
}

wss.onclose = (event) => {
    console.log(event);
    console.log("Closed connection")
}

function update() {
    variable_name = name_data.value;
    task = task_data.value;
    // console.log("Var name: " + variable_name)

    requestAnimationFrame(update);
}
requestAnimationFrame(update);

send_button.onclick = (event) => {
    if (task == "rename") {
        JSON.stringify({ "method": "rename", "name": "☁ " + variable_name, "value": input_data.value });
    } 
    websocket.send();
    console.log("Value " + input_data.value + " sent");
}
