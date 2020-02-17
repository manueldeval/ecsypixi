import { SystemStateComponent} from "ecsy"

export class ResourceLoaderSSC extends SystemStateComponent {
    constructor() {
        super();
        this.reset(); 
    }
    reset(){
        this.state = "";
        this.progress = null;  
    }
}
