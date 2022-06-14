const contenedor = document.querySelector(".contenedor");
//Definir medidas
const altoTablero = 300;
const anchoTablero = 570;
const altoBloque = 20;
const anchoBloque = 100;

//Pos User
const positionInitialUser = [230,10]
let positionActualUser = positionInitialUser;

//Definir posicion de la bola
const posicionInicialBola = [270,40]
let posicionActualBola = posicionInicialBola


//Definir mov de bola 
let xDireccionBola = 2;
let yDireccionBola = 2;
let diametro = 20;
//Definir timers
let timerID;


//Definir bloque
class Bloque{
  constructor(ejeX, ejeY){
    this.bottomLeft = [ejeX, ejeY];
    this.bottomRight = [ejeX + anchoBloque, ejeY];
    this.topLeft = [ejeX, ejeY + altoBloque];
    this.topRight = [ejeX + anchoBloque, ejeY + altoBloque]
  }

}
//Definir todos los bloeques
const bloques = [
  new Bloque(10,250),
  new Bloque(120,250),
  new Bloque(230,250),
  new Bloque(340,250),
  new Bloque(450,250),
  new Bloque(10,220),
  new Bloque(120,220),
  new Bloque(230,220),
  new Bloque(340,220),
  new Bloque(450,220),
  new Bloque(10,190),
  new Bloque(120,190),
  new Bloque(230,190),
  new Bloque(340,190),
  new Bloque(450,190),
 
]

//Funcion añadir bloques
let addBloques=()=>{
  for(let i=0; i<bloques.length; i++){
    const bloque = document.createElement('div');
    bloque.classList.add('bloque')
    bloque.style.left = bloques[i].bottomLeft[0] + 'px';
    bloque.style.bottom = bloques[i].bottomLeft[1] + 'px';
    contenedor.appendChild(bloque);
  }
}

addBloques();


//Funcion dibujar usuario 
let dibujarUser = () =>{
  usuario.style.left = positionActualUser[0] + 'px';
  usuario.style.bottom = positionActualUser[1] + 'px';
}

//Añadir user
const usuario = document.createElement('div')
usuario.classList.add('usuario')
contenedor.appendChild(usuario)
dibujarUser();

//Mover user
function moverUser(e){
  switch(e.key){
    case 'ArrowLeft':
      if(positionActualUser[0]>0){
        positionActualUser[0] -= 20
        dibujarUser();
      }
      break;
    case 'ArrowRight':
      if(positionActualUser[0]<(anchoTablero - anchoBloque)){
        positionActualUser[0] += 20
        dibujarUser();
      }
  }
}

  //Eventos
  document.addEventListener('keydown',moverUser);

  //Dibujar bola
   let dibujarBola =()=>{
   bola.style.left = posicionActualBola[0]+ 'px';
   bola.style.bottom = posicionActualBola[1]+ 'px';

   }
   const bola = document.createElement('div');
   bola.classList.add('bola');
   contenedor.appendChild(bola);
   dibujarBola();

let moverBola=()=>{
  posicionActualBola[0] += xDireccionBola;
  posicionActualBola[1] += yDireccionBola;
  dibujarBola();
  revColicion();
  gameOver();
}

timerID = setInterval(moverBola, 20)


function revColicion(){
  //Colición con bloques
  
  for (let i = 0; i < bloques.length; i++){
    
  
    if( (posicionActualBola[0] > bloques[i].bottomLeft[0] && posicionActualBola[0] < bloques[i].bottomRight[0]) && 
    ((posicionActualBola[1] + diametro) >bloques[i].bottomLeft[1] && posicionActualBola[1] < bloques[i].topLeft[1]))
    {
      const todosLosBloques = Array.from(document.querySelectorAll('.bloque'))
      todosLosBloques[i].classList.remove('bloque')
      bloques.splice(i,1)
      cambiarDireccion();
    }
  }

  //Colición con paredes
  if(
    posicionActualBola[0] >= (anchoTablero-diametro) || 
    posicionActualBola[1] >= (altoTablero-diametro) ||
    posicionActualBola[0] <=0 || 
    posicionActualBola[1] <=0 
  ){
    cambiarDireccion();
  }
   //revision colision con usuario
   if((posicionActualBola[0] > positionActualUser[0] && posicionActualBola[0] < positionActualUser[0] + anchoBloque) && 
   (posicionActualBola[1] > positionActualUser[1] && posicionActualBola[1] < positionActualUser[1] + altoBloque)
   ){
       cambiarDireccion()
   }
}


function cambiarDireccion(){
  if(xDireccionBola == 2 && yDireccionBola == 2){
    yDireccionBola = -2
    return
  }
  if(xDireccionBola == 2 && yDireccionBola == -2){
    xDireccionBola = -2
    return
  }
  if(xDireccionBola == -2 && yDireccionBola == -2){
    yDireccionBola = 2
    return
  }
  if(xDireccionBola == -2 && yDireccionBola == 2){
    xDireccionBola = 2
    return
  }

}

//funcion que termina el juego si la bola toca suelo.
function gameOver(){
  if(posicionActualBola[1] <= 0){
      clearInterval(timerId)
      document.removeEventListener('keydown',moverUser)
  }
}