const canvas = document.querySelector("#draw");

//Drawing Context에 접근
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//윤곽선 색깔 지정
ctx.strokeStyle = "#BADA55";
//두 선이 만나는 지점의 모양 지정
ctx.lineJoin = "round";
//선의 끝모양 지정
ctx.lineCap = "round";
//선의 굵기 지정
ctx.lineWidth = 10;

//그리는 중인지 판별하게 해주는 flag 변수 지정
let idDrawing = false;

// 시작지점의 x,y좌표를 0으로 지정(초기화)
let lastX = 0;
let lastY = 0;

//기본 색상을 0으로 설정
let hue = 0;
//굵기를 정하는 방향을 지정
let direction = true;

function draw(e) {
  //flag 변수가 false이면 선을 그리지 않음
  if (!isDrawing) return;

  //hsl 함수를 사용해 선색깔, 채도, 명도를 지정한다.
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;

  /* 새로운 경로를 만든다. 경로가 생성되면 이후 그리기 명령들은 
  경로를 구성하고 만드는데 사용하게 됨*/
  ctx.beginPath();
  ctx.moveTo(lastX, lastY); //그리기 시작할 좌표
  ctx.lineTo(e.offsetX, e.offsetY); //그리기 종료할 좌표
  ctx.stroke(); //시작점과 종료좀을 이어준다

  //시작점을 종료점으로 지정함으로써 선이 매끄럽게 이어질 수 있도록한다.
  //하지만 마우스 클릭을 떼고 다시 클릭하면 끝점과 시작점 사이에 선이 이어지는
  //문제가 발생함.
  [lastX, lastY] = [e.offsetX, e.offsetY];

  //이벤트가 일어날때마다 색깔이 바뀜. (최대값 = 360)
  hue++;

  //hue값이 최대값을 넘을 경우 0으로 초기화
  if (hue >= 360) {
    hue = 0;
  }

  //선 굵기가 1~100사이의 값으로 왔다갔다 하게 direction 변수를 true,false로 바꿔줌
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  //위의 문제를 방지하기 위해 마우스를 클릭했을때 시작점을 그 지점으로
  //지정함으로써 마우스를 떼고 새로 점을 찍고 그릴때 그 점들 사이에
  //선이 연결되지 않게 함
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);

//마우스를 뗐을때, 화면을 벗어났을때 isDrawing flag변수를 false로 지정
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
