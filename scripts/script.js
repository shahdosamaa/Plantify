const cards = [
  { img: 'imgs/image 8.png', title: 'Peperomia Ginny', price: '$25' },
  { img: 'imgs/image 9.png', title: 'Bird\'s Nest Fern', price: '$45' },
  { img: 'imgs/image 10.png', title: 'Large Majesty Palm', price: '$52' },
  { img: 'imgs/image 11.png', title: 'Pet Friendly Plant', price: '$30' },
  { img: 'imgs/images (1).jpg', title: 'Snake Plant', price: '$40' },
  { img: 'imgs/robust-zz-plant-indoor.webp', title: 'ZZ Plant', price: '$35' },
  { img: 'imgs/A_happy_Aloe_Vera_houseplant_in_a_vibrant_curved_pot..webp', title: 'Aloe Vera', price: '$20' },
  { img: 'imgs/the-sill_Medium-Monstera-Deliciosa_Medium_Isabella_Stone_Variant_b68d0a34-b068-4105-a15c-7d1b22ba6b29.webp', title: 'Monstera', price: '$55' }
];

function getCardsPerSlide() {
  if (window.innerWidth >= 992) return 4;
  if (window.innerWidth >= 768) return 3;
  if (window.innerWidth >= 576) return 2;
  return 1;
}

function buildCarousel() {
  const carouselInner = document.querySelector('#multiCardCarousel .carousel-inner');
  carouselInner.innerHTML = '';

  const perSlide = getCardsPerSlide();
  for (let i = 0; i < cards.length; i += perSlide) {
    const slide = document.createElement('div');
    slide.className = `carousel-item ${i === 0 ? 'active' : ''}`;

    const row = document.createElement('div');
    row.className = 'd-flex justify-content-center';

    cards.slice(i, i + perSlide).forEach(card => {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card m-2';
      cardDiv.style.width = '250px';
      cardDiv.innerHTML = `
        <img src="${card.img}" class="card-img-top" style="height:200px; object-fit:cover;">
        <div class="card-body text-center">
          <h5 class="card-title">${card.title}</h5>
          <p class="card-text">${card.price}</p>
          <a href="#" class="btn btn-primary">Buy</a>
        </div>
      `;
      row.appendChild(cardDiv);
    });

    slide.appendChild(row);
    carouselInner.appendChild(slide);
  }
  updateControls();
}

const carousel = document.querySelector('#multiCardCarousel');
const prevBtn = carousel.querySelector('.carousel-control-prev');
const nextBtn = carousel.querySelector('.carousel-control-next');

function updateControls() {
  const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).findIndex(item => item.classList.contains('active'));
  const totalItems = carousel.querySelectorAll('.carousel-item').length;
  prevBtn.style.display = activeIndex === 0 ? 'none' : 'block';
  nextBtn.style.display = activeIndex === totalItems - 1 ? 'none' : 'block';
}

carousel.addEventListener('slid.bs.carousel', updateControls);

window.addEventListener('resize', buildCarousel);
buildCarousel();