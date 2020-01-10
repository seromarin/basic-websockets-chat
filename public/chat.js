console.log('Soy el websocket');

//  VARIABLES        //
const ws = new WebSocket('ws:localhost:3001')
const sendMessageButton = document.getElementById('sendMessageButton')
const newMessage = document.getElementById('message')
const messageList = document.getElementById('messageList')

//  CONNECTION       //

// Abrir la conexion
ws.addEventListener('open', event => {
    // Escuchar mensajes
    ws.addEventListener('message', event => {
        console.log(`New message from server: ${event.data}`)
        createNewMessageFront('external', event.data)
    })
})

//  SEND MESSAGES    //
sendMessageButton.addEventListener('click', () => {
    console.log('Ay marikis!', newMessage.value)
    ws.send(JSON.stringify({
        id: 1,
        message: newMessage.value
    }))
    createNewMessageFront('internal', newMessage.value)
    newMessage.value = ""

})

function createNewMessageFront(source, message) {
    const newWsEvent = document.createElement('p')
    newWsEvent.className = source
    const msg = document.createTextNode(message)
    newWsEvent.appendChild(msg);
    messageList.appendChild(newWsEvent);
}

