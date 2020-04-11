var traduccionJson = "";
var j = 0;
var cantTabs = 2;
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
            if(!(tkHIgual(listaH[j].valor, "<") && tkHIgual(listaH[j].valor, "/") && tkHIgual(listaH[j].tipo, "Palabra reservada: html") && tkHIgual(listaH[j].valor, ">"))){
                let error1 = {tipo: 'Sintáctico HTML', l: listaH[j].l, c: listaH[j].c, desc: ' Se esperaba </html>'};
                listaError.push(error1);
            }else{  traduccionJson+="}\n";}
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
            if(!(tkHIgual(listaH[j].valor, "<") && tkHIgual(listaH[j].valor, "/") && tkHIgual(listaH[j].tipo, "Palabra reservada: head") && tkHIgual(listaH[j].valor, ">"))){
                let error1 = {tipo: 'Sintáctico HTML', l: listaH[j].l, c: listaH[j].c, desc: ' Se esperaba </head>'};
                listaError.push(error1);
            }else{  traduccionJson+="\t}\n";}
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
            if(!(tkHIgual(listaH[j].valor, "<") && tkHIgual(listaH[j].valor, "/") && tkHIgual(listaH[j].tipo, "Palabra reservada: title") && tkHIgual(listaH[j].valor, ">"))){
                let error1 = {tipo: 'Sintáctico HTML', l: listaH[j].l, c: listaH[j].c, desc: ' Se esperaba </title>'};
                listaError.push(error1);
            }else{  traduccionJson+="\t\t}\n";}
        }else{
            let error1 = {tipo: 'Sintáctico HTML', l: listaH[j].l, c: listaH[j].c, desc: ' Se esperaba <title>'};
            listaError.push(error1);
        }
    }
}

function CUERPO(){
    if(j < listaH.length){
        if(tkHIgual(listaH[j].valor, "<") && tkHIgual(listaH[j].tipo, "Palabra reservada: body")){
            traduccionJson+="\t\"BODY\":{\n"
            STYLE(2);
            if(tkHIgual(listaH[j].valor, ">")){
                LETIQ(2);
                if(!(tkHIgual(listaH[j].valor, "<") && tkHIgual(listaH[j].valor, "/") && tkHIgual(listaH[j].tipo, "Palabra reservada: body") && tkHIgual(listaH[j].valor, ">"))){
                    let error1 = {tipo: 'Sintáctico HTML', l: listaH[j].l, c: listaH[j].c, desc: ' Se esperaba </title>'};
                    listaError.push(error1);
                }else{  traduccionJson+="\t}\n";}
            }
        }else{
            let error1 = {tipo: 'Sintáctico HTML', l: listaH[j].l, c: listaH[j].c, desc: ' Se esperaba <title>'};
            listaError.push(error1);
        }
    }
}

function LETIQ(numTab){
    if(j < listaH.length){
        if(tkHIgual(listaH[j].valor, "<")){
            if(tkHIgual(listaH[j].valor.toLowerCase(), "div")){
                for(var t = 0; t < numTab; t++)
                    traduccionJson+="\t";
                
                traduccionJson+="\"DIV\":{\n";
                STYLE(numTab+1);
                if(tkHIgual(listaH[j].valor, ">")){
                    LETIQ(numTab+1);
                    if(tkHIgual(listaH[j].valor, "<") && tkHIgual(listaH[j].valor, "/") && tkHIgual(listaH[j].valor.toLowerCase(), "div") && tkHIgual(listaH[j].valor, ">")){
                        
                        for(var t = 0; t < numTab; t++)
                            traduccionJson+="\t";
                        traduccionJson+="}\n"
                        LETIQ(numTab);
                    }
                }
            }else if(tkHIgual(listaH[j].valor.toLowerCase(), "br") || tkHIgual(listaH[j].valor.toLowerCase(), "input")){
                var etiq = listaH[j-1].valor.toLowerCase();
                if(tkHIgual(listaH[j].valor, ">")){
                    for(var t = 0; t < numTab; t++)
                        traduccionJson+="\t";
                
                    traduccionJson+= "\"" + etiq.toUpperCase() + "\":\"true\",\n";
                    LETIQ(numTab);
                }
            }else if(tkHIgual(listaH[j].valor.toLowerCase(), "p") || tkHIgual(listaH[j].valor.toLowerCase(), "h1") || tkHIgual(listaH[j].valor.toLowerCase(), "h2") 
            || tkHIgual(listaH[j].valor.toLowerCase(), "h3") || tkHIgual(listaH[j].valor.toLowerCase(), "h4") ||
            tkHIgual(listaH[j].valor.toLowerCase(), "button") || tkHIgual(listaH[j].valor.toLowerCase(), "label")){
                var etiq = listaH[j-1].valor.toLowerCase();
                if(tkHIgual(listaH[j].valor, ">")){
                    for(var t = 0; t < numTab; t++)
                        traduccionJson+="\t";
                
                    traduccionJson+= "\"" + etiq.toUpperCase() + "\":{\n";
                    CADENA(numTab+1);
                    if(tkHIgual(listaH[j].valor, "<") && tkHIgual(listaH[j].valor, "/") && tkHIgual(listaH[j].valor.toLowerCase(), etiq) && tkHIgual(listaH[j].valor, ">")){
                        
                        for(var t = 0; t < numTab; t++)
                            traduccionJson+="\t";
                        traduccionJson+="}\n"
                        LETIQ(numTab);
                    }
                }
            }else j--;
        }
    }
}

function STYLE(numTab){
    if(j < listaH.length){
        if(tkHIgual(listaH[j].valor.toLowerCase(), "style")){
            if(tkHIgual(listaH[j].valor, "=") && tkHIgual(listaH[j].valor, "\"")
            && tkHIgual(listaH[j].valor.toLowerCase(), "background") && tkHIgual(listaH[j].valor, ":")){
                for(var t = 0; t < numTab; t++)
                    traduccionJson+="\t";
                
                traduccionJson+="\"STYLE\":\"background:";
                COLOR();
                if(tkHIgual(listaH[j].valor, "\""))traduccionJson+="\",\n";
            }
        } 
    }
}

function COLOR(){
    if(j < listaH.length){
        var color = listaH[j].valor.toLowerCase();
        if(tkHIgual(color, "yellow") || tkHIgual(color, "green") || tkHIgual(color, "blue") || tkHIgual(color, "white") 
        || tkHIgual(color, "skyblue") || tkHIgual(color, "red"))traduccionJson+=color;
        else{
            let error1 = {tipo: 'Sintáctico HTML', l: listaH[j].l, c: listaH[j].c, desc: ' Se esperaba un color válido y vino ' + color};
            listaError.push(error1);
        }
    }
}

function CADENA(numTab){
    if(j < listaH.length){
        if(tkHIgual(listaH[j].iden, 6)){ // es cadena
            for(var t = 0; t < numTab; t++)
                traduccionJson+="\t";
            
            traduccionJson+="\"TEXTO\":\""+listaH[j-1].valor+"\",\n";
            CADENA(numTab);
        }else if(tkHIgual(listaH[j].valor, "<")){
            if(tkHIgual(listaH[j].valor.toLowerCase(), "br") && tkHIgual(listaH[j].valor, ">")){
                for(var t = 0; t < numTab; t++)
                    traduccionJson+="\t";
                
                traduccionJson+="\"BR\":\"true\",\n"
                CADENA(numTab);
            }else j--;
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