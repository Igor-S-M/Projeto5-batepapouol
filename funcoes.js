
//funcao para ter o nome do usuario
function entrouNaSala() {
    do { userName = prompt("Como você quer se indentificar") }
    while (userName === "")
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", { name: userName })
    promessa.then((resposta)=>console.log(resposta))

}

function manterLogado(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", { name: userName })
}


//ter acesso as mensagens no servidor
let listaMensagens = []
function getMensagens(){
    axios.get("https://mock-api.driven.com.br/api/v6/uol/messages").then(tipoMensagem)
}

//chamar as mensagens que estão no Server
function tipoMensagem(resposta){
    document.querySelector(".feed").innerHTML= ""
    listaMensagens=resposta.data
    listaMensagens.map((objeto)=>{
        if (objeto.type==="status"){
            let data = objeto.time
            let endereco =objeto.from
            let texto = objeto.text
            mensagemStatus(data,endereco,texto)
        }else if(objeto.type==="private"){
            let data = objeto.time
            let endereco =objeto.from
            let texto = objeto.text
            let destinatario = objeto.to
            mensagemReservada(data,endereco,texto,destinatario)
        }else if(objeto.type==="message"){
            let data = objeto.time
            let endereco =objeto.from
            let texto = objeto.text
            mensagemNormal(data,endereco,texto)
        }
    })

}


//tipos de mensagens para renderizar
function mensagemNormal(data,endereco,texto){
document.querySelector(".feed").innerHTML += `
<div class="mensagem normal">
<div class="data">(${data})</div>
<div class="endereco"><h1>${endereco}</h1> para <h1>Todos</h1>: </div>
<div class="texto"> ${texto}</div>
</div>
`
}

function mensagemReservada(data,endereco,texto,destinatario){
document.querySelector(".feed").innerHTML +=`
<div class="mensagem reservado">
<div class="data">(${data})</div>
<div class="endereco"><h1>${endereco}</h1> reservadamente para <h1>${destinatario}</h1>: </div>
<div class="texto"> ${texto}</div>
</div>
`
}

function mensagemStatus(data,endereco,texto){
document.querySelector(".feed").innerHTML +=`
<div class="mensagem status">
<div class="data">(${data})</div>
<div class="endereco"><h1>${endereco}</h1> ${texto}</div>
</div>
`
}


function enviarMensagem(){
    let mensagem = document.querySelector(".barra-escrever .buscar input").value
    let obj = {
        from:"EU", 
        to: "Todos",
        text:"arroz",
        type:"message"
    }
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", obj)
}