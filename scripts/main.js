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
mapaMinas1 = `
0000#
0$$$0
0$000
0$000
+$000
`
mapaMinas2 = `
000$#
0$0$0
0$000
000$$
+$$0$
`
mapaMinas3 = `
$00$#
00$$0
0$$00
0$$0$
+000$
`
mapaMinas4 = `
$$00#
0$0$0
0$00$
00$0$
+000$
`
mapaMinas5 = `
000$#
0$0$0
0$0$0
0$0$0
+$000
`

//=====VARIABLES INICIALES=====
numNivel = 1
listaMapaMinas = [mapaMinas1, mapaMinas2, mapaMinas3, mapaMinas4, mapaMinas5]
mapaMinas = mapaMinas1
mapaActual = mapaInicial
mapaPrevio = mapaActual
posAnterior = Posición(ObtenerMatrixDeMapa(mapaPrevio))
posActual = Posición(ObtenerMatrixDeMapa(mapaActual))
Vidas = 4
estaBoxDirecciones=true
//==========CODIGO==========
function Posición(matriz){
    var posActual = new Object()
    posActual.x=4
    posActual.y=0
    for(var i=0;i<matriz.length;i++){
        for(var j=0;j<matriz.length;j++){
            if(matriz[i][j]=="+"){
                posActual.x=j
                posActual.y=i
                return posActual
            }
        }
    }    
    return posActual
}

function cuentaRegresiva(){
    var cont = 3
    var comp_resultado = document.querySelector("#componente_resultado").firstElementChild
    comp_resultado.style.color = 'white'
    comp_resultado.innerHTML = cont
    interval = setInterval(function(){
        if(cont<=0){
            clearInterval(self)
        }else{
            comp_resultado.innerHTML = --cont
        }
    },1000)
}

function OcultarDirecciones(){
    boxDirecciones = document.querySelector("#contenedor_flechas")
    boxDirecciones.className = "oculto"
    estaBoxDirecciones=false
}
function MostrarDirecciones(){
    boxDirecciones = document.querySelector("#contenedor_flechas")
    boxDirecciones.className = "visible"
    estaBoxDirecciones=true
}

function AñadirImagen(img, posicion){
    var aux = document.getElementById("pos-x"+posicion.x+"-y"+posicion.y)
    if(aux.firstElementChild!=null){
        aux.removeChild(aux.firstElementChild)
    }
    var newImg = document.createElement("img")
    newImg.setAttribute("src","../imagenes/"+img)
    newImg.setAttribute("class", "img-fluid")
    aux.appendChild(newImg)
}

function OnClickButUp(){
    cuentaRegresiva()
    AñadirImagen("robot_up_mov.png", posActual)
    OcultarDirecciones()
    setTimeout(function(){
        mapaActual = Mover("up",mapaActual,mapaMinas)
        Actualizar()
    },3000)    
    
}

function OnClickButDown(){
    cuentaRegresiva()
    AñadirImagen("robot_down_mov.png", posActual)
    OcultarDirecciones()
    setTimeout(function(){
        mapaActual = Mover("down",mapaActual,mapaMinas)
        Actualizar()
    },3000)
}

function OnClickButLeft(){
    cuentaRegresiva()
    AñadirImagen("robot_left_mov.png", posActual)
    OcultarDirecciones()
    setTimeout(function(){
        mapaActual = Mover("left",mapaActual,mapaMinas)
        Actualizar()
    },3000)
}

function OnClickButRight(){
    cuentaRegresiva()
    AñadirImagen("robot_right_mov.png", posActual)
    OcultarDirecciones()
    setTimeout(function(){
        mapaActual = Mover("right",mapaActual,mapaMinas)
        Actualizar()
    },3000)
}


function PerderVida(){
    MostrarDirecciones()
    var aux = document.getElementById("panel_profile").lastElementChild
    Vidas--
    switch(Vidas){
        case 3:
            aux.setAttribute("src","../imagenes/heart_75.png")
            break;
        case 2:
            aux.setAttribute("src","../imagenes/heart_50.png")
            break;
        case 1:
            aux.setAttribute("src","../imagenes/heart_25.png")
            break;
        case 0:
            aux.setAttribute("src","../imagenes/heart_0.png")
            AccionPerder()
            break;
    }
}

function AccionPerder(){
    OcultarDirecciones()
    //Mensaje de que perdió, hacer que se destruya el robot
    var comp_res = document.querySelector("#componente_resultado").firstElementChild
    comp_res.innerHTML = "DESTRUIDO"
    comp_res.color = "orangered"
    //Reiniciar juego
    alert("Perdiste")
    setTimeout(function(){
        location.href="main.html"
    },5000)

}

function AccionGanar(){
    OcultarDirecciones()
    SoldadoRescatado()
    setTimeout(function(){NextNivel()},5000)
}
function CrearNivel(){
    var aux = document.getElementById("componente_nivel").firstElementChild
    aux.innerHTML = "Nivel: "+numNivel
}
function NextNivel(){
    numNivel++
    //Vidas++ //maximo 4
    estaBoxDirecciones=true
    mapaMinas = listaMapaMinas[numNivel-1]
    MostrarDirecciones()
    AuxiliadoInitial()
    CrearNivel()
    BorrarMinas(ObtenerMatrixDeMapa(mapaPrevio))
    mapaActual = mapaInicial
    mapaPrevio = mapaActual
    posAnterior = Posición(ObtenerMatrixDeMapa(mapaPrevio))
    posActual = Posición(ObtenerMatrixDeMapa(mapaActual))
    AñadirImagen("robot_pos.png",posActual)
}

