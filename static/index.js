
const app = () => {

  const socket = io('https://nestchat.onrender.com')

  const msgList = document.querySelector('#msgList')
  const inputUsername = document.querySelector('#inputUsername')
  const inputMessage = document.querySelector('#inputMessage')
  const btnSend = document.querySelector('#btnSend')

  const messages = []

  const getMessages = async () => {
    try {
      const {data} = await axios.get('https://nestchat.onrender.com/api/chat')

      renderMessages(data)

      data.forEach((i) => {
        messages.push(i)
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleSendMessage = (text) => {
    if (!text.trim()) return
    sendMessage({
      username: inputUsername.value || 'anonim',
      text,
      createdAt: new Date()
    })

    inputMessage.value = ''
  }

  inputMessage.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
      handleSendMessage(e.target.value)
    }
  })

  btnSend.addEventListener('click', () => {
    handleSendMessage(inputMessage.value)
  })

  const renderMessages = (data) => {
    let messages = ''

    data.forEach(m => {
      messages += `<li class="bg-dark p-2 rounded mb-2 d-flex justify-content-between message">
      <div class="mr-2">
        <span class="text-info">${m.username}</span>
        <p class="text-light">${m.text}</p>
      </div>
      <span class="text-muted text-right date">${new Date(m.createdAt).toLocaleString('ru')}</span>
    </li>`;
    })

    msgList.innerHTML = messages
  }

  getMessages()

  const sendMessage = (message) => socket.emit('send', message)
  socket.on('record', (message) => {
    messages.push(message)
    renderMessages(messages)
  })
}

app()