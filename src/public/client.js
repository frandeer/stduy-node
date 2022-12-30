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

socket.addEventListener('error', (event) => {
  console.log('WebSocket error: ', event)
}) 


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

socket.onmessage = (event) => {
  
  if(!IsJsonString(event.data)) {
    return
  }
  chats.push(JSON.parse(event.data))
  
  chatsEl.innerHTML = ''

  chats.forEach(chat => {
    const div = document.createElement('div')
    div.innerHTML = `${chat.nickname}: ${chat.message}`
    chatsEl.appendChild(div)
  })



}

socket.onclose = () => {
  console.log('Disconnected from server')
}

socket.onopen = () => { //webSocket이 맺어지고 난 후, 실행
	  // console.log(socket.readyState ? 'open' : 'closed');
    // socket.send('Hello from client');
}
// socket.send('Hello from client')
// 
})()
  

