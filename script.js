const player1 = "jhope";
const player2 = "jin";
current_player = player1;

//switch player's turn.
change_player = () => {
    if (current_player == player1){
        current_player = player2; 
    }
    else {
        current_player = player1;
    }
};

let play_board=["", "", "", "", "", 
                "", "", "", "", "", 
                "", "", "", "", "",
                "", "", "", "", "", 
                "", "", "", "", ""];

//Check if all the box is filled. Return true if the board is full.
let board_full = false;
is_board_full = () => {
    let temp = true;
    play_board.forEach(space => {
        if (space != player1 && space != player2 ){
            temp = false;
            }
        });
    board_full = temp;
};

/**************Check winner****************/ 
/*  Rule to find winner: 
    (1) We will check if there is any three boxes in a 
        row/column/diagonal has the same element (jin or jhope). 
    (2) We need to make sure the "same element" is 
        either jin or jhope, not space ""
    (3) Return true if (1) is true. There will be no winner
        if (1) is false
*/
const check_same = (c1, c2, c3, c4) =>{
    return (
        play_board[c1] != "" && 
        play_board[c1] == play_board[c2] && 
        play_board[c2] == play_board[c3] &&
        play_board[c3] == play_board [c4]
    );
};
//check if the column is filled with the same element
check_column = () => {
    for (let j = 0; j < 9; j++ ){
        if (check_same(j, j+5, j+10, j+15)) {
            return play_board[j];
        }
    }
    return "";
};
//check if the row is filled with the same element
check_row = () => {
    for (let i = 0; i < 25; i+=5 ){
        if ( check_same(i, i+1, i+2, i+3)) {
            return play_board[i];
        }
    }
    for (let i = 1; i < 25; i+=5 ){
        if ( check_same(i, i+1, i+2, i+3)) {
            return play_board[i];
        }
    }
    return "";
};
//check if diagonal is filled with the same element
check_diagonal = () => {
    for(let i = 0; i < 25; i+=6){
        if( check_same (i, i+6, i+12, i+18)) {
            return play_board[i];
        }
    }
    for(let i = 4; i < 25; i+=4){
        if( check_same (i, i+4, i+8, i+12)) {
            return play_board[i];
        }
    }
    if (check_same(5,11,17,23)) {
        return play_board[5]; 
    } 
    if (check_same(1,7,13,19)) {
        return play_board[1];
    } 
    if (check_same(3,7,11,15)) {
        return play_board[3];
    } 
    if (check_same(9,13,17,21)) {
        return play_board[9];
    } 
    return "";
};

/*  - Finally, we combine all three cases (row, column and diagonal) 
    - If it return a specific value -> true. The game has winner
    - If it return "", the game does not (yet) have winner
*/
const isWinner = () => {
    if (check_column() != "" || check_row() != "" || check_diagonal() != "") {
        return true;
    }
    return false;
};

//Announce winner if there is any, otherwise notify the next player get the next move.
const winner_statement = document.getElementById("winner");
winner.innerText ="";
const announce_winner = () => {
   
    if (isWinner() == true && current_player != player1){
        winner.innerText = player1 + " wins";
        board_full = true;
        winner.classList.add("player1");
    } 
    else if (isWinner() == true && current_player != player2){
        winner.innerText = player2 + " wins";
        board_full = true;
        winner.classList.add("player2");
    }
    else if (board_full == true && !isWinner()){
        winner.innerText = "Tie!";
        winner.classList.add("tie");
    }
};

const next_player = () => {
    if (board_full == false) {
        winner.innerText = current_player + " goes next";}
}

/* Add element to the board */
const block_fill = document.querySelector(".play-area");

const print_board = () => {
    for (var y = 0; y < play_board.length; y++ ){
      element = document.getElementById('block_' + y );
      element.parentNode.removeChild(element);
    } 

    play_board.forEach((e, i) => {
      block_fill.innerHTML += `<img src = "assets/${play_board[i]}c.png" id="block_${i}" class="block" onclick="current_move(${i})"></div>`
      if (e == player1 || e == player2) {
        document.querySelector(`#block_${i}`).classList.add("occupied");
      }
    });
  };

const game_loop = () => {
    print_board();
    is_board_full();
    change_player();
    announce_winner();
    next_player();
    //change_player();
  }

const current_move = x => {
    if (board_full == false && play_board[x] == ""){
        play_board[x] = current_player;
        game_loop();
    }
}

print_board();

/** Reset the game **/
const play_again = () => {
    play_board=["", "", "", "", "", 
                "", "", "", "", "", 
                "", "", "", "", "",
                "", "", "", "", "", 
                "", "", "", "", ""]; //clear out the play board 
    winner.classList.remove("player1");
    winner.classList.remove("player2");
    winner.classList.remove("tie");
    winner.innerHTML = "";
    game_loop();
}

