//input을 가지고 있는 모든 체크박스를 선택
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;

function handleCheck(e) {
  //체크된 체크박스와 shift키를 누른 체크박스 사이의 체크박스인지 확인하는 플래그 변수
  let inBetween = false;

  //shiftKey를 누르고 checkbox가 체크된 경우
  if (e.shiftKey && this.checked) {
    checkboxes.forEach((box) => {
      // box가 현재 선택한 박스거나 마지막으로 체크한 box일때 플래그변수 변환
      // 역순으로 연속으로 체크할때  순방향으로 연속으로 체크할때
      if (box === this || box === lastChecked) {
        inBetween = !inBetween;
      }

      //플래그 변수가 true일때 박스 체크
      if (inBetween) {
        box.checked = true;
      }
    });
  }

  //마지막으로 체크한 박스를 변수에 저장
  lastChecked = this;
}

checkboxes.forEach((box) => box.addEventListener("click", handleCheck));
