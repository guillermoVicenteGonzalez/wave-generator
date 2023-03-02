class Wave{
    name;
    amplitude;
    frequency;
    color;
    canvas;
    //canvas???

    constructor(amplitude,frequency,color,name){
        this.name = name;
        this.amplitude = amplitude;
        this.color = color;
        this.frequency = frequency;
    }

    //aqui faltan veritficaciones de rango y de tipo.
    setAmplitude(nA){this.amplitude = nA;}
    getAmplitude(){return this.amplitude;}

    setName(n){this.name = n;}
    getName(){return this.name;}

    setFrequency(nF){this.frequency = nF;}
    getFrequency(){return this.frequency};

    setColor(nC){this.color = nc;}
    getColor(){return this.color;}

    setCanvas(nCan){this.canvas = nCan;}
    getCanvas(){return this.canvas;}
    deleteCanvas(){this.canvas.remove();}

    //cambiar a canvas
    drawWave(canvas){
        var ctx = canvas.getContext("2d");
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        
        ctx.lineJoin="miter";
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        var frec = (this.frequency * 2 * Math.PI)/canvas.width;
    
        var x = 0;
        var y = 0;
        
        while (x < width) {
            y = height/2 + this.amplitude * Math.sin(x * frec);
            ctx.lineTo(x, y);
            x++;
        }
        ctx.stroke();
    }
}

export {Wave};