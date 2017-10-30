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

// Count up timer from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
let sec = 0;
let timerInterval;
const pad = function(val) {
    return val > 9 ? val : "0" + val;
};

let timer = function() {
    $("#seconds").html(pad(++sec%60));
    $("#minutes").html(pad(parseInt(sec/60,10)));
};

// Score panel template when restarting game
const scorePanel = `
    <span class="starsLabel">Rating: </span>
    <i class="fa fa-star oneStar"></i>
    <i class="fa fa-star twoStars"></i>
    <i class="fa fa-star threeStars"></i>
    <span class="movesLabel">Moves: <span class="moves">0</span></span>
    <span class="timerLabel">Time: <span id="minutes">00</span><span class="separator">:</span><span id="seconds">00</span></span>
`;

let openList = [];
let matchedList = [];
let moves = 0;
let movesGlobal = 0;
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

// Shuffle cards at game start
$('.deck').html(shuffle(cardsList));

/*
 * Clicking the restart and Play Again (in modal) buttons resets the:
 *   - score panel
 *   - timer and time
 *   - move counters
 *   - matched list
 *   - card order
 */

$('.restart, #playAgain').click(function() {
    $('.starsMovesTimer').html(scorePanel);
    clearInterval(timerInterval);
    sec = 0;
    moves = 0;
    movesGlobal = 0;
    matchedList = [];
    $('.deck').html(shuffle(cardsList));
});

$('#playAgain').click(function() {
    $('#winModal').modal('hide');
});

const showCard = function() {
    /*
     * If statements prevent toggling class "open show" (showing card) if:
     *   - card already matched
     *   - card already shown
     *   - user tries to open a third card
     */
    if ($(this).hasClass('match') === false && $(this).hasClass('open show') === false && openList.length < 2) {
        $(this).toggleClass('open show');
        openList.push(this);
    }
};

const hideCard = function() {
    // User cannot hide matched cards
    if ($(this).hasClass('match') === false) {
        $(this).toggleClass('open show');
    }
};

// Gets card name for comparison
const nameCard = function(index) {
    return openList[index].getElementsByClassName('fa')[0].classList[1];
};

// Toggles "match" class and adds to matched list
const matchCard = function() {
    if ($(this).hasClass('match') === false) {
        $(this).toggleClass('match open show');
        matchedList.push(this);
    }
};

// Increments moves and updates score panel
const incMoves = function() {
    moves += 1;
    $('.moves').text(moves);
};

$('.deck').on('click', 'li', function cardMethod() {
    /*
     * I made the if statement below (to start the timer) instead of adding
     * a click event listener. This is to simplify things and
     * avoid interference with the main click event listener above.
     */
    movesGlobal += 1;
    if (movesGlobal === 1) {
        timerInterval = setInterval(timer, 1000);
    }
    showCard.call(this);
    if (openList.length === 2) {
        if (nameCard(0) === nameCard(1)) {
            matchCard.call(openList[0]);
            matchCard.call(openList[1]);
            openList.splice(0);
        } else {
            // Prevents clicking of third card while nonmatching cards are shown for 1 sec
            $('.deck').off('click');
            setTimeout(function() {
                hideCard.call(openList[0]);
                hideCard.call(openList[1]);
                openList.splice(0);
                $('.deck').on('click', 'li', cardMethod);
            }, 1000);
        }
        incMoves();
        // Decrements star rating on reaching 13, 17, and 21 moves
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
        /*
         * Upon matching all cards:
         *   - stop timer
         *   - show modal with user score panel
         */
        if (matchedList.length === 16) {
            clearInterval(timerInterval);
            $('.modal-body').html($('.score-panel span').html());
            $('#winModal').modal();
        }
    }
});
