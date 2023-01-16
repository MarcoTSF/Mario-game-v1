const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');

audioStart = new Audio('./src/audios/theme-song.mp3');
audioGameOver = new Audio('./src/audios/game_over.mp3');
audioJump = new Audio('./src/audios/jump_song.mp3');

const startGame = () => {
  pipe.classList.add('pipe-animation');
  start.style.display = 'none';

  audioStart.currentTime = 0.1;
  audioStart.volume = 0.1;
  audioStart.play();
}

const restartGame = () => {
    window.location.reload(false);
};

const jump = () => {
  mario.classList.add('jump');

  audioJump.currentTime = 0.1;
  audioJump.volume = 0.1;
  audioJump.play();

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 800);
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const cloudsPosition = clouds.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ' ');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 137) {
      pipe.style.animation = 'none';
      pipe.style.left = `${pipePosition}px`;

      clouds.style.animation = 'none';
      clouds.style.left = `${cloudsPosition}px`;

      mario.style.animation = 'none';
      mario.style.bottom = `${marioPosition}px`;

      mario.src = './src/images/game-over.png';
      mario.style.width = '75px';
      mario.style.marginLeft = '50px';

      audioStart.pause();
      audioJump.pause();
      audioGameOver.volume = 0.1;
      audioGameOver.play();

      gameOver.style.display = 'flex';
    };
}, 10);

document.addEventListener('keypress', e => {
  const tecla = e.key;
  if (tecla === ' ') {
    jump();
  };
});

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump();
  };
});

document.addEventListener('keypress', e => {
  const tecla = e.key;
  if (tecla === 'Enter') {
    startGame();
  };
});