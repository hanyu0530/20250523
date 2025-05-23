let facemesh;
let predictions = [];
const points = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];

function setup() {
  createCanvas(640, 480);
  // 致中畫布
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  createCanvas(640, 480).position(x, y);

  // 啟用視訊
  let video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 載入 facemesh
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  console.log('Facemesh model loaded!');
}

function draw() {
  background(220);

  // 畫出串接的紅線
  if (predictions.length > 0) {
    let keypoints = predictions[0].scaledMesh;
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < points.length; i++) {
      let idx = points[i];
      let [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();
  }
}
