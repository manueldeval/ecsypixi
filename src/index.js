import { World } from "ecsy";

import { gameLoop } from './utils/game'

import { ResourceLoaderSystem } from './systems/ResourceLoaderSystem'
import { EngineSystem } from './systems/EngineSystem'
import { RenderSystem } from './systems/RenderSystem'
import { SpriteSystem } from './systems/SpriteSystem'
import { KinematicSystem} from './systems/KinematicSystem'
import { TextSystem } from './systems/TextSystem'
import { DisplayObjectCleanerSystem } from './systems/DisplayObjectCleanerSystem'
import { FpsSystem } from './systems/FpsSystem'

import { Resource } from './components/Resource'
import { Engine } from './components/Engine'
import { Sprite } from './components/Sprite'
import { Visible } from './components/Visible'
import { Position } from './components/Position'
import { Velocity } from './components/Velocity'
import { Text } from './components/Text'
import { Fps } from './components/Fps'

let world = new World();

// Systems
world
  .registerSystem(EngineSystem)         // Initialize the engine
  .registerSystem(ResourceLoaderSystem) // Block all systems with lower priority while resources are not loaded.
  .registerSystem(KinematicSystem)      // Compute the positions based on velocity
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

// Ressource loader entity
world.createEntity("Resource1")
  .addComponent(Resource,{
    name: 'PeopleSpriteSheet',
    url:'static/assets/PeopleSpriteSheet.json'
  })
// Ressource loader entity
world.createEntity("Logo")
  .addComponent(Resource,{
    name: 'logo',
    url:'static/assets/logo.png'
  })

// Sprite
world.createEntity()
  .addComponent(Sprite,{ name: 'perso1_front_2' })
  .addComponent(Position,{x:10,y:10})
  .addComponent(Velocity,{x:1.0,y:1.0})
  .addComponent(Visible)

// Text
world.createEntity()
  .addComponent(Fps)
  .addComponent(Text,{options: {fontFamily : 'Arial', fontSize: 14, fill : 0xbbbbbb, align : 'center'}})
  .addComponent(Position,{x:10,y:10})
  .addComponent(Visible)

//==========================
// Execution Loop
//==========================
// Run!

gameLoop(world);
