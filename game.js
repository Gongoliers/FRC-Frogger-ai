/*
 * Author - Kyle Corry
 */

var c = document.getElementById("game");
var ctx = c.getContext("2d");
var white = "#ffffff";
var black = "#000000";
var yellow = "#ffff00";
var blue = "#0000ff";
var blockSize = 20;
var height = ctx.canvas.height;
var width = ctx.canvas.width;
var jump = 50;
var vehicleSpeedL1 = 15;
var vehicleSpeedL2 = 20;
var fps = 20;
var count = 0;
// Robot position
var x = width / 2 - blockSize / 2;
var y = height - blockSize;
// Car position
var btmRightXs = [
    width, width / 2, width / 4,
    width / 5 - blockSize
];
var btmLeftXs = [
    width, width / 4, width - 4 * blockSize,
    width / 2
];
var topRightXs = [
    width, width / 4, width - 4 * blockSize,
width / 2 - blockSize
];
var topLeftXs = [
    width, width / 2, width / 4,
    width / 5 - blockSize
];
var gondolaXs = [
    width, width / 2
];
// Car Ys
var btmRightY = 400 + jump / 2 + blockSize;
var btmLeftY = 400 + blockSize / 2;
var topRightY = 250 + jump / 2 + blockSize;
var topLeftY = 250 + blockSize / 2;
var gondolaY = 100 - blockSize;
// Images
var robot = document.getElementById("robot");
var rc_left = document.getElementById("red_car_left");
var rc_right = document.getElementById("red_car_right");
var sc_left = document.getElementById("silver_car_right");
var sc_right = document.getElementById("silver_car_right");
var bc_right = document.getElementById("blue_car_right");
var bc_left = document.getElementById("blue_car_left");
var frc = document.getElementById("frc");
var chief = document.getElementById("chief");
var gondola = document.getElementById("gondola");
var gongolier = document.getElementById("gongolier");
var mb_left = document.getElementById("motorbike_left");
var mb_right = document.getElementById("motorbike_right");

var riding = false;
var gameOver = false;
var gamePaused = false;
var intervalId = null;


var gameLoop = function () {
    document.getElementById('soundtrack').play();
    ctx.font = "25px SanSerif";
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = white;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = black;
    if (gameOver) {
        clearInterval(intervalId);
        intervalId = setInterval(gameEnd, 1000 / fps);

    }
    if (gamePaused) {
        clearInterval(intervalId);
        intervalId = setInterval(gamePause, 1000 / fps);
    }

    drawBackground();
    drawObjects();
    // window.onkeydown = function (e) {
    //     var key = e.keyCode ? e.keyCode : e.which;
    //     if (key == 38) {
    //         y -= jump;
    //     } else if (key == 40) {
    //         y += jump;
    //     } else if (key == 39) {
    //         x += jump;
    //     } else if (key == 37) {
    //         x -= jump;
    //     } else if (key == 27) {
    //         gameOver = true;
    //     } else if (key == 80) {
    //         gamePaused = true;
    //     }
    // };
    if(count === 30){
      y -= jump;
    } else if(count === 32){
      x += jump;
    } else if(count === 36){
      y -= jump;
    } else if(count === 40){
      y -= jump;
    } else if(count === 45){
      y -= jump;
    } else if(count === 46){
      x += jump;
    }else if(count === 47){
      x += jump;
    } else if(count === 50){
      y -= jump;
    } else if(count === 52){
      y -= jump;
    } else if (count === 80){
      y -= jump;
    } else if (count === 81){
      y -= jump;
    } else if (count === 85){
      y -= jump;
    } else if(count === 88){
      y -= jump;
    }
    wallCollision();
    count++;
};

var drawBackground = function () {
    // Road 1
    ctx.fillRect(0, 400, width, blockSize / 2 + jump / 2);
    ctx.fillRect(0, 400 + blockSize / 2 + jump / 2, width, blockSize / 2 + jump / 2);
    ctx.fillStyle = yellow;
    ctx.fillRect(0, 400 + blockSize / 2 + jump / 2, width, 2);
    // Road 2
    ctx.fillStyle = black;
    ctx.fillRect(0, 250, width, blockSize / 2 + jump / 2);
    ctx.fillRect(0, 250 + blockSize / 2 + jump / 2, width, blockSize / 2 + jump / 2);
    ctx.fillStyle = yellow;
    ctx.fillRect(0, 250 + blockSize / 2 + jump / 2, width, 2);
    // Water
    ctx.fillStyle = blue;
    ctx.fillRect(0, 100, width, 2 * blockSize);
    ctx.fillText("Water Game!", width / 2 - "Water Game!".length * 5, 120 + blockSize + jump);
    // Gongolier
    ctx.drawImage(gongolier, width / 2 - gongolier.width / 2, 25);
    //chieftain
    ctx.drawImage(chief, 100, height - 35);
    ctx.drawImage(chief, width - 100, height - 35);
    //frc
    ctx.drawImage(frc, width / 2 - frc.width / 2, 325);
};

