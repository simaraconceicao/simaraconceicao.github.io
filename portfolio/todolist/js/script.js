
// capturar elementos - form, inputTarefa, botaoAdd, ul, listaContainer, botaoMarcar, botaoExcluir
const listaContainer = document.getElementById('listaContainer')
const form = document.getElementById('form')
const inputTarefa = document.getElementById('inputTarefa')
const botaoAdd = document.getElementById('botaoAdd')
const tarefas = document.getElementById('tarefas')
const botaoMarcar = document.getElementById('botaoMarcar')
const botaoExcluir = document.getElementById('botaoExcluir')
const vazia = document.getElementById("vazia")
let dragging

// inserir um evento no form
form.addEventListener('submit', function(evento){
    //tira o default de form 
    evento.preventDefault()
    //criando outras variaveis para arrumar o validar campo
    let mensagem = inputTarefa.value.trim()
    //criando a condição do erro validar campo
    if (mensagem === "") {

        vazia.textContent = "Escreva alguma tarefa";
        vazia.className ="erroCampo"
    }else{
        
        vazia.textContent = "";
        
        //criar div e atribuir classe
        const tarefinha = document.createElement('div')
        tarefinha.className = "tarefinha"
        tarefas.appendChild(tarefinha)

        //criar p que vai ter conteudo do valor digitado
        const valorDigitado = document.createElement('p')
        valorDigitado.className = "tarefa-digitada"
        valorDigitado.textContent = inputTarefa.value
        
        form.reset();
        
        //criar p que vai ter x como conteúdo
        const paragrafoX = document.createElement('span')
        paragrafoX.textContent = "x"
        
        //estrututura de identação
        tarefinha.appendChild(valorDigitado)
        tarefinha.appendChild(paragrafoX)    

        //transformar em arrastavel
        tarefas.setAttribute('draggable', 'true')
        tarefinha.setAttribute('draggable', 'true')
        valorDigitado.setAttribute('draggable', 'true')
        paragrafoX.setAttribute('draggable', 'true')
    
        //ouvir parágrafo tarefinha e adicionar a classe que risca a tarefa e faz o inverso(toogle)
        valorDigitado.addEventListener('click', function(evento){
            if(valorDigitado.classList.contains('tarefa-digitada')){
                valorDigitado.classList.remove('tarefa-digitada')
                valorDigitado.classList.add('tarefa-executada')
            } else {
                valorDigitado.classList.add('tarefa-digitada')
                valorDigitado.classList.remove('tarefa-executada')
            }
        
        })
        //ouvir o botaoMarcar tudo e add a classe que risca tudo, toggle clicar no botão de novo e desmarcar
        botaoMarcar.addEventListener('click', function(e){
            if(tarefas.classList.contains('tarefas-marcadas')) {
                tarefas.classList.remove('tarefas-marcadas')
                tarefas.classList.add('tarefas-digitadas')
            } else {
            let tarefasMarcadas = tarefas.setAttribute('class', 'tarefas-marcadas')
            }    
        })
        //ouvir o botaoExcluir, iterar e criar uma nodelist vazia, excluir todos os itens ou resetar 
        //form.reset();

        botaoExcluir.addEventListener('click', function(e){
            if(tarefas.parentNode){
                tarefas.parentNode.removeChild(tarefas)
            }
        })
        //ouvir o parágrafo x  e excluir a tarefa
        paragrafoX.addEventListener('click', function(evento){
                
            if (valorDigitado.parentNode) {
                valorDigitado.parentNode.removeChild(valorDigitado)
                paragrafoX.parentNode.removeChild(paragrafoX)
                tarefinha.classList.remove("tarefinha")
            } 
        
        })
        
    }
    
        //Função DragDrop
    //divmae
    tarefas.addEventListener("dragstart", function(ev){
        dragging = ev.target.closest(".tarefinha")
    })

    tarefas.addEventListener('dragover', function(ev){
        ev.preventDefault()
        const posicao = ev.target.closest(".tarefinha")
        this.insertBefore(dragging, posicao)
    })

    tarefas.addEventListener("dragend", function(ev){
        dragging = null
    })
})





