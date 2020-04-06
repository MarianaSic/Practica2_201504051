function mostrarTodo(){
    mostrarErrores();
    mostrarResultadoPython();
}


function mostrarErrores(){
    var tabla = document.getElementById('tablaErrores');
    tabla.removeChild(document.getElementById('bodyErrores'));
    var cuerpo = document.createElement('tbody');
    cuerpo.setAttribute('id', 'bodyErrores');

    for(var i = 0; i < listaError.length; i++){
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerHTML = (i+1);
        tr.appendChild(td1);
        var td2 = document.createElement('td');
        td2.innerHTML = listaError[i].tipo;
        tr.appendChild(td2);
        var td3 = document.createElement('td');
        td3.innerHTML = listaError[i].l;
        tr.appendChild(td3);
        var td4 = document.createElement('td');
        td4.innerHTML = listaError[i].c;
        tr.appendChild(td4);
        var td5 = document.createElement('td');
        td5.innerHTML = listaError[i].desc;
        tr.appendChild(td5);
        cuerpo.appendChild(tr);
    }
    tabla.appendChild(cuerpo);
}

function mostrarResultadoPython(){
    document.getElementById("outputPython").innerText = traduccionPython;
}