function AñadirMina(posX,posY){
    var posBomba = new Object()
    posBomba.x = posX
    posBomba.y = posY
    AñadirImagen("bomba_2.png",posBomba)   
}

function BorrarMinas(matriz){
    for(var i=0;i<matriz.length;i++){
        for(var j=0;j<matriz.length;j++){
            if(matriz[i][j]=="$"){
                var aux = document.getElementById("pos-x"+j+"-y"+i)
                if(aux.firstElementChild!=null){
                    aux.removeChild(aux.firstElementChild)
                }          
            }
        }
    }
}

function BuscarMinas(matriz){
    BorrarMinas(matriz)
    for(var i=0;i<matriz.length;i++){
        for(var j=0;j<matriz.length;j++){
            if(matriz[i][j]=="$"){
                AñadirMina(j,i)
            }
        }
    }
}

function BorrarRobot(posicion){
    var aux = document.getElementById("pos-x"+posicion.x+"-y"+posicion.y)
    aux.removeChild(aux.firstElementChild)
}

function AñadirRobot(posicion){
    AñadirImagen("robot_pos.png",posicion)
}

var mensajeResultado = function(result){
    var comp_res = document.querySelector("#componente_resultado").firstElementChild
    if(result == "sin mina"){
        comp_res.innerHTML = "ALIVIO"
        comp_res.style.color = "royalblue"
    }else if(result == "mina"){
        comp_res.innerHTML = "EXPLOSIÓN"
        comp_res.style.color = "orangered"
    }
}

function Actualizar(){
    var resp = (ObtenerResultado(mapaActual,mapaPrevio));
    mensajeResultado(resp);
    posAnterior = Posición(ObtenerMatrixDeMapa(mapaPrevio));
    posActual = Posición(ObtenerMatrixDeMapa(mapaActual));
    mapaPrevio = mapaActual;
    BorrarRobot(posAnterior);
    AñadirRobot(posActual);
    if(resp=="mina"){
        BuscarMinas(ObtenerMatrixDeMapa(mapaPrevio));
        PerderVida();
    }else if(resp=="fin"){
        AccionGanar();
    }else{
        MostrarDirecciones()
    }
}

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

var reiniciarJuego = function(){
    mapaActual = mapaInicial
    mapaPrevio = mapaActual
    for(square of document.getElementsByClassName("square")){
        square.innerHTML = ""
    }
    Vidas = 4
    document.querySelector("#barraVida").setAttribute("src", "../imagenes/heart_100.png")
}

var botonNuevoJuegoOnClick = function(evt){
    if(ventanaJuego == true){
        reiniciarJuego()
        for(square of document.getElementsByClassName("square")){
            square.style.backgroundImage = "none"
        }
        document.querySelector("#componentes_juego").style.display = "none"
        document.querySelector("#barraVida").style.display = "none"
        document.querySelector("#pos-x2-y2").appendChild(crearBotonJugar())
        ventanaJuego = false
        evt.target.style.display = "none"
        document.querySelector("#boton_jugar").addEventListener("click", botonJugarOnClick)
    }
}

var botonJugarOnClick = function(){
    document.querySelector("#pos-x2-y2").innerHTML = ""
    for(square of document.getElementsByClassName("square")){
        square.style.backgroundImage = "url('../imagenes/map_earth.png')"
    }
    document.querySelector("#componentes_juego").style.display = "block"
    ventanaJuego = true
    document.querySelector("#boton_nuevo_juego").style.display = "inline"
    document.querySelector("#barraVida").style.display = "inline"
    var robot = document.createElement("img")
    robot.setAttribute("src", "../imagenes/robot_pos.png")
    robot.setAttribute("class", "img-fluid")
    document.querySelector("#pos-x0-y4").appendChild(robot)
}

var flechasTecladoPressed = function(evt){
    if(estaBoxDirecciones==true){
        switch(evt.keyCode){
            case 37: OnClickButLeft(); break;
            case 38: OnClickButUp(); break;
            case 39:  OnClickButRight(); break;
            case 40:  OnClickButDown(); break;
        }
    }
}

function AuxiliadoInitial(){
    var posFinal = new Object()
    posFinal.x = 4
    posFinal.y = 0
    AñadirImagen("soldado.png",posFinal)
}

function SoldadoRescatado(){
    var posFinal = new Object()
    posFinal.x = 4
    posFinal.y = 0
    AñadirImagen("soldado_rescatado_victoria.png",posFinal)
}

var main = function(){
    AuxiliadoInitial()
    document.getElementById("butInstrucciones").onclick = OnClickInstrucciones;
    document.getElementById("butUp").onclick =OnClickButUp;
    document.getElementById("butDown").onclick =OnClickButDown;
    document.getElementById("butLeft").onclick =OnClickButLeft;
    document.getElementById("butRight").onclick =OnClickButRight;
    document.querySelector("#boton_nuevo_juego").addEventListener("click", botonNuevoJuegoOnClick)
    document.addEventListener("keyup", flechasTecladoPressed)
}

window.addEventListener("load", main)