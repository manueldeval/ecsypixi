import { SystemStateComponent} from "ecsy"

export class DisplayObjectSSC extends SystemStateComponent {
    constructor() {
        super();
        this.reset();
    }

    reset(){
        this.object = null;
    }
}
