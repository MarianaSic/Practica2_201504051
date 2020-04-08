function mostrarTodo(){
    mostrarErrores();
    mostrarResultadoPython();
    mostrarVariables();
    mostrarHTML();
    mostrarJSON();
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
    document.getElementById("outputPython").innerText = "";
    document.getElementById("outputPython").innerText = traduccionPython;
}

function mostrarVariables(){
    var tabla = document.getElementById('tablaVariables');
    tabla.removeChild(document.getElementById('bodyVariables'));
    var cuerpo = document.createElement('tbody');
    cuerpo.setAttribute('id', 'bodyVariables');

    for(var i = 0; i < listaVariables.length; i++){
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerHTML = listaVariables[i].nombre;
        tr.appendChild(td1);
        var td2 = document.createElement('td');
        td2.innerHTML = listaVariables[i].tipo;
        tr.appendChild(td2);
        var td3 = document.createElement('td');
        td3.innerHTML = listaVariables[i].linea;
        tr.appendChild(td3);
        cuerpo.appendChild(tr);
    }
    tabla.appendChild(cuerpo);
}

function mostrarHTML(){
    document.getElementById("outputHTML").innerText = "";
    var textoHTML = htmlResultante.replace(/'/g, "");
    document.getElementById("outputHTML").innerText = textoHTML;
    //analizar lexicamente la cadena HTML
    lexicoToHTML(textoHTML, textoHTML.length);
    parser(tokenHTML);
}

function mostrarJSON(){
    document.getElementById("outputJson").innerText = "";
    document.getElementById("outputJson").innerText = traduccionJson;
}