class Wave{
    name;
    amplitude;
    frequency;
    color;
    canvas;
    card;
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

    setColor(nC){this.color = nC;}
    getColor(){return this.color;}

    setCard(nCard){this.card = nCard;}
    getCard(){return this.card;}

    setCanvas(nCan){this.canvas = nCan;}
    getCanvas(){return this.canvas;}
    deleteCanvas(){this.canvas.remove();}
    clearCanvas(canvas){
        let ctx;
        if(canvas == undefined){
            console.log(canvas);
            ctx = this.canvas.getContext("2d");
        }else{
            ctx = canvas.getContext("2d");
        }
        //let ctx = this.canvas.getContext("2d");
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        ctx.clearRect(0, 0, width, height);
    }

    //hides or shows canvas deppending on its state
    triggerCanvas(){
        if(this.canvas.style.display == "none"){
            this.canvas.style.display = "block";
        }else{
            this.canvas.style.display = "none";
        }
    }

    //cambiar a canvas
    drawWave(canvas, brushSize){
        var ctx = canvas.getContext("2d");
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        //console.log(width);
        //console.log(height);
        
        ctx.lineJoin="miter";
        ctx.beginPath();
        if(!brushSize){
            ctx.lineWidth = 2;
        }else{
            ctx.lineWidth = brushSize;
        }
        ctx.strokeStyle = this.color;
        var frec = (this.frequency * 2 * Math.PI)/canvas.width;
        //var amp = (this.amplitude)/height;
    
        var x = 0;
        var y = 0;
        
        while (x < width) {
            y = height/2 + this.amplitude * Math.sin(x * frec);
            ctx.lineTo(x, y);
            x++;
        }
        ctx.stroke();
    }
    
    //without scaling to canvas size
    //deprecated. For testing
    drawRawWave(canvas, brushSize){
        var ctx = canvas.getContext("2d");
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        console.log("rawWave" + width, height);

        ctx.lineJoin="miter";
        ctx.beginPath();
        if(!brushSize){
            ctx.lineWidth = 2;
        }else{
            ctx.lineWidth = brushSize;
        }
        ctx.strokeStyle = this.color;
        var frec = ((this.frequency * 2 * Math.PI)/width)/2;
        var amp = (this.amplitude / height)/2;

        var x = 0;
        var y = 0;
        
        while (x < width) {
            y = height/2 + this.amplitude * Math.sin(x * frec);
            ctx.lineTo(x, y);
            x++;
        }
        ctx.stroke();
    }

    updateWave(amp,frec,col,b){
        let brush
        let cardCanvas;

        if(amp != undefined){
            this.amplitude = amp;
        }

        if(!frec != undefined){
            this.frequency = frec;
        }

        if(col != undefined){
            this.color = col;
        }

        if(b != undefined){
            brush = b;
        }

        this.drawWave(this.canvas, brush);
        console.log(this.card);
        cardCanvas = this.card.querySelector(".cardCanvas");
        console.log(cardCanvas);
        this.clearCanvas(cardCanvas);
        this.drawWave(cardCanvas);
    }
}

export {Wave};