const name ="";
let messageList = [];

const individual = {name: prompt('Qual é o seu nome?')}
function nameValidation (){
    const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', individual)
    request.then(nameValidationsuccess)
    request.catch(nameValidationerror)
}

nameValidation ();

function nameValidationsuccess(){
    getMessage ()

}

function nameValidationerror(error){
    console.log(error.response.status)
    alert ('Insira outro nome')
    individual = {name: prompt('Qual é o seu nome?')} 
}

function getMessage (){
    const request = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    request.then(getMessagesuccess)
    request.catch(getMessageerror) 
}

getMessage ();

function getMessagesuccess (answer){
    messageList = answer.data 
    const addMessage = document.querySelector('ul')
    for (let i=0; i<messageList.length; i++){
        addMessage.innerHTML += `<li class="${messageList[i].type} id="${messageList[i]}" >
        <p>
            <span>(${messageList[i].time})</span>
            <span class="from">${messageList[i].from} para </span>
            <span> ${messageList[i].to}</span>
            <span >${messageList[i].text}</span> 
        </p>
    </li>`
    }  
    const last = document.querySelector('ul').lastElementChild
    last.scrollIntoView()
}

function getMessageerror (error){
    console.log(error.responde.status);
}

function sendMessage (){
     inputValue = document.querySelector('input').value
    let message = {
        from: individual.name,
        to:"Todos",
        text: inputValue,
        type:"message"
    }

    console.log(message)
    const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', message)
    request.then(getMessage)
    request.catch(sendMessageerror)
  

}

function sendMessageerror(error){
    window.location.reload()
}

function reloadMessage(){
   setInterval(getMessage,3000)
}

reloadMessage();

function keepConection (){
    const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',individual)
    request.then(console.log('deu certo'))
}

setInterval(keepConection,5000);
