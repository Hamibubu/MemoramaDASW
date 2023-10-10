const cartas = document.querySelectorAll('.card');
const reload = document.querySelectorAll('#reiniciarJuego')[0];
let seVolteo = false;
let bloqueaBoard = false;
let cartaUno,cartaDos;
let cartasUsadas = [];
let contador = 0;

(function aleatorio() {
    cartas.forEach(card => {
        let randomP = Math.floor(Math.random() * 20);
        card.style.order = randomP;
      });
})();

function voltea() {

    if(this == cartaUno){
        return;
    }

    if (cartasUsadas.includes(cartaUno) || cartasUsadas.includes(cartaDos)) {
        return;
    }

    if (bloqueaBoard) {
        return;
    }

    this.classList.add('voltea');

    if (!seVolteo){
        seVolteo = true;
        cartaUno = this;
        return;
    }

    cartaDos = this;
    compareCards();
}

function compareCards() {
    console.log(cartaUno.innerHTML == cartaDos.innerHTML)
    if (cartaUno.innerHTML === cartaDos.innerHTML) {
        cartasUsadas.push(cartaDos);
        cartasUsadas.push(cartaUno);
        console.log("Son Iguales");
        contador+=1;
        if (contador == 10){
            setTimeout(() => {document.getElementById("mensaje-victoria").style.display = "block"}, 450);
        }
        disableCards();
    }else{
        restorePosition();
    }
}

function disableCards() {
    cartaUno.removeEventListener('click', voltea);
    cartaDos.removeEventListener('click', voltea);
    reseteaVars();
}

function restorePosition() {
    bloqueaBoard = true;
    setTimeout(() => {
        cartaUno.classList.remove('voltea');
        cartaDos.classList.remove('voltea');
    
        reseteaVars();
      }, 2000);
}

function reseteaVars() {
    seVolteo = false;
    bloqueaBoard = false;
    cartaDos = null;
    cartaUno = null;
}

cartas.forEach(carta => {
    carta.addEventListener('click', voltea);
});

function reiniciarJuego() {
    cartas.forEach( carta => {
        carta.classList.remove('voltea');
        carta.addEventListener('click', voltea);
    });
    cartasUsadas = [];
    setTimeout(() => {(function aleatorio() {
        cartas.forEach(card => {
            let randomP = Math.floor(Math.random() * 20);
            card.style.order = randomP;
          });
    })()},400);
    document.getElementById("mensaje-victoria").style.display = "none";
    contador=0;
    reseteaVars();
}

reload.addEventListener('click', reiniciarJuego);