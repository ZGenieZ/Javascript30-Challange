//사용자가 누른 키
const pressed = [];
//비밀 문자
const secretCode = "jinhee";

window.addEventListener("keyup", (e) => {
  pressed.push(e.key);
  //항상 pressed를 secretCode의 길이만큼 새로 업데이트(secretCode의 길이를 벗어나면 pressed에서 shift() 발생시킴)
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  console.log(pressed);
  if (pressed.join("") === secretCode) {
    console.log("correct!");
    //index에서 참조하는 cornify.js를 실행시킴
    cornify_add();
  }
});
