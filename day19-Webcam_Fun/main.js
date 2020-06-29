const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  /*
        MediaDevices 인터페이스의 getUserMedia() 메서드는 사용자에게 미디어 
        입력 장치 사용 권한을 요청하며, 사용자가 수락하면 요청한 미디어 종류의 
        트랙을 포함한 MediaStream을 반환.
        스트림은 카메라, 비디오 녹화 장치, 스크린 공유 장치 등 하드웨어와 가장 
        비디오 소스가 생성하는 비디오 트랙과, 마이크, A/D 변환기 등 물리적과 가상 
        오디오 장치가 생성하는 오디오 스트림, 그리고 그 외의 다른 종류의 스트림을 
        포함할 수 있음

        반환하는 값은 MediaStream 객체로 이행하는 Promise
    */

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      console.log(localMediaStream);
      //예제에서는 video.src = window.URL.createObjectURL(localMediaStream)이지만
      //오류 발생
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      //에러 처리
      console.error("OH NO!!!", err);
    });
}

function paintToCanvas() {
  //canvas의 폭너비를 비디오의 폭너비와 맞춰줌
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    //canvas에 video를 (0,0)를 기준으로 하는 폭너비 만큼 화면에 출력
    ctx.drawImage(video, 0, 0, width, height);

    //좌표와 폭, 높이를 주면 이 영역의 이미지 정보를 가지는 ImageData(pixels) 객체가 리턴
    let pixels = ctx.getImageData(0, 0, width, height);
    //ImageData에 붉은효과를 주는 redEffect 함수를 적용시켜 변경
    // pixels = redEffect(pixels);

    //ImageData의 화면 픽셀의 RGB값을 조정하여 효과를 주는 rgbSplit 함수를 적용시켜 변경
    // pixels = rgbSplit(pixels);

    //캔버스의 투명도를 지정 (0.0(투명)~1.0(기본값=불투명))
    // ctx.globalAlpha = 0.1;

    pixels = greenScreen(pixels);

    //imgData(pixels) 전체를 x, y 위치에 써 넣는다.
    //imgData 자체에 폭과 높이에 대한 정보가 있으므로 좌상단 좌표만 전달하면 된다
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  //스크린샷을 찍을 때 소리 재생
  snap.currentTime = 0;
  snap.play();

  //캔버스에서 데이터를 url로 도출
  const data = canvas.toDataURL("image/jpeg");
  //a태그를 만들고 href에 data, download attribute를 추가해주고 innerHTML로
  //사진을 화면에 나타냄
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "JinHee");
  link.innerHTML = `
    <img src="${data}" alt="jinhee" />
  `;
  //div영역에 만든 요소를 붙임
  strip.appendChild(link);
}

//픽셀의 RGB 데이터값을 조정하여 붉게 만드는 효과
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] += 100; //R
    pixels.data[i + 1] -= 50; //G
    pixels.data[i + 2] *= 0.5; //B
  }
  return pixels;
}

//픽셀의 RGB 데이터값을 조정하여 화면들이 겹쳐보이게 하는 효과
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; //R
    pixels.data[i + 100] = pixels.data[i + 1]; //G
    pixels.data[i + 300] = pixels.data[i + 2]; //B
  }
  return pixels;
}

//그린 스크린 기술(색상 값을 뽑아냄)
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      //해당 픽셀의 색상값이 지정한 범위내에 들지 않을 경우 색을 뽑아냄(alpha = 0)
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

getVideo();

//video가 재생될 준비(video.play() 실행)가 되면 paintToCanvas 호출
video.addEventListener("canplay", paintToCanvas);
