const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  pixelArt: true,
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        y: 0,
      },
      debug: true,
    },
  },
  backgroundColor: 'rgb(38, 96, 158)',
  scene: scene,
}

var game = new Phaser.Game(config)
