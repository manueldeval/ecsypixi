import { World } from "ecsy";

import { gameLoop } from './utils/game'

import { ResourceLoaderSystem } from './systems/ResourceLoaderSystem'
import { EngineSystem } from './systems/EngineSystem'
import { RenderSystem } from './systems/RenderSystem'
import { SpriteSystem } from './systems/SpriteSystem'
import { VisibleSystem } from './systems/VisibleSystem'
import { KinematicSystem} from './systems/KinematicSystem'

import { Resource } from './components/Resource'
import { Engine } from './components/Engine'
import { Sprite } from './components/Sprite'
import { Visible } from './components/Visible'
import { Position } from './components/Position'
import { Velocity } from './components/Velocity'

let world = new World();

// Systems
world
  .registerSystem(EngineSystem)         // Initialize the engine
  .registerSystem(ResourceLoaderSystem) // Block all systems with lower priority while resources are not loaded.
  .registerSystem(KinematicSystem)      // Compute the positions based on velocity
  .registerSystem(VisibleSystem)        // Display at the correct position
  .registerSystem(SpriteSystem)         // Create the sprite
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

// Sprite
world.createEntity()
  .addComponent(Sprite,{ name: 'perso1_front_2' })
  .addComponent(Position,{x:10,y:10})
  .addComponent(Velocity,{x:1.0,y:1.0})
  .addComponent(Visible)

//==========================
// Execution Loop
//==========================
// Run!

gameLoop(world);
