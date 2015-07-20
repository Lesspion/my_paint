/*jslint browser:true, node: true */
/*jslint indent: 4 */
/*jshint strict: true */
"use strict";

var Tools = function (canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.clicked = false;
    this.actual = "pen";
    this.numberClick = 0;
    this.coord = [];
    this.color = "rgb(0,0,0)";
    this.fill = false;
    this.shadow = false;
    this.h = this.canvas.height;
    this.w = this.canvas.width;
    this.stroke = 1;
    var savedThis = this;
    function addPixel(x, y) {
        ctx.fillStyle = savedThis.color;
        ctx.fillRect(x, y, savedThis.stroke, savedThis.stroke);
    }
    this.penDown = function (e) {
        var mouseX = e.pageX - this.offsetLeft,
            mouseY = e.pageY - this.offsetTop;
        this.clicked = true;
        addPixel(mouseX, mouseY);
    };
    this.penUp = function () {
        this.clicked = false;
    };
    this.penMove = function (e) {
        if (this.clicked === true) {
            var mouseX = e.pageX - this.offsetLeft,
                mouseY = e.pageY - this.offsetTop;
            addPixel(mouseX, mouseY);
        }
    };
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
    this.lineDown = function (e) {
        var mouseX = e.pageX - savedThis.canvas.offsetLeft,
            mouseY = e.pageY - savedThis.canvas.offsetTop;
        savedThis.clicked = true;
        savedThis.numberClick += 1;
        savedThis.coord.push([mouseX, mouseY]);
        //console.log('x : ' + mouseX + ', Y : ' + mouseY);
        if (savedThis.numberClick === 2) {
            savedThis.ctx.beginPath();
            savedThis.ctx.lineWidth = savedThis.stroke;
            savedThis.ctx.moveTo(savedThis.coord[0][0], savedThis.coord[0][1]);
            savedThis.ctx.lineTo(savedThis.coord[1][0], savedThis.coord[1][1]);
            savedThis.ctx.closePath();
            savedThis.ctx.strokeStyle = savedThis.color;
            savedThis.ctx.stroke();
            savedThis.coord = [];
            savedThis.numberClick = 0;
        }
    };
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
    this.rectDown = function (e) {
        var mouseX = e.pageX - savedThis.canvas.offsetLeft,
            mouseY = e.pageY - savedThis.canvas.offsetTop,
            width,
            height;
        savedThis.clicked = true;
        savedThis.numberClick += 1;
        savedThis.coord.push([mouseX, mouseY]);
        if (savedThis.numberClick === 2) {
            width = savedThis.coord[1][0] - savedThis.coord[0][0];
            height = savedThis.coord[1][1] - savedThis.coord[0][1];
            savedThis.ctx.strokeStyle = savedThis.color;
            if (savedThis.fill === true) {
                savedThis.ctx.rect(savedThis.coord[0][0], savedThis.coord[0][1], width, height);
                savedThis.ctx.fillStyle = savedThis.color;
                savedThis.ctx.fill();
            } else {
                savedThis.ctx.rect(savedThis.coord[0][0], savedThis.coord[0][1], width, height);
                savedThis.ctx.stroke();
            }
            savedThis.coord = [];
            savedThis.numberClick = 0;
        }
    };
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
    this.circleDown = function (e) {
        var mouseX = e.pageX - savedThis.canvas.offsetLeft,
            mouseY = e.pageY - savedThis.canvas.offsetTop;
        savedThis.clicked = true;
        savedThis.numberClick += 1;
        savedThis.coord.push([mouseX, mouseY]);
        //console.log('x : ' + mous eX + ', Y : ' + mouseY);
        if (savedThis.numberClick === 2) {
            savedThis.ctx.beginPath();
            savedThis.ctx.arc(savedThis.coord[0][0], savedThis.coord[0][1], Math.sqrt(Math.pow(mouseX - savedThis.coord[0][0], 2) + Math.pow(mouseY - savedThis.coord[0][1], 2)), 0, Math.PI * 2);
            savedThis.ctx.strokeStyle = savedThis.color;
            if (savedThis.fill === true) {
                savedThis.ctx.fillStyle = savedThis.color;
                savedThis.ctx.fill();
            }
            savedThis.ctx.closePath();
            savedThis.ctx.stroke();
            savedThis.coord = [];
            savedThis.numberClick = 0;
        }
    };
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
    this.crop = function (e) {
        var mouseX = e.pageX - savedThis.canvas.offsetLeft,
            mouseY = e.pageY - savedThis.canvas.offsetTop,
            width,
            height;
        savedThis.clicked = true;
        savedThis.numberClick += 1;
        savedThis.coord.push([mouseX, mouseY]);
        if (savedThis.numberClick === 2) {
            width = savedThis.coord[1][0] - savedThis.coord[0][0];
            height = savedThis.coord[1][1] - savedThis.coord[0][1];
            savedThis.ctx.getImageData(savedThis.coord[0][0], savedThis.coord[0][1], width, height);
            savedThis.coord = [];
            savedThis.numberClick = 0;
        }
        e.preventDefault();
        e.stopPropagation();
    };
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
    this.razClick = function () {
        savedThis.ctx.clearRect(0, 0, savedThis.canvas.width, savedThis.canvas.height);
    };
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
    this.download = function (link, can) {
        return function () {
            link.href = can.toDataURL("image/png");
            link.download = "test.png";
        };
    };
    this.upload = function () {
        var base = new Image();
        base.src = document.getElementById('file').value;
        console.log('before');
        base.onload = function () {
            console.log('after');
            savedThis.ctx.drawImage(base, 0, 0, 500, 500);
            console.log(savedThis.ctx);
        };
    };
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
    this.changeActual = function (actual) {
        this.actual = actual;
    };
    this.changeColor = function (newColor) {
        var red = parseInt(((newColor.charAt(0) === "#") ? newColor.substring(1, 7) : newColor).substring(0, 2), 16),
            green = parseInt(((newColor.charAt(0) === "#") ? newColor.substring(1, 7) : newColor).substring(2, 4), 16),
            blue = parseInt(((newColor.charAt(0) === "#") ? newColor.substring(1, 7) : newColor).substring(4, 6), 16);
        savedThis.color = "rgb(" + red + "," + green + "," + blue + ")";
    };
    this.changeFill = function (locker) {
        if (locker.checked === true) {
            savedThis.fill = true;
        } else {
            savedThis.fill = false;
        }
    };
    this.changeWidth = function (width) {
        savedThis.canvas.width = savedThis.w = width;
    };
    this.changeHeight = function (height) {
        savedThis.canvas.height = savedThis.h = height;
    };
    this.changeStroke = function (stroke) {
        savedThis.stroke = stroke;
    };
    this.changeShadow = function (shad) {
        if (shad.checked === true) {
            savedThis.shadow = true;
            savedThis.ctx.shadowColor = "#999";
            savedThis.ctx.shadowBlur = 20;
            savedThis.ctx.shadowOffsetX = savedThis.ctx.shadowOffsetY = 15;
        } else {
            savedThis.shadow = false;
            savedThis.ctx.shadowColor = "#999";
            savedThis.ctx.shadowBlur = 0;
            savedThis.ctx.shadowOffsetX = savedThis.ctx.shadowOffsetY = 0;
        }
    };
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
    this.removeEvent = function () {
        savedThis.numberClick = 0;
        savedThis.clicked = false;
        if (this.actual === "pen") {
            this.canvas.removeEventListener('mousemove', this.penMove, true);
            this.canvas.removeEventListener('mouseup', this.penUp, true);
            this.canvas.removeEventListener('mousedown', this.penDown, true);
        } else if (this.actual === "line") {
            this.canvas.removeEventListener('mousedown', savedThis.lineDown, true);
        } else if (this.actual === "rect") {
            this.canvas.removeEventListener('mousedown', savedThis.rectDown, true);
        } else if (this.actual === "circle") {
            this.canvas.removeEventListener('mousedown', savedThis.circleDown, true);
        } else if (this.actual === "crop") {
            this.canvas.removeEventListener('mousedown', savedThis.crop, true);
        }
    };
    this.addEvent = function () {
        if (this.actual === "pen") {
            this.canvas.addEventListener('mousemove', this.penMove, true);
            this.canvas.addEventListener('mouseup', this.penUp, true);
            this.canvas.addEventListener('mousedown', this.penDown, true);
        } else if (this.actual === "line") {
            this.canvas.addEventListener('mousedown', savedThis.lineDown, true);
        } else if (this.actual === "rect") {
            this.canvas.addEventListener('mousedown', savedThis.rectDown, true);
        } else if (this.actual === "circle") {
            this.canvas.addEventListener('mousedown', savedThis.circleDown, true);
        } else if (this.actual === "crop") {
            this.canvas.addEventListener('mousedown', savedThis.crop, true);
        }
    };
};