namespace SpriteKind {
    export const HealthyFood = SpriteKind.create()
    export const EnemyProjectile = SpriteKind.create()
    export const Heart = SpriteKind.create()
    export const Hurt = SpriteKind.create()
    export const Spike = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.HealthyFood, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fountain, 100)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    info.changeScoreBy(2)
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (Dragon.isHittingTile(CollisionDirection.Right)) {
        music.stopAllSounds()
        game.gameOver(true)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    fire = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . 4 5 5 4 . . . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Dragon, DragonSpeed + 50, 0)
    fire.setPosition(Dragon.x + 10, Dragon.y + -10)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
function init_make_map (HealthyFood: number) {
    for (let index = 0; index <= HealthyFood; index++) {
        make_food(1, 10 + index * (MapWidth / HealthyFood), 8)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Dragon.isHittingTile(CollisionDirection.Bottom)) {
        Dragon.vy += -150
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Heart, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fountain, 100)
    info.changeLifeBy(1)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    Dragon.sayText("Ouch!!", 200, false)
    sprites.destroy(Spider, effects.fire, 100)
    info.changeLifeBy(-1)
})
function make_moving_spider (col: number, row: number, speed: number) {
    Spider = sprites.createProjectileFromSide(assets.image`15 by 0`, speed, 0)
    tiles.placeOnTile(Spider, tiles.getTileLocation(col, row))
}
function init_welcome_longtext () {
    veryLongText = "Welcome to my Dragon Dash game !!"
    game.showLongText(veryLongText, DialogLayout.Center)
    veryLongText = "Rules\\n"
    veryLongText = "" + veryLongText + "Dodge: score +1\\n" + "Coin: score +1\\n" + "Hit: life -1\\n" + "House: end"
    game.showLongText(veryLongText, DialogLayout.Center)
}
function make_scroll_background () {
    scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`bottom 0 sky`)
    scroller.setCameraScrollingMultipliers(0, 0, scroller.BackgroundLayer.Layer0)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`snowynight`)
    scroller.setCameraScrollingMultipliers(0.1, 0, scroller.BackgroundLayer.Layer1)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer2, assets.image`snowynight0`)
    scroller.setCameraScrollingMultipliers(0.3, 0, scroller.BackgroundLayer.Layer2)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer3, assets.image`snowynight1`)
    scroller.setCameraScrollingMultipliers(0.5, 0, scroller.BackgroundLayer.Layer3)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer4, assets.image`snowynight1`)
    scroller.setCameraScrollingMultipliers(0.7, 0, scroller.BackgroundLayer.Layer4)
}
function make_food (count: number, col: number, row: number) {
    if (Math.percentChance(70)) {
        if (Math.percentChance(randint(50, 100))) {
            sprite_coin = sprites.create(assets.image`myImage3`, SpriteKind.HealthyFood)
            animation.runImageAnimation(
            sprite_coin,
            assets.animation`myAnim3`,
            200,
            true
            )
            tiles.placeOnTile(sprite_coin, tiles.getTileLocation(col, row - randint(0, 3)))
        } else if (Math.percentChance(randint(10, 50))) {
            LifeHeart = sprites.create(img`
                ....................
                ....................
                ....................
                ....................
                ....................
                ....................
                .......22...22......
                ......2322.2222.....
                ......232222222.....
                ......222222222.....
                .......22222b2......
                ........222b2.......
                .........222........
                ..........2.........
                ....................
                ....................
                ....................
                ....................
                ....................
                ....................
                `, SpriteKind.Heart)
            tiles.placeOnTile(LifeHeart, tiles.getTileLocation(col - 3, row - randint(0, 3)))
        } else {
            carrot = sprites.create(img`
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . 7 . . . . 
                . . . . . . . . 7 . 7 7 . . . 
                . . . . . . . . . 7 7 . . . . 
                . . . . . . . d . 3 7 7 . . . 
                . . . . . b b 6 d 6 . . . . . 
                . . . . . f e f 6 f . . . . . 
                . . . . . e 4 e f f b . . . . 
                . . . . b 4 4 4 f b b . . . . 
                . . . . e 4 4 e b . . . . . . 
                . . . 4 4 e d d . . . . . . . 
                . . . e d d . . . . . . . . . 
                . . . d . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                `, SpriteKind.HealthyFood)
            tiles.placeOnTile(carrot, tiles.getTileLocation(col, row - randint(0, 3)))
        }
    } else {
        ToxicSpider = sprites.create(assets.image`15 by 0`, SpriteKind.Enemy)
        tiles.placeOnTile(ToxicSpider, tiles.getTileLocation(col, row - randint(1, 3)))
        Spike = sprites.create(assets.image`spike2`, SpriteKind.Spike)
        tiles.placeOnTile(Spike, tiles.getTileLocation(col - randint(-3, 3), row))
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    Dragon.sayText("NICE", 200, false)
    sprites.destroy(otherSprite, effects.fire, 100)
    info.changeScoreBy(5)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fountain, 100)
    Dragon.sayText("YOOOOO", 200, false)
    info.changeLifeBy(-1)
})
let Spike: Sprite = null
let ToxicSpider: Sprite = null
let carrot: Sprite = null
let LifeHeart: Sprite = null
let sprite_coin: Sprite = null
let veryLongText = ""
let Spider: Sprite = null
let fire: Sprite = null
let MapWidth = 0
let DragonSpeed = 0
let Dragon: Sprite = null
make_scroll_background()
tiles.setCurrentTilemap(tilemap`level1-floor 160 by 10`)
Dragon = sprites.create(assets.image`23 by 36`, SpriteKind.Player)
scene.cameraFollowSprite(Dragon)
Dragon.setPosition(90, 130)
Dragon.ay = 400
DragonSpeed = 100
controller.moveSprite(Dragon, DragonSpeed, 0)
info.setLife(5)
info.setScore(0)
MapWidth = 160
music.play(music.createSong(assets.song`mySong`), music.PlaybackMode.LoopingInBackground)
init_make_map(20)
init_welcome_longtext()
game.onUpdateInterval(5000, function () {
    make_moving_spider(Dragon.x / 16 + 5, 8, randint(-100, -120))
})
