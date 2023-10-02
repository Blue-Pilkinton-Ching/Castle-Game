class scene extends Phaser.Scene {
  constructor() {
    super({ key: 'scene' })
  }

  preload() {
    this.load.image('test', 'Assets/Graphics/opp-assets/db32.png')

    this.load.image(
      'tiles1',
      'Assets/Graphics/opp-assets/environment/tiles/castle/tile_castle_grey.png'
    )
    this.load.image(
      'tiles2',
      'Assets/Graphics/opp-assets/environment/tiles/castle/tile_castle.png'
    )
    this.load.tilemapTiledJSON('map', 'Assets/castle-map.json')
  }

  create() {
    this.image = this.add.image(400, 300, 'test')

    this.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )

    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 })
    const tileset1 = map.addTilesetImage('Castle', 'tiles1')
    const tileset2 = map.addTilesetImage('Castle2', 'tiles2')

    const layer = map.createLayer('Tile Layer 1', [tileset1, tileset2], 0, 0)
  }

  update() {
    if (this.space.isDown) {
      this.image.x--
    }
  }
}
