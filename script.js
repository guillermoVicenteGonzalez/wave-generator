import {Wave} from "./Wave.js"
import * as ops from "./operations.js";

//estructuras globales
var canvases = new Array(); //esto deberia ser un map y de tipo Wave si me apuras

//UI elements
var newCanvasBtn = document.getElementById("newCanvasBtn");
var waveDialog = document.getElementById("waveDialog");
var openWaveDialog = document.querySelector(".openModal");
var closeWaveDialog = document.querySelector(".closeModal");
var acceptBtn = document.querySelector("#newWaveBtn");
var auxBtn = document.querySelector("#auxBtn");
//var openWaveDialog = document.getElementById("openModalBtn");



/***************************
 * Click events
 **^************************/
//abrir modal
openWaveDialog.addEventListener("click", ()=>{
    waveDialog.showModal();
});

//cerrar modal
closeWaveDialog.addEventListener("click",()=>{
    waveDialog.close();

})

//pintar onda
acceptBtn.addEventListener("click",()=>{
    waveDialog.close();
    let parent = document.querySelector("#canvasWrapper");
    let tempCanvas = ops.newCanvas(parent);
    canvases.push(tempCanvas);
    ops.waveSetup(tempCanvas);
})

//boton de pruebas
auxBtn.addEventListener("click",()=>{
    //esto tiene que ir en una funcion parametrizable, pero es una prueba
    var ctx = canvases[1].getContext("2d");
    console.log(ctx);
    ops.clearContext(ctx);
    canvases[1] = null;
    console.log(canvases);
});





console.log("hola");
console.log(ops.canvas);

window.onload= ops.intializeCanvas;
window.onresize = console.log(ops.canvas);

