import { System } from "ecsy"
import { Resource } from '../components/Resource'
import { Engine } from '../components/Engine'
import { ResourceLoaderSSC } from "../components/ResourceLoaderSSC";

class ResourceLoaderSystem extends System {
    constructor(world,attributes){
        super(world,attributes);
        console.log("Creation of ResourceLoaderSystem");
    }

    execute(delta, time) {
        let app = this.queries.engine.results[0].getComponent(Engine).app;
            
        if (this.queries.loaderState.results.length == 0){
            console.log("About to load resources...")
            console.log("Stopping systems after ResourceLoaderSystem")
            this.stopSystemsAfter()
            this.queries.toLoad.results.forEach(entity => { 
                let url = entity.getComponent(Resource).url;
                let name = entity.getComponent(Resource).name;
                app.loader.add(name, url);
                this.world
                    .createEntity("LoaderStatus")
                    .addComponent(ResourceLoaderSSC,{state: 'toLoad'})
            });
        } else {
            let loadingState = this.queries.loaderState.results[0].getMutableComponent(ResourceLoaderSSC);
            if (loadingState.state == 'toLoad'){
                loadingState.state = 'loading'
                app.loader.load(() => {
                    loadingState.state = 'loaded'
                    console.log("All resources are loaded.")
                    console.log("Starting systems after ResourceLoaderSystem")
                    this.startSystemsAfter();
                });
                app.loader.onProgress.add((loader,resource) => {
                    loadingState.progress = loader.progress;
                    if (resource.error){
                        console.log("Loading of ",resource.name, " at ",resource.url,  " failed!");
                    } else {
                        console.log("Loading of ",resource.name, " at ",resource.url,  " succeeded!");
                    }
                });
            }
            
        }    
    }

    stopSystemsAfter(){
        let systems = this.world.getSystems()
        let myIndex = systems.findIndex(system => system instanceof ResourceLoaderSystem)
        for (var i = myIndex+1;i<systems.length;i++){
            systems[i].stop();
        }
    }

    startSystemsAfter(){
        let systems = this.world.getSystems()
        let myIndex = systems.findIndex(system => system instanceof ResourceLoaderSystem)
        for (var i = myIndex+1;i<systems.length;i++){
            systems[i].play();
        }
    }
}

ResourceLoaderSystem.queries = {
    loaderState: { components: [ ResourceLoaderSSC ] },
    toLoad: { components: [Resource] },
    engine: { components: [Engine] }
}

export { ResourceLoaderSystem }
