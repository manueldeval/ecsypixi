import { System, Not } from "ecsy"
import { Visible } from '../components/Visible'
import { Position } from '../components/Position'
import { SpriteSSC } from '../components/SpriteSSC'

class VisibleSystem extends System {
    constructor(world,attributes){
        super(world,attributes);
        console.log("Creation of VisibleSystem");
    }

    execute(delta, time) {
        this.queries.visibleSprites.results.forEach(entity => {
            let sprite = entity.getComponent(SpriteSSC).sprite
            let position = entity.getComponent(Position)

            sprite.visible = true
            sprite.x = position.x
            sprite.y = position.y
            
        });
        this.queries.hiddenSprites.results.forEach(entity => {
            let sprite = entity.getComponent(SpriteSSC).sprite
            sprite.visible = false
        });
    }
}

VisibleSystem.queries = {
    visibleSprites: { components: [ Visible, SpriteSSC, Position ] },
    hiddenSprites: { components: [ Not(Visible), SpriteSSC, Position ] }
}

export { VisibleSystem }