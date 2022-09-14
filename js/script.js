var palabras = ['PERRO','GATO','SOFA','CASA'];
var tablero = document.getElementById('horca').getContext('2d');
var letras = [];
var palabraCorrecta = "";
var errores = 10;
var contador = 0;



function filtrarMayuscula(i){
    var mayusculas = new RegExp("^[A-Z]$");
    return mayusculas.test(i);
}

function escojerPalabraSecreta(){
    var palabra = palabras[Math.floor(Math.random()*palabras.length)]
    palabraSecreta = palabra
    console.log(palabra)
    return palabra
}

function dibujarLineas(){
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.strokeStyle = "#0A3871"
    tablero.beginPath()

    var ancho = 600/palabraSecreta.length
    for(let i = 0; i < palabraSecreta.length ; i++){
        tablero.moveTo(500+(ancho*i),640)
        tablero.lineTo(550+(ancho*i),640)
    }
    tablero.stroke()
    tablero.closePath()
}dibujarLineas(escojerPalabraSecreta())

function escribirLetraCorrecta(index){
    tablero.font = 'bold 50px Inter'
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.fillStyle = "#0A3871"

    var ancho = 600/palabraSecreta.length
    tablero.fillText(palabraSecreta[index],505+(ancho*index),620)
}

function escribirLetraIncorrecta(letra, errorsLeft){
    tablero.font = 'bold 40px Inter'
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.fillStyle = "#0A3871"

    
    tablero.fillText(letra,535+(40*(10-errorsLeft)), 710,40)
}

function verificarLetraPresionada(key){
    if (letras.length < 1 || letras.indexOf(key) <0)
    {
        letras.push(key)
        return false
    }
    else{
        letras.push(key)
    return true
    }
    
}

function agregarLetraCorrecta(i){
    palabraCorrecta += palabraSecreta[i].toUpperCase()
}

function agregarLetraIncorrecta(letter){
    if(palabraSecreta.indexOf(letter)<=0){
        errores-=1
    }
}


function iniciarJuego(){
   
    
        document.onkeydown = (e) =>{
if(errores > 0 && contador !== palabraSecreta.length){
            let letra=e.key.toUpperCase()
            if(filtrarMayuscula(letra)){
            if(!verificarLetraPresionada(e.key)){
                    if(palabraSecreta.includes(letra)){
                        console.log(letra)
                        agregarLetraCorrecta(palabraSecreta.indexOf(letra))
                        
                    for (let i=0; i<palabraSecreta.length; i++){
                        if(palabraSecreta[i]===letra){
                            contador++//se suma la cantidad de letras correctas
                            escribirLetraCorrecta(i)
                        }
                    }
                    } 
            else{
                if(!verificarLetraPresionada(e.key)) return
                    agregarLetraIncorrecta(letra)
                    escribirLetraIncorrecta(letra,errores)
                    errores_dibujar();
                }
                }
                verificarGanador()
            }
            else{
                window.alert("no es una letra mayuscula");
            }
        }
       console.log("errores"+errores)
        console.log(contador)
    } 
}


//hacer una funcion q verifique si se gano o no el juego
function verificarGanador(){
    if(contador === palabraSecreta.length){
        mensaje_gana();
    }
}


