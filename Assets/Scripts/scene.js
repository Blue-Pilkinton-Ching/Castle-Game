class Scene extends Phaser.Scene {
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
      .sprite(30, 0, 'adventurer', 3)
      .setRectangle(15, 30, {
        render: { sprite: { xOffset: 0, yOffset: 0.08 } },
      })
      .setScale(2)
      .setFixedRotation()
      .setMass(90)

    const tilesPerSet = 224

    map.setCollisionBetween(tilesPerSet + 16, tilesPerSet + 19)
    this.matter.world.convertTilemapLayer(layer2)
    this.matter.world.convertTilemapLayer(layer)

    this.cameras.main.setZoom(1.5)

    this.bodies = this.matter.world.getAllBodies()

    this.groundCheckOffset = 32
    this.acceleration = 0.2
    this.speed = 0
    this.groundDrag = 0.9
    this.airDrag = 0.98
    this.airControl = 0.2
    this.animation = 'null'
    this.oldAnimation = 'null'

    const runConfig = {
      key: 'run',
      frames: this.anims.generateFrameNumbers('adventurer', {
        start: 8,
        end: 13,
      }),
      frameRate: 12,
      repeat: -1,
    }

    const idleConfig = {
      key: 'idle',
      frames: this.anims.generateFrameNumbers('adventurer', {
        start: 0,
        end: 3,
      }),
      frameRate: 12,
      repeat: -1,
    }
    const jumpConfig = {
      key: 'jump',
      frames: this.anims.generateFrameNumbers('adventurer', {
        frames: [15, 16, 18, 19, 20, 21, 18, 17],
      }),
      frameRate: 12,
      repeat: 0,
    }
    const fallConfig = {
      key: 'fall',
      frames: this.anims.generateFrameNumbers('adventurer', {
        start: 22,
        end: 23,
      }),
      frameRate: 12,
      repeat: -1,
    }

    this.anims.create(runConfig)
    this.anims.create(idleConfig)
    this.anims.create(jumpConfig)
    this.anims.create(fallConfig)
  }

  update() {
    this.onGround = false
    for (const key in this.bodies) {
      if (
        this.matter.containsPoint(
          this.bodies[key],
          this.player.x,
          this.player.y + this.groundCheckOffset
        )
      ) {
        this.onGround = true
        break
      }
    }

    if (this.onGround) {
      if (this.left.isDown) {
        this.animation = 'run'
      } else if (this.right.isDown) {
        this.animation = 'run'
      } else {
        this.animation = 'idle'
      }
      if (this.space.isDown || this.up.isDown) {
        this.player.setVelocityY(0)
        this.player.applyForce({ x: 0, y: -1.2 })
        this.oldAnimation = 'null'
        this.animation = 'jump'
      }
    }

    if (
      (this.player.anims.getProgress() >= 1 &&
        this.animation == 'jump' &&
        this.oldAnimation == 'jump') ||
      (this.player.body.velocity.y >= 1 && this.animation != 'jump')
    ) {
      this.animation = 'fall'
    }

    if (this.oldAnimation != this.animation) {
      this.player.play(this.animation)
      this.oldAnimation = this.animation
    }

    if (this.left.isDown) {
      this.speed -= this.acceleration * (this.onGround ? 1 : this.airControl)
      this.player.flipX = this.speed < 0
    }
    if (this.right.isDown) {
      this.speed += this.acceleration * (this.onGround ? 1 : this.airControl)
      this.player.flipX = this.speed < 0
    }

    this.speed *= this.onGround ? this.groundDrag : this.airDrag
    this.player.x += this.speed

    this.cameras.main.centerOn(this.player.x, this.player.y)
  }
}
