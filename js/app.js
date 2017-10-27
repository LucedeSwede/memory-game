/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



let openList = [];
let moves = 0;

const deck = $('.deck');

const showCard = function() {
    if ($(this).hasClass('match') === false && $(this).hasClass('open show') === false && openList.length < 2) {
        $(this).toggleClass('open show');
        openList.push(this);
    }
};

const hideCard = function() {
    if ($(this).hasClass('match') === false) {
        $(this).toggleClass('open show');
    }
};

const nameCard = function(index) {
    return openList[index].getElementsByClassName('fa')[0].classList[1];
};

const matchCard = function() {
    if ($(this).hasClass('match') === false) {
        $(this).toggleClass('match open show');
    }
};

const incMoves = function() {
    moves += 1;
    $('.moves').text(moves);
};

//const opened = function() {
//    openList.push($(this).children()[0]);
//}

deck.on('click', 'li', function () {
    showCard.call(this);
    console.log(openList);
    if (openList.length === 2) {
        if (nameCard(0) === nameCard(1)) {
            matchCard.call(openList[0]);
            matchCard.call(openList[1]);
            openList.splice(0);
        } else {
            setTimeout(function() {
                hideCard.call(openList[0]);
                hideCard.call(openList[1]);
                openList.splice(0);
            }, 1000);
        }
        incMoves();
        switch(moves) {
            case 13:
                $('.threeStars').toggleClass('fa-star fa-star-o');
                break;
            case 17:
                $('.twoStars').toggleClass('fa-star fa-star-o');
                break;
            case 21:
                $('.oneStar').toggleClass('fa-star fa-star-o');
        }
    }
});

//do not toggle if not match already!!!!!~~~~


//    openList.push($(this).children('i')[0]);
//    console.log(openList);
//    if (openList[0] === openList[1]) {
//        $('.deck').children('li').toggleClass('match');




//let classes = document.getElementsByClassName('fa')[0].classList[1];
//console.log(classes);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
