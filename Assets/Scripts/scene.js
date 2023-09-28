class scene extends Phaser.Scene {
  constructor() {
    super({ key: 'scene' })
  }

  preload() {
    this.load.image('test', 'Assets/Graphics/opp-assets/db32.png')

    this.load.image(
      'tiles1',
      'Assets/Graphics/oop-assets/environment/tiles/castle/tile_castle_grey.png'
    )
    this.load.image(
      'tiles2',
      'Assets/Graphics/oop-assets/environment/tiles/castle/tile_castle.png'
    )
    this.load.tilemapTiledJSON('map', 'Assets/castle-map.json')
  }

  create() {
    this.image = this.add.image(400, 300, 'test')

    this.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )

    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 })
    const tileset1 = map.addTilesetImage('Castle1', 'tiles1')
    const tileset2 = map.addTilesetImage('Castle2', 'tiles2')

    const layer = map.createLayer(0, 'Tile Layer 1', 0, 0)
  }

  update() {
    if (space.isDown) {
      this.image.x--
    }
  }
}
