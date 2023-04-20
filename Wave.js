class Wave{
    name;
    amplitude;
    frequency;
    color;
    canvas;
    card;
    isPlaying;
    audioContext;
    myOscillator;
    scale; //scale = 1 => 1 segundo;
    //la escala deberia ser global a todos los canvas.

    constructor(amplitude,frequency,color,name = "undefined"){
        this.name = name;
        this.amplitude = amplitude;
        this.color = color;
        this.frequency = frequency;
        this.isPlaying = false;
        this.scale = 1;
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
        if(canvas == undefined && this.canvas != undefined){
            canvas = this.canvas;
        }

        if(canvas == undefined && this.canvas == undefined){
            console.error("drawWave: no canvas specified");
            return false;
        }


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
        var frec = (this.frequency * 2 * Math.PI)/(canvas.width / this.scale);
        //var frec = (this.frequency * 2 * Math.PI)/canvas.width;
        //var amp = (this.amplitude)/height;
    
        var x = 0;
        var y = 0;
        
        while (x < width) {
            y = height/2 + this.amplitude * Math.sin(x  * frec);
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

    //deprecated
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

    reloadWave(...canvasList){
        if(canvasList != undefined){
            //to implement
            //si se pasa una lista de canvases, se actualizan esos tambien
        }

        this.drawWave(this.canvas, 2);
        let cardCanvas = this.card.querySelector("canvas");
        this.clearCanvas(cardCanvas);
        this.drawWave(cardCanvas)

    }

    playSound(){
        if(this.isPlaying){
            this.isPlaying = false;
            this.myOscillator.stop();
        }else{
            let frec = this.frequency * 2 * Math.PI
            console.log(frec);
            console.log(this.frequency);
            this.audioContext = new AudioContext();
            this.myOscillator = this.audioContext.createOscillator();    
            this.isPlaying = true;
            this.myOscillator.frequency.value = frec;
            this.myOscillator.connect(this.audioContext.destination);
            this.myOscillator.start();
        }

        //esto luego lo paro
        //myOscillator.stop(audioContext.currentTime + 2);
    }

    addSines(sinA, sinB){
        return 2 * Math.cos( (sinA-sinB) / 2) * Math.sin((sinA - sinB) / 2);
    }

    sumWaves(wave2){
        let a1 = this.getAmplitude();
        let f1 = this.getFrequency();
        let a2 = wave2.getAmplitude();
        let f2 = wave2.getFrequency();

        let eq1 = a1 * Math.a
        //x sin (wt) 
    }

    drawWaveSum(canvas,wave2){
        console.log("drawing sum");
        console.log(wave2);
        var ctx = canvas.getContext("2d");
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        //console.log(width);
        //console.log(height);
        
        ctx.lineJoin="miter";
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        var frec = (this.frequency * 2 * Math.PI)/(canvas.width / this.scale);
        var frec2 = (wave2.getFrequency() * 2 * Math.PI)/(canvas.width / this.scale);
        //var frec = (this.frequency * 2 * Math.PI)/canvas.width;
        //var amp = (this.amplitude)/height;
    
        var x = 0;
        var y = 0;
        
        while (x < width) {
            y = height/2 + (this.amplitude * Math.sin(x * frec)) + ( + wave2.getAmplitude() * Math.sin(x * frec2));
            ctx.lineTo(x, y);
            x++;
        }
        ctx.stroke();
    }

    animateWave(){
        var step =2;
        for(;;){
            console.log(step);
            this.clearCanvas(this.canvas);
            step +=10;
            this.drawWave(this.canvas,2,step)
            window.requestAnimationFrame(this.animateWave);
        }
    }

    clearWave(){
        this.card.remove();
        this.canvas.remove();
    }
}

export {Wave};