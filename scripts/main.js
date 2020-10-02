function Mover(accion, mapaActual, mapaMinas){
    acciones = ["up", "down", "left", "right"]
    if(acciones.indexOf(accion) == -1){
        return "error: accion no definida"
    }
    CARACTER_FIN = "@"
    if(mapaActual.indexOf(CARACTER_FIN) >= 0){
        return "error: no se puede ejecutar más acciones"
    }
    matrixActual = mapaActual.trim().split("\n")
    matrixMinas = mapaMinas.trim().split("\n")
    if(matrixActual.length == 0){
        return "error: mapa actual no puede ser vacío"
    }
    if(matrixMinas.length == 0){
        return "error: mapa minas no puede ser vacío"
    }
    rowsActual = matrixActual.length
    colsActual = matrixActual[0].length
    for(i = 0; i < matrixActual.length; i++){
        if(matrixActual[i].length != colsActual){
            return "error: dimensiones incorrectas para mapa actual"
        }
        matrixActual[i] = matrixActual[i].split("")
    }    
    rowsMinas = matrixMinas.length
    colsMinas = matrixMinas[0].length
    for(i = 0; i < matrixMinas.length; i++){
        if(matrixMinas[i].length != colsMinas){
            return "error: dimensiones incorrectas para mapa minas"
        }
    }
    if(rowsActual != rowsMinas || colsActual != colsMinas){
        return "error: dimesiones distintas para mapa actual y minas"
    }
    CARACTER_POSICION_ACTUAL = "+"
    x = -1
    y = -1
    for(i = 0; i < matrixActual.length; i++){
        x = matrixActual[i].indexOf(CARACTER_POSICION_ACTUAL)
        if(x >= 0){
            y = i
            break
        }
    }
    x0 = x
    y0 = y
    switch(accion){
        case 'up':
            y--
            break;
        case 'down':
            y++
            break;
        case 'left':
            x--
            break;
        case 'right':
            x++
            break;
    }
    if(x < 0){
        x = 0
    }
    if(x >= colsActual){
        x = colsActual - 1
    }
    if(y < 0){
        y = 0
    }
    if(y >= rowsActual){
        y = rowsActual - 1
    }
    
    CARACTER_MINA = "$"
    CARACTER_META = "#"
    CARACTER_VACIO = "0"
    if(CARACTER_MINA == matrixMinas[y][x]){
        matrixActual[y][x] = CARACTER_MINA
    }else if(CARACTER_META == matrixMinas[y][x]){
        matrixActual[y][x] = CARACTER_FIN
        matrixActual[y0][x0] = CARACTER_VACIO
    }else{
        //avanzar        
        matrixActual[y0][x0] = CARACTER_VACIO
        matrixActual[y][x] = CARACTER_POSICION_ACTUAL
    }
    result = []
    for(i = 0 ; i < matrixActual.length ; i++){
        result.push(matrixActual[i].join(""))
    }
    return result.join("\n")
}

function ObtenerResultado(mapaActual, mapaPrevio){
    if(mapaActual == mapaPrevio){
        return "sin cambios"
    }
    if((mapaActual.match(/@/g) || []).length){
        return "fin"
    }
    minasActual = (mapaActual.match(/\$/g) || []).length
    minasPrevio = (mapaPrevio.match(/\$/g) || []).length
    if(minasActual > minasPrevio ){
        return "mina"
    }
    if(minasActual == minasPrevio ){
        return "sin mina"
    }    
}

function ObtenerMatrixDeMapa(mapa){
    matrixMapa = mapa.trim().split("\n")
    for(i = 0; i < matrixMapa.length; i++){
        matrixMapa[i] = matrixMapa[i].split("")
    }
    return matrixMapa
}

//ejemplo
mapaInicial = `
0000#
00000
00000
00000
+0000
`
mapaMinas = `
0000#
0$$$0
0$000
0$000
+$000
`
mapaActual = mapaInicial
console.log(mapaActual)
mapaPrevio = mapaActual
mapaActual = Mover("up", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(ObtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = Mover("up", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(ObtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = Mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(ObtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = Mover("up", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(ObtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = Mover("up", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(ObtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = Mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(ObtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = Mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(ObtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = Mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(ObtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = Mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(ObtenerResultado(mapaActual, mapaPrevio))
// 
console.log(ObtenerMatrixDeMapa(mapaActual))


function OnClickInstrucciones(){
    $('#modalInstrucciones').modal('show')
}

var ventanaJuego = true

var crearBotonJugar = function(){
    var boton = document.createElement("button")
    boton.setAttribute("type", "button")
    boton.setAttribute("class", "btn btn-primary btn-lg")
    boton.setAttribute("id", "boton_jugar")
    boton.innerHTML = "Jugar"
    return boton
}

var botonNuevoJuegoOnClick = function(evt){
    if(ventanaJuego == true){
        for (cuadrado of document.getElementsByClassName("square")){
            cuadrado.style.backgroundImage = "none"
        }
        document.querySelector("#grid_central").appendChild(crearBotonJugar())
        ventanaJuego = false
        evt.target.style.display = "none"
        document.querySelector("#boton_jugar").addEventListener("click", botonJugarOnClick)
        document.querySelector("#componentes_juego").style.display = "none"
    }
}

var botonJugarOnClick = function(){
    document.querySelector("#grid_central").innerHTML = ""
    for(cuadrado of document.getElementsByClassName("square")){
        cuadrado.style.backgroundImage = "url('../imagenes/map_earth.png')"
    }
    ventanaJuego = true
    document.querySelector("#boton_nuevo_juego").style.display = "block"
    document.querySelector("#componentes_juego").style.display = "block"
}

var main = function(){
    document.getElementById("butInstrucciones").onclick = OnClickInstrucciones;
    document.querySelector("#boton_nuevo_juego").addEventListener("click", botonNuevoJuegoOnClick)
}

window.addEventListener("load", main)