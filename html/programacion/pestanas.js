var tabs = 2;
var listaEditor = new Array();
var liActual = document.createElement('li');
function resetAll(){
    tabs = 2;
    listaEditor = [];
    liActual = document.createElement('li');
    var padre = document.getElementById('tabsPadre');
    var li = document.createElement('li');
    li.setAttribute('class', 'nav-item');
    li.setAttribute('id', 'li1');
    var a = document.createElement('a');
    a.setAttribute('class', 'nav-link active');
    a.setAttribute('data-toggle', 'tab');
    a.setAttribute('href', '#t1');
    a.setAttribute('role', 'tab');
    var sp1 = document.createElement('span');
    sp1.setAttribute('class', 'hidden-sm-up');
    a.appendChild(sp1);
    a.innerHTML = '<span class="hidden-xs-down"><span class="hidden-xs-down"><i class="m-r-10 mdi mdi-close-circle-outline" onclick="cerrarVentanta()"></i><span>Bienvenido</span></span>';
    li.appendChild(a);
    li.setAttribute('onclick', "javascript:setPestanaActual(this);");
    padre.appendChild(li);
    // colocar el cuerpo de la pestana
    var cuerpoTabs = document.getElementById('lugardeTabs');
    var div1 = document.createElement('div');
    div1.setAttribute('class', 'tab-pane  active');
    div1.setAttribute('id', 't1');
    div1.setAttribute('role', 'tabpanel');
    var div2 = document.createElement('div');
    div2.setAttribute('class', 'p-20');
    var txt = document.createElement('textarea');
    txt.setAttribute('id', 'txtEntrada');
    div2.appendChild(txt);
    div1.appendChild(div2);
    cuerpoTabs.appendChild(div1);
    var myTextarea = document.getElementById("txtEntrada");
    var editor = CodeMirror.fromTextArea(myTextarea, {
        lineNumbers: true,
        theme: "idea",
        mode: "text/x-csharp"
    });
    editor.setValue("\t/* ¡Bienvenido!\n \t\tComience colocando su\n\t\tcódigo C# acá\t*/\n");
    let editores = {caja: editor, nombre: 'Bienvenido'};
    listaEditor.push(editores);
}
function nuevaPestana(){
    // colocar el encabezado
    var padre = document.getElementById('tabsPadre');
    var li = document.createElement('li');
    li.setAttribute('class', 'nav-item');
    li.setAttribute('id', 'li' + tabs);
    var a = document.createElement('a');
    a.setAttribute('class', 'nav-link');
    a.setAttribute('data-toggle', 'tab');
    a.setAttribute('href', '#t' + tabs);
    a.setAttribute('role', 'tab');
    var sp1 = document.createElement('span');
    sp1.setAttribute('class', 'hidden-sm-up');
    a.appendChild(sp1);
    a.innerHTML = '<span class="hidden-xs-down"><span class="hidden-xs-down"><i class="m-r-10 mdi mdi-close-circle-outline" onclick="cerrarVentanta()"></i><span>Pestaña ' + tabs + '</span></span>';
    li.appendChild(a);
    li.setAttribute('onclick', "javascript:setPestanaActual(this);");
    padre.appendChild(li);
    // colocar el cuerpo de la pestana
    var cuerpoTabs = document.getElementById('lugardeTabs');
    var div1 = document.createElement('div');
    div1.setAttribute('class', 'tab-pane  active');
    div1.setAttribute('id', 't' + tabs);
    div1.setAttribute('role', 'tabpanel');
    var div2 = document.createElement('div');
    div2.setAttribute('class', 'p-20');
    var txt = document.createElement('textarea');
    txt.setAttribute('id', 'txt' + tabs);
    div2.appendChild(txt);
    div1.appendChild(div2);
    cuerpoTabs.appendChild(div1);
    var editor = CodeMirror.fromTextArea(document.getElementById('txt' + tabs), {
        lineNumbers: true,
        theme: "idea",
        mode: "text/x-csharp"
    });
    editor.setValue("\t/* Todo el\n \t\tcódigo acá\t*/\n");
    let editores = {caja: editor, nombre: 'Pestaña ' + tabs};
    listaEditor.push(editores);
    tabs++;
}

function setPestanaActual(atributo){
    liActual = atributo;
}

function guardarPestana(){
    var actual = liActual.getAttribute('id').replace("li","") - 1;
    const entrada = listaEditor[actual].caja.getValue() + "\n";
    var f = new Blob([entrada], {type: 'text/cs'});
    var nombre = listaEditor[actual].nombre + ".cs";
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

function cerrarVentanta(){
    var posActual = liActual.getAttribute('id').replace("li","");
    var padre = document.getElementById('tabsPadre');
    padre.removeChild(document.getElementById('li' + posActual));
    var cuerpoTabs = document.getElementById('lugardeTabs');
    cuerpoTabs.removeChild(document.getElementById('t' + posActual));
}