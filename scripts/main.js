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
var numNivel = 1
var listaMapaMinas = [mapaMinas1, mapaMinas2, mapaMinas3, mapaMinas4, mapaMinas5]
var mapaMinas = mapaMinas1
var mapaActual = mapaInicial
var mapaPrevio = mapaActual
var posAnterior = Posición(ObtenerMatrixDeMapa(mapaPrevio))
var posActual = Posición(ObtenerMatrixDeMapa(mapaActual))
var Vidas = 4
var estaBoxDirecciones=true
var cantMov=0
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
    var comp_resultado = document.querySelector("#componente_resultado")
    comp_resultado.className = "letras_comps text-warning"
    comp_resultado.innerHTML = cont
    document.getElementById("boton_nuevo_juego").disabled = true
    ActivarSonido_suspenso("suspenso")
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
    newImg.setAttribute("class", "img-fluid img-panel")
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
    ActivarSonido_explosion()
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
    var comp_res = document.querySelector("#componente_resultado")
    comp_res.innerHTML = "DESTRUIDO"
    comp_res.className = "letras_comps text-danger"
    AñadirImagen("robot_destruido.png",posActual)
    ActivarSonido_robotRip()
    setTimeout(function(){
        document.querySelector(".modal-title").innerHTML = "Vuelva a intentarlo"
        document.getElementById("img_id").setAttribute("src","../imagenes/lose.jpg")
        document.getElementById("mov_id").innerHTML="Movimientos: "+cantMov        
        document.getElementById("vida_id").innerHTML="Vidas: "+Vidas
        document.getElementById("butModal").className = "oculto"
        document.getElementById("Xmodal").className = "close visible"
        $('#modalAccion').modal({backdrop: 'static', keyboard: false})
        DesactivarSonido_RobotRip()
    },3000)

}

function AccionGanar(){
    OcultarDirecciones()
    SoldadoRescatado()
    setTimeout(function(){
        document.getElementById("img_id").setAttribute("src","../imagenes/next.jpg")
        document.getElementById("mov_id").innerHTML="Movimientos: "+cantMov        
        document.getElementById("vida_id").innerHTML="Vidas: "+Vidas
        if(numNivel==5){
            //cambiar cuando sea el ultimo nivel
            document.getElementById("img_id").setAttribute("src","../imagenes/win.jpg")
            document.querySelector(".modal-title").innerHTML = "Fin del juego ¡Felicidades!"
            document.getElementById("butModal").className = "oculto"
            document.getElementById("Xmodal").className = "close visible"
        }
        $('#modalAccion').modal({backdrop: 'static', keyboard: false})
    },3000)
}
function CrearNivel(){
    var aux = document.getElementById("componente_nivel")
    aux.innerHTML = numNivel
    aux.className = "letras_comps text-primary"
}
function NextNivel(){
    numNivel++
    //Vidas++ //maximo 4
    estaBoxDirecciones=true
    mapaMinas = listaMapaMinas[numNivel-1]
    document.getElementById("componente_resultado").innerHTML = "----"
    document.getElementById("componente_resultado").className = "letras_comps text-primary"
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
    var comp_res = document.querySelector("#componente_resultado")
    if(result == "sin mina"){
        comp_res.innerHTML = "ALIVIO"
        comp_res.className = "letras_comps text-primary"
    }else if(result == "mina"){
        comp_res.innerHTML = "EXPLOSIÓN"
        comp_res.className = "letras_comps text-danger"
    }else if(result == "fin"){
        comp_res.innerHTML = "FELICIDADES"
        comp_res.className = "letras_comps text-success"
    }else{
        comp_res.innerHTML = "RESTRINGIDO"
        comp_res.className = "letras_comps text-warning"
    }
}

function Actualizar(){
    document.getElementById("boton_nuevo_juego").disabled = false
    var resp = (ObtenerResultado(mapaActual,mapaPrevio));
    console.log(resp)
    mensajeResultado(resp);
    posAnterior = Posición(ObtenerMatrixDeMapa(mapaPrevio));
    posActual = Posición(ObtenerMatrixDeMapa(mapaActual));
    mapaPrevio = mapaActual;
    BorrarRobot(posAnterior);
    AñadirRobot(posActual);
    cantMov++
    DesactivarSonido_suspenso()
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
    $('#modalInstrucciones').modal({backdrop: 'static', keyboard: false})
}

var ventanaJuego = true

