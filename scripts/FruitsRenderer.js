import {FruitRenderer} from "./FruitRenderer.js";

export class FruitsRenderer {
    constructor(fruits, ul){
        this.fruits=fruits;
        this.ul=ul;
        
    }
    render(){       
        for(const fruit of this.fruits){
            const li = new FruitRenderer(fruit).render();
            this.ul.append(li);
          
        }

    }

}
