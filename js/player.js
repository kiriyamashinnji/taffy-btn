class Player {
  constructor() {
    this.loop = false;
    this.random = false;
    this.overlap = false;
    this.playList = [];
    this.soundList = [];
  }

  play(url) {
    if (!self.overlap) {
      this.pause();
      this.playList = [];
    }
    let audio = new Audio(url);
    audio.player = this;
    audio.onended = audioEnd;
    this.playList.push(audio);
    audio.loop = self.loop;
    audio.play();
  }

  pause() {
    this.playList.forEach((audio) => {
      audio.pause();
    });
  }

  continue() {
    this.playList.forEach((audio) => {
      audio.play();
    });
  }

  setMode(mode, overlap) {
    if (mode == "loop") {
      this.playList.forEach((sound) => {
        sound.loop = true;
      });
    } else if (mode == "no-loop") {
      this.playList.forEach((sound) => {
        sound.loop = false;
      });
    }

    this.overlap = overlap;
    this.random = mode == "random";
  }

  remove(audio) {
    let newPlayList = [];
    this.playList.forEach((sound) => {
      if (sound == audio) sound.pause();
      else newPlayList.push(sound);
    });
    this.playList = newPlayList;
  }

  playRandom() {
    let idx = randint(0, this.soundList.length - 1);
    this.play(this.soundList[idx]);
  }
}

function audioEnd() {
  if (this.player.playList.length == 1 && this.player.random)
    this.player.playRandom();
  if (this.ended) this.player.remove(this);
}

function randint(l, h) {
  return Math.floor(Math.random() * (h - l + 1)) + l;
}
