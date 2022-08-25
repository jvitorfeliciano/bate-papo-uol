let messageList = [];

let individual = {name: prompt('Qual é o seu nome?')} 


function nameValidation (){
    const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', individual)
    request.then(nameValidationsuccess)
    request.catch(nameValidationerror)
}
nameValidation ();

function nameValidationsuccess(answer){
    const enter = document.querySelector('ul')
    enter.innerHTML = `<li>${individual.name} entra na sala<li>`
    console.log(answer.data)
}

function nameValidationerror(error){
    console.log(error.response.status)
    alert ('Insira outro nome')
    individual = {name: prompt('Qual é o seu nome?')} 
}

function getMessage (){
    const request = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    request.then(getMessagesuccess);
    request.catch(getMessageerror); 
}

getMessage ();

function getMessagesuccess (answer){
    messageList = answer.data 
    const addMessage = document.querySelector('ul')
    for (let i=0; i<messageList.length; i++){
        addMessage.innerHTML += `<div>
        <span class = "time">(${messageList[i].time}) </span>
        <span class = "from">${messageList[i].from} para </span>
        <span>${messageList[i].to} </span>
        <span>${messageList[i].text} </span>
        </div>`
    }
}

function getMessageerror (error){
    console.log(error.responde.status);
}

function sendMessage (){
   // const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', dado)
    alert('oi')
}