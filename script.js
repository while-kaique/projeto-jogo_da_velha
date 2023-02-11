var pontosX = 0
var pontosO = 0
var para = document.querySelector('#placar')
var titulo = document.querySelector('#head')
var som = document.querySelector('#som')

titulo.style.cursor = 'default'
para.style.cursor = 'default'

function comecar() {
    let contagem = 0
    para.innerHTML = `<strong>Placar:</strong> <br>
    Player X: ${pontosX} <br>
    Player O: ${pontosO}`   
    const divs = document.querySelectorAll('[datacell]')
    const texto = document.querySelector('#final')
    texto.style.cursor = 'default'
    texto.innerText = 'Vocês querem se derrotar?';
    for (const elemento of divs) {
        elemento.innerText = '';
        elemento.classList.remove("O");
        elemento.classList.remove("X");
    }

    let isCircleTurn = true


    let listaPossibilidades = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [7, 5, 3]
    ];

    const checarVitoria = (classeAtual) => {
        return listaPossibilidades.some((psd) => {
            return psd.every((index) => {
                return divs[index-1].classList.contains(classeAtual)
            });
        });
    };

    const clicou = (e) => {
        isCircleTurn = !isCircleTurn
        const quadrado = e.target;
        const classAdd = isCircleTurn ? "O" : "X";

        quadrado.classList.add(classAdd)
        quadrado.innerText = classAdd
        quadrado.style.color = 'black'

        let win = false;
        win = checarVitoria(classAdd)
        if (win) {
            
            if (quadrado.innerText == 'X') { 
            setTimeout((som.innerHTML = '<audio src="sounds/vitoria.mp3" autoplay="on"><audio>'), 1)
            pontosX++}
            else {pontosO++} 
            for (const elemento of divs) {
                elemento.innerText = '';
                elemento.classList.remove("O");
                elemento.classList.remove("X");
                elemento.removeEventListener("click", clicou)
            }   
            texto.innerHTML = `HAHAHA<br>${classAdd} ganhou!! <strong>Clique aqui para continuar</strong>`;
            texto.style.cursor = 'pointer'
            texto.addEventListener("click", comecar)
        } else {
            if (quadrado.classList == 'row X'){
                contagem += 2
            }else if (quadrado.classList == 'row O') {
                contagem += 2
            }

            if (contagem == 18) {
                setTimeout((som.innerHTML = '<audio src="sounds/erro.mp3" autoplay="on"><audio>'), 1)
                texto.innerHTML = 'Epa, impatou... <strong>Clique aqui para recomeçar</strong>'
                texto.style.cursor = 'pointer'
                
            for (const elemento of divs) {
                elemento.innerText = '';
                elemento.classList.remove("O");
                elemento.classList.remove("X");
            }
                texto.addEventListener("click", () => comecar())
            }
        }
    }

    for (const elemento of divs) {
        elemento.addEventListener("click", clicou, {once: true})
    }
}

addEventListener("load", comecar)