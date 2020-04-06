var i = 0;
var lista = [];
var tamano = listaTokens.length;
var traduccionPython = "";

function sintacticoToPython(){
    LINSTRUCCION();
}

function LINSTRUCCION(){
    if(tamano > 0){
        if(tkIgual(lista[i].tipo, 'Comentario Simple')){
            // es comentario simple
            traduccionPython+=lista[i-1].valor.replace("//", "#");
            LINSTRUCCION();
        }else if(tkIgual(lista[i].tipo, 'Comentario Multilínea')){
            // es comentario multilinea
            var var1 = lista[i-1].valor.replace("/*", "'''");
            traduccionPython+=var1.replace("*/", "'''");
            LINSTRUCCION();
        }else if(tkIgual(lista[i].valor.toLowerCase(), "int") || tkIgual(lista[i].valor.toLowerCase(), "double") || 
            tkIgual(lista[i].valor.toLowerCase(), "char") || tkIgual(lista[i].valor.toLowerCase(), "bool") || tkIgual(lista[i].valor.toLowerCase(), "string")){
            var id = tkIgual(lista[i].tipo, 'Identificador');
            var idValor = lista[i-1].valor;
            if(id){
                console.log(idValor);
                var fov = FOV();
                if(fov && id){ // es una variable
                    //traduccionPython+="var " + 
                }else if(!fov && id){ // es una funcion
    
                }
                LINSTRUCCION();
            }else{
                let error1 = {tipo: 'Sintáctico', l: lista[i].l, c: lista[i].c, desc: ' Se esperaba identificador y vino -> ' + lista[i].valor};
                listaError.push(error1);
            }
        }/*else if(){
            tkIgual
        }*/
    }
}

function FOV(){
    if(tamano > 0){
        if(tkIgual(lista[i].valor, "(")){
            LPARAM();
            
            return false;
        }else if(tkIgual(lista[i].valor, ",")){

        }
        else if(tkIgual(lista[i].valor, "=")){

        }
    }
}

function E(){
    
}

function tkIgual(elemento, entrada){
    if(elemento == entrada){
        if(i < lista.length){
            i++;
            tamano--;
            return true;
        }
        else return false;
    }else return false;
}
