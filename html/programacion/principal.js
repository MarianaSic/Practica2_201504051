var listaToken = new Array();
var listaError = new Array();
var estado = "A";
var indice = 0;
var linea = 1;
var columna = 1;
var reservadas = ["int", "double", "char", "bool", "string", "void", "main", "if", "do", "false", "continue", "else", "switch", "case", "break",
    "console", "write", "default", "for", "while", "true", "return"];

function traducir(){
    let element = {name: 'Edy', age: 27, country: "Brazil"};
    let element2 = {name: 'Marcus', age: 27, country: "Brazil"};
    listaToken.push(element);
    listaToken.push(element2);
    const entrada = quill.getText(0, quill.getLength());
    lexicoToPython(entrada, quill.getLength());
    console.log(listaToken);
    console.log(listaError);
}

function lexicoToPython(texto, tamano){
    indice = 0; linea = 1; columna = 1;
    listaToken = [];
    listaError = [];
    var auxPalabra = "";
    while(indice < tamano){
        console.log(texto[indice]);
        switch(estado){
            case "A":
                if(texto[indice] == '/' && texto[indice+1] == '/'){
                    indice+=2;
                    columna+=2;
                    estado = "J";
                }
                else if(texto[indice] == '/' && texto[indice+1] == '*'){
                    indice+=2;
                    columna+=2;
                    estado = "K";
                }
                else if(texto.charCodeAt(indice) == 10){ // \n
                    indice++;
                    linea++;
                    columna = 1;
                    estado = "A";
                }
                else if(esBlanco(texto, indice)){
                    indice++;
                    columna++;
                    estado = "A";
                }
                else if(texto.charCodeAt(indice) == 95 || esLetra(texto, indice)){ // "_" || es letra = true
                    auxPalabra += texto[indice];
                    estado = "C";
                    columna++;
                    indice++;
                }
                else if(texto.charCodeAt(indice) == 39){ // '
                    estado = "D";
                    columna++;
                    indice++;
                }
                else if(esSimbolo(texto, indice)){
                    auxPalabra+=texto[indice];
                    estado = "B";
                    columna++;
                    indice++;
                }
                else if(texto.charCodeAt(indice) == 34){ // "
                    estado = "F";
                    columna++;
                    indice++;
                }
                else if(esNumero(texto, indice)){
                    auxPalabra += texto[indice];
                    estado = "E";
                    columna++;
                    indice++;
                }
                else{
                    let error1 = {tipo: 'Léxico', l: linea, c: columna, desc: 'El caracter \"' + texto[indice] + '\" no pertenece al lenguaje'};
                    listaError.push(error1);
                    indice++;
                    columna++;
                    estado = "A";
                }
                break;
            case "B":
                let token1 = {tipo: 'Símbolo', valor: auxPalabra, l: linea, c: columna};
                listaToken.push(token1);
                auxPalabra = "";
                estado = "A";
                break;
            case "C":
                if(esLetra(texto, indice)){
                    auxPalabra+=texto[indice];
                    indice++;
                    columna++;
                    estado = "C";
                }
                else if(esNumero(texto, indice)){
                    auxPalabra+=texto[indice];
                    indice++;
                    linea++;
                    estado = "G";
                }
                else{
                    let desc = "Palabra reservada: ";
                    if(esReservada(auxPalabra.toLowerCase())){
                        desc+=auxPalabra.toLowerCase();
                        let token = {tipo: desc, valor: auxPalabra, l:linea, c:columna};
                        listaToken.push(token);
                    }else{
                        let token = {tipo: 'Identificador', valor: auxPalabra, l:linea, c:columna};
                        listaToken.push(token);
                    }
                    auxPalabra = "";
                    estado = "A";
                }
                break;
            case "D":
                
                break;
        }
    }
}

function esReservada(palabra){
    for(var i = 0; i < reservadas.length; i++){
        if(reservadas[i] == palabra) return true;
    }
    return false;
}

function esNumero(entrada, posicion){
    if(entrada.charCodeAt(posicion) > 47 && entrada.charCodeAt(posicion) < 58)
        return true;
    else return false;
}

function esLetra(entrada, posicion){
    if(entrada.charCodeAt(posicion) > 64 && entrada.charCodeAt(posicion) < 91)
        return true;
    else if(entrada.charCodeAt(posicion) > 96 && entrada.charCodeAt(posicion) < 123)
        return true;
    else return false;
}

function esSimbolo(entrada, posicion){
    console.log(entrada.charCodeAt(posicion));
    if(entrada.charCodeAt(posicion) == 33 || entrada.charCodeAt(posicion) == 38){ 
        return true;
    }else if (entrada.charCodeAt(posicion) > 39 && entrada.charCodeAt(posicion) < 48){ 
        return true;
    }else if (entrada.charCodeAt(posicion) > 57 && entrada.charCodeAt(posicion) < 63){ 
        return true;
    }else if (entrada.charCodeAt(posicion) > 122 && entrada.charCodeAt(posicion) < 126){ 
        return true;
    }else{ return false; }
}

function esBlanco(entrada, posicion){
    if(entrada.charCodeAt(posicion) == 32) return true;
    else if(entrada[posicion] == '\t' || entrada[posicion] == '\r') return true;
    else return false;
}