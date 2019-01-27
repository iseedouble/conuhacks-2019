let mobilenet;
let classifier;
let video;
let label = 'test';
let trainButton;

const classes = ['trash', 'compost', 'paper', 'recycle', 'warning'];

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    label = result;
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', () => {console.log('model ready')});
  classifier = mobilenet.classification(video, () => {console.log('video ready')});
  
  createElement('br');

  classes.forEach((className) => {
    const button = createButton(className); 
    button.mousePressed(() => {
      classifier.addImage(className);
    });
  })

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train((loss) => {
      if (loss == null) {
        console.log('Training Complete');
        classifier.classify(gotResults);
      } else {
        console.log(loss);
      }
    });
  });
}

function draw() {
  background(0);
  image(video, 0, 0, 320, 240);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}

function saveModel() {
  classifier.save('file:///tmp/my-model-1').then((res) => {
    console.log(res)
  })
}