var crearBotonJugar = function(){
    var div  = document.createElement("div")
    div.className = "row align-items-center justify-content-center"
    var boton = document.createElement("button")
    boton.setAttribute("type", "button")
    boton.setAttribute("class", "btn btn-primary btn-lg")
    boton.setAttribute("id", "boton_jugar")
    boton.innerHTML = "Jugar"
    div.appendChild(boton)
    return div
}

var reiniciarJuego = function(){
    mapaActual = mapaInicial
    mapaPrevio = mapaActual
    posActual = Posición(ObtenerMatrixDeMapa(mapaInicial))
    posAnterior = Posición(ObtenerMatrixDeMapa(mapaInicial))
    numNivel = 1
    cantMov = 0
    mapaMinas = mapaMinas1
    estaBoxDirecciones=true
    Vidas=4
    document.getElementById("butModal").className = "btn btn-block btn-success visible"
    document.getElementById("Xmodal").className = "close oculto"
    document.querySelector("#barraVida").setAttribute("src", "../imagenes/heart_100.png")
    var compRest = document.querySelector("#componente_resultado")
    compRest.innerHTML = "----"
    compRest.className = "letras_comps text-primary"
    var compNivel = document.getElementById("componente_nivel")
    compNivel.innerHTML = numNivel
    compNivel.className = "letras_comps text-primary"
}

var botonNuevoJuegoOnClick = function(evt){
    if(ventanaJuego == true){
        reiniciarJuego()
        document.querySelector("#componentes_juego").className = "row container col-12 oculto"
        document.querySelector("#barraVida").className = "img-fluid oculto"
        var conten_juego = document.querySelector("#contenedor_juego")
        conten_juego.innerHTML = ""
        conten_juego.appendChild(crearBotonJugar())
        ventanaJuego = false
        evt.target.className = "btn btn-primary oculto"
        document.querySelector("#boton_jugar").addEventListener("click", botonJugarOnClick)
        OcultarDirecciones()
    }
}

var crearCuadrados = function(){
    var contenedor_juego = document.querySelector("#contenedor_juego")
    contenedor_juego.innerHTML = ""
    for(var y=0; y<5; y++){
        var fila = document.createElement("div")
        fila.className = "row"
        for(var x=0; x<5; x++){
            var square = document.createElement("div")
            square.className = "col square border border-dark"
            square.id = "pos-x"+x+"-y"+y
            fila.appendChild(square)
        }
        contenedor_juego.appendChild(fila)
    }
}

var botonJugarOnClick = function(){
    crearCuadrados()
    document.querySelector("#componentes_juego").className = "row container col-12 visible"
    ventanaJuego = true
    document.querySelector("#boton_nuevo_juego").className = "btn btn-primary inline"
    document.querySelector("#barraVida").className = "img-fluid inline"
    var robot = document.createElement("img")
    robot.setAttribute("src", "../imagenes/robot_pos.png")
    robot.setAttribute("class", "img-fluid img-panel")
    document.querySelector("#pos-x0-y4").appendChild(robot)
    AuxiliadoInitial()
    MostrarDirecciones()
    //location.reload()
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

function ActivarSonido_suspenso(song){
    var song = document.getElementById("audio_suspenso")
    song.play()
}
function DesactivarSonido_suspenso(){
    var song = document.getElementById("audio_suspenso")
    song.setAttribute("src", "../audios/suspenso.mp3")
    song.pause()
}

function ActivarSonido_explosion(song){
    var song = document.getElementById("audio_explosion")
    song.play()
}
function DesactivarSonido_explosion(){
    var song = document.getElementById("audio_explosion")
    song.setAttribute("src", "../audios/explosion.mp3")
    song.pause()
}

function ActivarSonido_robotRip(song){
    var song = document.getElementById("audio_robotRip")
    song.play()
}
function DesactivarSonido_RobotRip(){
    var song = document.getElementById("audio_robotRip")
    song.setAttribute("src", "../audios/robotRip.mp3")
    song.pause()
}

var main = function(){
    AuxiliadoInitial()
    document.getElementById("butInstrucciones").onclick = OnClickInstrucciones;
    document.getElementById("butModal").onclick = NextNivel;
    document.getElementById("butUp").onclick =OnClickButUp;
    document.getElementById("butDown").onclick =OnClickButDown;
    document.getElementById("butLeft").onclick =OnClickButLeft;
    document.getElementById("butRight").onclick =OnClickButRight;
    document.querySelector("#boton_nuevo_juego").addEventListener("click", botonNuevoJuegoOnClick)
    document.addEventListener("keyup", flechasTecladoPressed)
}

window.addEventListener("load", main)