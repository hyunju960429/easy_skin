document.addEventListener('DOMContentLoaded', function () {
  // 1) 모달 관련 DOM 요소 가져오기
  const modalOverlay = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.getElementById('modalCloseBtn');

  // 2) 캐러셀 내부 모든 이미지 선택
  const carouselImgs = document.querySelectorAll('#carouselSlides img');

  // 3) 각 이미지에 클릭 이벤트 부착
  carouselImgs.forEach(img => {
    // 클릭 가능한 커서 이미 CSS에 지정했으므로 JS에선 생략 가능하지만, 확인 차원에서:
    img.style.cursor = 'pointer';

    img.addEventListener('click', function (e) {
      // 클릭된 이미지의 src를 모달 내부 <img>에 복사
      modalImg.src = e.currentTarget.src;

      // 모달 열기: .show 붙여서 display:flex
      modalOverlay.classList.add('show');
    });
  });

  // 4) 닫기 버튼 클릭 시 모달 닫기
  closeBtn.addEventListener('click', function () {
    modalOverlay.classList.remove('show');
    modalImg.src = ''; // src 비우면 닫을 때 깜빡임 방지
  });

  // 5) 모달 바깥(overlay) 클릭 시에도 닫기
  modalOverlay.addEventListener('click', function (e) {
    // overlay(배경) 부분만 클릭 시 닫기, 모달 내부(content) 클릭 땐 무시
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('show');
      modalImg.src = '';
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const modalOverlay = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.getElementById('modalCloseBtn');
  const prevBtn = document.getElementById('modalPrevBtn');
  const nextBtn = document.getElementById('modalNextBtn');
  const carouselImgs = document.querySelectorAll('#carouselSlides img');

  let currentModalIndex = 0;

  function openModal(index) {
    currentModalIndex = index;
    modalImg.src = carouselImgs[index].src;
    modalOverlay.classList.add('show');
  }

  function showPrevImage() {
    currentModalIndex = (currentModalIndex - 1 + carouselImgs.length) % carouselImgs.length;
    modalImg.src = carouselImgs[currentModalIndex].src;
  }

  function showNextImage() {
    currentModalIndex = (currentModalIndex + 1) % carouselImgs.length;
    modalImg.src = carouselImgs[currentModalIndex].src;
  }

  // 이미지 클릭 시 모달 열기
  carouselImgs.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openModal(index));
  });

  // 닫기
  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('show');
    modalImg.src = '';
  });

  // 배경 클릭 시 닫기
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('show');
      modalImg.src = '';
    }
  });

  // 이전/다음 버튼
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 모달 닫힘 방지
    showPrevImage();
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
  });
});
