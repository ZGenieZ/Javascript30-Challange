//이벤트를 그룹화하여 특정시간이 지난 후 하나의 이벤트만 발생하도록 하는 기술
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll(".slide-in");
function checkSlide(e) {
  sliderImages.forEach((sliderImage) => {
    //window.scrollY + window.innerHeight로 뷰포트 맨아래 Y좌표를 구하고 이미지 높이의 반을 뺌으로써
    //이미지가 화면에서 절반만 보였을 때의 위치를 지정한다.(효과 시작점)
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;
    //이미지 아래모서리의 Y좌표
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    //이미지가 반쯤 보였을때 참
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    //이미지가 스크롤되고 있으면 참
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add("active");
    } else {
      sliderImage.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
