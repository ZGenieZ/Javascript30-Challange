//json 데이터
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];
//fetch를 사용한 json 데이터 가져오기(반환형태는 promise객체)
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => cities.push(...data));

//검색 시 일치하는 값을 찾아내는 함수
function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    //정규 표현식 함수를 사용한 정규표현식 변수 생성
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

//검색 시 일치한 값을 화면에 표시하는 함수
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      //input에 입력한 값에 노랑색 배경을 넣기 위한 정규표현식을 인자로 받는 replace 함수 실행
      const cityName = place.city.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      return `
    <li>
    <span class='name'>${cityName}, ${stateName}</span>
    <span class='population'>${numberWithCommas(place.population)}</span>
    </li>
    `;
    })
    .join(""); //map의 반환형태는 array이므로 붙여서 리턴하기 위해 join함수 사용
  suggestions.innerHTML = html;
}

//인원수에다가 세자릿수마다 깔끔하게 콤마(,)를 붙여주는 함수 (stackoverflow 참조)
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

//change를 eventlistner로 하면 실시간으로 업데이트가 안되기 떄문에 keyup추가
//근데 굳이 change eventlistner를 사용하지 않아도 실시간으로 작동됨(입력하고 해당 입력창을 벗어나야 이벤트리스너 실행)
searchInput.addEventListener("keyup", displayMatches);
searchInput.addEventListener("change", displayMatches);
