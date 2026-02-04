addEventListener('DOMContentLoaded', () => { // Inicia sem precisar esperar o carregamento do css ou das imagens(cards).
    const cardArray = [ // Carregando os cards em um array de objetos.
        {
            nome : 'ganhou',
            img : 'imagens/ganhou.png'
        },
        {
            nome : 'ganhou',
            img : 'imagens/ganhou.png'
        },
        {
            nome : 'direita',
            img : 'imagens/direita.png'
        },
        {
            nome : 'direita',
            img : 'imagens/direita.png'
        },
        {
            nome : 'tras',
            img : 'imagens/tras.png'
        },
        {
            nome : 'tras',
            img : 'imagens/tras.png'
        },
        {
            nome : 'correndo', 
            img : 'imagens/correndo.png'
        },
        {
            nome : 'correndo', 
            img : 'imagens/correndo.png'
        },
        {
            nome : 'pulo',
            img : 'imagens/pulo.png'
        },
        {
            nome : 'pulo',
            img : 'imagens/pulo.png'
        },
        {
            nome : 'esquerda',
            img : 'imagens/esquerda.png'
        },
        {
            nome : 'esquerda',
            img : 'imagens/esquerda.png'
        }

    ]
    
    const grid = document.querySelector('.grid') //Referência a classe grid criada no CSS.
    
    // Variáveis de lógica do jogo
    const resultDisplay = document.querySelector('#result') // Conecta o placar do jogo
    var cardsEscolhidos = [] // Array que vai guardar os cards que foram escolhidos na rodada
    var cardsEscolhidosId = [] // Array que vai guardar o id dos cards que foram escolhidos na rodada
    var pares = [] // Vai guardar os pares que foram sendo formados durante o jogo


    function criaQuadro(){ // Criando Tela de jogo.
        for(let i = 0; i < cardArray.length; i++){
            var card = document.createElement('img')
            card.setAttribute('src', 'imagens/card.png') // Quando inicia o jogo todos os card tem a mesma 'aparência'.
            card.setAttribute('data-id', i) // Faz com que cada card seja único (0 a 11) cada fileira com 4.
            card.addEventListener('click', virarCarta) // Quando for clickado nos cards chama a function virarCarta.
            grid.appendChild(card) // Adiciona card como filho de grid.
        }
    }

    function virarCarta(){ // Virando cards
        var cardId = this.getAttribute('data-id') // Salva na variável o atributo do card que foi acabado de clickar
        cardsEscolhidos.push(cardArray[cardId].name)
        cardsEscolhidosId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img) 
        if(cardsEscolhidos.length == 2){ // Se 2 cards foram virados
            setTimeout(checkForMatch, 500)
        }
    }   
    
    criaQuadro()
})