class Wave{
    name;
    amplitude;
    frequency;

    constructor(amplitude,frequency,name){
        this.name = name;
        this.amplitude = amplitude;
        this.frequency = frequency;
    }

    setAmplitude(nA){this.amplitude = nA;}
    getAmplitude(){return this.amplitude;}

    setName(n){this.name = n;}
    getName(){return this.name;}

    setFrequency(nF){this.frequency = nF;}
    getFrequency(){return this.frequency};

    drawWave(ctx){
        ctx.lineJoin="miter";
    
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
    
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
    
        var x = 0;
        var y = 0;
        
        while (x < width) {
            y = height/2 + this.amplitude * Math.sin(x * this.frequency);
            ctx.lineTo(x, y);
            console.log("x: " + x + " y: " + y);
            x = x + 1;
        }
        ctx.stroke();
    }
}

export {Wave};