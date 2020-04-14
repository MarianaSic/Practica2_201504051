var textoHTML;

function mostrarTodo(){
    mostrarResultadoPython();
    mostrarVariables();
    mostrarHTML();
    mostrarJSON();
    mostrarErrores();
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
    var txtPython = document.getElementById("outputPython");
    var editPython = CodeMirror.fromTextArea(txtPython, {
        lineNumbers: true,
        theme: "neo",
        mode: "text/x-python",
        readOnly: true
    });
    editPython.setValue(traduccionPython);
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
    textoHTML = htmlResultante.replace(/'/g, "");
    var h = document.getElementById("outputHTML");
    var editHTML = CodeMirror.fromTextArea(h, {
        lineNumbers: true,
        theme: "neo",
        mode: "text/htmlmixed",
        readOnly: true
    });
    editHTML.setValue(textoHTML);
    //analizar lexicamente la cadena HTML
    lexicoToHTML(textoHTML, textoHTML.length);
    parser(tokenHTML);
}

function mostrarJSON(){
    var j = document.getElementById("outputJson");
    var editorJSON = CodeMirror.fromTextArea(j, {
        lineNumbers: true,
        theme: "neo",
        mode: {name:"javascript", json: true}
    });
    editorJSON.setValue(traduccionJson);
}

function descargarPython(){
    var f = new Blob([traduccionPython], {type: 'text/plain'});
    var nombre = nombreArchivo + ".py";
    if(window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(f, nombre);
    else{
        var a = document.createElement("a"), url = URL.createObjectURL(f);
        a.href = url;
        a.download = nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    }
}

function descargarHTML(){
    var f = new Blob([textoHTML], {type: 'text/html'});
    var nombre = nombreArchivo + ".html";
    if(window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(f, nombre);
    else{
        var a = document.createElement("a"), url = URL.createObjectURL(f);
        a.href = url;
        a.download = nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    }
}

function descargarJSON(){
    var f = new Blob([traduccionJson], {type: 'text/json'});
    var nombre = nombreArchivo + ".json";
    if(window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(f, nombre);
    else{
        var a = document.createElement("a"), url = URL.createObjectURL(f);
        a.href = url;
        a.download = nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    }
}