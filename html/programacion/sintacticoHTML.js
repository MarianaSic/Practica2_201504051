var traduccionJson = "";
var j = 0;
var listaH = new Array();

function parser(l){
    listaH = l;
    INICIO();
}

function INICIO(){
    if(j < listaH.length){
        if(tkHIgual(listaH[j].valor, "<") && tkHIgual(listaH[j].tipo, "Palabra reservada: html") && tkHIgual(listaH[j].valor, ">")){
            traduccionJson+="\"HTML\":{\n"
            DOCUMENTO();
            if(!tkHIgual(listaH[j].valor, "<") && tkHIgual(listaH[j].valor, "/") && tkHIgual(listaH[j].tipo, "Palabra reservada: html") && tkHIgual(listaH[j].valor, ">")){
                let error1 = {tipo: 'Sintáctico HTML', l: listaH[j].l, c: listaH[j].c, desc: ' Se esperaba </html>'};
                listaError.push(error1);
            }else traduccionJson+="}\n";
        }else{
            let error1 = {tipo: 'Sintáctico HTML', l: listaH[j].l, c: listaH[j].c, desc: ' Se esperaba <html>'};
            listaError.push(error1);
        }
    }
}

function DOCUMENTO(){
    HEAD();
    CUERPO();
}

function HEAD(){
    if(j < listaH.length){
        if(tkHIgual(listaH[j].valor, "<") && tkHIgual(listaH[j].tipo, "Palabra reservada: head") && tkHIgual(listaH[j].valor, ">")){
            traduccionJson+="\t\"HEAD\":{\n"
            TITLE();
            if(!tkHIgual(listaH[j].valor, "<") && tkHIgual(listaH[j].valor, "/") && tkHIgual(listaH[j].tipo, "Palabra reservada: head") && tkHIgual(listaH[j].valor, ">")){
                let error1 = {tipo: 'Sintáctico HTML', l: listaH[j].l, c: listaH[j].c, desc: ' Se esperaba </head>'};
                listaError.push(error1);
            }else traduccionJson+="\t}\n";
        }else{
            let error1 = {tipo: 'Sintáctico HTML', l: listaH[j].l, c: listaH[j].c, desc: ' Se esperaba <head>'};
            listaError.push(error1);
        }
    }
}

function TITLE(){
    if(j < listaH.length){
        if(tkHIgual(listaH[j].valor, "<") && tkHIgual(listaH[j].tipo, "Palabra reservada: title") && tkHIgual(listaH[j].valor, ">")){
            traduccionJson+="\t\t\"TITLE\":{\n"
            CADENA(3);
            if(!tkHIgual(listaH[j].valor, "<") && tkHIgual(listaH[j].valor, "/") && tkHIgual(listaH[j].tipo, "Palabra reservada: title") && tkHIgual(listaH[j].valor, ">")){
                let error1 = {tipo: 'Sintáctico HTML', l: listaH[j].l, c: listaH[j].c, desc: ' Se esperaba </title>'};
                listaError.push(error1);
            }else traduccionJson+="\t\t}\n";
        }else{
            let error1 = {tipo: 'Sintáctico HTML', l: listaH[j].l, c: listaH[j].c, desc: ' Se esperaba <title>'};
            listaError.push(error1);
        }
    }
}

function CUERPO(){

}

function CADENA(numTab){
    if(j < listaH.length){
        console.log(listaH[j].iden)
        if(tkHIgual(listaH[j].iden, 6)){
            for(var t = 0; t < numTab; t++)
                traduccionJson+="\t";
            
            traduccionJson+="\"TEXTO\":\""+listaH[j-1].valor+"\"\n";
        }
    }
}

function tkHIgual(elemento, entrada){
    if(elemento == entrada){
        if(j < listaH.length){
            j++;
            return true;
        }
        else return false;
    }else return false;
}