'use strict';

// Utility Functions
import { select, selectAll, onEvent, print, create } from "./util.js";



// HTML Elements

const squares = selectAll('.square');
const btn = select('.restart');
const stats = select('.end');
const whoWon = select('.winner');
const time = select('.time');
const start = select('.over-start');
const closeStart = select('.continue');
let count = 1;
let seconds = -1;
let keepCurrent;

function getSeconds() {
  seconds++;
  squares.forEach(square => {
    square.style.height = `${square.offsetWidth}px`
    onEvent('resize', window, () => {
      square.style.height = `${square.offsetWidth}px`
    })
  })
  keepCurrent = setTimeout(() => {getSeconds()}, 1_000);
}

function gameOver(win) {
  whoWon.innerText = win;
  stats.style.visibility = 'visible';
  stats.style.opacity = '1'
  btn.innerText = 'Restart'
  time.innerText = seconds;
  clearTimeout(keepCurrent);
  seconds = 0;
}

function checkWin() {
  let one = squares[0].innerText;
  let two = squares[1].innerText;
  let three = squares[2].innerText;
  let four = squares[3].innerText;
  let five = squares[4].innerText;
  let six = squares[5].innerText;
  let seven = squares[6].innerText;
  let eight = squares[7].innerText;
  let nine = squares[8].innerText;

  if ((one === two && one === three && one !== '') || 
      (four === five && four === six && four !== '') || 
      (seven === eight && seven === nine && seven !== '') ||
      (one === four && one === seven && one !== '') ||
      (two === five && two === eight && two !== '') ||
      (three === six && three === nine && three !== '') ||
      (one === five && one === nine && one !== '') ||
      (three === five && three === seven && three !== '') ||
      count === 10) {
    let player = () => {
      if (count !== 10) {
        return count % 2 ? 'Player 2' : 'Player 1';
      } else {
        return 'Draw'
      }
    };
    gameOver(player());
  }
}

function click(square) {
  onEvent('click', square, () => {
    if (count % 2 === 0 && !square.innerText) {
      square.innerText = 'O';
      count++;
    } else if (!square.innerText) {
      square.innerText = 'X';
      count++;
    }
    checkWin()
  })
}

squares.forEach(square => {
  square.style.height = `${square.offsetWidth}px`
  onEvent('resize', window, () => {
    square.style.height = `${square.offsetWidth}px`
  })
  click(square);
});

onEvent('click', btn, () => {
  if (btn.innerText === 'End') {
    squares.forEach(square => {
      square.innerText = '';
    })
    seconds = 0;
    let player = () => {
      if (count !== 9 && count > 4) {
        return count % 2 ? 'Player 2' : 'Player 1';
      } else {
        return 'Draw'
      }
    };
    gameOver(player())
    btn.innerText = 'Restart'
  } else {
    stats.style.opacity = '0';
    setTimeout(() => {
      stats.style.visibility = 'hidden';
    }, 250)
    btn.innerText = 'End';
    squares.forEach(square => {
      square.innerText = ''
    })
    count = 1;
    getSeconds();
  }
})

onEvent('click', closeStart, () => {
  start.style.opacity = '0';
  setTimeout(() => {start.style.visibility = 'hidden'}, 250);
  seconds = 0;
  getSeconds();
})