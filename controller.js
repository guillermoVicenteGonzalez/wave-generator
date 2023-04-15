import { Wave } from "./Wave.js";

//cuidado con el control de errores de limites (max ondas simultaneas)

var waves = new Map();
var canvasCollection = new Array();

export function test(object){
    console.log(object.nodeName);
    if(object.nodeName == 'CANVAS'){
        console.log("acierto");
    }
}


export function addWave(){

}

//pasa un o una lista de canvases y los mete en la coleccion
export function addCanvas(...canvases){
    if(canvases.length <= 0){
        console.error("no parameters passed");
        return false;
    }

    for(let i=0; i<canvases.length; i++){
        if(canvases[i].nodeName != 'CANVAS'){
            console.error("not a canvas");
            return false;
        }else{
            canvasCollection.push(canvases[i]);
        }
    }
    return true;
}

export function getCanvasCollection(){
    return canvasCollection;
}

export function getWaveCollection(){
    return waves;
}

export function createWave(wave, parent, name){
    //creo la onda
    if(!(wave instanceof Wave)){
        console.error("parameter is not a wave");
        return false;
    }

    let nCanvas = newCanvas(parent);

    if(wave.getName() == undefined && name != undefined){
        if(name != undefined){
            wave.setName(name);
        }else{
            console.error("")
        }
    }else 

    wave.setCanvas(nCanvas);
    //la meto en la coleccion
    waves.set(wave.getName(), wave);


    //la pinto? NO
}

export function updateWave(){
    //saco la onda de la coleccion

    //la actualizo

    //la sobreescribo

    //la pinto?
}

export function deleteWave(){
    //busco la onda en la coleccion

    //la saco de la coleccion

}

export function getWave(){
    //saco la onda y la devuelvo.
}

/**********************
 * Non export functions
 **********************/

function newCanvas(parent){
    //esto solo crea big canvases. 
    var newCanvas = document.createElement("canvas");
    newCanvas.className = "canvas bigCanvas";
    newCanvas.width = window.innerWidth;
    newCanvas.height = window.innerHeight;
    parent.appendChild(newCanvas);
    return newCanvas;
}