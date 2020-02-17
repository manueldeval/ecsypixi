import { SystemStateComponent} from "ecsy"

export class SpriteSSC extends SystemStateComponent {
    constructor() {
        super();
        this.reset();
    }

    reset(){
        this.sprite = null;
    }
}
