const video = document.getElementById('videoElement');
const classifyButton = document.getElementById('classifyButton');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function snapshot() {
  // Draws current image from the video element into the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function cropImage(img) {
  const size = Math.min(img.shape[0], img.shape[1]);
  const centerHeight = img.shape[0] / 2;
  const beginHeight = centerHeight - (size / 2);
  const centerWidth = img.shape[1] / 2;
  const beginWidth = centerWidth - (size / 2);
  return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
}

function classify() {
  const webcamImage = tf.fromPixels(video);
  const croppedImage = cropImage(webcamImage);
  const batchedImage = croppedImage.expandDims(0).toFloat().div(oneTwentySeven).sub(one);
  console.log(batchedImage)
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
  snapshot(); // TODO: make post request with this object
  classify();
});
