var i = 0;
var lista;
var quebrar = true;

function sintacticoToPython(listaTokens){
    lista = listaTokens;
    INICIO();
}

function INICIO(){
    LINSTRUCCION();
}

function LINSTRUCCION(){
    INSTRUCCION();
    LINSTRUCCION();
}

function INSTRUCCION(){
    if(tkIgual(lista[i].iden, 8)){
        // es comentario simple
        console.log(lista[i].valor);
    }else if(tkIgual(lista[i].iden, 9)){
        // es comentario multilinea
        console.log(lista[i].valor);
    }else if(tkIgual(lista[i].iden, 2)){
        //son palabras reservadas
        i--;
        switch(lista[i].valor){
            case "int":
                console.log("es int");
                break;
        }
    }
}


function tkIgual(numero, entrada){
    if(numero == entrada){
        if(i < lista.length){
            i++;
            return true;
        }
    }
    else return false;
}
