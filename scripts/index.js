const datos = players
const tablero = document.getElementById("jugadores")
const tableroResultados = document.getElementById("resultados")
const respEquipo1 = document.getElementById("equipo1")
const respEquipo2 = document.getElementById("equipo2")
const jugadoresElegidos = []
const equipo1 =[]
const equipo2 =[]
const arqueros =[]

  
function armarEquipos(array){
// Primero, buscamos y agregamos un arquero al equipo1
  for (let i = 0; i < array.length; i++) {
    if (array[i].posicion === "arquero") {
      equipo1.push(array[i]);
      array.splice(i, 1); 
      break; 
    }
  }
// Luego, buscamos y agregamos un arquero al equipo2
  for (let i = 0; i < array.length; i++) {
    if (array[i].posicion === "arquero") {
      equipo2.push(array[i]);
      array.splice(i, 1); 
      break; 
    }
  }  
// Repartimos a los demás jugadores en ambos equipos
  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      equipo1.push(array[i]);
    } else {
      equipo2.push(array[i]);
    }
  }
  
  console.log(equipo1);
  console.log(equipo2);

  const respuestaEquipos =()=>{
        tableroResultados.classList.remove('resultados')
        tableroResultados.classList.add('resultadosSi')
        equipo1.map((jugador)=>{

            const iconito = document.createElement('img')
            iconito.setAttribute('src','../star.png')
            iconito.setAttribute('alt','estrella logo')
            iconito.setAttribute('class','estrella_logo')
            const divJugador = document.createElement('div')
            divJugador.setAttribute("class","divJugador")
            const pNombre = document.createElement("p")
            pNombre.innerText = jugador.nombre
            pNombre.setAttribute("class", "divJugador__p")
            const pPosicion = document.createElement("p")
            pPosicion.innerText = jugador.posicion
            pPosicion.setAttribute("class", "")

            divJugador.append(pNombre,pPosicion)
            respEquipo1.append(divJugador)
        })
        equipo2.map((jugador)=>{

            const iconito = document.createElement('img')
            iconito.setAttribute('src','../star.png')
            iconito.setAttribute('alt','estrella logo')
            iconito.setAttribute('class','estrella_logo')
            const divJugador = document.createElement('div')
            divJugador.setAttribute("class","divJugador")
            const pNombre = document.createElement("p")
            pNombre.innerText = jugador.nombre
            pNombre.setAttribute("class", "divJugador__p")
            const pPosicion = document.createElement("p")
            pPosicion.innerText = jugador.posicion
            pPosicion.setAttribute("class", "")

            divJugador.append(pNombre,pPosicion)
            respEquipo2.append(divJugador)
        })
  }
  respuestaEquipos()
}

class Ply {
    constructor(id,nombre,cal,posicion){
        this.id=id
        this.nombre=nombre
        this.cal=cal
        this.posicion=posicion
    }
}

const subirArray=(array)=>{
    const arrayJSON=JSON.stringify(array)
    localStorage.setItem("JugadoresSeleccionados",arrayJSON)
}

const bajarArray=()=>{

    const arrayBajadoLs=localStorage.getItem("JugadoresSeleccionados")
    const parseoLs=JSON.parse(arrayBajadoLs)
    console.log(parseoLs)
    let doceSeleccionados = parseoLs
    
    armarEquipos(doceSeleccionados.sort(function(a,b){
      if (a.cal > b.cal) {
        return -1;
      }
      if (a.cal < b.cal) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }))
}


const jugadoresEnDom = () =>{
    
    datos.forEach((jugador)=>{
        let fila = document.createElement('div')
        fila.setAttribute('class','fila')
        let divNombre =document.createElement('div')
        let divBtn = document.createElement('div')
        fila.append(divNombre,divBtn)
        tablero.append(fila)
        let nombre = document.createElement('p')
        nombre.innerText = (jugador.nombre)
        nombre.setAttribute('class','fila__nombre')
        let btn = document.createElement('button')
        btn.setAttribute('type','button')
        btn.setAttribute('id', jugador.id)
        btn.setAttribute('name', jugador.nombre)
        btn.setAttribute('class', 'fila__btnSumar')
        btn.innerText = '+'
        
        btn.onclick =()=>{
            let changeClass = btn.getAttribute('class')
    
            if(changeClass==='fila__btnSumar'){
                btn.setAttribute('class','fila__btnRestar')
                btn.innerText = '-'
                jugadoresElegidos.push(new Ply(jugador.id,jugador.nombre,jugador.cal,jugador.posicion))

            } else {
                btn.setAttribute('class','fila__btnSumar')
                btn.innerText = '+'
                jugadoresElegidos.pop()
                
            }
            subirArray(jugadoresElegidos)

 
        }
        divNombre.append(nombre)
        divBtn.append(btn)
    })    
    let btnCrearEquipos = document.createElement('button')
    btnCrearEquipos.setAttribute('class','btnCrearEquipos')
    btnCrearEquipos.setAttribute('type','button')
    btnCrearEquipos.innerText = 'Crear Equipos'

    tablero.append(btnCrearEquipos)

    btnCrearEquipos.onclick = bajarArray

}

jugadoresEnDom()
