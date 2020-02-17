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

        this.queries.visibleObjects.results.forEach(entity => {
            let object = entity.getComponent(DisplayObjectSSC).object
            let position = entity.getComponent(Position)

            object.visible = true
            object.x = position.x
            object.y = position.y
            
        });
        this.queries.hiddenObjects.results.forEach(entity => {
            let object = entity.getComponent(DisplayObjectSSC).object
            object.visible = false
        });

        app.renderer.render(app.stage);
    }
}

RenderSystem.queries = {
    engine:         { components: [Engine] },
    visibleObjects: { components: [ Visible,        DisplayObjectSSC, Position ] },
    hiddenObjects:  { components: [ Not(Visible),   DisplayObjectSSC, Position ] }
}

export { RenderSystem }