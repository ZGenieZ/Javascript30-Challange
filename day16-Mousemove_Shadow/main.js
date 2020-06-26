const hero = document.querySelector(".hero");
const text = document.querySelector("h2");
const walk = 100; //100px 기준

function Shadow(e) {
  //ES6 문법으로 const width = hero.offsetWidth ... 와 같음
  //hero class의 너비,높이
  const { offsetWidth: width, offsetHeight: height } = hero;
  //이벤트 객체를 기준으로 X,Y좌표를 측정
  let { offsetX: x, offsetY: y } = e;

  //만약 현재 이벤트가 발생된 객체가 바인딩 객체가 아닌경우(hero 객체에서 h1객체로 마우스 커서를
  //올리는 순간 offsetX,offsetY가 h1객체의 offsetX,offsetY로 초기화되는 문제가 발생) x,y값에
  //현재 이벤트가 발생하고 있는 객체의 offsetLeft, offsetTop값을 각각 더해준다.
  if (e.target !== this) {
    x += e.target.offsetLeft;
    y += e.target.offsetTop;
  }

  //마우스 커서에따라 움직인 거리를 화면비율에 따라 측정. 이때 픽셀은 walk의 값을 기준으로 하며
  //그림자의 모든 방향을 나타내기 위해 음수값을 만드는 방법을 사용한다.
  // 기존의 값 범위는 0~100까지지만 픽셀 값의 기준이되는 walk의 절반값을 뺌으로써
  // 값 범위는 -walk ~ +walk가 되어 그림자의 방향을 모든 방향으로 나타낼 수 있게 된다.
  xWalk = (x / width) * walk - walk / 2;
  yWalk = (y / height) * walk - walk / 2;
  //   console.log(xWalk, yWalk);

  //h1텍스트에 마우스 커서 위치에따른 그림자 위치를 동적으로 바인딩 시킨다.
  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 red,
    ${-xWalk}px ${yWalk}px 0 blue,
    ${yWalk}px ${-xWalk}px 0 green,
    ${yWalk}px ${xWalk}px 0 yellow
  `;
}

hero.addEventListener("mousemove", Shadow);
