const gameContainer = document.getElementById('game-container');

const linhas = 10;
const colunas = 10;
const contadorBombas = 14;

let celulas = [];

function criarTelaJogo(){
    for(let i = 0; i < linhas * colunas; i++){
        const celula = document.createElement('div');
        celula.classList.add('celula');
        celula.dataset.id = i;
        gameContainer.appendChild(celula);
        celulas.push(celula);
    }

    // Distribuir as bombas aleatoriamente
    let bombasColocadas = 0;
    while(bombasColocadas < contadorBombas){
        const indiceAleatorio = Math.floor(Math.random() * celulas.length);

        if(!celulas[indiceAleatorio].classList.contains('bomba')){
            celulas[indiceAleatorio].classList.add('bomba');
            bombasColocadas++;
        } 
    }
}

function ClicksNaBomba(event){
    const celula = event.target;
    if(celula.classList.contains('revelada')) return;
    
    celula.classList.add('revelada');

    if(celula.classList.contains('bomba')){
        celula.innerHTML = '💣';
        revelarTodasBombas();
        alert('Game Over! Você clicou em uma bomba!');
    } else { 
        const bombasAdjacentes = PegarBombasAdjacentes(parseInt(celula.dataset.id));
        celula.innerHTML = bombasAdjacentes || '';
    }
}

function revelarTodasBombas(){
    celulas.forEach((celula) => {
        if(celula.classList.contains('bomba')){
            celula.classList.add('revelada');
            celula.innerHTML = '💣';
        }
    });
}

function PegarBombasAdjacentes(index){
    const linha = Math.floor(index / colunas);
    const coluna = index % colunas;
    let contador = 0;

    for(let l = linha - 1; l <= linha + 1; l++){
        for(let c = coluna - 1; c <= coluna + 1; c++){

            if(l >= 0 && l < linhas && c >= 0 && c < colunas){
                const indiceAdjacente = l * colunas + c;

                if(celulas[indiceAdjacente].classList.contains('bomba')){
                    contador++;
                }
            }
        }
    }

    return contador;
}

criarTelaJogo();
celulas.forEach((celula) => 
    celula.addEventListener('click', ClicksNaBomba)
);