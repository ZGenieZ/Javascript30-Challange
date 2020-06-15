const video = document.querySelector(".viewer");
const toggle = document.querySelector(".toggle");
const skipButtons = document.querySelectorAll("[data-skip]");
const ranges = document.querySelectorAll(".player__slider");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const fullScreen = document.querySelector(".fullScreen");

//비디오 화면을 눌렀을 때 재생, 중지되는 toggle fucntion
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

//화면의 상태에 따라 재생, 일시정지 버튼을 바꿈
function updateButton() {
  const icon = this.paused ? "▶" : "❚ ❚";
  console.log(icon);
  toggle.textContent = icon;
}

//스킵 버튼을 눌렀을때 해당 스킨버튼에 맞게 동영상 위치를 조절
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

//volume와 재생속도 바를 조절할 수 있는 기능
//video의 property에 'volume','playbackRate'가 있음
function handleRangeUpdate() {
  video[this.name] = this.value;
}

//동영상의 경과 상태에 따라 게이지바가 조절됨
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

//사용자가 동영상 진행 바를 조작하여 원하는 지점으로 옮길 수 있는 기능
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//전체화면 키를 눌렀을때 비디오가 전체화면으로 재생
// Cross-Browsing 적용
function handleFullscreen() {
  console.log("clicked!");
  if (video.requestFullscreen) {
    video.requestFullscreen();
  }
  // Chrome, Safari & Opera
  else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
  // FireFox
  else if (video.mozRequestFullscreen) {
    video.mozRequestFullscreen();
  }
  // IE/Edge
  else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
//timeupdate와 progress 이벤트는 동일한 효과를 가진다.
video.addEventListener("timeupdate", handleProgress);

//마우스 왼쪽버튼을 클릭했을때를 알려주는 플래그변수
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
fullScreen.addEventListener("click", handleFullscreen);

//키보드로 동영상을 조작할 수 있게함
document.addEventListener("keyup", function (e) {
  switch (e.code) {
    case "Space":
      togglePlay();
      break;
    case "ArrowLeft":
      video.currentTime -= 10;
      break;
    case "ArrowRight":
      video.currentTime += 10;
      break;
    default:
      break;
  }
});
