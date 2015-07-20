/*jslint browser:true, node: true */
/*jslint indent: 4 */
/*global Tools*/
/*jshint strict: true */
"use strict";

var pen = document.getElementById('pen');
var line = document.getElementById('line');
var rect = document.getElementById('rect');
var circle = document.getElementById('circle');
var color = document.getElementById('color');
var raz = document.getElementById('raz');
var dl = document.getElementById('dload');
var upload = document.getElementById('upload');
var checkbox = document.getElementById('fill');
var wid = document.getElementById('width');
var hei = document.getElementById('height');
var penter = document.getElementById('penter');
var shadow = document.getElementById('shadow');
var crop = document.getElementById('crop');

var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');

var Paint = new Tools(canvas, ctx);

Paint.addEvent();

pen.addEventListener('click', function () {
    Paint.removeEvent();
    Paint.changeActual("pen");
    Paint.addEvent();
});

line.addEventListener('click', function () {
    Paint.removeEvent();
    Paint.changeActual("line");
    Paint.addEvent();
});

rect.addEventListener('click', function () {
    Paint.removeEvent();
    Paint.changeActual("rect");
    Paint.addEvent();
});

circle.addEventListener('click', function () {
    Paint.removeEvent();
    Paint.changeActual("circle");
    Paint.addEvent();
});

crop.addEventListener('click', function () {
    Paint.removeEvent();
    Paint.changeActual('crop');
    Paint.addEvent();
});

color.addEventListener('change', function () {
    Paint.changeColor(color.value);
    console.log(Paint.color);
});

raz.addEventListener('click', function () {
    Paint.razClick();
});

dl.addEventListener('click', Paint.download(document.getElementById('dload'), canvas));
upload.addEventListener('click', Paint.upload);

checkbox.addEventListener('change', function () {
    Paint.changeFill(checkbox);
});

wid.addEventListener('change', function () {
    Paint.changeWidth(wid.value);
});

hei.addEventListener('change', function () {
    Paint.changeHeight(hei.value);
});

penter.addEventListener('change', function () {
    Paint.changeStroke(penter.value);
});

shadow.addEventListener('change', function () {
    Paint.changeShadow(shadow);
});