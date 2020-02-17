import { System } from "ecsy"
import { Engine } from '../components/Engine'
import { Application } from 'pixi.js';

class EngineSystem extends System {
    constructor(world,attributes){
        super(world,attributes);
        console.log("Creation of EngineSystem");
    }

    execute(delta, time) {
        let engine = this.queries.engine.results[0].getMutableComponent(Engine);
        if (engine.app == null){
            engine.app = new Application(engine.config)
            engine.elem.appendChild(engine.app.view)
        }
    }
}

EngineSystem.queries = {
    engine: {
        components: [Engine]
    }
}

export { EngineSystem }