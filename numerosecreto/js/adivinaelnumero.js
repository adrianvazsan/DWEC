
let intentos;
let dificultad;
let numero;
let gameon = false;
let dificultad_text;
const info = document.getElementById("info");
const infodif = document.getElementById("infodif");
const record = document.getElementById("record");
const select = document.getElementById("dificultad");
//Con esta function lo que hacemos es que al seleccionar una dificultad nos salga el mensaje de que la tenemos selecionada.
function seleccion(){
    switch(parseInt(document.getElementById("dificultad").value)){
        case 1:
            info.textContent ="has seleccionado la dificultad facil";
        break;
        case 2:
            info.textContent  ="has seleccionado la dificultad medio";
        break;
        case 3:
            info.textContent  ="has seleccionado la dificultad dificil";
        break;
        default:
            info.textContent  ="selecciona la dificultad";
        break;
    }
}
//Con la function reseteo hacemos que al pulsar el boton reseteo nos reinicie el juego.
function reseteo(){
    info.textContent = "Selecciona una dificultad";
    infodif.textContent = "";
    record.textContent = "";
    select.value = "selecciona";
    document.getElementById("respuesta").value = null;
}
//con la function mostrarRegistro nos registra los record de las dificultades, ademas nos muestra por mensaje en el caso de que haya un record en cuantos intentos se ha conseguido, y si no hay ningun record tambien nos lo muestra.
function mostrarRegistro(dificultad){
    const recordIntentos = localStorage.getItem("record"+dificultad);
    
    if(recordIntentos){
        record.textContent = "El record en "+dificultad_text+" es de "+recordIntentos;
    }else{
        record.textContent = "Esta dificultad no tiene record aun "+ dificultad_text;
    }
}

//Con este function seleccionamos la dificultad y iniciamos el juego.
function iniciar(){
    dificultad = parseInt(document.getElementById("dificultad").value);
    
    if(String(dificultad) !== document.getElementById("dificultad").value) {
        infodif.textContent = "Escoja una dificultad"
        return
    }
    switch(dificultad) {
        case 1:
            dificultad_text = "facil";
            break;
        case 2:
            dificultad_text = "medio";
            break;
        case 3:
            dificultad_text = "dificil";
            break;
    }
    intentos = 5 + 2*(dificultad==2) + 5*(dificultad==3); 
//Con este comando de math random , hacemos que la variable numero genere un numero random, y dependiendo de  si el condicional dificultad es verdad vale 1 y con eso hacemos que si es 1 es facil, 2 es medio y 3 es dificil.

    numero = Math.floor(Math.random()*10*(1*(dificultad==1) + 5*(dificultad==2) + 10*(dificultad==3))+1);
    mostrarRegistro(dificultad);
    gameon = true;
}
//Con esta function iteracion 
function iteracion() {
    if(gameon) {    
        if(intentos > 0) {
                const respuesta = document.getElementById("respuesta").value;
                const numeroIngresado = parseInt(respuesta, 10);
                if(String(numeroIngresado) !== respuesta){
                    info.textContent = ("Ingresa un numero valido");
                    return;
                }
                console.log(numero);
                //Con este if se detecta si el numero secreto es igual al numero que se ha introducido, y en el caso de que se haya acertado el numero pone un mensaje y el numero de intentos.
                if(numeroIngresado === numero) {
                    numIntentos = 6 + 2*(dificultad==2) + 5*(dificultad==3) - intentos;
                    info.textContent = ("Adivinaste el número en " + numIntentos + " intentos");
                    const recordIntentos = localStorage.getItem("record" + dificultad);
                //Con este if detectamos si hay un record o no en la dificultad seleccionada.
                    if(!recordIntentos || numIntentos< parseInt(recordIntentos, 10)){
                        localStorage.setItem("record"+dificultad, numIntentos);
                        info.textContent = ("Nuevo record establecido, el record con "+numIntentos+ " en el nivel "+dificultad_text);
                    }
                    gameon = false;
                    return;
                //Con este else if y else decimos al usuario que el numero secreto es mayor o menor que el numero que ha introducido
                } else if(numeroIngresado < numero) {
                    info.textContent = ("Demasiado bajo. Intenta con un numero mayor");
                }else{
                    info.textContent = ("Demasiado alto. Intenta con un numero menor");
                }
            intentos--;
            infodif.textContent = "Te quedan "+intentos+" intentos";
            document.getElementById("respuesta").value = null;
        }
//Con este if desimos que si los intentos son igual a 0 has perdido la partida y te muestra cual era el numero secreto.
        if(intentos === 0) {
            info.textContent = "Perdiste, el numero era "+numero;
            gameon = false;
        }
    }
}

//Con el document.addeventlistener registramos lo que debe hacer el programa cuando se pulsa cada uno de los botones, uno para iniciar y otro para resetear.
document.addEventListener("DOMContentLoaded",function() {

    document.getElementById("boton").addEventListener("click",iniciar);
    document.getElementById("boton2").addEventListener("click", iteracion);
}
);
