import { Sprite as PixiSprite } from "pixi.js"
import { System, Not, Entity } from "ecsy"
import { Engine } from '../components/Engine'
import { Sprite } from '../components/Sprite'
import { SpriteSSC } from '../components/SpriteSSC'

class SpriteSystem extends System {
    constructor(world,attributes){
        super(world,attributes);
        console.log("Creation of SpriteSystem")
    }

    execute(delta, time) {
        let app = this.queries.engine.results[0].getComponent(Engine).app;
        this.queries.spritesToAdd.results.forEach(entity => {
            console.log("Sprite created!")
            let spriteName = entity.getComponent(Sprite).name
            let sprite = PixiSprite.from(spriteName)
            sprite.visible = false
            app.stage.addChild(sprite)
            entity.addComponent(SpriteSSC,{sprite})
        })
        this.queries.spritesToRemove.results.forEach(entity => {
            let sprite = entity.getComponent(SpriteSSC).sprite
            app.stage.removeChild(sprite)
        })
    }
}

SpriteSystem.queries = {
    engine:             { components: [Engine] },
    spritesToAdd:       { components: [Sprite, Not(SpriteSSC)]},
    spritesToRemove:    { components: [Not(Sprite), SpriteSSC]},
    // spriteNameChanged:  { components: [Sprite], changed: true }
}

export { SpriteSystem }