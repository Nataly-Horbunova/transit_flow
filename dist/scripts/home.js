
const cards=document.querySelectorAll('.work-section-list-item');const loadMoreBtn=document.querySelector('.load-more-btn');let cardsToShow=4;let cardsShown=0;function showCards(){for(let i=0;i<cards.length;i++){if(i<cardsToShow){cards[i].classList.add('show');cards[i].dataset.aos='fade-down';AOS.init();cardsShown+=4;}}}
function hideBtn(){if(cardsShown===cards.length){loadMoreBtn.style.display='none';}}
showCards();hideBtn();loadMoreBtn.addEventListener('click',function(){cardsToShow+=4;showCards();hideBtn();});