let coins = 0;
let hearts = 3;

const audioFile = new Audio('../assets/submachine-gun-79846.mp3');
const coinsEl = document.querySelector('.points')
const gameOverEl = document.querySelector('.game-over');
const gameWin = document.querySelector('.game-win');
const greatShootEl = document.querySelector('.great-shoot');
const badShootEl = document.querySelector('.bad-shoot');
const bunnyEl = document.querySelector(".bunny");
const refreshBtnLose = document.querySelector('.lose-btn');
const refreshBtnWin = document.querySelector('.win-btn');

let bunnyJumpInterval;
let bunnyMissedTimeout;

let gameOver = false;
let isWinning = false;
let isHit = false;

refreshBtnLose.addEventListener('click', () => location.reload())
refreshBtnWin.addEventListener('click', () => location.reload())

bunnyJumpInterval = setInterval(() => { bunnyJump(); }, 5000);

function bunnyJump() {
    const screenWidth = window.innerWidth;
    let bunnyPosition = Math.floor(Math.random() * ((screenWidth - 100) + 1));
    if(bunnyPosition < 100) { bunnyPosition = 100; }
    bunnyEl.style.left = bunnyPosition + 'px';
    greatShootEl.style.display = 'none';
    badShootEl.style.display = 'none';

    setTimeout(() => {
        bunnyEl.style.transition = "all 0.5s ease";
        bunnyEl.style.bottom = "100px";
        bunnyMissedTimeout = setTimeout(() => {
            bunnyEl.style.bottom = "-220px";
            if (!gameOver) {
                hearts--;
                document.getElementsByClassName('heart')[hearts].style.display = 'none';
                if (hearts > 0) {
                    badShootEl.style.display = 'block';
                }
                if (hearts === 0) {
                    gameOverEl.style.display = 'block';
                    gameOver = true;
                }

            }
            setTimeout(() => {
                bunnyEl.style.transition = "unset";
            }, 500);
        }, 2000);
    }, 50);
};

bunnyEl.addEventListener('click', () => {
    if (!gameOver && !isHit) {
        isHit = true;
        audioFile.play();
        coins++;
        if (coins < 10) {
            greatShootEl.style.display = 'block';
        }
        coinsEl.textContent = coins;
        clearInterval(bunnyJumpInterval);
        clearTimeout(bunnyMissedTimeout);
        if (coins === 10) {
            gameWin.style.display = 'block';
            isWinning = true;
            return;
        }
        setTimeout(() => {
            bunnyEl.style.bottom = "-220px";
            setTimeout(() => {
                bunnyEl.style.transition = "unset";
                isHit = false;
            }, 2000);
        }, 2000);
        bunnyJumpInterval = setInterval(() => { bunnyJump(); }, 5000);
    }
});

function hideBrowserBars() {
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 300);
  }
  
  function enterFullscreen() {
    let elem = document.documentElement;
  
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
  
  // Detect rotation & apply tricks
  window.addEventListener("orientationchange", () => {
    if (window.matchMedia("(orientation: landscape)").matches) {
      hideBrowserBars();
      enterFullscreen(); // This works only on Android/Desktop
    }
  });
  
  
