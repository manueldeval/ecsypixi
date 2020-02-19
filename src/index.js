import { World } from "ecsy";
import { gameLoop } from './utils/game'
import { createFps,createRandomWalkers,resourceLoader,initEngine } from './gamemacros'

let world = new World();

initEngine(world);

resourceLoader(world,{
  PeopleSpriteSheet:  'static/assets/PeopleSpriteSheet.json',
  logo:               'static/assets/logo.png',
  underworld:         'static/assets/underworld_load-lomem-32x32.json'

});

createFps(world)

import { Sprite,Position,Visible} from './components'
for (var i=0;i<40;i++){
  for (var j=0;j<40;j++){
    world.createEntity()
      .addComponent(Sprite,{name: 'underworld_floor_medium_lg'})
      .addComponent(Position,{x:32*i,y:32*j,z:0})
      .addComponent(Visible)  
  }
}

createRandomWalkers(world,100);


//==========================
// Execution Loop
//==========================
gameLoop(world);
