function OnClickInstrucciones(){
    $('#modalInstrucciones').modal({backdrop: 'static', keyboard: false})
}

var main = function(){
    $('#modalBienvenida').modal({show: true, backdrop: 'static', keyboard: false})
    document.getElementById("index_butInstrucciones").onclick = OnClickInstrucciones;
}

window.addEventListener("load", main)