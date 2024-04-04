const { Socket } = require('tcp')

const PORT = '../0002';

let socket = new Socket(PORT);
socket.bind();
socket.listen();

function accept_connections() {
    setTimeout(() => {
        socket.accept();
        accept_connections();
    }, 1000);
}

accept_connections();