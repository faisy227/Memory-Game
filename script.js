const moves = document.querySelector('#moves-count');
const timeValue = document.querySelector('#time');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const gameContainer = document.querySelector('.game-container');
const result = document.querySelector('#results');
const controls = document.querySelector('.controls-container');

let cards;
let interval;
let firstcard = false
let secondCard = false;

// items array of objects

const items = [
    {
        name: 'bee',
        image: 'images/bee.png'
    },
    {
        name: 'crocodile',
        image: 'images/crocodile.png'
    },
    {
        name: 'macaw',
        image: 'images/macaw.png'
    },
    {
        name: 'gorilla',
        image: 'images/gorilla.png'
    },
    {
        name: 'tiger',
        image: 'images/tiger.png'
    },
    {
        name: 'monkey',
        image: 'images/monkey.png'
    },
    {
        name: 'chameleon',
        image: 'images/chameleon.png'
    },
    {
        name: 'piranha',
        image: 'images/piranha.png'
    },
    {
        name: 'anaconda',
        image: 'images/anaconda.png'
    },
    {
        name: 'sloth',
        image: 'images/sloth.png'
    },
    {
        name: 'cockatoo',
        image: 'images/cockatoo.png'
    },
    {
        name: 'toucan',
        image: 'images/toucan.png'
    },
];

// initial time
let seconds = 0;
 minutes = 0;

// initial moves and count
let movesCount = 0;
 winCount = 0;

//  timer
let timeHeading = document.createElement('span');
const timeGenerator = () =>{
    seconds += 1;
    if(seconds >= 60){
        minutes += 1;
        seconds = 0;
    }
    // change format of of time
    let secondValue = seconds < 10 ? `0${seconds}` : seconds;
    let minuteValue = minutes < 10 ? `0${minutes}` : minutes;
    timeHeading.textContent = `Time: ${minuteValue} : ${secondValue}`;
    timeValue.append(timeHeading);
    
};
let moveHeading = document.createElement('span');

const movesCounter = () => {
    moveHeading.textContent = `Moves: ${movesCount}`;
    movesCount += 1;
    moves.append(moveHeading);
}

const generateRandom = (size = 4) =>{
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;
    
    for(let i = 0; i < size; i++ ){
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }

    return cardValues;
}

const matrixGenerator = (cardValues, size = 4) =>{
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    // simple shuffle
    cardValues.sort(() => Math.random  - 0.5);
    for(let i = 0; i< size * size; i++){
        /**
         * Create Cards
         * before => front side (contains question mark);
         * after => back side (contains actual image);
         * data-card-value is a custome attribute which
         * stores the bames of the cards to match the latter
         */

        let cardContainer = document.createElement('section');
        cardContainer.setAttribute('data-card-value', cardValues[i].name);
        cardContainer.classList.add('card-container');

        
        let cardBefore = document.createElement('section');
        cardBefore.classList.add('card-before');
        cardBefore.textContent = '?';
        cardContainer.appendChild(cardBefore);

        let cardAfter = document.createElement('section');
        cardAfter.classList.add('card-after');

        let image = document.createElement('img');
        image.src = cardValues[i].image;
        image.classList.add('image');
        cardAfter.appendChild(image);

        cardContainer.appendChild(cardAfter);

        gameContainer.append(cardContainer);
    }
    gameContainer.style.gridTemplateColumns =  `repeat(${size}, auto)`;
    cards = document.querySelectorAll('.card-container');
    console.log(cards);

    cards.forEach(card => {
        card.addEventListener('click',()=>{
            // if card is not matched yet then
          
            if(!card.classList.contains('matched')){
                // flip the card thats clicked
                card.classList.add('flipped');

                if(!firstcard) {
                    firstcard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                }
                else{
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if(firstCardValue == secondCardValue){
                        // if cards match added match to these cards
                        firstcard.classList.add('matched');
                        secondCard.classList.add('matched');

                        firstcard = false;

                        winCount += 1;
                        console.log(winCount);

                        if (winCount == Math.floor(cardValues.length / 2)) {
                            let h2 = document.createElement('h2');
                            let h4 = document.createElement('h4');

                            h2.textContent = 'You Won';
                            h4.textContent = `${movesCount}`;

                            result.appendChild(h2);
                            result.appendChild(h4);
                            stopGame();

                        }
                    }
                    else{
                        let [tempFirst, tempSecond] = [firstcard, secondCard];
                        firstcard = false;
                        secondCard = false;

                        let delay = setTimeout(()=>{
                            tempFirst.classList.remove('flipped');
                            tempSecond.classList.remove('flipped');
                        }, 900);
                    }
                }
                 
            }
        });
    });
};



// startGame
startButton.addEventListener('click', ()=>{
    movesCount = 0;
    time = 0;

    // controls
   controls.classList.add('hide');
    stopButton.classList.remove('hide');
    startButton.classList.add('hide');

    // start time
    interval = setInterval(timeGenerator, 1000);
    // initial moves

    // let moveSpan = document.createElement('span');
    // moveSpan.textContent = `Moves: ${movesCount}`;
    // moves.appendChild(moveSpan);
    movesCounter();

    initializer();
})

stopButton.addEventListener( "click", (stopGame = () => {
      controls.classList.remove("hide");
      stopButton.classList.add("hide");
      startButton.classList.remove("hide");
      clearInterval(interval);
    })
  );

  // Initialize values and func calls
const initializer = () =>{
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues); 
}

initializer();