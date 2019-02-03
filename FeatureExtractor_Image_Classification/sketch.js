const video = document.getElementById('video');
const videoStatus = document.getElementById('videoStatus');
const loading = document.getElementById('loading');
const catButton = document.getElementById('catButton');
const dogButton = document.getElementById('dogButton');
const amountOfCatImages = document.getElementById('amountOfCatImages');
const amountOfDogImages = document.getElementById('amountOfDogImages');
const train = document.getElementById('train');
const loss = document.getElementById('loss');
const result = document.getElementById('result');
const predictButton = document.getElementById('predict');
const saveButton = document.getElementById('saveModel');
const serverPredict = document.getElementById('serverPredict');

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function snapshot() {
  // Draws current image from the video element into the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// A constiable to store the total loss
let totalLoss = 0;

// Create a webcam capture
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    video.srcObject = stream;
    video.play();
  });
}

// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', () => {
  console.log('model ready');
});
// Create a new classifier using those features
const classifier = featureExtractor.classification(video, () => {
  console.log('video ready');
});

// Predict the current frame.
function predict() {
  classifier.predict(gotResults);
}

// When the Cat button is pressed, add the current frame
// from the video with a label of cat to the classifier
catButton.onclick = function () {
  classifier.addImage('cat');
  amountOfCatImages.innerText = Number(amountOfCatImages.innerText) + 1;
}

// When the Cat button is pressed, add the current frame
// from the video with a label of cat to the classifier
dogButton.onclick = function () {
  classifier.addImage('dog');
  amountOfDogImages.innerText = Number(amountOfDogImages.innerText) + 1;
}

// When the train button is pressed, train the classifier
// With all the given cat and dog images
train.onclick = function () {
  classifier.train(function(lossValue) {
    if (lossValue) {
      totalLoss = lossValue;
      loss.innerHTML = 'Loss: ' + totalLoss;
    } else {
      loss.innerHTML = 'Done Training! Final Loss: ' + totalLoss;
    }
  });
}

// Show the results
function gotResults(err, data) {
  // Display any error
  if (err) {
    console.error(err);
  }
  result.innerText = data;
  classifier.classify(gotResults);
}

// Start predicting when the predict button is clicked
predictButton.onclick = function () {
  classifier.classify(gotResults);
}

// save the model
saveButton.onclick = () => {
  console.log(classifier);
  // classifier.save('downloads://my-model-1');
}

// prediction from the server
serverPredict.onclick = () => {
  snapshot();
  
  fetch('http://localhost:3000/classify', {
  // fetch('http://localhost:3000/mobilenet', {
  // fetch('https://classitrash-server.herokuapp.com/mobilenet', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({dataURL: canvas.toDataURL()})
  })
  .then((res) => res.json())
  .then((data) => {console.log(data)})
  .catch(err => {
    console.log('error:', err);
  });
}