//canvas
var video;
var width = 1440;
var height = 900;
// var iceWidth = [];
var topOffSet = 50;
var bottomOffSet = 50;
var blowOffset = 5;

//iceberg
var iceHeightMax = 600;
var iceHeight = [];
var iceXPos = [];
var iceYPos = [];
var copyXPos = [];
var copyYPos = [];

//interaction
// var blowCount;

//params
var gui = new dat.GUI();
var params = {
    iceWidthMax: 50,
    space: 1,
    count: 29,
    reLoad: function() {
        for (var i = 0; i < this.count; i++) {
            iceHeight[i] = (random(2 * bottomOffSet, iceHeightMax - 2 * topOffSet));
            copyXPos[i] = (this.iceWidthMax * i);
            copyYPos[i] = (iceHeightMax - iceHeight[i]);
            iceYPos[i] = (iceHeightMax - iceHeight[i]);
        }
        randomArray(copyXPos);
        createIceberg();
        console.log("reLoad");
    }

}

//Serial input variables
var serial; // variable to hold an instance of the serialport library
var sensorValue = 0;
var spaceInput;

var f1 = gui.addFolder('Shape Control');
f1.add(params, 'iceWidthMax', 10, 50);
// f1.add(params, 'space', 0, 20);
f1.add(params, 'count', 0, 100);
f1.add(params, 'reLoad');

var videoReady = false;

function setup() {
    //Serial input
    serial = new p5.SerialPort(); // make a new instance of  serialport library
    serial.on('list', printList); // callback function for serialport list event
    serial.on('data', serialEvent); // callback for new data coming in
    serial.list(); // list the serial ports
    serial.open("/dev/cu.usbmodem1411"); // open a port
    createCanvas(1440, 900);

    video = createVideo('assets/ice.mp4',preset);
    video.play();
    video.loop();
    // video.hide();
    // createCanvas(windowWidth, windowHeight);

    // video = createCapture(VIDEO);

    preset(video);

    //presetting
    randomIce();
    randomArray(copyXPos);

    serial.write("X");
}



function draw() {

    //if (!videoReady) {
    if(video.time() == 0){
      textSize(200);
      text(CENTER);
      text("ALASKA",1/5*1440,1/3*900);

      // textSize(100);
      // text("loading...", 1/2*1440,2/3*900);

    }
    background(255, 255, 0, 20);
    // refresh();
    // randomIce();
    // video.size(windowWidth, windowWidth * (9 / 16));
    video.size(1440, 900);
    // background(255, 255, 255, 20);
    video.loadPixels();
    interact();
    params.space = spaceInput;
    createIceberg();
    // updatePixels();;
}

function preset() {
    videoReady = true;
    // iceHeightMax = windowWidth * (9 / 16);
    iceHeightMax = 900;
}


function randomIce() {
    // iceHeightMax = windowWidth * (9 / 16);
    // params.count = windowWidth / params.iceWidthMax;
    for (var i = 0; i < params.count; i++) {
        iceHeight.push(random(3 * bottomOffSet, iceHeightMax - 2 * topOffSet));
        //当iceWidthMax太大，copy视频取不到东西
        copyXPos.push(params.iceWidthMax * i);
        copyYPos.push(iceHeightMax - iceHeight[i]);
        iceYPos.push(iceHeightMax - iceHeight[i]);
    }
}

function createIceberg() {
    for (var i = 0; i < params.count; i++) {
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



// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }


//Serial Event
//serial input functions, ref: Tom Igeo and Shawn Van
// get the list of ports:
function printList(portList) {
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        println(i + " " + portList[i]);
    }
}

function serialEvent() {
    var inString = serial.readLine();
    if (inString.length > 0) {
        inString = inString.trim();
        var value = inString;
        if (value.length > 2) {
            sensorValue = value;
            console.log("sensorValue:" + sensorValue);
            serial.write("X");
        }
    }
}


//interaction part
function interact() {
    //iceberg drop
    if (sensorValue > 600) {
        sensorValue = 600;
    }else if(sensorValue < 100){
      sensorValue = 0;
    }
    spaceInput = map(sensorValue, 0, 600, params.iceWidthMax-1, 0);
    console.log("spaceInput: " + spaceInput);
    if (sensorValue > 500) {
        blow();
    }

    sensorValue = 10;

    //background colorchange


}

function blow() {
    console.log("blow");
    // Animation();
    // randomArray(copyXPos);
}


function Animation() {
    for (var i = 0; i < params.count; i++) {
        // copyYPos[i] += random(0, 5);
        iceYPos[i] += random(0, 5);
        // iceYPos[i] += copyYPos[i];
    }
}

function co2(){

}
