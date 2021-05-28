prediction_1 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = "<img id='capture_image' src="+data_uri+">"
    });
}

console.log("ml5 version:" , ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/oHiYSgnJL/model.json" , modelloaded);

function modelloaded(){
    console.log("model is loaded !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
}

function speak(){
    synth = window.speechSynthesis;
    speak_data1 = "The first prediction is "+ prediction_1;
    utter_this = new SpeechSynthesisUtterance(speak_data1);
    utter_this.rate = 0.9;
    synth.speak(utter_this);
}

function check(){
    img = document.getElementById('capture_image');
    classifier.classify(img , Gotresult);
}

function Gotresult(error , results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        
        prediction_1 = results[0].label;

        document.getElementById("emotion_name1").innerHTML = prediction_1;
        speak();

        if(prediction_1 == "amazing"){
            document.getElementById("emoji_1").innerHTML = "👌";
        }
        if(prediction_1 == "best"){
            document.getElementById("emoji_1").innerHTML = "👍";
        }
        if(prediction_1 == "victory"){
            document.getElementById("emoji_1").innerHTML = "✌";
        }

    }
}