var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;
var context = canvas.getContext("2d");
context.font = "20px Arial";

var queues = [];
var message = "Je suis un hacker"; // change message
var messageIndex;
var messageIndexes = [];

for (let i = 0; i < message.length; i++)
    messageIndexes.push(i);

queues.push(new NumberQueue(30));

getRandomIndex = (messageIndexes) => {
    var random = Math.floor(Math.random() * (messageIndexes.length));
    console.log(messageIndexes, messageIndexes[random], random);
    return messageIndexes[random];
}

update = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    queues.forEach((item, index, object) => {
        if (item.firstChar != null && item.pos.y >= canvas.height - 30) {
            item.update();
            item.draw(context, false);
            item.drawFirstChar(context, canvas.height);
        } else {
            item.update();
            item.draw(context);
            if (item.isUnderMap(canvas.height)) {
                object.splice(index, 1);
            }
        }
    });
    if (Math.floor(Math.random() * 5) == 3) {
        if (messageIndexes.length != 0 && Math.floor(Math.random() * 10) == 5) {
            messageIndex = getRandomIndex(messageIndexes);
            messageIndexes.splice(messageIndexes.indexOf(messageIndex), 1);
            if (message[messageIndex] != " " && encodeURI(message[messageIndex]).length == 1)
                queues.push(new NumberQueue(messageIndex * canvas.width / message.length, message[messageIndex]));
        } else {
            queues.push(new NumberQueue(Math.floor(Math.random() * canvas.width)))
        }
    }
}

setInterval(update, 5);