// Write the alphabet from lower to upper case
// let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
// let alphabet_len = alphabet.length;

let input_data = document.getElementById("input-data"),
send_button = document.getElementById("send-button"),
project_id_used = document.getElementById("project-id-used");

const projectid = "859836142";


const username = "___22___", password = "___11___";

const response = fetch('https://scratch.mit.edu/login/', {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      'X-Requested-With': 'XMLHttpRequest',
      'Set-Cookie': 'scratchcsrftoken="a"',
      'X-CSRFToken': 'a'
    },
    referrer: 'https://scratch.mit.edu',
    redirect: "follow", // manual, *follow, error
    body: JSON.stringify({username: username, password: password}), // body data type must match "Content-Type" header
});

console.log(response.then((resp) => {return resp}))



const wss = new WebSocket(
    "wss://clouddata.scratch.mit.edu/",
    [],
    {
        'headers': {
            'Cookie': `scratchsessionid=${sessionid};`
        }
    }
);

console.log()

wss.onerror = (event) => {
    console.log("Websocket error");
    console.log(event);
}

const variable_name = "message";
const number_value = "7";

wss.addEventListener("open", async (event) => {
    console.log("Connection open");
    console.log(event);

    project_id_used.innerHTML += `<a style="text-decoration: none;" href="https://scratch.mit.edu/projects/${projectid}" target="_blank"><code id="project-id" style="background-color:rgb(224, 224, 224); color: rgb(31, 18, 18);">scratch.mit.edu/projects/${projectid}</code></a>`;

    /// Handshake request \
    wss.send(`${JSON.stringify({ "method": "handshake", "project_id": projectid, "user": username })}\n`);
    console.log("Sent the message");
    /// Handshake request /
    
    await wss.send(`${JSON.stringify({
        "value": number_value,
        "name": "☁ message",
        "method": "set",
        "project_id": projectid,
        "user": username
    })}\n`);
    console.log("Value " + number_value + " sent");
    
});

wss.onmessage = (event) => {
    console.log(event);
    
    setInterval(() => {
        console.log("Receiving messages:", event);
    }, 500);
}

wss.onclose = console.error;
