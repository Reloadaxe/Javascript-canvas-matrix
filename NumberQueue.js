getRandomPrintableChars = (number, firstChar = null) => {
    var chars = [];
    let y = 0;
    var char;
    while (y < number) {
        if (y == 0 && firstChar != null)
            char = firstChar;
        else
            char = String.fromCharCode(Math.floor(Math.random() * (255 - 32)) + 32);
        if (char != " " && encodeURI(char).length == 1) {
            chars.push(encodeURI(char));
            y++;
        }
    }
    return chars;
}

class NumberQueue {
    constructor(x, firstChar = null) {
        this.pos = {"x": x, "y": 0};
        this.chars = getRandomPrintableChars(12, firstChar);
        this.firstChar = firstChar;
        this.speed = Math.random() * 2 + 1;
    }

    isUnderMap = (height) => {
        if (this.pos.y - this.chars.length * 20 >= height)
            return true;
        return false;
    }

    update = () => {
        this.pos.y += this.speed;
    }

    drawFirstChar = (context, height) => {
        context.fillStyle = "#FF0000";
        context.globalAlpha = 1;
        context.fillText(this.firstChar, this.pos.x, height - 30);
    }

    draw = (context, color = true) => {
        var initAlpha = 255 - (150 - (this.speed - 1) * 50);
        var alpha = initAlpha;
        for (let y = 0; y < this.chars.length; y++) {
            if (!color && y != 0 || color) {
                if (this.firstChar != null && y == 0)
                    context.fillStyle = "#FF0000";
                else
                    context.fillStyle = "#00FF00";
                context.globalAlpha = alpha / 255;
                context.fillText(this.chars[y], this.pos.x, this.pos.y - y * 20);
            }
            alpha -= initAlpha / this.chars.length;
        }
    }
}