class Player {
  constructor() {
    this.loop = false;
    this.random = false;
    this.overlap = false;
    this.playList = [];
    this.soundList = [];
  }

  play(url) {
    if (!this.overlap) {
      this.pause();
      this.playList.forEach((audio) => {
        $("#" + audio.url.match(/.*\/(.*)\.mp3$/)[1]).removeClass(
          "tf-btn-4-active"
        );
      });
      this.playList = [];
    }
    let audio = new Audio(url);
    audio.player = this;
    audio.onended = audioEnd;
    this.playList.push(audio);
    audio.loop = this.loop;
    audio.play();

    audio.url = url;
    $("#" + url.match(/.*\/(.*)\.mp3$/)[1]).addClass("tf-btn-4-active");
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
      this.loop = true;
      this.playList.forEach((sound) => {
        sound.loop = true;
      });
    } else {
      this.loop = false;
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
      if (sound == audio) {
        $("#" + sound.url.match(/.*\/(.*)\.mp3$/)[1]).removeClass(
          "tf-btn-4-active"
        );
        sound.pause();
      } else newPlayList.push(sound);
    });
    this.playList = newPlayList;
  }

  playRandom() {
    let idx = randint(0, this.soundList.length - 1);
    this.play(this.soundList[idx]);
  }
}

function audioEnd() {
  $("#" + this.url.match(/.*\/(.*)\.mp3$/)[1]).removeClass("tf-btn-4-active");
  if (this.player.playList.length == 1 && this.player.random)
    this.player.playRandom();
  if (this.ended) this.player.remove(this);
}

function randint(l, h) {
  return Math.floor(Math.random() * (h - l + 1)) + l;
}
