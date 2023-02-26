function test(){
    return "buenas tardes";
}

function sinWave(max,x){
    let wave = new Array();

    for(let a=0;a<max;a=a+1){
        wave[a] = Math.sin(x);
    }

    return wave;
}

function showAxes(ctx,axes) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    var xMin = 0;
    
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
    ctx.save();
}

function drawWave(amp, frec,){
    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;     // equals window dimension
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");
    
    ctx.lineJoin="miter";
    
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var scale = 20;

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(66,44,255)";

    var x = 0;
    var y = 0;
    var amplitude = amp;
    var frequency = frec;

    console.log(width);
    while (x < width) {
        //y = A sen(frec)
        y =  height/2 + amplitude * Math.sin(x/frequency);
        ctx.lineTo(x, y);
        x = x + 1;
    }
    ctx.stroke();
    ctx.save();
    //showAxes(ctx);
    return ctx;
}


function drawCanvas(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    showAxes(ctx);
}
window.onload = drawCanvas;



