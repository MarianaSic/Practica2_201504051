
function sintacticoToPython(){
    lista = listaToken;
    tamano = listaToken.length;
    LINSTRUCCION(0);
}

function LINSTRUCCION(conTab){
    if(i < tamano){
        if(tkIgual(lista[i].tipo, 'Comentario Simple')){
            for(var k = 0; k < conTab; k++)
                traduccionPython+="\t";
            traduccionPython+=lista[i-1].valor.replace("//", "#");
            LINSTRUCCION(conTab);
        }else if(tkIgual(lista[i].tipo, 'Comentario Multilínea')){
            for(var k = 0; k < conTab; k++)
                traduccionPython+="\t";
            var var1 = lista[i-1].valor.replace("/*", "\"\"\"");
            traduccionPython+=var1.replace("*/", "\"\"\"") + "\n";
            LINSTRUCCION(conTab);
        }else if(tkIgual(lista[i].iden, 2)){
            i--;
            //VARIABLES
            if(tkIgual(lista[i].valor.toLowerCase(), "int") || tkIgual(lista[i].valor.toLowerCase(), "double") || tkIgual(lista[i].valor.toLowerCase(), "char")
                || tkIgual(lista[i].valor.toLowerCase(), "bool") || tkIgual(lista[i].valor.toLowerCase(), "string")){
                var tipo = lista[i-1].valor.toLowerCase();
                var lineaVariable = lista[i-1].l;
                var id = tkIgual(lista[i].tipo, 'Identificador');
                if(id){
                    var idValor = lista[i-1].valor;
                    /* FUNCION */if(tkIgual(lista[i].valor, "(")){ 
                        for(var k = 0; k < conTab; k++)
                            traduccionPython+="\t";
                        traduccionPython+="\ndef " + idValor + "(";
                        LPARAM();
                        if(tkIgual(lista[i].valor, ")")){
                            traduccionPython+="): \n";
                            if(tkIgual(lista[i].valor, "{")){
                                LINSTRUCCION(conTab+1);
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
                        LINSTRUCCION(conTab);
                    }/* LISTA VARIABLES */else if(tkIgual(lista[i].valor, ",")){ // , id LISTAID = E ;
                        let variable = {nombre: idValor, tipo: tipo, linea: lineaVariable};
                        listaVariables.push(variable);
                        for(var k = 0; k < conTab; k++)
                            traduccionPython+="\t";
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
                            traduccionPython+="\n";
                        }else{
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba identificador y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        LINSTRUCCION(conTab);
                    }/* DECL VARIABLES */else if(tkIgual(lista[i].valor, "=")){
                        // = E ;
                        let variable = {nombre: idValor, tipo: tipo, linea: lineaVariable};
                        listaVariables.push(variable);
                        for(var k = 0; k < conTab; k++)
                            traduccionPython+="\t";
                        traduccionPython+="var " + idValor + " = ";
                        E();
                        if(!tkIgual(lista[i].valor, ";")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba ";" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+="\n";
                        LINSTRUCCION(conTab);
                    }/* VARIABLE */else if(tkIgual(lista[i].valor, ";")){
                        //;
                        let variable = {nombre: idValor, tipo: tipo, linea: lineaVariable};
                        listaVariables.push(variable);
                        for(var k = 0; k < conTab; k++)
                            traduccionPython+="\t";
                        traduccionPython+="var " + idValor + "\n";
                        LINSTRUCCION(conTab);
                    }else{
                        let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "(", ";" ó "=" y vino ' + lista[i].valor};
                        listaError.push(error1);
                        LINSTRUCCION(conTab);
                    }
                }else{
                    let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba identificador y vino ' + lista[i].valor};
                    listaError.push(error1);
                    LINSTRUCCION(conTab);
                }
            }/* METODOS */ else if(tkIgual(lista[i].valor.toLowerCase(), "void")){
                for(var k = 0; k < conTab; k++)
                    traduccionPython+="\t";
                traduccionPython+="\n\ndef ";
                if(tkIgual(lista[i].valor.toLowerCase(), "main")){
                    if(tkIgual(lista[i].valor, "(") && tkIgual(lista[i].valor, ")")){
                        if(tkIgual(lista[i].valor, "{")){
                            traduccionPython+="main():\n";
                            LINSTRUCCION(conTab+1);
                            for(var k = 0; k < conTab; k++)
                                traduccionPython+="\t";
                            traduccionPython+="\n\nif__name__=\"__main__\":\n\tmain()\n\n";
                            if(!tkIgual(lista[i].valor, "}")){
                                let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "}" y vino ' + lista[i].valor};
                                listaError.push(error1);
                            }
                            LINSTRUCCION(conTab);
                        }
                    }
                }else if(tkIgual(lista[i].iden, 1)){
                    //void id()
                    var idValor = lista[i-1].valor;
                    if(tkIgual(lista[i].valor, "(")){
                        traduccionPython+=idValor + "(";
                        LPARAM();
                        if(tkIgual(lista[i].valor, ")")){
                            traduccionPython+="): \n";
                            if(tkIgual(lista[i].valor, "{")){
                                LINSTRUCCION(conTab+1);
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
                        LINSTRUCCION(conTab);
                    }
                }
            }/* IF */ else if(tkIgual(lista[i].valor.toLowerCase(), "if")){
                if(tkIgual(lista[i].valor, "(")){
                    for(var k = 0; k < conTab; k++)
                        traduccionPython+="\t";
                    traduccionPython+="if ";
                    E();
                    if(tkIgual(lista[i].valor, ")") && tkIgual(lista[i].valor, "{")){
                        traduccionPython+=":\n";
                        LINSTRUCCION(conTab+1);
                        if(tkIgual(lista[i].valor, "}")){
                            LELSEIF(conTab);
                            ELSE(conTab);
                            LINSTRUCCION(conTab);
                        }else{
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "}" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                    }
                }else{
                    let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "(" y vino ' + lista[i].valor};
                    listaError.push(error1);
                }
            }/* SWITCH */ else if(tkIgual(lista[i].valor.toLowerCase(), "switch")){
                if(tkIgual(lista[i].valor, "(")){
                    traduccionPython+="\n";
                    for(var k = 0; k < conTab; k++)
                        traduccionPython+="\t";
                    traduccionPython+="def switch(";
                    E();
                    if(tkIgual(lista[i].valor, ")") && tkIgual(lista[i].valor, "{")){
                        traduccionPython+="):\n";
                        for(var k = 0; k < conTab; k++)
                            traduccionPython+="\t";
                        traduccionPython+="\tswitcher = {\n";
                        LCASES(conTab+2);
                        for(var k = 0; k < conTab; k++)
                            traduccionPython+="\t";
                        traduccionPython+="\t}\n";
                        DEFAULT(conTab+1);
                        if(!tkIgual(lista[i].valor, "}")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "}" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        LINSTRUCCION(conTab);
                    }
                }
            }/* FOR */ else if(tkIgual(lista[i].valor.toLowerCase(), "for")){
                if(tkIgual(lista[i].valor, "(")){
                    for(var k = 0; k < conTab; k++)
                        traduccionPython+="\t";
                    traduccionPython+="for ";
                    DECLFOR();
                    LINSTRUCCION(conTab+1);
                    tkIgual(lista[i].valor, "}");
                    LINSTRUCCION(conTab);
                }
            }/* WHILE */ else if(tkIgual(lista[i].valor.toLowerCase(), "while")){
                if(tkIgual(lista[i].valor, "(")){
                    for(var k = 0; k < conTab; k++)
                        traduccionPython+="\t";
                    traduccionPython+="while ";
                    E();
                    traduccionPython+=" :\n";
                    if(tkIgual(lista[i].valor, ")") && tkIgual(lista[i].valor, "{")){
                        LINSTRUCCION(conTab+1);
                        if(!tkIgual(lista[i].valor, "}")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "}" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }else LINSTRUCCION(conTab);
                    }
                }
            }/* DO */ else if(tkIgual(lista[i].valor.toLowerCase(), "do")){
                if(tkIgual(lista[i].valor, "{")){
                    for(var k = 0; k < conTab; k++)
                        traduccionPython+="\t";
                    traduccionPython+="while true:\n";
                    LINSTRUCCION(conTab+1);
                    if(tkIgual(lista[i].valor, "}") && tkIgual(lista[i].valor.toLowerCase(), "while") && tkIgual(lista[i].valor, "(")){
                        for(var k = 0; k < conTab; k++)
                            traduccionPython+="\t";
                        traduccionPython+="if "
                        E();
                        if(tkIgual(lista[i].valor, ")") && tkIgual(lista[i].valor, ";"))traduccionPython+=":\n\t\t\tbreak\n";
                        else{
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba ")" ó ";" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        LINSTRUCCION(conTab);
                    }
                }
            }/* CONSOLE.WRITE */ else if(tkIgual(lista[i].valor.toLowerCase(), "console")){
                if(tkIgual(lista[i].valor, ".") && tkIgual(lista[i].valor.toLowerCase(), "write") && tkIgual(lista[i].valor, "(")){
                    for(var k = 0; k < conTab; k++)
                        traduccionPython+="\t";
                    traduccionPython+="print(";
                    OPERACION();
                    traduccionPython+=")\n";
                    if(!(tkIgual(lista[i].valor, ")") && tkIgual(lista[i].valor, ";"))){
                        let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba ")" ó ";" y vino ' + lista[i].valor};
                        listaError.push(error1);
                    }
                    LINSTRUCCION(conTab);
                }
            }/* RETURN */ else if(tkIgual(lista[i].valor.toLowerCase(), "return")){
                for(var k = 0; k < conTab; k++)
                    traduccionPython+="\t";
                traduccionPython+="return "
                if(tkIgual(lista[i].valor, ";")){ 
                    traduccionPython+="\n";
                    LINSTRUCCION(conTab);
                }else{
                    E();
                    if(tkIgual(lista[i].valor, ";")) traduccionPython+="\n";
                    else{
                        let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba ";" y vino ' + lista[i].valor};
                        listaError.push(error1);
                    }
                    LINSTRUCCION(conTab);
                }
            }/* BREAK */ else if(tkIgual(lista[i].valor.toLowerCase(), "break")){
                if(tkIgual(lista[i].valor, ";")){
                    for(var k = 0; k < conTab; k++)
                        traduccionPython+="\t";
                    traduccionPython+="break\n";
                    LINSTRUCCION(conTab);
                }else{
                    let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba ";" y vino ' + lista[i].valor};
                    listaError.push(error1);
                }
            }/* CONTINUE */ else if(tkIgual(lista[i].valor.toLowerCase(), "continue")){
                if(tkIgual(lista[i].valor, ";")){
                    for(var k = 0; k < conTab; k++)
                        traduccionPython+="\t";
                    traduccionPython+="continue\n";
                    LINSTRUCCION(conTab);
                }else{
                    let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba ";" y vino ' + lista[i].valor};
                    listaError.push(error1);
                }
            }
        }else if(tkIgual(lista[i].iden, 1)){  
            var idValor = lista[i-1].valor;
            if(tkIgual(lista[i].valor, "(")){
                for(var k = 0; k < conTab; k++)
                    traduccionPython+="\t";
                traduccionPython+="\ndef " + idValor + "(";
                LPARAM();
                if(tkIgual(lista[i].valor, ")")){
                    traduccionPython+="): \n";
                    if(tkIgual(lista[i].valor, "{")){
                        LINSTRUCCION(conTab+1);
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
                LINSTRUCCION(conTab);
            }else if(tkIgual(lista[i].valor, ",")){
                // , id LISTAID = E ;
                for(var k = 0; k < conTab; k++)
                    traduccionPython+="\t";
                traduccionPython+=idValor + ", ";
                var identi = tkIgual(lista[i].tipo, 'Identificador');
                if(identi){
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
                    traduccionPython+="\n";
                }else{
                    let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba identificador y vino ' + lista[i].valor};
                    listaError.push(error1);
                }
                LINSTRUCCION(conTab);
            }else if(tkIgual(lista[i].valor, "=")){
                // = E ;
                for(var k = 0; k < conTab; k++)
                    traduccionPython+="\t";
                traduccionPython+=idValor + " = ";
                E();
                if(!tkIgual(lista[i].valor, ";")){
                    let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba ";" y vino ' + lista[i].valor};
                    listaError.push(error1);
                }
                traduccionPython+="\n";
                LINSTRUCCION(conTab);
            }else{
                let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "(", ";" ó "=" y vino ' + lista[i].valor};
                listaError.push(error1);
                LINSTRUCCION(conTab);
            }
        }
    }
}

function LCASES(conTab){
    if(i < tamano){
        if(tkIgual(lista[i].valor.toLowerCase(), "case")){
            for(var k = 0; k < conTab; k++)
                traduccionPython+="\t";
            E();
            if(tkIgual(lista[i].valor, ":")){
                traduccionPython+=":\n";
                LINSTRUCCION(conTab+1);
                for(var k = 0; k < conTab; k++)
                    traduccionPython+="\t";
                traduccionPython+=",\n";
                LCASES(conTab);
            }
        }
    }
}

function DEFAULT(conTab){
    if(i < tamano){
        if(tkIgual(lista[i].valor.toLowerCase(), "default") && tkIgual(lista[i].valor, ":")){
            LINSTRUCCION(conTab);
            traduccionPython+="\n";
        }
    }
}

function DECLFOR(){
    if(i < tamano){
        if(tkIgual(lista[i].valor.toLowerCase(), "int") || tkIgual(lista[i].valor.toLowerCase(), "double")){
            if(tkIgual(lista[i].iden, 1)){
                traduccionPython+=lista[i-1].valor + " in range(";
                if(tkIgual(lista[i].valor, "=")){
                    if(tkIgual(lista[i].iden, 7) || tkIgual(lista[i].iden, 1)){
                        traduccionPython+=lista[i-1].valor + ", ";
                        if(tkIgual(lista[i].valor, ";") && tkIgual(lista[i].iden, 1) && tkIgual(lista[i].valor, "<")){
                            if(tkIgual(lista[i].iden, 7) || tkIgual(lista[i].iden, 1)){
                                traduccionPython+=lista[i-1].valor + "):\n";
                                tkIgual(lista[i].valor, ";");
                                tkIgual(lista[i].iden, 1);
                                tkIgual(lista[i].valor, "+");
                                tkIgual(lista[i].valor, "+");
                                tkIgual(lista[i].valor, ")");
                                tkIgual(lista[i].valor, "{");
                            }
                        }
                    }
                }
            }
        }else{
            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "double" ó "int" y vino ' + lista[i].valor};
            listaError.push(error1);
        }
    }
}

function LELSEIF(conTab){
    if(i < tamano){
        if(tkIgual(lista[i].valor.toLowerCase(), "else")){
            if(tkIgual(lista[i].valor.toLowerCase(), "if") && tkIgual(lista[i].valor, "(")){
                for(var k = 0; k < conTab; k++)
                    traduccionPython+="\t";
                traduccionPython+="elif ";
                E();
                if(tkIgual(lista[i].valor, ")") && tkIgual(lista[i].valor, "{")){
                    traduccionPython+=":\n";
                    LINSTRUCCION(conTab+1);
                    if(tkIgual(lista[i].valor, "}")) LELSEIF(conTab);
                    else{
                        let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "}" y vino ' + lista[i].valor};
                        listaError.push(error1);
                    }
                }
            }else i--;
        }
    }
}

function ELSE(conTab){
    if(i < tamano){
        if(tkIgual(lista[i].valor.toLowerCase(), "else")){
            if(tkIgual(lista[i].valor, "{")){
                for(var k = 0; k < conTab; k++)
                    traduccionPython+="\t";
                traduccionPython+="else:\n"
                LINSTRUCCION(conTab+1);
                if(!tkIgual(lista[i].valor, "}")){
                    let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "}" y vino ' + lista[i].valor};
                    listaError.push(error1);
                }
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
                    traduccionPython+="var " + lista[i-1].valor;
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

function OPERACION(){
    if(i < tamano){
        if(tkIgual(lista[i].valor, "!")){
            traduccionPython+=" not ";
            OPERACION();
        }else if(tkIgual(lista[i].valor, "-")){
            traduccionPython+="-";
            OPERACION();
        }else if(tkIgual(lista[i].iden, 1) || tkIgual(lista[i].iden, 3) || tkIgual(lista[i].iden, 6) || tkIgual(lista[i].iden, 7) ||
            tkIgual(lista[i].valor.toLowerCase(), "true") || tkIgual(lista[i].valor.toLowerCase(), "false")){ 
            // es identificador, caracter, cadena, numero
            traduccionPython+=lista[i-1].valor;
            if(tkIgual(lista[i].iden, 5)){
                var operador = lista[i-1].valor;
                switch(operador){
                    case "+":
                        traduccionPython+=", "; 
                        OPERACION();
                        break;
                    case "-":
                        traduccionPython+="-"; 
                        OPERACION();
                        break;
                    case "*":
                        traduccionPython+="*"; 
                        OPERACION();
                        break;
                    case "/":
                        traduccionPython+="/"; 
                        OPERACION();
                        break;
                    case "&":
                        if(!tkIgual(lista[i].valor, "&")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "&" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+=" and "; 
                        OPERACION();
                        break;
                    case "|":
                        if(!tkIgual(lista[i].valor, "|")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "|" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+=" or "; 
                        OPERACION();
                        break;
                    case ">":
                        traduccionPython+=">";
                        if(tkIgual(lista[i].valor, "=")){ traduccionPython+="="; OPERACION();}
                        OPERACION();
                        break;
                    case "<":
                        traduccionPython+="<";
                        if(tkIgual(lista[i].valor, "=")){ traduccionPython+="="; OPERACION();}
                        OPERACION();
                        break;
                    case "!":
                        if(!tkIgual(lista[i].valor, "=")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "=" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+="!="; 
                        OPERACION();
                        break;
                    case "=":
                        if(!tkIgual(lista[i].valor, "=")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "=" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+="=="; 
                        OPERACION();
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
            OPERACION();
            tkIgual(lista[i].valor, ")");
            traduccionPython+=")";
            if(tkIgual(lista[i].iden, 5)){
                var operador = lista[i-1].valor;
                switch(operador){
                    case "+":
                        traduccionPython+=", "; 
                        OPERACION();
                        break;
                    case "-":
                        traduccionPython+="-"; 
                        OPERACION();
                        break;
                    case "*":
                        traduccionPython+="*"; 
                        OPERACION();
                        break;
                    case "/":
                        traduccionPython+="/"; 
                        OPERACION();
                        break;
                    case "&":
                        if(!tkIgual(lista[i].valor, "&")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "&" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+=" and "; 
                        OPERACION();
                        break;
                    case "|":
                        if(!tkIgual(lista[i].valor, "|")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "|" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+=" or "; 
                        OPERACION();
                        break;
                    case ">":
                        traduccionPython+=">";
                        if(tkIgual(lista[i].valor, "=")){ traduccionPython+="="; OPERACION();}
                        OPERACION();
                        break;
                    case "<":
                        traduccionPython+="<";
                        if(tkIgual(lista[i].valor, "=")){ traduccionPython+="="; OPERACION();}
                        OPERACION();
                        break;
                    case "!":
                        if(!tkIgual(lista[i].valor, "=")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "=" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+="!="; 
                        OPERACION();
                        break;
                    case "=":
                        if(!tkIgual(lista[i].valor, "=")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "=" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+="=="; 
                        OPERACION();
                        break;
                    default:
                        i--;
                }
            }
        }
    }
}

function E(){
    if(i < tamano){
        if(tkIgual(lista[i].valor, "!")){
            traduccionPython+=" not ";
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
                        traduccionPython+=" + "; 
                        E();
                        break;
                    case "-":
                        traduccionPython+=" - "; 
                        E();
                        break;
                    case "*":
                        traduccionPython+=" * "; 
                        E();
                        break;
                    case "/":
                        traduccionPython+=" / "; 
                        E();
                        break;
                    case "&":
                        if(!tkIgual(lista[i].valor, "&")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "&" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+=" and "; 
                        E();
                        break;
                    case "|":
                        if(!tkIgual(lista[i].valor, "|")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "|" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+=" or "; 
                        E();
                        break;
                    case ">":
                        traduccionPython+=" > ";
                        if(tkIgual(lista[i].valor, "=")){ traduccionPython+="="; E();}
                        E();
                        break;
                    case "<":
                        traduccionPython+=" < ";
                        if(tkIgual(lista[i].valor, "=")){ traduccionPython+="="; E();}
                        E();
                        break;
                    case "!":
                        if(!tkIgual(lista[i].valor, "=")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "=" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+=" != "; 
                        E();
                        break;
                    case "=":
                        if(!tkIgual(lista[i].valor, "=")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "=" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+=" == "; 
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
            if(tkIgual(lista[i].iden, 5)){
                var operador = lista[i-1].valor;
                switch(operador){
                    case "+":
                        traduccionPython+=" + "; 
                        E();
                        break;
                    case "-":
                        traduccionPython+=" - "; 
                        E();
                        break;
                    case "*":
                        traduccionPython+=" * "; 
                        E();
                        break;
                    case "/":
                        traduccionPython+=" / "; 
                        E();
                        break;
                    case "&":
                        if(!tkIgual(lista[i].valor, "&")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "&" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+=" and "; 
                        E();
                        break;
                    case "|":
                        if(!tkIgual(lista[i].valor, "|")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "|" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+=" or "; 
                        E();
                        break;
                    case ">":
                        traduccionPython+=" > ";
                        if(tkIgual(lista[i].valor, "=")){ traduccionPython+="="; E();}
                        E();
                        break;
                    case "<":
                        traduccionPython+=" < ";
                        if(tkIgual(lista[i].valor, "=")){ traduccionPython+="="; E();}
                        E();
                        break;
                    case "!":
                        if(!tkIgual(lista[i].valor, "=")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "=" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+=" != "; 
                        E();
                        break;
                    case "=":
                        if(!tkIgual(lista[i].valor, "=")){
                            let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba "=" y vino ' + lista[i].valor};
                            listaError.push(error1);
                        }
                        traduccionPython+=" == "; 
                        E();
                        break;
                    default:
                        i--;
                }
            }
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
