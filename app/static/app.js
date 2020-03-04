const btn = document.getElementById('numberBtn')
const input = document.getElementById('numberInput')
const output = document.getElementById('output')
const loading = document.getElementById('lds-ring')

btn.addEventListener('click', () => {
  let data = input.value
  loading.classList.remove('hidden')
  clean()
  
  fetch('http://localhost:8080/pi/' + data)

  .then((res) => res.json())
  
  .then((data) => {
    loading.classList.add('hidden')

    let index = data['index']
    let msg =  data['text'] + ' ...'
    if(index != 0) {
      msg = '...' + msg
    }

    output.innerHTML = "<h2>your number was found at index " + index + "</h2><br>"
    output.innerHTML += clearStr(msg)
  })

  .catch(() => {
    loading.classList.add('hidden')
    alert('something went wrong, try again')
  })
})

input.addEventListener('keyup', (event) => {
  if(event.keyCode === 13) {
    event.preventDefault();
    btn.click()
  }
})

function clean() {
  output.innerHTML = ''
}

function clearStr(msg) {
  let tmp = msg.replace('s', ' <span class=\'num\'>')
  let final = tmp.replace('e', '</span>')
  return final
}