// Write the alphabet from lower to upper case
// let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
// let alphabet_len = alphabet.length;


let input_data = document.getElementById("input-data"),
send_button = document.getElementById("send-button"),
project_id_used = document.getElementById("project-id-used");

const project_id = "859836142";

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
    await wss.send(JSON.stringify({ "method": "handshake", "user": "nikeedev", "project_id": project_id }) + "\n");
    /// Handshake request /
    
    await new Promise((r) => setTimeout(r, 100));

    send_button.onclick = async (event) => {
        await wss.send(JSON.stringify({
            "method": "set",
            "project_id": project_id,
            "user": "nikeedev",
            "name": "☁ " + variable_name,
            "value": input_data.value
            }) + "\n");
        console.log("Value " + input_data.value + " sent");
    }

    console.log("Sent the message");

}

wss.onmessage = (event) => {
    console.log(event);
    
    setInterval(() => {
        console.log("Receiving messages:", event.data);
    }, 500);
}

wss.onclose = console.error;
