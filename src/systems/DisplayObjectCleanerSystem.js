import { System, Not } from "ecsy"
import { Engine } from '../components/Engine'
import { Sprite } from '../components/Sprite'
import { Text } from '../components/Text'
import { DisplayObjectSSC } from '../components/DisplayObjectSSC'

class DisplayObjectCleanerSystem extends System {
    constructor(world,attributes){
        super(world,attributes);
        console.log("Creation of DisplayObjectCleanerSystem")
    }

    execute(delta, time) {
        let app = this.queries.engine.results[0].getComponent(Engine).app;
        this.queries.objectsToRemove.results.forEach(entity => {
            let sprite = entity.getComponent(DisplayObjectSSC).object
            app.stage.removeChild(sprite)
        })
    }
}

DisplayObjectCleanerSystem.queries = {
    engine:             { components: [Engine] },
    objectsToRemove:    { components: [Not(Sprite), Not(Text), DisplayObjectSSC]}
}

export { DisplayObjectCleanerSystem }