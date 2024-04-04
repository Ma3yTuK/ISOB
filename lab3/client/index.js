const { Socket } = require('tcp')

const PORT = '../0001';
const SERVER_PORT = '../0002';

let socket = new Socket(PORT);
socket.connect(SERVER_PORT);

function send() {
    setTimeout(() => {
        socket.send("somedata");
        send();
    }, 3000);
}

send();