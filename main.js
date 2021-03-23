let arr = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]

function  shuffle(arr) { //"перетасовка" элементов массива согласно алгоритму Фишера-Йейтса
  let j, temp; 
  for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i+1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
  }
  return arr;
}
shuffle(arr);

const cards = document.querySelectorAll('.card');

let k=0;
for (let card of cards) {
  card.innerHTML=arr[k];
  k++;
}

let lockCard = false;
let isCardFlipped = false;
let firstCard, secondCard;


function flipCard() {
  if (lockCard) { //предотвратит любое переворачивание карты до того, как карты будут спрятаны или совпадают
    return;
  }
  if (this === firstCard) { //предотвратит клик на одну и ту же карту
    return;
  }
  this.classList.add('flip');

  if (!isCardFlipped) {
    isCardFlipped = true;
    firstCard = this;
    return;
    }
  else {
    secondCard = this;
    checkForMatch();
  }

}

function checkForMatch() {
    if (firstCard.textContent === secondCard.textContent) {
      setTimeout(() => {
      firstCard.classList.add('no-activ');
      secondCard.classList.add('no-activ');
      resetCards();
    }, 1000);
    }
    else {
      lockCard = true;
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCards();
      }, 1000);
    }
  }

  function resetCards() {
       [isCardFlipped, lockCard] = [false, false];
       [firstCard, secondCard] = [null, null];
       
       const noActivCards = document.querySelectorAll('.no-activ');
       const button = document.querySelector('.button');
       if (noActivCards.length === arr.length) {
        button.classList.remove('no-btn')
       }
       button.addEventListener ('click', () => {
        cards.forEach(card => card.classList.remove('no-activ', 'flip'));
        button.classList.add('no-btn');
        window.location.reload()
      })
     }

cards.forEach(card => card.addEventListener('click', flipCard));








