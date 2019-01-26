import * as mobilenet from '@tensorflow-models/mobilenet';

const video = document.getElementById('videoElement');
const classifyButton = document.getElementById('classifyButton');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function snapshot() {
  // Draws current image from the video element into the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function classify(image) {
  console.log(image);
  mobilenet
    .load()
    .then((model) => {
      model.classify(image).then((predictions) => {
        console.log('predictions:', predictions);
      });
    })
    .catch(() => {
      console.log('error loading image');
    });
}

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch(() => {
      console.log('Something went wrong!');
    });
}

classifyButton.addEventListener('click', () => {
  classify(snapshot());
  console.log('YO WASSSUP BITCHES');
});
