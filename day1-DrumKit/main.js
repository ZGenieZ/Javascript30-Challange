//키를 눌렀을 때 해당 키에 설정한 소리가 나게 하기
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  //누른 키의 KeyCode에 해당하는 값이 없으면 무시
  if (!audio) return;

  //누른 키의 keyCode 값에 해당하는 값이 있으면 playing 클래스를 추가
  key.classList.add("playing");

  //누를 때마다 음악이 처음부터 시작되게 함
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  //누른 키의 속성명 중 transform이 없으면 실행하지 않고
  //있으면 playing 이란 클래스 삭제
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);
