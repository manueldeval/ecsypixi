import { System, Not } from "ecsy"
import { Sprite } from '../components/Sprite';
import { Clip } from '../components/Clip';

class ClipSystem extends System {
    constructor(world,attributes){
        super(world,attributes);
        console.log("Creation of ClipSystem");
    }

    execute(delta, time) {            
        this.queries.clipsWithoutSprite.results.forEach(entity => {
            let clip = entity.getMutableComponent(Clip);
            let frame = clip.currentFrame();
            clip.nextAt = time + frame.duration;
            entity.addComponent(Sprite,{ name: frame.name })
        });

        this.queries.clipsWithSprite.results.forEach(entity => {
            let clip = entity.getMutableComponent(Clip);
            if (time > clip.nextAt){
                let sprite = entity.getMutableComponent(Sprite);
                clip.currentIndex = (clip.currentIndex + 1) % clip.frames.length;
                let frame = clip.currentFrame();
                clip.nextAt = time + frame.duration;
                sprite.name = frame.name;
            }

        });
    }
}

ClipSystem.queries = {
    clipsWithoutSprite: { components: [Clip,Not(Sprite)] },
    clipsWithSprite:    { components: [Clip,Sprite] }
}

export { ClipSystem }