'use strict';

class Options {
    constructor (height, width, bg, fontSize, textAlign){
        this.height = height;
        this.width = width;
        this.bg = bg;
        this. fontSize = fontSize;
        this.textAlign = textAlign;
    }

    createDiv () {
        let div = document.createElement('div');
        div.style.cssText = `height: ${this.height};
                            width: ${this.width};
                            background: ${this.bg};
                            font-size: ${this.fontSize};
                            text-align: ${this.textAlign}`;
        div.textContent = 'Привет';
        document.body.appendChild(div);
    }
}

let a = new Options('50px', '150px', 'red', '12pt', 'right');

a.createDiv();

