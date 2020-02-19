
import {
    Resource,
    Visible,
    Position,
    Velocity,
    Text,
    Fps,
    Clip,
    Engine
} from './components'

import {
    ResourceLoaderSystem,
    EngineSystem,
    RenderSystem,
    SpriteSystem,
    KinematicSystem,
    TextSystem,
    DisplayObjectCleanerSystem,
    FpsSystem,
    ClipSystem,
  } from './systems/';

export function initEngine(world){
    world
        .registerSystem(EngineSystem)         // Initialize the engine
        .registerSystem(ResourceLoaderSystem) // Block all systems with lower priority while resources are not loaded.
        .registerSystem(KinematicSystem)      // Compute the positions based on velocity
        .registerSystem(ClipSystem)
        .registerSystem(SpriteSystem)         // Create the sprite
        .registerSystem(TextSystem)           // Render text
        .registerSystem(FpsSystem)            // Fps
        .registerSystem(DisplayObjectCleanerSystem)
        .registerSystem(RenderSystem)         // Render the stage
  
  // Entities
  // Main engine Enity
  world.createEntity()
    .addComponent(Engine,{
      elem: document.body,
      config:{
        width: window.innerWidth,
        height: window.innerHeight,
        resolution: window.devicePixelRatio 
      }
    })
}


export function createFps(world){
    world.createEntity()
        .addComponent(Fps)
        .addComponent(Text,{options: {fontFamily : 'Arial', fontSize: 14, fill : 0xbbbbbb, align : 'center'}})
        .addComponent(Position,{x:10,y:10,z:100})
        .addComponent(Visible)
}

export function createOneWalker(world,x,y,vx,vy){
    world.createEntity()
        .addComponent(Clip,{ frames: [{ name: 'perso1_front_2', duration: 200 },
                                    { name: 'perso1_front_1', duration: 200 },
                                    { name: 'perso1_front_2', duration: 200 },
                                    { name: 'perso1_front_3', duration: 200 }
                            ]})
        .addComponent(Position,{x,y,z:50})
        .addComponent(Velocity,{x:vx,y:vy})
        .addComponent(Visible)
}

export function createRandomWalkers(world,number){
    for (var i=0;i<number;i++){
        let speed = 200;
        createOneWalker(world,
            300*Math.random()+250,
            300*Math.random()+250,
            5-10.0*Math.random(),
            5-10.0*Math.random())
    }
}

export function resourceLoader(world,res){
    Object.keys(res).map(name => {
        return {name, url: res[name]}
    }).forEach(r => {
        world.createEntity().addComponent(Resource,r)
    })
}