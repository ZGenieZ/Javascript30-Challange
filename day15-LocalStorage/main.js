const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const CheckAll = document.querySelector("#CheckAll");
const UncheckAll = document.querySelector("#UncheckAll");
const Delete = document.querySelector("#Delete");

//localStorage에 객체가 저장되있다면 그대로 출력, 없으면 빈칸
let items = JSON.parse(localStorage.getItem("items")) || [];

//사용자가 입력한 내용을 저장하는 함수
function addItem(e) {
  //submit을 눌렀을때 refresh 방지
  e.preventDefault();
  //사용자가 입력한 text 저장
  text = this.querySelector("[name=item]").value;
  const item = {
    text, //text: text를 ES6 문법으로 처리
    done: false, //체크 여부
  };
  items.push(item); //items에 사용자가 입력한 정보를 담고 있는 객체 추가
  //추가한 리스트를 화면에 업데이트
  populateList(items, itemsList);

  //localStorage에 items를 key로 하는 items객체들을 저장
  //key-value쌍으로 문자열로 저장되기 때문에 브라우저는 toString()을 사용해 문자화 한다.
  //이때 객체를 넣으면 결과값은 [object Object]가 된다.
  //따라서 객체를 문자로 변환해주는 JSON.stringify()를 사용한다.
  localStorage.setItem("items", JSON.stringify(items));
  this.reset(); //submit 후 입력 창 초기화
}

//추가한 리스트를 화면에 업데이트(plates: 정보를 가지고있는 배열, platesList: 정보를 넣고싶은 DOM 객체)
function populateList(plates, platesList) {
  //만약 plates 배열이 비어있으면 (DELETE) 기본 리스트 출력
  if (plates.length === 0) {
    return (platesList.innerHTML = `
            <li>Loading Tapas...</li>
        `);
  }

  //사용자가 입력한 내용을 리스트화해서 화면에 출력
  //이때 item.done이 true일시 checkbox에 checked property 추가
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      }>
        <label for="item${i}">${plate.text}</label>
      </li>
      `;
    })
    .join("");
}

//event delegation(이벤트 위임)을 수행하는 함수
function toggleDone(e) {
  //input 태그가 아니면 리턴
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  //체크한 아이템의 done의 상태를 toggle형식으로 바꿈
  items[index].done = !items[index].done;
  //localStorage에 items를 업데이트 한뒤
  localStorage.setItem("items", JSON.stringify(items));
  //바뀐 정보를 화면에 출력
  populateList(items, itemsList);
}

//checkAll 버튼을 눌렀을때 item.done을 모두 true로 변경
function clickCheckAll() {
  items.map((item, i) => {
    return (item.done = true);
  });
  //localStorage에 items를 업데이트 한뒤
  localStorage.setItem("items", JSON.stringify(items));
  //바뀐 정보를 화면에 출력
  populateList(items, itemsList);
}

//checkAll 버튼을 눌렀을때 item.done을 모두 false로 변경
function clickUncheckAll() {
  console.log(items);
  items.map((item, i) => {
    return (item.done = false);
  });
  //localStorage에 items를 업데이트 한뒤
  localStorage.setItem("items", JSON.stringify(items));
  //바뀐 정보를 화면에 출력
  populateList(items, itemsList);
}

//Delete 버튼을 눌렀을때 items를 초기화
function DeleteItems() {
  console.log(itemsList.innerHTML);
  items = [];
  //localStorage에 items를 업데이트 한뒤
  localStorage.setItem("items", JSON.stringify(items));
  //바뀐 정보를 화면에 출력
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
CheckAll.addEventListener("click", clickCheckAll);
UncheckAll.addEventListener("click", clickUncheckAll);
Delete.addEventListener("click", DeleteItems);

//화면을 refresh해도 전 페이지에서 적용했던 화면을 그대로 적용해서 출력
populateList(items, itemsList);
