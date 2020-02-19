import { System } from "ecsy"
import { Position } from '../components/Position'
import { Velocity } from '../components/Velocity'

class KinematicSystem extends System {
    constructor(world,attributes){
        super(world,attributes);
        console.log("Creation of KinematicSystem");
    }

    execute(delta, time) {

        this.queries.kinematics.results.forEach(entity => {
            let velocity = entity.getComponent(Velocity)
            let position = entity.getMutableComponent(Position)
            position.x += velocity.x
            position.y += velocity.y
        });

    }
}

KinematicSystem.queries = {
    kinematics: { components: [ Position, Velocity ] },
}

export { KinematicSystem }