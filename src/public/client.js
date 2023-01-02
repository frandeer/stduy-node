;(() => {



const socket = new WebSocket(`ws://${window.location.host}/ws`)

const formEl = document.getElementById('form')
const chatsEl = document.getElementById('chats')

if(!formEl) {
  throw new Error('No form element')
}

const chats = []

// 랜던 닉네임
const adjectives = ['멋진','훌룡한', '친절한', '새침한']
const animals = ['사자', '곰', '돌고래', '사슴','독수리', '매']

const nickName = `${pickRandom(adjectives)} ${pickRandom(animals)}`

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault()
  const inputEl = document.getElementById('input')
  if(!inputEl) {
    throw new Error('No input element')
  }

  if(!inputEl.value) return

  socket.send(
    JSON.stringify({
      message: inputEl.value,
      nickname: nickName
    })
  )
  inputEl.value = ''
})

function drawChat() {
  chatsEl.innerHTML = ''
  chats.forEach(chat => {
    const liEl = document.createElement('div')
    liEl.innerText = `${chat.nickname}: ${chat.message}`
    chatsEl.appendChild(liEl)
  })
}

socket.addEventListener('open', (event) => {
  console.log('WebSocket open')
})

function IsJsonString(str) {
  try {
    var json = JSON.parse(str);
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}

socket.addEventListener('message', (event) => {
  
  if(!IsJsonString(event.data)) {
    return
  }

    var msg = JSON.parse(event.data)

  if (msg.type === 'init') {
    console.log('====================================');
    console.log('init', msg.payload);
    console.log('====================================');
    chats.push(...msg.payload)
    drawChat()
  } else if (msg.type === 'chat') {
    chats.push(msg.payload)
  }

  drawChat()
})

socket.onclose = () => {
  console.log('Disconnected from server')
}

})()
  

