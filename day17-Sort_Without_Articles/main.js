const bands = [
  "The Plot in You",
  "The Devil Wears Prada",
  "Pierce the Veil",
  "Norma Jean",
  "The Bled",
  "Say Anything",
  "The Midway State",
  "We Came as Romans",
  "Counterparts",
  "Oh, Sleeper",
  "A Skylit Drive",
  "Anywhere But Here",
  "An Old Dog",
];

const defaultbands = [...bands]; //기존 배열을 얕은 복사

const ul = document.querySelector("#bands");
const defalutBtn = document.querySelector("#defalutBtn");
const articleBtn = document.querySelector("#articleBtn");
const NotarticleBtn = document.querySelector("#NotarticleBtn");
ul.innerHTML = bands.map((band) => `<li>${band}</li>`).join("");

//밴드 이름의 앞의 조사 'a,an,the'를 정규표현식으로 없애는 함수
function strip(bandName) {
  return bandName.replace(/^(a |an |the )/i, "").trim();
}

//조사 포함해서 정렬했을 때
function sortArticle() {
  const sortedBands = bands.sort((a, b) => (a < b ? -1 : 1));
  // console.log(sortedBands);

  //정렬한 밴드이름이 담긴 배열을 사용해 ul의 li로 넣음
  ul.innerHTML = sortedBands.map((band) => `<li>${band}</li>`).join("");
}

//조사를 포함하지 않고 정렬했을 때
function sortNotArticle() {
  //strip함수를 사용해 조사를 뺀 단어들을 정렬하여 반환하는 함수
  const sortedBands = bands.sort((a, b) => (strip(a) < strip(b) ? -1 : 1));
  // console.log(sortedBands);

  //정렬한 밴드이름이 담긴 배열을 사용해 ul의 li로 넣음
  ul.innerHTML = sortedBands.map((band) => `<li>${band}</li>`).join("");
}

//정렬하지 않은 기본 배열을 출력
function sortDefault() {
  ul.innerHTML = defaultbands.map((band) => `<li>${band}</li>`).join("");
}

defaultBtn.addEventListener("click", sortDefault);
articleBtn.addEventListener("click", sortArticle);
NotarticleBtn.addEventListener("click", sortNotArticle);
