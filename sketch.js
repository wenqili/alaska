//canvas
var video;
var width = 800;
var height = 600;
// var iceWidth = [];
var topOffSet = 50;
var bottomOffSet = 50;

//iceberg
var iceHeightMax = 600;
var iceHeight = [];
var iceXPos = [];
var iceYPos = [];
var copyXPos = [];
var copyYPos = [];

//params
var gui = new dat.GUI();
var params = {
    iceWidthMax: 30,
    space: 10,
}

var f1 = gui.addFolder('Shape Control');
f1.add(params, 'iceWidthMax', 0, 100);
f1.add(params, 'space', 0, 20);



function setup() {
    createCanvas(windowWidth, windowWidth * (9 / 16));
    video = createCapture(VIDEO);

    //interaction test
    var buttonBlow = select('#blow');
    buttonBlow.mousePressed(blow);
    // playVideo();

    //presetting
    randomIce();
    randomArray(copyXPos);
}



function draw() {
    randomIce();
    video.size(windowWidth, windowWidth * (9 / 16));
    background(255, 255, 0, 20);
    video.loadPixels();
    createIceberg();

    // updatePixels();;
}



function randomIce() {
    iceHeightMax = windowWidth * (9 / 16);
    count = windowWidth / params.iceWidthMax;
    for (var i = 0; i < count; i++) {
        // iceHeight.push(random(2*bottomOffSet, iceHeightMax - 2 * topOffSet));
        // copyXPos.push(params.iceWidthMax * i);
        // copyYPos.push(iceHeightMax - iceHeight[i] - bottomOffSet);
        // iceYPos.push(iceHeightMax - iceHeight[i] - bottomOffSet);
        iceHeight.push(random(2*bottomOffSet, iceHeightMax - 2 * topOffSet));
        copyXPos.push(params.iceWidthMax * i);
        copyYPos.push(iceHeightMax - iceHeight[i] - bottomOffSet);
        iceYPos.push(iceHeightMax - iceHeight[i] - bottomOffSet);
    }
}


function createIceberg() {
    for (var i = 0; i < count; i++) {
        // fill(200);
        // rect(iceWidthMax*i,iceHeightMax-iceHeight[i],50,iceHeight[i]);
        copy(video,
            copyXPos[i], copyYPos[i], params.iceWidthMax - params.space, iceHeight[i],
            params.iceWidthMax * i, iceYPos[i], params.iceWidthMax - params.space, iceHeight[i]);
    }
}

function randomArray(arr) {
    var m = arr.length,
        t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }
    return arr;
}

function blow() {
    console.log("blow");
    Animation();
    randomArray(copyXPos);
}

function Animation() {
    for (var i = 0; i < count; i++) {
        copyYPos[i] += random(0, 20);
        iceYPos[i] += random(0, 20);
    }

}

function playVideo() {
    var iceVideo = $('#ice').get(0);
    iceVideo.loop = true;
    iceVideo.play();
    console.log('iceVideo started');
}

// $('#violet').show()

function windowResized() {
    resizeCanvas(windowWidth, windowWidth * (9 / 16));
}
