const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  pixelArt: true,
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        y: 0.2,
      },
      debug: false,
    },
  },
  backgroundColor: 'rgb(0, 0, 0)',
  scene: Scene,
}

var game = new Phaser.Game(config)
