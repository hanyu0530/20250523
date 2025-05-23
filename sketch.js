let facemesh;
let predictions = [];
let video; // 新增 video 變數
const points = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];
const points2 = [76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184];

function setup() {
  createCanvas(640, 480);
  // 致中畫布
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  createCanvas(640, 480).position(x, y);

  // 啟用視訊
  video = createCapture(VIDEO); // 指定為全域變數
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

  // 將視訊畫面顯示在畫布上
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    let keypoints = predictions[0].scaledMesh;

    // 畫出第一組紅線
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

    // 在第二組陣列內部充滿黃色
    noStroke();
    fill(255, 255, 0, 180); // 半透明黃色
    beginShape();
    for (let i = 0; i < points2.length; i++) {
      let idx = points2[i];
      let [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 再畫出第二組藍色外框
    stroke(0, 0, 255);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < points2.length; i++) {
      let idx = points2[i];
      let [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();
  }
}
