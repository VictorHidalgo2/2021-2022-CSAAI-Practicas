//-- Clase cronómetro
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

//-- Elementos de la gui
const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset")
}

console.log("Ejecutando JS...");

//-- Definir un objeto cronómetro
const crono = new Crono(gui.display);

//---- Configurar las funciones de retrollamada

//-- Arranque del cronometro
gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
}
  
//-- Detener el cronómetro
gui.stop.onclick = () => {
    console.log("Stop!");
    crono.stop();
}

//-- Reset del cronómetro
gui.reset.onclick = () => {
    console.log("Reset!");
    crono.reset();
    for (let i = 0; i < 4; i++) {
        let rnum = getRandomInt(9);
        secretkey.push(rnum);
    } 
    
    //-- Mostramos el contenido del array de números secretos en la consola
    for (let j = 0; j < secretkey.length; j++) {
        console.log( j + ' Secret Key ' + secretkey[j]);
    }
    
    const line0buttons = document.querySelectorAll('.celdas .clave');
    
    
    line0buttons.forEach((button, index) => {
       button.value = secretkey[index];
       button.textContent = '*';
    });
    
    digitos = document.getElementsByClassName("botones_num")
    celdas = document.getElementsByClassName("clave")
    //-- Establecer la misma función de retrollamada
    //-- para todos los botones de tipo dígito
    for (let boton of digitos) {
    
    
       //-- Se ejecuta cuando se pulsa un boton
       //-- que es un dígito
       boton.onclick = (ev) => {
           celdas.innerHTML += ev.target.value;
           console.log("DIGITO!!!");
       }
    }
    
    
    const digito = document.getElementsByClassName("botones_num")
    let currentKeyIndex = 0;
    
    
    for (let boton of digito) {
     boton.onclick = (ev) => {
       const digit = parseInt(ev.target.value);
       const currentKeyDigit = secretkey[currentKeyIndex];
    
    
       if (digit === currentKeyDigit) {
         const button = line0buttons[currentKeyIndex];
         button.textContent = digit;
         button.classList.remove('incorrecto');
         button.classList.add('correcto');
         currentKeyIndex++;
    
    
       } else {
         currentKeyIndex = currentKeyIndex;
         const button = line0buttons[currentKeyIndex];
         button.textContent = digit; 
         button.classList.add('incorrecto');
     }
     if (!crono.timer) {
       crono.start();
     }
     
    
    
     if (currentKeyIndex === secretkey.length) {
         crono.stop();
       }
      
     }
    
    
    }
    
    
    line0buttons.forEach((button) => {
     button.addEventListener('click', (event) => {
       checkDigit(event.target.value);
     });
    });
    
    
    const lineButtons = document.querySelectorAll('.line1, .line2, .line3, .line4');
    
    
    lineButtons.forEach((button) => {
     button.addEventListener('click', () =>  {
         const digit = parseInt(button.value);
         const displayDigits = document.querySelectorAll('.line0, botones_num');
         displayDigits.forEach((displayDigits) => {
             if (displayDigits.textContent === '*'){
                 const displayValue = parseInt(displayDigits.value);
                 if (digit === displayValue) {
                     displayDigits.textContent = digit;
                 }
             }
         });
     });
    });
    
}

//-- Array que almacena números secretos
const secretkey = [];

//-- Generar números aleatorios con un valor máximo
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

for (let i = 0; i < 4; i++) {
    let rnum = getRandomInt(9);
    secretkey.push(rnum);
} 

//-- Mostramos el contenido del array de números secretos en la consola
for (let j = 0; j < secretkey.length; j++) {
    console.log( j + ' Secret Key ' + secretkey[j]);
}

const line0buttons = document.querySelectorAll('.celdas .clave');


line0buttons.forEach((button, index) => {
   button.value = secretkey[index];
   button.textContent = '*';
});

digitos = document.getElementsByClassName("botones_num")
celdas = document.getElementsByClassName("clave")
//-- Establecer la misma función de retrollamada
//-- para todos los botones de tipo dígito
for (let boton of digitos) {


   //-- Se ejecuta cuando se pulsa un boton
   //-- que es un dígito
   boton.onclick = (ev) => {
       celdas.innerHTML += ev.target.value;
       console.log("DIGITO!!!");
   }
}


const digito = document.getElementsByClassName("botones_num")
let currentKeyIndex = 0;


for (let boton of digito) {
 boton.onclick = (ev) => {
   const digit = parseInt(ev.target.value);
   const currentKeyDigit = secretkey[currentKeyIndex];


   if (digit === currentKeyDigit) {
     const button = line0buttons[currentKeyIndex];
     button.textContent = digit;
     button.classList.remove('incorrecto');
     button.classList.add('correcto');
     currentKeyIndex++;


   } else {
     currentKeyIndex = currentKeyIndex;
     const button = line0buttons[currentKeyIndex];
     button.textContent = digit; 
     button.classList.add('incorrecto');
 }
 if (!crono.timer) {
   crono.start();
 }
 


 if (currentKeyIndex === secretkey.length) {
     crono.stop();
   }
  
 }


}


line0buttons.forEach((button) => {
 button.addEventListener('click', (event) => {
   checkDigit(event.target.value);
 });
});


const lineButtons = document.querySelectorAll('.line1, .line2, .line3, .line4');


lineButtons.forEach((button) => {
 button.addEventListener('click', () =>  {
     const digit = parseInt(button.value);
     const displayDigits = document.querySelectorAll('.line0, botones_num');
     displayDigits.forEach((displayDigits) => {
         if (displayDigits.textContent === '*'){
             const displayValue = parseInt(displayDigits.value);
             if (digit === displayValue) {
                 displayDigits.textContent = digit;
             }
         }
     });
 });
});
