const nav = document.getElementById('nav') // Salvando na const nav o elemento cujo id seja 'nav'

window.addEventListener('scroll', ()=>{ // Adicionando um Escutador de evento para o Evento scroll(rolagem de página)
    if(window.scrollY){  // Se a rolagem vertical da tela e maior ou igual a 100px
        nav.classList.add('nav__black') // Adicionando uma classe ao objetoo caso if for chamado
    } else {
        nav.classList.remove('nav__black') // Removendo classe ao elemento nav caso nao esteja scrollado até 100px
    }
})  