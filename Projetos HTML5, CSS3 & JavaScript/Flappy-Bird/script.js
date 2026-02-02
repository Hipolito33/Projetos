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
var gameOver = false
var eec = 100  // Espaço entre os canos em pixels.
var constant  // Será usada pra soma depois.
var bX = 33  // Posição X do Bird.
var bY = 200  // Posição Y do Bird.
var gravidade = 0.7  // Gravidade para suavizar os movimentos do Bird.
var score = 0  // Guarda o placar do Jogo.
var cano = []

cano[0] = {
    x: canvas.width,
    y: 0
}

// Carregando Sons:
var fly = new Audio()
fly.src = 'sounds/fly.mp3'
var Somscore = new Audio()
Somscore.src = 'sounds/score.mp3'

//Captura de tecla:
document.addEventListener('keydown', voa); //Quando for pressionada uma tecla, chama a function voa

function voa() {
    bY = bY - 26
    fly.play()
}


function jogo() {


    if (gameOver) return
    // fundo do jogo
    ctx.drawImage(bg, 0, 0) // Background do jogo com y e x em 0


    // Criando canos
    for (let i = 0; i < cano.length; i++) { // cano.length(tamanho do cano)
        constant = canocima.height + eec // Altura do cano de baixo vai ser a altura do cano de cima + o espaço entre os canos(100px)
        ctx.drawImage(canocima, cano[i].x, cano[i].y) // Configurando cano de cima
        ctx.drawImage(canobaixo, cano[i].x, cano[i].y + constant) // Configurando cano de baixo
        cano[i].x = cano[i].x - 1 // Movimentação do cano

        if (cano[i].x == 100) { //Se o cano chagar a 125px da tela(quase no final)
            cano.push({ // add mais um elemento no array (mais um cano)
                x: canvas.width, //começa no estremo direito da tela
                y: Math.floor(Math.random() * canocima.height) - canocima.height // novo cano vindo de forma aleatória
            })
        }

        if (
            (
                bX + bird.width >= cano[i].x &&
                bX <= cano[i].x + canocima.width &&
                (
                    bY <= cano[i].y + canocima.height ||
                    bY + bird.height >= cano[i].y + constant
                )
            )
            || bY + bird.height >= canvas.height - chao.height
        ) {
            gameOver = true // para o jogo
            setTimeout(() => { //espera um tempo
                location.reload() // da reload na pág uma única vez
            }, 800)
        }

        if (cano[i].x + canocima.width < bX && !cano[i].pontuado) {
    score++
    Somscore.play()
    cano[i].pontuado = true
}
    }




    //Desenhando o chão
    ctx.drawImage(chao, 0, canvas.height - chao.height)

    //Desenhando Bird
    ctx.drawImage(bird, bX, bY)
    bY += gravidade

    //Criando Placar
    ctx.fillStyle = "#000"
    ctx.font = "20px Veradana"
    ctx.fillText('Placar: '+ score, 10, canvas.height -20)

    requestAnimationFrame(jogo)  //faz um loop infinito para animação de cenário
}

jogo();