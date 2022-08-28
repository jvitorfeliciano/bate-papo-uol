let messageList = [];
let individual = "";

function nameValidation (){
    individual = {name: prompt('Qual é o seu nome?')}
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
    alert ('Insira outro nome, pois este já está em uso.')
    nameValidation ()
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
    addMessage.innerHTML =""
    for (let i=0; i<messageList.length; i++){
        if (messageList[i].type==='status') {
            addMessage.innerHTML += `<li class="${messageList[i].type}" >
        <p>
            <span class="time">(${messageList[i].time})</span>
            <span class="from">${messageList[i].from}</span>
            <span >${messageList[i].text}</span> 
        </p>
    </li>`
        } 
        else if(messageList[i].type==="message"){
            addMessage.innerHTML += `<li class="${messageList[i].type}" >
            <p>
                <span class="time">(${messageList[i].time})</span>
                <span class="from">${messageList[i].from}</span>
                <span>para</span> 
                <span class="to"> ${messageList[i].to}:</span>
                <span > ${messageList[i].text}</span>  
            </p>
        </li>`
        }
        else {
            addMessage.innerHTML += `<li class="${messageList[i].type}" >
            <p>
                <span class="time">(${messageList[i].time})</span>
                <span class="from">${messageList[i].from}</span>
                <span >para </span>
                <span class="to">${messageList[i].to}:</span>
                <span > ${messageList[i].text}</span>  
            </p>
        </li>`
        }
    }  
    const last = document.querySelector('ul').lastElementChild
    last.scrollIntoView()
}

function getMessageerror (error){
    console.log(error.responde.status);
}

function sendMessage (){
    let inputValue = document.querySelector('input').value
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

    const clearIpunt = document.querySelector('input')
    clearIpunt.value = ""; 
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
    request.then(right)
    request.catch(error)
    
}

setInterval(keepConection,5000);

function error (err){
    const erro =err.response.status
    console.log(erro)
}

function right (resp){
    console.log(resp)
}