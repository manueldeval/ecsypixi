import { System } from "ecsy"
import { Engine } from '../components/Engine'
import { Application } from 'pixi.js';

class RenderSystem extends System {
    constructor(world,attributes){
        super(world,attributes);
        console.log("Creation of RenderSystem");
    }

    execute(delta, time) {
        let app = this.queries.engine.results[0].getComponent(Engine).app;
        app.renderer.render(app.stage);
    }
}

RenderSystem.queries = {
    engine: {
        components: [Engine]
    }
}

export { RenderSystem }