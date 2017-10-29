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

const scorePanel = `
    <span class="starsLabel">Rating: </span>
    <i class="fa fa-star oneStar"></i>
    <i class="fa fa-star twoStars"></i>
    <i class="fa fa-star threeStars"></i>
    <span class="movesLabel">Moves: <span class="moves">0</span></span>
    <span class="timerLabel">Time: <span id="minutes">00</span>:<span id="seconds">00</span></span>
`;

let cardsList = [
            '<li class="card"><i class="fa fa-diamond"></i></li>',
            '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
            '<li class="card"><i class="fa fa-anchor"></i></li>',
            '<li class="card"><i class="fa fa-bolt"></i></li>',
            '<li class="card"><i class="fa fa-cube"></i></li>',
            '<li class="card"><i class="fa fa-anchor"></i></li>',
            '<li class="card"><i class="fa fa-leaf"></i></li>',
            '<li class="card"><i class="fa fa-bicycle"></i></li>',
            '<li class="card"><i class="fa fa-diamond"></i></li>',
            '<li class="card"><i class="fa fa-bomb"></i></li>',
            '<li class="card"><i class="fa fa-leaf"></i></li>',
            '<li class="card"><i class="fa fa-bomb"></i></li>',
            '<li class="card"><i class="fa fa-bolt"></i></li>',
            '<li class="card"><i class="fa fa-bicycle"></i></li>',
            '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
            '<li class="card"><i class="fa fa-cube"></i></li>'
];

$('.deck').html(shuffle(cardsList));
console.log(cardsList);

$('.restart, #playAgain').click(function() {
    $('.starsMovesTimer').html(scorePanel);
    clearInterval(timerInterval);
    sec = 0;
    moves = 0;
    movesGlobal = 0;
    matchedList = [];
    $('.deck').html(shuffle(cardsList));
    console.log(cardsList);
});

let openList = [];
let matchedList = [];
let moves = 0;
let movesGlobal = 0;

// Count up timer from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
let sec = 0;
let timerInterval;
const pad = function(val) {
    return val > 9 ? val : "0" + val;
};

//Timer object from https://jsfiddle.net/jfriend00/t17vz506/
//let timerFxn = function(fn, t) {
//    var timerObj = setInterval(fn, t);
//
//    this.stop = function() {
//        if (timerObj) {
//            clearInterval(timerObj);
//            timerObj = null;
//        }
//        return this;
//    }
//
//    // start timer using current settings (if it's not already running)
//    this.start = function() {
//        if (!timerObj) {
//            this.stop();
//            timerObj = setInterval(fn, t);
//        }
//        return this;
//    }
//
//    // start with new interval, stop current interval
//    this.reset = function(newT) {
//        t = newT;
//        return this.stop().start();
//    }
//}

let timer = function() {
    $("#seconds").html(pad(++sec%60));
    $("#minutes").html(pad(parseInt(sec/60,10)));
};

//const bindButton = function() {
//    $('.deck').unbind('click').one('click', function() {
//        let newTimer = new timerFxn(timer, 1000);
//        newTimer.start();
//        $('.restart').click(function() {
//            newTimer.stop();
//            sec = 0;
//            $('.deck').on('click', function() {
//                bindButton();
//            });
//        });
//    });
//};

//bindButton();

//$('.restart').on('click', function() {
//
//    bindButton();
//});



//$('.deck').one('click', 'li', function timerRestart() {
//    let newTimer = new timerFxn(timer, 1000);
//    newTimer.start();
//    $('.restart').click(function() {
//        newTimer.stop();
//        sec = 0;
//        $('.deck').one('click', 'li', timerRestart;
//    });
//});
//    $('.restart').click(function() {
//        clearInterval(timerFxn);
//    });
//});

//});

//let timerRepeat = $('.deck').one('click', function() {
//    let timerFxn = setInterval(timer, 1000);
//});
//    $('.restart').click(function() {
//        clearInterval(timerFxn);
//        sec = 0;
//    });
//});
//    let timer = setInterval(function() {
//        $("#seconds").html(pad(++sec%60));
//        $("#minutes").html(pad(parseInt(sec/60,10)));
//        if (matchedList.length === 16) { //test this
//            clearInterval(timer);
//        }
//    }, 1000);
//    $('.restart').click(function() {
//        clearInterval(timer);
//        $('.deck').on('click', timerFxn);
//    });
//});

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
        matchedList.push(this);
    }
};

const incMoves = function() {
    moves += 1;
    $('.moves').text(moves);
};

//const opened = function() {
//    openList.push($(this).children()[0]);
//}

$('.deck').on('click', 'li', function cardMethod() {
    /* I made the if statement below (to start the timer) instead of adding
     * a click event listener. This is to simplify things and
     * avoid interference with the main click event listener above.
     */
    movesGlobal += 1;
    if (movesGlobal === 1) {
        timerInterval = setInterval(timer, 1000);
    }
    showCard.call(this);
    console.log(openList);
    if (openList.length === 2) {
        if (nameCard(0) === nameCard(1)) {
            matchCard.call(openList[0]);
            matchCard.call(openList[1]);
            openList.splice(0);
        } else {
            $('.deck').off('click');
            setTimeout(function() {
                hideCard.call(openList[0]);
                hideCard.call(openList[1]);
                openList.splice(0);
                $('.deck').on('click', 'li', cardMethod);
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
        if (matchedList.length === 16) {
            $('.modal-body').html($('.score-panel span').html());
            $('#winModal').modal();
        }
    }
});

$('#playAgain').click(function() {
    $('#winModal').modal('hide');
});

//do not toggle if not match already!!!!!~~~~


//    openList.push($(this).children('i')[0]);
//    console.log(openList);
//    if (openList[0] === openList[1]) {
//        $('.deck').children('li').toggleClass('match');


//dont increase moves if still on nonmatch

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
