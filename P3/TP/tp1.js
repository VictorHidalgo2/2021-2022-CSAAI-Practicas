class Crono {

    //-- Constructor. Hay que indicar el 
    //-- display donde mostrar el cronómetro
    constructor(display) {
        this.display = display;

        //-- Tiempo
        this.cent = 0, //-- Centésimas
        this.seg = 0,  //-- Segundos
        this.min = 0,  //-- Minutos
        this.timer = 0;  //-- Temporizador asociado
    }

    //-- Método que se ejecuta cada centésima
    tic() {
        //-- Incrementar en una centesima
        this.cent += 1;

        //-- 100 centésimas hacen 1 segundo
        if (this.cent == 100) {
        this.seg += 1;
        this.cent = 0;
        }

        //-- 60 segundos hacen un minuto
        if (this.seg == 60) {
        this.min = 1;
        this.seg = 0;
        }

        //-- Mostrar el valor actual
        this.display.innerHTML = this.min + ":" + this.seg + ":" + this.cent
    }

    //-- Arrancar el cronómetro
    start() {
       if (!this.timer) {
          //-- Lanzar el temporizador para que llame 
          //-- al método tic cada 10ms (una centésima)
          this.timer = setInterval( () => {
              this.tic();
          }, 10);
        }
    }

    //-- Parar el cronómetro
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    //-- Reset del cronómetro
    reset() {
        this.cent = 0;
        this.seg = 0;
        this.min = 0;

        this.display.innerHTML = "0:0:0";
    }
}
//-- Declaración de variables y objetos

//-- Coordenadas iniciales del proyectil
let xop = 5;
let yop = 345;
let xp = xop;
let yp = yop;
let ldx = 50;
let ldy = 50;
let pcolor = "yellow"

//-- Coordenadas iniciales del objetivo
let xomin = 200;
let xomax = 770;
var xo = getRandomXO(xomax - xomin) + xomin;
let yo = 370;

//-- Generar números aleatorios con un valor máximo
function getRandomXO(max) {
    return Math.floor(Math.random() * max);
  }

//-- Acceder al botón de disparo
const btnLanzar = document.getElementById("btnLanzar");

//-- Acceder al botón de inicio
const btnIniciar = document.getElementById("btnIniciar");

//-- Obtención del canvas y de los elementos HTML a usar
const canvas = document.getElementById("ctiro");

//-- Definir el tamaño del canvas
canvas.width = 800;
canvas.height = 400;

//-- Obtener el contexto del canvas 2D
const ctx = canvas.getContext("2d");

//-- Dibujar el proyectil
dibujarP(xop, yop, ldx, ldy, pcolor);

//-- Dibujar el objetivo
dibujarO(xo,yo);

//-- Velocidad del proyectil
let velp = 3;


//-- Dibujar el objetivo
dibujarO(xo,yo);

//-- Dibujar el proyectil
dibujarP(xop, yop, ldx, ldy, pcolor);

//-- Velocidad del proyectil
targetRadius = 20;
projectileSize = 40;
projectileX = 0;
projectileY = canvas.height - projectileSize;
let angle = 45;
let velocity = 50;
time = 0;
g = 9.81;
gameRunning = false;
var distancia = Math.sqrt(Math.pow(xo - xop, 2) + Math.pow(yo - yop, 2));
var tirolanzado=false;

//-- Función principal de actualización
function lanzar() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    //-- 3) Pintar los elementos en el canvas
    dibujarO(xo,yo); // Pintar el objetivo

    dibujarP(xop, yop, ldx, ldy, pcolor); // Pintar el proyectil    

    //-- 4) Repetir
    requestAnimationFrame(lanzar);

    if (tirolanzado) {
        tiroP();}

    // Verificar si el proyectil ha tocado la parte inferior del canvas
    if (((xop > (xo -20)) && (xop < (xo+5))) && (((yo +20) > yop) && ((yo-20) <yop))) {
        console.log("Has ganado");
        ctx.font = "100px Arial";
        ctx.fillStyle = 'green';
        ctx.fillText("¡Has ganado!", 80, 100);
        crono.stop();
        velocity = stop();
        tirolanzado=false

    } else if ((xop >= canvas.width || xop <= 0) || (yop >= canvas.height || yop <= 0 )){ 
        console.log("Has perdido");
        ctx.font = "100px Arial";
        ctx.fillStyle = 'red';
        ctx.fillText("¡Has perdido!", 80, 100);
        crono.stop();
        tirolanzado=false

    }
    }

const disp = document.getElementById("display");
const angulo = document.getElementById("angulo");
const velocidad = document.getElementById("velocidad");
const crono = new Crono(disp);

//-- Escuchar cambios en las barras de cambio
angulo.addEventListener("input", function() {
    //-- Actualizar el valor del ángulo y la etiqueta
    angle = parseFloat(angulo.value);
    });
  
velocidad.addEventListener("input", function() {
    //-- Actualizar el valor de la velocidad y la etiqueta
    velocity = parseFloat(velocidad.value);
    });


//-- Otras funciones....

//-- función para pintar el proyectil
function dibujarP(x,y,lx,ly,color) {

    //-- Pintando el proyectil
    ctx.beginPath();

    //-- Definir un rectángulo de dimensiones lx x ly,
    ctx.rect(x, y, lx, ly);

    //-- Color de relleno del rectángulo
    ctx.fillStyle = color;

    ctx.strokeStyle = color;

    //-- Mostrar el relleno
    ctx.fill();

    //-- Mostrar el trazo del rectángulo
    ctx.stroke();

    ctx.closePath();
}

//-- función para pintar el objetivo
function dibujarO(x,y) {

    //-- Pintando el objetivo
    ctx.beginPath();

    //-- Dibujar un circulo: coordenadas x,y del centro
    //-- Radio, Angulo inicial y angulo final
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'red';

    //-- Dibujar el relleno
    ctx.fill()    

    //-- Dibujar el trazo
    ctx.stroke();

    ctx.closePath();
}

//-- Función de retrollamada del botón de disparo
btnLanzar.onclick = () => {
    ej_tiro();
    console.log("Start!!");
    crono.start();
    }
//-- Función de retrollamada del botón iniciar
btnIniciar.onclick = () => {
    location.reload();
    console.log("Reset!");
    crono.reset();
    }

    function tiroP() {
        xop = xp + velocity * Math.cos(angle* Math.PI / 180) * time;
        yop = yp - velocity * Math.sin(angle* Math.PI / 180) * time +0.5 * g * time**2;
        time += 0.1;
      }
      
      function ej_tiro(){
        tirolanzado=true
        tiroP();
      }

lanzar()