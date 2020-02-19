import { System, Not }   from "ecsy"
import { Engine }   from '../components/Engine'
import { Visible }  from '../components/Visible'
import { DisplayObjectSSC } from '../components/DisplayObjectSSC'
import { Position } from '../components/Position'

class RenderSystem extends System {
    constructor(world,attributes){
        super(world,attributes);
        console.log("Creation of RenderSystem");
    }

    execute(delta, time) {
        let app = this.queries.engine.results[0].getComponent(Engine).app;

        this.queries.visibility.added.forEach(entity => {
            let object = entity.getMutableComponent(DisplayObjectSSC).object
            object.visible = true
        })
        this.queries.visibility.removed.forEach(entity => {
            let object = entity.getMutableComponent(DisplayObjectSSC).object
            object.visible = false
        })
        this.queries.position.changed.forEach(entity => {
            let object = entity.getMutableComponent(DisplayObjectSSC).object
            let position = entity.getComponent(Position)
            object.x = position.x
            object.y = position.y
            object.zIndex = position.z
        })
        this.queries.position.added.forEach(entity => {
            let object = entity.getMutableComponent(DisplayObjectSSC).object
            let position = entity.getComponent(Position)
            object.x = position.x
            object.y = position.y
            object.zIndex = position.z
        })
        // app.renderer.render(app.stage);
    }
}

RenderSystem.queries = {
    engine:             { components: [Engine] },
    visibility:  { 
        components: [ DisplayObjectSSC, Visible ], 
        listen: { 
            added: [ Visible ],
            removed: [ Visible ]
        }
    },
    position: {
        components: [ Visible, DisplayObjectSSC, Position ],
        listen: {
            changed: [ Position ],
            added: [ Position ]
        }
    }
}

export { RenderSystem }