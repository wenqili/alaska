
//canvas
var video;
var width = 800;
var height = 600;
// var iceWidth = [];
var topOffSet = 50;
var bottomOffSet = 50;

//iceberg
var iceHeightMax = 600;
var iceWidthMax = 40;
var iceHeight = [];
var iceXPos = [];
var iceYPos = [];
var space = 10;
var copyXPos = [];
var copyYPos = [];
// var count = width / iceWidthMax;

function windowResized() {
    resizeCanvas(windowWidth, windowWidth * (9 / 16));
}

function setup() {
    createCanvas(windowWidth, windowWidth * (9 / 16));
    video = createCapture(VIDEO);
    video.size(width, height);
    // video.hide();

    //generate position
    randomIce();

    //interaction test
    var buttonBlow = select('#blow');
    buttonBlow.mousePressed(blow);
    playVideo();
}



function draw() {
    video.size(width, height);
    background(255, 255, 255, 20);
    video.loadPixels();
    createIceberg2();

    // updatePixels();;
}


function randomIce() {
    width = windowWidth;
    iceHeightMax = windowWidth * (9 / 16);
    count = width / iceWidthMax;

    for (var i = 0; i < count; i++) {
        // iceWidth.push(random(10,iceWidthMax-1));
        iceHeight.push(random(bottomOffSet, iceHeightMax - 2 * topOffSet));
        // iceHeight.push(iceHeightMax);
        //random pos
        // copyXPos.push(random(0,width-iceWidthMax));
        //right pos
        copyXPos.push(iceWidthMax * i);
        copyYPos.push(iceHeightMax - iceHeight[i] - bottomOffSet);
        iceYPos.push(iceHeightMax - iceHeight[i] - bottomOffSet);
    }
    randomArray(copyXPos);
}

// function createIceberg(){
//   var space = 2;
//   for(var i=0; i < count; i++ ){
//     fill(200);
//     rect(iceWidthMax*i,iceHeightMax-iceHeight[i],iceWidth[i]-space,iceHeight[i]);
//     copy(video,
//       copyXPos[i],iceHeightMax-iceHeight[i],iceWidth[i]-space,iceHeight[i],
//       iceWidthMax*i,iceHeightMax-iceHeight[i],iceWidth[i]-space,iceHeight[i])
//   }
// }

function createIceberg2() {
    for (var i = 0; i < count; i++) {
        // fill(200);
        // rect(iceWidthMax*i,iceHeightMax-iceHeight[i],50,iceHeight[i]);
        copy(video,
            copyXPos[i], copyYPos[i], iceWidthMax - space, iceHeight[i],
            iceWidthMax * i, iceYPos[i], iceWidthMax - space, iceHeight[i]);
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
