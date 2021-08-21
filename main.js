EyeX = 0;
EyeY = 0;

EarX = 0;
EarY = 0;

IsFilterSunglass = true;

function preload(){
    Img = loadImage("Img.png");
    Img2 = loadImage("Img2.png");
}

function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet has been Initialized!!!");
}

function gotPoses(results){
    if(results.length > 0){
        if(IsFilterSunglass == true){
            console.log(results);
            EyeX = results[0].pose.rightEye.x - 20;
            EyeY = results[0].pose.leftEye.y - 20;
            console.log("Results of Left Eye X : " + results[0].pose.leftEye.x);
            console.log("Results of Left Eye Y : " + results[0].pose.leftEye.y);

        console.log("Results of Right Eye X : " + results[0].pose.rightEye.x);
        console.log("Results of Right Eye Y : " + results[0].pose.rightEye.y);
        }else if(IsFilterSunglass == false){
            
            console.log(results);
            EarX = results[0].pose.rightEar.x - 30;
            EarY = results[0].pose.leftEar.y - 100;
            console.log("Results of Left Ear X : " + results[0].pose.leftEar.x);
            console.log("Results of Left Ear Y : " + results[0].pose.leftEar.y);

            console.log("Results of Right Ear X : " + results[0].pose.rightEar.x);
            console.log("Results of Right Ear Y : " + results[0].pose.rightEar.y);
        }
        
    }
}

function draw(){
    image(video, 0, 0, 300, 300);
    if (IsFilterSunglass == true){
        image(Img, EyeX, EyeY, 85, 45);
    }else if (IsFilterSunglass == false){
        image(Img2, EarX, EarY, 150, 150);
    }
}

function take_snapshot(){
    save("YourFilterImage.png");
}

function SunGlass(){
    IsFilterSunglass = true;
    console.log("Sunglass"); 
}

function HeadPhone(){
    IsFilterSunglass = false;
    console.log("Headphone"); 
}