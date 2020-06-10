// ## Array Cardio Day 2

const people = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 },
];

const comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
// 최소 19살 이상이 존재하는가?

//현재 년도 구하기
let thisDate = new Date();
let thisYear = thisDate.getFullYear();

//현재 년도 - people 배열안 사람들의 출생년도가 19 이상이면 true 반환
function overNineteen(value) {
  return thisYear - value.year >= 19 ? true : false;
}

let result = people.some(overNineteen);
if (result === true) {
  console.log(
    "1. Use some() method : 해당 사람들 중에 나이가 19살 이상인 사람이 존재합니다 !"
  );
} else {
  console.log("1. Use some() method : 19살 이상인 사람이 존재하지 않습니다 !");
}

// Array.prototype.every() // is everyone 19 or older?
// 모든 사람이 19살 이상인가 ?
let result2 = people.every(overNineteen);
if (result === true) {
  console.log("2. Use every() method : 해당 사람들은 모두 19살 이상입니다!!");
} else {
  console.log("2. Use every() method : 19살 이상인 사람이 존재합니다 !");
}

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
// ID가 823423인 comment를 찾아라
let commentFind = comments.find((object) => object.id === 823423);
console.log("3. id가 823423인 comment는 ", commentFind, "입니다.");

// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423
// ID가 823423인 객체의 comment를 지워라
let commentFindIndex = comments.findIndex((object) => object.id === 823423);
comments.splice(commentFindIndex, 1);
console.log("4. id가 823423인 comment를 지웠습니다.", comments);
