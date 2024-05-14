class Sounds {
    moveSound = new Audio('../assets/audio/move.mp3');
    jumpSound = new Audio('../assets/audio/jump.mp3');
    hurtSound = new Audio('../assets/audio/hurt.mp3');
    deadSound = new Audio('../assets/audio/dead.mp3');
    longIdleSound = new Audio('../assets/audio/long_Idle.mp3');
    bottleThrowSound = new Audio('../assets/audio/bottle_throw.mp3');
    bottleSplashSound = new Audio('../assets/audio/bottle_splash.mp3');
    collectCoinSound = new Audio('../assets/audio/collect_coin.mp3');
    collectBottleSound = new Audio('../assets/audio/collect_bottle.mp3');
    chickenSound = new Audio('../assets/audio/chicken.mp3');
    bigChickenSound = new Audio('../assets/audio/big_chicken.mp3');
    winSound = new Audio('../assets/audio/win.mp3');


    playSound(sound) {
        if (!soundMuted) {
            sound.pause();
            sound.currentTime = 0;
            sound.play();
        }
    }
}