var canvas = document.getElementById('canvas') // Referênciando o canvas pra obter o tamanho da tela.
var ctx = canvas.getContext('2d') // Pede ao canvas um contexto de desenho 2D.

//Carregando imagens direto do JavaScript: 
var bg = new Image() // Background.
bg.src = 'images/bg.png'
var bird = new Image() // Bird.
bird.src = 'images/bird.png'
var canobaixo = new Image() // Cano do baixo.
canobaixo.src = 'images/canobaixo.png'
var canocima = new Image() // // Cano do alto.
canocima.src = 'images/canocima.png'
var chao = new Image() // Chão.
chao.src = 'images/chao.png'

// Variáveis: 
var eec = 100  // Espaço entre os canos em pixels.
var constant  // Será usada pra soma depois.
var bX = 33  // Posição X do Bird.
var bY = 200  // Posição Y do Bird.
var gravidade = 0.6  // Gravidade para suavizar os movimentos do Bird.
var score = 0  // Guarda o placar do Jogo.
var cano = []

cano[0] = {
    x : canvas.clientWidth,
    y : 0
}

// Carregando Sons:
var fly = new Audio()
fly.src = 'sounds/fly.mp3'
var score = new Audio()
score.src = 'sounds/score.mp3'

//Captura de tecla:
document.addEventListener('keydown', voa); //Quando for pressionada uma tecla, chama a function voa

function voa(){
    bY = bY-26 
    fly.play()
}


function jogo(){
    // fundo do jogo
    ctx.drawImage(bg,0,0) // Background do jogo com y e x em 0


    // Criando canos
    for(let i = 0; i < cano.length; i++){ // cano.length(tamanho do cano)
        constant = canocima.height + eec // Altura do cano de baixo vai ser a altura do cano de cima + o espaço entre os canos(100px)
        ctx.drawImage(canocima, cano[i].x, cano[i].y) // Configurando cano de cima
        ctx.drawImage(canobaixo, cano[i].x, cano[i].y+constant) // Configurando cano de baixo
        cano[i].x = cano[i].x -1 // Movimentação do cano
    } 
        


    //Desenhando o chão
    ctx.drawImage(chao,0, canvas.height - chao.height)

    //Desenhando Bird
    ctx.drawImage(bird, bX, bY)
    bY += gravidade

    requestAnimationFrame(jogo)  //faz um loop infinito para animação de cenário
}

jogo()