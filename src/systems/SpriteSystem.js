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
            let spriteName = entity.getComponent(Sprite).name    
            let texture = this.findTexture(app.loader,spriteName)
            displayObject.object.texture = texture
        })
    }
    findTexture(loader,spriteName) {
        if (loader.resources[spriteName]){
            return loader.resources[spriteName].texture
        } else {
            let s = Object.keys(loader.resources)
                .map(key => loader.resources[key])
                .filter(o => o.textures)
                .find(o => o.textures[spriteName])
            if (s) {
                return s.textures[spriteName]
            } else {
                throw new Error("Unable to find sprite "+spriteName)
            }
        }
    }
}

SpriteSystem.queries = {
    engine:             { components: [Engine] },
    spritesToAdd:       { components: [Sprite, Not(DisplayObjectSSC)]},
    spritesToRemove:    { components: [Not(Sprite), DisplayObjectSSC]},
    spriteNameChanged:  { components: [Sprite , DisplayObjectSSC], listen: { changed: [Sprite] }}
}

export { SpriteSystem }