var drawObjects = function () {
    //Gondola
    ctx.drawImage(gondola, gondolaXs[0], gondolaY);
    ctx.drawImage(gondola, gondolaXs[1], gondolaY);
    // Robot
    ctx.drawImage(robot, x, y);
    // Gondola Movement
    gondolaMoving();

    //Btm right vehicles
    ctx.drawImage(bc_right, btmRightXs[0], btmRightY);
    ctx.drawImage(mb_right, btmRightXs[1], btmRightY);
    ctx.drawImage(bc_right, btmRightXs[2], btmRightY);
    ctx.drawImage(sc_right, btmRightXs[3], btmRightY);
    // car movement
    btmRightMove();
    //Btm left vehicles
    ctx.drawImage(rc_left, btmLeftXs[0], btmLeftY);
    ctx.drawImage(mb_left, btmLeftXs[1], btmLeftY);
    ctx.drawImage(rc_left, btmLeftXs[2], btmLeftY);
    ctx.drawImage(bc_left, btmLeftXs[3], btmLeftY);
    // car movement
    btmLeftMove();
    //Top right vehicles
    ctx.drawImage(sc_right, topRightXs[0], topRightY);
    ctx.drawImage(sc_right, topRightXs[1], topRightY);
    ctx.drawImage(rc_right, topRightXs[2], topRightY);
    ctx.drawImage(bc_right, topRightXs[3], topRightY);
    // car movement
    topRightMove();
    //Top left vehicles
    ctx.drawImage(bc_left, topLeftXs[0], topLeftY);
    ctx.drawImage(mb_left, topLeftXs[1], topLeftY);
    ctx.drawImage(rc_left, topLeftXs[2], topLeftY);
    ctx.drawImage(mb_left, topLeftXs[3], topLeftY);
    // car movement
    topLeftMove();

};

var topLeftMove = function () {
    for (var i = 0; i < topLeftXs.length; i++) {
        topLeftXs[i] -= vehicleSpeedL1;
    }
    for (var i = 0; i < topLeftXs.length; i++) {
        if (topLeftXs[i] < -blockSize * 2) {
            topLeftXs[i] = width + Math.round(Math.random() * 50);
        }
        if (topLeftY + blockSize > y && y + blockSize > topLeftY && topLeftXs[i] < x + blockSize && x < topLeftXs[i] + 2 * blockSize) {
            gameOver = true;
        }
    }
};

var topRightMove = function () {
    for (var i = 0; i < topRightXs.length; i++) {
        topRightXs[i] += vehicleSpeedL2;
    }
    for (var i = 0; i < topRightXs.length; i++) {
        if (topRightXs[i] > width + blockSize * 2) {
            topRightXs[i] = -blockSize * 2 - Math.round(Math.random() * 50);
        }
        if (topRightY + blockSize > y && y + blockSize > topRightY && topRightXs[i] < x + blockSize && x < topRightXs[i] + 2 * blockSize) {
            gameOver = true;
        }
    }
};

var btmLeftMove = function () {
    for (var i = 0; i < btmLeftXs.length; i++) {
        btmLeftXs[i] -= vehicleSpeedL1;
    }
    for (var i = 0; i < btmLeftXs.length; i++) {
        if (btmLeftXs[i] < -blockSize * 2) {
            btmLeftXs[i] = width + Math.round(Math.random() * 50);
        }
        if (btmLeftY + blockSize > y && y + blockSize > btmLeftY && btmLeftXs[i] < x + blockSize && x < btmLeftXs[i] + 2 * blockSize) {
            gameOver = true;
        }
    }
};

var btmRightMove = function () {
    for (var i = 0; i < btmRightXs.length; i++) {
        btmRightXs[i] += vehicleSpeedL1;
    }
    for (var i = 0; i < btmRightXs.length; i++) {
        if (btmRightXs[i] > width + blockSize * 2) {
            btmRightXs[i] = -blockSize * 2 - Math.round(Math.random() * 50);
        }
        if (btmRightY + blockSize > y && y + blockSize > btmRightY && btmRightXs[i] < x + blockSize && x < btmRightXs[i] + 2 * blockSize) {
            gameOver = true;
        }
    }
};

var gondolaMoving = function () {
    for (var i = 0; i < gondolaXs.length; i++) {
        gondolaXs[i] += vehicleSpeedL1;
    }
    if (riding) {
        x += vehicleSpeedL1;
    }

    for (var i = 0; i < gondolaXs.length; i++) {
        if (gondolaXs[i] > width + blockSize * 2) {
            gondolaXs[i] = -blockSize * 2 - Math.round(Math.random() * 50);
        }
    }
    if (gondolaY + 2 * blockSize > y && y + blockSize > gondolaY && (
        (gondolaXs[0] < x + blockSize && x < gondolaXs[0] + 5 * blockSize) ||
        gondolaXs[1] < x + blockSize && x < gondolaXs[1] + 5 * blockSize)) {
        riding = true;
    } else if (gondolaY + 2 * blockSize > y && y + blockSize > gondolaY) {
        riding = false;
        gameOver = true;
    } else {
        riding = false;
    }
};

var wallCollision = function () {
    if (x < 0) {
        x = 0;
    } else if (x > width - blockSize) {
        x = width - blockSize;
    } else if (y < jump) {
        if (!gameOver) {
            alert('You Win!');
            gameOver = true;
        }
    } else if (y > height - blockSize) {
        y = height - blockSize;
    }
};

var gamePause = function () {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = white;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = black;
    ctx.fillText("Game Paused, press P to resume", width / 2 - "Game Paused, press P to resume".length * 5, height / 3);
    window.onkeydown = function (e) {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key == 80) {
            gamePaused = false;
            clearInterval(intervalId);
            intervalId = setInterval(gameLoop, 1000 / fps);
        }
    };
};

var gameEnd = function () {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = white;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = black;
    ctx.fillText("Game Over, press C to play again", width / 2 - "Game Over, press C to play again".length * 5, height / 3);
    window.onkeydown = function (e) {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key == 67) {
            clearInterval(intervalId);
            window.location.reload();
        }
    };
};

var intervalId = setInterval(gameLoop, 1000 / fps);
