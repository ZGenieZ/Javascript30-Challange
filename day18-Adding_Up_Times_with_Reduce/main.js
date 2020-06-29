//data-time props를 가지고 있는 태그들을 선택
const timeNodes = document.querySelectorAll("[data-time]");

//노드 리스트를 Array.from() 메서드로 배열로 고침(map,reduce 메서드를 사용하기 이ㅜ함)
const timeArray = Array.from(timeNodes);

//map과 reduce를 사용한 "4:38"과 같은 문자열에서 분과 초를 분리하여
//문자열 -> 실수값으로 고친뒤 초로 통일하여 모두 더함
const seconds = timeArray
  .map((time) => time.dataset.time)
  .map((time) => {
    const [min, sec] = time.split(":").map(parseFloat);
    return min * 60 + sec;
  })
  .reduce((acc, cur) => acc + cur);

//총 동영상 시간을 초로 나타낸 것을 시간 분 초로 나누어서 콘솔에 출력
let secondsLeft = seconds;
const hours = Math.floor(seconds / 3600);
secondsLeft = secondsLeft % 3600;
const minutes = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;
const secs = secondsLeft;
console.log(
  "총 동영상 길이 : " + hours + "시간 " + minutes + "분 " + secs + "초"
);
