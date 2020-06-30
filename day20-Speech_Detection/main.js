//브라우저에서 음성인식을 위해 설정(FireFox는 window.SpeechRecognition)
//크롬은 window.webkitSpeechRecognition. 브라우저에 따라 webkit 속성을 적용
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

//새로운 SpeechRecognition 객체를 만들고
//음성 인식의 중간 결과를 확인하기 위해 interimResults 값을 true로 설정
const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

//SpeechRecognition()이 결과를 반환할 때 이벤트를 설정
recognition.addEventListener("result", (e) => {
  console.log(e.results);
  //확인하고자 하는 음성 텍스트는 e.results속에 존재하는데
  //이는 배열이 아니므로 map같은 메서드를 적용할 수 없다.
  //따라서 Array.from()으로 배열로 만들어준 다음 results안의
  //transcript(음성텍스트)를 얻기 위해 2중 map()을 써주고
  //음성이 배열의 두 값으로 갈라질 수 있으므로 join()으로
  //합쳐주어 하나의 문자열로 바꿔준다.
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  console.log(transcript);

  //p태그의 textContent로 음성텍스트를 넣는다.
  p.textContent = transcript;

  //덮어쓰기를 방지하기 위해 isFinal(음성 인식이 끝났는지 알려주는 변수)이 true일때
  //새로 p태그를 만들어 words 태그에 붙여줌
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
  //욕설을 썼을경우 필터링
  if (transcript.includes("stupid")) {
    const wrongText = transcript.replace(/stupid|fuck|bitch|shit|dump/gi, "💩");
    p.textContent = wrongText;
  }
});

//음성인식을 시작
recognition.start();

//음성인식이 한번 끝나고 나서 다시 음성을 들려주었을 때
//음성 인식을 시작하는 함수를 실행
recognition.addEventListener("end", recognition.start);
