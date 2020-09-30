function OnClickInstrucciones(){
    $('#modalInstrucciones').modal('show')
}

var main = function(){
    $('#modalBienvenida').modal('show')
    document.getElementById("butInstrucciones").onclick = OnClickInstrucciones;
}

window.addEventListener("load", main)