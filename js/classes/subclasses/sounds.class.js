class Sounds {
    backgroundSound = new Audio('./assets/audio/background.mp3');
    moveSound = new Audio('./assets/audio/move.mp3');
    jumpSound = new Audio('./assets/audio/jump.mp3');
    hurtSound = new Audio('./assets/audio/hurt.mp3');
    deadSound = new Audio('./assets/audio/dead.mp3');
    longIdleSound = new Audio('./assets/audio/long_Idle.mp3');
    bottleThrowSound = new Audio('./assets/audio/bottle_throw.mp3');
    bottleSplashSound = new Audio('./assets/audio/bottle_splash.mp3');
    collectCoinSound = new Audio('./assets/audio/collect_coin.mp3');
    collectBottleSound = new Audio('./assets/audio/collect_bottle.mp3');
    chickenSound = new Audio('./assets/audio/chicken.mp3');
    bigChickenSound = new Audio('./assets/audio/big_chicken.mp3');
    winSound = new Audio('./assets/audio/win.mp3');


    /**
    * Plays the given audio if it exists and sound is not muted.
    * @param {HTMLAudioElement} audio - The audio element to be played.
    * @returns {void}
    */
    playAudio(audio) {
        if (audio && !soundMuted) {
            audio.volume = 0.5;
            audio.play().catch(error => console.error('Audio play error:', error));
        }
    }
}