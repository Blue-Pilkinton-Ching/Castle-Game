class scene extends Phaser.Scene {
  constructor() {
    super({ key: 'scene' })
  }

  preload() {
    this.load.spritesheet(
      'adventurer',
      'Assets/Graphics/Adventurer/adventurer.png',
      {
        frameWidth: 50,
        frameHeight: 37,
      }
    )

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
    const worldBounds = {
      x: 5000,
      y: 10000,
    }

    this.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )

    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.right = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    )
    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)

    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 })
    const tileset1 = map.addTilesetImage('Castle2', 'tiles1')
    const tileset2 = map.addTilesetImage('Castle', 'tiles2')

    const layer2 = map.createLayer('Tile Layer 2', tileset2, 0, 0)
    const layer = map.createLayer('Tile Layer 1', tileset1, 0, 0)

    this.player = this.matter.add
      .sprite(30, 0, 'adventurer', 3, {
        render: { sprite: { xOffset: 0, yOffset: 0 } },
      })

      .setFixedRotation()

    const tilesPerSet = 224

    map.setCollisionBetween(tilesPerSet + 16, tilesPerSet + 19)
    this.matter.world.convertTilemapLayer(layer2)
    this.matter.world.convertTilemapLayer(layer)

    this.cameras.main.setZoom(4)

    this.bodies = this.matter.world.getAllBodies()

    this.groundCheckOffset = 20
  }

  update() {
    if (this.space.isDown || this.up.isDown) {
      for (const key in this.bodies) {
        if (
          this.matter.containsPoint(
            this.bodies[key],
            this.player.x,
            this.player.y + this.groundCheckOffset
          )
        ) {
          Jump(this)
          break
        }
      }
    }
    if (this.left.isDown) {
      this.player.x--
    }
    if (this.right.isDown) {
      this.player.x++
    }

    //this.player

    this.cameras.main.centerOn(this.player.x, this.player.y)

    function Jump(context) {
      context.player.setVelocityY(0)
      context.player.applyForce({ x: 0, y: -0.03 })
    }
  }
}
