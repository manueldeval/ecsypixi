import { Sprite as PixiSprite } from "pixi.js"
import { System, Not } from "ecsy"
import { Engine } from '../components/Engine'
import { Sprite } from '../components/Sprite'
import { DisplayObjectSSC } from '../components/DisplayObjectSSC'

class SpriteSystem extends System {
    constructor(world,attributes){
        super(world,attributes);
        console.log("Creation of SpriteSystem")
    }

    execute(delta, time) {
        let app = this.queries.engine.results[0].getComponent(Engine).app;
        // The sprite was added
        this.queries.spritesToAdd.results.forEach(entity => {
            let spriteName = entity.getComponent(Sprite).name
            let sprite = PixiSprite.from(spriteName)
            sprite.visible = false
            app.stage.addChild(sprite)
            entity.addComponent(DisplayObjectSSC,{object: sprite})
        })
        // The sprite was renamed
        this.queries.spriteNameChanged.changed.forEach(entity => {
            let displayObject = entity.getMutableComponent(DisplayObjectSSC)
            app.stage.removeChild(displayObject.object)
            
            let spriteName = entity.getComponent(Sprite).name
            let newSprite = PixiSprite.from(spriteName)
            newSprite.visible = false
            app.stage.addChild(newSprite)
            displayObject.object = newSprite
        })
    }
}

SpriteSystem.queries = {
    engine:             { components: [Engine] },
    spritesToAdd:       { components: [Sprite, Not(DisplayObjectSSC)]},
    spritesToRemove:    { components: [Not(Sprite), DisplayObjectSSC]},
    spriteNameChanged:  { components: [Sprite , DisplayObjectSSC], listen: { changed: [Sprite] }}
}

export { SpriteSystem }