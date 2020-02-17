import { System } from "ecsy"
import { Fps } from '../components/Fps'
import { Text } from '../components/Text'

class FpsSystem extends System {
    constructor(world,attributes){
        super(world,attributes);
        console.log("Creation of FpsSystem");
    }

    execute(delta, time) {
        this.queries.fps.results.forEach(entity => {
            entity.getMutableComponent(Text).text = "fps: "+Math.ceil(1000/delta)
        })
    }
}

FpsSystem.queries = {
    fps: {
        components: [Fps,Text]
    }
}

export { FpsSystem }