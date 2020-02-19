import { Text as PixiText } from "pixi.js"
import { System, Not } from "ecsy"
import { Engine } from '../components/Engine'
import { Text } from '../components/Text'
import { DisplayObjectSSC } from '../components/DisplayObjectSSC'

class TextSystem extends System {
    constructor(world,attributes){
        super(world,attributes);
        console.log("Creation of TextSystem")
    }

    execute(delta, time) {
        let app = this.queries.engine.results[0].getComponent(Engine).app;
        // The sprite was added
        this.queries.textToAdd.results.forEach(entity => {
            console.log("Text created!")
            let text = entity.getComponent(Text).text
            let options = entity.getComponent(Text).options

            let textObject = new PixiText(text,options);
            textObject.visible = false 
            app.stage.addChild(textObject)
            entity.addComponent(DisplayObjectSSC,{object: textObject})
        })
        // The sprite was renamed
        this.queries.textChanged.changed.forEach(entity => {
            let displayObject = entity.getMutableComponent(DisplayObjectSSC).object
            let text = entity.getComponent(Text).text
            displayObject.text = text
        })
    }
}

TextSystem.queries = {
    engine:         { components: [Engine] },
    textToAdd:      { components: [Text, Not(DisplayObjectSSC)]},
    textChanged:    { components: [Text , DisplayObjectSSC], listen: { changed: [Text] }}
}

export { TextSystem }