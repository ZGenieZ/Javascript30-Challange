//controls 클래스 하위의 input 태그들을 지정
const inputs = document.querySelectorAll(".controls input");

function handleUpdate() {
  //this.dataset은 해당 태그의 속성중 data-....의 형태를 가지고 있는
  //값들을 담아서 보여줌. spacing과 blur는 px형태로 값들이 결정되므로
  //spacing과 blur input태그에는 data-sizing="px"가 있지만 base는
  //색깔이므로 굳이 data-sizing이 필요가 없기때문에 suffix를 밑에와 같이 정의
  const suffix = this.dataset.sizing || "";

  //document의 최상위 태그 html의 style요소에 조절한 값을 대입
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}

//input태그들의 속성값이 바뀔 때 동시에 화면이 적용되도록 함
inputs.forEach((input) => input.addEventListener("change", handleUpdate));
inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));
