let video;
let facemesh;
let predictions = [];
const indices = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];
const indices2 = [76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184];

// 新增藍色線條與第二組線條的索引
const blueIndices = [243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,112];
const blueIndices2 = [133,173,157,158,159,160,161,246,33,7,163,144,145,153,154,155];

// 新增紫色線條與第二組線條的索引
const purpleIndices1 = [359,467,260,259,257,258,286,414,463,341,256,252,253,254,339,255];
const purpleIndices2 = [263,466,388,387,386,385,384,398,362,382,381,380,374,373,390,249];

function setup() {
  createCanvas(640, 480).position(
    (windowWidth - 640) / 2,
    (windowHeight - 480) / 2
  );
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  // 模型載入完成，可選擇顯示訊息
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 先畫第一組紅色線
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();

    // 再畫第二組紅色線並填滿黃色
    stroke(255, 0, 0);
    strokeWeight(2);
    fill(255, 255, 0, 200); // 半透明黃色
    beginShape();
    for (let i = 0; i < indices2.length; i++) {
      const idx = indices2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 在第一組與第二組之間充滿綠色
    fill(0, 255, 0, 150); // 半透明綠色
    noStroke();
    beginShape();
    // 先畫第一組
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    // 再畫第二組（反向，避免交錯）
    for (let i = indices2.length - 1; i >= 0; i--) {
      const idx = indices2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);

    // ===== 新增：藍色線條與第二組線條 =====

    // 畫藍色線條
    stroke(0, 0, 255);
    strokeWeight(15);
    noFill();
    beginShape();
    for (let i = 0; i < blueIndices.length; i++) {
      const idx = blueIndices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();

    // 畫第二組藍色線條
    stroke(0, 0, 255);
    strokeWeight(15);
    noFill();
    beginShape();
    for (let i = 0; i < blueIndices2.length; i++) {
      const idx = blueIndices2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();

    // 畫紫色線條1
    stroke(128, 0, 255); // 紫色
    strokeWeight(15);
    noFill();
    for (let i = 0; i < purpleIndices1.length - 1; i++) {
      const a = keypoints[purpleIndices1[i]];
      const b = keypoints[purpleIndices1[i + 1]];
      line(a[0], a[1], b[0], b[1]);
    }

    // 畫紫色線條2
    stroke(128, 0, 255); // 紫色
    strokeWeight(15);
    noFill();
    for (let i = 0; i < purpleIndices2.length - 1; i++) {
      const a = keypoints[purpleIndices2[i]];
      const b = keypoints[purpleIndices2[i + 1]];
      line(a[0], a[1], b[0], b[1]);
    }
  }
}
