import {Wave} from "./Wave.js"



function showAxes(ctx,axes) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    var xMin = 0;
    
    ctx.restore();

    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    
    // X-Axis
    ctx.moveTo(xMin, height/2);
    ctx.lineTo(width, height/2);
    
    // Y-Axis
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2, height);

    // Starting line
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    
    ctx.stroke();
    //ctx.save();
}
let canvas = document.getElementById("mainCanvas");
resizeCanvas(canvas);

//intializeCanvas();

function resizeCanvas(canvas){
    let container = canvas.parentElement;
    let width = container.clientWidth;
    let height = container.clientHeight;

    canvas.width = width ;
    canvas.height = height;
    console.log("resizing");
}


window.onresize = ()=>{
    //poco eficiente
    //https://web.archive.org/web/20220714020647/https://bencentra.com/code/2015/02/27/optimizing-window-resize.html
    resizeCanvas(canvas);
}
//intializeCanvas();
