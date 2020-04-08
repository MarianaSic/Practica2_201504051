var i = 0;
var lista, tamano;
var traduccionPython = "\n";
var htmlResultante = "";
var listaVariables = new Array();

function sintacticoToPython(){
    lista = listaToken;
    tamano = listaToken.length;
    LINSTRUCCION();
}

function LINSTRUCCION(){
    if(i < tamano){
        if(tkIgual(lista[i].tipo, 'Comentario Simple')){
            traduccionPython+=lista[i-1].valor.replace("//", "#");
            LINSTRUCCION();
        }else if(tkIgual(lista[i].tipo, 'Comentario Multilínea')){
            var var1 = lista[i-1].valor.replace("/*", "'''");
            traduccionPython+=var1.replace("*/", "'''") + "\n";
            LINSTRUCCION();
        }else if(tkIgual(lista[i].iden, 2)){
            i--;
            if(tkIgual(lista[i].valor.toLowerCase(), "int") || tkIgual(lista[i].valor.toLowerCase(), "double") || tkIgual(lista[i].valor.toLowerCase(), "char")
                || tkIgual(lista[i].valor.toLowerCase(), "bool") || tkIgual(lista[i].valor.toLowerCase(), "string")){
                var tipo = lista[i-1].valor.toLowerCase();
                var lineaVariable = lista[i-1].l;
                var id = tkIgual(lista[i].tipo, 'Identificador');
                if(id){
                    var idValor = lista[i-1].valor;
                    if(tkIgual(lista[i].valor, "(")){
                        traduccionPython+="\ndef " + idValor + "(";
                        LPARAM();
                        if(tkIgual(lista[i].valor, ")")){
                            traduccionPython+="): \n";
                            if(tkIgual(lista[i].valor, "{")){
                                LINSTRUCCION();
                                if(!tkIgual(lista[i].valor, "}")){
                                    let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "}" y vino ' + lista[i].valor};
                                    listaError.push(error1);
                                }
                                traduccionPython+="\n\n";
                            }else{
                                let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "{" y vino ' + lista[i].valor};
                                listaError.push(error1);
    
                            }
                        }else{
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba ")" y vino ' + lista[i].valor};
                            listaError.push(error1);
                            traduccionPython+="):";
                        }
                        LINSTRUCCION();
                    }else if(tkIgual(lista[i].valor, ",")){
                        // , id LISTAID = E ;
                        let variable = {nombre: idValor, tipo: tipo, linea: lineaVariable};
                        listaVariables.push(variable);
                        traduccionPython+="var " + idValor + ", ";
                        var identi = tkIgual(lista[i].tipo, 'Identificador');
                        if(identi){
                            let variable2 = {nombre: lista[i-1].valor, tipo: tipo, linea: lineaVariable};
                            listaVariables.push(variable2);
                            traduccionPython+=lista[i-1].valor;
                            LISTAID(tipo);
                            if(tkIgual(lista[i].valor, "=")){
                                traduccionPython+=" = ";
                                E();
                            }
    
                            if(!tkIgual(lista[i].valor, ";")){
                                let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba ";" ó "=" y vino ' + lista[i].valor};
                                listaError.push(error1);
                            }
                        }else{
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba identificador y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        LINSTRUCCION();
                    }else if(tkIgual(lista[i].valor, "=")){
                        // = E ;
                        let variable = {nombre: idValor, tipo: tipo, linea: lineaVariable};
                        listaVariables.push(variable);
                        traduccionPython+="var " + idValor + " = ";
                        E();
                        console.log("despues de E");
                        if(!tkIgual(lista[i].valor, ";")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba ";" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        LINSTRUCCION();
                    }else if(tkIgual(lista[i].valor, ";")){
                        //;
                        let variable = {nombre: idValor, tipo: tipo, linea: lineaVariable};
                        listaVariables.push(variable);
                        traduccionPython+="var " + idValor + "\n";
                        LINSTRUCCION();
                    }else{
                        let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "(", ";" ó "=" y vino ' + lista[i].valor};
                        listaError.push(error1);
                        LINSTRUCCION();
                    }
                }else{
                    let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba identificador y vino ' + lista[i].valor};
                    listaError.push(error1);
                    LINSTRUCCION();
                }
            }else if(tkIgual(lista[i].valor.toLowerCase(), "void")){
                traduccionPython+="\ndef ";
                if(tkIgual(lista[i].valor.toLowerCase(), "main")){
                    if(tkIgual(lista[i].valor, "(") && tkIgual(lista[i].valor, ")")){
                        if(tkIgual(lista[i].valor, "{")){
                            traduccionPython+="main():\n";
                        }
                    }
                }else if(tkIgual(lista[i].iden, 1)){

                }
            }
        }else if(tkIgual(lista[i].iden, 1)){
            var idValor = lista[i-1].valor;
            if(tkIgual(lista[i].valor, "(")){
                traduccionPython+="\ndef " + idValor + "(";
                LPARAM();
                if(tkIgual(lista[i].valor, ")")){
                    traduccionPython+="): \n";
                    if(tkIgual(lista[i].valor, "{")){
                        LINSTRUCCION();
                        if(!tkIgual(lista[i].valor, "}")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "}" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+="\n\n";
                    }else{
                        let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "{" y vino ' + lista[i].valor};
                        listaError.push(error1);

                    }
                }else{
                    let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba ")" y vino ' + lista[i].valor};
                    listaError.push(error1);
                    traduccionPython+="):";
                }
                LINSTRUCCION();
            }else if(tkIgual(lista[i].valor, ",")){
                // , id LISTAID = E ;
                let variable = {nombre: idValor, tipo: tipo, linea: lineaVariable};
                listaVariables.push(variable);
                traduccionPython+="var " + idValor + ", ";
                var identi = tkIgual(lista[i].tipo, 'Identificador');
                if(identi){
                    let variable2 = {nombre: lista[i-1].valor, tipo: tipo, linea: lineaVariable};
                    listaVariables.push(variable2);
                    traduccionPython+=lista[i-1].valor;
                    LISTAID(tipo);
                    if(tkIgual(lista[i].valor, "=")){
                        traduccionPython+=" = ";
                        E();
                    }

                    if(!tkIgual(lista[i].valor, ";")){
                        let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba ";" ó "=" y vino ' + lista[i].valor};
                        listaError.push(error1);
                    }
                }else{
                    let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba identificador y vino ' + lista[i].valor};
                    listaError.push(error1);
                }
                LINSTRUCCION();
            }else if(tkIgual(lista[i].valor, "=")){
                // = E ;
                let variable = {nombre: idValor, tipo: tipo, linea: lineaVariable};
                listaVariables.push(variable);
                traduccionPython+="var " + idValor + " = ";
                E();
                console.log("despues de E");
                if(!tkIgual(lista[i].valor, ";")){
                    let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba ";" y vino ' + lista[i].valor};
                    listaError.push(error1);
                }
                LINSTRUCCION();
            }else if(tkIgual(lista[i].valor, ";")){
                //;
                let variable = {nombre: idValor, tipo: tipo, linea: lineaVariable};
                listaVariables.push(variable);
                traduccionPython+="var " + idValor + "\n";
                LINSTRUCCION();
            }else{
                let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "(", ";" ó "=" y vino ' + lista[i].valor};
                listaError.push(error1);
                LINSTRUCCION();
            }
        }
    }
}

function LPARAM(){
    if(i < tamano){
        if(tkIgual(lista[i].iden, 2)){
            var tipoParam = lista[i-1].valor.toLowerCase();
            if(tipoParam == "int" || tipoParam == "double" || tipoParam == "char" || tipoParam == "bool" || tipoParam == "string"){
                if(tkIgual(lista[i].iden, 1)){
                    traduccionPython+=tipoParam + " " + lista[i-1].valor;
                    LPARAM();
                }
            }
        }else if(tkIgual(lista[i].valor, ",")){
            traduccionPython+=", ";
            LPARAM();
        }
    }
}

function LISTAID(tipo){
    if(i < tamano){
        if(tkIgual(lista[i].valor, ",")){
            traduccionPython+=", ";
            if(tkIgual(lista[i].iden, 1)){
                traduccionPython+=lista[i-1].valor; 
                let variable2 = {nombre: lista[i-1].valor, tipo: tipo, linea: lista[i-1].l};
                listaVariables.push(variable2);
            } 
            else{
                let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba identificador y vino ' + lista[i].valor};
                listaError.push(error1);
            }
            LISTAID(tipo);
        }
    }
}

function E(){
    if(i < tamano){
        if(tkIgual(lista[i].valor, "!")){
            traduccionPython+="!";
            E();
        }else if(tkIgual(lista[i].valor, "-")){
            traduccionPython+="-";
            E();
        }else if(tkIgual(lista[i].iden, 1) || tkIgual(lista[i].iden, 3) || tkIgual(lista[i].iden, 6) || tkIgual(lista[i].iden, 7) ||
            tkIgual(lista[i].valor.toLowerCase(), "true") || tkIgual(lista[i].valor.toLowerCase(), "false")){ 
            // es identificador, caracter, cadena, numero
            traduccionPython+=lista[i-1].valor;
            if(tkIgual(lista[i].iden, 5)){
                var operador = lista[i-1].valor;
                switch(operador){
                    case "+":
                        traduccionPython+="+"; 
                        E();
                        break;
                    case "-":
                        traduccionPython+="-"; 
                        E();
                        break;
                    case "*":
                        traduccionPython+="*"; 
                        E();
                        break;
                    case "/":
                        traduccionPython+="/"; 
                        E();
                        break;
                    case "&":
                        if(!tkIgual(lista[i].valor, "&")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "&" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+="&&"; 
                        E();
                        break;
                    case "|":
                        if(!tkIgual(lista[i].valor, "|")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "|" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+="||"; 
                        E();
                        break;
                    case ">":
                        traduccionPython+=">";
                        if(tkIgual(lista[i].valor, "=")){ traduccionPython+="="; E();}
                        E();
                        break;
                    case "<":
                        traduccionPython+="<";
                        if(tkIgual(lista[i].valor, "=")){ traduccionPython+="="; E();}
                        E();
                        break;
                    case "!":
                        if(!tkIgual(lista[i].valor, "=")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "=" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+="!="; 
                        E();
                        break;
                    default:
                        i--;
                }
            }
    
        }else if(tkIgual(lista[i].iden, 4)){ // cadenaHTML
            traduccionPython+=lista[i-1].valor;
            htmlResultante+=lista[i-1].valor;
        }else if(tkIgual(lista[i].valor, "(")){
            traduccionPython+="(";
            E();
            tkIgual(lista[i].valor, ")");
            traduccionPython+=")";
            E();
        }
    }
}

function tkIgual(elemento, entrada){
    if(elemento == entrada){
        if(i < lista.length){
            i++;
            return true;
        }
        else return false;
    }else return false;
}
