import "./style.css";
import Phaser from "phaser";

import "phaser";

class NembakWageGame extends Phaser.Scene {
  private score: number = 0;
  private miss: number = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private meowSound!:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
  private meowrghSound!:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
  private ahSound!:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
  private aakhSound!:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;

  constructor() {
    super({ key: "NembakWageGame" });
  }

  preload() {
    this.load.image("wage", "assets/wage.webp");

    this.load.audio("meowSound", "assets/meow.mp3");
    this.load.audio("meowrghSound", "assets/meowrgh.mp3");
    this.load.audio("aakhSound", "assets/aakh.mp3");
    this.load.audio("ahSound", "assets/ah.wav");
    this.load.audio("uuhhSound", "assets/uuhh.mp3");
  }

  create() {
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      color: "#fff",
    });


    this.aakhSound = this.sound.add("aakhSound");
    this.ahSound = this.sound.add("ahSound");
    this.meowSound = this.sound.add("meowSound");
    this.meowrghSound = this.sound.add("meowrghSound");

    this.createWage();

    this.input.on(
      "pointerdown",
      (_pointer: any, gameObjects: Phaser.GameObjects.Sprite[]) => {
        console.log({ gameObjects })
        this.shoot(_pointer, gameObjects);
      },
    );
  }

  shoot(_pointer: any, gameObjects: Phaser.GameObjects.Sprite[]) {
    let found = false;
    for (const gameObject of gameObjects) {
      if (
        gameObject.texture.key === "wage"
      ) {
        found = true;
        this.playDestroySound();
        gameObject.destroy();
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);
        setTimeout(() => {
          this.createWage();
        }, 1000)
      }
    }

    if (!found) {
      this.miss++;
      if (this.miss % 5 === 0) {
        this.aakhSound.setVolume(0.5);
        this.aakhSound.play();
      } else {

        this.ahSound.play();
      }
    }
  }

  update() { }

  playDestroySound() {
    const random = Math.round(Math.random() * 1);
    console.log({ random })
    switch (random) {
      case 0:
        this.meowrghSound.play();
        break;
      case 1:
        this.meowrghSound.play();
        break
    }
  }

  createWage() {
    const x = Phaser.Math.Between(80, 1130);
    const y = Phaser.Math.Between(100, 750); // Set the initial y position off-screen
    this.meowSound.play();

    this.add.image(x, y, "wage").setScale(0.3).setInteractive();
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 800,
  scene: NembakWageGame,
  backgroundColor: "#caa07c",
  disableContextMenu: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

new Phaser.Game(config);

const canvas = document.querySelector('canvas')
if (canvas) {
  canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); }

}
