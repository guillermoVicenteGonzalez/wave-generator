import {Wave} from "./Wave.js"
import * as ops from "./operations.js";

//elements
var newCanvasBtn = document.getElementById("newCanvasBtn");
var waveDialog = document.getElementById("waveDialog");
var openWaveDialog = document.querySelector(".openModal");
var closeWaveDialog = document.querySelector(".closeModal")
//var openWaveDialog = document.getElementById("openModalBtn");



//click events
//newCanvasBtn.addEventListener("click",ops.waveSetup);
openWaveDialog.addEventListener("click", ()=>{
    waveDialog.showModal();
});

closeWaveDialog.addEventListener("click",()=>{
    waveDialog.close();
})

console.log("hola");
console.log(ops.canvas);

window.onload= ops.intializeCanvas;
window.onresize = console.log(ops.canvas);

