var listaToken = new Array();
var estado = "A";
var indice = 0;
var linea = 1;
var columna = 1;
var reservadas = ["int", "double", "char", "bool", "string", "void", "main", "if", "do", "false", "continue", "else", "switch", "case", "break",
    "console", "write", "default", "for", "while", "true", "return"];
var codHTML = "";

function lexicoToPython(texto, tamano){
    indice = 0; linea = 1; columna = 1;
    listaToken = [];
    listaError = [];
    var auxPalabra = "";
    while(indice < tamano){
        switch(estado){
            case "A":
                if(texto[indice] == '/' && texto[indice+1] == '/'){
                    indice+=2;
                    columna+=2;
                    estado = "J";
                    auxPalabra+="//";
                }
                else if(texto[indice] == '/' && texto[indice+1] == '*'){
                    indice+=2;
                    columna+=2;
                    estado = "K";
                    auxPalabra+="/*";
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
                    auxPalabra+=texto[indice];
                    let error1 = {tipo: 'Léxico', l: linea, c: columna, desc: ' \"' + auxPalabra + '\" no pertenece al lenguaje'};
                    listaError.push(error1);
                    auxPalabra = "";
                    indice++;
                    columna++;
                    estado = "A";
                }
                break;
            case "B":
                let token1 = {iden: 5, tipo: 'Símbolo', valor: auxPalabra, l: linea, c: columna};
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
                else if(esNumero(texto, indice) || texto.charCodeAt(indice) == 95){ // 95 -> '_'
                    auxPalabra+=texto[indice];
                    indice++;
                    columna++;
                    estado = "G";
                }
                else{
                    let desc = "Palabra reservada: ";
                    let token;
                    if(esReservada(auxPalabra.toLowerCase())){
                        desc+=auxPalabra.toLowerCase();
                        token = {iden: 2, tipo: desc, valor: auxPalabra, l:linea, c:columna};
                        listaToken.push(token);
                    }else{
                        token = {iden: 1,tipo: 'Identificador', valor: auxPalabra, l:linea, c:columna};
                        listaToken.push(token);
                    }
                    auxPalabra = "";
                    estado = "A";
                }
                break;
            case "D":
                if(texto.charCodeAt(indice) == 39){ // '
                    let token;
                    if(auxPalabra.length == 1 || auxPalabra.length == 2)
                        token = {iden: 3,tipo: 'Caracter', valor: auxPalabra, l:linea, c:columna};
                    else{
                        token = {iden: 4,tipo: 'Cadena HTML', valor: auxPalabra, l:linea, c:columna};
                        codHTML+=auxPalabra;
                    }
                    listaToken.push(token);
                    auxPalabra = "";
                    estado = "A";
                    indice++;
                    columna++;
                }else{
                    auxPalabra+=texto[indice];
                    indice++;
                    columna++;
                    estado = "D";
                }
                break;
            case "E":
                if(esNumero(texto, indice)){
                    auxPalabra+=texto[indice];
                    indice++;
                    columna++;
                    estado = "E";
                }else if(texto.charCodeAt(indice) == 46){
                    auxPalabra+=texto[indice];
                    indice++;
                    columna++;
                    estado = "H";
                }else{
                    let token = {iden: 7, tipo: 'Número', valor: auxPalabra, l: linea, c: columna};
                    listaToken.push(token);
                    auxPalabra = "";
                    estado = "A";
                }
                break;
            case "F":
                if(texto.charCodeAt(indice) == 34){ // "
                    let token = {iden: 6, tipo: 'Cadena', valor: auxPalabra, l:linea, c:columna};
                    listaToken.push(token);
                    auxPalabra = "";
                    estado = "A";
                    indice++;
                    columna++;
                }else{
                    auxPalabra+=texto[indice];
                    indice++;
                    columna++;
                    estado = "F";
                }
                break;
            case "G":
                if(esLetra(texto, indice) || esNumero(texto, indice) || texto.charCodeAt(indice) == 95){
                    auxPalabra+=texto[indice];
                    indice++;
                    columna++;
                    estado = "G";
                }else{
                    let token = {iden: 1, tipo: 'Identificador', valor: auxPalabra, l:linea, c:columna};
                    listaToken.push(token);
                    auxPalabra = "";
                    estado = "A";
                }
                break;
            case "H":
                if(esNumero(texto, indice)){
                    auxPalabra+=texto[indice];
                    indice++;
                    columna++;
                    estado = "I";
                }else{
                    estado = "A";
                    auxPalabra+=texto[indice];
                    let error1 = {tipo: 'Léxico', l: linea, c: columna, desc: ' \"' + auxPalabra + '\" no pertenece al lenguaje'};
                    listaError.push(error1);
                    auxPalabra = "";
                }
                break;
            case "I":
                if(esNumero(texto, indice)){
                    auxPalabra+=texto[indice];
                    indice++;
                    columna++;
                    estado = "I";
                }else{
                    let token = {iden: 7, tipo: 'Número', valor: auxPalabra, l: linea, c: columna};
                    listaToken.push(token);
                    auxPalabra = "";
                    estado = "A";
                }
                break;
            case "J": //comentario simple
                if(texto.charCodeAt(indice) == 10){  // \n
                    auxPalabra+=texto[indice];
                    let token = {iden: 8, tipo: 'Comentario Simple', valor: auxPalabra, l: linea, c: columna};
                    listaToken.push(token);
                    auxPalabra = "";
                    estado = "A";
                    indice++;
                    columna = 1;
                    linea++;
                }
                else{
                    estado = "J";
                    auxPalabra+=texto[indice];
                    indice++;
                    columna++;
                }
                break;
            case "K": //comentario multilinea
                if(texto.charCodeAt(indice) == 42 && texto.charCodeAt(indice+1) == 47){ //  */
                    auxPalabra+="*/";
                    let token = {iden: 9, tipo: 'Comentario Multilínea', valor: auxPalabra, l: linea, c: columna};
                    listaToken.push(token);
                    auxPalabra = "";
                    estado = "A";
                    indice+=2;
                    columna+=2;
                }
                else if(texto.charCodeAt(indice) == 10){ // \n
                    auxPalabra+=texto[indice];
                    estado = "K";
                    indice++;
                    columna = 1;
                    linea++;
                }else{
                    auxPalabra+=texto[indice];
                    estado = "K";
                    indice++;
                    columna++;
                }
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