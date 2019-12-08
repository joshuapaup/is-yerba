</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
<script src="https://unpkg.com/ml5@0.4.3/dist/ml5.min.js"></script>
<script type="text/javascript">
  // Classifier Variable
  let classifier;

  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/fUwmUh09/';


  let video;
  let flippedVideo;

  let label = "";


  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(620, 560);
    // Create the video
    video = createCapture(VIDEO);
    video.size(620, 540);
    video.hide();

    flippedVideo = ml5.flipImage(video)
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    // image(flippedVideo, 0, 0);
    image(flippedVideo, 0, 0, 620, 560);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
  }

  function gotResult(error, results) {
    if (error) {
      console.error(error);
      return;
    }

    console.log(results[0]);
    label = results[0].label;
    classifyVideo();
  }
</script>
